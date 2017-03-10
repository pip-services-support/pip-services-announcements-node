let _ = require('lodash');
let async = require('async');

import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { ComponentSet } from 'pip-services-runtime-node';
import { DynamicMap } from 'pip-services-runtime-node';
import { FilterParams } from 'pip-services-runtime-node';
import { PagingParams } from 'pip-services-runtime-node';
import { FilePersistence } from 'pip-services-runtime-node';
import { Converter } from 'pip-services-runtime-node';
import { TagsProcessor } from 'pip-services-runtime-node';
import { NotFoundError } from 'pip-services-runtime-node';
import { Version1 as StorageV1 } from 'pip-clients-storage-node';

import { IAnnouncementsPersistence } from './IAnnouncementsPersistence';
import { AnnouncementsDataConverter } from './AnnouncementsDataConverter';

export class AnnouncementsFilePersistence extends FilePersistence implements IAnnouncementsPersistence {
	/**
	 * Unique descriptor for the AnnouncementsFilePersistence component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Persistence, "pip-services-annonces", "file", "*"
	);

    private _storage: StorageV1.IStorageClient;
    
    constructor(descriptor?: ComponentDescriptor) {
        super(descriptor || AnnouncementsFilePersistence.Descriptor);
    }

    public link(components: ComponentSet): void {
        // Locate reference to announces persistence component
        this._storage = <StorageV1.IStorageClient>components.getOneRequired(
        	new ComponentDescriptor(Category.Clients, "pip-services-storage", '*', '*')
    	);
        
        super.link(components);
    }
        
    private contains(array1, array2) {
        if (array1 == null || array2 == null) return false;
        
        for (let i1 = 0; i1 < array1.length; i1++) {
            for (let i2 = 0; i2 < array2.length; i2++)
                if (array1[i1] == array2[i1]) 
                    return true;
        }
        
        return false;
    }
    
    private filterAnnouncements(filter: any): any {
        let category = filter.category;
        let app = filter.app;
        let status = filter.status;
        let from = Converter.toDate(filter.from);
        let to = Converter.toDate(filter.to);
        let search = filter.search;
        let searchRegex = search ? new RegExp(search, 'i') : null;
        let tags = filter.tags;
        
        if (tags) tags = TagsProcessor.compressTags(tags);
        
        return (item) => {
            if (category && item.category != category) 
                return false;
            if (app && item.app != app) 
                return false;
            if (status && item.status != status) 
                return false;
            if (from && item.from < from)
                return false;
            if (to && item.to >= to)
                return false;
            if (tags && !this.contains(item.all_tags, tags)) 
                return false;
            // Todo: This will not work for multi-language text
            if (searchRegex) {
                if (!searchRegex.test(item.title))
                    return false;
                if (!searchRegex.test(item.content))
                    return false;
                if (!searchRegex.test(item.creator_name))
                    return false;
            }
            return true; 
        };
    }
    
    public getAnnouncements(correlationId: string, filter: FilterParams, paging: PagingParams, callback: any) {
        let filterParams = <any>filter || {};
        let filterFunc = this.filterAnnouncements(filterParams);
        
        this.getPage(filterFunc, paging, null, null, callback);
    }

    public getRandomAnnouncement(correlationId: string, filter: FilterParams, callback: any) {
        let filterParams = <any>filter || {};

        // Limit announcements to 1 week by default
        if (filterParams.from == null)
            filterParams.from = new Date(new Date().getTime() - 7 * 24 * 3600000);

        let filterFunc = this.filterAnnouncements(filterParams);
        this.getRandom(filterFunc, callback);
    }

    public getAnnouncementById(correlationId: string, announcementId: string, callback: any) {
        this.getById(announcementId, callback);
    }

    public createAnnouncement(correlationId: string, announcement: any, callback: any) {
        let item = AnnouncementsDataConverter.validate(announcement);

        item.id = item.id || this.createUuid();
        item.created = new Date();
        item.status = item.status || 'new';
        item.importance = item.importance || 0;
        item.tags = item.tags || [];
        item.all_tags = TagsProcessor.extractHashTags(item, ['title', 'content']);
                    
        async.series([
        // Create announcement
            (callback) => {
                this.create(item, callback);
            },
        // Add file references
            (callback) => {
                this._storage.addBlockRefs(
                    correlationId,
                    AnnouncementsDataConverter.getBlockIds(item),
                    {
                        type: 'announcement',
                        id: item.id,
                        name: Converter.fromMultiString(item.title)
                    },  
                    callback  
                );
            }
        ], (err) => {
            callback(err, item);
        });
    }

    public updateAnnouncement(correlationId: string, announcementId: string, announcement: any, callback: any) {
        let newItem = AnnouncementsDataConverter.validate(announcement);
        newItem = _.omit(newItem, '_id', 'creator', 'created');

        let oldItem, item;
        
        async.series([
        // Retrieve announcement
            (callback) => {
                this.getById(
                    announcementId,
                    (err, data) => {
                        if (err == null && data == null) {
                           err = new NotFoundError(
                               this,
                               'AnnouncementNotFound',
                               'Announcements was not found'
                            )
                            .withCorrelationId(correlationId)
                            .withDetails(announcementId);
                        }
                        item = data;
                        oldItem = _.cloneDeep(item);
                        callback(err);
                    }
                );
            },
        // Update announcement
            (callback) => {
                _.assign(item, newItem);
                item.all_tags = TagsProcessor.extractHashTags(newItem, ['title', 'content']);

                this.save(callback);
            },
        // Update block references
            (callback) => {
                this._storage.updateBlockRefs(
                    correlationId,
                    AnnouncementsDataConverter.getBlockIds(oldItem),
                    AnnouncementsDataConverter.getBlockIds(item),
                    {
                        type: 'announcement',
                        id: item.id,
                        name: Converter.fromMultiString(item.title)
                    },
                    callback
                );
            },
        ], (err) => {
            callback(err, item);
        });
    }

    public deleteAnnouncement(correlationId: string, announcementId: string, callback) {
        let item;

        async.series([
        // Remove announcement
            (callback) => {
                this.delete(
                    announcementId,
                    (err, data) => {
                        item = data;
                        callback(err);
                    }
                );
            },
        // Remove block references
            (callback) => {
                if (item == null) {
                    callback();
                    return;
                }

                this._storage.removeBlockRefs(
                    correlationId,
                    AnnouncementsDataConverter.getBlockIds(item),
                    {
                        type: 'announcement',
                        id: item.id
                    },
                    callback
                );
            }
        ], (err) => {
            callback(err, item);
        });
    }
}

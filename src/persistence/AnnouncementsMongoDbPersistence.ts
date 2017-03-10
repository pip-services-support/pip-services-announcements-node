let _ = require('lodash');
let async = require('async');

import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { ComponentSet } from 'pip-services-runtime-node';
import { FilterParams } from 'pip-services-runtime-node';
import { PagingParams } from 'pip-services-runtime-node';
import { MongoDbPersistence } from 'pip-services-runtime-node';
import { Converter } from 'pip-services-runtime-node';
import { TagsProcessor } from 'pip-services-runtime-node';
import { NotFoundError } from 'pip-services-runtime-node';
import { Version1 as StorageV1 } from 'pip-clients-storage-node';

import { AnnouncementsDataConverter } from './AnnouncementsDataConverter';
import { IAnnouncementsPersistence } from './IAnnouncementsPersistence';

export class AnnouncementsMongoDbPersistence extends MongoDbPersistence implements IAnnouncementsPersistence {
	/**
	 * Unique descriptor for the AnnouncementsMongoDbPersistence component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Persistence, "pip-services-announces", "mongodb", "*"
	);
    
    private _storage: StorageV1.IStorageClient;
    
    constructor() {
        super(AnnouncementsMongoDbPersistence.Descriptor, require('./AnnouncementModel'));
    }

    public link(components: ComponentSet): void {
        // Locate reference to quotes persistence component
        this._storage = <StorageV1.IStorageClient>components.getOneRequired(
        	new ComponentDescriptor(Category.Clients, "pip-services-storage", '*', '*')
    	);
        
        super.link(components);
    }
    
    private defineFilterCondition(filter: any): any {
        let criteria = _.pick(filter, 'category', 'app', 'status');

        // Start time interval
        if (filter.from) {
            criteria.$and = criteria.$and || [];
            criteria.$and.push({
                created: { $gte: filter.from }
            });
        }

        // End time interval
        if (filter.to) {
            criteria.$and = criteria.$and || [];
            criteria.$and.push({
                created: { $lt: filter.to }
            });
        }

        // Search by tags
        if (filter.tags) {
            let searchTags = TagsProcessor.compressTags(filter.tags);

            criteria.$and = criteria.$and || [];
            criteria.$and.push({
                all_tags: { $in: searchTags }
            });
        }

        // Full text search
        if (filter.search) {
            var search = filter.search,
                searchRegex = new RegExp(search, 'i');

            // Todo: This will not work for multi-language text
            criteria.$or = [
                { title: { $regex: searchRegex } },
                { content: { $regex: searchRegex } },
                { creator_name: { $regex: searchRegex } }
            ];
        }
        
        return criteria;
    }
    
    public getAnnouncements(correlationId: string, filter: FilterParams, paging: PagingParams, callback: any) {
        let criteria = this.defineFilterCondition(filter);

        this.getPage(criteria, paging, '-created', { custom_dat: 0 }, callback);
    }

    public getRandomAnnouncement(correlationId: string, filter: FilterParams, callback: any) {
        let filterParams = <any>filter || {};

        // Limit announcements to 1 week by default
        if (filterParams.from == null)
            filterParams.from = new Date(new Date().getTime() - 7 * 24 * 3600000);

        let criteria = this.defineFilterCondition(filterParams);

        this.getRandom(criteria, callback);
    }

    public getAnnouncementById(correlationId: string, announcementId: string, callback: any) {
        this.getById(announcementId, callback);
    }

    public createAnnouncement(correlationId: string, announcement: any, callback: any) {            
        let newItem = AnnouncementsDataConverter.validate(announcement);            
        newItem._id = newItem.id || this.createUuid();
        newItem.created = new Date();
        newItem.status = newItem.status || 'new';
        newItem.importance = newItem.importance || 0;
        newItem.all_tags = TagsProcessor.extractHashTags(newItem, ['title', 'content']);

        let item;

        async.series([
        // Create announcement
            (callback) => {
                this._model.create(newItem, (err, data) => {
                    item = data;
                    callback(err);
                });
            },
        // Add file references
            (callback) => {
                this._storage.addBlockRefs(
                     correlationId,
                    AnnouncementsDataConverter.getBlockIds(item),
                    {
                        type: 'announcement',
                        id: item._id,
                        name: Converter.fromMultiString(item)
                    },  
                    callback  
                );
            }
        ], (err) => {
            item = this.convertItem(item);
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
                this._model.findById(
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
                        oldItem = this.jsonToPublic(data);
                        callback(err);
                    }
                );
            },
        // Update announcement
            (callback) => {
                _.assign(item, newItem);
                item.all_tags = TagsProcessor.extractHashTags(newItem, ['title', 'content']);

                item.save(callback);
            },
        // Update block references
            (callback) => {
                this._storage.updateBlockRefs(
                    correlationId,
                    AnnouncementsDataConverter.getBlockIds(oldItem),
                    AnnouncementsDataConverter.getBlockIds(item),
                    {
                        type: 'announcement',
                        id: item._id,
                        name: Converter.fromMultiString(item.title)
                    },
                    callback
                );
            },
        ], (err) => {
            item = this.convertItem(item);
            callback(err, item);
        });
    }

    public deleteAnnouncement(correlationId: string, announcementId: string, callback) {
        let item;

        async.series([
        // Remove announcement
            (callback) => {
                this._model.findByIdAndRemove(
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
                        id: item._id
                    },
                    callback
                );
            }
        ], (err) => {
            callback(err);
        });
    }
}

let async = require('async');

import { ConfigParams } from 'pip-services-commons-node';
import { IConfigurable } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
import { IReferenceable } from 'pip-services-commons-node';
import { DependencyResolver } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { AnyValueMap } from 'pip-services-commons-node';
import { ICommandable } from 'pip-services-commons-node';
import { CommandSet } from 'pip-services-commons-node';
import { TagsProcessor } from 'pip-services-commons-node';
import { NotFoundException } from 'pip-services-commons-node';
import { IAttachmentsClientV1 } from 'pip-clients-attachments-node';

import { PartyReferenceV1 } from '../data/version1/PartyReferenceV1';
import { AnnouncementV1 } from '../data/version1/AnnouncementV1';
import { IAnnouncementsPersistence } from '../persistence/IAnnouncementsPersistence';
import { IAnnouncementsBusinessLogic } from './IAnnouncementsBusinessLogic';
import { AnnouncementsCommandSet } from './AnnouncementsCommandSet';
import { AttachmentsConnector } from './AttachmentsConnector';

export class AnnouncementsController implements IConfigurable, IReferenceable, ICommandable, IAnnouncementsBusinessLogic {
    private static _defaultConfig: ConfigParams = ConfigParams.fromTuples(
        'dependencies.persistence', 'pip-services-announcements:persistence:*:*:1.0',
        'dependencies.attachments', 'pip-services-attachments:client:*:*:1.0'
    );

    private _dependencyResolver: DependencyResolver = new DependencyResolver(AnnouncementsController._defaultConfig);
    private _persistence: IAnnouncementsPersistence;
    private _attachmentsClient: IAttachmentsClientV1;
    private _attachmentsConnector: AttachmentsConnector;
    private _commandSet: AnnouncementsCommandSet;

    public configure(config: ConfigParams): void {
        this._dependencyResolver.configure(config);
    }

    public setReferences(references: IReferences): void {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired<IAnnouncementsPersistence>('persistence');

        this._attachmentsClient = this._dependencyResolver.getOneOptional<IAttachmentsClientV1>('attachments');
        this._attachmentsConnector = new AttachmentsConnector(this._attachmentsClient);
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null)
            this._commandSet = new AnnouncementsCommandSet(this);
        return this._commandSet;
    }

    public getAnnouncements(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<AnnouncementV1>) => void): void {
        this._persistence.getPageByFilter(correlationId, filter, paging, callback);
    }

    public getRandomAnnouncement(correlationId: string, filter: FilterParams, 
        callback: (err: any, announcement: AnnouncementV1) => void): void {
        this._persistence.getOneRandom(correlationId, filter, callback);
    }

    public getAnnouncementById(correlationId: string, announcementId: string,
        callback: (err: any, item: AnnouncementV1) => void): void {
        this._persistence.getOneById(correlationId, announcementId, callback);
    }

    public createAnnouncement(correlationId: string, announcement: AnnouncementV1,
        callback: (err: any, announcement: AnnouncementV1) => void): void {
        let newAnnouncement: AnnouncementV1 = null;

        announcement.create_time = new Date();
        announcement.all_tags = TagsProcessor.extractHashTags(
            announcement, 
            'title.en', 'title.sp', 'title.fr', 'title.de', 'title.ru',
            'content.en', 'content.sp', 'content.fr', 'content.de', 'content.ru'
        );

        async.series([
            (callback) => {
                this._persistence.create(correlationId, announcement, (err, data) => {
                    newAnnouncement = data;
                    callback(err);
                });
            },
            (callback) => {
                this._attachmentsConnector.addAttachments(correlationId, newAnnouncement, callback);
            }
        ], (err) => {
            callback(err, newAnnouncement);
        });
    }

    public updateAnnouncement(correlationId: string, announcement: AnnouncementV1,
        callback: (err: any, announcement: AnnouncementV1) => void): void {
        let oldAnnouncement: AnnouncementV1 = null;
        let newAnnouncement: AnnouncementV1 = null;
        
        announcement.create_time = new Date();
        announcement.all_tags = TagsProcessor.extractHashTags(
            announcement, 
            'title.en', 'title.sp', 'title.fr', 'title.de', 'title.ru',
            'content.en', 'content.sp', 'content.fr', 'content.de', 'content.ru'
        );

        async.series([
            (callback) => {
                this._persistence.getOneById(correlationId, announcement.id, (err, data) => {
                    oldAnnouncement = data;
                    if (err == null && data == null) {
                        err = new NotFoundException(
                            correlationId,
                            'ANNOUNCEMENT_NOT_FOUND',
                            'Announcement ' + announcement.id + ' was not found'
                        ).withDetails('announcement_id', announcement.id);
                    }
                    callback(err);
                });
            },
            (callback) => {
                this._persistence.update(correlationId, announcement, (err, data) => {
                    newAnnouncement = data;
                    callback(err);
                });
            },
            (callback) => {
                this._attachmentsConnector.updateAttachments(
                    correlationId, oldAnnouncement, newAnnouncement, callback);
            }
        ], (err) => {
            callback(err, newAnnouncement);
        });
    }

    public deleteAnnouncementById(correlationId: string, announcementId: string,
        callback: (err: any, announcement: AnnouncementV1) => void): void {
        let oldAnnouncement: AnnouncementV1 = null;

        async.series([
            (callback) => {
                this._persistence.deleteById(correlationId, announcementId, (err, data) => {
                    oldAnnouncement = data;
                    callback(err);
                });
            },
            (callback) => {
                this._attachmentsConnector.removeAttachments(correlationId, oldAnnouncement, callback);
            }
        ], (err) => {
            callback(err, oldAnnouncement);
        });
    }

}

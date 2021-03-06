import { ConfigParams } from 'pip-services3-commons-node';
import { IConfigurable } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { IReferenceable } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { ICommandable } from 'pip-services3-commons-node';
import { CommandSet } from 'pip-services3-commons-node';
import { AnnouncementV1 } from '../data/version1/AnnouncementV1';
import { IAnnouncementsController } from './IAnnouncementsController';
export declare class AnnouncementsController implements IConfigurable, IReferenceable, ICommandable, IAnnouncementsController {
    private static _defaultConfig;
    private _dependencyResolver;
    private _persistence;
    private _attachmentsClient;
    private _attachmentsConnector;
    private _commandSet;
    configure(config: ConfigParams): void;
    setReferences(references: IReferences): void;
    getCommandSet(): CommandSet;
    getAnnouncements(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<AnnouncementV1>) => void): void;
    getRandomAnnouncement(correlationId: string, filter: FilterParams, callback: (err: any, announcement: AnnouncementV1) => void): void;
    getAnnouncementById(correlationId: string, announcementId: string, callback: (err: any, item: AnnouncementV1) => void): void;
    createAnnouncement(correlationId: string, announcement: AnnouncementV1, callback: (err: any, announcement: AnnouncementV1) => void): void;
    updateAnnouncement(correlationId: string, announcement: AnnouncementV1, callback: (err: any, announcement: AnnouncementV1) => void): void;
    deleteAnnouncementById(correlationId: string, announcementId: string, callback: (err: any, announcement: AnnouncementV1) => void): void;
}

import { FilterParams } from 'pip-services-runtime-node';
import { PagingParams } from 'pip-services-runtime-node';
import { IPersistence } from 'pip-services-runtime-node';

export interface IAnnouncementsPersistence extends IPersistence {
    getAnnouncements(correlationId: string, filter: FilterParams, paging: PagingParams, callback: any): void;
    getRandomAnnouncement(correlationId: string, filter: FilterParams, callback: any): void;
    getAnnouncementById(correlationId: string, announcementId: string, callback: any): void;
    createAnnouncement(correlationId: string, announcement: any, callback: any): void;
    updateAnnouncement(correlationId: string, announcementId: string, announcement: any, callback: any): void;
    deleteAnnouncement(correlationId: string, announcementId: string, callback: any): void;
}

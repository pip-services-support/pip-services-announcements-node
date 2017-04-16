import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { AnnouncementV1 } from '../data/version1/AnnouncementV1';
export interface IAnnouncementsBusinessLogic {
    getAnnouncements(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<AnnouncementV1>) => void): void;
    getRandomAnnouncement(correlationId: string, filter: FilterParams, callback: (err: any, announcement: AnnouncementV1) => void): void;
    getAnnouncementById(correlationId: string, announcementId: string, callback: (err: any, announcement: AnnouncementV1) => void): void;
    createAnnouncement(correlationId: string, announcement: AnnouncementV1, callback: (err: any, announcement: AnnouncementV1) => void): void;
    updateAnnouncement(correlationId: string, announcement: AnnouncementV1, callback: (err: any, announcement: AnnouncementV1) => void): void;
    deleteAnnouncementById(correlationId: string, announcementId: string, callback: (err: any, announcement: AnnouncementV1) => void): void;
}

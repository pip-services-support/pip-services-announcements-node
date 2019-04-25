import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';

import { PartyReferenceV1 } from '../data/version1/PartyReferenceV1';
import { AnnouncementV1 } from '../data/version1/AnnouncementV1';

export interface IAnnouncementsController {
    getAnnouncements(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<AnnouncementV1>) => void): void;

    getRandomAnnouncement(correlationId: string, filter: FilterParams,
        callback: (err: any, announcement: AnnouncementV1) => void): void;

    getAnnouncementById(correlationId: string, announcementId: string,
        callback: (err: any, announcement: AnnouncementV1) => void): void;

    createAnnouncement(correlationId: string, announcement: AnnouncementV1,
        callback: (err: any, announcement: AnnouncementV1) => void): void;

    updateAnnouncement(correlationId: string, announcement: AnnouncementV1,
        callback: (err: any, announcement: AnnouncementV1) => void): void;

    deleteAnnouncementById(correlationId: string, announcementId: string,
        callback: (err: any, announcement: AnnouncementV1) => void): void;
}

import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { IGetter } from 'pip-services-data-node';
import { IWriter } from 'pip-services-data-node';
import { AnnouncementV1 } from '../data/version1/AnnouncementV1';
export interface IAnnouncementsPersistence extends IGetter<AnnouncementV1, string>, IWriter<AnnouncementV1, string> {
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<AnnouncementV1>) => void): void;
    getOneRandom(correlationId: string, filter: FilterParams, callback: (err: any, item: AnnouncementV1) => void): void;
    getOneById(correlationId: string, id: string, callback: (err: any, item: AnnouncementV1) => void): void;
    create(correlationId: string, item: AnnouncementV1, callback: (err: any, item: AnnouncementV1) => void): void;
    update(correlationId: string, item: AnnouncementV1, callback: (err: any, item: AnnouncementV1) => void): void;
    deleteById(correlationId: string, id: string, callback: (err: any, item: AnnouncementV1) => void): void;
}
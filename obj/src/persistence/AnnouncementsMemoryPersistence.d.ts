import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IdentifiableMemoryPersistence } from 'pip-services3-data-node';
import { AnnouncementV1 } from '../data/version1/AnnouncementV1';
import { IAnnouncementsPersistence } from './IAnnouncementsPersistence';
export declare class AnnouncementsMemoryPersistence extends IdentifiableMemoryPersistence<AnnouncementV1, string> implements IAnnouncementsPersistence {
    constructor();
    private matchString;
    private matchMultiString;
    private matchSearch;
    private contains;
    private composeFilter;
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<AnnouncementV1>) => void): void;
    getOneRandom(correlationId: string, filter: FilterParams, callback: (err: any, item: AnnouncementV1) => void): void;
}

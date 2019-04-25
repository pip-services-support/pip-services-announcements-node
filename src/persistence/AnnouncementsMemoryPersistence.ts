let _ = require('lodash');

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { AnyValueMap } from 'pip-services3-commons-node';
import { IdentifiableMemoryPersistence } from 'pip-services3-data-node';
import { MultiString } from 'pip-services3-commons-node';
import { TagsProcessor } from 'pip-services3-commons-node';

import { AnnouncementV1 } from '../data/version1/AnnouncementV1';
import { PartyReferenceV1 } from '../data/version1/PartyReferenceV1';
import { IAnnouncementsPersistence } from './IAnnouncementsPersistence';

export class AnnouncementsMemoryPersistence 
    extends IdentifiableMemoryPersistence<AnnouncementV1, string> 
    implements IAnnouncementsPersistence {

    constructor() {
        super();
    }

    private matchString(value: string, search: string): boolean {
        if (value == null && search == null)
            return true;
        if (value == null || search == null)
            return false;
        return value.toLowerCase().indexOf(search) >= 0;
    }

    private matchMultiString(item: MultiString, search: string): boolean {
        if (item == null) return false;

        for (let prop in item) {
            if (this.matchString(item[prop], search))
                return true;
        }

        return false;
    }

    private matchSearch(item: AnnouncementV1, search: string): boolean {
        search = search.toLowerCase();
        if (this.matchMultiString(item.title, search))
            return true;
        if (this.matchMultiString(item.content, search))
            return true;
        if (item.location && this.matchString(item.location.name, search))
            return true;
        if (item.creator && this.matchString(item.creator.name, search))
            return true;
        return false;
    }

    private contains(array1: string[], array2: string[]): boolean {
        if (array1 == null || array2 == null) return false;
        
        for (let i1 = 0; i1 < array1.length; i1++) {
            for (let i2 = 0; i2 < array2.length; i2++)
                if (array1[i1] == array2[i1]) 
                    return true;
        }
        
        return false;
    }

    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();
        let search = filter.getAsNullableString('search');
        let id = filter.getAsNullableString('id');
        let category = filter.getAsNullableString('category');
        let app = filter.getAsNullableString('app');
        let status = filter.getAsNullableString('status');
        let tagsString = filter.get('tags');
        let tags = tagsString != null ? TagsProcessor.compressTags([tagsString]) : null;
        let fromCreateTime = filter.getAsNullableDateTime('from_create_time');
        let toCreateTime = filter.getAsNullableDateTime('to_create_time');

        return (item: AnnouncementV1) => {
            if (id != null && id != item.id)
                return false;
            if (category != null && category != item.category)
                return false;
            if (app != null && app != item.app)
                return false;
            if (status != null && status != item.status)
                return false;
            if (tags != null && !this.contains(item.all_tags, tags))
                return false;
            if (fromCreateTime != null && item.create_time >= fromCreateTime)
                return false;
            if (toCreateTime != null && item.create_time < toCreateTime)
                return false;
            if (search != null && !this.matchSearch(item, search))
                return false;
            return true;
        };
    }

    public getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<AnnouncementV1>) => void): void {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }

    public getOneRandom(correlationId: string, filter: FilterParams,
        callback: (err: any, item: AnnouncementV1) => void): void {
        super.getOneRandom(correlationId, this.composeFilter(filter), callback);
    }

}

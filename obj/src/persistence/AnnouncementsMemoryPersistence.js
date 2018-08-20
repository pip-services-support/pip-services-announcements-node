"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_data_node_1 = require("pip-services-data-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
class AnnouncementsMemoryPersistence extends pip_services_data_node_1.IdentifiableMemoryPersistence {
    constructor() {
        super();
    }
    matchString(value, search) {
        if (value == null && search == null)
            return true;
        if (value == null || search == null)
            return false;
        return value.toLowerCase().indexOf(search) >= 0;
    }
    matchMultiString(item, search) {
        if (item == null)
            return false;
        for (let prop in item) {
            if (this.matchString(item[prop], search))
                return true;
        }
        return false;
    }
    matchSearch(item, search) {
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
    contains(array1, array2) {
        if (array1 == null || array2 == null)
            return false;
        for (let i1 = 0; i1 < array1.length; i1++) {
            for (let i2 = 0; i2 < array2.length; i2++)
                if (array1[i1] == array2[i1])
                    return true;
        }
        return false;
    }
    composeFilter(filter) {
        filter = filter || new pip_services_commons_node_1.FilterParams();
        let search = filter.getAsNullableString('search');
        let id = filter.getAsNullableString('id');
        let category = filter.getAsNullableString('category');
        let app = filter.getAsNullableString('app');
        let status = filter.getAsNullableString('status');
        let tagsString = filter.get('tags');
        let tags = tagsString != null ? pip_services_commons_node_2.TagsProcessor.compressTags([tagsString]) : null;
        let fromCreateTime = filter.getAsNullableDateTime('from_create_time');
        let toCreateTime = filter.getAsNullableDateTime('to_create_time');
        return (item) => {
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
    getPageByFilter(correlationId, filter, paging, callback) {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }
    getOneRandom(correlationId, filter, callback) {
        super.getOneRandom(correlationId, this.composeFilter(filter), callback);
    }
}
exports.AnnouncementsMemoryPersistence = AnnouncementsMemoryPersistence;
//# sourceMappingURL=AnnouncementsMemoryPersistence.js.map
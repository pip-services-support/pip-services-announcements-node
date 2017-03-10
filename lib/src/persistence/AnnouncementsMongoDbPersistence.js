"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _ = require('lodash');
var async = require('async');
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var pip_services_runtime_node_4 = require('pip-services-runtime-node');
var pip_services_runtime_node_5 = require('pip-services-runtime-node');
var pip_services_runtime_node_6 = require('pip-services-runtime-node');
var AnnouncementsDataConverter_1 = require('./AnnouncementsDataConverter');
var AnnouncementsMongoDbPersistence = (function (_super) {
    __extends(AnnouncementsMongoDbPersistence, _super);
    function AnnouncementsMongoDbPersistence() {
        _super.call(this, AnnouncementsMongoDbPersistence.Descriptor, require('./AnnouncementModel'));
    }
    AnnouncementsMongoDbPersistence.prototype.link = function (components) {
        // Locate reference to quotes persistence component
        this._storage = components.getOneRequired(new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Clients, "pip-services-storage", '*', '*'));
        _super.prototype.link.call(this, components);
    };
    AnnouncementsMongoDbPersistence.prototype.defineFilterCondition = function (filter) {
        var criteria = _.pick(filter, 'category', 'app', 'status');
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
            var searchTags = pip_services_runtime_node_5.TagsProcessor.compressTags(filter.tags);
            criteria.$and = criteria.$and || [];
            criteria.$and.push({
                all_tags: { $in: searchTags }
            });
        }
        // Full text search
        if (filter.search) {
            var search = filter.search, searchRegex = new RegExp(search, 'i');
            // Todo: This will not work for multi-language text
            criteria.$or = [
                { title: { $regex: searchRegex } },
                { content: { $regex: searchRegex } },
                { creator_name: { $regex: searchRegex } }
            ];
        }
        return criteria;
    };
    AnnouncementsMongoDbPersistence.prototype.getAnnouncements = function (correlationId, filter, paging, callback) {
        var criteria = this.defineFilterCondition(filter);
        this.getPage(criteria, paging, '-created', { custom_dat: 0 }, callback);
    };
    AnnouncementsMongoDbPersistence.prototype.getRandomAnnouncement = function (correlationId, filter, callback) {
        var filterParams = filter || {};
        // Limit announcements to 1 week by default
        if (filterParams.from == null)
            filterParams.from = new Date(new Date().getTime() - 7 * 24 * 3600000);
        var criteria = this.defineFilterCondition(filterParams);
        this.getRandom(criteria, callback);
    };
    AnnouncementsMongoDbPersistence.prototype.getAnnouncementById = function (correlationId, announcementId, callback) {
        this.getById(announcementId, callback);
    };
    AnnouncementsMongoDbPersistence.prototype.createAnnouncement = function (correlationId, announcement, callback) {
        var _this = this;
        var newItem = AnnouncementsDataConverter_1.AnnouncementsDataConverter.validate(announcement);
        newItem._id = newItem.id || this.createUuid();
        newItem.created = new Date();
        newItem.status = newItem.status || 'new';
        newItem.importance = newItem.importance || 0;
        newItem.all_tags = pip_services_runtime_node_5.TagsProcessor.extractHashTags(newItem, ['title', 'content']);
        var item;
        async.series([
            // Create announcement
            function (callback) {
                _this._model.create(newItem, function (err, data) {
                    item = data;
                    callback(err);
                });
            },
            // Add file references
            function (callback) {
                _this._storage.addBlockRefs(correlationId, AnnouncementsDataConverter_1.AnnouncementsDataConverter.getBlockIds(item), {
                    type: 'announcement',
                    id: item._id,
                    name: pip_services_runtime_node_4.Converter.fromMultiString(item)
                }, callback);
            }
        ], function (err) {
            item = _this.convertItem(item);
            callback(err, item);
        });
    };
    AnnouncementsMongoDbPersistence.prototype.updateAnnouncement = function (correlationId, announcementId, announcement, callback) {
        var _this = this;
        var newItem = AnnouncementsDataConverter_1.AnnouncementsDataConverter.validate(announcement);
        newItem = _.omit(newItem, '_id', 'creator', 'created');
        var oldItem, item;
        async.series([
            // Retrieve announcement
            function (callback) {
                _this._model.findById(announcementId, function (err, data) {
                    if (err == null && data == null) {
                        err = new pip_services_runtime_node_6.NotFoundError(_this, 'AnnouncementNotFound', 'Announcements was not found')
                            .withCorrelationId(correlationId)
                            .withDetails(announcementId);
                    }
                    item = data;
                    oldItem = _this.jsonToPublic(data);
                    callback(err);
                });
            },
            // Update announcement
            function (callback) {
                _.assign(item, newItem);
                item.all_tags = pip_services_runtime_node_5.TagsProcessor.extractHashTags(newItem, ['title', 'content']);
                item.save(callback);
            },
            // Update block references
            function (callback) {
                _this._storage.updateBlockRefs(correlationId, AnnouncementsDataConverter_1.AnnouncementsDataConverter.getBlockIds(oldItem), AnnouncementsDataConverter_1.AnnouncementsDataConverter.getBlockIds(item), {
                    type: 'announcement',
                    id: item._id,
                    name: pip_services_runtime_node_4.Converter.fromMultiString(item.title)
                }, callback);
            },
        ], function (err) {
            item = _this.convertItem(item);
            callback(err, item);
        });
    };
    AnnouncementsMongoDbPersistence.prototype.deleteAnnouncement = function (correlationId, announcementId, callback) {
        var _this = this;
        var item;
        async.series([
            // Remove announcement
            function (callback) {
                _this._model.findByIdAndRemove(announcementId, function (err, data) {
                    item = data;
                    callback(err);
                });
            },
            // Remove block references
            function (callback) {
                if (item == null) {
                    callback();
                    return;
                }
                _this._storage.removeBlockRefs(correlationId, AnnouncementsDataConverter_1.AnnouncementsDataConverter.getBlockIds(item), {
                    type: 'announcement',
                    id: item._id
                }, callback);
            }
        ], function (err) {
            callback(err);
        });
    };
    /**
     * Unique descriptor for the AnnouncementsMongoDbPersistence component
     */
    AnnouncementsMongoDbPersistence.Descriptor = new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Persistence, "pip-services-announces", "mongodb", "*");
    return AnnouncementsMongoDbPersistence;
}(pip_services_runtime_node_3.MongoDbPersistence));
exports.AnnouncementsMongoDbPersistence = AnnouncementsMongoDbPersistence;

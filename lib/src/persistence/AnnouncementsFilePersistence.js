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
var AnnouncementsFilePersistence = (function (_super) {
    __extends(AnnouncementsFilePersistence, _super);
    function AnnouncementsFilePersistence(descriptor) {
        _super.call(this, descriptor || AnnouncementsFilePersistence.Descriptor);
    }
    AnnouncementsFilePersistence.prototype.link = function (components) {
        // Locate reference to announces persistence component
        this._storage = components.getOneRequired(new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Clients, "pip-services-storage", '*', '*'));
        _super.prototype.link.call(this, components);
    };
    AnnouncementsFilePersistence.prototype.contains = function (array1, array2) {
        if (array1 == null || array2 == null)
            return false;
        for (var i1 = 0; i1 < array1.length; i1++) {
            for (var i2 = 0; i2 < array2.length; i2++)
                if (array1[i1] == array2[i1])
                    return true;
        }
        return false;
    };
    AnnouncementsFilePersistence.prototype.filterAnnouncements = function (filter) {
        var _this = this;
        var category = filter.category;
        var app = filter.app;
        var status = filter.status;
        var from = pip_services_runtime_node_4.Converter.toDate(filter.from);
        var to = pip_services_runtime_node_4.Converter.toDate(filter.to);
        var search = filter.search;
        var searchRegex = search ? new RegExp(search, 'i') : null;
        var tags = filter.tags;
        if (tags)
            tags = pip_services_runtime_node_5.TagsProcessor.compressTags(tags);
        return function (item) {
            if (category && item.category != category)
                return false;
            if (app && item.app != app)
                return false;
            if (status && item.status != status)
                return false;
            if (from && item.from < from)
                return false;
            if (to && item.to >= to)
                return false;
            if (tags && !_this.contains(item.all_tags, tags))
                return false;
            // Todo: This will not work for multi-language text
            if (searchRegex) {
                if (!searchRegex.test(item.title))
                    return false;
                if (!searchRegex.test(item.content))
                    return false;
                if (!searchRegex.test(item.creator_name))
                    return false;
            }
            return true;
        };
    };
    AnnouncementsFilePersistence.prototype.getAnnouncements = function (correlationId, filter, paging, callback) {
        var filterParams = filter || {};
        var filterFunc = this.filterAnnouncements(filterParams);
        this.getPage(filterFunc, paging, null, null, callback);
    };
    AnnouncementsFilePersistence.prototype.getRandomAnnouncement = function (correlationId, filter, callback) {
        var filterParams = filter || {};
        // Limit announcements to 1 week by default
        if (filterParams.from == null)
            filterParams.from = new Date(new Date().getTime() - 7 * 24 * 3600000);
        var filterFunc = this.filterAnnouncements(filterParams);
        this.getRandom(filterFunc, callback);
    };
    AnnouncementsFilePersistence.prototype.getAnnouncementById = function (correlationId, announcementId, callback) {
        this.getById(announcementId, callback);
    };
    AnnouncementsFilePersistence.prototype.createAnnouncement = function (correlationId, announcement, callback) {
        var _this = this;
        var item = AnnouncementsDataConverter_1.AnnouncementsDataConverter.validate(announcement);
        item.id = item.id || this.createUuid();
        item.created = new Date();
        item.status = item.status || 'new';
        item.importance = item.importance || 0;
        item.tags = item.tags || [];
        item.all_tags = pip_services_runtime_node_5.TagsProcessor.extractHashTags(item, ['title', 'content']);
        async.series([
            // Create announcement
            function (callback) {
                _this.create(item, callback);
            },
            // Add file references
            function (callback) {
                _this._storage.addBlockRefs(correlationId, AnnouncementsDataConverter_1.AnnouncementsDataConverter.getBlockIds(item), {
                    type: 'announcement',
                    id: item.id,
                    name: pip_services_runtime_node_4.Converter.fromMultiString(item.title)
                }, callback);
            }
        ], function (err) {
            callback(err, item);
        });
    };
    AnnouncementsFilePersistence.prototype.updateAnnouncement = function (correlationId, announcementId, announcement, callback) {
        var _this = this;
        var newItem = AnnouncementsDataConverter_1.AnnouncementsDataConverter.validate(announcement);
        newItem = _.omit(newItem, '_id', 'creator', 'created');
        var oldItem, item;
        async.series([
            // Retrieve announcement
            function (callback) {
                _this.getById(announcementId, function (err, data) {
                    if (err == null && data == null) {
                        err = new pip_services_runtime_node_6.NotFoundError(_this, 'AnnouncementNotFound', 'Announcements was not found')
                            .withCorrelationId(correlationId)
                            .withDetails(announcementId);
                    }
                    item = data;
                    oldItem = _.cloneDeep(item);
                    callback(err);
                });
            },
            // Update announcement
            function (callback) {
                _.assign(item, newItem);
                item.all_tags = pip_services_runtime_node_5.TagsProcessor.extractHashTags(newItem, ['title', 'content']);
                _this.save(callback);
            },
            // Update block references
            function (callback) {
                _this._storage.updateBlockRefs(correlationId, AnnouncementsDataConverter_1.AnnouncementsDataConverter.getBlockIds(oldItem), AnnouncementsDataConverter_1.AnnouncementsDataConverter.getBlockIds(item), {
                    type: 'announcement',
                    id: item.id,
                    name: pip_services_runtime_node_4.Converter.fromMultiString(item.title)
                }, callback);
            },
        ], function (err) {
            callback(err, item);
        });
    };
    AnnouncementsFilePersistence.prototype.deleteAnnouncement = function (correlationId, announcementId, callback) {
        var _this = this;
        var item;
        async.series([
            // Remove announcement
            function (callback) {
                _this.delete(announcementId, function (err, data) {
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
                    id: item.id
                }, callback);
            }
        ], function (err) {
            callback(err, item);
        });
    };
    /**
     * Unique descriptor for the AnnouncementsFilePersistence component
     */
    AnnouncementsFilePersistence.Descriptor = new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Persistence, "pip-services-annonces", "file", "*");
    return AnnouncementsFilePersistence;
}(pip_services_runtime_node_3.FilePersistence));
exports.AnnouncementsFilePersistence = AnnouncementsFilePersistence;

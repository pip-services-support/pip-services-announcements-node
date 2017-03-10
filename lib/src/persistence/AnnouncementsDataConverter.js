"use strict";
var _ = require('lodash');
/**
 * Announcements data converter
 *
 * @author Sergey Seroukhov
 * @version 1.0
 * @since 2016-05-01
 */
var AnnouncementsDataConverter = (function () {
    function AnnouncementsDataConverter() {
    }
    AnnouncementsDataConverter.validate = function (item) {
        return _.pick(item, 'id', 'category', 'app', 'creator', 'created', 'title', 'content', 'loc', 'start', 'end', 'pic_ids', 'docs', 'tags', 'all_tags', 'status', 'importance', 'custom_hdr', 'custom_dat');
    };
    // Extracts block ids from an announcement from pic_ids and docs fields
    AnnouncementsDataConverter.getBlockIds = function (item) {
        var blockIds = [];
        // Process pictures
        _.each(item.pic_ids, function (id) {
            blockIds.push(id);
        });
        // Process documents
        _.each(item.docs, function (doc) {
            blockIds.push(doc.id);
        });
        return blockIds;
    };
    return AnnouncementsDataConverter;
}());
exports.AnnouncementsDataConverter = AnnouncementsDataConverter;

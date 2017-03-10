"use strict";
var async = require('async');
var assert = require('chai').assert;
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var ANNOUNCEMENT1 = {
    id: '1',
    category: 'maintenance',
    creator: {
        id: '1',
        name: 'Test User'
    },
    title: { en: 'Announcement 1' },
    content: 'Sample Announcement #1'
};
var ANNOUNCEMENT2 = {
    id: '2',
    tags: ['TAG 1'],
    category: 'maintenance',
    creator: {
        id: '1',
        name: 'Test User'
    },
    title: { en: 'Announcement 2' },
    content: 'Sample Announcement #2'
};
var ANNOUNCEMENT3 = {
    id: '3',
    tags: ['Tag 1', 'tag 2'],
    category: 'maintenance',
    creator: {
        id: '1',
        name: 'Test User'
    },
    title: { en: 'Announcement 3' },
    content: 'Sample Announcement #3',
    status: 'translating'
};
var AnnouncementsPersistenceFixture = (function () {
    function AnnouncementsPersistenceFixture(db) {
        assert.isNotNull(db);
        this._db = db;
    }
    AnnouncementsPersistenceFixture.prototype.createAnnouncements = function (done) {
        var _this = this;
        async.series([
            // Create one announcement
            function (callback) {
                _this._db.createAnnouncement(null, ANNOUNCEMENT1, function (err, announcement) {
                    assert.isNull(err);
                    assert.isObject(announcement);
                    assert.equal(announcement.status, 'new');
                    assert.equal(announcement.category, ANNOUNCEMENT1.category);
                    assert.equal(announcement.content, ANNOUNCEMENT1.content);
                    callback();
                });
            },
            // Create another announcement
            function (callback) {
                _this._db.createAnnouncement(null, ANNOUNCEMENT2, function (err, announcement) {
                    assert.isNull(err);
                    assert.isObject(announcement);
                    assert.equal(announcement.status, 'new');
                    assert.equal(announcement.category, ANNOUNCEMENT2.category);
                    assert.equal(announcement.content, ANNOUNCEMENT2.content);
                    callback();
                });
            },
            // Create yet another announcement
            function (callback) {
                _this._db.createAnnouncement(null, ANNOUNCEMENT3, function (err, announcement) {
                    assert.isNull(err);
                    assert.isObject(announcement);
                    assert.equal(announcement.status, ANNOUNCEMENT3.status);
                    assert.equal(announcement.category, ANNOUNCEMENT3.category);
                    assert.equal(announcement.content, ANNOUNCEMENT3.content);
                    callback();
                });
            }
        ], done);
    };
    AnnouncementsPersistenceFixture.prototype.testCrudOperations = function (done) {
        var _this = this;
        async.series([
            // Create items
            function (callback) {
                _this.createAnnouncements(callback);
            },
            // Get all announcements
            function (callback) {
                _this._db.getAnnouncements(null, new pip_services_runtime_node_1.FilterParams(), new pip_services_runtime_node_2.PagingParams(), function (err, announcements) {
                    assert.isNull(err);
                    assert.isObject(announcements);
                    assert.lengthOf(announcements.data, 3);
                    callback();
                });
            },
            // Update the announcement
            function (callback) {
                _this._db.updateAnnouncement(null, ANNOUNCEMENT1.id, { content: 'Updated Content 1' }, function (err, announcement) {
                    assert.isNull(err);
                    assert.isObject(announcement);
                    assert.equal(announcement.content, 'Updated Content 1');
                    assert.equal(announcement.category, ANNOUNCEMENT1.category);
                    callback();
                });
            },
            // Delete announcement
            function (callback) {
                _this._db.deleteAnnouncement(null, ANNOUNCEMENT1.id, function (err) {
                    assert.isNull(err);
                    callback();
                });
            },
            // Try to get delete announcement
            function (callback) {
                _this._db.getAnnouncementById(null, ANNOUNCEMENT1.id, function (err, announcement) {
                    assert.isNull(err);
                    assert.isNull(announcement || null);
                    callback();
                });
            }
        ], done);
    };
    AnnouncementsPersistenceFixture.prototype.testGetWithFilter = function (done) {
        var _this = this;
        async.series([
            // Create announcements
            function (callback) {
                _this.createAnnouncements(callback);
            },
            // Get announcements filtered by tags
            function (callback) {
                _this._db.getAnnouncements(null, pip_services_runtime_node_1.FilterParams.fromValue({
                    tags: ['tag 1']
                }), new pip_services_runtime_node_2.PagingParams(), function (err, announcements) {
                    assert.isNull(err);
                    assert.isObject(announcements);
                    assert.lengthOf(announcements.data, 2);
                    callback();
                });
            },
            // Get announcements filtered by status
            function (callback) {
                _this._db.getAnnouncements(null, pip_services_runtime_node_1.FilterParams.fromValue({
                    status: ANNOUNCEMENT3.status
                }), new pip_services_runtime_node_2.PagingParams(), function (err, announcements) {
                    assert.isNull(err);
                    assert.isObject(announcements);
                    assert.lengthOf(announcements.data, 1);
                    callback();
                });
            },
        ], done);
    };
    AnnouncementsPersistenceFixture.prototype.testGetRandom = function (done) {
        var _this = this;
        async.series([
            // Create announcements
            function (callback) {
                _this.createAnnouncements(callback);
            },
            // Get random announcement filtered by tags
            function (callback) {
                _this._db.getRandomAnnouncement(null, pip_services_runtime_node_1.FilterParams.fromValue({
                    tags: ['tag 1'],
                    status: 'new'
                }), function (err, announcement) {
                    assert.isNull(err);
                    assert.isObject(announcement);
                    assert.equal(ANNOUNCEMENT2.id, announcement.id);
                    callback();
                });
            }
        ], done);
    };
    return AnnouncementsPersistenceFixture;
}());
exports.AnnouncementsPersistenceFixture = AnnouncementsPersistenceFixture;

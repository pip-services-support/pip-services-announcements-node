"use strict";
var _ = require('lodash');
var async = require('async');
var restify = require('restify');
var assert = require('chai').assert;
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var pip_clients_storage_node_1 = require('pip-clients-storage-node');
var StorageNullClient = pip_clients_storage_node_1.Version1.StorageNullClient;
var AnnouncementsMemoryPersistence_1 = require('../../../src/persistence/AnnouncementsMemoryPersistence');
var AnnouncementsController_1 = require('../../../src/logic/AnnouncementsController');
var AnnouncementsRestService_1 = require('../../../src/services/version1/AnnouncementsRestService');
var restConfig = pip_services_runtime_node_2.ComponentConfig.fromTuples('endpoint.host', 'localhost', 'endpoint.port', 3000);
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
suite('AnnouncementsRestService', function () {
    var db = new AnnouncementsMemoryPersistence_1.AnnouncementsMemoryPersistence();
    db.configure(new pip_services_runtime_node_2.ComponentConfig());
    var ctrl = new AnnouncementsController_1.AnnouncementsController();
    ctrl.configure(new pip_services_runtime_node_2.ComponentConfig());
    var service = new AnnouncementsRestService_1.AnnouncementsRestService();
    service.configure(restConfig);
    var storage = new StorageNullClient();
    storage.configure(new pip_services_runtime_node_2.ComponentConfig());
    var components = pip_services_runtime_node_1.ComponentSet.fromComponents(db, storage, ctrl, service);
    var url = restConfig.getEndpoint().getUri();
    var rest = restify.createJsonClient({ url: url, version: '*' });
    suiteSetup(function (done) {
        pip_services_runtime_node_3.LifeCycleManager.linkAndOpen(components, done);
    });
    suiteTeardown(function (done) {
        pip_services_runtime_node_3.LifeCycleManager.close(components, done);
    });
    setup(function (done) {
        db.clearTestData(done);
    });
    test('CRUD Operations', function (done) {
        var announcement1, announcement2;
        async.series([
            // Create one announcement
            function (callback) {
                rest.post('/announcements', ANNOUNCEMENT1, function (err, req, res, announcement) {
                    assert.isNull(err);
                    assert.isObject(announcement);
                    assert.equal(announcement.category, ANNOUNCEMENT1.category);
                    assert.equal(announcement.content, ANNOUNCEMENT1.content);
                    announcement1 = announcement;
                    callback();
                });
            },
            // Create another announcement
            function (callback) {
                rest.post('/announcements', ANNOUNCEMENT2, function (err, req, res, announcement) {
                    assert.isNull(err);
                    assert.isObject(announcement);
                    assert.equal(announcement.category, ANNOUNCEMENT2.category);
                    assert.equal(announcement.content, ANNOUNCEMENT2.content);
                    announcement2 = announcement;
                    callback();
                });
            },
            // Get all announcements
            function (callback) {
                rest.get('/announcements', function (err, req, res, announcements) {
                    assert.isNull(err);
                    assert.isObject(announcements);
                    assert.lengthOf(announcements.data, 2);
                    callback();
                });
            },
            // Update the announcement
            function (callback) {
                rest.put('/announcements/' + announcement1.id, { content: 'Updated Content 1' }, function (err, req, res, announcement) {
                    assert.isNull(err);
                    assert.isObject(announcement);
                    assert.equal(announcement.content, 'Updated Content 1');
                    assert.equal(announcement.category, ANNOUNCEMENT1.category);
                    announcement1 = announcement;
                    callback();
                });
            },
            // Delete announcement
            function (callback) {
                rest.del('/announcements/' + announcement1.id, function (err, req, res, result) {
                    assert.isNull(err);
                    callback();
                });
            },
            // Try to get delete announcement
            function (callback) {
                rest.get('/announcements/' + announcement1.id, function (err, req, res, announcement) {
                    //assert.isNull(err, announcement);
                    callback();
                });
            }
        ], done);
    });
});

"use strict";
var _ = require('lodash');
var async = require('async');
var assert = require('chai').assert;
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var pip_services_runtime_node_4 = require('pip-services-runtime-node');
var pip_clients_storage_node_1 = require('pip-clients-storage-node');
var StorageNullClient = pip_clients_storage_node_1.Version1.StorageNullClient;
var AnnouncementsMemoryPersistence_1 = require('../../../src/persistence/AnnouncementsMemoryPersistence');
var AnnouncementsController_1 = require('../../../src/logic/AnnouncementsController');
var AnnouncementsSenecaService_1 = require('../../../src/services/version1/AnnouncementsSenecaService');
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
suite('AnnouncementsSenecaService', function () {
    var db = new AnnouncementsMemoryPersistence_1.AnnouncementsMemoryPersistence();
    db.configure(new pip_services_runtime_node_2.ComponentConfig());
    var ctrl = new AnnouncementsController_1.AnnouncementsController();
    ctrl.configure(new pip_services_runtime_node_2.ComponentConfig());
    var service = new AnnouncementsSenecaService_1.AnnouncementsSenecaService();
    service.configure(new pip_services_runtime_node_2.ComponentConfig());
    var storage = new StorageNullClient();
    storage.configure(new pip_services_runtime_node_2.ComponentConfig());
    var seneca = new pip_services_runtime_node_3.SenecaAddon();
    seneca.configure(new pip_services_runtime_node_2.ComponentConfig());
    var components = pip_services_runtime_node_1.ComponentSet.fromComponents(db, storage, ctrl, service, seneca);
    suiteSetup(function (done) {
        pip_services_runtime_node_4.LifeCycleManager.linkAndOpen(components, done);
    });
    suiteTeardown(function (done) {
        seneca.getSeneca().close(function () {
            pip_services_runtime_node_4.LifeCycleManager.close(components, done);
        });
    });
    setup(function (done) {
        db.clearTestData(done);
    });
    test('CRUD Operations', function (done) {
        var announcement1, announcement2;
        async.series([
            // Create one announcement
            function (callback) {
                seneca.getSeneca().act({
                    role: 'announcements',
                    cmd: 'create_announcement',
                    announcement: ANNOUNCEMENT1
                }, function (err, announcement) {
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
                seneca.getSeneca().act({
                    role: 'announcements',
                    cmd: 'create_announcement',
                    announcement: ANNOUNCEMENT2
                }, function (err, announcement) {
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
                seneca.getSeneca().act({
                    role: 'announcements',
                    cmd: 'get_announcements'
                }, function (err, announcements) {
                    assert.isNull(err);
                    assert.isObject(announcements);
                    assert.lengthOf(announcements.data, 2);
                    callback();
                });
            },
            // Update the announcement
            function (callback) {
                seneca.getSeneca().act({
                    role: 'announcements',
                    cmd: 'update_announcement',
                    announcement_id: announcement1.id,
                    announcement: { content: 'Updated Content 1' }
                }, function (err, announcement) {
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
                seneca.getSeneca().act({
                    role: 'announcements',
                    cmd: 'delete_announcement',
                    announcement_id: announcement1.id
                }, function (err) {
                    assert.isNull(err);
                    callback();
                });
            },
            // Try to get delete announcement
            function (callback) {
                seneca.getSeneca().act({
                    role: 'announcements',
                    cmd: 'get_announcement_by_id',
                    announcement_id: announcement1.id
                }, function (err, announcement) {
                    assert.isNull(err);
                    assert.isNull(announcement || null);
                    callback();
                });
            }
        ], done);
    });
});

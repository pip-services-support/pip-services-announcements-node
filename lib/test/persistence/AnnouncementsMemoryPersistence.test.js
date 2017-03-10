"use strict";
var pip_clients_storage_node_1 = require('pip-clients-storage-node');
var StorageNullClient = pip_clients_storage_node_1.Version1.StorageNullClient;
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var AnnouncementsMemoryPersistence_1 = require('../../src/persistence/AnnouncementsMemoryPersistence');
var AnnouncementsPersistenceFixture_1 = require('./AnnouncementsPersistenceFixture');
suite('AnnouncementsFilePersistence', function () {
    var db, fixture, storage;
    setup(function (done) {
        db = new AnnouncementsMemoryPersistence_1.AnnouncementsMemoryPersistence();
        db.configure(new pip_services_runtime_node_2.ComponentConfig());
        fixture = new AnnouncementsPersistenceFixture_1.AnnouncementsPersistenceFixture(db);
        storage = new StorageNullClient();
        storage.configure(new pip_services_runtime_node_2.ComponentConfig());
        var components = pip_services_runtime_node_1.ComponentSet.fromComponents(db, storage);
        db.link(components);
        db.open(done);
    });
    teardown(function (done) {
        db.close(done);
    });
    test('CRUD Operations', function (done) {
        fixture.testCrudOperations(done);
    });
    test('Get with Filters', function (done) {
        fixture.testGetWithFilter(done);
    });
    test('Get Random', function (done) {
        fixture.testGetRandom(done);
    });
});

"use strict";
var pip_clients_storage_node_1 = require('pip-clients-storage-node');
var StorageNullClient = pip_clients_storage_node_1.Version1.StorageNullClient;
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var AnnouncementsMongoDbPersistence_1 = require('../../src/persistence/AnnouncementsMongoDbPersistence');
var AnnouncementsPersistenceFixture_1 = require('./AnnouncementsPersistenceFixture');
var options = new pip_services_runtime_node_3.DynamicMap(require('../../../config/config'));
var dbOptions = pip_services_runtime_node_2.ComponentConfig.fromValue(options.getNullableMap('persistence'));
suite('AnnouncementsMongoDbPersistence', function () {
    // Skip test if mongodb is not configured
    if (dbOptions.getRawContent().getString('descriptor.type') != 'mongodb')
        return;
    var db = new AnnouncementsMongoDbPersistence_1.AnnouncementsMongoDbPersistence();
    db.configure(dbOptions);
    var fixture = new AnnouncementsPersistenceFixture_1.AnnouncementsPersistenceFixture(db);
    var storage = new StorageNullClient(null);
    var components = pip_services_runtime_node_1.ComponentSet.fromComponents(db, storage);
    suiteSetup(function (done) {
        db.link(components);
        db.open(done);
    });
    suiteTeardown(function (done) {
        db.close(done);
    });
    setup(function (done) {
        db.clearTestData(done);
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

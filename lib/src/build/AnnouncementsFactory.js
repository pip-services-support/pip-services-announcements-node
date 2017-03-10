"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_clients_storage_node_1 = require('pip-clients-storage-node');
var AnnouncementsMongoDbPersistence_1 = require('../persistence/AnnouncementsMongoDbPersistence');
var AnnouncementsFilePersistence_1 = require('../persistence/AnnouncementsFilePersistence');
var AnnouncementsMemoryPersistence_1 = require('../persistence/AnnouncementsMemoryPersistence');
var AnnouncementsController_1 = require('../logic/AnnouncementsController');
var AnnouncementsRestService_1 = require('../services/version1/AnnouncementsRestService');
var AnnouncementsSenecaService_1 = require('../services/version1/AnnouncementsSenecaService');
var AnnouncementsFactory = (function (_super) {
    __extends(AnnouncementsFactory, _super);
    function AnnouncementsFactory() {
        _super.call(this, pip_clients_storage_node_1.StorageFactory.Instance, pip_services_runtime_node_2.DefaultFactory.Instance);
        this.register(AnnouncementsFilePersistence_1.AnnouncementsFilePersistence.Descriptor, AnnouncementsFilePersistence_1.AnnouncementsFilePersistence);
        this.register(AnnouncementsMemoryPersistence_1.AnnouncementsMemoryPersistence.Descriptor, AnnouncementsMemoryPersistence_1.AnnouncementsMemoryPersistence);
        this.register(AnnouncementsMongoDbPersistence_1.AnnouncementsMongoDbPersistence.Descriptor, AnnouncementsMongoDbPersistence_1.AnnouncementsMongoDbPersistence);
        this.register(AnnouncementsController_1.AnnouncementsController.Descriptor, AnnouncementsController_1.AnnouncementsController);
        this.register(AnnouncementsRestService_1.AnnouncementsRestService.Descriptor, AnnouncementsRestService_1.AnnouncementsRestService);
        this.register(AnnouncementsSenecaService_1.AnnouncementsSenecaService.Descriptor, AnnouncementsSenecaService_1.AnnouncementsSenecaService);
    }
    AnnouncementsFactory.Instance = new AnnouncementsFactory();
    return AnnouncementsFactory;
}(pip_services_runtime_node_1.ComponentFactory));
exports.AnnouncementsFactory = AnnouncementsFactory;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const AnnouncementsMongoDbPersistence_1 = require("../persistence/AnnouncementsMongoDbPersistence");
const AnnouncementsFilePersistence_1 = require("../persistence/AnnouncementsFilePersistence");
const AnnouncementsMemoryPersistence_1 = require("../persistence/AnnouncementsMemoryPersistence");
const AnnouncementsController_1 = require("../logic/AnnouncementsController");
const AnnouncementsHttpServiceV1_1 = require("../services/version1/AnnouncementsHttpServiceV1");
const AnnouncementsSenecaServiceV1_1 = require("../services/version1/AnnouncementsSenecaServiceV1");
class AnnouncementsServiceFactory extends pip_services_commons_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(AnnouncementsServiceFactory.MemoryPersistenceDescriptor, AnnouncementsMemoryPersistence_1.AnnouncementsMemoryPersistence);
        this.registerAsType(AnnouncementsServiceFactory.FilePersistenceDescriptor, AnnouncementsFilePersistence_1.AnnouncementsFilePersistence);
        this.registerAsType(AnnouncementsServiceFactory.MongoDbPersistenceDescriptor, AnnouncementsMongoDbPersistence_1.AnnouncementsMongoDbPersistence);
        this.registerAsType(AnnouncementsServiceFactory.ControllerDescriptor, AnnouncementsController_1.AnnouncementsController);
        this.registerAsType(AnnouncementsServiceFactory.SenecaServiceDescriptor, AnnouncementsSenecaServiceV1_1.AnnouncementsSenecaServiceV1);
        this.registerAsType(AnnouncementsServiceFactory.HttpServiceDescriptor, AnnouncementsHttpServiceV1_1.AnnouncementsHttpServiceV1);
    }
}
AnnouncementsServiceFactory.Descriptor = new pip_services_commons_node_2.Descriptor("pip-services-announcements", "factory", "default", "default", "1.0");
AnnouncementsServiceFactory.MemoryPersistenceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-announcements", "persistence", "memory", "*", "1.0");
AnnouncementsServiceFactory.FilePersistenceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-announcements", "persistence", "file", "*", "1.0");
AnnouncementsServiceFactory.MongoDbPersistenceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-announcements", "persistence", "mongodb", "*", "1.0");
AnnouncementsServiceFactory.ControllerDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-announcements", "controller", "default", "*", "1.0");
AnnouncementsServiceFactory.SenecaServiceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-announcements", "service", "seneca", "*", "1.0");
AnnouncementsServiceFactory.HttpServiceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-announcements", "service", "http", "*", "1.0");
exports.AnnouncementsServiceFactory = AnnouncementsServiceFactory;
//# sourceMappingURL=AnnouncementsServiceFactory.js.map
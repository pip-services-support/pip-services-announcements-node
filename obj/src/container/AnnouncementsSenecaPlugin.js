"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const pip_services_commons_node_4 = require("pip-services-commons-node");
const pip_services_commons_node_5 = require("pip-services-commons-node");
const pip_services_net_node_1 = require("pip-services-net-node");
const pip_services_net_node_2 = require("pip-services-net-node");
const AnnouncementsMemoryPersistence_1 = require("../persistence/AnnouncementsMemoryPersistence");
const AnnouncementsFilePersistence_1 = require("../persistence/AnnouncementsFilePersistence");
const AnnouncementsMongoDbPersistence_1 = require("../persistence/AnnouncementsMongoDbPersistence");
const AnnouncementsController_1 = require("../logic/AnnouncementsController");
const AnnouncementsSenecaServiceV1_1 = require("../services/version1/AnnouncementsSenecaServiceV1");
class AnnouncementsSenecaPlugin extends pip_services_net_node_1.SenecaPlugin {
    constructor(seneca, options) {
        super('pip-services-announcements', seneca, AnnouncementsSenecaPlugin.createReferences(seneca, options));
    }
    static createReferences(seneca, options) {
        options = options || {};
        let logger = new pip_services_commons_node_4.ConsoleLogger();
        let loggerOptions = options.logger || {};
        logger.configure(pip_services_commons_node_3.ConfigParams.fromValue(loggerOptions));
        let controller = new AnnouncementsController_1.AnnouncementsController();
        let persistence;
        let persistenceOptions = options.persistence || {};
        let persistenceType = persistenceOptions.type || 'memory';
        if (persistenceType == 'mongodb')
            persistence = new AnnouncementsMongoDbPersistence_1.AnnouncementsMongoDbPersistence();
        else if (persistenceType == 'file')
            persistence = new AnnouncementsFilePersistence_1.AnnouncementsFilePersistence();
        else if (persistenceType == 'memory')
            persistence = new AnnouncementsMemoryPersistence_1.AnnouncementsMemoryPersistence();
        else
            throw new pip_services_commons_node_5.ConfigException(null, 'WRONG_PERSISTENCE_TYPE', 'Unrecognized persistence type: ' + persistenceType);
        persistence.configure(pip_services_commons_node_3.ConfigParams.fromValue(persistenceOptions));
        let senecaInstance = new pip_services_net_node_2.SenecaInstance(seneca);
        let service = new AnnouncementsSenecaServiceV1_1.AnnouncementsSenecaServiceV1();
        let serviceOptions = options.service || {};
        service.configure(pip_services_commons_node_3.ConfigParams.fromValue(serviceOptions));
        return pip_services_commons_node_1.References.fromTuples(new pip_services_commons_node_2.Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), logger, new pip_services_commons_node_2.Descriptor('pip-services-net', 'seneca', 'instance', 'default', '1.0'), senecaInstance, new pip_services_commons_node_2.Descriptor('pip-services-announcements', 'persistence', persistenceType, 'default', '1.0'), persistence, new pip_services_commons_node_2.Descriptor('pip-services-announcements', 'controller', 'default', 'default', '1.0'), controller, new pip_services_commons_node_2.Descriptor('pip-services-announcements', 'service', 'seneca', 'default', '1.0'), service);
    }
}
exports.AnnouncementsSenecaPlugin = AnnouncementsSenecaPlugin;
module.exports = function (options) {
    let seneca = this;
    let plugin = new AnnouncementsSenecaPlugin(seneca, options);
    return { name: plugin.name };
};
//# sourceMappingURL=AnnouncementsSenecaPlugin.js.map
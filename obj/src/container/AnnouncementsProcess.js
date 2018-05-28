"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_container_node_1 = require("pip-services-container-node");
const pip_services_net_node_1 = require("pip-services-net-node");
const pip_services_oss_node_1 = require("pip-services-oss-node");
const pip_clients_attachments_node_1 = require("pip-clients-attachments-node");
const AnnouncementsServiceFactory_1 = require("../build/AnnouncementsServiceFactory");
class AnnouncementsProcess extends pip_services_container_node_1.ProcessContainer {
    constructor() {
        super("announcements", "System announcements microservice");
        this._factories.add(new AnnouncementsServiceFactory_1.AnnouncementsServiceFactory);
        this._factories.add(new pip_clients_attachments_node_1.AttachmentsClientFactory);
        this._factories.add(new pip_services_net_node_1.DefaultNetFactory);
        this._factories.add(new pip_services_oss_node_1.DefaultOssFactory);
    }
}
exports.AnnouncementsProcess = AnnouncementsProcess;
//# sourceMappingURL=AnnouncementsProcess.js.map
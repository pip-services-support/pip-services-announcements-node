"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_container_node_1 = require("pip-services-container-node");
const pip_clients_attachments_node_1 = require("pip-clients-attachments-node");
const AnnouncementsServiceFactory_1 = require("../build/AnnouncementsServiceFactory");
const pip_services_rpc_node_1 = require("pip-services-rpc-node");
class AnnouncementsProcess extends pip_services_container_node_1.ProcessContainer {
    constructor() {
        super("announcements", "System announcements microservice");
        this._factories.add(new AnnouncementsServiceFactory_1.AnnouncementsServiceFactory);
        this._factories.add(new pip_clients_attachments_node_1.AttachmentsClientFactory);
        this._factories.add(new pip_services_rpc_node_1.DefaultRpcFactory);
    }
}
exports.AnnouncementsProcess = AnnouncementsProcess;
//# sourceMappingURL=AnnouncementsProcess.js.map
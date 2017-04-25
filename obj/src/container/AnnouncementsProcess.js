"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_container_node_1 = require("pip-services-container-node");
const AnnouncementsServiceFactory_1 = require("../build/AnnouncementsServiceFactory");
class AnnouncementsProcess extends pip_services_container_node_1.ProcessContainer {
    constructor() {
        super("announcements", "System announcements microservice");
        this._factories.add(new AnnouncementsServiceFactory_1.AnnouncementsServiceFactory);
    }
}
exports.AnnouncementsProcess = AnnouncementsProcess;
//# sourceMappingURL=AnnouncementsProcess.js.map
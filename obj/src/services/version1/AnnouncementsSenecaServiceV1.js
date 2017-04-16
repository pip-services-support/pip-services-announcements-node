"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_net_node_1 = require("pip-services-net-node");
class AnnouncementsSenecaServiceV1 extends pip_services_net_node_1.CommandableSenecaService {
    constructor() {
        super('announcements');
        this._dependencyResolver.put('controller', new pip_services_commons_node_1.Descriptor('pip-services-announcements', 'controller', 'default', '*', '1.0'));
    }
}
exports.AnnouncementsSenecaServiceV1 = AnnouncementsSenecaServiceV1;
//# sourceMappingURL=AnnouncementsSenecaServiceV1.js.map
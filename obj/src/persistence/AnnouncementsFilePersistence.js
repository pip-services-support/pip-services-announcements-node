"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_data_node_1 = require("pip-services3-data-node");
const AnnouncementsMemoryPersistence_1 = require("./AnnouncementsMemoryPersistence");
class AnnouncementsFilePersistence extends AnnouncementsMemoryPersistence_1.AnnouncementsMemoryPersistence {
    constructor(path) {
        super();
        this._persister = new pip_services3_data_node_1.JsonFilePersister(path);
        this._loader = this._persister;
        this._saver = this._persister;
    }
    configure(config) {
        super.configure(config);
        this._persister.configure(config);
    }
}
exports.AnnouncementsFilePersistence = AnnouncementsFilePersistence;
//# sourceMappingURL=AnnouncementsFilePersistence.js.map
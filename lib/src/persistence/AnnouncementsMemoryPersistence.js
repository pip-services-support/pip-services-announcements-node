"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _ = require('lodash');
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var AnnouncementsFilePersistence_1 = require('./AnnouncementsFilePersistence');
var AnnouncementsMemoryPersistence = (function (_super) {
    __extends(AnnouncementsMemoryPersistence, _super);
    function AnnouncementsMemoryPersistence() {
        _super.call(this, AnnouncementsMemoryPersistence.Descriptor);
    }
    AnnouncementsMemoryPersistence.prototype.configure = function (config) {
        _super.prototype.configure.call(this, config.withDefaultTuples("options.path", ""));
    };
    AnnouncementsMemoryPersistence.prototype.save = function (callback) {
        // Skip saving data to disk
        if (callback)
            callback(null);
    };
    /**
     * Unique descriptor for the AnnouncementsMemoryPersistence component
     */
    AnnouncementsMemoryPersistence.Descriptor = new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Persistence, "pip-services-announces", "memory", "*");
    return AnnouncementsMemoryPersistence;
}(AnnouncementsFilePersistence_1.AnnouncementsFilePersistence));
exports.AnnouncementsMemoryPersistence = AnnouncementsMemoryPersistence;

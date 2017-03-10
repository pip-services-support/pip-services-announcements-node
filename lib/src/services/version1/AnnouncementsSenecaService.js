"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _ = require('lodash');
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var AnnouncementsSenecaService = (function (_super) {
    __extends(AnnouncementsSenecaService, _super);
    function AnnouncementsSenecaService() {
        _super.call(this, AnnouncementsSenecaService.Descriptor);
    }
    AnnouncementsSenecaService.prototype.link = function (components) {
        this._logic = components.getOnePrior(this, new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.BusinessLogic, "pip-services-announces", "*", "*"));
        _super.prototype.link.call(this, components);
        this.registerCommands('announcements', this._logic.getCommands());
    };
    /**
     * Unique descriptor for the AnnouncementsSenecaService component
     */
    AnnouncementsSenecaService.Descriptor = new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Services, "pip-services-announces", "seneca", "1.0");
    return AnnouncementsSenecaService;
}(pip_services_runtime_node_3.SenecaService));
exports.AnnouncementsSenecaService = AnnouncementsSenecaService;
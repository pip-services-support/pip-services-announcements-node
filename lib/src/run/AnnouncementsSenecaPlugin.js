"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var AnnouncementsMicroservice_1 = require('./AnnouncementsMicroservice');
var AnnouncementsSenecaPlugin = (function (_super) {
    __extends(AnnouncementsSenecaPlugin, _super);
    function AnnouncementsSenecaPlugin() {
        _super.call(this, 'announces', new AnnouncementsMicroservice_1.AnnouncementsMicroservice());
    }
    return AnnouncementsSenecaPlugin;
}(pip_services_runtime_node_1.SenecaPlugin));
exports.AnnouncementsSenecaPlugin = AnnouncementsSenecaPlugin;

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
var pip_services_runtime_node_4 = require('pip-services-runtime-node');
var pip_services_runtime_node_5 = require('pip-services-runtime-node');
var AnnouncementsRestService = (function (_super) {
    __extends(AnnouncementsRestService, _super);
    function AnnouncementsRestService() {
        _super.call(this, AnnouncementsRestService.Descriptor);
    }
    AnnouncementsRestService.prototype.link = function (components) {
        this._logic = components.getOnePrior(this, new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.BusinessLogic, "pip-services-announces", "*", "*"));
        _super.prototype.link.call(this, components);
    };
    AnnouncementsRestService.prototype.getAnnouncements = function (req, res) {
        this._logic.getAnnouncements(req.params.correlation_id, pip_services_runtime_node_3.FilterParams.fromValue(req.params), pip_services_runtime_node_4.PagingParams.fromValue(req.params), this.sendResult(req, res));
    };
    AnnouncementsRestService.prototype.getRandomAnnouncement = function (req, res) {
        this._logic.getRandomAnnouncement(req.params.correlation_id, pip_services_runtime_node_3.FilterParams.fromValue(req.params), this.sendResult(req, res));
    };
    AnnouncementsRestService.prototype.getAnnouncementById = function (req, res) {
        this._logic.getAnnouncementById(req.params.correlation_id, req.params.announcementId, this.sendResult(req, res));
    };
    AnnouncementsRestService.prototype.createAnnouncement = function (req, res) {
        this._logic.createAnnouncement(req.params.correlation_id, req.body, this.sendCreatedResult(req, res));
    };
    AnnouncementsRestService.prototype.updateAnnouncement = function (req, res) {
        this._logic.updateAnnouncement(req.params.correlation_id, req.params.announcementId, req.body, this.sendResult(req, res));
    };
    AnnouncementsRestService.prototype.deleteAnnouncement = function (req, res) {
        this._logic.deleteAnnouncement(req.params.correlation_id, req.params.announcementId, this.sendDeletedResult(req, res));
    };
    AnnouncementsRestService.prototype.register = function () {
        this.registerRoute('get', '/announcements', this.getAnnouncements);
        this.registerRoute('get', '/announcements/random', this.getRandomAnnouncement);
        this.registerRoute('get', '/announcements/:announcementId', this.getAnnouncementById);
        this.registerRoute('post', '/announcements', this.createAnnouncement);
        this.registerRoute('put', '/announcements/:announcementId', this.updateAnnouncement);
        this.registerRoute('delete', '/announcements/:announcementId', this.deleteAnnouncement);
    };
    /**
     * Unique descriptor for the AnnouncementsRestService component
     */
    AnnouncementsRestService.Descriptor = new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Services, "pip-services-announces", "rest", "1.0");
    return AnnouncementsRestService;
}(pip_services_runtime_node_5.RestService));
exports.AnnouncementsRestService = AnnouncementsRestService;

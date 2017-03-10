"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var AnnouncementsCommandSet_1 = require('./AnnouncementsCommandSet');
var AnnouncementsController = (function (_super) {
    __extends(AnnouncementsController, _super);
    function AnnouncementsController() {
        _super.call(this, AnnouncementsController.Descriptor);
    }
    AnnouncementsController.prototype.link = function (components) {
        // Locate reference to announces persistence component
        this._db = components.getOneRequired(new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Persistence, "pip-services-announces", '*', '*'));
        _super.prototype.link.call(this, components);
        // Add commands
        var commands = new AnnouncementsCommandSet_1.AnnouncementsCommandSet(this);
        this.addCommandSet(commands);
    };
    AnnouncementsController.prototype.getAnnouncements = function (correlationId, filter, paging, callback) {
        callback = this.instrument(correlationId, 'announces.get_announcements', callback);
        this._db.getAnnouncements(correlationId, filter, paging, callback);
    };
    AnnouncementsController.prototype.getRandomAnnouncement = function (correlationId, filter, callback) {
        callback = this.instrument(correlationId, 'announces.get_random_announcement', callback);
        this._db.getRandomAnnouncement(correlationId, filter, callback);
    };
    AnnouncementsController.prototype.getAnnouncementById = function (correlationId, announcementId, callback) {
        callback = this.instrument(correlationId, 'announces.get_announcement_by_id', callback);
        this._db.getAnnouncementById(correlationId, announcementId, callback);
    };
    AnnouncementsController.prototype.createAnnouncement = function (correlationId, announcement, callback) {
        callback = this.instrument(correlationId, 'announces.create_announcement', callback);
        this._db.createAnnouncement(correlationId, announcement, callback);
    };
    AnnouncementsController.prototype.updateAnnouncement = function (correlationId, announcementId, announcement, callback) {
        callback = this.instrument(correlationId, 'announces.update_announcement', callback);
        this._db.updateAnnouncement(correlationId, announcementId, announcement, callback);
    };
    AnnouncementsController.prototype.deleteAnnouncement = function (correlationId, announcementId, callback) {
        callback = this.instrument(correlationId, 'announces.delete_announcement', callback);
        this._db.deleteAnnouncement(correlationId, announcementId, callback);
    };
    /**
     * Unique descriptor for the AnnouncementsController component
     */
    AnnouncementsController.Descriptor = new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Controllers, "pip-services-announces", "*", "*");
    return AnnouncementsController;
}(pip_services_runtime_node_3.AbstractController));
exports.AnnouncementsController = AnnouncementsController;

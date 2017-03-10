"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var pip_services_runtime_node_4 = require('pip-services-runtime-node');
var pip_services_runtime_node_5 = require('pip-services-runtime-node');
var AnnouncementsCommandSet = (function (_super) {
    __extends(AnnouncementsCommandSet, _super);
    function AnnouncementsCommandSet(logic) {
        _super.call(this);
        this._logic = logic;
        this.addCommand(this.makeGetAnnouncementsCommand());
        this.addCommand(this.makeGetRandomAnnouncementCommand());
        this.addCommand(this.makeGetAnnouncementByIdCommand());
        this.addCommand(this.makeCreateAnnouncementCommand());
        this.addCommand(this.makeUpdateAnnouncementCommand());
        this.addCommand(this.makeDeleteAnnouncementCommand());
    }
    AnnouncementsCommandSet.prototype.makeGetAnnouncementsCommand = function () {
        var _this = this;
        return new pip_services_runtime_node_2.Command(this._logic, "get_announcements", new pip_services_runtime_node_3.Schema()
            .withOptionalProperty("filter", "FilterParams")
            .withOptionalProperty("paging", "PagingParams"), function (correlationId, args, callback) {
            var filter = pip_services_runtime_node_4.FilterParams.fromValue(args.get("filter"));
            var paging = pip_services_runtime_node_5.PagingParams.fromValue(args.get("paging"));
            _this._logic.getAnnouncements(correlationId, filter, paging, callback);
        });
    };
    AnnouncementsCommandSet.prototype.makeGetRandomAnnouncementCommand = function () {
        var _this = this;
        return new pip_services_runtime_node_2.Command(this._logic, "get_random_announcement", new pip_services_runtime_node_3.Schema()
            .withOptionalProperty("filter", "FilterParams"), function (correlationId, args, callback) {
            var filter = pip_services_runtime_node_4.FilterParams.fromValue(args.get("filter"));
            _this._logic.getRandomAnnouncement(correlationId, filter, callback);
        });
    };
    AnnouncementsCommandSet.prototype.makeGetAnnouncementByIdCommand = function () {
        var _this = this;
        return new pip_services_runtime_node_2.Command(this._logic, "get_announcement_by_id", new pip_services_runtime_node_3.Schema()
            .withProperty("announcement_id", "string"), function (correlationId, args, callback) {
            var announcementId = args.getNullableString("announcement_id");
            _this._logic.getAnnouncementById(correlationId, announcementId, callback);
        });
    };
    AnnouncementsCommandSet.prototype.makeCreateAnnouncementCommand = function () {
        var _this = this;
        return new pip_services_runtime_node_2.Command(this._logic, "create_announcement", new pip_services_runtime_node_3.Schema()
            .withProperty("announcement", "any"), function (correlationId, args, callback) {
            var announcement = args.get("announcement");
            _this._logic.createAnnouncement(correlationId, announcement, callback);
        });
    };
    AnnouncementsCommandSet.prototype.makeUpdateAnnouncementCommand = function () {
        var _this = this;
        return new pip_services_runtime_node_2.Command(this._logic, "update_announcement", new pip_services_runtime_node_3.Schema()
            .withProperty("announcement_id", "string")
            .withProperty("announcement", "any"), function (correlationId, args, callback) {
            var announcementId = args.getNullableString("announcement_id");
            var announcement = args.get("announcement");
            _this._logic.updateAnnouncement(correlationId, announcementId, announcement, callback);
        });
    };
    AnnouncementsCommandSet.prototype.makeDeleteAnnouncementCommand = function () {
        var _this = this;
        return new pip_services_runtime_node_2.Command(this._logic, "delete_announcement", new pip_services_runtime_node_3.Schema()
            .withProperty("announcement_id", "string"), function (correlationId, args, callback) {
            var announcementId = args.getNullableString("announcement_id");
            _this._logic.deleteAnnouncement(correlationId, announcementId, callback);
        });
    };
    return AnnouncementsCommandSet;
}(pip_services_runtime_node_1.CommandSet));
exports.AnnouncementsCommandSet = AnnouncementsCommandSet;

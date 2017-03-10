"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var AnnouncementsMicroservice_1 = require('./AnnouncementsMicroservice');
/**
 * Announcements process runner
 *
 * @author Sergey Seroukhov
 * @version 1.1
 * @since 2016-06-27
 */
var AnnouncementsProcessRunner = (function (_super) {
    __extends(AnnouncementsProcessRunner, _super);
    /**
     * Creates instance of announces process runner
     */
    function AnnouncementsProcessRunner() {
        _super.call(this, new AnnouncementsMicroservice_1.AnnouncementsMicroservice());
    }
    return AnnouncementsProcessRunner;
}(pip_services_runtime_node_1.ProcessRunner));
exports.AnnouncementsProcessRunner = AnnouncementsProcessRunner;

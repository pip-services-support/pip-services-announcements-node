"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var AnnouncementsFactory_1 = require('../build/AnnouncementsFactory');
/**
 * Announcements microservice class.
 *
 * @author Sergey Seroukhov
 * @version 1.0
 * @since 2016-06-27
 */
var AnnouncementsMicroservice = (function (_super) {
    __extends(AnnouncementsMicroservice, _super);
    /**
     * Creates instance of announces microservice.
     */
    function AnnouncementsMicroservice() {
        _super.call(this, "pip-services-announces", AnnouncementsFactory_1.AnnouncementsFactory.Instance);
    }
    return AnnouncementsMicroservice;
}(pip_services_runtime_node_1.Microservice));
exports.AnnouncementsMicroservice = AnnouncementsMicroservice;

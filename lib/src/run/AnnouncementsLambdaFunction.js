"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var AnnouncementsMicroservice_1 = require('../run/AnnouncementsMicroservice');
var AnnouncementsLambdaFunction = (function (_super) {
    __extends(AnnouncementsLambdaFunction, _super);
    function AnnouncementsLambdaFunction() {
        _super.call(this, new AnnouncementsMicroservice_1.AnnouncementsMicroservice());
    }
    AnnouncementsLambdaFunction.prototype.link = function (components) {
        this._logic = components.getOneOptional(new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.BusinessLogic, "pip-services-announces", "*", "*"));
        _super.prototype.link.call(this, components);
        this.registerCommands(this._logic.getCommands());
    };
    return AnnouncementsLambdaFunction;
}(pip_services_runtime_node_3.LambdaFunction));
exports.AnnouncementsLambdaFunction = AnnouncementsLambdaFunction;

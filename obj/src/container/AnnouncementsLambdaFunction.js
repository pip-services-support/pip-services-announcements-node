"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_aws_node_1 = require("pip-services-aws-node");
const AnnouncementsServiceFactory_1 = require("../build/AnnouncementsServiceFactory");
class AnnouncementsLambdaFunction extends pip_services_aws_node_1.CommandableLambdaFunction {
    constructor() {
        super("announcements", "System announcements function");
        this._dependencyResolver.put('controller', new pip_services_commons_node_1.Descriptor('pip-services-announcements', 'controller', 'default', '*', '*'));
        this._factories.add(new AnnouncementsServiceFactory_1.AnnouncementsServiceFactory());
    }
}
exports.AnnouncementsLambdaFunction = AnnouncementsLambdaFunction;
exports.handler = new AnnouncementsLambdaFunction().getHandler();
//# sourceMappingURL=AnnouncementsLambdaFunction.js.map
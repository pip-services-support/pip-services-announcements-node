"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
class LocationV1Schema extends pip_services_commons_node_1.ObjectSchema {
    constructor() {
        super();
        this.withRequiredProperty('name', pip_services_commons_node_2.TypeCode.String);
        this.withOptionalProperty('pos', null);
    }
}
exports.LocationV1Schema = LocationV1Schema;
//# sourceMappingURL=LocationV1Schema.js.map
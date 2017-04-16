"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const LocationV1Schema_1 = require("./LocationV1Schema");
const PartyReferenceV1Schema_1 = require("./PartyReferenceV1Schema");
const DocumentReferenceV1Schema_1 = require("./DocumentReferenceV1Schema");
class AnnouncementV1Schema extends pip_services_commons_node_1.ObjectSchema {
    constructor() {
        super();
        /* Identification */
        this.withOptionalProperty('id', pip_services_commons_node_3.TypeCode.String);
        this.withRequiredProperty('category', pip_services_commons_node_3.TypeCode.String);
        this.withOptionalProperty('app', pip_services_commons_node_3.TypeCode.String);
        /* Generic request properties */
        this.withRequiredProperty('creator', new PartyReferenceV1Schema_1.PartyReferenceV1Schema());
        this.withOptionalProperty('create_time', null); //TypeCode.DateTime);
        /* Common properties */
        this.withOptionalProperty('title', pip_services_commons_node_3.TypeCode.Map);
        this.withOptionalProperty('content', pip_services_commons_node_3.TypeCode.Map);
        this.withOptionalProperty('location', new LocationV1Schema_1.LocationV1Schema());
        this.withOptionalProperty('start_time', null); //TypeCode.DateTime);
        this.withOptionalProperty('end_time', null); //TypeCode.DateTime);
        this.withOptionalProperty('pic_ids', new pip_services_commons_node_2.ArraySchema(pip_services_commons_node_3.TypeCode.String));
        this.withOptionalProperty('docs', new pip_services_commons_node_2.ArraySchema(new DocumentReferenceV1Schema_1.DocumentReferenceV1Schema()));
        /* Search */
        this.withOptionalProperty('tags', new pip_services_commons_node_2.ArraySchema(pip_services_commons_node_3.TypeCode.String));
        this.withOptionalProperty('all_tags', new pip_services_commons_node_2.ArraySchema(pip_services_commons_node_3.TypeCode.String));
        /* Status */
        this.withOptionalProperty('status', pip_services_commons_node_3.TypeCode.String);
        this.withOptionalProperty('importance', pip_services_commons_node_3.TypeCode.Integer);
        /* Custom fields */
        this.withOptionalProperty('custom_hdr', null);
        this.withOptionalProperty('custom_dat', null);
    }
}
exports.AnnouncementV1Schema = AnnouncementV1Schema;
//# sourceMappingURL=AnnouncementV1Schema.js.map
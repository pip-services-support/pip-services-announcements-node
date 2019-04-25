import { ObjectSchema } from 'pip-services3-commons-node';
import { ArraySchema } from 'pip-services3-commons-node';
import { TypeCode } from 'pip-services3-commons-node';

import { LocationV1Schema } from './LocationV1Schema';
import { PartyReferenceV1Schema } from './PartyReferenceV1Schema';
import { AttachmentV1Schema } from './AttachmentV1Schema';

export class AnnouncementV1Schema extends ObjectSchema {
    public constructor() {
        super();
    
        /* Identification */
        this.withOptionalProperty('id', TypeCode.String);
        this.withRequiredProperty('category', TypeCode.String);
        this.withOptionalProperty('app', TypeCode.String);

        /* Generic request properties */
        this.withRequiredProperty('creator', new PartyReferenceV1Schema());
        this.withOptionalProperty('create_time', null); //TypeCode.DateTime);

        /* Common properties */
        this.withOptionalProperty('title', TypeCode.Map);
        this.withOptionalProperty('content', TypeCode.Map);
        this.withOptionalProperty('location', new LocationV1Schema());
        this.withOptionalProperty('start_time', null); //TypeCode.DateTime);
        this.withOptionalProperty('end_time', null); //TypeCode.DateTime);
        this.withOptionalProperty('pics', new ArraySchema(new AttachmentV1Schema()));
        this.withOptionalProperty('docs', new ArraySchema(new AttachmentV1Schema()));

        /* Search */
        this.withOptionalProperty('tags', new ArraySchema(TypeCode.String));
        this.withOptionalProperty('all_tags', new ArraySchema(TypeCode.String));

        /* Status */
        this.withOptionalProperty('status', TypeCode.String);
        this.withOptionalProperty('importance', TypeCode.Integer);

        /* Custom fields */
        this.withOptionalProperty('custom_hdr', null);
        this.withOptionalProperty('custom_dat', null);
    }
}

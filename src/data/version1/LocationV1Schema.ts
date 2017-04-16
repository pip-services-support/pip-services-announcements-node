import { ObjectSchema } from 'pip-services-commons-node';
import { TypeCode } from 'pip-services-commons-node';

export class LocationV1Schema extends ObjectSchema {
    public constructor() {
        super();
        this.withRequiredProperty('name', TypeCode.String);
        this.withOptionalProperty('pos', null);
    }
}
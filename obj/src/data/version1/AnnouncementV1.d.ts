import { IStringIdentifiable } from 'pip-services-commons-node';
import { MultiString } from 'pip-services-commons-node';
import { LocationV1 } from './LocationV1';
import { AttachmentV1 } from './AttachmentV1';
import { PartyReferenceV1 } from './PartyReferenceV1';
export declare class AnnouncementV1 implements IStringIdentifiable {
    constructor(id: string, category: string, app?: string, creator?: PartyReferenceV1, title?: MultiString, content?: MultiString);
    id: string;
    category: string;
    app?: string;
    creator: PartyReferenceV1;
    create_time: Date;
    title?: MultiString;
    content?: MultiString;
    location?: LocationV1;
    start_time?: Date;
    end_time?: Date;
    pics?: AttachmentV1[];
    docs?: AttachmentV1[];
    tags?: string[];
    all_tags?: string[];
    status?: string;
    importance?: number;
    custom_hdr?: any;
    custom_dat?: any;
}

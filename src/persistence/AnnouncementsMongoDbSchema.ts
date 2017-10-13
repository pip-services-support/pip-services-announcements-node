import { Schema } from 'mongoose';
let Mixed = Schema.Types.Mixed;

export let AnnouncementsMongoDbSchema = function(collection?: string) {
    collection = collection || 'announcements';

    let attachmentSchema = new Schema({
        id: { type: String, required: false },
        uri: { type: String, required: false },
        name: { type: String, required: false }
    });

    attachmentSchema.set('toJSON', {
        transform: function (doc, ret) {
            //ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    });

    let partyReferenceSchema = new Schema({
        id: { type: String, required: false },
        name: { type: String, required: false },
        email: { type: String, required: false }
    });

    partyReferenceSchema.set('toJSON', {
        transform: function (doc, ret) {
            //ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    });

    let locationSchema = new Schema({
        name: { type: String, required: false },
        pos: { type: Mixed, required: false }
    });

    locationSchema.set('toJSON', {
        transform: function (doc, ret) {
            //ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    });

    let schema = new Schema(
        {
            /* Identification */
            _id: { type: String },
            category: { type: String, required: true },
            app: { type: String, required: false },

            /* Automatically managed fields */
            creator: { type: attachmentSchema, required: false },
            create_time: { type: Date, required: true, 'default': Date.now },

            /* Content */
            title: { type: Mixed, required: false },
            content: { type: Mixed, required: true },
            location: { type: locationSchema, required: false },
            start_time: { type: Date, required: false },
            end_time: { type: Date, required: false },
            pics: { type: [attachmentSchema], required: false },
            docs: { type: [attachmentSchema], required: false },

            /* Search  */
            tags: { type: [String], required: false },
            all_tags: { type: [String], required: false, index: true },

            /* Status */
            status: { type: String, required: true, 'default': 'new' },
            importance: { type: Number, required: true, min: 0, max: 1000, 'default': 0 },

            /* Custom fields */
            custom_hdr: { type: Mixed, required: false },
            custom_dat: { type: Mixed, required: false }
        },
        {
            collection: collection,
            autoIndex: true,
            strict: true
        }
    );

    schema.set('toJSON', {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    });

    return schema;
}
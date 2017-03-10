let
    mongoose = require('mongoose'),
    
    Schema = mongoose.Schema,
    Mixed = Schema.Types.Mixed,

    ReferenceSchema = new Schema({
        id: { type: String, required: true },
        name: { type: String, required: true }
    });

    ReferenceSchema.set('toJSON', {
        transform: function (doc, ret) {
            //ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    });

let 
    LocationSchema = new Schema({
        name: { type: String, required: false },
        pos: { type: Mixed, required: false }
    });

    LocationSchema.set('toJSON', {
        transform: function (doc, ret) {
            //ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    });

let
    AnnouncementSchema = new Schema(
        {
            /* Identification */
            _id: { type: String, unique: true },
            category: { type: String, required: true },
            app: { type: String, required: false },

            /* Automatically managed fields */
            creator: { type: ReferenceSchema, required: false },
            created: { type: Date, required: true, 'default': Date.now },

            /* Content */
            title: { type: Mixed, required: false },
            content: { type: Mixed, required: true },
            loc: { type: LocationSchema, required: false },
            start: { type: Date, required: false },
            end: { type: Date, required: false },
            pic_ids: { type: [String], required: false },
            docs: { type: [ReferenceSchema], required: false },

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
            collection: 'announcements',
            autoIndex: true,
            strict: true
        }
    );

    AnnouncementSchema.set('toJSON', {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    });

module.exports = function(connection) {
    return connection.model('Announcement', AnnouncementSchema);
};

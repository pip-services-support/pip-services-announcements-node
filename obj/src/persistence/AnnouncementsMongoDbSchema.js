"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let Mixed = mongoose_1.Schema.Types.Mixed;
exports.AnnouncementsMongoDbSchema = function (collection) {
    collection = collection || 'announcements';
    let documentReferenceSchema = new mongoose_1.Schema({
        id: { type: String, required: true },
        name: { type: String, required: true }
    });
    documentReferenceSchema.set('toJSON', {
        transform: function (doc, ret) {
            //ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    });
    let partyReferenceSchema = new mongoose_1.Schema({
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
    let locationSchema = new mongoose_1.Schema({
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
    let schema = new mongoose_1.Schema({
        /* Identification */
        _id: { type: String, unique: true },
        category: { type: String, required: true },
        app: { type: String, required: false },
        /* Automatically managed fields */
        creator: { type: documentReferenceSchema, required: false },
        create_time: { type: Date, required: true, 'default': Date.now },
        /* Content */
        title: { type: Mixed, required: false },
        content: { type: Mixed, required: true },
        location: { type: locationSchema, required: false },
        start_time: { type: Date, required: false },
        end_time: { type: Date, required: false },
        pic_ids: { type: [String], required: false },
        docs: { type: [documentReferenceSchema], required: false },
        /* Search  */
        tags: { type: [String], required: false },
        all_tags: { type: [String], required: false, index: true },
        /* Status */
        status: { type: String, required: true, 'default': 'new' },
        importance: { type: Number, required: true, min: 0, max: 1000, 'default': 0 },
        /* Custom fields */
        custom_hdr: { type: Mixed, required: false },
        custom_dat: { type: Mixed, required: false }
    }, {
        collection: collection,
        autoIndex: true,
        strict: true
    });
    schema.set('toJSON', {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    });
    return schema;
};
//# sourceMappingURL=AnnouncementsMongoDbSchema.js.map
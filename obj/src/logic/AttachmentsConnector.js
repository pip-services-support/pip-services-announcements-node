"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttachmentsConnector = void 0;
let _ = require('lodash');
const pip_clients_attachments_node_1 = require("pip-clients-attachments-node");
class AttachmentsConnector {
    constructor(_attachmentsClient) {
        this._attachmentsClient = _attachmentsClient;
    }
    extractAttachmentIds(announcement) {
        let ids = [];
        _.each(announcement.pics, (pic) => {
            if (pic)
                ids.push(pic.id);
        });
        _.each(announcement.docs, (doc) => {
            if (doc.id)
                ids.push(doc.id);
        });
        return ids;
    }
    addAttachments(correlationId, announcement, callback) {
        if (this._attachmentsClient == null || announcement == null) {
            callback(null);
            return;
        }
        let ids = this.extractAttachmentIds(announcement);
        let reference = new pip_clients_attachments_node_1.ReferenceV1(announcement.id, 'announcement');
        this._attachmentsClient.addAttachments(correlationId, reference, ids, (err) => {
            callback(err);
        });
    }
    updateAttachments(correlationId, oldAnnouncement, newAnnouncement, callback) {
        if (this._attachmentsClient == null || oldAnnouncement == null || newAnnouncement == null) {
            callback(null);
            return;
        }
        let oldIds = this.extractAttachmentIds(oldAnnouncement);
        let newIds = this.extractAttachmentIds(newAnnouncement);
        let reference = new pip_clients_attachments_node_1.ReferenceV1(newAnnouncement.id, 'announcement');
        this._attachmentsClient.updateAttachments(correlationId, reference, oldIds, newIds, (err) => {
            callback(err);
        });
    }
    removeAttachments(correlationId, announcement, callback) {
        if (this._attachmentsClient == null || announcement == null) {
            callback(null);
            return;
        }
        let ids = this.extractAttachmentIds(announcement);
        let reference = new pip_clients_attachments_node_1.ReferenceV1(announcement.id, 'announcement');
        this._attachmentsClient.removeAttachments(correlationId, reference, ids, (err) => {
            callback(err);
        });
    }
}
exports.AttachmentsConnector = AttachmentsConnector;
//# sourceMappingURL=AttachmentsConnector.js.map
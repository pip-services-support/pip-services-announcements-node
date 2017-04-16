let _ = require('lodash');

import { ReferenceV1 } from 'pip-clients-attachments-node';
import { AttachmentV1 } from 'pip-clients-attachments-node';
import { IAttachmentsClientV1 } from 'pip-clients-attachments-node';

import { AnnouncementV1 } from '../data/version1/AnnouncementV1';

export class AttachmentsConnector {

    public constructor(
        private _attachmentsClient: IAttachmentsClientV1
    ) {}

    private extractAttachmentIds(announcement: AnnouncementV1): string[] {
        let ids: string[] = [];

        _.each(announcement.pic_ids, (id) => {
            ids.push(id);
        });

        _.each(announcement.docs, (doc) => {
            ids.push(doc.id);
        });

        return ids;
    }

    public addAttachments(correlationId: string, announcement: AnnouncementV1,
        callback: (err: any) => void) : void {
        
        if (this._attachmentsClient == null || announcement == null) {
            callback(null);
            return;
        }

        let ids = this.extractAttachmentIds(announcement);
        let reference = new ReferenceV1(announcement.id, 'announcement');
        this._attachmentsClient.addAttachments(correlationId, reference, ids, (err) => {
            callback(err);
        })
    }

    public updateAttachments(correlationId: string, oldAnnouncement: AnnouncementV1,
        newAnnouncement: AnnouncementV1, callback: (err: any) => void) : void {
        
        if (this._attachmentsClient == null || oldAnnouncement == null || newAnnouncement == null) {
            callback(null);
            return;
        }

        let oldIds = this.extractAttachmentIds(oldAnnouncement);
        let newIds = this.extractAttachmentIds(newAnnouncement);
        let reference = new ReferenceV1(newAnnouncement.id, 'announcement');
        this._attachmentsClient.updateAttachments(correlationId, reference, oldIds, newIds, (err) => {
            callback(err);
        })
    }

    public removeAttachments(correlationId: string, announcement: AnnouncementV1,
        callback: (err: any) => void) : void {
        
        if (this._attachmentsClient == null || announcement == null) {
            callback(null);
            return;
        }

        let ids = this.extractAttachmentIds(announcement);
        let reference = new ReferenceV1(announcement.id, 'announcement');
        this._attachmentsClient.removeAttachments(correlationId, reference, ids, (err) => {
            callback(err);
        })
    }

}
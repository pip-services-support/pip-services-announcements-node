import { IAttachmentsClientV1 } from 'pip-clients-attachments-node';
import { AnnouncementV1 } from '../data/version1/AnnouncementV1';
export declare class AttachmentsConnector {
    private _attachmentsClient;
    constructor(_attachmentsClient: IAttachmentsClientV1);
    private extractAttachmentIds;
    addAttachments(correlationId: string, announcement: AnnouncementV1, callback: (err: any) => void): void;
    updateAttachments(correlationId: string, oldAnnouncement: AnnouncementV1, newAnnouncement: AnnouncementV1, callback: (err: any) => void): void;
    removeAttachments(correlationId: string, announcement: AnnouncementV1, callback: (err: any) => void): void;
}

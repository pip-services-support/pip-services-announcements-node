import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { ComponentSet } from 'pip-services-runtime-node';
import { FilterParams } from 'pip-services-runtime-node';
import { PagingParams } from 'pip-services-runtime-node';
import { AbstractController } from 'pip-services-runtime-node';

import { IAnnouncementsPersistence } from '../persistence/IAnnouncementsPersistence';
import { IAnnouncementsBusinessLogic } from './IAnnouncementsBusinessLogic';
import { AnnouncementsCommandSet } from './AnnouncementsCommandSet';

export class AnnouncementsController extends AbstractController {
	/**
	 * Unique descriptor for the AnnouncementsController component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Controllers, "pip-services-announces", "*", "*"
	);
    
	private _db: IAnnouncementsPersistence;
    
    constructor() {
        super(AnnouncementsController.Descriptor);
    }
    
    public link(components: ComponentSet): void {
        // Locate reference to announces persistence component
        this._db = <IAnnouncementsPersistence>components.getOneRequired(
        	new ComponentDescriptor(Category.Persistence, "pip-services-announces", '*', '*')
    	);
        
        super.link(components);

        // Add commands
        let commands = new AnnouncementsCommandSet(this);
        this.addCommandSet(commands);
    }
    
    public getAnnouncements(correlationId: string, filter: FilterParams, paging: PagingParams, callback) {
        callback = this.instrument(correlationId, 'announces.get_announcements', callback);
        this._db.getAnnouncements(correlationId, filter, paging, callback);
    }

    public getRandomAnnouncement(correlationId: string, filter: FilterParams, callback) {
        callback = this.instrument(correlationId, 'announces.get_random_announcement', callback);
        this._db.getRandomAnnouncement(correlationId, filter, callback);        
    }

    public getAnnouncementById(correlationId: string, announcementId: string, callback) {
        callback = this.instrument(correlationId, 'announces.get_announcement_by_id', callback);
        this._db.getAnnouncementById(correlationId, announcementId, callback);        
    }

    public createAnnouncement(correlationId: string, announcement: any, callback) {
        callback = this.instrument(correlationId, 'announces.create_announcement', callback);
        this._db.createAnnouncement(correlationId, announcement, callback);
    }

    public updateAnnouncement(correlationId: string, announcementId: string, announcement: any, callback) {
        callback = this.instrument(correlationId, 'announces.update_announcement', callback);
        this._db.updateAnnouncement(correlationId, announcementId, announcement, callback);
    }

    public deleteAnnouncement(correlationId: string, announcementId: string, callback) {
        callback = this.instrument(correlationId, 'announces.delete_announcement', callback);
        this._db.deleteAnnouncement(correlationId, announcementId, callback);
    }
    
}

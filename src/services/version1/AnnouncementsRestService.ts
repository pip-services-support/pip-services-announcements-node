let _ = require('lodash');

import { Category } from 'pip-services-runtime-node';
import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { FilterParams } from 'pip-services-runtime-node';
import { PagingParams } from 'pip-services-runtime-node';
import { RestService } from 'pip-services-runtime-node';

import { IAnnouncementsBusinessLogic } from '../../logic/IAnnouncementsBusinessLogic';

export class AnnouncementsRestService extends RestService {       
	/**
	 * Unique descriptor for the AnnouncementsRestService component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Services, "pip-services-announces", "rest", "1.0"
	);
    
	private _logic: IAnnouncementsBusinessLogic;

    constructor() {
        super(AnnouncementsRestService.Descriptor);
    }
    
	public link(components: ComponentSet): void {
		this._logic = <IAnnouncementsBusinessLogic>components.getOnePrior(
			this, new ComponentDescriptor(Category.BusinessLogic, "pip-services-announces", "*", "*")
		);

		super.link(components);		
	}    
    
    private getAnnouncements(req, res) {
        this._logic.getAnnouncements(
            req.params.correlation_id,
            FilterParams.fromValue(req.params),
            PagingParams.fromValue(req.params),
            this.sendResult(req, res)
        );
    }

    private getRandomAnnouncement(req, res) {
        this._logic.getRandomAnnouncement(
            req.params.correlation_id,
            FilterParams.fromValue(req.params),
            this.sendResult(req, res)
        );
    }

    private getAnnouncementById(req, res) {
        this._logic.getAnnouncementById(
            req.params.correlation_id,
            req.params.announcementId,
            this.sendResult(req, res)
        );
    }

    private createAnnouncement(req, res) {
        this._logic.createAnnouncement(
            req.params.correlation_id,
            req.body,
            this.sendCreatedResult(req, res)
        );
    }

    private updateAnnouncement(req, res) {
        this._logic.updateAnnouncement(
            req.params.correlation_id,
            req.params.announcementId,
            req.body,
            this.sendResult(req, res)
        );
    }

    private deleteAnnouncement(req, res) {
        this._logic.deleteAnnouncement(
            req.params.correlation_id,
            req.params.announcementId,
            this.sendDeletedResult(req, res)
        );
    }    
        
    protected register() {
        this.registerRoute('get', '/announcements', this.getAnnouncements);
        this.registerRoute('get', '/announcements/random', this.getRandomAnnouncement);
        this.registerRoute('get', '/announcements/:announcementId', this.getAnnouncementById);
        this.registerRoute('post', '/announcements', this.createAnnouncement);
        this.registerRoute('put', '/announcements/:announcementId', this.updateAnnouncement);
        this.registerRoute('delete', '/announcements/:announcementId', this.deleteAnnouncement);
    }
}

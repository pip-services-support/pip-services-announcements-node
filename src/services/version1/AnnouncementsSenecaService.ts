let _ = require('lodash');

import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { ComponentSet } from 'pip-services-runtime-node';
import { SenecaService } from 'pip-services-runtime-node';

import { IAnnouncementsBusinessLogic } from '../../logic/IAnnouncementsBusinessLogic';

export class AnnouncementsSenecaService extends SenecaService {       
	/**
	 * Unique descriptor for the AnnouncementsSenecaService component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Services, "pip-services-announces", "seneca", "1.0"
	);

    private _logic: IAnnouncementsBusinessLogic;

    constructor() {
        super(AnnouncementsSenecaService.Descriptor);
    }
    
	public link(components: ComponentSet): void {
		this._logic = <IAnnouncementsBusinessLogic>components.getOnePrior(
			this, new ComponentDescriptor(Category.BusinessLogic, "pip-services-announces", "*", "*")
		);

		super.link(components);		

        this.registerCommands('announcements', this._logic.getCommands());
	}

}

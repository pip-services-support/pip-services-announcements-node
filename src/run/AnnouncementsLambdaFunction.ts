import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { ComponentSet } from 'pip-services-runtime-node';
import { LambdaFunction } from 'pip-services-runtime-node';

import { AnnouncementsMicroservice } from '../run/AnnouncementsMicroservice';
import { IAnnouncementsBusinessLogic } from '../logic/IAnnouncementsBusinessLogic';

export class AnnouncementsLambdaFunction extends LambdaFunction {
    private _logic: IAnnouncementsBusinessLogic;

    constructor() {
        super(new AnnouncementsMicroservice());
    }

    public link(components: ComponentSet) {
		this._logic = <IAnnouncementsBusinessLogic>components.getOneOptional(
			new ComponentDescriptor(Category.BusinessLogic, "pip-services-announces", "*", "*")
		);

        super.link(components);        

        this.registerCommands(this._logic.getCommands());
    }
    
}
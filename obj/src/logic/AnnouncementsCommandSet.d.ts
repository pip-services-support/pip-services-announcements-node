import { CommandSet } from 'pip-services-commons-node';
import { IAnnouncementsBusinessLogic } from './IAnnouncementsBusinessLogic';
export declare class AnnouncementsCommandSet extends CommandSet {
    private _logic;
    constructor(logic: IAnnouncementsBusinessLogic);
    private makeGetAnnouncementsCommand();
    private makeGetRandomAnnouncementCommand();
    private makeGetAnnouncementByIdCommand();
    private makeCreateAnnouncementCommand();
    private makeUpdateAnnouncementCommand();
    private makeDeleteAnnouncementByIdCommand();
}

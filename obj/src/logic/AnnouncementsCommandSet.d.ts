import { CommandSet } from 'pip-services3-commons-node';
import { IAnnouncementsController } from './IAnnouncementsController';
export declare class AnnouncementsCommandSet extends CommandSet {
    private _logic;
    constructor(logic: IAnnouncementsController);
    private makeGetAnnouncementsCommand;
    private makeGetRandomAnnouncementCommand;
    private makeGetAnnouncementByIdCommand;
    private makeCreateAnnouncementCommand;
    private makeUpdateAnnouncementCommand;
    private makeDeleteAnnouncementByIdCommand;
}

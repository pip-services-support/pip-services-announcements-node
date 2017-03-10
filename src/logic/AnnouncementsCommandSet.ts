import { CommandSet } from 'pip-services-runtime-node';
import { ICommand } from 'pip-services-runtime-node';
import { Command } from 'pip-services-runtime-node';
import { Schema } from 'pip-services-runtime-node';
import { DynamicMap } from 'pip-services-runtime-node';
import { FilterParams } from 'pip-services-runtime-node';
import { PagingParams } from 'pip-services-runtime-node';

import { IAnnouncementsBusinessLogic } from './IAnnouncementsBusinessLogic';

export class AnnouncementsCommandSet extends CommandSet {
    private _logic: IAnnouncementsBusinessLogic;

    constructor(logic: IAnnouncementsBusinessLogic) {
        super();

        this._logic = logic;

		this.addCommand(this.makeGetAnnouncementsCommand());
		this.addCommand(this.makeGetRandomAnnouncementCommand());
		this.addCommand(this.makeGetAnnouncementByIdCommand());
		this.addCommand(this.makeCreateAnnouncementCommand());
		this.addCommand(this.makeUpdateAnnouncementCommand());
		this.addCommand(this.makeDeleteAnnouncementCommand());
    }

	private makeGetAnnouncementsCommand(): ICommand {
		return new Command(
			this._logic,
			"get_announcements",
			new Schema()
				.withOptionalProperty("filter", "FilterParams")
				.withOptionalProperty("paging", "PagingParams")
			,
            (correlationId: string, args: DynamicMap, callback: (err: any, result: any) => void) => {
                let filter = FilterParams.fromValue(args.get("filter"));
                let paging = PagingParams.fromValue(args.get("paging"));
                this._logic.getAnnouncements(correlationId, filter, paging, callback);
            }
		);
	}

	private makeGetRandomAnnouncementCommand(): ICommand {
		return new Command(
			this._logic,
			"get_random_announcement",
			new Schema()
				.withOptionalProperty("filter", "FilterParams")
			,
            (correlationId: string, args: DynamicMap, callback: (err: any, result: any) => void) => {
                let filter = FilterParams.fromValue(args.get("filter"));
                this._logic.getRandomAnnouncement(correlationId, filter, callback);
            }
		);
	}

	private makeGetAnnouncementByIdCommand(): ICommand {
		return new Command(
			this._logic,
			"get_announcement_by_id",
			new Schema()
				.withProperty("announcement_id", "string"),
            (correlationId: string, args: DynamicMap, callback: (err: any, result: any) => void) => {
                let announcementId = args.getNullableString("announcement_id");
                this._logic.getAnnouncementById(correlationId, announcementId, callback);
            }
		);
	}

	private makeCreateAnnouncementCommand(): ICommand {
		return new Command(
			this._logic,
			"create_announcement",
			new Schema()
				.withProperty("announcement", "any"),
            (correlationId: string, args: DynamicMap, callback: (err: any, result: any) => void) => {
                let announcement = args.get("announcement");
                this._logic.createAnnouncement(correlationId, announcement, callback);
            }
		);
	}

	private makeUpdateAnnouncementCommand(): ICommand {
		return new Command(
			this._logic,
			"update_announcement",
			new Schema()
				.withProperty("announcement_id", "string")
               .withProperty("announcement", "any"),
            (correlationId: string, args: DynamicMap, callback: (err: any, result: any) => void) => {
                let announcementId = args.getNullableString("announcement_id");
                let announcement = args.get("announcement");
                this._logic.updateAnnouncement(correlationId, announcementId, announcement, callback);
            }
		);
	}
	
	private makeDeleteAnnouncementCommand(): ICommand {
		return new Command(
			this._logic,
			"delete_announcement",
			new Schema()
				.withProperty("announcement_id", "string"),
            (correlationId: string, args: DynamicMap, callback: (err: any, result: any) => void) => {
                let announcementId = args.getNullableString("announcement_id");
                this._logic.deleteAnnouncement(correlationId, announcementId, callback);
			}
		);
	}

}
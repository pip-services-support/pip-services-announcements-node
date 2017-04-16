import { CommandSet } from 'pip-services-commons-node';
import { ICommand } from 'pip-services-commons-node';
import { Command } from 'pip-services-commons-node';
import { Schema } from 'pip-services-commons-node';
import { Parameters } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { ObjectSchema } from 'pip-services-commons-node';
import { TypeCode } from 'pip-services-commons-node';
import { FilterParamsSchema } from 'pip-services-commons-node';
import { PagingParamsSchema } from 'pip-services-commons-node';

import { AnnouncementV1 } from '../data/version1/AnnouncementV1';
import { PartyReferenceV1Schema } from '../data/version1/PartyReferenceV1Schema';
import { AnnouncementV1Schema } from '../data/version1/AnnouncementV1Schema';
import { IAnnouncementsBusinessLogic } from './IAnnouncementsBusinessLogic';

export class AnnouncementsCommandSet extends CommandSet {
    private _logic: IAnnouncementsBusinessLogic;

	constructor(logic: IAnnouncementsBusinessLogic) {
		super();

		this._logic = logic;

		// Register commands to the database
		this.addCommand(this.makeGetAnnouncementsCommand());
		this.addCommand(this.makeGetRandomAnnouncementCommand());
		this.addCommand(this.makeGetAnnouncementByIdCommand());
		this.addCommand(this.makeCreateAnnouncementCommand());
		this.addCommand(this.makeUpdateAnnouncementCommand());
		this.addCommand(this.makeDeleteAnnouncementByIdCommand());
	}

	private makeGetAnnouncementsCommand(): ICommand {
		return new Command(
			"get_announcements",
			new ObjectSchema(true)
				.withOptionalProperty('filter', new FilterParamsSchema())
				.withOptionalProperty('paging', new PagingParamsSchema()),
			(correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
				let filter = FilterParams.fromValue(args.get("filter"));
				let paging = PagingParams.fromValue(args.get("paging"));
				this._logic.getAnnouncements(correlationId, filter, paging, callback);
			}
		);
	}

	private makeGetRandomAnnouncementCommand(): ICommand {
		return new Command(
			"get_randome_announcement",
			new ObjectSchema(true)
				.withOptionalProperty('filter', new FilterParamsSchema()),
			(correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
				let filter = FilterParams.fromValue(args.get("filter"));
				this._logic.getRandomAnnouncement(correlationId, filter, callback);
			}
		);
	}

	private makeGetAnnouncementByIdCommand(): ICommand {
		return new Command(
			"get_announcement_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('announcement_id', TypeCode.String),
			(correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
				let announcementId = args.getAsNullableString("announcement_id");
				this._logic.getAnnouncementById(correlationId, announcementId, callback);
			}
		);
	}

	private makeCreateAnnouncementCommand(): ICommand {
		return new Command(
			"create_announcement",
			new ObjectSchema(true)
				.withRequiredProperty('announcement', new AnnouncementV1Schema()),
			(correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
				let announcement = args.get("announcement");
				this._logic.createAnnouncement(correlationId, announcement, callback);
			}
		);
	}

	private makeUpdateAnnouncementCommand(): ICommand {
		return new Command(
			"update_announcement",
			new ObjectSchema(true)
				.withRequiredProperty('announcement', new AnnouncementV1Schema()),
			(correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
				let announcement = args.get("announcement");
				this._logic.updateAnnouncement(correlationId, announcement, callback);
			}
		);
	}

	private makeDeleteAnnouncementByIdCommand(): ICommand {
		return new Command(
			"delete_announcement_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('announcement_id', TypeCode.String),
			(correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
				let announcementId = args.getAsNullableString("announcement_id");
				this._logic.deleteAnnouncementById(correlationId, announcementId, callback);
			}
		);
	}

}
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const pip_services_commons_node_4 = require("pip-services-commons-node");
const pip_services_commons_node_5 = require("pip-services-commons-node");
const pip_services_commons_node_6 = require("pip-services-commons-node");
const pip_services_commons_node_7 = require("pip-services-commons-node");
const pip_services_commons_node_8 = require("pip-services-commons-node");
const AnnouncementV1Schema_1 = require("../data/version1/AnnouncementV1Schema");
class AnnouncementsCommandSet extends pip_services_commons_node_1.CommandSet {
    constructor(logic) {
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
    makeGetAnnouncementsCommand() {
        return new pip_services_commons_node_2.Command("get_announcements", new pip_services_commons_node_5.ObjectSchema(true)
            .withOptionalProperty('filter', new pip_services_commons_node_7.FilterParamsSchema())
            .withOptionalProperty('paging', new pip_services_commons_node_8.PagingParamsSchema()), (correlationId, args, callback) => {
            let filter = pip_services_commons_node_3.FilterParams.fromValue(args.get("filter"));
            let paging = pip_services_commons_node_4.PagingParams.fromValue(args.get("paging"));
            this._logic.getAnnouncements(correlationId, filter, paging, callback);
        });
    }
    makeGetRandomAnnouncementCommand() {
        return new pip_services_commons_node_2.Command("get_randome_announcement", new pip_services_commons_node_5.ObjectSchema(true)
            .withOptionalProperty('filter', new pip_services_commons_node_7.FilterParamsSchema()), (correlationId, args, callback) => {
            let filter = pip_services_commons_node_3.FilterParams.fromValue(args.get("filter"));
            this._logic.getRandomAnnouncement(correlationId, filter, callback);
        });
    }
    makeGetAnnouncementByIdCommand() {
        return new pip_services_commons_node_2.Command("get_announcement_by_id", new pip_services_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('announcement_id', pip_services_commons_node_6.TypeCode.String), (correlationId, args, callback) => {
            let announcementId = args.getAsNullableString("announcement_id");
            this._logic.getAnnouncementById(correlationId, announcementId, callback);
        });
    }
    makeCreateAnnouncementCommand() {
        return new pip_services_commons_node_2.Command("create_announcement", new pip_services_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('announcement', new AnnouncementV1Schema_1.AnnouncementV1Schema()), (correlationId, args, callback) => {
            let announcement = args.get("announcement");
            this._logic.createAnnouncement(correlationId, announcement, callback);
        });
    }
    makeUpdateAnnouncementCommand() {
        return new pip_services_commons_node_2.Command("update_announcement", new pip_services_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('announcement', new AnnouncementV1Schema_1.AnnouncementV1Schema()), (correlationId, args, callback) => {
            let announcement = args.get("announcement");
            this._logic.updateAnnouncement(correlationId, announcement, callback);
        });
    }
    makeDeleteAnnouncementByIdCommand() {
        return new pip_services_commons_node_2.Command("delete_announcement_by_id", new pip_services_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('announcement_id', pip_services_commons_node_6.TypeCode.String), (correlationId, args, callback) => {
            let announcementId = args.getAsNullableString("announcement_id");
            this._logic.deleteAnnouncementById(correlationId, announcementId, callback);
        });
    }
}
exports.AnnouncementsCommandSet = AnnouncementsCommandSet;
//# sourceMappingURL=AnnouncementsCommandSet.js.map
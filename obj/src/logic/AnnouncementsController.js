"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let async = require('async');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const pip_services_commons_node_4 = require("pip-services-commons-node");
const AnnouncementsCommandSet_1 = require("./AnnouncementsCommandSet");
const AttachmentsConnector_1 = require("./AttachmentsConnector");
class AnnouncementsController {
    constructor() {
        this._dependencyResolver = new pip_services_commons_node_2.DependencyResolver(AnnouncementsController._defaultConfig);
    }
    configure(config) {
        this._dependencyResolver.configure(config);
    }
    setReferences(references) {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired('persistence');
        this._attachmentsClient = this._dependencyResolver.getOneOptional('attachments');
        this._attachmentsConnector = new AttachmentsConnector_1.AttachmentsConnector(this._attachmentsClient);
    }
    getCommandSet() {
        if (this._commandSet == null)
            this._commandSet = new AnnouncementsCommandSet_1.AnnouncementsCommandSet(this);
        return this._commandSet;
    }
    getAnnouncements(correlationId, filter, paging, callback) {
        this._persistence.getPageByFilter(correlationId, filter, paging, callback);
    }
    getRandomAnnouncement(correlationId, filter, callback) {
        this._persistence.getOneRandom(correlationId, filter, callback);
    }
    getAnnouncementById(correlationId, announcementId, callback) {
        this._persistence.getOneById(correlationId, announcementId, callback);
    }
    createAnnouncement(correlationId, announcement, callback) {
        let newAnnouncement = null;
        announcement.create_time = new Date();
        announcement.all_tags = pip_services_commons_node_3.TagsProcessor.extractHashTags('#title.en#title.sp#title.fr#title.de#title.ru#content.en#content.sp#content.fr#content.de#content.ru');
        async.series([
            (callback) => {
                this._persistence.create(correlationId, announcement, (err, data) => {
                    newAnnouncement = data;
                    callback(err);
                });
            },
            (callback) => {
                this._attachmentsConnector.addAttachments(correlationId, newAnnouncement, callback);
            }
        ], (err) => {
            callback(err, newAnnouncement);
        });
    }
    updateAnnouncement(correlationId, announcement, callback) {
        let oldAnnouncement = null;
        let newAnnouncement = null;
        announcement.all_tags = pip_services_commons_node_3.TagsProcessor.extractHashTags('#title.en#title.sp#title.fr#title.de#title.ru#content.en#content.sp#content.fr#content.de#content.ru');
        async.series([
            (callback) => {
                this._persistence.getOneById(correlationId, announcement.id, (err, data) => {
                    oldAnnouncement = data;
                    if (err == null && data == null) {
                        err = new pip_services_commons_node_4.NotFoundException(correlationId, 'ANNOUNCEMENT_NOT_FOUND', 'Announcement ' + announcement.id + ' was not found').withDetails('announcement_id', announcement.id);
                    }
                    callback(err);
                });
            },
            (callback) => {
                this._persistence.update(correlationId, announcement, (err, data) => {
                    newAnnouncement = data;
                    callback(err);
                });
            },
            (callback) => {
                this._attachmentsConnector.updateAttachments(correlationId, oldAnnouncement, newAnnouncement, callback);
            }
        ], (err) => {
            callback(err, newAnnouncement);
        });
    }
    deleteAnnouncementById(correlationId, announcementId, callback) {
        let oldAnnouncement = null;
        async.series([
            (callback) => {
                this._persistence.deleteById(correlationId, announcementId, (err, data) => {
                    oldAnnouncement = data;
                    callback(err);
                });
            },
            (callback) => {
                this._attachmentsConnector.removeAttachments(correlationId, oldAnnouncement, callback);
            }
        ], (err) => {
            callback(err, oldAnnouncement);
        });
    }
}
AnnouncementsController._defaultConfig = pip_services_commons_node_1.ConfigParams.fromTuples('dependencies.persistence', 'pip-services-announcements:persistence:*:*:1.0', 'dependencies.attachments', 'pip-services-attachments:client:*:*:1.0');
exports.AnnouncementsController = AnnouncementsController;
//# sourceMappingURL=AnnouncementsController.js.map
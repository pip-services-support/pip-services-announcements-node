"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnnouncementV1 = void 0;
class AnnouncementV1 {
    constructor(id, category, app, creator, title, content) {
        this.id = id;
        this.category = category;
        this.app = app;
        this.creator = creator;
        this.title = title;
        this.content = content;
        this.pics = [];
        this.docs = [];
        this.create_time = new Date();
    }
}
exports.AnnouncementV1 = AnnouncementV1;
//# sourceMappingURL=AnnouncementV1.js.map
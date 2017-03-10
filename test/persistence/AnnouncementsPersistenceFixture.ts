let async = require('async');
let assert = require('chai').assert;

import { FilterParams } from 'pip-services-runtime-node';
import { PagingParams } from 'pip-services-runtime-node';

import { IAnnouncementsPersistence } from '../../src/persistence/IAnnouncementsPersistence';

let ANNOUNCEMENT1 = {
    id: '1',
    category: 'maintenance',
    creator: {
        id: '1',
        name: 'Test User'
    },
    title: {en: 'Announcement 1'},
    content: 'Sample Announcement #1'
};
let ANNOUNCEMENT2 = {
    id: '2',
    tags: ['TAG 1'],
    category: 'maintenance',
    creator: {
        id: '1',
        name: 'Test User'
    },
    title: {en: 'Announcement 2'},
    content: 'Sample Announcement #2'
};
let ANNOUNCEMENT3 = {
    id: '3',
    tags: ['Tag 1', 'tag 2'],
    category: 'maintenance',
    creator: {
        id: '1',
        name: 'Test User'
    },
    title: {en: 'Announcement 3'},
    content: 'Sample Announcement #3',
    status: 'translating'
};

export class AnnouncementsPersistenceFixture {
    private _db: IAnnouncementsPersistence;
    
    constructor(db) {
        assert.isNotNull(db);
        this._db = db;
    }

    createAnnouncements(done) {
        async.series([
        // Create one announcement
            (callback) => {
                this._db.createAnnouncement(
                    null,
                    ANNOUNCEMENT1,
                    (err, announcement) => {
                        assert.isNull(err);
                        
                        assert.isObject(announcement);
                        assert.equal(announcement.status, 'new');
                        assert.equal(announcement.category, ANNOUNCEMENT1.category);
                        assert.equal(announcement.content, ANNOUNCEMENT1.content);

                        callback();
                    }
                );
            },
        // Create another announcement
            (callback) => {
                this._db.createAnnouncement(
                    null,
                    ANNOUNCEMENT2,
                    (err, announcement) => {
                        assert.isNull(err);
                        
                        assert.isObject(announcement);
                        assert.equal(announcement.status, 'new');
                        assert.equal(announcement.category, ANNOUNCEMENT2.category);
                        assert.equal(announcement.content, ANNOUNCEMENT2.content);

                        callback();
                    }
                );
            },
        // Create yet another announcement
            (callback) => {
                this._db.createAnnouncement(
                    null,
                    ANNOUNCEMENT3,
                    (err, announcement) => {
                        assert.isNull(err);
                        
                        assert.isObject(announcement);
                        assert.equal(announcement.status, ANNOUNCEMENT3.status);
                        assert.equal(announcement.category, ANNOUNCEMENT3.category);
                        assert.equal(announcement.content, ANNOUNCEMENT3.content);

                        callback();
                    }
                );
            }
        ], done);
    }
                
    testCrudOperations(done) {
        async.series([
        // Create items
            (callback) => {
                this.createAnnouncements(callback);
            },
        // Get all announcements
            (callback) => {
                this._db.getAnnouncements(
                    null,
                    new FilterParams(),
                    new PagingParams(),
                    (err, announcements) => {
                        assert.isNull(err);
                        
                        assert.isObject(announcements);
                        assert.lengthOf(announcements.data, 3);

                        callback();
                    }
                );
            },
        // Update the announcement
            (callback) => {
                this._db.updateAnnouncement(
                    null,
                    ANNOUNCEMENT1.id,
                    { content: 'Updated Content 1' },
                    (err, announcement) => {
                        assert.isNull(err);
                        
                        assert.isObject(announcement);
                        assert.equal(announcement.content, 'Updated Content 1');
                        assert.equal(announcement.category, ANNOUNCEMENT1.category);

                        callback();
                    }
                );
            },
        // Delete announcement
            (callback) => {
                this._db.deleteAnnouncement(
                    null,
                    ANNOUNCEMENT1.id,
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Try to get delete announcement
            (callback) => {
                this._db.getAnnouncementById(
                    null,
                    ANNOUNCEMENT1.id,
                    (err, announcement) => {
                        assert.isNull(err);
                        
                        assert.isNull(announcement || null);

                        callback();
                    }
                );
            }
        ], done);
    }

    testGetWithFilter(done) {
        async.series([
        // Create announcements
            (callback) => {
                this.createAnnouncements(callback);
            },
        // Get announcements filtered by tags
            (callback) => {
                this._db.getAnnouncements(
                    null,
                    FilterParams.fromValue({
                        tags: ['tag 1']
                    }),
                    new PagingParams(),
                    (err, announcements) => {
                        assert.isNull(err);
                        
                        assert.isObject(announcements);
                        assert.lengthOf(announcements.data, 2);

                        callback();
                    }
                );
            },
        // Get announcements filtered by status
            (callback) => {
                this._db.getAnnouncements(
                    null,
                    FilterParams.fromValue({
                        status: ANNOUNCEMENT3.status
                    }),
                    new PagingParams(),
                    (err, announcements) => {
                        assert.isNull(err);
                        
                        assert.isObject(announcements);
                        assert.lengthOf(announcements.data, 1);

                        callback();
                    }
                );
            },
        ], done);
    }

    testGetRandom(done) {
        async.series([
        // Create announcements
            (callback) => {
                this.createAnnouncements(callback);
            },
        // Get random announcement filtered by tags
            (callback) => {
                this._db.getRandomAnnouncement(
                    null,
                    FilterParams.fromValue({
                        tags: ['tag 1'],
                        status: 'new'
                    }),
                    (err, announcement) => {
                        assert.isNull(err);
                        
                        assert.isObject(announcement);
                        assert.equal(ANNOUNCEMENT2.id, announcement.id);

                        callback();
                    }
                );
            }
        ], done);
    }
}

let async = require('async');
let assert = require('chai').assert;

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { MultiString } from 'pip-services3-commons-node';

import { IAnnouncementsPersistence } from '../../src/persistence/IAnnouncementsPersistence';
import { AnnouncementV1 } from '../../src/data/version1/AnnouncementV1';
import { PartyReferenceV1 } from '../../src/data/version1/PartyReferenceV1';

let ANNOUNCEMENT1 = <AnnouncementV1>{
    id: '1',
    category: 'maintenance',
    creator: <PartyReferenceV1>{
        id: '1',
        name: 'Test User'
    },
    title: new MultiString({ en: 'Announcement 1' }),
    content: new MultiString({ en: 'Sample Announcement #1' }),
    status: 'new'
};
let ANNOUNCEMENT2 = <AnnouncementV1>{
    id: '2',
    tags: ['TAG 1'],
    all_tags: ['tag1'],
    category: 'maintenance',
    creator: <PartyReferenceV1>{
        id: '1',
        name: 'Test User'
    },
    title: new MultiString({ en: 'Announcement 2' }),
    content: new MultiString({ en: 'Sample Announcement #2' }),
    status: 'new'
};
let ANNOUNCEMENT3 = <AnnouncementV1>{
    id: '3',
    tags: ['Tag 1', 'tag 2'],
    all_tags: ['tag1', 'tag2'],
    category: 'maintenance',
    creator: <PartyReferenceV1>{
        id: '1',
        name: 'Test User'
    },
    title: new MultiString({ en: 'Announcement 3' }),
    content: new MultiString({ en: 'Sample Announcement #3' }),
    status: 'translating'
};

export class AnnouncementsPersistenceFixture {
    private _persistence: IAnnouncementsPersistence;
    
    constructor(persistence: IAnnouncementsPersistence) {
        assert.isNotNull(persistence);
        this._persistence = persistence;
    }

    public createAnnouncements(done) {
        async.series([
        // Create one announcement
            (callback) => {
                this._persistence.create(
                    null,
                    ANNOUNCEMENT1,
                    (err, announcement) => {
                        assert.isNull(err);
                        
                        assert.isObject(announcement);
                        assert.equal(announcement.status, 'new');
                        assert.equal(announcement.category, ANNOUNCEMENT1.category);
                        //assert.equal(announcement.content, ANNOUNCEMENT1.content);

                        callback();
                    }
                );
            },
        // Create another announcement
            (callback) => {
                this._persistence.create(
                    null,
                    ANNOUNCEMENT2,
                    (err, announcement) => {
                        assert.isNull(err);
                        
                        assert.isObject(announcement);
                        assert.equal(announcement.status, 'new');
                        assert.equal(announcement.category, ANNOUNCEMENT2.category);
                        //assert.equal(announcement.content, ANNOUNCEMENT2.content);

                        callback();
                    }
                );
            },
        // Create yet another announcement
            (callback) => {
                this._persistence.create(
                    null,
                    ANNOUNCEMENT3,
                    (err, announcement) => {
                        assert.isNull(err);
                        
                        assert.isObject(announcement);
                        assert.equal(announcement.status, ANNOUNCEMENT3.status);
                        assert.equal(announcement.category, ANNOUNCEMENT3.category);
                        //assert.equal(announcement.content, ANNOUNCEMENT3.content);

                        callback();
                    }
                );
            }
        ], done);
    }
                
    public testCrudOperations(done) {
        let announcement1: AnnouncementV1;

        async.series([
        // Create items
            (callback) => {
                this.createAnnouncements(callback);
            },
        // Get all announcements
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    new FilterParams(),
                    new PagingParams(),
                    (err, page) => {
                        assert.isNull(err);
                        
                        assert.isObject(page);
                        assert.lengthOf(page.data, 3);

                        announcement1 = page.data[0];

                        callback();
                    }
                );
            },
        // Update the announcement
            (callback) => {
                announcement1.content = new MultiString({ en: 'Updated Content 1' });

                this._persistence.update(
                    null,
                    announcement1,
                    (err, announcement) => {
                        assert.isNull(err);
                        
                        assert.isObject(announcement);
                        //assert.equal(announcement.content.get('en'), 'Updated Content 1');
                        assert.equal(announcement.category, announcement1.category);

                        callback();
                    }
                );
            },
        // Delete announcement
            (callback) => {
                this._persistence.deleteById(
                    null,
                    announcement1.id,
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Try to get delete announcement
            (callback) => {
                this._persistence.getOneById(
                    null,
                    announcement1.id,
                    (err, announcement) => {
                        assert.isNull(err);
                        
                        assert.isNull(announcement || null);

                        callback();
                    }
                );
            }
        ], done);
    }

    public testGetWithFilter(done) {
        async.series([
        // Create announcements
            (callback) => {
                this.createAnnouncements(callback);
            },
        // Get announcements filtered by tags
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                        tags: ['tag1']
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
                this._persistence.getPageByFilter(
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

    public testGetRandom(done) {
        async.series([
        // Create announcements
            (callback) => {
                this.createAnnouncements(callback);
            },
        // Get random announcement filtered by tags
            (callback) => {
                this._persistence.getOneRandom(
                    null,
                    FilterParams.fromValue({
                        tags: ['tag1'],
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

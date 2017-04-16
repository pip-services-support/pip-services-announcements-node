let _ = require('lodash');
let async = require('async');
let restify = require('restify');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { MultiString } from 'pip-services-commons-node';

import { PartyReferenceV1 } from '../../../src/data/version1/PartyReferenceV1';
import { AnnouncementV1 } from '../../../src/data/version1/AnnouncementV1';
import { AnnouncementsMemoryPersistence } from '../../../src/persistence/AnnouncementsMemoryPersistence';
import { AnnouncementsController } from '../../../src/logic/AnnouncementsController';
import { AnnouncementsHttpServiceV1 } from '../../../src/services/version1/AnnouncementsHttpServiceV1';

let httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

let ANNOUNCEMENT1 = <AnnouncementV1>{
    id: '1',
    category: 'maintenance',
    creator: <PartyReferenceV1>{
        id: '1',
        name: 'Test User'
    },
    title: <MultiString>{ en: 'Announcement 1' },
    content: <MultiString>{ en: 'Sample Announcement #1' }
};
let ANNOUNCEMENT2 = <AnnouncementV1>{
    id: '2',
    tags: ['TAG 1'],
    category: 'maintenance',
    creator: <PartyReferenceV1>{
        id: '1',
        name: 'Test User'
    },
    title: <MultiString>{ en: 'Announcement 2' },
    content: <MultiString>{ en: 'Sample Announcement #2' }
};

suite('AnnouncementsHttpServiceV1', ()=> {
    let service: AnnouncementsHttpServiceV1;

    let rest: any;

    suiteSetup((done) => {
        let persistence = new AnnouncementsMemoryPersistence();
        let controller = new AnnouncementsController();

        service = new AnnouncementsHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services-announcements', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-announcements', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-announcements', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        service.open(null, done);
    });
    
    suiteTeardown((done) => {
        service.close(null, done);
    });

    setup(() => {
        let url = 'http://localhost:3000';
        rest = restify.createJsonClient({ url: url, version: '*' });
    });
    
    test('CRUD Operations', (done) => {
        let announcement1, announcement2;

        async.series([
        // Create one announcement
            (callback) => {
                rest.post('/announcements/create_announcement',
                    {
                        announcement: ANNOUNCEMENT1
                    },
                    (err, req, res, announcement) => {
                        assert.isNull(err);
                        
                        assert.isObject(announcement);
                        assert.equal(announcement.category, ANNOUNCEMENT1.category);
                        assert.equal(announcement.content.en, ANNOUNCEMENT1.content.en);

                        announcement1 = announcement;

                        callback();
                    }
                );
            },
        // Create another announcement
            (callback) => {
                rest.post('/announcements/create_announcement',
                    {
                        announcement: ANNOUNCEMENT2
                    },
                    (err, req, res, announcement) => {
                        assert.isNull(err);
                        
                        assert.isObject(announcement);
                        assert.equal(announcement.category, ANNOUNCEMENT2.category);
                        assert.equal(announcement.content.en, ANNOUNCEMENT2.content.en);

                        announcement2 = announcement;

                        callback();
                    }
                );
            },
        // Get all announcements
            (callback) => {
                rest.post('/announcements/get_announcements',
                    {},
                    (err, req, res, page) => {
                        assert.isNull(err);
                        
                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);

                        callback();
                    }
                );
            },
        // Update the announcement
            (callback) => {
                announcement1.content = <MultiString>{ en: 'Updated Content 1' };

                rest.post('/announcements/update_announcement',
                    {
                        announcement: announcement1
                    },
                    (err, req, res, announcement) => {
                        assert.isNull(err);
                        
                        assert.isObject(announcement);
                        assert.equal(announcement.content.en, 'Updated Content 1');
                        assert.equal(announcement.category, ANNOUNCEMENT1.category);

                        announcement1 = announcement;

                        callback();
                    }
                );
            },
        // Delete announcement
            (callback) => {
                rest.post('/announcements/delete_announcement_by_id',
                    {
                        announcement_id: announcement1.id
                    },
                    (err, req, res) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Try to get delete announcement
            (callback) => {
                rest.post('/announcements/get_announcement_by_id',
                    {
                        announcement_id: announcement1.id
                    },
                    (err, req, res, announcement) => {
                        assert.isNull(err);
                        
                        //assert.isNull(announcement || null);

                        callback();
                    }
                );
            }
        ], done);
    });
});
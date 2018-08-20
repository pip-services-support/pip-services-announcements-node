let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-components-node';
import { MultiString } from 'pip-services-commons-node';
import { SenecaInstance } from 'pip-services-seneca-node';

import { PartyReferenceV1 } from '../../../src/data/version1/PartyReferenceV1';
import { AnnouncementV1 } from '../../../src/data/version1/AnnouncementV1';
import { AnnouncementsMemoryPersistence } from '../../../src/persistence/AnnouncementsMemoryPersistence';
import { AnnouncementsController } from '../../../src/logic/AnnouncementsController';
import { AnnouncementsSenecaServiceV1 } from '../../../src/services/version1/AnnouncementsSenecaServiceV1';

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

suite('AnnouncementsSenecaServiceV1', ()=> {
    let seneca: any;
    let service: AnnouncementsSenecaServiceV1;
    let persistence: AnnouncementsMemoryPersistence;
    let controller: AnnouncementsController;

    suiteSetup((done) => {
        persistence = new AnnouncementsMemoryPersistence();
        controller = new AnnouncementsController();

        service = new AnnouncementsSenecaServiceV1();
        service.configure(ConfigParams.fromTuples(
            "connection.protocol", "none"
        ));

        let logger = new ConsoleLogger();
        let senecaAddon = new SenecaInstance();

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-seneca', 'seneca', 'instance', 'default', '1.0'), senecaAddon,
            new Descriptor('pip-services-announcements', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-announcements', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-announcements', 'service', 'seneca', 'default', '1.0'), service
        );

        controller.setReferences(references);
        service.setReferences(references);

        seneca = senecaAddon.getInstance();

        service.open(null, done);
    });
    
    suiteTeardown((done) => {
        service.close(null, done);
    });
    
    setup((done) => {
        persistence.clear(null, done);
    });

    test('CRUD Operations', (done) => {
        let announcement1, announcement2;

        async.series([
        // Create one announcement
            (callback) => {
                seneca.act(
                    {
                        role: 'announcements',
                        cmd: 'create_announcement',
                        announcement: ANNOUNCEMENT1
                    },
                    (err, announcement) => {
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
                seneca.act(
                    {
                        role: 'announcements',
                        cmd: 'create_announcement',
                        announcement: ANNOUNCEMENT2
                    },
                    (err, announcement) => {
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
                seneca.act(
                    {
                        role: 'announcements',
                        cmd: 'get_announcements' 
                    },
                    (err, page) => {
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

                seneca.act(
                    {
                        role: 'announcements',
                        cmd: 'update_announcement',
                        announcement: announcement1
                    },
                    (err, announcement) => {
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
                seneca.act(
                    {
                        role: 'announcements',
                        cmd: 'delete_announcement_by_id',
                        announcement_id: announcement1.id
                    },
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Try to get delete announcement
            (callback) => {
                seneca.act(
                    {
                        role: 'announcements',
                        cmd: 'get_announcement_by_id',
                        announcement_id: announcement1.id
                    },
                    (err, announcement) => {
                        assert.isNull(err);
                        
                        assert.isNull(announcement || null);

                        callback();
                    }
                );
            }
        ], done);
    });
});
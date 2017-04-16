let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-commons-node';
import { MultiString } from 'pip-services-commons-node';

import { PartyReferenceV1 } from '../../src/data/version1/PartyReferenceV1';
import { AnnouncementV1 } from '../../src/data/version1/AnnouncementV1';
import { AnnouncementsMemoryPersistence } from '../../src/persistence/AnnouncementsMemoryPersistence';
import { AnnouncementsController } from '../../src/logic/AnnouncementsController';
import { AnnouncementsLambdaFunction } from '../../src/container/AnnouncementsLambdaFunction';

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

suite('AnnouncementsLambdaFunction', ()=> {
    let lambda: AnnouncementsLambdaFunction;

    suiteSetup((done) => {
        let config = ConfigParams.fromTuples(
            'logger.descriptor', 'pip-services-commons:logger:console:default:1.0',
            'persistence.descriptor', 'pip-services-announcements:persistence:memory:default:1.0',
            'controller.descriptor', 'pip-services-announcements:controller:default:default:1.0'
        );

        lambda = new AnnouncementsLambdaFunction();
        lambda.configure(config);
        lambda.open(null, done);
    });
    
    suiteTeardown((done) => {
        lambda.close(null, done);
    });
    
    test('CRUD Operations', (done) => {
        let announcement1, announcement2;

        async.series([
        // Create one announcement
            (callback) => {
                lambda.act(
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
                lambda.act(
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
                lambda.act(
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

                lambda.act(
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
                lambda.act(
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
                lambda.act(
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
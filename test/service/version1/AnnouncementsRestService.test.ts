let _ = require('lodash');
let async = require('async');
let restify = require('restify');
let assert = require('chai').assert;

import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { LifeCycleManager } from 'pip-services-runtime-node';

import { Version1 as StorageV1 } from 'pip-clients-storage-node';
let StorageNullClient = StorageV1.StorageNullClient;

import { AnnouncementsMemoryPersistence } from '../../../src/persistence/AnnouncementsMemoryPersistence';
import { AnnouncementsController } from '../../../src/logic/AnnouncementsController';
import { AnnouncementsRestService } from '../../../src/services/version1/AnnouncementsRestService';

let restConfig = ComponentConfig.fromTuples(
    'endpoint.host', 'localhost',  
    'endpoint.port', 3000
);

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

suite('AnnouncementsRestService', ()=> {    
    let db = new AnnouncementsMemoryPersistence();
    db.configure(new ComponentConfig());

    let ctrl = new AnnouncementsController();
    ctrl.configure(new ComponentConfig());

    let service = new AnnouncementsRestService();
    service.configure(restConfig);

    let storage = new StorageNullClient();
    storage.configure(new ComponentConfig());

    let components = ComponentSet.fromComponents(db, storage, ctrl, service);

    let url = restConfig.getEndpoint().getUri();
    let rest = restify.createJsonClient({ url: url, version: '*' });

    suiteSetup((done) => {
        LifeCycleManager.linkAndOpen(components, done);
    });
    
    suiteTeardown((done) => {
        LifeCycleManager.close(components, done);
    });
    
    setup((done) => {
        db.clearTestData(done);
    });
    
    test('CRUD Operations', (done) => {
        var announcement1, announcement2;

        async.series([
        // Create one announcement
            (callback) => {
                rest.post('/announcements',
                    ANNOUNCEMENT1,
                    (err, req, res, announcement) => {
                        assert.isNull(err);
                        
                        assert.isObject(announcement);
                        assert.equal(announcement.category, ANNOUNCEMENT1.category);
                        assert.equal(announcement.content, ANNOUNCEMENT1.content);

                        announcement1 = announcement;

                        callback();
                    }
                );
            },
        // Create another announcement
            (callback) => {
                rest.post('/announcements', 
                    ANNOUNCEMENT2,
                    (err, req, res, announcement) => {
                        assert.isNull(err);
                        
                        assert.isObject(announcement);
                        assert.equal(announcement.category, ANNOUNCEMENT2.category);
                        assert.equal(announcement.content, ANNOUNCEMENT2.content);

                        announcement2 = announcement;

                        callback();
                    }
                );
            },
        // Get all announcements
            (callback) => {
                rest.get('/announcements',
                    (err, req, res, announcements) => {
                        assert.isNull(err);
                        
                        assert.isObject(announcements);
                        assert.lengthOf(announcements.data, 2);

                        callback();
                    }
                );
            },
        // Update the announcement
            (callback) => {
                rest.put('/announcements/' + announcement1.id,
                    { content: 'Updated Content 1' },
                    (err, req, res, announcement) => {
                        assert.isNull(err);
                        
                        assert.isObject(announcement);
                        assert.equal(announcement.content, 'Updated Content 1');
                        assert.equal(announcement.category, ANNOUNCEMENT1.category);

                        announcement1 = announcement;

                        callback();
                    }
                );
            },
        // Delete announcement
            (callback) => {
                rest.del('/announcements/' + announcement1.id,
                    (err, req, res, result) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Try to get delete announcement
            (callback) => {
                rest.get('/announcements/' + announcement1.id,
                    (err, req, res, announcement) => {
                        //assert.isNull(err, announcement);

                        callback();
                    }
                );
            }
        ], done);
    });
});
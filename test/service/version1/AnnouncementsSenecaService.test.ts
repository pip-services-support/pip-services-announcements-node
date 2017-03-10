let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { SenecaAddon } from 'pip-services-runtime-node';
import { DynamicMap } from 'pip-services-runtime-node';
import { LifeCycleManager } from 'pip-services-runtime-node';

import { Version1 as StorageV1 } from 'pip-clients-storage-node';
let StorageNullClient = StorageV1.StorageNullClient;

import { AnnouncementsMemoryPersistence } from '../../../src/persistence/AnnouncementsMemoryPersistence';
import { AnnouncementsController } from '../../../src/logic/AnnouncementsController';
import { AnnouncementsSenecaService } from '../../../src/services/version1/AnnouncementsSenecaService';

let ANNOUNCEMENT1 = {
    id: '1',
    category: 'maintenance',
    creator: {
        id: '1',
        name: 'Test User'
    },
    title: { en: 'Announcement 1' },
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
    title: { en: 'Announcement 2' },
    content: 'Sample Announcement #2'
};

suite('AnnouncementsSenecaService', ()=> {        
    let db = new AnnouncementsMemoryPersistence();
    db.configure(new ComponentConfig());

    let ctrl = new AnnouncementsController();
    ctrl.configure(new ComponentConfig());

    let service = new AnnouncementsSenecaService();
    service.configure(new ComponentConfig());

    let storage = new StorageNullClient();
    storage.configure(new ComponentConfig());

    let seneca = new SenecaAddon();
    seneca.configure(new ComponentConfig());

    let components = ComponentSet.fromComponents(db, storage, ctrl, service, seneca);

    suiteSetup((done) => {
        LifeCycleManager.linkAndOpen(components, done);
    });
    
    suiteTeardown((done) => {
        seneca.getSeneca().close(() => {
            LifeCycleManager.close(components, done);
        });
    });
    
    setup((done) => {
        db.clearTestData(done);
    });
    
    test('CRUD Operations', (done) => {
        let announcement1, announcement2;

        async.series([
        // Create one announcement
            (callback) => {
                seneca.getSeneca().act(
                    {
                        role: 'announcements',
                        cmd: 'create_announcement',
                        announcement: ANNOUNCEMENT1
                    },
                    (err, announcement) => {
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
                seneca.getSeneca().act(
                    {
                        role: 'announcements',
                        cmd: 'create_announcement',
                        announcement: ANNOUNCEMENT2
                    },
                    (err, announcement) => {
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
                seneca.getSeneca().act(
                    {
                        role: 'announcements',
                        cmd: 'get_announcements' 
                    },
                    (err, announcements) => {
                        assert.isNull(err);
                        
                        assert.isObject(announcements);
                        assert.lengthOf(announcements.data, 2);

                        callback();
                    }
                );
            },
        // Update the announcement
            (callback) => {
                seneca.getSeneca().act(
                    {
                        role: 'announcements',
                        cmd: 'update_announcement',
                        announcement_id: announcement1.id,
                        announcement: { content: 'Updated Content 1' }
                    },
                    (err, announcement) => {
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
                seneca.getSeneca().act(
                    {
                        role: 'announcements',
                        cmd: 'delete_announcement',
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
                seneca.getSeneca().act(
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
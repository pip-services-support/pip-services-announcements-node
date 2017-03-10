import { Version1 as StorageV1 } from 'pip-clients-storage-node';
let StorageNullClient = StorageV1.StorageNullClient;

import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { DynamicMap } from 'pip-services-runtime-node';

import { AnnouncementsFilePersistence } from '../../src/persistence/AnnouncementsFilePersistence';
import { AnnouncementsPersistenceFixture } from './AnnouncementsPersistenceFixture';

let config = ComponentConfig.fromValue({
    descriptor: {
        type: 'file'
    },
    options: {
        path: './data/announces.test.json',
        data: []
    }
});

suite('AnnouncementsFilePersistence', ()=> {
    let db, fixture, storage;
    
    setup((done) => {
        db = new AnnouncementsFilePersistence();
        db.configure(config);

        fixture = new AnnouncementsPersistenceFixture(db);

        storage = new StorageNullClient();
        storage.configure(new ComponentConfig());

        let components = ComponentSet.fromComponents(db, storage);

        db.link(components);
        db.open(done);
    });
    
    teardown((done) => {
        db.close(done);
    });
        
    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

    test('Get with Filters', (done) => {
        fixture.testGetWithFilter(done);
    });

    test('Get Random', (done) => {
        fixture.testGetRandom(done);
    });
});
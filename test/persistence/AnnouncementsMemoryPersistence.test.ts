import { Version1 as StorageV1 } from 'pip-clients-storage-node';
let StorageNullClient = StorageV1.StorageNullClient;

import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { DynamicMap } from 'pip-services-runtime-node';

import { AnnouncementsMemoryPersistence } from '../../src/persistence/AnnouncementsMemoryPersistence';
import { AnnouncementsPersistenceFixture } from './AnnouncementsPersistenceFixture';

suite('AnnouncementsFilePersistence', ()=> {
    let db, fixture, storage;
    
    setup((done) => {
        db = new AnnouncementsMemoryPersistence();
        db.configure(new ComponentConfig());

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
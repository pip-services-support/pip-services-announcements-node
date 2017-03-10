import { Version1 as StorageV1 } from 'pip-clients-storage-node';
let StorageNullClient = StorageV1.StorageNullClient;

import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { DynamicMap } from 'pip-services-runtime-node';

import { AnnouncementsMongoDbPersistence } from '../../src/persistence/AnnouncementsMongoDbPersistence';
import { AnnouncementsPersistenceFixture } from './AnnouncementsPersistenceFixture';

let options = new DynamicMap(require('../../../config/config'));
let dbOptions = ComponentConfig.fromValue(options.getNullableMap('persistence'));

suite('AnnouncementsMongoDbPersistence', ()=> {
    // Skip test if mongodb is not configured
    if (dbOptions.getRawContent().getString('descriptor.type') != 'mongodb')
        return; 
    
    let db = new AnnouncementsMongoDbPersistence();
    db.configure(dbOptions);

    let fixture = new AnnouncementsPersistenceFixture(db);

    let storage = new StorageNullClient(null);
    let components = ComponentSet.fromComponents(db, storage);

    suiteSetup((done) => {       
        db.link(components);
        db.open(done);
    });
    
    suiteTeardown((done) => {
        db.close(done);
    });
    
    setup((done) => {
        db.clearTestData(done);
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
import { YamlConfigReader } from 'pip-services-commons-node';

import { AnnouncementsMongoDbPersistence } from '../../src/persistence/AnnouncementsMongoDbPersistence';
import { AnnouncementsPersistenceFixture } from './AnnouncementsPersistenceFixture';

suite('AnnouncementsMongoDbPersistence', ()=> {
    let persistence: AnnouncementsMongoDbPersistence;
    let fixture: AnnouncementsPersistenceFixture;

    setup((done) => {
        let config = YamlConfigReader.readConfig(null, './config/test_connections.yml', null);
        let dbConfig = config.getSection('mongodb');

        persistence = new AnnouncementsMongoDbPersistence();
        persistence.configure(dbConfig);

        fixture = new AnnouncementsPersistenceFixture(persistence);

        persistence.open(null, (err: any) => {
            persistence.clear(null, (err) => {
                done(err);
            });
        });
    });
    
    teardown((done) => {
        persistence.close(null, done);
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
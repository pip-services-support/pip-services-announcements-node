import { ConfigParams } from 'pip-services3-commons-node';

import { AnnouncementsFilePersistence } from '../../src/persistence/AnnouncementsFilePersistence';
import { AnnouncementsPersistenceFixture } from './AnnouncementsPersistenceFixture';

suite('AnnouncementsFilePersistence', ()=> {
    let persistence: AnnouncementsFilePersistence;
    let fixture: AnnouncementsPersistenceFixture;
    
    setup((done) => {
        persistence = new AnnouncementsFilePersistence('./data/Announcements.test.json');

        fixture = new AnnouncementsPersistenceFixture(persistence);
        
        persistence.open(null, (err) => {
            if (err) done(err);
            else persistence.clear(null, done);
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
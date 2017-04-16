import { AnnouncementsMemoryPersistence } from '../../src/persistence/AnnouncementsMemoryPersistence';
import { AnnouncementsPersistenceFixture } from './AnnouncementsPersistenceFixture';

suite('AnnouncementsMemoryPersistence', ()=> {
    let persistence: AnnouncementsMemoryPersistence;
    let fixture: AnnouncementsPersistenceFixture;
    
    setup((done) => {
        persistence = new AnnouncementsMemoryPersistence();
        fixture = new AnnouncementsPersistenceFixture(persistence);
        
        persistence.open(null, done);
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
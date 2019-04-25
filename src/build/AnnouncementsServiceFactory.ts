import { Factory } from 'pip-services3-components-node';
import { Descriptor } from 'pip-services3-commons-node';

import { AnnouncementsMongoDbPersistence } from '../persistence/AnnouncementsMongoDbPersistence';
import { AnnouncementsFilePersistence } from '../persistence/AnnouncementsFilePersistence';
import { AnnouncementsMemoryPersistence } from '../persistence/AnnouncementsMemoryPersistence';
import { AnnouncementsController } from '../logic/AnnouncementsController';
import { AnnouncementsHttpServiceV1 } from '../services/version1/AnnouncementsHttpServiceV1';

export class AnnouncementsServiceFactory extends Factory {
	public static Descriptor = new Descriptor("pip-services-announcements", "factory", "default", "default", "1.0");
	public static MemoryPersistenceDescriptor = new Descriptor("pip-services-announcements", "persistence", "memory", "*", "1.0");
	public static FilePersistenceDescriptor = new Descriptor("pip-services-announcements", "persistence", "file", "*", "1.0");
	public static MongoDbPersistenceDescriptor = new Descriptor("pip-services-announcements", "persistence", "mongodb", "*", "1.0");
	public static ControllerDescriptor = new Descriptor("pip-services-announcements", "controller", "default", "*", "1.0");
	public static HttpServiceDescriptor = new Descriptor("pip-services-announcements", "service", "http", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(AnnouncementsServiceFactory.MemoryPersistenceDescriptor, AnnouncementsMemoryPersistence);
		this.registerAsType(AnnouncementsServiceFactory.FilePersistenceDescriptor, AnnouncementsFilePersistence);
		this.registerAsType(AnnouncementsServiceFactory.MongoDbPersistenceDescriptor, AnnouncementsMongoDbPersistence);
		this.registerAsType(AnnouncementsServiceFactory.ControllerDescriptor, AnnouncementsController);
		this.registerAsType(AnnouncementsServiceFactory.HttpServiceDescriptor, AnnouncementsHttpServiceV1);
	}
	
}

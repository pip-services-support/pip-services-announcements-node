import { Factory } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';

import { AnnouncementsMongoDbPersistence } from '../persistence/AnnouncementsMongoDbPersistence';
import { AnnouncementsFilePersistence } from '../persistence/AnnouncementsFilePersistence';
import { AnnouncementsMemoryPersistence } from '../persistence/AnnouncementsMemoryPersistence';
import { AnnouncementsController } from '../logic/AnnouncementsController';
import { AnnouncementsHttpServiceV1 } from '../services/version1/AnnouncementsHttpServiceV1';
import { AnnouncementsSenecaServiceV1 } from '../services/version1/AnnouncementsSenecaServiceV1'; 

export class AnnouncementsFactory extends Factory {
	public static Descriptor = new Descriptor("pip-services-announcements", "factory", "default", "default", "1.0");
	public static MemoryPersistenceDescriptor = new Descriptor("pip-services-announcements", "persistence", "memory", "*", "1.0");
	public static FilePersistenceDescriptor = new Descriptor("pip-services-announcements", "persistence", "file", "*", "1.0");
	public static MongoDbPersistenceDescriptor = new Descriptor("pip-services-announcements", "persistence", "mongodb", "*", "1.0");
	public static ControllerDescriptor = new Descriptor("pip-services-announcements", "controller", "default", "*", "1.0");
	public static SenecaServiceDescriptor = new Descriptor("pip-services-announcements", "service", "seneca", "*", "1.0");
	public static HttpServiceDescriptor = new Descriptor("pip-services-announcements", "service", "http", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(AnnouncementsFactory.MemoryPersistenceDescriptor, AnnouncementsMemoryPersistence);
		this.registerAsType(AnnouncementsFactory.FilePersistenceDescriptor, AnnouncementsFilePersistence);
		this.registerAsType(AnnouncementsFactory.MongoDbPersistenceDescriptor, AnnouncementsMongoDbPersistence);
		this.registerAsType(AnnouncementsFactory.ControllerDescriptor, AnnouncementsController);
		this.registerAsType(AnnouncementsFactory.SenecaServiceDescriptor, AnnouncementsSenecaServiceV1);
		this.registerAsType(AnnouncementsFactory.HttpServiceDescriptor, AnnouncementsHttpServiceV1);
	}
	
}

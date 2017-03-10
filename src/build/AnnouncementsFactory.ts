import { ComponentFactory } from 'pip-services-runtime-node';
import { DefaultFactory } from 'pip-services-runtime-node';

import { StorageFactory } from 'pip-clients-storage-node';

import { AnnouncementsMongoDbPersistence } from '../persistence/AnnouncementsMongoDbPersistence';
import { AnnouncementsFilePersistence } from '../persistence/AnnouncementsFilePersistence';
import { AnnouncementsMemoryPersistence } from '../persistence/AnnouncementsMemoryPersistence';
import { AnnouncementsController } from '../logic/AnnouncementsController';
import { AnnouncementsRestService } from '../services/version1/AnnouncementsRestService';
import { AnnouncementsSenecaService } from '../services/version1/AnnouncementsSenecaService'; 

export class AnnouncementsFactory extends ComponentFactory {
	public static Instance: AnnouncementsFactory = new AnnouncementsFactory();
	
	constructor() {
		super(StorageFactory.Instance, DefaultFactory.Instance);

		this.register(AnnouncementsFilePersistence.Descriptor, AnnouncementsFilePersistence);
		this.register(AnnouncementsMemoryPersistence.Descriptor, AnnouncementsMemoryPersistence);
		this.register(AnnouncementsMongoDbPersistence.Descriptor, AnnouncementsMongoDbPersistence);
		this.register(AnnouncementsController.Descriptor, AnnouncementsController);
		this.register(AnnouncementsRestService.Descriptor, AnnouncementsRestService);
		this.register(AnnouncementsSenecaService.Descriptor, AnnouncementsSenecaService);
	}
	
}

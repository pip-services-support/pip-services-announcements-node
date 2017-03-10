let _ = require('lodash');

import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { AnnouncementsFilePersistence } from './AnnouncementsFilePersistence';
import { IAnnouncementsPersistence } from './IAnnouncementsPersistence';

export class AnnouncementsMemoryPersistence extends AnnouncementsFilePersistence implements IAnnouncementsPersistence {
	/**
	 * Unique descriptor for the AnnouncementsMemoryPersistence component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Persistence, "pip-services-announces", "memory", "*"
	);

    constructor() {
        super(AnnouncementsMemoryPersistence.Descriptor);
    }

    public configure(config: ComponentConfig): void {
        super.configure(config.withDefaultTuples("options.path", ""));
    }

    public save(callback: (err: any) => void): void {
        // Skip saving data to disk
        if (callback) callback(null);
    }
}

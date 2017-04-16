import { ConfigParams } from 'pip-services-commons-node';
import { JsonFilePersister } from 'pip-services-data-node';
import { AnnouncementsMemoryPersistence } from './AnnouncementsMemoryPersistence';
import { AnnouncementV1 } from '../data/version1/AnnouncementV1';
export declare class AnnouncementsFilePersistence extends AnnouncementsMemoryPersistence {
    protected _persister: JsonFilePersister<AnnouncementV1>;
    constructor(path?: string);
    configure(config: ConfigParams): void;
}

import { SenecaPlugin } from 'pip-services-runtime-node';

import { AnnouncementsMicroservice} from './AnnouncementsMicroservice';

export class AnnouncementsSenecaPlugin extends SenecaPlugin {
    constructor() {
        super('announces', new AnnouncementsMicroservice());
    }
}
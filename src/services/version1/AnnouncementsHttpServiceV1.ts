import { Descriptor } from 'pip-services-commons-node';
import { CommandableHttpService } from 'pip-services-net-node';

export class AnnouncementsHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('v1/announcements');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-announcements', 'controller', 'default', '*', '1.0'));
    }
}
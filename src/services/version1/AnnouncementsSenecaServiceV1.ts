import { Descriptor } from 'pip-services-commons-node';
import { CommandableSenecaService } from 'pip-services-seneca-node';

export class AnnouncementsSenecaServiceV1 extends CommandableSenecaService {
    public constructor() {
        super('announcements');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-announcements', 'controller', 'default', '*', '1.0'));
    }
}
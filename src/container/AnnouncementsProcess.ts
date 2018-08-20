import { IReferences } from 'pip-services-commons-node';
import { ProcessContainer } from 'pip-services-container-node';

import { AttachmentsClientFactory } from 'pip-clients-attachments-node';
import { AnnouncementsServiceFactory } from '../build/AnnouncementsServiceFactory';
import { DefaultRpcFactory } from 'pip-services-rpc-node';

export class AnnouncementsProcess extends ProcessContainer {

    public constructor() {
        super("announcements", "System announcements microservice");
        this._factories.add(new AnnouncementsServiceFactory);
        this._factories.add(new AttachmentsClientFactory);
        this._factories.add(new DefaultRpcFactory);
    }

}

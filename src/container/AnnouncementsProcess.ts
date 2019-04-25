import { IReferences } from 'pip-services3-commons-node';
import { ProcessContainer } from 'pip-services3-container-node';

import { AttachmentsClientFactory } from 'pip-clients-attachments-node';
import { AnnouncementsServiceFactory } from '../build/AnnouncementsServiceFactory';
import { DefaultRpcFactory } from 'pip-services3-rpc-node';

export class AnnouncementsProcess extends ProcessContainer {

    public constructor() {
        super("announcements", "System announcements microservice");
        this._factories.add(new AnnouncementsServiceFactory);
        this._factories.add(new AttachmentsClientFactory);
        this._factories.add(new DefaultRpcFactory);
    }

}

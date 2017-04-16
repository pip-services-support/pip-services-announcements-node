import { Descriptor } from 'pip-services-commons-node';
import { CommandableLambdaFunction } from 'pip-services-aws-node';
import { AnnouncementsFactory } from '../build/AnnouncementsFactory';

export class AnnouncementsLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("announcements", "System announcements function");
        this._dependencyResolver.put('controller', new Descriptor('pip-services-announcements', 'controller', 'default', '*', '*'));
        this._factories.add(new AnnouncementsFactory());
    }
}

export const handler = new AnnouncementsLambdaFunction().getHandler();
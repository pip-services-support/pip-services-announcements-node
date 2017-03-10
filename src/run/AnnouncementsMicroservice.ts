import { Microservice } from 'pip-services-runtime-node';

import { AnnouncementsFactory } from '../build/AnnouncementsFactory';

/**
 * Announcements microservice class.
 * 
 * @author Sergey Seroukhov
 * @version 1.0
 * @since 2016-06-27
 */
export class AnnouncementsMicroservice extends Microservice {
	/**
	 * Creates instance of announces microservice.
	 */
	constructor() {
		super("pip-services-announces", AnnouncementsFactory.Instance);
	}
}

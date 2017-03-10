import { ProcessRunner } from 'pip-services-runtime-node';

import { AnnouncementsMicroservice } from './AnnouncementsMicroservice';

/**
 * Announcements process runner
 * 
 * @author Sergey Seroukhov
 * @version 1.1
 * @since 2016-06-27
 */
export class AnnouncementsProcessRunner extends ProcessRunner {
    /**
     * Creates instance of announces process runner
     */
    constructor() {
        super(new AnnouncementsMicroservice());
    }
}
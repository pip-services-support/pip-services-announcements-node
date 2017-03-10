let _ = require('lodash');

import { Converter } from 'pip-services-runtime-node';
import { TagsProcessor } from 'pip-services-runtime-node';

/**
 * Announcements data converter
 * 
 * @author Sergey Seroukhov
 * @version 1.0
 * @since 2016-05-01
 */
export class AnnouncementsDataConverter {
    
    public static validate(item: any): any {
        return _.pick(item, 'id', 'category', 'app', 'creator', 'created', 
            'title', 'content', 'loc', 'start', 'end', 
            'pic_ids', 'docs', 'tags', 'all_tags', 'status', 'importance',
            'custom_hdr', 'custom_dat'
        );
    }

    // Extracts block ids from an announcement from pic_ids and docs fields
    public static getBlockIds(item: any): string[] {
        let blockIds: string[] = [];

        // Process pictures
        _.each(item.pic_ids, (id) => {
            blockIds.push(id);
        });

        // Process documents
        _.each(item.docs, (doc)=> {
            blockIds.push(doc.id);
        });

        return blockIds;
    }

}
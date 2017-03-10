# Seneca Protocol (version 1) <br/> Announcements Microservice

Announcements microservice implements a Seneca compatible API. 
Seneca port and protocol can be specified in the microservice [configuration](Configuration.md/#api_seneca). 

```javascript
var seneca = require('seneca')();

seneca.client({
    type: 'tcp', // Microservice seneca protocol
    localhost: 'localhost', // Microservice localhost
    port: 8811, // Microservice seneca port
});
```

The microservice responds on the following requests:

```javascript
seneca.act(
    {
        role: 'announcements',
        version: 1,
        cmd: ...cmd name....
        ... Arguments ...
    },
    function (err, result) {
        ...
    }
);
```

* [MultiString class](#class1)
* [Announcement class](#class2)
* [AnnouncementPage class](#class3)
* [cmd: 'get_announcements'](#operation1)
* [cmd: 'get_random_announcement'](#operation2)
* [cmd: 'get_announcement_by_id'](#operation3)
* [cmd: 'create_announcement'](#operation4)
* [cmd: 'update_announcement'](#operation5)
* [cmd: 'delete_announcement'](#operation6)

## Data types

### <a name="class1"></a> MultiString class

String that contains versions in multiple languages

**Properties:**
- en: string - English version of the string
- sp: string - Spanish version of the string
- de: string - German version of the string
- fr: string - Franch version of the string
- pt: string - Portuguese version of the string
- ru: string - Russian version of the string
- .. - other languages can be added here

### <a name="class2"></a> Announcement class

Represents a system announcement. 

**Properties:**
- id: string - unique announcement id
- category: string - announcement category, i.e. 'maintenance', 'product update', etc.
- app: string - (optional) application name
- creator_id: string - unique user or party id who created the announcement
- creator_name: string - creator/author name
- created: Date - date and time when announcement was created
- title: MultiString - (optional) announcement title in multiple languages
- content: MultiString - announcement textual content in multiple languages
- loc_name: string - (optional) location name or address associated with this announcement
- loc_pos: Object - (optional) location position in GeoJSON format
- start: Date - (optional) start of a time interval associated with this announcement
- end: Date - (optional) end of a time interval associated with this announcement
- pic_ids: [string] - (optional) array of picture block ids in storage attached to this announcement
- docs: [Document] - (optional) array of attached documents
  - block_id: string - block id in storage attached to this announcement
  - block_name: string - attached document/file name
- tags: [string] - (optional) explicit tags with annoucement topic for searching
- all_tags: [string] - (readonly) normalized array of explicit and hash tags used by search
- status: string - editing status: 'new', 'writing', 'translating', 'completed' (default: 'new')
- importance: int - (optional) importance: 0 - low, 1000 - high (default: 0)
- custom_hdr: Object - custom data summary that is always returned (in list and details)
- custom_dat: Object - custom data details that is returned only when a single object is returned (details)

### <a name="class3"></a> AnnouncementPage class

Represents a paged result with subset of requested Announcement objects

**Properties:**
- data: [Announcement] - array of retrieved Announcement page
- count: int - total number of objects in retrieved resultset

## Operations

### <a name="operation1"></a> Cmd: 'get_announcements'

Retrieves a list of announcements by specified criteria

**Arguments:** 
- filter: object - filter parameters
  - category: string - (optional) announcement category
  - app: string - (optional) application name
  - status: string - (optional) editing status
  - from: Date - (optional) start of announcement created interval
  - to: Date - (optional) end of announcement created interval
  - tags: [string] - search tags
  - search: string - string for full text search in title, content and creator name
- paging: object - paging parameters
  - skip: int - (optional) start of page (default: 0). Operation returns paged result
  - take: int - (optional) page length (max: 100). Operation returns paged result

**Returns:**
- err: Error - occured error or null for success
- result: [Announcement] or AnnouncementPage - retrieved Announcement objects in plain array or page format

### <a name="operation2"></a> Cmd: 'get_random_announcement'

Retrieves a random announcement from filtered resultset

**Arguments:** 
- filter: object - filter parameters
  - category: string - (optional) announcement category
  - app: string - (optional) application name
  - status: string - (optional) editing status
  - from: Date - (optional) start of announcement created interval (default: 1 week from current time)
  - to: Date - (optional) end of announcement created interval
  - tags: [string] - search tags
  - search: string - string for full text search in title, content and creator name

**Returns:**
- err: Error - occured error or null for success
- result: Announcement - random Announcement or null if nothing was found

### <a name="operation3"></a> Cmd: 'get_announcement_by_id'

Retrieves announcement by its unique id. 

**Arguments:** 
- announcement_id: string - unique announcement id

**Returns:**
- err: Error - occured error or null for success
- result: Announcement - retrieved Announcement object

### <a name="operation4"></a> Cmd: 'create_announcement'

Creates a new system announcement.

**Arguments:** 
- announcement: Announcement - a new annoucement to be created

**Returns:**
- err: Error - occured error or null for success
- result: Announcement - created Announcement object

### <a name="operation5"></a> Cmd: 'update_announcement'

Updated announcement specified by its unique id.

**Arguments:** 
- announcement_id: string - unique announcement id
- announcement: Announcement - new announcement values (partial updates are supported)

**Returns:**
- err: Error - occured error or null for success
- result: Announcement - updated Announcement object

### <a name="operation6"></a> Cmd: 'delete_announcement'

Deletes system announcement specified by its unique id.

**Arguments:** 
- announcement_id: string - unique announcement id

**Returns:**
- err: Error - occured error or null for success


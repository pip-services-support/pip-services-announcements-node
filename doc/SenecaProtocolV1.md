# Seneca Protocol (version 1) <br/> Announcements Microservice

Announcements microservice implements a Seneca compatible API. 
Seneca port and protocol can be specified in the microservice [configuration](Configuration.md/#api_seneca). 

```javascript
var seneca = require('seneca')();

seneca.client({
    type: 'tcp', // Microservice seneca protocol
    localhost: 'localhost', // Microservice localhost
    port: 8080, // Microservice seneca port
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

* [AttachmentV1 class](#class1)
* [PartyRefereneceV1 class](#class2)
* [LocationV1 class](#class3)
* [AnnouncementV1 class](#class4)
* [cmd: 'get_announcements'](#operation1)
* [cmd: 'get_random_announcement'](#operation2)
* [cmd: 'get_announcement_by_id'](#operation3)
* [cmd: 'create_announcement'](#operation4)
* [cmd: 'update_announcement'](#operation5)
* [cmd: 'delete_announcement_by_id'](#operation6)

## Data types

### <a name="class1"></a> AttachmentV1 class

Contains reference to a document attachment

**Properties:**
- id: string - unique feedback id
- name: string - document (file) name

### <a name="class2"></a> PartyReferenceV1 class

Contains reference to sending or replying party

**Properties:**
- id: string - unique feedback id
- name: string - party name
- email: string - (optional) party email address (optional)

### <a name="class3"></a> LocationV1 class

Contains location on a map

**Properties:**
- name: string - Logical location name or address
- pos: any - Position coordinates in GeoJSON

### <a name="class4"></a> AnnouncementV1 class

Represents a system announcement. 

**Properties:**
- id: string - unique announcement id
- category: string - announcement category, i.e. 'maintenance', 'product update', etc.
- app: string - (optional) application name
- creator: PartyReferenceV1 - party who created the announcement
- create_time: Date - date and time when announcement was created
- title: MultiString - (optional) announcement title in multiple languages
- content: MultiString - announcement textual content in multiple languages
- loc: LocationV1 - (optional) location associated with this announcement
- start_time: Date - (optional) start of a time interval associated with this announcement
- end_time: Date - (optional) end of a time interval associated with this announcement
- pic_ids: [string] - (optional) array of picture block ids in storage attached to this announcement
- docs: [AttachmentV1] - (optional) array of attached documents
- tags: [string] - (optional) explicit tags with annoucement topic for searching
- all_tags: [string] - (readonly) normalized array of explicit and hash tags used by search
- status: string - editing status: 'new', 'writing', 'translating', 'completed' (default: 'new')
- importance: int - (optional) importance: 0 - low, 1000 - high (default: 0)
- custom_hdr: Object - custom data summary that is always returned (in list and details)
- custom_dat: Object - custom data details that is returned only when a single object is returned (details)

## Operations

### <a name="operation1"></a> Cmd: 'get_announcements'

Retrieves a list of announcements by specified criteria

**Arguments:** 
- filter: object - filter parameters
  - category: string - (optional) announcement category
  - app: string - (optional) application name
  - status: string - (optional) editing status
  - from\_create\_time: Date - (optional) start of announcement created interval
  - to\_create\_time: Date - (optional) end of announcement created interval
  - tags: [string] - search tags
  - search: string - string for full text search in title, content and creator name
- paging: object - paging parameters
  - skip: int - (optional) start of page (default: 0). Operation returns paged result
  - take: int - (optional) page length (max: 100). Operation returns paged result

**Returns:**
- err: Error - occured error or null for success
- result: DataPage<AnnouncementV1> - retrieved page with Announcement objects

### <a name="operation2"></a> Cmd: 'get\_random\_announcement'

Retrieves a random announcement from filtered resultset

**Arguments:** 
- filter: object - filter parameters
  - category: string - (optional) announcement category
  - app: string - (optional) application name
  - status: string - (optional) editing status
  - from\_create\_time: Date - (optional) start of announcement created interval
  - to\_create\_time: Date - (optional) end of announcement created interval
  - tags: [string] - search tags
  - search: string - string for full text search in title, content and creator name

**Returns:**
- err: Error - occured error or null for success
- result: AnnouncementV1 - random Announcement or null if nothing was found

### <a name="operation3"></a> Cmd: 'get\_announcement\_by_id'

Retrieves announcement by its unique id. 

**Arguments:** 
- announcement_id: string - unique announcement id

**Returns:**
- err: Error - occured error or null for success
- result: AnnouncementV1 - retrieved Announcement object

### <a name="operation4"></a> Cmd: 'create_announcement'

Creates a new system announcement.

**Arguments:** 
- announcement: AnnouncementV1 - a new annoucement to be created

**Returns:**
- err: Error - occured error or null for success
- result: AnnouncementV1 - created Announcement object

### <a name="operation5"></a> Cmd: 'update_announcement'

Updates announcement.

**Arguments:** 
- announcement: AnnouncementV1 - new announcement values (partial updates are supported)

**Returns:**
- err: Error - occured error or null for success
- result: AnnouncementV1 - updated Announcement object

### <a name="operation6"></a> Cmd: 'delete\_announcement\_by_id'

Deletes system announcement specified by its unique id.

**Arguments:** 
- announcement_id: string - unique announcement id

**Returns:**
- err: Error - occured error or null for success
- result: AnnouncementV1 - deleted Announcement object



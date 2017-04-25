# HTTP REST Protocol (version 1) <br/> Announcements Microservice

Announcements microservice implements a HTTP compatible API, that can be accessed on configured port.
All input and output data is serialized in JSON format. Errors are returned in [standard format]().

* [AttachmentV1 class](#class1)
* [PartyRefereneceV1 class](#class2)
* [LocationV1 class](#class3)
* [AnnouncementV1 class](#class4)
* [POST /announcements/get_announcemets](#operation1)
* [POST /announcements/get_random_announcement](#operation2)
* [POST /announcements/get_announcement_by_id](#operation3)
* [POST /announcements/create_announcement](#operation4)
* [POST /announcements/update_announcements](#operation5)
* [POST /announcements/delete_announcements_by_id](#operation6)

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

### <a name="operation1"></a> Method: 'POST', route '/announcements/get_announcements'

Retrieves a list of announcements by specified criteria

**Request body:** 
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

**Response body:**
DataPage<AnnouncementV1> or error

### <a name="operation2"></a> Method: 'POST', route '/announcements/get\_random\_announcement'

Retrieves a random announcement from filtered resultset

**Request body:** 
- filter: object - filter parameters
  - category: string - (optional) announcement category
  - app: string - (optional) application name
  - status: string - (optional) editing status
  - from\_create\_time: Date - (optional) start of announcement created interval
  - to\_create\_time: Date - (optional) end of announcement created interval
  - tags: [string] - search tags
  - search: string - string for full text search in title, content and creator name

**Response body:**
Random AnnouncementV1 object, null if object wasn't found or error 

### <a name="operation3"></a> Method: 'POST', route '/announcements/get\_announcement\_by\_id'

Retrieves a single announcement specified by its unique id

**Request body:** 
- announcement_id: string - unique announcement id

**Response body:**
AnnouncementV1 object, null if object wasn't found or error 

### <a name="operation4"></a> Method: 'POST', route '/announcements/create_announcement'

Creates a new system announcement

**Request body:**
- announcement: AnnouncementV1 - Announcement to be created. If object id is not defined it is assigned automatically.

**Response body:**
Created AnnouncementV1 object or error

### <a name="operation5"></a> Method: 'POST', route '/announcements/update_announcement'

Updates system announcement

**Request body:**
- announcement: AnnouncementV1 - Announcement to be updated

**Response body:**
Updated AnnouncementV1 object or error 
 
### <a name="operation6"></a> Method: 'POST', route '/announcements/delete\_announcement\_by\_id'

Deletes system announcement specified by its unique id

**Request body:** 
- announcement_id: string - unique announcement id

**Response body:**
Deleted AnnouncementV1 object or error 
 

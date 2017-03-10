# HTTP REST Protocol (version 1) <br/> Announcements Microservice

Announcements microservice implements a REST compatible API, that can be accessed on configured port.
All input and output data is serialized in JSON format. Errors are returned in [standard format]().

* [MultiString class](#class1)
* [Announcement class](#class2)
* [AnnouncementPage class](#class3)
* [GET /announcements](#operation1)
* [GET /announcements/random](#operation2)
* [GET /announcements/:announcement_id](#operation3)
* [POST /announcements](#operation4)
* [PUT /announcements/:announcements_id](#operation5)
* [DELETE /announcements/:announcements_id](#operation6)

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

### <a name="operation1"></a> Method: 'GET', route '/announcements'

Retrieves a list of announcements by specified criteria

**Parameters:** 
- category: string - (optional) announcement category
- app: string - (optional) application name
- status: string - (optional) editing status
- from: Date - (optional) start of announcement created interval
- to: Date - (optional) end of announcement created interval
- tags: string - a comma-separated list with search tags
- search: string - string for full text search in title, content and creator name
- skip: int - (optional) start of page (default: 0). Operation returns paged result
- take: int - (optional) page length (max: 100). Operation returns paged result

**Response body:**
Array of Announcement objects, AnnoucementPage object is paging was requested or error

### <a name="operation2"></a> Method: 'GET', route '/announcements/random'

Retrieves a random announcement from filtered resultset

**Parameters:** 
- category: string - (optional) announcement category
- app: string - (optional) application name
- status: string - (optional) editing status
- from: Date - (optional) start of announcement created interval
- to: Date - (optional) end of announcement created interval
- tags: string - a comma-separated list with search tags
- search: string - string for full text search in title, content and creator name

**Response body:**
Random Announcement object, null if object wasn't found or error 

### <a name="operation3"></a> Method: 'GET', route '/announcements/:announcement_id'

Retrieves a single announcement specified by its unique id

**Parameters:** 
- announcement_id: string - unique announcement id

**Response body:**
Announcement object, null if object wasn't found or error 

### <a name="operation4"></a> Method: 'POST', route '/announcements'

Creates a new system announcement

**Request body:**
Announcement object to be created. If object id is not defined it is assigned automatically.

**Response body:**
Created Announcement object or error

### <a name="operation5"></a> Method: 'PUT', route '/announcements/:announcement_id'

Updates system announcement specified by its unique id

**Parameters:** 
- announcement_id: string - unique Announcement object id

**Request body:**
Announcement object with new values. Partial updates are supported

**Response body:**
Updated Announcement object or error 
 
### <a name="operation6"></a> Method: 'DELETE', route '/announcements/:announcement_id'

Deletes system announcement specified by its unique id

**Parameters:** 
- announcement_id: string - unique announcement id

**Response body:**
Occurred error or null for success 
 

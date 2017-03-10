# Announcements Microservice

This is a system announcements microservice from Pip.Services library. 
It allows system administrators and product owners to communicate to users key system events and product updates.
Each announcement:
- Can be written in multiple languages
- Can include pictures and document attachments
- Supports editing lifecycle via status tracking

The microservice currently supports the following deployment options:
* Deployment platforms: Standalone Process, Seneca
* External APIs: HTTP/REST, Seneca
* Persistence: Flat Files, MongoDB

This microservice has dependencies on the following microservices:
- [pip-services-storage](https://github.com/pip-services/pip-services-storage) - to reference pictures and documents associates with announcements

<a name="links"></a> Quick Links:

* [Download Links](doc/Downloads.md)
* [Development Guide](doc/Development.md)
* [Configuration Guide](doc/Configuration.md)
* [Deployment Guide](doc/Deployment.md)
* Client SDKs
  - [Node.js SDK](https://github.com/pip-services/pip-clients-announces-node)
* Communication Protocols
  - [HTTP/REST Version 1](doc/RestProtocolV1.md)
  - [Seneca Version 1](doc/SenecaProtocolV1.md)

## Download

Right now the only way to get the microservice is to check it out directly from github repository
```bash
git clone git@github.com:pip-services/pip-services-announces.git
```

Pip.Service team is working to implement packaging and make stable releases available for your 
as zip downloadable archieves.

## Run

Add **config.json** file to the root of the microservice folder and set configuration parameters.
As the starting point you can use example configuration from **config.example.json** file. 

Example of microservice configuration
```javascript
{    
    "logs": {
        "descriptor": {
            "type": "console"
        },
        "options": {
            "level": 10
        }
    },
    
    "counters": {
        "descriptor": {
            "type": "log"
        },
        "options": {
            "timeout": 10000
        }
    },
    
    "persistence": {
        "descriptor": {
            "group": "pip-services-announces",            
            "type": "mongodb"
        },
        "connection": {
            "uri": "mongodb://localhost/pipservicestest"
        },
        "options": {
            "server": {
                "poolSize": 4,
                "socketOptions": {
                    "keepAlive": 1,
                    "connectTimeoutMS": 5000
                },
                "auto_reconnect": true
            },
            "debug": false        
        }
    },

    "controllers": {
        "descriptor": {
            "group": "pip-services-announces"            
        },
        "options": {
            "maxTagCount": 1000
        }
    },    
    
    "clients": [
        {
            "descriptor": {
                "group": "pip-services-storage",            
                "type": "rest",
                "version": "1.0"
            },
            "endpoint": {
                "type": "http",
                "host": "localhost",
                "port": 8010
            }
        }
    ],
    
    "services": [
        {
            "descriptor": {
                "group": "pip-services-announces",            
                "type": "seneca",
                "version": "1.0"
            },
            "endpoint": {
                "type": "tcp",
                "host": "localhost",
                "port": 8811
            }
        },
        {
            "descriptor": {
                "group": "pip-services-announces",            
                "type": "rest",
                "version": "1.0"
            },
            "endpoint": {
                "type": "http",
                "host": "localhost",
                "port": 8011
            }
        }
    ]    
}
```
 
For more information on the microservice configuration see [Configuration Guide](Configuration.md).

Start the microservice using the command:
```bash
node run
```

## Use

The easiest way to work with the microservice is to use client SDK. 
The complete list of available client SDKs for different languages is listed in the [Quick Links](#links)

If you use Node.js then you should add dependency to the client SDK into **package.json** file of your project
```javascript
{
    ...
    "dependencies": {
        ....
        "pip-clients-announces-node": "^1.0.*",
        ...
    }
}
```

Inside your code get the reference to the client SDK
```javascript
var sdk = new require('pip-clients-announces-node').Version1;
```

Define client configuration parameters that match configuration of the microservice external API
```javascript
// Client configuration
var config = {
    endpoint: {
        protocol: 'http',
        host: 'localhost', 
        port: 8011
    }
};
```

Instantiate the client and open connection to the microservice
```javascript
// Create the client instance
var client = sdk.AnnouncementsRestClient(config);

// Connect to the microservice
client.open(function(err) {
    if (err) {
        console.error('Connection to the microservice failed');
        console.error(err);
        return;
    }
    
    // Work with the microservice
    ...
});
```

Now the client is ready to perform operations
```javascript
// Create a new announcement
client.createAnnouncement(
    null,
    { 
        category: 'maintenance',
        title: 'Maintenance on Jan 01',
        content: 'Our servers will be shutdown for maintenance on Jan 01'
    },
    function (err, announcement) {
        ...
    }
);
```

```javascript
// Get a random announcement
client.getRandomAnnouncement(
    null,
    {},
    function(err, announcement) {
        ...    
    }
);
```    

## Acknowledgements

This microservice was created and currently maintained by *Sergey Seroukhov*.


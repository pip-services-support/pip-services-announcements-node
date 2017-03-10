let _ = require('lodash');
let assert = require('chai').assert;

import { AnnouncementsSenecaPlugin } from '../../src/run/AnnouncementsSenecaPlugin';

let buildConfig = {
    logs: {
        descriptor: {
            type: 'console'
        }
    },
    persistence: {
        descriptor: {
            type: 'memory'
        }
    },
    clients: {
        descriptor: {
            group: 'pip-services-storage',
            type: 'null',
            version: '1.0'
        }
    },
    controllers: {
        descriptor: {
            type: '*'
        }
    },
    services: {
        descriptor: {
            type: 'seneca'
        }
    }
};

suite('AnnouncementsSenecaPlugin', ()=> {    
    let seneca;
    let plugin = new AnnouncementsSenecaPlugin();

    suiteSetup((done) => {
        seneca = require('seneca')();
        seneca.use(plugin.entry(buildConfig));
        done();
    });
    
    suiteTeardown((done) => {
        seneca.close(done);
    });
                
    test('Ping', (done) => {
        seneca.act(
            {
                role: 'announcements',
                cmd: 'get_announcements' 
            },
            (err, announcements) => {
                assert.isNull(err);
                
                assert.isObject(announcements);

                done();
            }
        );
    });
});
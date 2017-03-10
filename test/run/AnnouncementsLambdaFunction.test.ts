let _ = require('lodash');
let assert = require('chai').assert;

import { MicroserviceConfig } from 'pip-services-runtime-node';
import { AnnouncementsLambdaFunction } from '../../src/run/AnnouncementsLambdaFunction';

let buildConfig = MicroserviceConfig.fromValue({
    logs: {
        descriptor: {
            type: 'console'
        }
    },
    clients: {
        descriptor: {
            group: 'pip-services-storage',
            type: 'null',
            version: '1.0'
        }
    },
    persistence: {
        descriptor: {
            type: 'memory'
        }
    },
    controllers: {
        descriptor: {
            type: '*'
        }
    }
});

suite('AnnouncementsLambdaFunction', ()=> {    
    let lambda = new AnnouncementsLambdaFunction();

    suiteSetup((done) => {
        lambda.setConfig(buildConfig);
        lambda.start(done);
        //done();
    });
    
    suiteTeardown((done) => {
        lambda.stop(done);
    });
                
    test('Ping', (done) => {
        lambda.getHandler()(
            {
                cmd: 'get_announcements' 
            },
            {
                done: (err, announcements) => {
                    assert.isNull(err);
                    
                    assert.isObject(announcements);
                                    
                    done();
                }
            }
        );
    });
});
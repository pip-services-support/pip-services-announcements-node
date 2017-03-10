"use strict";
var _ = require('lodash');
var assert = require('chai').assert;
var AnnouncementsSenecaPlugin_1 = require('../../src/run/AnnouncementsSenecaPlugin');
var buildConfig = {
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
suite('AnnouncementsSenecaPlugin', function () {
    var seneca;
    var plugin = new AnnouncementsSenecaPlugin_1.AnnouncementsSenecaPlugin();
    suiteSetup(function (done) {
        seneca = require('seneca')();
        seneca.use(plugin.entry(buildConfig));
        done();
    });
    suiteTeardown(function (done) {
        seneca.close(done);
    });
    test('Ping', function (done) {
        seneca.act({
            role: 'announcements',
            cmd: 'get_announcements'
        }, function (err, announcements) {
            assert.isNull(err);
            assert.isObject(announcements);
            done();
        });
    });
});

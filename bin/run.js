/**
 * @file Announcements process launcher
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global */

'use strict';

var AnnouncementsProcessRunner = require('../lib/src/run/AnnouncementsProcessRunner').AnnouncementsProcessRunner;

var runner = new AnnouncementsProcessRunner();
runner.startWithDefaultConfig('../config/config.json');
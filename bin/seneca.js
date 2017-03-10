/**
 * @file Announcements seneca plugin
 * @copyright Digital Living Software Corp. 2014-2016
 */

var AnnouncementsSenecaPlugin = require('../lib/src/run/AnnouncementsSenecaPlugin').AnnouncementsSenecaPlugin;
var plugin = new AnnouncementsSenecaPlugin();

module.exports = plugin.entry();
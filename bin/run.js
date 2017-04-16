let AnnouncementsProcess = require('../obj/src/container/AnnouncementsProcess').AnnouncementsProcess;

try {
    new AnnouncementsProcess().run(process.argv);
} catch (ex) {
    console.error(ex);
}

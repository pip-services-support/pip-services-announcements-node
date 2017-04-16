let AnnouncementsLambdaFunction = require('../obj/src/container/AnnouncementsLambdaFunction').AnnouncementsLambdaFunction;

module.exports = new AnnouncementsLambdaFunction().getHandler();
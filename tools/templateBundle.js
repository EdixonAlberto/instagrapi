const { loadConfig } = require('../dist/utils/loadConfig');
const { InstagramApi } = require('../dist/InstagramApi');

loadConfig();

global.instagrapi = InstagramApi;

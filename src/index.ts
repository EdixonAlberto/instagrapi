import { loadConfig } from './utils/loadConfig';
import { InstagramApi } from './InstagramApi';
import { TProfile } from './types';

loadConfig();

const instagrapi = InstagramApi;

export { instagrapi, TProfile };

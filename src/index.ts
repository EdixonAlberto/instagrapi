import { loadConfig } from './utils/loadConfig';
import { TProfile, TPublications, TPost, TMedia } from './types';

loadConfig();

export { TProfile, TPublications, TPost, TMedia };
export { InstagramApi as instagrapi } from './InstagramApi';

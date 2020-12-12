import { loadConfig } from './utils/loadConfig';
import { TProfile, TLastPosts, TMedia } from './types';

loadConfig();

export { TProfile, TLastPosts, TMedia };
export { InstagramApi as instagrapi } from './InstagramApi';

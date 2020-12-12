import { loadConfig } from './utils/loadConfig';
import type { TProfile, TLastPosts, TMedia, TPost } from './types';

loadConfig();

export { TProfile, TLastPosts, TMedia, TPost };
export { InstagramApi as instagrapi } from './InstagramApi';

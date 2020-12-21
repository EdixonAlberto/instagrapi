import { loadConfig } from './utils/loadConfig';
import type { TProfile, TLastPosts, TMedia, TPost, TTagged, TComment } from './types';

loadConfig();

export { TProfile, TLastPosts, TMedia, TPost, TTagged, TComment };
export { InstagramApi as instagrapi } from './InstagramApi';

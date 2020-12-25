import { loadConfig } from './utils/loadConfig';
import type { TProfile, TLastPosts, TPost, TMedia, TTagged, TComment } from './types';

loadConfig();

export { TProfile, TLastPosts, TPost,TMedia, TTagged, TComment };
export { InstagramApi as instagrapi } from './InstagramApi';

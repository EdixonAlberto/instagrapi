import { loadConfig } from './utils/loadConfig';
loadConfig();

export { TProfile, TLastPosts, TPost, TMedia, TVideo, TTagged, TComment } from './types';
export { InstagramApi as instagrapi } from './InstagramApi';

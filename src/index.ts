import { loadConfig } from './utils/loadConfig'
loadConfig()

export { TProfile, TLastPosts, TPost, TMedia, TVideo, TTagged, TComment } from './types'
export { InstagramApiService as Instagrapi } from './services/InstagramApi.service'

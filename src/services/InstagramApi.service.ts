import { RequestService } from './Request.service'
import { Utils } from '../utils'
import { TConfig, TProfile, TLastPosts, TPost, TMedia, TTagged } from '../types'

class InstagramApiService {
  private request: RequestService

  constructor(config: TConfig) {
    this.request = new RequestService(config.sessionId)
  }

  public async getProfile(username: string): Promise<TProfile> {
    try {
      const data = <TInstagramApi>await this.request.api(username)

      const user = data.graphql.user

      const profile: TProfile = {
        username: user.username,
        image: {
          standard: user.profile_pic_url,
          hd: user.profile_pic_url_hd
        },
        qtyPosts: user.edge_owner_to_timeline_media.count,
        followers: user.edge_followed_by.count,
        following: user.edge_follow.count,
        name: user.full_name,
        biography: user.biography,
        externalUrl: user.external_url,
        isBusiness: user.is_business_account,
        isVerified: user.is_verified,
        isPrivate: user.is_private
      }

      return profile
    } catch (error) {
      console.error('ERROR-GET-PROFILE ->', (error as Error).message)
      throw error
    }
  }

  public async getLastPosts(username: string): Promise<TLastPosts> {
    try {
      const data = <TInstagramApi>await this.request.api(username)

      const { edges } = data.graphql.user.edge_owner_to_timeline_media

      const lastPosts: TLastPosts = edges.map(({ node: media }: TEdgeMedia) => ({
        postUrl: Utils.getPostUrl(media.shortcode),
        image: media.display_url,
        video: media.is_video
          ? {
              url: media.video_url,
              views: media?.video_view_count
            }
          : null,
        content: Utils.getCaption(media),
        likes: media.edge_liked_by.count,
        qtyComments: media.edge_media_to_comment.count
      }))

      return lastPosts
    } catch (error) {
      console.error('ERROR-GET-LAST-POSTS ->', (error as Error).message)
      throw error
    }
  }

  public async getPost(postUrl: string): Promise<TPost> {
    try {
      const data = <TPostApi>await this.request.api(postUrl)

      const media = data.graphql.shortcode_media

      // Note: if there are children, they will always be older than one
      const children = media.edge_sidecar_to_children?.edges || []
      // The first medium is deleted, because it is the same as the cover
      if (children.length) children.shift()

      const images = media.display_resources
      const user = media.owner
      const commentList = media.edge_media_to_parent_comment.edges

      const post: TPost = {
        postUrl: Utils.getPostUrl(media.shortcode),
        image: {
          standard: images.shift()!.src,
          hd: images.pop()!.src
        },
        video: media.is_video
          ? {
              url: media.video_url,
              type: media.product_type,
              views: media.video_view_count,
              duration: media.video_duration,
              hasAudio: media.clips_music_attribution_info
                ? {
                    artist: media.clips_music_attribution_info.artist_name,
                    song: media.clips_music_attribution_info.song_name
                  }
                : media.has_audio
            }
          : null,
        content: Utils.getCaption(media),
        likes: media.edge_media_preview_like.count,
        qtyComments: media.edge_media_to_parent_comment.count,
        media: children.map(
          ({ node: sidecar }: TEdgeSidecar): TMedia => {
            const images = sidecar.display_resources
            const taggeds = sidecar.edge_media_to_tagged_user.edges

            return {
              image: {
                standard: images.shift()!.src,
                hd: images.pop()!.src
              },
              video: sidecar.is_video
                ? {
                    url: sidecar.video_url,
                    type: media.product_type,
                    views: sidecar.video_view_count,
                    duration: media.video_duration,
                    hasAudio: sidecar.has_audio
                  }
                : null,
              taggedUsers: taggeds.map(
                ({ node: tagged }: TEdgeTagged): TTagged => ({
                  image: tagged.user.profile_pic_url,
                  name: tagged.user.full_name,
                  isVerified: tagged.user.is_verified,
                  coordinates: {
                    x: tagged.x,
                    y: tagged.y
                  }
                })
              )
            }
          }
        ),
        author: {
          username: user.username,
          image: user.profile_pic_url,
          qtyPosts: user.edge_owner_to_timeline_media.count,
          followers: user.edge_followed_by.count,
          name: user.full_name,
          isVerified: user.is_verified,
          isPrivate: user.is_private
        },
        lastComments: Utils.getComments(commentList),
        location: media.location ? Utils.getLocation(media.location.address_json) : null,
        date: Utils.msToDate(media.taken_at_timestamp)
      }

      return post
    } catch (error) {
      console.error('ERROR-GET-POST ->', (error as Error).message)
      throw error
    }
  }
}

export { InstagramApiService }

import { RequestService } from '~SERVICES/Request.service'
import { GeneralUtil, InstragramUtil } from '~UTILS'
import { TConfig, TProfile, TLastPosts, TPost, TMedia, TTagged } from '~TYPES'

export class InstagramApiService {
  private request: RequestService
  private proxy: string

  constructor(config: TConfig) {
    try {
      this.proxy = config.proxy ? new URL('/', config.proxy).href : ''
    } catch (error) {
      this.proxy = ''
    }

    this.request = new RequestService(config.sessionId)
  }

  public async getProfile(username: string): Promise<TProfile> {
    try {
      const { user } = <TInstagramApi['graphql']>await this.request.api(username)

      const profile: TProfile = {
        username: user.username,
        image: {
          standard: this.proxy + user.profile_pic_url,
          hd: this.proxy + user.profile_pic_url_hd
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
      GeneralUtil.logger('GET-PROFILE', error)
      throw new Error('Username not found')
    }
  }

  public async getLastPosts(username: string): Promise<TLastPosts> {
    try {
      const { user } = <TInstagramApi['graphql']>await this.request.api(username)
      const edges = user.edge_owner_to_timeline_media.edges

      const lastPosts: TLastPosts = edges.map(({ node: media }: TEdgeMedia) => ({
        postUrl: GeneralUtil.getPostUrl(media.shortcode),
        image: this.proxy + media.display_url,
        video: media.is_video
          ? {
              url: this.proxy + media.video_url,
              views: media?.video_view_count
            }
          : null,
        content: InstragramUtil.getCaption(media),
        likes: media.edge_liked_by.count,
        qtyComments: media.edge_media_to_comment.count
      }))

      return lastPosts
    } catch (error) {
      GeneralUtil.logger('GET-LAST-POSTS', error)
      throw new Error('Username not found')
    }
  }

  public async getPost(postUrl: string): Promise<TPost> {
    try {
      const { shortcode_media: media } = <TPostApi['graphql']>await this.request.api(postUrl)

      // Note: if there are children, they will always be older than one
      const children = media.edge_sidecar_to_children?.edges || []
      // The first medium is deleted, because it is the same as the cover
      if (children.length) children.shift()

      const images = media.display_resources
      const user = media.owner
      const commentList = media.edge_media_to_parent_comment.edges

      const post: TPost = {
        postUrl: GeneralUtil.getPostUrl(media.shortcode),
        image: {
          standard: this.proxy + images.shift()!.src,
          hd: this.proxy + images.pop()!.src
        },
        video: media.is_video
          ? {
              url: this.proxy + media.video_url,
              type: media.product_type,
              views: media.video_view_count,
              duration: media.video_duration,
              audio: media.clips_music_attribution_info
                ? {
                    artist: media.clips_music_attribution_info.artist_name,
                    song: media.clips_music_attribution_info.song_name
                  }
                : media.has_audio
            }
          : null,
        content: InstragramUtil.getCaption(media),
        likes: media.edge_media_preview_like.count,
        qtyComments: media.edge_media_to_parent_comment.count,
        media: children.map(
          ({ node: sidecar }: TEdgeSidecar): TMedia => {
            const images = sidecar.display_resources
            const taggeds = sidecar.edge_media_to_tagged_user.edges

            return {
              image: {
                standard: this.proxy + images.shift()!.src,
                hd: this.proxy + images.pop()!.src
              },
              video: sidecar.is_video
                ? {
                    url: this.proxy + sidecar.video_url,
                    type: media.product_type,
                    views: sidecar.video_view_count,
                    duration: media.video_duration,
                    audio: sidecar.has_audio
                  }
                : null,
              taggedUsers: taggeds.map(
                ({ node: tagged }: TEdgeTagged): TTagged => ({
                  image: this.proxy + tagged.user.profile_pic_url,
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
          image: this.proxy + user.profile_pic_url,
          qtyPosts: user.edge_owner_to_timeline_media.count,
          followers: user.edge_followed_by.count,
          name: user.full_name,
          isVerified: user.is_verified,
          isPrivate: user.is_private
        },
        lastComments: InstragramUtil.getComments(commentList, this.proxy),
        location: media.location ? InstragramUtil.getLocation(media.location.address_json) : null,
        date: GeneralUtil.msToDate(media.taken_at_timestamp)
      }

      return post
    } catch (error) {
      GeneralUtil.logger('GET-POST', error)
      throw new Error('Post url not found')
    }
  }
}

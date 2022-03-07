import { RequestService } from '~SERVICES/Request.service'
import { GeneralUtil, InstragramUtil } from '~UTILS'
import { TConfig, TProfile, TLastPosts, TPost, TMedia } from '~TYPES'

class InstagramApiService {
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
      const {
        graphql: { user }
      } = <TProfileApi>await this.request.api(username)

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
      const {
        graphql: { user }
      } = <TProfileApi>await this.request.api(username)
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
      const {
        items: [item]
      } = <TPostApi>await this.request.api(postUrl)

      const carouselMedia = item.carousel_media
      const candidates = carouselMedia ? carouselMedia[0].image_versions2.candidates : item.image_versions2!.candidates
      const user = item.user
      const coauthors = item.coauthor_producers
      const commentList = item.comments

      const post: TPost = {
        postUrl: GeneralUtil.getPostUrl(item.code),
        image: InstragramUtil.getMediaQualities(candidates, this.proxy),
        video: item.video_versions
          ? {
              url: InstragramUtil.getMediaQualities(item.video_versions, this.proxy),
              type: item.product_type,
              views: item.view_count!,
              duration: item.video_duration!,
              audio: InstragramUtil.getAudioData(item)
            }
          : null,
        content: item.caption.text,
        likes: item.like_count,
        qtyComments: item.comment_count,
        gallery: carouselMedia
          ? carouselMedia.map(media => {
              const { standard, hd } = InstragramUtil.getMediaQualities(media.image_versions2.candidates, this.proxy)
              const taggeds = media.usertags?.in

              return <TMedia>{
                image: { standard, hd },
                video: media.video_versions
                  ? {
                      url: InstragramUtil.getMediaQualities(media.video_versions, this.proxy),
                      type: item.product_type,
                      duration: media.video_duration!
                    }
                  : null,
                taggedUsers: taggeds
                  ? taggeds.map(tag => ({
                      image: this.proxy + tag.user.profile_pic_url,
                      name: tag.user.full_name,
                      isVerified: tag.user.is_verified,
                      position: tag.position
                    }))
                  : []
              }
            })
          : [],
        author: {
          username: user.username,
          name: user.full_name,
          image: this.proxy + user.profile_pic_url,
          isVerified: user.is_verified,
          isPrivate: user.is_private
        },
        coauthors: coauthors
          ? coauthors.map(author => ({
              username: author.username,
              name: author.full_name,
              image: this.proxy + author.profile_pic_url,
              isPrivate: author.is_private,
              isVerified: author.is_verified
            }))
          : [],
        previewComments: InstragramUtil.getComments(commentList, this.proxy),
        location: InstragramUtil.getLocation(item.location),
        date: GeneralUtil.msToDate(item.taken_at)
      }

      return post
    } catch (error) {
      GeneralUtil.logger('GET-POST', error)
      throw new Error('Post url not found')
    }
  }
}

export { InstagramApiService as Instagrapi }

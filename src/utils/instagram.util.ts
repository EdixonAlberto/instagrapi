import { GeneralUtil } from './general.util'
import { TComment, TPost, TQualities, TVideo } from '~TYPES'

export class InstragramUtil {
  public static getCaption(media: TEdgeMedia['node']): string | null {
    const caption = media.edge_media_to_caption.edges.length
      ? media.edge_media_to_caption.edges[0].node.text
      : media.accessibility_caption || ''

    return caption ? caption : media.is_video ? media.title : null
  }

  public static getComments(commentList: TCommentsApi, proxy: string): TComment[] {
    if (commentList?.length) {
      return commentList.map(comment => {
        const user = comment.user

        return {
          content: comment.text,
          author: {
            username: user.username,
            name: user.full_name,
            image: proxy + user.profile_pic_url,
            isVerified: user.is_verified,
            isPrivate: user.is_private
          },
          likes: comment.comment_like_count,
          isSpam: comment.did_report_as_spam,
          date: GeneralUtil.msToDate(comment.created_at)
        }
      })
    } else return []
  }

  public static getLocation(location?: TLocationApi): TPost['location'] | null {
    if (location) {
      const [region, country] = location.name.split(',')

      const locationWrapper: TPost['location'] = {
        country: country?.trim() || null,
        region: region || null,
        city: location.city || null,
        street: location.address || null,
        coordinates: {
          lat: location.lat,
          lng: location.lng
        }
      }

      return locationWrapper
    } else return null
  }

  public static getMediaQualities(media: Array<TMediaApi>, proxy: string): TQualities {
    const imageWidth480 = media.find(img => img.width === 480)?.url

    return {
      standard: proxy + (imageWidth480 || media.pop()!.url),
      hd: proxy + media.shift()!.url
    }
  }

  public static getAudioData(item: TPostApi['items'][0]): TVideo['audio'] | null {
    if (item?.has_audio) {
      const audioUser = item.clips_metadata?.original_sound_info
      const audioArtist = item.clips_metadata?.music_info

      if (audioUser) {
        return {
          artist: audioUser.ig_artist.full_name,
          song: null
        }
      } else if (audioArtist) {
        return {
          artist: audioArtist.music_consumption_info.ig_artist.full_name,
          song: audioArtist.music_asset_info.title
        }
      }
    }

    return null
  }
}

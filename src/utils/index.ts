import { TComment, TPost } from '~TYPES'

class Utils {
  public static msToDate(ms: number): string {
    const _ms = ms / 1e10 < 1 ? ms * 1000 : ms
    const date = new Date(_ms).toISOString() // Generating univesal ISO format
    return date
  }

  public static getPostUrl(code: string): string {
    return `${global.config.urlBase}/p/${code}`
  }

  public static getCaption(media: TEdgeMedia['node'] | TPostApi['graphql']['shortcode_media']): string | null {
    const caption = media.edge_media_to_caption.edges.length
      ? media.edge_media_to_caption.edges[0].node.text
      : media.accessibility_caption || ''

    return caption ? caption : media.is_video ? media.title : null
  }

  public static getComments(commentList: Array<TEdgeComment> | undefined): TComment[] {
    if (commentList?.length) {
      return commentList.map(({ node: comment }: TEdgeComment) => {
        const user = comment.owner
        const commentList = comment.edge_threaded_comments?.edges

        return {
          content: comment.text,
          author: {
            username: user.username,
            image: user.profile_pic_url,
            isVerified: user.is_verified
          },
          likes: comment.edge_liked_by.count,
          responses: Utils.getComments(commentList),
          isSpam: comment.did_report_as_spam,
          date: Utils.msToDate(comment.created_at)
        }
      })
    } else return []
  }

  public static getLocation(addressJson: string): TPost['location'] {
    const address: TLocation = JSON.parse(addressJson)

    const location: TPost['location'] = {
      country: address.country_code || null,
      region: address.region_name || null,
      city: address.city_name || null,
      street: address.street_address || null,
      zipCode: address.zip_code || null
    }

    return location
  }
}

export { Utils }

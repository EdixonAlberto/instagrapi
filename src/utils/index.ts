import { TComment, TPost } from '../types';

class Utils {
  public static msToDate(ms: number): string {
    const _ms = ms / 10000000000 < 1 ? ms * 1000 : ms;
    const date = new Date(_ms).toISOString();
    return date;
  }

  public static getPostUrl(code: string): string {
    return `${global.config.urlBase}/p/${code}`;
  }

  public static getCaption(
    media: TEdgeMedia['node'] | TPostApi['graphql']['shortcode_media']
  ): string {
    return media.edge_media_to_caption.edges.length
      ? media.edge_media_to_caption.edges[0].node.text
      : media.accessibility_caption || '';
  }

  public static getComment(commentList: Array<TEdgeComment>): TComment[] {
    return commentList.map(({ node: comment }: TEdgeComment) => {
      const commentList = comment.edge_threaded_comments?.edges;
      const user = comment.owner;

      return {
        content: comment.text,
        author: {
          username: user.username,
          image: user.profile_pic_url,
          isVerified: user.is_verified,
          isPrivate: user.is_private
        },
        likes: comment.edge_liked_by.count,
        responses: commentList?.length ? Utils.getComment(commentList) : null,
        isSpam: comment.did_report_as_spam,
        date: Utils.msToDate(comment.created_at)
      };
    });
  }

  public static getLocation(addressJson: string): TPost['location'] {
    const address: TLocation = JSON.parse(addressJson);

    const location: TPost['location'] = {
      country: address.country_code,
      region: address.region_name,
      city: address.city_name,
      street: address.street_address,
      zipCode: address.zip_code
    };

    return location;
  }
}

export { Utils };

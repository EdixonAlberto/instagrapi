import { Request } from './Request';
import { Time } from './utils/Time';
import { TProfile, TLastPosts, TMedia } from './types';

class InstagramApi {
  public static async getProfile(username: string): Promise<TProfile> {
    try {
      const data = <TInstagramApi>await Request.api('instagram', username);

      const user = data.graphql.user;

      const profile: TProfile = {
        image: {
          standard: user.profile_pic_url,
          hd: user.profile_pic_url_hd
        },
        publications: user.edge_owner_to_timeline_media.count,
        followers: user.edge_followed_by.count,
        followed: user.edge_follow.count,
        posts: user.edge_owner_to_timeline_media.count,
        name: user.full_name,
        biography: user.biography,
        externalUrl: user.external_url,
        isBusiness: user.is_business_account,
        isVerified: user.is_verified,
        isPrivate: user.is_private
      };

      return profile;
    } catch (error) {
      console.error('ERROR-GET-PROFILE ->', error.message);
      throw error;
    }
  }

  public static async getLastPosts(username: string): Promise<TLastPosts> {
    try {
      const data = <TInstagramApi>await Request.api('instagram', username);

      const { edges } = data.graphql.user.edge_owner_to_timeline_media;

      const lastPosts: TLastPosts = edges.map(edge => {
        const node: TNode = edge.node;

        // Note: if there are children, they will always be older than one
        const children = node.edge_sidecar_to_children
          ? node.edge_sidecar_to_children.edges
          : undefined;

        // The first medium is deleted, because it is the same as the cover
        if (children) children.shift();

        const caption = node.edge_media_to_caption.edges;

        return {
          code: node.shortcode,
          cover: {
            image: node.display_url,
            video: node.is_video ? node.video_url : undefined
          },
          media: children
            ? children.map(edgeChildren => {
                const nodeChildren: TNodeBase = edgeChildren.node;
                const isVideo: boolean = nodeChildren.is_video;

                return <TMedia>{
                  type: isVideo ? 'video' : 'image',
                  url: isVideo ? nodeChildren.video_url : nodeChildren.display_url,
                  views: isVideo ? nodeChildren.video_view_count : undefined
                };
              })
            : undefined,
          content: caption.length ? caption[0].node.text : undefined,
          likes: node.edge_liked_by.count,
          comments: node.edge_media_to_comment.count,
          location: node.location?.name,
          date: Time.msToDate(node.taken_at_timestamp)
        };
      });

      return lastPosts;
    } catch (error) {
      console.error('ERROR-GET-PUBLICATIONS ->', error.message);
      throw error;
    }
  }
}

export { InstagramApi };

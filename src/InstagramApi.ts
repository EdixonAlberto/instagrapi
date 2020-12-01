import axios from 'axios';
import { TProfile, TPublications, TMedia } from './types';

class InstagramApi {
  private static async request(username: string): Promise<TInstagramApi | false> {
    const { status, data } = await axios.get(
      `${global.config.urlBase}/${username}/?__a=1`
    );

    if (status === 200) return data as TInstagramApi;
    else {
      console.warn('! WARN-REQUEST ->', status, data);
      return false;
    }
  }

  public static async getProfile(username: string): Promise<TProfile | boolean> {
    try {
      const data = await InstagramApi.request(username);

      if (data) {
        const user = data.graphql.user;

        const profile: TProfile = {
          image: {
            standard: user.profile_pic_url,
            hd: user.profile_pic_url_hd
          },
          publications: user.edge_owner_to_timeline_media.count,
          followers: user.edge_followed_by.count,
          followed: user.edge_follow.count,
          name: user.full_name,
          biography: user.biography,
          externalUrl: user.external_url,
          isBusiness: user.is_business_account,
          isVerified: user.is_verified,
          isPrivate: user.is_private
        };

        return profile;
      } else return false;
    } catch (error) {
      console.error('X ERROR-GET-PROFILE ->', error.message);
      return false;
    }
  }

  public static async getPublications(username: string): Promise<TPublications | false> {
    try {
      const data = await InstagramApi.request(username);

      if (data) {
        const timeline = data.graphql.user.edge_owner_to_timeline_media;
        const edges = timeline.edges;

        const publications: TPublications = {
          total: timeline.count,
          latestPosts: edges.map(edge => {
            const node: TNode = edge.node;
            const images = node.thumbnail_resources;

            // Note: if there are children, they will always be older than one
            const children = node.edge_sidecar_to_children
              ? node.edge_sidecar_to_children.edges
              : undefined;

            // The first medium is deleted, because it is the same as the cover
            if (children) children.shift();

            const caption = node.edge_media_to_caption.edges;

            return {
              cover: {
                image: {
                  standard: images.pop()!.src,
                  small: images.shift()!.src
                },
                video: node.is_video ? node.video_url : undefined
              },
              media: children
                ? children.map((edgeChildren, i: number) => {
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
              date: new Date(node.taken_at_timestamp).toISOString()
            };
          })
        };

        return publications;
      } else return false;
    } catch (error) {
      console.error('X ERROR-GET-PUBLICATIONS ->', error.message);
      return false;
    }
  }
}

export { InstagramApi };

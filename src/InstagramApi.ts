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
          profileImage: {
            standard: user.profile_pic_url,
            hd: user.profile_pic_url_hd
          },
          publications: user.edge_owner_to_timeline_media.count,
          followers: user.edge_followed_by.count,
          followed: user.edge_follow.count,
          name: user.full_name,
          biography: user.biography
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
          publications: edges.map(edge => {
            const node: TNode = edge.node;
            const images = node.thumbnail_resources;
            const children = node.edge_sidecar_to_children;
            const caption = node.edge_media_to_caption.edges;

            return {
              coverImage: {
                standard: images.pop()!.src,
                small: images.shift()!.src
              },
              // coverVideo:
              media: children
                ? children.edges.map(edgeChildren => {
                    const nodeChildren: TNodeBase = edgeChildren.node;

                    return <TMedia>{
                      image: nodeChildren.display_url,
                      video: nodeChildren.is_video
                        ? {
                            url: nodeChildren.video_url,
                            views: nodeChildren.video_view_count
                          }
                        : undefined
                    };
                  })
                : undefined,
              content: caption.length ? caption[0].node.text : undefined,
              likes: node.edge_liked_by.count,
              comments: node.edge_media_to_comment.count,
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

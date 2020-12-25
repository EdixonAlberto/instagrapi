import { Request } from './Request';
import { Utils } from './utils';
import { TProfile, TLastPosts, TPost, TMedia, TTagged } from './types';

class InstagramApi {
  public static async getProfile(username: string): Promise<TProfile> {
    try {
      const data = <TInstagramApi>await Request.api(username);

      const user = data.graphql.user;

      const profile: TProfile = {
        username: user.username,
        image: {
          standard: user.profile_pic_url,
          hd: user.profile_pic_url_hd
        },
        followers: user.edge_followed_by.count,
        followed: user.edge_follow.count,
        qtyPosts: user.edge_owner_to_timeline_media.count,
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
      const data = <TInstagramApi>await Request.api(username);

      const { edges } = data.graphql.user.edge_owner_to_timeline_media;

      const lastPosts: TLastPosts = edges.map(({ node: media }: TEdgeMedia) => ({
        postUrl: Utils.getPostUrl(media.shortcode),
        image: media.display_url,
        video: media?.video_url || null,
        content: Utils.getCaption(media),
        likes: media.edge_liked_by.count,
        qtyComments: media.edge_media_to_comment.count
      }));

      return lastPosts;
    } catch (error) {
      console.error('ERROR-GET-LAST-POSTS ->', error.message);
      throw error;
    }
  }

  public static async getPost(postUrl: string): Promise<TPost> {
    try {
      const data = <TPostApi>await Request.api(postUrl);

      const media = data.graphql.shortcode_media;

      // Note: if there are children, they will always be older than one
      const children = media.edge_sidecar_to_children.edges;
      const user = media.owner;
      const commentList = media.edge_media_to_parent_comment.edges;

      const post: TPost = {
        postUrl: Utils.getPostUrl(media.shortcode),
        content: Utils.getCaption(media),
        likes: media.edge_media_preview_like.count,
        qtyComments: media.edge_media_to_parent_comment.count,
        media: children.length
          ? children.map(
              ({ node: sidecar }: TEdgeSidecar): TMedia => {
                const images = sidecar.display_resources;
                const taggeds = sidecar.edge_media_to_tagged_user.edges;

                return {
                  image: {
                    standard: images.shift()!.src,
                    hd: images.pop()!.src
                  },
                  video: sidecar.is_video
                    ? {
                        isAudio: sidecar.has_audio,
                        url: sidecar.video_url,
                        views: sidecar.video_view_count
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
                };
              }
            )
          : null,
        author: {
          username: user.username,
          image: user.profile_pic_url,
          followed: user.edge_followed_by.count,
          qtyPosts: user.edge_owner_to_timeline_media.count,
          name: user.full_name,
          isVerified: user.is_verified,
          isPrivate: user.is_private
        },
        lastComments: commentList.length ? Utils.getComment(commentList) : null,
        location: Utils.getLocation(media.location.address_json)
      };

      return post;
    } catch (error) {
      console.error('ERROR-GET-POST ->', error.message);
      throw error;
    }
  }
}

export { InstagramApi };

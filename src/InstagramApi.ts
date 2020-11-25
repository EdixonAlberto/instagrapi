import axios from 'axios';
import { TProfile } from '@types';

class InstagramApi {
  public static async getProfile(username: string): Promise<TProfile | boolean> {
    try {
      const { status, data } = await axios.get(
        `${global.config.urlBase}/${username}/?__a=1`
      );

      if (status === 200) {
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
      console.error('!! ERROR-GET-PROFILE ->', error.message);
      return false;
    }
  }
}

export { InstagramApi };

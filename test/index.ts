import { instagrapi, TProfile } from '../src';

instagrapi.getProfile('instagram').then((profile: TProfile) => {
  console.log(profile);
});

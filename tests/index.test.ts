import { Time } from '../src/utils/Time';
import { instagrapi, TProfile, TLastPosts } from '../src/index';

describe('Utils', () => {
  test('Convert ms to date', () => {
    const ms = 1607365446;
    const date = Time.msToDate(ms);

    expect(date).toBe('2020-12-07T18:24:06.000Z');
  });
});

describe('Instagrapi', () => {
  test('Get Profile', async () => {
    const profile: TProfile = await instagrapi.getProfile('instagram');
    expect(profile).toMatchObject(<TProfile>{ name: 'Instagram' });
  });

  test('Get Last Posts', async () => {
    const lastPosts: TLastPosts = await instagrapi.getLastPosts('instagram');
    expect(lastPosts).toBeTruthy();
  });
});

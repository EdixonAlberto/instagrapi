import { config } from 'dotenv'
import { Utils } from '../src/utils'
import { Instagrapi, TProfile, TLastPosts, TPost, TComment } from '../src'

describe('Utils', () => {
  test('Convert ms to date', () => {
    const nowDate = new Date()
    const ms = nowDate.getTime()
    const date = Utils.msToDate(ms)

    expect(date).toBe(nowDate.toISOString())
  })
})

describe('Instagrapi', () => {
  config()

  const instagrapi = new Instagrapi({
    sessionId: process.env.SESSION_ID
  })

  test('Get Profile', async () => {
    const profile: TProfile = await instagrapi.getProfile('instagram')
    expect(profile).toMatchObject(<TProfile>{ name: 'Instagram' })
  })

  test('Get Last Posts', async () => {
    const lastPosts: TLastPosts = await instagrapi.getLastPosts('instagram')
    expect(lastPosts).toBeTruthy()
  })

  test('Get post', async () => {
    const post: TPost = await instagrapi.getPost('https://www.instagram.com/p/CI8nNX0DC4U')

    const responses = post.lastComments.filter((comment: TComment) => comment.responses.length > 0)

    expect(post.video!.duration).toBe(150.153)
    expect(post.author.name).toBe('Instagram')
    expect(responses).toBeTruthy()
  })
})

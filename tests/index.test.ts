import { config } from 'dotenv'
import { GeneralUtil } from '../src/utils'
import { Instagrapi, TProfile, TLastPosts, TPost, TComment } from '../src'

describe('Utils', () => {
  test('Convert ms to date', () => {
    const nowDate = new Date()
    const ms = nowDate.getTime()
    const date = GeneralUtil.msToDate(ms)

    expect(date).toBe(nowDate.toISOString())
  })
})

describe('Instagrapi', () => {
  config()

  const instagrapi = new Instagrapi({
    sessionId: process.env.SESSION_ID as string
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
    const comment: TComment = post.lastComments[0]

    expect(comment.author).toBeDefined()
  })
})

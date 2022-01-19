# Instagrapi

[![](https://img.shields.io/badge/author-Edixon_Piña-yellow?style=for-the-badge)](https://github.com/EdixonAlberto/)
[![](https://img.shields.io/github/license/edixonalberto/instagrapi?style=for-the-badge)](LICENSE)
[![](https://img.shields.io/npm/v/instagrapi?color=CB0000&style=for-the-badge)](https://npmjs.com/package/instagrapi)
[![](https://img.shields.io/npm/dt/instagrapi?color=CB0000&style=for-the-badge)](https://npmjs.com/package/instagrapi)

[![](https://img.shields.io/badge/types-TypeScript-blue?style=for-the-badge)](https://github.com/microsoft/TypeScript)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=for-the-badge)](https://github.com/prettier/prettier)

Library to obtain information from an Instagram account in a friendly and intuitive way.

The library works as a wrapper for the basic Instagram API, to abstract long or confusing property names and have a
clean and readable data structure.

Created with NodeJS and Typescript, all types are exposed for use.
<img src="https://github.com/EdixonAlberto/instagrapi/blob/main/images/typescript.png" width="18px" alt="Logo typescript" /> +
💗

> 📃 **NOTE:** This library can only be used on the server with Nodejs.

> 📃 **NOTE:** Login to Instagram required to obtain an ID.

### 🌐 [Demo Web Site](https://edixonalberto.github.io/instagrapi) &#x279c;

### 🔌 [Example in Nodejs](https://github.com/EdixonAlberto/service-instagrapi) &#x279c;

## Installation

```sh
npm install instagrapi
# or
yarn add instagrapi
```

## Usage

First you must get the cookie called "sessionId" by logging in to your instagram account. To do this you must follow
these steps:

1. Go to https://www.instagram.com
2. If you don't have a session logged in start one
3. Open development tools witch `Ctrl + Shift + I`
4. Get to the `application` section and then to `Cookies` and select on the right hand side `sessionId`
   - For chromium browsers: `application`
   - For firefox browsers: `storage`

Now you can use the library by instantiating an object and passing the `sessionId` as an argument

```js
const { Instagrapi } = require('instagrapi')

const instagrapi = new Instagrapi({
  sessionId: process.env.SESSION_ID // Load sessionId from an environment variable
})

instagrapi.getProfile('USERNAME').then(profile => {
  console.log(profile.followers) // Numbers followers of instagram account
})
```

Using typescript and async/await.

```ts
import { Instagrapi, TPost, TComment } from 'instagrapi'

const instagrapi = new Instagrapi({
  sessionId: process.env.SESSION_ID
})

async function getComments(): Promise<string[] | undefined> {
  try {
    const post: TPost = await instagrapi.getPost('POST_URL')

    const comments: string[] = post.lastComments.map((comment: TComment) => comment.content)

    console.log(comments) // Last comments of the post

    return comments
  } catch (error) {
    console.error(error)
  }
}

getComments()
```

## Media Files

By default Instagram API return media files via a CDN configured with CORS rules so tha they can only be consumed from
the official page.

To work around this you can build your own proxy server and add it in instance confiuration. In this way the library
will automatically add the proxy as a prefix in all the media files that are found in the response.

```js
const instagrapi = new Instagrapi({
  sessionId: process.env.SESSION_ID,
  proxy: 'https://proxy-example.com'
})

instagrapi.getProfile('USERNAME').then(profile => {
  const imgUrl = profile.image.standard

  console.log(imgUrl) /* https://proxy-example.com/img-url... */
})
```

## Methods

- `getProfile(USERNAME)`

Get all the profile information of an instagram account. Receives as argument: `USERNAME`, the username of the instagram
account.

Type of output in typescript:

```ts
type TProfile = {
  username: string
  image: {
    standard: string
    hd: string
  }
  qtyPosts: number
  followers: number
  following: number
  name: string
  biography: string
  externalUrl: string
  isBusiness: boolean
  isVerified: boolean
  isPrivate: boolean
}
```

- `getLastPosts(USERNAME)`

Get the last 12 posts of an instagram account. Receives as argument: `USERNAME`, the username of the instagram account.

Type of output in typescript:

```ts
type TLastPosts = Array<{
  postUrl: string
  image: string
  video: null | {
    url: string
    views: number | null
  }
  content: string | null
  likes: number
  qtyComments: number
}>
```

- `getPost(POST_URL):`

Get all the details of a post of an instagram account. Receives as argument `POST_URL`, the url of the post on
instagram.

Type of output in typescript:

```ts
type TPost = {
  postUrl: string
  image: {
    standard: string
    hd: string
  }
  video: TVideo | null
  content: string | null
  likes: number
  qtyComments: number
  media: Array<TMedia>
  author: {
    username: string
    image: string
    qtyPosts: number
    followers: number
    name: string
    isVerified: boolean
    isPrivate: boolean
  }
  lastComments: Array<TComment>
  location: null | {
    country: string | null
    region: string | null
    city: string | null
    street: string | null
    zipCode: string | null
  }
  date: string
}
```

## License

[MIT](LICENSE) &copy; Edixon Piña

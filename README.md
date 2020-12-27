# instagrapi

[![](https://img.shields.io/badge/Author-Edixon_Piña-blue.svg?&style=flat-square)](https://www.edixonalberto.com)
[![](https://img.shields.io/github/license/edixonalberto/instagrapi?style=flat-square)](./LICENSE)
[![](https://img.shields.io/npm/dw/instagrapi?color=%23CA0000&style=flat-square)](https://www.npmjs.com/package/instagrapi)
[![](https://data.jsdelivr.com/v1/package/npm/instagrapi/badge)](https://www.jsdelivr.com/package/npm/instagrapi?path=dist%2Fbundle)

Library to obtain information from an Instagram account in a friendly and intuitive way.

The library works as a wrapper for the basic Instagram API, to abstract long or confusing
property names and have a clean and readable data structure.

Created with NodeJS and Typescript, all types are exposed for use.
<img src="./.github/typescript.png" width="15px" alt="" /> + 💗

```sh
npm install instagrapi
```

## Use

- NPM

```js
const { instagrapi } = require('instagrapi');

instagrapi.getProfile('USERNAME').then(profile => {
  console.log(profile.followers); // numbers followers of instagram account
});
```

- CDN

```html
<!-- Bundle to development -->
<script src="https://cdn.jsdelivr.net/npm/instagrapi@3/dist/bundle/instagrapi.js"></script>

<!-- Bundle optimized to production -->
<script src="https://cdn.jsdelivr.net/npm/instagrapi@3/dist/bundle/instagrapi.min.js"></script>
```

- DOWNLOAD

Download the bundle from
[jsdelivr](https://www.jsdelivr.com/package/npm/instagrapi?path=dist%2Fbundle) selecting
`instagrapi.js` or `instagrapi.min.js` and create the corresponding file in your assets.

## Methods

- `getProfile(<USERNAME>)`

Get all the profile information of an instagram account. Receives as argument:
`<USERNAME>`, the username of the instagram account.

Type of output in typescript:

```ts
type TProfile = {
  username: string;
  image: {
    standard: string;
    hd: string;
  };
  qtyPosts: number;
  followers: number;
  followed: number;
  name: string;
  biography: string;
  externalUrl: string;
  isBusiness: boolean;
  isVerified: boolean;
  isPrivate: boolean;
};
```

- `getLastPosts(<USERNAME>)`

Get the last 12 posts of an instagram account. Receives as argument: `<USERNAME>`, the
username of the instagram account.

Type of output in typescript:

```ts
type TLastPosts = Array<{
  postUrl: string;
  image: string;
  video: null | {
    url: string;
    views: number | null;
  };
  content: string | null;
  likes: number;
  qtyComments: number;
}>;
```

- `getPost(<POST_URL>):`

Get all the details of a post of an instagram account. Receives as argument `<POST_URL>`,
the url of the post on instagram.

Type of output in typescript:

```ts
type TPost = {
  postUrl: string;
  image: {
    standard: string;
    hd: string;
  };
  video: TVideo | null;
  content: string | null;
  likes: number;
  qtyComments: number;
  media: Array<TMedia>;
  author: {
    username: string;
    image: string;
    qtyPosts: number;
    followers: number;
    name: string;
    isVerified: boolean;
    isPrivate: boolean;
  };
  lastComments: Array<TComment>;
  location: null | {
    country: string | null;
    region: string | null;
    city: string | null;
    street: string | null;
    zipCode: string | null;
  };
};

type TMedia = {
  image: {
    standard: string;
    hd: string;
  };
  video: TVideo | null;
  taggedUsers: Array<TTagged>;
};

type TVideo = {
  url: string;
  type: string | 'clips' | 'igtv' | 'feed';
  views: number | null;
  duration: number;
  hasAudio:
    | boolean
    | {
        artist: string;
        song: string;
      };
};

type TTagged = {
  image: string;
  name: string;
  isVerified: boolean;
  coordinates: {
    x: number;
    y: number;
  };
};

type TComment = {
  content: string;
  author: {
    username: string;
    image: string;
    isVerified: boolean;
  };
  likes: number;
  responses: Array<TComment>;
  isSpam: boolean;
  date: string;
};
```

## License

[MIT License](./LICENSE) &copy; Edixon Piña

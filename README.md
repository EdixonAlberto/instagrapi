# instagrapi

[![Website](https://img.shields.io/badge/Author-Edixon_Piña-blue.svg?&style=flat-square)](https://edixonalberto.com)
![GitHub](https://img.shields.io/github/license/edixonalberto/instagrapi?style=flat-square)
![npm](https://img.shields.io/npm/dw/instagrapi?color=%23CA0000&style=flat-square)

Library to obtain information from an Instagram account in a friendly and intuitive way.

The library is used as a wrapper the basic Instagram API, to abstract long or confusing
property names and have a cleaner and clearer data structure.

```sh
npm install instagrapi
```

## Use

- Module

```js
const { instagrapi } = require('instagrapi');

instagrapi.getProfile('INSTAGRAM_USERNAME').then(profile => {
  console.log(profile.followers); // numbers followers of instagram account
});
```

- Bundle from url

```html
<script src="https://edixonalberto.github.io/instagrapi/instagrapi.js"></script>
```

- Bundle from node_modules

![file-bundle](./.github/file-bundle.png)

## Methods

- `getProfile:` get all information of profile the entered instagram account.

Type of output in typescript:

```ts
type TProfile = {
  image: {
    standard: string;
    hd: string;
  };
  publications: number;
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

- `getPublications:` get the total number of posts and the last 12 posts from the entered
  instagram account.

Type of output in typescript:

```ts
type TPublications = {
  total: number;
  latestPost: Array<TPost>;
};

type TPost = {
  cover: {
    image: {
      standard: string;
      small: string;
    };
    video?: string;
  };
  media?: Array<TMedia>;
  content?: string;
  likes: number;
  comments: number;
  location?: string;
  date: string;
};

type TMedia = {
  type: 'image' | 'video';
  url: string;
  views?: number;
};
```

## TODO

- [ ] Create more methods
- [ ] Access private accounts through login

## License

[MIT License](./LICENSE) &copy; Edixon Piña

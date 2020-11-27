# instagrapi

[![Website](https://img.shields.io/badge/Author-Edixon_Piña-blue.svg)](https://edixonalberto.com)
![MIT license](https://img.shields.io/badge/License-MIT-green.svg)
![GitHub](https://img.shields.io/github/followers/EdixonAlberto.svg?label=Follow&style=social)

Library to obtain information from an Instagram account in a friendly and intuitive way.

The library is used as a wrapper the basic Instagram API, to abstract long or confusing
property names and have a cleaner and clearer data structure.

```sh
npm install instagrapi
```

## Use

```js
const { instagrapi } = require('instagrapi');

instagrapi.getProfile('INSTAGRAM_USERNAME').then(profile => {
  console.log(profile.followers); // numbers followers of instagram account
});
```

## Methods

- `getProfile:` get all information of profile instagram inserted.

Type of output in typescript:

```ts
type TProfile = {
  profileImage: {
    standard: string;
    hd: string;
  };
  publications: string;
  followers: number;
  followed: number;
  name: string;
  biography: string;
};
```

## TODO

- [ ] Create more methods
- [ ] Access private accounts through login

## License

[MIT License](./LICENSE) &copy; Edixon Piña

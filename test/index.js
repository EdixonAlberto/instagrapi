const { instagrapi } = require('../src');

instagrapi.getProfile('edixonalbertto').then(profile => {
  console.log(profile.followers);
});

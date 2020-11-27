const { instagrapi } = require('../dist');

instagrapi.getProfile('instagram').then(profile => {
  console.log(profile);
});

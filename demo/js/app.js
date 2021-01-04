const vue = new Vue({
  el: '#app',

  components: {
    CodeHighlight: vueCodeHighlight.component
  },

  data: {
    lastPosts: [],
    username: 'instagram',
    profile: null
  },

  created() {
    if (this.username) {
      this.searchProfile();
    }
  },

  methods: {
    async getPosts() {
      this.lastPosts = await instagrapi.getLastPosts(this.username);
    },

    async searchProfile() {
      this.profile = await instagrapi.getProfile(this.username);
      this.getPosts();
    }
  }
});

// FILTERS

Vue.filter('round', nro => {
  if (nro / 1e6 < 1) {
    return nro / 1e3 < 1 ? nro : (nro / 1e3).toFixed(0) + 'K';
  } else return (nro / 1e6).toFixed(0) + 'M';
});

Vue.filter('cut', str => {
  return str.substr(0, 60) + '...';
});

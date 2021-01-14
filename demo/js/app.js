const vue = new Vue({
  el: '#app',

  components: {
    CodeHighlight: vueCodeHighlight.component
  },

  data: {
    features: {
      col1: [
        'Data based on the official instagram api',
        'Easy and fast to use',
        'Data exposed in full JSON format',
        'Images returned in standard and HD format',
        'Dates returned in unirversal ISO format'
      ],
      col2: [
        'Developed in NodeJS and Typescript',
        'All types of data are exposed',
        'Methods based in promises',
        'Bundle optimized for use on the client',
        'Code open source published in Github'
      ]
    },
    username: 'instagram',
    lastPosts: [],
    profile: null
  },

  created() {
    this.loadData();
  },

  methods: {
    async loadData() {
      await this.searchProfile();
      await this.getPosts();
    },

    async searchProfile() {
      this.profile = await instagrapi.getProfile(this.username);
    },

    async getPosts() {
      this.lastPosts = await instagrapi.getLastPosts(this.username);
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

const vue = new Vue({
  el: '#app',

  components: {
    CodeHighlight: vueCodeHighlight.component
  },

  data: {
    features: {
      col1: [
        'Data based on the official instagram api',
        'Data easy and fast to use',
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
    username: '',
    urlPost: '',
    profile: null,
    lastPosts: [],
    post: null
  },

  computed: {
    cache: {
      get() {
        const data = JSON.parse(localStorage.getItem('data'));
        return data || { profile: null, posts: [] };
      },
      set(newData) {
        localStorage.clear();
        localStorage.setItem('data', JSON.stringify(newData));
      }
    }
  },

  created() {
    this.username = this.cache.profile?.username || 'instagram';
    this.loadData(false);
  },

  methods: {
    async loadData(cacheClear = true) {
      if (cacheClear) this.cache = { profile: null, posts: [] };
      console.log(this.cache);

      await this.searchProfile();
      await this.getPosts();

      this.cache = {
        profile: this.profile,
        posts: this.lastPosts
      };
    },

    async searchProfile() {
      const profile = this.cache.profile;

      this.profile = !profile ? await instagrapi.getProfile(this.username) : profile;
    },

    async getPosts() {
      const posts = this.cache.posts;

      this.lastPosts = !posts.length
        ? await instagrapi.getLastPosts(this.username)
        : posts;
    },

    async getPost() {
      this.post = await instagrapi.getPost(urlPost);
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

// CACHE

const cache = {
  data: {
    profile: null,
    lastPosts: []
  },

  getData() {
    const localData = JSON.parse(localStorage.getItem('data'));
    return localData || this.data;
  },

  setData(newData) {
    localStorage.setItem('data', JSON.stringify(newData));
  },

  cleanData() {
    localStorage.clear();
  }
};

new Vue({
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

  computed: {},

  created() {
    this.username = cache.getData().profile?.username || 'instagram';
    this.loadData(false);
  },

  methods: {
    async loadData(cleanCache = true) {
      if (cleanCache) this.reset();

      await this.searchProfile();
      await this.getPosts();

      cache.setData({
        profile: this.profile,
        posts: this.lastPosts
      });
    },

    async searchProfile() {
      const profile = cache.getData().profile;

      this.profile = !profile ? await instagrapi.getProfile(this.username) : profile;
    },

    async getPosts() {
      const lastPosts = cache.getData().lastPosts;

      this.lastPosts = !lastPosts.length
        ? await instagrapi.getLastPosts(this.username)
        : lastPosts;
    },

    async getPost() {
      this.post = await instagrapi.getPost(urlPost);
    },

    reset() {
      this.profile = null;
      this.lastPosts = [];
      cache.cleanData();
    }
  }
});

// FILTERS

Vue.filter('round', nro => {
  let round = '';

  if (nro / 1e6 < 1) {
    round = nro / 1e3 < 1 ? nro.toString() : (nro / 1e3).toFixed(0) + 'K';
  } else resp = (nro / 1e6).toFixed(0) + 'M';

  return round;
});

Vue.filter('cut', str => {
  return str.substr(0, 60) + '...';
});

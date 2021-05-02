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
    postUrl: '',
    profile: null,
    lastPosts: [],
    post: null,
    isPlay: false
  },

  created() {
    // this.username = cache.getData().profile?.username || 'instagram';
    // this.loadData(false);
    this.loadJson(); // NOTA: load of data temporary
  },

  methods: {
    async loadJson() {
      const resp = await fetch('instagrapi/js/data.json', { method: 'GET' });
      const data = await resp.json();

      this.profile = data.user;
      this.lastPosts = data.lastPosts;
    },

    async loadData(cleanCache = true) {
      if (cleanCache) this.reset();

      this.profile = await this.searchProfile();
      this.lastPosts = await this.getPosts();

      cache.setData({
        profile: this.profile,
        lastPosts: this.lastPosts
      });
    },

    async searchProfile() {
      const profile = cache.getData().profile;
      return !profile ? await instagrapi.getProfile(this.username) : profile;
    },

    async getPosts() {
      const lastPosts = cache.getData().lastPosts;
      return !lastPosts.length ? await instagrapi.getLastPosts(this.username) : lastPosts;
    },

    async getPost(postUrl) {
      this.post = null;
      const post = cache.getData().post;

      if (!post || post.postUrl !== postUrl) {
        this.post = await instagrapi.getPost(postUrl);

        cache.setData({ post: this.post });
      } else this.post = post;
    },

    async getPostJson(postUrl) {
      this.post = null;
      this.post = this.lastPosts.find(post => post.postUrl === postUrl);
    },

    reset() {
      this.profile = null;
      this.lastPosts = [];
      cache.cleanData();
    },

    play() {
      const video = this.$refs.video;

      if (this.isPlay) video.pause();
      else video.play();

      this.isPlay = !this.isPlay;
    },

    goDemo() {
      scrollTo({
        top: document.getElementById('profile').offsetTop,
        behavior: 'smooth'
      });
    }
  }
});

// FILTERS

Vue.filter('round', nro => {
  let round = '';

  if (nro / 1e6 < 1) {
    round = nro / 1e3 < 1 ? nro.toString() : (nro / 1e3).toFixed(0) + 'K';
  } else round = (nro / 1e6).toFixed(0) + 'M';

  return round;
});

Vue.filter('cut', str => {
  return str.substr(0, 60) + '...';
});

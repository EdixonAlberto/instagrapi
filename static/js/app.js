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
        'Code optimized for use on the server',
        'Code open source published in Github'
      ]
    },
    username: '',
    postUrl: '',
    profile: null,
    lastPosts: [],
    post: null,
    play: false,
    version: ''
  },

  created() {
    this.username = cache.getData().profile?.username || 'instagram'
    this.loadData(false)
  },

  mounted() {
    const modalPost = document.getElementById('modal-post')

    modalPost.addEventListener('hidden.bs.modal', () => {
      this.play = false
    })
  },

  methods: {
    async loadData(cleanCache = true) {
      if (cleanCache) this.reset()

      this.version = await this.getVersion()
      this.profile = await this.searchProfile()

      if (this.profile) {
        this.lastPosts = await this.getPosts()

        cache.setData({
          profile: this.profile,
          lastPosts: this.lastPosts
        })
      }
    },

    async instagrapi(query = '', data = '') {
      // const URL_BASE = 'http://localhost:5000'
      const URL_BASE = 'https://service-instagrapi.herokuapp.com'

      return await new Promise(resolve => {
        const endpoint = query ? `/${query}/?data=${data}` : ''

        fetch(`${URL_BASE}/api${endpoint}`, { method: 'GET' })
          .then(async response => {
            const data = await response.json()
            if (response.status === 200) resolve(data)
            else throw data
          })
          .catch(error => {
            console.error('ERROR-INSTAGRAPI', error.message)
            alert(`ERROR: ${error.message}`)

            resolve(null)
          })
      })
    },

    async getVersion() {
      const data = await this.instagrapi()
      return data?.versionInstagrapi || ''
    },

    async searchProfile() {
      const profile = cache.getData().profile
      return profile || (await this.instagrapi('getProfile', this.username))
    },

    async getPosts() {
      const lastPosts = cache.getData().lastPosts
      return lastPosts.length ? lastPosts : await this.instagrapi('getLastPosts', this.username)
    },

    async getPost(postUrl) {
      this.post = null
      const post = cache.getData().post

      if (!post || post.postUrl !== postUrl) {
        const data = await this.instagrapi('getPost', postUrl)
        this.post = data

        cache.setData({ post: data })
      } else this.post = post
    },

    reset() {
      this.profile = null
      this.lastPosts = []
      cache.cleanData()
    },

    goDemo() {
      scrollTo({
        top: document.getElementById('demo').offsetTop,
        behavior: 'smooth'
      })
    }
  },

  watch: {
    play(val) {
      const video = this.$refs.video

      if (val) video.play()
      else video.pause()
    }
  }
})

// FILTERS _____________________________________________________________________________________________________________

Vue.filter('round', nro => {
  let round = ''

  if (nro / 1e6 < 1) {
    round = nro / 1e3 < 1 ? nro.toString() : (nro / 1e3).toFixed(0) + 'K'
  } else round = (nro / 1e6).toFixed(0) + 'M'

  return round
})

Vue.filter('cut', str => {
  return str.substr(0, 60) + '...'
})

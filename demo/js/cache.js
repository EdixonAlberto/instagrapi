const cache = {
  data: {
    profile: null,
    lastPosts: [],
    post: ''
  },

  getData() {
    const localData = JSON.parse(localStorage.getItem('data'));
    return localData || this.data;
  },

  setData(newData) {
    const localData = {
      ...this.getData(),
      ...newData
    };
    localStorage.setItem('data', JSON.stringify(localData));
  },

  cleanData() {
    localStorage.clear();
  }
};

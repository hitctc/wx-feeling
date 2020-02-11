const paginationBev = Behavior({
  properties: {},

  data: {
    dataArr: [],
    total: -1,
    noneRes: false,
    loading: false
  },

  methods: {
    setMoreData(dataArr) {
      const tempArr = this.data.dataArr.concat(dataArr)
      this.setData({
        dataArr: tempArr
      })
    },

    getCurrentStart() {
      return this.data.dataArr.length
    },

    setTotal(total) {
      if (total == 0) {
        this.setData({
          noneRes: true
        })
      }
      this.setData({
        total: total
      })
    },

    hasMore() {
      console.log(this.data.dataArr.length)
      console.log(this.data.total)
      if (this.data.dataArr.length >= this.data.total) {
        return false
      } else {
        return true
      }
    },

    initialize() {
      this.setData({
        dataArr: [],
        total: -1,
        noneRes: false,
        loading: false
      })
    },

    isLocked() {
      return this.data.loading ? true : false
    },

    locked() {
      this.setData({
        loading: true
      })
    },

    unLocked() {
      this.setData({
        loading: false
      })
    },


  }
})

export {
  paginationBev
}
// components/manager/movie-c/movie-c.js
const db = wx.cloud.database()
const movie = db.collection('movie')

Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */

  data: {
    imageURL: '',
    dataList: []
  },
  lifetimes: {
    ready() {
      const _self = this
      _self._getMovie()
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onEdit(e) {
      console.log('🚀 ~ file: movie-c.js ~ line 31 ~ e', e)
      const _self = this
      let item = JSON.parse(JSON.stringify(e.currentTarget.dataset.item))
      wx
        .navigateTo({
          url: `/pages/add-m/add-m`
        })
        .then((res) => {
          res.eventChannel.emit('setItemData', { data: item })
        })
    },
    _getMovie() {
      const _self = this
      movie.get({}).then((res) => {
        // res.data 是包含以上定义的两条记录的数组
        console.log('🚀 ~ file: movie-c.js ~ line 37 ~ res', res)
        _self.setData({
          dataList: res.data
        })
      })
    }
  }
})

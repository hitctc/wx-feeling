// components/index/movie-list-c/movie-list-c.js
var dayjs = require("../../../utils/day.js")

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    isNew: false
  },

  lifetimes: {
    ready() {

    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 跳转详情页
    onDetail(e) {
      let item = JSON.parse(JSON.stringify(e.currentTarget.dataset.item))
      // 跳转页面，传递数据
      wx.navigateTo({
        url: `/pages/movie-detail/index?_id=${item._id}`
      }).then((res) => {
        // 传递数据到
        res.eventChannel.emit('setItemData', {
          data: item
        })
      })
    }
  }
})

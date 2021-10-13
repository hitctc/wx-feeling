// components/manager/movie-c/movie-c.js
const db = wx.cloud.database()
import Dialog from '../../../miniprogram_npm/@vant/weapp/dialog/dialog'
import {
  _showToast
} from '../../../utils/wxShowToast'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object
    },
  },

  /**
   * 组件的初始数据
   */
  data: {},

  lifetimes: {
    ready() {
      setTimeout(() => {}, 200)
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 编辑资源
    onEditSource(e) {
      let item = JSON.parse(JSON.stringify(e.currentTarget.dataset.item))
      // 跳转页面，传递数据
      wx.navigateTo({
        url: `/pages/add-m/add-m?pageType=change&_id=${item._id}`
      })
    },
    // 删除资源
    onDeleteSource(e) {
      const _self = this
      // 获取属性数据
      const item = e.currentTarget.dataset.dataItem
      const _id = item._id
      Dialog.confirm({
        context: this,
        message: `删除需要走云函数。确认删除：${item.title}？`,
      }).then(() => {
        wx.cloud.callFunction({
          name: 'deleteSource',
          data: {
            _id
          }
        }).then(res => {
          if (res.result) {
            _self.triggerEvent('deleteSourceData', item);
            _showToast('删除完成~')
          } else {
            _showToast('删除失败~')
          }
        }).catch(console.error)

      }).catch(() => {
        _showToast("取消删除~")
      })
    },

  }
})
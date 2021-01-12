// components/manager/movie-c/movie-c.js
const db = wx.cloud.database()
const movie = db.collection('movie')
// import Dialog from '@vant/weapp/dist/dialog/dialog';
import Dialog from '../../../miniprogram_npm/@vant/weapp/dialog/dialog'

import { _showToast } from '../../../utils/wxShowToast'

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
      // 跳转页面，传递数据
      wx
        .navigateTo({
          url: `/pages/add-m/add-m?pageType=change`
        })
        .then((res) => {
          res.eventChannel.emit('setItemData', { data: item })
        })
    },
    onDelete(e) {
      const _self = this
      // 获取属性数据
      const attr = e.currentTarget.dataset
      console.log('🚀 ~ file: mine-share.js ~ line 21 ~ attr', attr)
      const item = attr.dataItem
      console.log('🚀 ~ file: mine-share.js ~ line 22 ~ item', item)
      const _id = item._id
      Dialog.confirm({
        context: this,
        message: '确认删除？',
        theme: 'round-button'
      })
        .then(() => {
          _showToast('删除成功~')
          movie.doc(_id).remove({
            success: function(res) {
              console.log('🚀 ~ file: movie-c.js ~ line 64 ~ res', res)
              _self._getMovie()
            }
          })
        })
        .catch(() => {
          _showToast('取消~')
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

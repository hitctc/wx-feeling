// components/like-c/index.js
let app = getApp()
wx.cloud.init({

  env: 'feel-6gdrrxeye8840e66'
})
const db = wx.cloud.database()

import {
  _showToast
} from '../../utils/wxShowToast';

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
    likeProtect: false,
    userInfo: {}
  },

  lifetimes: {
    ready() {
      // 页面显示的时候会调用一次数据，因此不用重复调用
      this.setData({
        userInfo: app.globalData.userInfo || {}
      })
    }
  },


  /**
   * 组件的方法列表
   */
  methods: {
    // 点赞
    async handleLike() {
      const _self = this
      let userInfoT = wx.getStorageSync('userInfo') || {}
      if (typeof (userInfoT.nickName) == 'undefined') {
        _showToast(`跳转登录页，登录以提供完整服务`)
        setTimeout(() => {
          wx.hideToast({
            success: (res) => {
              wx.navigateTo({
                url: '/pages/login/index',
              })
            },
          })
        }, 1500)
        return
      }


      let _id = this.properties.item._id
      let count = (this.properties.item.likesCount || 0) + 1
      const _ = db.command
      if (this.data.likeProtect) {
        _showToast('休息一会')
        return
      }
      _self.setData({
        'item.likesCount': count,
        likeProtect: true
      })
      _showToast('点赞+1')
      // 调用云函数
      wx.cloud.callFunction({
        name: 'changeLike',
        data: {
          type: 'likes',
          _id,
          count,
        }
      }).then(res => {
        if (res.result.errMsg.indexOf('ok') > -1) {
          _self.setData({
            likeProtect: false
          })
        }
      }).catch(console.error)

    },

    // 点踩
    async handleUnLike() {
      const _self = this
      // 登录
      let userInfoT = wx.getStorageSync('userInfo') || {}
      if (typeof (userInfoT.nickName) == 'undefined') {
        _showToast(`跳转登录页，登录以提供完整服务`)
        setTimeout(() => {
          wx.hideToast({
            success: (res) => {
              wx.navigateTo({
                url: '/pages/login/index',
              })
            },
          })
        }, 1500)
        return
      }


      let _id = this.properties.item._id
      let count = (this.properties.item.badsCount || 0) + 1
      const _ = db.command
      if (this.data.likeProtect) {
        _showToast('休息一会')
        return
      }
      _showToast('点踩+1')
      _self.setData({
        'item.badsCount': count,
        likeProtect: true
      })

      // 调用云函数
      wx.cloud.callFunction({
        name: 'changeLike',
        data: {
          type: 'bads',
          _id,
          count,
        }
      }).then(res => {
        if (res.result.errMsg.indexOf('ok') > -1) {
          _self.setData({
            likeProtect: false
          })
        }
      }).catch(console.error)
    },

    _loginF() {
      // 登录
      let userInfoT = this.data.userInfo
      if (typeof (userInfoT.nickName) == 'undefined') {
        _showToast(`跳转登录页，登录以提供完整服务`)
        setTimeout(() => {
          wx.hideToast({
            success: (res) => {
              wx.navigateTo({
                url: '/pages/login/index',
              })
            },
          })
        }, 1500)
        return
      }
    },

  }
})
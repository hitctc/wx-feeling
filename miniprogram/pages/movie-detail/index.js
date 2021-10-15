const app = getApp()

import {
  _showToast
} from "../../utils/wxShowToast"

wx.cloud.init({
  env: 'cloud1-feel-6gdrrxeye8840e663gv4om0jed457476'
})
const db = wx.cloud.database()

// pages/movie-detail/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isKfVisible: false,
    isSourceVisible: true,
    sourceSingleData: {},
    userInfo: {},
    _id: "",
    likeProtect: false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      _id: options._id
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      userInfo: app.globalData.userInfo
    })
    this.getSourceSingleData()
  },

  // 点击复制
  onCopy(e) {
    const data = e.currentTarget.dataset.link || e.currentTarget.dataset.code || ''
    if (data === '') {
      _showToast('无可复制内容~')
      return
    }
    wx.setClipboardData({
      data: data,
      success: function (res) {
        _showToast(`已复制：${data}`)
        // wx.getClipboardData({
        //   success: function (res) {}
        // })
      }
    })
  },

  jumpPage(event) {
    let item = JSON.parse(JSON.stringify(event.currentTarget.dataset.item))
    // 跳转页面，传递数据
    wx.navigateTo({
      url: `/pages/manage-data/index?pageType=change&_id=${item._id}`
    })
  },

  jumpHome() {
    // 跳转页面，传递数据
    wx.switchTab({
      url: '/pages/index/index',
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    let title = this.data.sourceSingleData.title
    let sortTitle = this.data.sourceSingleData.sortTitle
    let _id = this.data._id
    return {
      title: title + '\r\n' + sortTitle,
      path: `/pages/movie-detail/index?_id=${_id}`,
      imageUrl: ''
    }
  },

  // 分享到朋友圈
  onShareTimeline() {
    let title = this.data.sourceSingleData.title
    let sortTitle = this.data.sourceSingleData.sortTitle
    let _id = this.data._id
    return {
      title: title + '\r\n' + sortTitle,
      path: `/pages/movie-detail/index?_id=${_id}`,
      imageUrl: ''
    }
  },

  jumpPyq() {
    this.onShareTimelineonShareTimeline()
  },

  // 删除当前条数据
  deleteMovie() {
    const _self = this
    let _id = this.data.sourceSingleData._id
    let title = this.data.sourceSingleData.title
    wx.showModal({
      title: '提示',
      content: `删除需要走云函数，确认删除：${title}？`,
      success(res) {
        if (res.confirm) {
          wx.cloud.callFunction({
            name: 'deleteSource',
            data: {
              _id
            }
          }).then(res => {
            if (res.result) {
              _showToast('删除完成~')
              setTimeout(() => {
                wx.switchTab({
                  url: '/pages/index/index',
                })
              }, 1500)
            } else {
              _showToast('删除失败~')
            }
          }).catch(console.error)

        } else if (res.cancel) {
          _showToast("取消删除~")
        }
      }
    })

  },

  // 点赞
  async onLike() {
    // onLike
    // 登录
    const _self = this
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

    // 点赞
    let _id = this.data.sourceSingleData._id
    let count = (this.data.sourceSingleData.likesCount || 0) + 1
    const _ = db.command
    if (this.data.likeProtect) {
      _showToast('休息一会')
      return
    }
    _self.setData({
      'sourceSingleData.likesCount': count,
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
  onBads() {
    const _self = this
    let badsCountT = this.data.sourceSingleData.badsCount + 1
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
    this.setData({
      [`sourceSingleData.badsCount`]: badsCountT
    })

    this.setData({
      isKfVisible: true
    })
    wx.showModal({
      title: '提示',
      content: '点踩+1，跳转客服留言需求',
      success(res) {
        if (res.confirm) {
        } else if (res.cancel) {
        }
        _self.setData({
          isKfVisible: false
        })
      }
    })

  },

  // 获取单条数据
  async getSourceSingleData() {
    const _self = this
    let _id = this.data._id
    let onOffList = []
    await db.collection('on-off').get().then(res => {
      // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
      onOffList = res.data
    })
    db.collection('resource').doc(_id).get().then(res => {
      // res.data 包含该记录的数据
      let dataT = JSON.parse(JSON.stringify(res.data))
      // 资源可以开关按钮
      onOffList.forEach(item => {
        if (item.dataName === '资源链接是否可见' && !item.isVisible) {
          // 全部不显示资源链接
          dataT.sourceList = []
          this.setData({
            isSourceVisible: false
          })
        } else if (item.dataName === '资源链接是否可见' && item.isVisible) {
          this.setData({
            isSourceVisible: true
          })
        }
      });
      var dayjs = require("../../utils/day.js")
      var timestamp = (new Date()).valueOf();
      let dateIssuedT = dataT.dateIssued
      let day7 = dayjs(dateIssuedT).add(7, 'day') // 7天后
      let timestamp7 = dayjs(day7.$d).valueOf() // 7天后的时间戳
      dataT.isNew = timestamp7 > timestamp

      _self.setData({
        sourceSingleData: dataT
      })
      // 设置顶部导航bar的title
      wx.setNavigationBarTitle({
        title: dataT.title
      })
    })
  },

  // 联系客服动作
  handleContact(e) {
    _showToast('失效留言客服')
  },
})
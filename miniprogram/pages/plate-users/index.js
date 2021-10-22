// pages/users/index.js
const app = getApp().globalData
import {
  _showToast,
  _showToastMask
} from "../../utils/wxShowToast.js";
let tapcount = 0

Page({
  /**
   * 页面的初始数据
   */
  data: {
    oId: '',
    userInfo: {},
    isZsVisible: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      oId: app.oId,
      userInfo: app.userInfo
    })
  },

  // 页面显示
  onShow() {
    // 获取data里面存的orderId
    this.onLoad()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    return {
      title: '朋友圈文案',
      path: `/pages/plate-index/index`,
      imageUrl: ''
    }
  },

  // 添加
  onAdd() {
    wx.navigateTo({
      url: '/pages/manage-data/index',
    })
  },

  // 跳转介绍页
  jumpJs() {
    wx.navigateTo({
      url: '/pages/page-reward/index',
    })
  },

  // 点击赞赏木
  handleZs() {
    this.setData({
      isZsVisible: true
    })
  },

  // 关闭赞赏码
  handleClose() {
    this.setData({
      isZsVisible: false
    })
  },

  // 跳转弹幕
  jumpDm() {
    wx.navigateToMiniProgram({
      appId: 'wx2ba3390eef60894c',
      path: ' /pages/zm-index/index',
      success(res) {
        console.info('success -> res打开成功 ----------- this.data.article', res)
      }
    })
  },

  jumpMovie() {
    wx.navigateToMiniProgram({
      appId: 'wx6294b4749e40b1c8',
      path: ' /pages/index/index',
      success(res) {
        console.info('success -> res打开成功 ----------- this.data.article', res)
      }
    })
  },

  // 登录状态操作
  onLoginSts() {
    let _self = this
    let oId = this.data.oId
    if (oId != '') {
      app.oId = ''
      wx.setStorage({
        key: 'oId',
        value: ''
      })
      wx.setStorage({
        key: 'userInfo',
        value: {}
      })
      // 清空全局的登录信息
      app.oId = ''
      app.userInfo = {}
      _showToast('用户已登出~')
      setTimeout(function () {
        var pages = getCurrentPages();
        var prevPage = pages[pages.length - 1]; // 当前页面
        if (prevPage) {
          // 刷新一下当前页面
          // wx.startPullDownRefresh()
          _self.onLoad()
        }
      }, 1500)
    } else {
      _self.jumpLogin()
    }

  },

  jumpLogin() {
    if (app.oId === '') {
      wx.navigateTo({
        url: '/pages/login/index',
        success: function (res) { },
        fail: function () { },
        complete: function () { }
      })
    }
  },

  // 跳转开发页面
  jumpDev() {
    tapcount++
    // 一秒钟连续点击5次
    setTimeout(function () {
      tapcount = 0
    }, 1000)
    if (tapcount >= 5) {
      _showToastMask('跳转dev~')
      wx.navigateTo({
        url: '/pages/page-dev/index'
      })
    }

  }

})
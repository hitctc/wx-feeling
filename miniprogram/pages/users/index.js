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
    userInfo: {}
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
      title: '好用的电影电视剧查询工具',
      path: `/pages/index/index`,
      imageUrl: 'https://636c-cloud1-3gv4om0jed457476-1306871317.tcb.qcloud.la/my-image.png?sign=c58fd939f0cae195421f0597b9c6bfa1&t=1630514985'
    }
  },

  // 添加
  onAdd() {
    wx.navigateTo({
      url: '/pages/add-m/add-m',
    })
  },

  // 管理
  onManager() {
    wx.navigateTo({
      url: '/pages/manager/manager',
    })
  },

  // 跳转介绍页
  jumpJs() {
    wx.navigateTo({
      url: '/pages/reward-page/index',
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
        url: '/pages/dev-page/index'
      })
    }

  }

})
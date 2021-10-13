// pages/login/index.js
const app = getApp()
import {
  _showToast,
  _showToastMask
} from "../../utils/wxShowToast.js";

wx.cloud.init({
  env: 'cloud1-3gv4om0jed457476'
})
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,
    loginText: '欢迎、欢迎',
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    if (app.globalData.oId != '') {
      this.setData({
        isLogin: true
      })
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  // 获取用户信息新接口
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于获取用户昵称、头像', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        this.handingUserInfo(res.userInfo)
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    this.handingUserInfo(e.detail.userInfo)
  },

  // 处理用户信息
  handingUserInfo(userInfo) {
    let _self = this
    wx.showLoading({
      title: '登录中...',
    })
    if (userInfo) {
      // 放到全局数据中
      app.globalData.userInfo = userInfo
      // 登录逻辑获取用户的openid
      wx.login({
        success(res) {
          if (res.code) {
            // 发起获取openid
            // 调用云函数
            wx.cloud.callFunction({
              name: 'login',
              data: {},
              success: res => {
                wx.hideLoading({
                  success: (res) => { },
                })
                app.globalData.oId = res.result.openid
                _self.setData({
                  isLogin: true
                })
                wx.setStorage({
                  key: 'oId',
                  data: res.result.openid
                })
                // 当没有这个用户的时候添加这个账号到数据库
                if (!res.result.hasUserOId) {
                  // 在全局数据中添加userType，默认level-10
                  app.globalData.userInfo.userType = 'level-10'
                  // 将获取的用户信息放到缓存中
                  wx.setStorage({
                    key: 'userInfo',
                    data: app.globalData.userInfo
                  })
                  _self.addNewUser() // 如果是新用户，将数据添加到数据库中
                } else {
                  app.globalData.userInfo.userType = res.result.data.data[0].userType
                  wx.setStorage({
                    key: 'userInfo',
                    data: app.globalData.userInfo
                  })
                }
                setTimeout(function () {
                  wx.navigateBack({
                    delta: 1
                  })
                }, 2000)
              },
              fail: err => {
                console.error('[云函数] [login] 调用失败', err)
                // wx.navigateTo({
                //   url: '../deployFunctions/deployFunctions',
                // })
              }
            })
          }
        }
      })
    }
  },

  // 登录后直接添加用户
  addNewUser() {
    var user = {
      userType: app.globalData.userInfo.userType,
      nickName: app.globalData.userInfo.nickName,
      avatarUrl: app.globalData.userInfo.avatarUrl,
      oId: app.globalData.oId
    };
    db.collection('users').add({
      // data 字段表示需新增的 JSON 数据
      data: user
    }).then(res => {
    })

  },

})
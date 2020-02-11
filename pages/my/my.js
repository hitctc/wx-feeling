// pages/my/my.js
import {
  HTTPClassicModel
} from '../../http/models/classic.js'

import {
  HTTPBookModel
} from '../../http/models/book.js'

const httpClassicModel = new HTTPClassicModel
const httpBookModel = new HTTPBookModel
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorized: false,
    userInfo: null,
    bookCount: 0,
    classics: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.userAuthorized()
    this.getMyBookCount()
    this.getMyFavor()
  },

  userAuthorized() {
    // 这里是判断是否拿到了用户信息相关信息
    wx.getSetting({
      success: (data) => {
        if (data.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: (data) => {
              console.log(data)
              this.setData({
                authorized: true,
                userInfo: data.userInfo
              })
            }
          })
        } else {
          wx.showToast({
            title: '请授权',
            icon: 'none'
          })
        }
      }
    })
  },
  onGetUserInfo(event) {
    const userInfo = event.detail.userInfo
    console.log(userInfo)
    if (userInfo) {
      this.setData({
        authorized: true,
        userInfo: userInfo
      })
    }
  },

  getMyBookCount() {
    console.log('1')
    httpBookModel.getMyBookCount().then(res => {
      this.setData({
        bookCount: res.count
      })
    })
  },

  getMyFavor() {
    httpClassicModel.getMyFavor(res => {
      this.setData({
        classics: res
      })
    })
  },

  onJumpToAbout(event) {
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },

  onStudy(event) {
    wx.navigateTo({
      url: '/pages/course/course',
    })
  },

  onJumpToDetail(event) {
    const cid = event.detail.cid
    const type = event.detail.type
    console.log(event)
    // wx.navigateTo
    wx.navigateTo({
      url: `/pages/classic-detail/classic-detail?cid=${cid}&type=${type}`
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
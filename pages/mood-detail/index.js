// pages/mood-detail/index.js
import { formatData } from "../../utils/formatData.js"

Page({

  // onShareAppMessage() {
  //   return {
  //     title: 'swiper',
  //     path: 'page/component/pages/swiper/swiper'
  //   }
  // },

  /**
   * 页面的初始数据
   */
  data: {
    mood: null,
    mooddesc: null,
    YYYY: String,
    MM: String,
    DD: String,
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const FDate = formatData()
    const YYYY = FDate.YYYY
    const MM = FDate.MMChinese
    const DD = FDate.DD
    this.setData({
      YYYY: YYYY,
      MM: MM,
      DD: DD
    })
    wx.showLoading({
      title: '数据加载中'
    })
    const mood = options.mood
    const mooddesc = options.mooddesc
    this.setData({
      mood: mood,
      mooddesc: mooddesc
    })
    wx.hideLoading()
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

  }
})
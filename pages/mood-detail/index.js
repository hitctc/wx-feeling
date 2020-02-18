// pages/mood-detail/index.js
import { formatData } from "../../utils/formatData.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mood: null,
    mooddesc: null,
    YYYY: String,
    MM: String,
    DD: String
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
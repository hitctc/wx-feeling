// pages/mood-detail/index.js
import { formatData, formatDataTime } from "../../utils/formatData.js"
import { data as allMood } from "../../resource/mood/mood.js"

Page({


  /**
   * 页面的初始数据
   */
  data: {
    keyword: null,
    mooddesc: null,
    FAllMood: null,
    YYYY: String,
    MM: String,
    DD: String,
    indicatorDots: false, // 是否显示面板指示点
    vertical: false, // 垂直滚动
    autoplay: false, // 自动循环
    interval: 2000, // 自动播放间隔时间
    duration: 500, // 动画持续时间
    circular: false // 衔接循环
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // todo 需要重新设计数据格式。
    wx.showLoading({
      title: '数据加载中'
    })
    const FDate = formatData()
    const currentTimestamp = new Date().getTime();
    const YYYY = FDate.YYYY
    const MM = FDate.MMChinese
    const DD = FDate.DD
    const keyword = options.keyword
    const FAllMood = []
    allMood.res.filter(item => {
      const strtime = item.time + ' 00:00:00';
      const date = new Date(strtime.replace(/-/g, '/'));
      const paramTimestamp = date.getTime();
      if (currentTimestamp > paramTimestamp) {
        item.YYYY = formatDataTime(strtime).year
        item.MM = formatDataTime(strtime).month
        item.DD = formatDataTime(strtime).day
        if (item.keyword === keyword && item.time === FDate.YYYYMMDDnorm) {
          FAllMood.unshift(item)
          return
        }
        FAllMood.push(item)
      }
    })
    this.setData({
      FAllMood: FAllMood,
      keyword: keyword,
      YYYY: YYYY,
      MM: MM,
      DD: DD
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
  onShareAppMessage() {
    // path: '/page/user?id=123'
    return {
      title: 'MOOD SHARE'
      // path: `/page/pages/mood-detail/index?keyword=${this.data.keyword}`
    }
  },

})
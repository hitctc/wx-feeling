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
    allMood: null,
    YYYY: String,
    MM: String,
    DD: String,
    indicatorDots: false, // 是否显示面板指示点
    vertical: false, // 垂直滚动
    autoplay: false, // 自动循环
    interval: 2000, // 自动播放间隔时间
    duration: 500, // 动画持续时间
    circular: true // 衔接循环
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
    const YYYY = FDate.YYYY
    const MM = FDate.MMChinese
    const DD = FDate.DD
    const eventChannel = this.getOpenerEventChannel()
    const self = this
    eventChannel.on('acceptDataFromOpenerPage', function (data) {
      self.setData({
        allMood: data.allMood,
        mood: data.mood,
        mooddesc: data.mooddesc,
        YYYY: YYYY,
        MM: MM,
        DD: DD
      })
    })
    console.log(this.data.allMood.res)
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
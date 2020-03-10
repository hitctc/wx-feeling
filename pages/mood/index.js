// pages/mood/index.js
import {
  HTTPMoodModel
} from "../../http/models/mood.js"


const httpMoodModel = new HTTPMoodModel()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    moods: '',
    bgsrcAll: ['./images/bg1.jpg', './images/bg2.jpg', './images/bg3.jpg'],
    bgsrc: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const random = Math.floor(Math.random() * 3)
    this.setData({
      bgsrc: this.data.bgsrcAll[random]
    })
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

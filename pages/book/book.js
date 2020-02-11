// pages/book/book.js
import {
  HTTPBookModel
} from '../../http/models/book.js'

import {
  uuid
} from '../../utils/uuid.js'
const httpBookModel = new HTTPBookModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    books: [],
    searching: false,
    more: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // Promise使用
    httpBookModel.getHotList().then((res) => {
      this.setData({
        books: res
      })
    })
  },

  onSearching(event) {
    console.log(event)
    this.setData({
      searching: true
    })
  },

  onCancel(event) {
    this.setData({
      searching: false
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
  // 监听【页面】滑动到页面底部
  // scroll-view || Page onReachBottom
  onReachBottom: function() {
    this.setData({
      more: uuid(20)
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
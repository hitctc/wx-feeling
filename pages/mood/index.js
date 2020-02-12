// pages/mood/index.js
import {
  formatData
} from "../../utils/formatData.js"

import {
  HTTPMoodModel
} from "../../http/models/mood.js"

import { xqData } from "../../resource/xq20200213.js"

const httpMoodModel = new HTTPMoodModel()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    moods: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      moods: xqData.res
    })
    console.log(this.data.moods)
    // const YYYYMMDD = formatData().YYYYMMDD.split('-').join('')
    // Promise使用
    // httpMoodModel.getMoodList(YYYYMMDD).then((res) => {
    //   console.log(res)
    //   this.setData({
    //     moods: res
    //   })
    // })

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

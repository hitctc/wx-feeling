// pages/users-manage/index.js
let app = getApp()
wx.cloud.init({
  env: 'feel-6gdrrxeye8840e66'
})
const db = wx.cloud.database()

import {
  _showToast
} from '../../utils/wxShowToast';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    _id: '',
    onOffList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAllOnOff()
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

  // 开关切换
  switch1Change(event) {
    const _self = this
    let dataName = event.currentTarget.dataset.dataName
    let _id = event.currentTarget.dataset.id
    this.setData({
      _id
    })
    let valueT = event.detail.value
    wx.showLoading({
      title: '更新中...',
    })
    wx.cloud.callFunction({
      name: 'updateOnOff',
      data: {
        _id,
        isVisible: valueT,
      }
    }).then(res => {
      if (res) {
        wx.hideLoading({
          success: (res) => {
            _showToast(`【${dataName}】，已更新`)
          },
        })
        _self.getAllOnOff()
      }
    }).catch(console.error)

  },


  // 获取所以开关信息
  getAllOnOff() {
    let _self = this
    db.collection('on-off').get().then(res => {
      // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
      _self.setData({
        onOffList: res.data
      })
      app.globalData.onOffList = res.data
    })
  },

  // 关闭
  onClose(e) {},

})
// pages/random-feel/index.js
const app = getApp().globalData
var animate = null
var nowAnimate = 0

import envData from "../../envList.js";
wx.cloud.init({
  env: envData.envList.envId,
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
    state: '开始',
    show: false,
    bigtitlehide: false
  },

  // 开始随机
  async refreshRandom() {
    // wx.showLoading({
    //   title: '正在搜寻菜谱',
    // })

    // 获取所有key类型
    let _self = this
    let keyTypeList = []
    const db = wx.cloud.database()

    await db.collection('key-type').get().then(res => {
      console.log('ACHUAN : db.collection : res', res)
      // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
      let resT = res.data.filter(item => item.isVisible)
      keyTypeList = resT
      // _self.setData({
      //   keyTypeList: resT
      // })
    }).catch(err => {
      console.error('ACHUAN : db.collection : err', err)
    })
    console.log('ACHUAN : awaitdb.collection : keyTypeList', keyTypeList)

    var randoms = keyTypeList
    for (var i = 0; i < randoms.length; i++) {
      var fontsize = 20 + Math.floor(Math.random() * randoms.length)
      var x = Math.floor(Math.random() * 70)
      var y = Math.floor(Math.random() * 70)
      randoms[i].fontsize = fontsize
      randoms[i].x = x
      randoms[i].y = y
    }

    _self.setData({
      randoms: randoms
    })
    animate = setInterval(function () {
      _self.setData({
        ['randoms[' + nowAnimate + '].show']: true
      })
      nowAnimate++
      if (nowAnimate == _self.data.randoms.length) {
        var random_index = Math.floor(Math.random() * _self.data.randoms.length)
        _self.setData({
          state: '换一个',
          show: true,
          random: _self.data.randoms[random_index]
        })
        if (animate) {
          // wx.hideLoading({})
          clearInterval(animate)
        }
        nowAnimate = 0
      }
    }, 500)
  },

  // 开始随机
  onButton() {
    var that = this
    if (this.data.state == '开始' || this.data.state == '换一个') {
      this.setData({
        state: '停止',
        bigtitlehide: true,
        show: false,
        randoms: []
      })
      this.refreshRandom()
    }
    else if (this.data.state == '停止') {
      var random_index = Math.floor(Math.random() * this.data.randoms.length)
      this.setData({
        state: '换一个',
        show: true,
        random: this.data.randoms[random_index]
      })
      if (animate) {
        clearInterval(animate)
      }
      nowAnimate = 0
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
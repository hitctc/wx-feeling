// pages/page-detail/index.js
import { _showToast } from "../../utils/wxShowToast.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: '',
    date: '',
    isMaskVisible: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('ACHUAN : options', options)
    let content = options.content
    console.log('ACHUAN : content', content)
    let dateIssued = options.dateIssued
    console.log('ACHUAN : dateIssued', dateIssued)
    this.setData({
      content,
      date: dateIssued,
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
    let content = this.data.content
    let date = this.data.date
    return {
      title: content + '\r\n' + date,
      path: `/pages/page-detail/index?content=${content}&dateIssued=${date}`,
      imageUrl: 'https://6665-feel-6gdrrxeye8840e66-1304594986.tcb.qcloud.la/img/logo2%2B5x4.png?sign=8e32097a22322d3211c513990da89264&t=1635674876',
    }
  },

  // 分享到朋友圈
  onShareTimeline() {
    let content = this.data.content
    let date = this.data.date
    return {
      title: content + '\r\n' + date,
      path: `/pages/page-detail/index?content=${content}&dateIssued=${date}`,
      imageUrl: 'https://6665-feel-6gdrrxeye8840e66-1304594986.tcb.qcloud.la/img/logo2%2B1x1.png?sign=08d998156af2a81378ac677166bb1f93&t=1635675035',
    }
  },

  // 点击复制
  onCopy() {
    const _self = this
    const content = _self.data.content
    if (content === '') {
      _showToast('无可复制内容~')
      return
    }
    wx.setClipboardData({
      data: content,
      success: function (res) {
        // todo 复制成功之后走一次接口，记录被复制的次数
        _showToast(`已复制：${content}`)
      }
    })
  },

  // 点击分享
  // onShare() {
  //   let content = this.data.content
  //   console.log('ACHUAN : onShare : content', content)
  //   let date = this.data.date
  //   console.log('ACHUAN : onShare : date', date)
  // },

  // 点击分享朋友圈
  onPyq() {
    // let content = this.data.content
    // let date = this.data.date
    this.setData({
      isMaskVisible: true
    })
  },

  onMaskTap() {
    this.setData({
      isMaskVisible: false
    })
  },

  onCloseMask() {
    this.setData({
      isMaskVisible: false
    })
  },

})
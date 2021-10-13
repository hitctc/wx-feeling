// pages/about/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isZsVisible: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 设置顶部导航bar的title
    wx.setNavigationBarTitle({
      title: '相关'
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

  },

  // 跳转弹幕
  jumpdm() {
    wx.navigateToMiniProgram({
      appId: 'wx2ba3390eef60894c',
      path: ' /pages/zm-index/index',
      success(res) {
        console.log('success -> res打开成功 ----------- this.data.article', res)
      }
    })
  },

  // 点击赞赏木
  handleZs() {
    this.setData({
      isZsVisible: true
    })
  },

  // 关闭赞赏码
  handleClose() {
    this.setData({
      isZsVisible: false
    })
  },

})
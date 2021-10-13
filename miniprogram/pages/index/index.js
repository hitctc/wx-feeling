// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfoT = wx.getStorageSync('userInfo') || {}
    this.setData({
      userInfo: userInfoT
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let homeSource = this.selectComponent('#homeSource')
    if (homeSource) {
      homeSource.getSource()
      homeSource._getSourceType()
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let homeSource = this.selectComponent('#homeSource')
    if (homeSource) {
      // homeSource.getSource()
      // homeSource._getSourceType()
    }
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
    let homeSource = this.selectComponent('#homeSource')
    if (homeSource) {
      homeSource._reachDown()
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let homeSource = this.selectComponent('#homeSource')
    if (homeSource) {
      homeSource._reachBottom()
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  // 分享到朋友圈
  // onShareTimeline() {
  //   return {
  //     title: '好用的电影电视剧查询工具',
  //     path: `/pages/index/index`,
  //     imageUrl: 'https://636c-cloud1-3gv4om0jed457476-1306871317.tcb.qcloud.la/my-image.png?sign=c58fd939f0cae195421f0597b9c6bfa1&t=1630514985'
  //   }
  // },

  jumpAddMovie() {
    wx.navigateTo({
      url: '/pages/add-m/add-m',
    })
  }
})
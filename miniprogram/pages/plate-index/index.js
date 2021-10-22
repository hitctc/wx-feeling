// pages/plate-index/index.js
wx.cloud.init({
  env: 'feel-6gdrrxeye8840e66',
})

const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    bootUpInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfoT = wx.getStorageSync('userInfo') || {}
    this.setData({
      userInfo: userInfoT
    })
    this.getBootUpData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // let homeSource = this.selectComponent('#homeSource')
    // if (homeSource) {
    //   homeSource.getSource()
    //   homeSource._getSourceType()
    // }
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
      // homeSource._reachDown()
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let homeSource = this.selectComponent('#homeSource')
    if (homeSource) {
      // homeSource._reachBottom()
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
  //     imageUrl: ''
  //   }
  // },

  jumpAddMovie() {
    wx.navigateTo({
      url: '/pages/manage-data/index',
    })
  },

  // 子组件派发的点击sidebar事件
  onSidebar(item) {
    let cardListC = this.selectComponent('#cardListC')
    if (cardListC) {
      cardListC.onSidebar(item.detail)
    }

  },

  // 获取开机信息
  getBootUpData() {
    let _self = this
    wx.cloud.callFunction({
      name: 'handleBootUp',
      data: {
        handleType: 'get'
      }
    }).then((res) => {
      let resT = JSON.parse(JSON.stringify(res.result))
      wx.hideLoading()
      _self.setData({
        bootUpInfo: resT.data[0],
      })
    })

  },

})
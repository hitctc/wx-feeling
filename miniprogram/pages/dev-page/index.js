// pages/dev-page/index.js

Page({

  /**
   * 页面的初始数据
   */
  data: {

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

  },

  // 跳转用户管理页面
  jumpUsersManage() {
    wx.navigateTo({
      url: '/pages/users-manage/index',
    })
  },

  // 云开发例子
  jumpServiceExample() {
    wx.navigateTo({
      url: '/pages/index1/index',
    })
  },

  // 跳转感觉fell
  jumpFell() {
    wx.navigateTo({
      url: '/pages/mood/index',
    })
  },

  // 跳转key管理页面
  jumpSourceType() {
    wx.navigateTo({
      url: '/pages/manage-key-type/index',
    })
  },

  // 跳转管理开关页面
  jumpManageOnOff() {
    wx.navigateTo({
      url: '/pages/manage-on-off/index',
    })
  }
})
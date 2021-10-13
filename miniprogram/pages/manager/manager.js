// pages/manager/manager.js
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
    let manageAllSourceData = this.selectComponent('#manageAllSourceData')
    if (manageAllSourceData) {
      manageAllSourceData.getSource()
      manageAllSourceData._getSourceType()
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

  jumpPage(event) {
    let pageType = event.currentTarget.dataset.pageType
    if (pageType === '添加页') {
      wx.navigateTo({
        url: '/pages/add-m/add-m',
      })
    } else if (pageType === '首页') {
      wx.switchTab({
        url: '/pages/index/index',
      })
    }

  }
})
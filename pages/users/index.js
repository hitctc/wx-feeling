// pages/users/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgsrc: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getUserHeaderBG()
    let timer = setInterval(this._getUserHeaderBG, 1000 * 3)
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

  _getUserHeaderBG() {
    const imgAll = ['images/autumn.jpg', 'images/springtime.jpg', 'images/summer.jpg', 'images/winter.jpg']
    const random = Math.floor(Math.random() * 4)
    this.setData({
      imgsrc: imgAll[random]
    })
  }
})
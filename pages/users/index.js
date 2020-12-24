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
  onLoad: function(options) {
    this._getUserHeaderBG()
    let timer = setInterval(this._getUserHeaderBG, 1000 * 3)
  },

  onAdd() {
    const _self = this
    wx.navigateTo({
      url: '/pages/add-m/add-m'
    })
  },

  _getUserHeaderBG() {
    const imgAll = [ 'images/autumn.jpg', 'images/springtime.jpg', 'images/summer.jpg', 'images/winter.jpg' ]
    const random = Math.floor(Math.random() * 4)
    this.setData({
      imgsrc: imgAll[random]
    })
  }
})

// pages/add-m/add-m.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    radio: '1'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},
  onChange(event) {
    this.setData({
      radio: event.detail
    })
  }
})

// pages/movie-detail/movie-detail.js
Page({
  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},
  onCopy(e) {
    console.log('🚀 ~ file: movie-detail.js ~ line 13 ~ e', e)
    var _self = this
    const data = e.currentTarget.dataset.src  || e.currentTarget.dataset.code || ''
    console.log('🚀 ~ file: movie-detail.js ~ line 15 ~ data', data)
    wx.setClipboardData({
      data: data,
      success: function(res) {
        // _self.setData({copyTip:true}),
        // wx.showModal({
        //   title: '提示',
        //   content: '复制成功',
        //   success: function(res) {
        //     if (res.confirm) {
        //       console.log('确定')
        //     }
        //     else if (res.cancel) {
        //       console.log('取消')
        //     }
        //   }
        // })
      }
    })
  }
})

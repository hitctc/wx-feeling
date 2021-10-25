// pages/about/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isZsVisible: false,
    keyTypeList: [],
    loadingVisible: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 设置顶部导航bar的title
    wx.setNavigationBarTitle({
      title: '文案'
    })
    this._getKeyType()
  },

  // 跳转弹幕
  jumpdm() {
    wx.navigateToMiniProgram({
      appId: 'wx2ba3390eef60894c',
      path: ' /pages/zm-index/index',
      success(res) {
        console.info('success -> res打开成功 ----------- this.data.article', res)
      }
    })
  },

  // 跳转水果电影电视剧
  jumpMovie() {
    wx.navigateToMiniProgram({
      appId: 'wx6294b4749e40b1c8',
      path: ' /pages/index/index',
      success(res) {
        console.info('success -> res打开成功 ----------- this.data.article', res)
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

  onKey(event) {
    const item = event.currentTarget.dataset.item

    wx.navigateTo({
      url: `/pages/page-card/index?name=${item.name}`,
    })
  },

  // 获取所有key类型
  _getKeyType() {
    let _self = this
    _self.setData({
      loadingVisible: true
    })
    wx.cloud.callFunction({
      name: 'handleKeyType',
      data: {
        handleType: 'get'
      }
    }).then((res) => {
      let resT = JSON.parse(JSON.stringify(res.result))
      let resTT = resT.data.filter(item => item.isVisible && item.category == 'plate')
      wx.hideLoading()
      _self.setData({
        keyTypeList: resTT,
        loadingVisible: false
      })
    })
  },

})
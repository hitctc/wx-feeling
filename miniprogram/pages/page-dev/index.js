// pages/page-dev/index.js

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

  // 跳转用户管理页面
  jumpUsersManage() {
    wx.navigateTo({
      url: '/pages/manage-users/index',
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

  // 跳转管理标签
  jumpTag() {
    wx.navigateTo({
      url: '/pages/manage-tag-type/index',
    })
  },

  // 跳转管理开关页面
  jumpManageOnOff() {
    wx.navigateTo({
      url: '/pages/manage-on-off/index',
    })
  },

  jumpManageUpload() {
    wx.navigateTo({
      url: '/pages/manage-upload/index',
    })
  },

  jumpManageBootUp() {
    wx.navigateTo({
      url: '/pages/manage-boot-up/index',
    })
  },
})
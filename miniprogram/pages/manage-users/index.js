// pages/manage-users/index.js
let app = getApp()
wx.cloud.init({
  env: 'feel-6gdrrxeye8840e66'
})
const db = wx.cloud.database()

import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
import {
  _showToast
} from '../../utils/wxShowToast';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    allUsers: [{
      avatarUrl: "https://thirdwx.qlogo.cn/mmopen/vi_32/Cxp7icNXbU5trxZudKM2jOEmd1cDh0CibMMrNEwgPMJGhp73crRM3j9AibFQ3ibZLmiatiaCWL03eG85je24oojampqw/132",
      nickName: "小糖穿越火线",
      oId: "oCXQB49WooFaZYq_FuW-f3J0tZKI",
      openId: "oCXQB49WooFaZYq_FuW-f3J0tZKI",
      userType: "",
    }],
    editUserVisible: false,
    editUserInfo: {},
    editUserType: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAllUsers()
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

  // 获取所有用户
  getAllUsers() {
    let _self = this
    db.collection('users').get().then(res => {
      // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
      _self.setData({
        allUsers: res.data
      })
    })
  },

  // 编辑用户信息
  editUser(e) {
    this.setData({
      editUserVisible: true,
      editUserInfo: e.currentTarget.dataset.userData,
      editUserType: e.currentTarget.dataset.userData.userType
    })
  },


  // 确定提交接口
  confirmEditUser() {
    // 调用云函数
    let _self = this
    wx.showLoading({
      title: '修改中...',
    })
    wx.cloud.callFunction({
      name: 'editUser',
      data: {
        oId: this.data.editUserInfo.oId,
        userType: this.data.editUserType,
      }
    }).then(res => {
      wx.hideLoading({})
      _self.getAllUsers()
      app.globalData.userInfo.userType = _self.data.editUserType
      wx.setStorage({
        key: 'userInfo',
        data: app.globalData.userInfo
      })
      _showToast('修改完成')
    }).catch(console.error)
  },

  // 取消
  onClose(e) {
  },

  // 删除用户接口
  deleteUser(e) {
    let _self = this
    let oId = e.currentTarget.dataset.userData.oId

    Dialog.confirm({
      message: `删除需要走云函数。确认删除用户：${e.currentTarget.dataset.userData.nickName}？`,
    }).then(() => {
      wx.showLoading({
        title: `删除中...`,
      })
      wx.cloud.callFunction({
        name: 'deleteUser',
        data: {
          oId
        }
      }).then(res => {
        if (res.result) {
          _self.getAllUsers()
          wx.hideLoading({
            success: (res) => {
              _showToast('删除完成~')
            },
          })
        } else {
          wx.hideLoading({
            success: (res1) => {
              _showToast(`删除失败~${res}`)
            },
          })
        }
      }).catch(console.error)
    }).catch(() => {
      // on cancel
    });
  }
})
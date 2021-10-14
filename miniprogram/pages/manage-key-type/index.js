// pages/users-manage/index.js
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
    editUserVisible: false,
    editUserInfo: {},
    editUserType: '',

    keyInfo: {},
    _id: '',
    allKeyType: [],
    dialogVisible: false,
    isAddKeyType: true,
    keyTypeName: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAllKeyType()
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

  // 添加类型
  addSourceType() {
    // typeName
    this.setData({
      dialogVisible: true,
      isAddKeyType: true,
      keyTypeName: '',
    })
  },

  // 获取所以资源类型
  getAllKeyType() {
    let _self = this
    db.collection('key-type').get().then(res => {
      // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
      _self.setData({
        allKeyType: res.data
      })
    })
  },

  // 编辑
  editKeyTypeNama(event) {
    console.log('ACHUAN : editKeyTypeNama : event', event)
    let keyInfo = event.currentTarget.dataset.keyInfo

    this.setData({
      dialogVisible: true,
      isAddKeyType: false,
      keyInfo: keyInfo,
      keyTypeName: keyInfo.name
    })
    
  },
  // 修改或新增确定资源类型按钮
  confirmSourceType() {
    // 调用云函数
    let _self = this

    // 新增
    if (_self.data.isAddKeyType) {
      wx.showLoading({
        title: '正在努力添加...',
      })
      var args = {
        name: _self.data.keyTypeName,
        isVisible: true
      };
      db.collection('key-type').add({
        data: args
      }).then(res => {
        _showToast('添加完成~')
        _self.getAllKeyType()
      })
    } else {
      // 修改
      wx.showLoading({
        title: '正在努力修改名称...',
      })
      let _id = _self.data.keyInfo._id
      let isVisible = _self.data.keyInfo.isVisible
      let args = {
        _id,
        isVisible,
        name: _self.data.keyTypeName,
      };
      wx.cloud.callFunction({
        name: 'changeKeyType',
        data: args
      }).then(res => {
        if (res) {
          wx.hideLoading({
            success: (res) => {
              _showToast(`【${_self.data.keyTypeName}】，已更新`)
            },
          })
          _self.getAllKeyType()
        }
      }).catch(console.error)
    }
  },


  onClose(e) { },

  // 改变key是否可见
  visibleChange(event) {
    console.log('ACHUAN : visibleChange : event', event)
    let _self = this
    let item = event.currentTarget.dataset.item
    let _id = item._id
    let name = item.name
    let switchVal = event.detail.value
    let args = {
      _id,
      name,
      isVisible: switchVal,
    };
    // 调用云函数
    wx.showLoading({
      title: '正在努力修改是否可见...',
    })
    wx.cloud.callFunction({
      name: 'changeKeyType',
      data: args
    }).then(res => {
      if (res) {
        wx.hideLoading({
          success: (res) => {
            _showToast(`【${name}】可见，已更新`)
          },
        })
        _self.getAllKeyType()
      }
    }).catch(console.error)
  }

})
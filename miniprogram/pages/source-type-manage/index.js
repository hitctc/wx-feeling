// pages/users-manage/index.js
let app = getApp()
wx.cloud.init({
  env: 'cloud1-3gv4om0jed457476'
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
    editUserType: '',

    _id: '',
    allSourceType: [],
    dialogVisible: false,
    isAddSourceType: true,
    sourceTypeName: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAllSourceType()
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
      isAddSourceType: true,
      sourceTypeName: '',
    })
  },

  // 获取所以资源类型
  getAllSourceType() {
    let _self = this
    db.collection('resourceType').get().then(res => {
      // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
      _self.setData({
        allSourceType: res.data
      })
    })
  },
  editSourceTypeNama(e) {
    let attr = e.currentTarget.dataset.sourceInfo
    this.setData({
      dialogVisible: true,
      isAddSourceType: false,
      sourceTypeName: attr.sourceTypeName,
      _id: attr._id,
    })
  },
  // 确定资源类型按钮
  confirmSourceType() {
    // 调用云函数
    let _self = this
    // 新增
    if (_self.data.isAddSourceType) {
      var args = {
        sourceTypeName: _self.data.sourceTypeName,
      };
      db.collection('resourceType').add({
        data: args
      }).then(res => {
        _showToast('添加完成~')
        _self.getAllSourceType()
      })
    } else {
      let _id = _self.data._id
      let args = {
        sourceTypeName: _self.data.sourceTypeName,
      };
      db.collection('resourceType').doc(_id).update({
        data: args
      }).then(res => {
        if (res) {
          _showToast('添加完成~')
          _self.getAllSourceType()
        }
      }, err => {
      })
    }

  },
  onClose(e) {
  },

})
// pages/manage-boot-up/index.js
let app = getApp()
wx.cloud.init({
  env: 'feel-6gdrrxeye8840e66'
})
const db = wx.cloud.database()
import {
  _showToast
} from '../../utils/wxShowToast';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    _id: '',
    bootUpInfo: {},
    title: '',
    content: '',
    imgSrc: '',
    tip: '',
    shortTitle: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBootUpData()
  },

  // 获取所以资源类型
  getBootUpData() {
    wx.showLoading()
    let _self = this
    wx.cloud.callFunction({
      name: 'handleBootUp',
      data: {
        handleType: 'get'
      }
    }).then((res) => {
      let resT = JSON.parse(JSON.stringify(res.result))
      wx.hideLoading()
      _self.setData({
        _id: resT.data[0]._id,
        title: resT.data[0].title,
        shortTitle: resT.data[0].shortTitle,
        content: resT.data[0].content,
        tip: resT.data[0].tip,
        imgSrc: resT.data[0].imgSrc,
      })
    })

  },

  // 提交修改
  subChange() {
    let _self = this
    // 新增
    // 修改
    wx.showLoading({})
    let _id = _self.data._id
    let args = {
      title: _self.data.title,
      shortTitle: _self.data.shortTitle,
      content: _self.data.content,
      tip: _self.data.tip,
      imgSrc: _self.data.imgSrc || 'https://',
    };

    wx.cloud.callFunction({
      name: 'handleBootUp',
      data: {
        handleType: 'change',
        _id,
        args,
      }
    }).then(res => {
      if (res) {
        wx.hideLoading({
          success: (res) => {
            _showToast(`${_self.data.title}，已更新`)
          },
        })
        _self.getBootUpData()
      }
    }).catch(console.error)
  }
})
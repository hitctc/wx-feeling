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
    editUserVisible: false,
    editUserInfo: {},
    editUserType: '',

    keyInfo: {},
    _id: '',
    allKeyType: [],
    dialogVisible: false,
    isAddKeyType: true,
    keyTypeName: '',
    keyTypeCategory: '',
    keyTypeOrder: 100,
    order: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAllKeyType()
  },

  // 添加类型
  addSourceType() {
    // typeName
    this.setData({
      dialogVisible: true,
      isAddKeyType: true,
      keyTypeName: '',
      keyTypeCategory: '',
      keyTypeOrder: this.data.allKeyType.length + 2,
    })
  },

  // 获取所以资源类型
  getAllKeyType() {
    wx.showLoading()
    let _self = this
    wx.cloud.callFunction({
      name: 'handleKeyType',
      data: {
        handleType: 'get'
      }
    }).then((res) => {
      let resT = JSON.parse(JSON.stringify(res.result))
      wx.hideLoading()
      _self.setData({
        allKeyType: resT.data
      })
    })
  },

  // 编辑
  editKeyTypeNama(event) {
    let keyInfo = event.currentTarget.dataset.keyInfo

    this.setData({
      dialogVisible: true,
      isAddKeyType: false,
      keyInfo: keyInfo,
      keyTypeName: keyInfo.name,
      keyTypeCategory: keyInfo.category || '-',
      keyTypeOrder: keyInfo.order || this.data.allKeyType.length + 2
    })

  },

  // 修改或新增确定资源类型按钮
  confirmSourceType() {
    let _self = this

    // 新增
    if (_self.data.isAddKeyType) {
      wx.showLoading({
        title: '正在努力添加...',
      })
      let order = parseInt(_self.data.keyTypeOrder)
      var args = {
        name: _self.data.keyTypeName,
        category: _self.data.keyTypeCategory,
        order,
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
      let order = parseInt(_self.data.keyTypeOrder)

      let args = {
        name: _self.data.keyTypeName,
        category: _self.data.keyTypeCategory || '-',
        order,
        isVisible,
      };

      wx.cloud.callFunction({
        name: 'handleKeyType',
        data: {
          handleType: 'change',
          _id,
          args,
        }
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

  deleteKeyTypeNama(event) {
    const _self = this
    let item = event.currentTarget.dataset.item
    let _id = item._id
    let name = item.name

    wx.showModal({
      title: '提示',
      content: `是否删除，${name}`,
      success(res) {
        if (res.confirm) {
          // 调用云函数
          var args = {
            _id,
            handleType: 'delete',
          };
          wx.showLoading()
          wx.cloud.callFunction({
            name: 'handleKeyType',
            data: args
          }).then(res => {
            if (res) {
              wx.hideLoading({
                success: (res) => {
                  _showToast(`${name} 删除完成了`)
                },
              })
              _self.getAllKeyType()
            }
          }).catch(console.error)

        } else if (res.cancel) {
          console.warn('用户点击取消')
        }
      }
    })
  },


  onClose(e) {},

  // 改变key是否可见
  visibleChange(event) {
    let _self = this
    let item = event.currentTarget.dataset.item
    let _id = item._id
    let name = item.name || '-'
    let category = item.category || '-'
    let order = item.order || ''
    let switchVal = event.detail.value
    let args = {
      name,
      category,
      order,
      isVisible: switchVal,
    };
    // 调用云函数
    wx.showLoading({
      title: '正在努力修改是否可见...',
    })
    wx.cloud.callFunction({
      name: 'handleKeyType',
      data: {
        handleType: 'change',
        _id,
        args,
      }
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
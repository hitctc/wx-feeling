// components/index/nav-tab/index.js
let app = getApp()
import envData from "../../../envList.js";
wx.cloud.init({
  env: envData.envList.envId,
})
const db = wx.cloud.database()

import {
  _showToast
} from '../../../utils/wxShowToast';

Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    active: 1,
    keyTypeList: [],
    userInfo: {},
  },

  lifetimes: {
    ready() {
      // 页面显示的时候会调用一次数据，因此不用重复调用
      let userInfoT = wx.getStorageSync('userInfo') || {}
      this.setData({
        userInfo: userInfoT
      })

      // 请求资源数据
      this._getKeyType()
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击侧边栏
    onSidebar(event) {
      let index = event.currentTarget.dataset.index
      let item = event.currentTarget.dataset.item
      this.setData({
        active: index
      })
      this.triggerEvent('onSidebar', item)
    },

    // 获取所有key类型
    _getKeyType() {
      let _self = this
      wx.cloud.callFunction({
        name: 'handleKeyType',
        data: {
          handleType: 'get'
        }
      }).then((res) => {
        let resT = JSON.parse(JSON.stringify(res.result))
        let resTT = resT.data.filter(item => item.isVisible && (item.category == 'home' || item.category == 'all'))
        _self.setData({
          keyTypeList: resTT
        })
      })
    },

  }
})
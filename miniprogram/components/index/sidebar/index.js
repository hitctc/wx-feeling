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
    active: 0,
    keyTypeList: [],
  },

  lifetimes: {
    ready() {
      // 页面显示的时候会调用一次数据，因此不用重复调用
      this._getSourceType()
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击侧边栏
    onSidebar(event) {
      console.log('ACHUAN : onSidebar : event', event)
      let index = event.currentTarget.dataset.index
      let item = event.currentTarget.dataset.item
      this.setData({
        active: index
      })
      this.triggerEvent('onSidebar', item)
    },

    // 获取所有key类型
    _getSourceType() {
      let _self = this
      const db = wx.cloud.database()

      db.collection('key-type').get().then(res => {
        console.log('ACHUAN : db.collection : res', res)
        // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
        let resT = res.data.filter(item => item.isVisible)
        _self.setData({
          keyTypeList: resT
        })
      }).catch(err => {
        console.error('ACHUAN : db.collection : err', err)
      })
    },

  }
})
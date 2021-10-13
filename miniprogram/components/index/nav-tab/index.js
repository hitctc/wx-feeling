// components/index/nav-tab/index.js
let app = getApp()
import envData from "../../../envList.js";
console.log('ACHUAN :  envData.envList.envId',  envData.envList.envId)

wx.cloud.init({
  env: envData.envList.envId
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
    page: 1,
    active: 0,
    sourceList: [],
    allSourceType: [],
    sourceTypeNameActive: '首页',
    loadingVisible: true,
    isMore: false,
    isFinish: false,

    isDown: false,
    onOffList: [],

  },

  lifetimes: {
    ready() {
      // 页面显示的时候会调用一次数据，因此不用重复调用
      setTimeout(() => {
        this.setData({
          loadingVisible: false
        })
        if (this.data.sourceList.length === 0) {
          _showToast('首次加载点点慢，请稍微等待~')
        }
      }, 5000)

    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击tab修改
    onChangeTab(event) {
      this.setData({
        page: 1,
        sourceList: [],
        loadingVisible: true,
        active: event.detail.name,
        sourceTypeNameActive: event.detail.title,
        isFinish: false
      })
      this.getSource()
    },
    // 获取所以资源
    async getSource(hitBottom = false) {
      let _self = this
      let sourceTypeNameActiveT = _self.data.sourceTypeNameActive
      let sourceDataT = wx.getStorageSync(sourceTypeNameActiveT)
      let isDownT = _self.data.isDown
      // let onOffList = []
      // 先拿到开关数据数据
      // await db.collection('on-off').get().then(res => {
      //   // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
      //   onOffList = res.data
      //   _self.setData({
      //     onOffList: res.data
      //   })
      // })
      // 拿缓存数据来显示,不是底部加载,也不是下拉刷新
      if (sourceDataT.length > 0 && !hitBottom && !isDownT) {
        this.setData({
          sourceList: sourceDataT,
          loadingVisible: false,
          active: _self.data.active || 0,
        })
        return
      } else {
        // 无缓存,拿数据库数据
        wx.cloud.callFunction({
          name: 'getSource',
          data: {
            page: _self.data.page,
            sourceTypeName: _self.data.sourceTypeNameActive
          },
        }).then(res => {
          // globalData
          let dataT = JSON.parse(JSON.stringify(res.result.data))
          // onOffList.forEach(item => {
          //   if (item.dataName === '资源链接是否可见' && !item.isVisible) {
          //     // 不出局的显示
          //     dataT = dataT.filter(itemI => !itemI.isOut)
          //   }
          // });
          // 处理数据
          _self._handingSource(dataT)
        })
      }
    },

    // 获取所有资源类型
    _getSourceType() {
      let _self = this
      db.collection('resourceType').get().then(res => {
        // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
        let resT = res.data.filter(item => item.isVisible)
        _self.setData({
          allSourceType: resT
        })
      })
    },

    // 数据获取后操作数据
    _handingSource(data) {
      // 下拉先穷原先的数据
      if (this.data.isDown) {
        this.setData({
          sourceList: []
        })
      }

      let sourceListT = JSON.parse(JSON.stringify(this.data.sourceList)).concat(data)
      // 处理成多个数据的逻辑
      // allSourceTypeT.forEach(item_i => {
      //   dataT.push({
      //     name: item_i.sourceTypeName,
      //     data: []
      //   })
      // });
      // data.forEach(item_j => {
      //   item_j.sourceType.forEach(item_k => {
      //     dataT.forEach(item_l => {
      //       if (item_l.name === item_k) {
      //         item_l.data.push(item_j)
      //       }
      //     });
      //   });
      // });

      sourceListT.forEach(item => {
        var dayjs = require("../../../utils/day.js")
        var timestamp = (new Date()).valueOf();
        let dateIssuedT = item.dateIssued
        let day7 = dayjs(dateIssuedT).add(7, 'day') // 7天后
        let timestamp7 = dayjs(day7.$d).valueOf() // 7天后的时间戳
        item.isNew = timestamp7 > timestamp
      });

      this.setData({
        sourceList: sourceListT,
        isMore: false,
        loadingVisible: false,
        active: this.data.active || 0,
        isFinish: data.length === 0
      })

      if (this.data.isDown) {
        setTimeout(() => {
          wx.stopPullDownRefresh()
          this.setData({
            isDown: false
          })
        }, 500)
      }
      // 缓存前10条数据
      wx.setStorageSync(this.data.sourceTypeNameActive, this.data.sourceList.slice(0, 10))
    },

    // 触底加载下一页,父组件触底后调用
    _reachBottom() {
      this.setData({
        page: this.data.page + 1,
        isMore: true
      })
      this.getSource(true)
    },

    // 下拉刷新
    _reachDown() {
      this.setData({
        page: 1,
        isDown: true,
      })
      this.getSource()
    },


  }
})
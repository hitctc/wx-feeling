// components/index/nav-tab/index.js
let app = getApp()
import envData from "../../../envList.js";

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
      }, 5000)
      this.getSource()

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
      console.log('ACHUAN : getSource : hitBottom', hitBottom)

      let _self = this
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
        console.log('ACHUAN : getSource : dataT', dataT)
        // 处理数据
        _self._handingSource(dataT)
      })
    },

    // 数据获取后操作数据
    _handingSource(data) {
      // 合并数据
      let sourceListT = JSON.parse(JSON.stringify(this.data.sourceList)).concat(data)

      // 是否为最新的标记
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
        isFinish: data.length === 0
      })
      console.log('ACHUAN : _handingSource : sourceList', this.data.sourceList)



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

    /** 
     * 上滑加载更多 
     */
    scrollToLower: function (e) {
      console.log('上滑加载更多')
      console.info('scrollToLower', e);

      this.setData({
        page: this.data.page + 1,
        isMore: true
      })
      this.getSource(true)
    },


  }
})
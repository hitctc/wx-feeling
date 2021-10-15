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
    userInfo: {},
    page: 1,
    pyqDataList: [],
    allSourceType: [],
    keyTypeNameActive: 'ALL',
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
      this.getPyqData()
      let userInfoT = wx.getStorageSync('userInfo') || {}
      this.setData({
        userInfo: userInfoT
      })

    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 父组件派发的：点击sidebar事件
    onSidebar(item) {
      // onSidebar
      console.log('ACHUAN : onSidebar : item', item)

      this.setData({
        page: 1,
        pyqDataList: [],
        isFinish: false,
        loadingVisible: true,
        keyTypeNameActive: item.name,
      })
      this.getPyqData()
    },

    // 获取所以资源
    async getPyqData(hitBottom = false) {
      let _self = this
      console.log('ACHUAN : getPyqData : hitBottom', hitBottom)

      // 拿缓存数据来显示,不是底部加载,也不是下拉刷新
      // 无缓存,拿数据库数据
      let args = {
        page: _self.data.page,
        keyTypeNameActive: _self.data.keyTypeNameActive
      }
      console.log('ACHUAN : getPyqData : args', args)

      wx.cloud.callFunction({
        name: 'getPyqData',
        data: args,
      }).then(res => {
        // globalData
        let dataT = JSON.parse(JSON.stringify(res.result.data))
        console.log('ACHUAN : getPyqData : dataT', dataT)
        // 处理数据
        _self._handingSource(dataT)
      })
    },

    // 数据获取后操作数据
    _handingSource(data) {
      // 合并数据
      let pyqDataListT = JSON.parse(JSON.stringify(this.data.pyqDataList)).concat(data)

      // 是否为最新的标记
      pyqDataListT.forEach(item => {
        var dayjs = require("../../../utils/day.js")
        var timestamp = (new Date()).valueOf();
        let dateIssuedT = item.dateIssued
        let day7 = dayjs(dateIssuedT).add(7, 'day') // 7天后
        let timestamp7 = dayjs(day7.$d).valueOf() // 7天后的时间戳
        item.isNew = timestamp7 > timestamp
      });

      this.setData({
        pyqDataList: pyqDataListT,
        isMore: false,
        loadingVisible: false,
        isFinish: data.length === 0
      })
      console.log('ACHUAN : _handingSource : pyqDataList', this.data.pyqDataList)



      // 缓存前10条数据
      wx.setStorageSync(this.data.keyTypeNameActive, this.data.pyqDataList.slice(0, 10))
    },

    // 触底加载下一页,父组件触底后调用
    _reachBottom() {
      this.setData({
        page: this.data.page + 1,
        isMore: true
      })
      this.getPyqData(true)
    },

    // 下拉刷新
    _reachDown() {
      this.setData({
        page: 1,
        isDown: true,
      })
      this.getPyqData()
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
      this.getPyqData(true)
    },

    // 跳转详情
    // 复制成功
    onCopy(event) {
      // 点击复制
      const item = event.currentTarget.dataset.item
      let content = item.content
      if (content === '') {
        _showToast('无可复制内容~')
        return
      }
      wx.setClipboardData({
        data: content,
        success: function (res) {
          // todo 复制成功之后走一次接口，记录被复制的次数
          _showToast(`已复制：【${content}】`)
        }
      })
    },

    // 跳转详情页
    jumpDetail(event) {
      let item = JSON.parse(JSON.stringify(event.currentTarget.dataset.item))
      console.log('ACHUAN : jumpDetail : item', item)
      // 跳转页面，传递数据
      wx.navigateTo({
        url: `/pages/manage-data/index?pageType=change&_id=${item._id}`
      })
    }


  }
})
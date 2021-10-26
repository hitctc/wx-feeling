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
    keyTypeNameActive: '热门',
    loadingVisible: true,
    transitionShow: false,
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
        userInfo: userInfoT,
        transitionShow: false
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
      this.setData({
        page: 1,
        pyqDataList: [],
        isFinish: false,
        loadingVisible: true,
        keyTypeNameActive: item.name,
      })
      this.getPyqData()
    },

    // 获取keyType的对应数据
    async getPyqData(hitBottom = false) {
      let _self = this
      _self.setData({
        transitionShow: false,
      })
      // 拿缓存数据来显示,不是底部加载,也不是下拉刷新
      // 无缓存,拿数据库数据
      let args = {
        page: _self.data.page,
        keyTypeNameActive: _self.data.keyTypeNameActive
      }
      wx.cloud.callFunction({
        name: 'getPyqData',
        data: args,
      }).then(res => {
        // globalData
        let dataT = JSON.parse(JSON.stringify(res.result.data))
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
        let day3 = dayjs(dateIssuedT).add(3, 'day') // 3天后
        let timestamp3 = dayjs(day3.$d).valueOf() // 3天后的时间戳
        item.isNew = timestamp3 > timestamp
      });
      this.setData({
        pyqDataList: pyqDataListT,
        isMore: false,
        loadingVisible: false,
        isFinish: data.length === 0,
        transitionShow: pyqDataListT.length == 0
      })
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
      console.info('scrollToLower', e);
      this.setData({
        page: this.data.page + 1,
        isMore: true
      })
      this.getPyqData(true)
    },

    // 复制成功
    onCopy(event) {
      // 点击复制
      const _self = this
      const item = event.currentTarget.dataset.item
      console.log('ACHUAN : onCopy : item', item)
      let content = item.content
      let copyCountT = parseInt(item.copyCount) + 1
      let lookCountT = parseInt(item.lookCount) + 2
      let _id = item._id
      if (content === '') {
        _showToast('无可复制内容~')
        return
      }
      wx.setClipboardData({
        data: content,
        success: function (res) {
          // todo 复制成功之后走一次接口，记录被复制的次数
          _showToast(`已复制：${content}`)
          _self._copyAdd(_id, copyCountT, lookCountT)
        }
      })
    },

    // copy自增成功
    _copyAdd(_id, copyCountT, lookCountT) {
      let copyCount = copyCountT
      let lookCount = lookCountT
      wx.cloud.callFunction({
        name: 'handleData',
        data: {
          handleType: 'changeCopy',
          _id,
          copyCount,
          lookCount
        }
      }).then((res) => {
        console.info('copy数量增加完成。')
      })
    },


    // 跳转详情页
    jumpDetail(event) {
      let item = JSON.parse(JSON.stringify(event.currentTarget.dataset.item))
      // 跳转页面，传递数据
      wx.navigateTo({
        url: `/pages/manage-data/index?pageType=change&_id=${item._id}`
      })
    },


  }
})
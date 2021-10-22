// pages/page-card/index.js
import {
  _showToast
} from "../../utils/wxShowToast.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    pyqDataList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let name = options.name

    wx.setNavigationBarTitle({
      title: `文案${name}`
    })

    this.setData({
      title: name
    })
    this._getPyqData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

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
        _showToast(`已复制：${content}`)
      }
    })
  },

  // 获取所以资源
  async _getPyqData() {
    let _self = this
    let args = {
      name: _self.data.title
    }

    wx.cloud.callFunction({
      name: 'handleData',
      data: {
        args,
        handleType: 'card'
      },
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
      var dayjs = require("../../utils/day.js")
      var timestamp = (new Date()).valueOf();
      let dateIssuedT = item.dateIssued
      let day3 = dayjs(dateIssuedT).add(3, 'day') // 3天后
      let timestamp3 = dayjs(day3.$d).valueOf() // 3天后的时间戳
      item.isNew = timestamp3 > timestamp
    });

    this.setData({
      pyqDataList: pyqDataListT,
      loadingVisible: false,
    })
  },
})
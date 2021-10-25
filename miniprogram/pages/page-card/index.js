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
    pyqDataList: [],
    loadingVisible: false,
    transitionShow: false
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
      title: name,
      loadingVisible: false,
      transitionShow: false
    })
    this._getPyqData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

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
      console.info('copy数量增加完成！')
    })
  },

  // 获取所以资源
  async _getPyqData() {
    let _self = this
    let args = {
      name: _self.data.title
    }
    _self.setData({
      loadingVisible: true
    })

    wx.cloud.callFunction({
      name: 'handleData',
      data: {
        args,
        handleType: 'card'
      },
    }).then(res => {
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
      transitionShow: pyqDataListT.length == 0
    })
  },
})
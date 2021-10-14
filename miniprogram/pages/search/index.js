// pages/search/index.js
import {
  _showToast
} from "../../utils/wxShowToast.js";
let app = getApp()
wx.cloud.init({
  env: 'feel-6gdrrxeye8840e66'
})
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    searchVal: '',
    isEmptVisible: false,
    page: 1,
    sourceList: [],
    isMore: false,
    isFinish: false,
    loadingVisible: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: wx.getStorageSync('userInfo') || {}
    })
    this.getSource()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      page: this.data.page + 1,
      isMore: true
    })
    this.getSource(true)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  // 点击搜索
  handleSearch(event) {
    let val = event.detail.value
    if (val == '') {
      _showToast('搜索为空，显示所有影视')
      let sourceDataT = wx.getStorageSync('首页')
      this.setData({
        sourceList: sourceDataT,
        isEmptVisible: sourceDataT.length == 0
      })
      return
    }
    wx.showLoading({
      title: `【${val}】搜索中...`,
    })

    let _ = db.command
    db.collection('resource')
      .where(_.or([{ // 标题
        title: db.RegExp({ // 使用正则查询，实现对搜索的模糊查询
          regexp: val,
          options: 'i', //大小写不区分
        }),
      },
      { // 内容
        content: db.RegExp({
          regexp: val,
          options: 'i',
        }),
      }
      ])).get()
      .then(res => {
        wx.hideLoading({})
        this.setData({
          isEmptVisible: res.data.length == 0,
          sourceList: res.data
        })
      })
      .catch(res => {
        wx.hideLoading({
          success: (res) => {
            _showToast('搜索失败，联系客服')
          },
        })
        this.setData({
          isEmptVisible: true
        })
      })

    // setTimeout(() => {
    //   this.setData({
    //     isEmptVisible: true
    //   })
    //   wx.hideLoading({
    //     success: (res) => {},
    //   })
    // }, 1500)
  },

  // 跳转详情页
  onDetail(e) {
    let item = JSON.parse(JSON.stringify(e.currentTarget.dataset.item))
    // 跳转页面，传递数据
    wx.navigateTo({
      url: `/pages/movie-detail/index?_id=${item._id}`
    }).then((res) => {
      // 传递数据到
      res.eventChannel.emit('setItemData', {
        data: item
      })
    })

  },

  // 跳转添加按钮
  jumpAddMovie() {
    wx.navigateTo({
      url: '/pages/manage-data/index',
    })
  },
  // 返回按钮
  backPage() {
    this.setData({
      isEmptVisible: false
    })
  },

  // 获取所以资源
  async getSource(hitBottom = false) {
    let _self = this
    let sourceTypeNameActiveT = '首页'
    _self.setData({
      loadingVisible: true
    })
    // 无缓存,拿数据库数据
    await wx.cloud.callFunction({
      name: 'getSource',
      data: {
        page: _self.data.page,
        sourceTypeName: _self.data.sourceTypeNameActive
      },
    }).then(res => {
      // globalData
      let dataT = JSON.parse(JSON.stringify(res.result.data))
      // 处理数据
      _self._handingSource(dataT)
    }).catch(err => {
      let sourceDataT = wx.getStorageSync(sourceTypeNameActiveT)
      this.setData({
        sourceList: sourceDataT
      })
      return
    })

  },

  // 数据获取后操作数据
  _handingSource(data) {
    let sourceListT = JSON.parse(JSON.stringify(this.data.sourceList))
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
    this.setData({
      sourceList: sourceListT.concat(data),
      isMore: false,
      isFinish: data.length === 0,
      loadingVisible: false
    })
    // 缓存前10条数据
    wx.setStorageSync(this.data.sourceTypeNameActive, this.data.sourceList.slice(0, 10))


  },

})
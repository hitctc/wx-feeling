// pages/random-feel/index.js
const app = getApp().globalData
var animate = null
var nowAnimate = 0

import envData from "../../envList.js";
wx.cloud.init({
  env: envData.envList.envId,
})
const db = wx.cloud.database()



import {
  _showToast
} from '../../utils/wxShowToast';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    state: '开始',
    randomVisible: false, // 
    bigtitlehide: false,
    userInfo: {},
    pyqDataList: [{
        content: "活的潇洒一点 让笑容成为心情 而不是表情",
        selectTagTypeArr: ['1', '2'],
      },
      {
        content: "活的潇洒一点 让笑容成为心情 而不是表情",
        selectTagTypeArr: ['1', '2'],

      },
    ],
  },

  onLoad() {
    let userInfoT = wx.getStorageSync('userInfo') || {}
    this.setData({
      userInfo: userInfoT
    })

  },

  // 开始随机
  async refreshRandom() {
    wx.showLoading({
      title: '正在搜寻中...',
    })

    // 获取所有key类型
    let _self = this
    let keyTypeList = []
    let tagTypeList = []
    const db = wx.cloud.database()

    await db.collection('key-type').get().then(res => {
      // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
      let resT = res.data.filter(item => item.isVisible)
      keyTypeList = resT
    }).catch(err => {
      console.error('ACHUAN : db.collection : err', err)
    })

    await wx.cloud.callFunction({
      name: 'getTagType'
    }).then(res => {
      if (res) {
        tagTypeList = res.result.data
      }
    }).catch((err) => {
      console.error('ACHUAN : db.collection : err', err)
    })

    wx.hideLoading({})

    // 随机心情
    function shuffle(arr) {
      var len = arr.length;
      for (var i = 0; i < len - 1; i++) {
        var index = parseInt(Math.random() * (len - i));
        var temp = arr[index];
        arr[index] = arr[len - i - 1];
        arr[len - i - 1] = temp;
      }
      return arr;
    }

    var keyTypeListT = shuffle(JSON.parse(JSON.stringify(keyTypeList.concat(tagTypeList)))); // 打乱数组，结果不唯一
    // 循环出随机的坐标位置和字体大小
    for (var i = 0; i < keyTypeListT.length; i++) {
      console.log(Math.floor(Math.random() * 70));
      var fontsize = 30 + Math.floor(Math.random() * 40)
      var x = Math.floor(Math.random() * 80)
      var y = Math.floor(Math.random() * 70)
      keyTypeListT[i].fontsize = fontsize
      keyTypeListT[i].x = x
      keyTypeListT[i].y = y
      keyTypeListT[i].show = false
    }

    _self.setData({
      randoms: keyTypeListT
    })


    animate = setInterval(function () {
      // 计时器让randoms显示出来
      _self.setData({
        ['randoms[' + nowAnimate + '].show']: true
      })
      nowAnimate++
      console.log('ACHUAN : nowAnimate', nowAnimate)
      // 长度相等的时候
      if (nowAnimate == _self.data.randoms.length) {
        console.log('ACHUAN : animate', animate)
        if (animate) {
          clearInterval(animate)
          _self.setData({
            state: '停止',
            bigtitlehide: true,
            randomVisible: false,
            randoms: []
          })
          nowAnimate = 0
          _self.refreshRandom()
        }
      }
    }, 900)
  },

  // 开始随机按钮
  onButton() {
    var that = this
    if (this.data.state == '开始') {
      this.setData({
        state: '停止',
        bigtitlehide: true,
        randomVisible: false,
        randoms: []
      })
      this.refreshRandom()
    } else if (this.data.state == '停止') {
      var random_index = Math.floor(Math.random() * this.data.randoms.length)
      this.setData({
        state: '开始',
        randomVisible: true,
        random: this.data.randoms[random_index]
      })
      if (animate) {
        clearInterval(animate)
      }
      nowAnimate = 0
    }
  },

  // 点击心情
  onFeel(event) {
    console.log('ACHUAN : onFeel : event', event)
  },

  onHide() {
    this.setData({
      state: '开始',
      bigtitlehide: false,
      randomVisible: false,
      randoms: []
    })
    clearInterval(animate)

  },

})
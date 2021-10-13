// components/flutter/index.js
import { formatData } from "../../utils/formatData.js"
// import Dialog from '@vant/weapp/dialog/dialog'

// import {
//   HTTPMoodModel
// } from '../../http/models/mood.js'

// const httpMoodModel = new HTTPMoodModel()

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    keyword: Object,
    YYYYMMDDnorm: null,
    colorArr: ["#f2826a", "#7232dd", "#ffe1e1", "#ad0000", "#CCFFFF", "#99CCCC", "#FFCCCC", "#FF6666", "#99CCFF", "#003300", "#99CC00", "#993333", "#99CCFF", "#99CCFF", "#CCCC00", "#CCFF99",],
    randomIntegers: Math.ceil(Math.random() * 5)
  },

  attached() {
    let todayKey = []
    let YYYYMMDDnorm = formatData().YYYYMMDDnorm
    // httpMoodModel.getMoodKey().then((res) => {
    //   res.result.filter(item => {
    //     if (item.time === YYYYMMDDnorm) {
    //       todayKey.push(item)
    //       this.setData({
    //         keyword: todayKey,
    //         YYYYMMDDnorm: YYYYMMDDnorm
    //       })
    //     }
    //   })
    // })
    // 根据单个名字筛选
    // keyword.res.filter(item => {
    //   if (item.time === YYYYMMDDnorm) {
    //     todayKey.push(item)
    //   }
    // })
  },


  /**
   * 组件的方法列表
   */
  methods: {
    onFlutter(event) {
      const keyword = event.detail.value || event.currentTarget.dataset.keyword
      // const mooddesc = event.detail.value || event.currentTarget.dataset.mooddesc
      // const allmood = event.detail.value || event.currentTarget.dataset.allmood
      // Dialog.alert({
      //   context: this,
      //   title: '',
      //   message: `${mooddesc}`
      // }).then(() => {
      //   // on close
      // });
      wx.navigateTo({
        url: `/pages/mood-detail/index?keyword=${keyword}`
        // success: function (res) {
        //   // 通过eventChannel向被打开页面传送数据
        //   res.eventChannel.emit('acceptDataFromOpenerPage', {
        //     "mood": mood,
        //     "mooddesc": mooddesc,
        //     "allMood": allMood
        //   })
        // }
      })
    },
  }
})

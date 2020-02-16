// components/flutter/index.js
import { xqData } from "../../resource/xq.js"
import { formatData } from "../../utils/formatData.js"
import Dialog from '@vant/weapp/dialog/dialog'

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
    xqData: Object,
    colorArr: ["#f2826a", "#7232dd", "#ffe1e1", "#ad0000", "#CCFFFF", "#99CCCC", "#FFCCCC", "#FF6666", "#99CCFF", "#003300", "#99CC00", "#993333", "#99CCFF", "#99CCFF", "#CCCC00", "#CCFF99",],
    randomIntegers: Math.ceil(Math.random() * 5),
    YYYYMMDD: null
  },

  attached() {
    let YYYYMMDD = formatData().YYYYMMDD
    this.setData({
      xqData: xqData.res[YYYYMMDD],
      YYYYMMDD: YYYYMMDD
    })
  },


  /**
   * 组件的方法列表
   */
  methods: {
    onFlutter(event) {
      console.log(event)
      const mood = event.detail.value || event.currentTarget.dataset.mood
      const mooddesc = event.detail.value || event.currentTarget.dataset.mooddesc
      // Dialog.alert({
      //   context: this,
      //   title: '',
      //   message: `${mooddesc}`
      // }).then(() => {
      //   // on close
      // });
      wx.navigateTo({
        url: `/pages/mood-detail/index?mood=${mood}&mooddesc=${mooddesc}`
      })
    },
  }
})

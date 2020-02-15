// components/flutter/index.js
import { xqData } from "../../resource/xq20200213.js"
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
    colorArr: ["#f2826a", "#7232dd", "#ffe1e1", "#ad0000", "#f2826a", "#f2826a", "#f2826a", "#f2826a", "#f2826a", "#f2826a", "#f2826a", "#f2826a", "#f2826a", "#f2826a", "#f2826a", "#f2826a", "#f2826a", "#f2826a"]
  },

  attached() {
    console.log(xqData.res)
    this.setData({
      xqData : xqData.res
    })
    console.log(this.data.xqData)
  },


  /**
   * 组件的方法列表
   */
  methods: {

  }
})

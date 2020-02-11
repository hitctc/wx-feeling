// components/epsoide/epsoide.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: {
      type: Number,
      observer: function (newVal) {
        let val = newVal < 10 ? '0' + newVal : newVal
        // 不要直接去改变属性的值
        this.setData({
          _index: val
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    months: [
      '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月',
      '十二月'
    ],
    year: 0,
    month: '',
    _index: ''
  },

  attached: function () {
    let data = new Date()
    let year = data.getFullYear()
    let month = data.getMonth()
    this.setData({
      year: year,
      month: this.data.months[month]
    })
  },

  ready: function () {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
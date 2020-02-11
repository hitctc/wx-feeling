// components/tag/tag.js
Component({
  /**
   * 组件的属性列表
   */

  // 启用slot
  options: {
    multipleSlots: true
  },
  
  // 外部class
  externalClasses: ['tag-styl'],

  properties: {
    text: String
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(event) {
      this.triggerEvent('tapping', {
        text: this.properties.text
      })
    }
  }
})

// components/image-button/image-button.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    multipleSlots: true
  },

  properties: {
    openType: {
      type: String
    }
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
    // 将拿到的信息给到组件的外部
    onGetUserInfo(event) {
      this.triggerEvent('getuserinfo', event.detail, {})
    }
  }
})
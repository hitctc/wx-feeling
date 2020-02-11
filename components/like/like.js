// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    like: {
      type: Boolean
    },
    count: {
      type: Number,
      value: 1
    },
    readOnly: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 数据绑定
    // 三元表达式
    // 封装性 开放性
    // 封装在内部 ，开放出来的
    // 粒度
    // 非常简单的功能   非常复杂的功能
    yesLike: 'images/like-icon.png',
    noLike: 'images/like-dis-icon.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 自定义事件
    onLike: function(event) {
      if (this.properties.readOnly) {
        return
      }
      let like = this.properties.like
      let count = this.properties.count
      count = like ? count - 1 : count + 1
      this.setData({
        count: count,
        like: !like
      })
      // 激活
      let behavior = this.properties.like ? 'like' : 'cancel'
      // 把喜欢不喜欢放到detail中
      this.triggerEvent('like', {
        behavior: behavior
      }, {})
    }
  }
})
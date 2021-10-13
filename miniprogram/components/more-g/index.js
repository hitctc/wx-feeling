// components/welcome-g/index.js
// const app = app()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    moreVisible: {
      type: Boolean,
      value: false
    },
    isFinish: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  lifetimes: {
    created() {
      // 在组件实例刚刚被创建时执行
    },
    attached() {
      // 在组件实例进入页面节点树时执行
      // this.setData({
      //   moreVisible: true,
      // })
    },
    ready() {
      // 在组件在视图层布局完成后执行
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    hideMoreG(that, param, opacity) {
      var animation = wx.createAnimation({
        //持续时间800ms
        duration: 600,
        timingFunction: 'ease',
      });
      //var animation = this.animation
      animation.opacity(opacity).step()
      //将param转换为key
      var json = '{"' + param + '":""}'
      json = JSON.parse(json);
      json[param] = animation.export()
      //设置动画
      that.setData(json)
      setTimeout(() => {
        that.setData({
          moreVisible: false
        })
      }, 600)
    }

  }
})

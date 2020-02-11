// components/classic/movie/movie.js
import {
  classicBeh
} from '../classic-beh.js'

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBeh],
  // 继承属性活data就近原则，最后的覆盖前面的；
  // 生命周期除外，生命周期函数将会依次执行，不存在覆盖。
  properties: {
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

  }
})

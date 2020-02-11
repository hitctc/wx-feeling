// components/classic/music/music.js
import {
  classicBeh
} from '../classic-beh.js'

// 拿到音乐管理对象
const mMgr = wx.getBackgroundAudioManager()

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBeh],
  properties: {
    src: {
      type: String
    },
    title: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: false,
    pauseSrc: 'images/player@pause.png',
    playSrc: 'images/player@play.png'
  },

  // 使用vx:if才会走，在组件实例进入页面节点树时执行
  attached() {
    this._recoverStatus()
    this._monitorSwitch()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay: function () {
      let playing = this.data.playing
      if (!playing) {
        // 第一步图片切换
        this.setData({
          playing: true
        })
        console.log(this.properties.src)
        mMgr.title = this.properties.title
        mMgr.src = this.properties.src
      } else {
        this.setData({
          playing: false
        })
        mMgr.pause()
      }
    },
    // 恢复显示按钮状态
    _recoverStatus: function () {
      console.log(mMgr.paused)
      if (mMgr.paused) {
        this.setData({
          playing: false
        })
        return
      }
      console.log(mMgr.src == this.properties.src)
      if (mMgr.src == this.properties.src) {
        this.setData({
          playing: true
        })
      }
    },
    _monitorSwitch: function () {
      // 点击播放回调
      mMgr.onPlay(() => {
        this._recoverStatus()
      })
      // 暂停回调
      mMgr.onPause(() => {
        this._recoverStatus()
      })
      // 关闭stop
      mMgr.onStop(() => {
        this._recoverStatus()
      })
      // 自动播放完成之后回调
      mMgr.onEnded(() => {
        this._recoverStatus()
      })
    }
  }
})
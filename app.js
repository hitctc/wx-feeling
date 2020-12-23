//app.js
App({
  onLaunch: function() {
    // 展示本地存储能力
    const _self = this
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: (res) => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: (res) => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log('CONSOLE --- >  ~ file: app.js ~ line 33 ~ his.globalData.userInfo', this.globalData.userInfo)

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

    // app.js会在第一时间调用，因此获取系统信息 用户信息等操作需要做成同步
    try {
      // 在入口存入memId 以方便测试 2020/12/4
      // var memIdTest = '414e9ca7-be9b-11ea-9587-98039b46f508'
      // wx.setStorage({
      //   key: 'memId',
      //   data: memIdTest
      // })

      // wx.setStorage({
      //   key: 'memId',
      //   data: appGlobalData.memId
      // })

      var systemInfo = wx.getSystemInfoSync()
      // 获取rpx的比例
      var w = systemInfo.windowWidth
      var h = systemInfo.windowHeight
      var rpx = (w > h ? (w = h) : w) / 750
      // 将数据放到全局globalData中
      _self.globalData.rpx = rpx
      _self.globalData.systemInfo = systemInfo
      var memId = wx.getStorageSync('memId') // 看缓存里面有没有mem_id
      if (memId) {
        _self.globalData.memId = memId // 有就替换全局的mem_id,
      }
      var userInfo = wx.getStorageSync('userInfo')
      if (userInfo) {
        _self.globalData.userInfo = userInfo
      }
      var fontSetting = wx.getStorageSync('fontSetting')
      if (fontSetting) {
        _self.globalData.fontSetting = fontSetting
      }
      var videoSetting = wx.getStorageSync('videoSetting')
      if (videoSetting) {
        _self.globalData.videoSetting = videoSetting
      }
      let baseUrl = wx.getStorageSync('baseUrl')
      if (baseUrl) {
        _self.globalData.baseUrl = baseUrl
      }

      console.log('CONSOLE --- > : _self.globalData', _self.globalData)
    } catch (e) {
      console.log(e)
    }
  },
  // 全局数据
  globalData: {
    userInfo: null,
    handleProtectTime: 500, // 操作保护时间ms
    videoSetting: {
      autoplay: true,
      mute: false
    },
    rpx: null, // 宽高比例
    maxText: 30, // 分享页显示最大字符
    systemInfo: null,
    memId: '',
    domain: 'https://cdnj.mingxuandesign.com',
    baseUrl: 'https://movement.gzstv.com'
  }
})

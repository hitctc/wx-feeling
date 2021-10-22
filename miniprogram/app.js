//app.js
App({
  onLaunch: function () {
    const _self = this
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      // 此处请填入环境 ID, 环境 ID 可打开云控制台查看
      wx.cloud.init({
        // env 参数说明：
        // env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        // 此处请填入环境 ID, 环境 ID 可打开云控制台查看
        // 如不填则使用默认环境（第一个创建的环境）
        env: 'feel-6gdrrxeye8840e66',
        traceUser: true,
      })
    }

    const db = wx.cloud.database()
    db.collection('on-off').get().then(res => {
      _self.globalData.onOffList = res.data
    })

    let oId = wx.getStorageSync('oId')
    if (oId) {
      _self.globalData.oId = oId
    }
    let userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      _self.globalData.userInfo = userInfo
    }

    // 获取全局唯一的版本更新管理器，用于管理小程序更新。关于小程序的更新机制，可以查看运行机制文档。
    // 返回值 UpdateManager 更新管理器对象
    // const updateManager = wx.getUpdateManager()
    // updateManager.onCheckForUpdate(function (res) {
    //   // 请求完新版本信息的回调
    //   console.info('更新了?', res.hasUpdate)
    // })

    // updateManager.onUpdateReady(function () {
    //   wx.showModal({
    //     title: '更新提示',
    //     content: '新版本已完备，是否重启应用？',
    //     success(res) {
    //       if (res.confirm) {
    //         // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
    //         updateManager.applyUpdate()
    //       }
    //     }
    //   })
    // })

    // updateManager.onUpdateFailed(function () {
    //   // 新版本下载失败
    // })

    // 获取小程序更新机制兼容
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调
        console.info('更新了新版本?', res.hasUpdate)
        if (res.hasUpdate) {
          updateManager.onUpdateReady(function () {
            wx.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: function (res) {
                if (res.confirm) {
                  // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                  updateManager.applyUpdate()
                }
              }
            })
          })
          updateManager.onUpdateFailed(function () {
            // 新的版本下载失败
            wx.showModal({
              title: '已经有新版本了哟~',
              content: '新版本已经上线啦~',
            })
          })
        }
      })
    } else {
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }

  },

  globalData: {
    userInfo: {}, // 微信用户信息
    registerUser: {}, // 微信用户绑定的用户信息
    userindex: '', // 编辑设备和添加设备页面,index索引选择的值name
    userindexId: '', // 编辑设备和添加设备页面,index索引选择的值id
    oId: '',
    currentQuerys: {
      type: ['iphone', 'android', 'ble'],
      user: []
    }, // 设备管理筛选框筛选的结果
    onOffList: []
  }
})
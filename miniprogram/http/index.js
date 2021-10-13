import { config } from './config.js'
const tips = {
  1: '抱歉，出现了一个错误',
  1005: 'appkey无效，请前往www.7yue.pro申请',
  1007: '没有对应接口',
  3000: '期刊不存在'
}

class HTTP {
  // 方法，泪下满的函数叫方法
  request(params) {
    if (!params.method) {
      params.method = 'GET'
    }
    wx.request({
      url: config.api_base_url + params.url,
      method: params.method,
      data: params.data,
      header: {
        'content-type':'application/json',
        appkey: config.appkey
      },
      success: (res) => {
        // 400+ 走success
        let code = res.statusCode.toString()
        if (code.startsWith('2')) {
          params.success && params.success(res.data)
        } else {
          // 服务器异常
          let errorCode = res.data.error_code
          this._showError(errorCode)
        }
      },
      fail: (err) => {
        // api调用失败，断网
        this._showError(1)
      }
    })
  }

  _showError(errorCode) {
    if (!errorCode) {
      errorCode = 1
    }

    const tip = tips[errorCode]
    wx.showToast({
      title: tip?tip:tips[1], 
      icon: 'loading',
      duration: 3500
    })
  }
}

export { HTTP }

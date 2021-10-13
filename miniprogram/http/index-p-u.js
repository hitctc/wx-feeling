import { config } from './config.js'
const tips = {
  1: '抱歉，出现了一个错误',
  1005: 'appkey无效，请前往www.7yue.pro申请',
  1007: '没有对应接口',
  3000: '期刊不存在'
}

class HTTP {
  // 解构语法
  request({ url, data = {}, method = 'get' }) {
    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, data, method)
    })
  }
  _request(url, resolve, reject, data = {}, method = 'get') {
    wx.request({
      url: `${url}`,
      method: method,
      data: data,
      header: {
        'content-type': 'application/json'
        // appkey: config.appkey
      },
      success: (res) => {
        // 400+ 走success
        let code = res.statusCode.toString()
        if (code.startsWith('2')) {
          resolve(res.data)
        } else {
          // 服务器异常
          reject()
          const errorCode = res.data.error_code
          this._showError(errorCode)
        }
      },
      fail: (err) => {
        // api调用失败，断网
        reject()
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
      title: tip ? tip : tips[1],
      icon: 'loading',
      duration: 3500
    })
  }
}

export { HTTP }
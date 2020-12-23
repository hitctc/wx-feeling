// 获取小程序全局配置（变量、函数等）
const app = getApp()
// 定义网络请求API地址
const baseURL = '这里为你的api地址'
// 封装网络请求开始
const http = ({ url, data, showLoadingArgs = false, method = 'GET', contentType = 'application/x-www-form-urlencoded', ...other } = {}) => {
  // 添加请求加载等待
  if (showLoadingArgs) {
    wx.showLoading({
      title: '加载中...'
    })
  }

  // Promise封装处理
  return new Promise((resolve, reject) => {
    wx.request({
      // 请求地址拼接
      // url: baseURL + url,
      url: getUrl(url),
      data: data,
      // 获取请求头配置
      header: getHeader(contentType),
      method: method,
      ...other,
      // 成功或失败处理
      complete: (res) => {
        console.log('http -> res', res)
        // 关闭等待
        if (showLoadingArgs) {
          wx.hideLoading()
        }
        // 进行状态码判断并处理
        if (res.statusCode === 200) {
          resolve(res)
        }
        else if (res.statusCode === 401) {
          // 检测到状态码401，进行token刷新并重新请求等操作
          refreshToken().then(() => _refetch(url, data, method)).then(resolve)
        }
        else if (res.data.code !== 1) {
          // 获取后台返回报错信息
          let title = res.errMsg
          // 调用全局toast方法
          _showToast(title)
        }
        else if (res.data.code === 1) {
          resolve(res)
        }
        else {
          reject(res)
        }
      }
    })
  })
}

// 无论promise对象最后状态如何都会执行
Promise.prototype.finally = function(callback) {
  let P = this.constructor
  return this.then(
    (value) => P.resolve(callback()).then(() => value),
    (reason) =>
      P.resolve(callback()).then(() => {
        throw reason
      })
  )
}

// 添加请求toast提示
const _showToast = (title) => {
  wx.showToast({
    title: title,
    icon: 'none',
    duration: 2000,
    mask: true
  })
}

// 进行url字符串拼接
const getUrl = (url) => {
  if (url.indexOf('://') == -1) {
    url = baseURL + url
  }
  return url
}

// 获取用户userToken
function getHeader(contentType) {
  // 判断登录token是否存在
  if (wx.getStorageSync('userToken')) {
    // 获取token并设置请求头
    var token = wx.getStorageSync('userToken')
    let auth = {
      'content-type': contentType,
      Authorization: token.token_type + ' ' + token.access_token
    }
    return auth
  }
  else {
    let auth = {
      'content-type': contentType
    }
    return auth
  }
}

// 重构请求方式
const _fetch = (content) => {
  return http({
    url: content.url,
    data: content.data,
    method: content.method
  })
}

// hc 重构请求方式
const _wxRequest = (url, data, showLoadingArgs, method, contentType, other) => {
  return http({
    url: url,
    data: data,
    showLoadingArgs: showLoadingArgs,
    method: method,
    contentType: contentType,
    other: other
  })
}

// 使用post
// const http = require('../utils/http.js')
// http._fetch({
//     url: '/list',
//     data:data,
//     method:'post'
// }).then(function (res) {
// }).catch(function (error) {
//     console.log(error);
// });

// 使用get
// const http = require('../utils/http.js')
// http._fetch({
//     url: '/list',
//     data:data,
// }).then(function (res) {
// }).catch(function (error) {
//     console.log(error);
// });

// 使用
// const http = require('../utils/http.js')
// http
//   ._fetch({
//     url: url,
//     data: args
//   })
//   .then(function (res) {})
//   .catch(function (error) {})
//   .finally(() => {})

// let articles_res = await http._fetch({ url: url, data: args })
// if (articles_res) {
//   console.log('执行结束')
// }

// 添加刷新之后的操作处理方法
const refreshToken = () => {
  return new Promise((resolve, reject) => {
    // 获取token
    var token = wx.getStorageSync('userToken')
    // 设置请求data
    let params = {
      refresh_token: token.refresh_token
    }
    // 进行token刷新请求
    wx.request({
      url: getUrl('/app/connect/refresh'),
      data: params,
      // 设置请求header 鉴权
      header: {
        Authorization: token.token_type + ' ' + token.access_token
      },
      method: 'post',
      // 请求响应处理
      complete: (res) => {
        if (res.data.code === 200) {
          // 全局存储token
          app.globalData.usertToken = res.data.data
          // Storage存储token
          wx.setStorage({
            key: 'userToken',
            data: res.data.data,
            // 存储成功处理
            success: function() {
              resolve()
            }
          })
        }
      }
    })
  })
}

const _refetch = (url, data, method) => {
  return http({
    url: url,
    data: data,
    method: method
  })
}

//除开上面的调用方式之外，你也可以使用下面的这些方法，只需要关注是否传入method
const _get = (url, params = {}) => {
  return http({
    url,
    params
  })
}

const _post = (url, params = {}) => {
  return http({
    url,
    params,
    method: 'post'
  })
}

const _put = (url, params = {}) => {
  return http({
    url,
    params,
    method: 'put'
  })
}

const _delete = (url, params = {}) => {
  return http({
    url,
    params,
    method: 'delete'
  })
}

export { baseURL, refreshToken, _fetch, _wxRequest, _refetch, _get, _post, _put, _delete }

// module.exports = {
//   baseURL,
//   refreshToken,
//   _fetch,
//   _wxRequest,
//   _refetch,
//   _get,
//   _post,
//   _put,
//   _delete
// }

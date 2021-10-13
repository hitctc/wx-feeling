import {
  HTTP
} from '../index.js'

// 继承extends，HTTP
class HTTPClassicModel extends HTTP {
  getLatest(sCallback) {
    this.request({
      url: 'classic/latest',
      success: (res) => {
        sCallback(res)
        this._setLatestIndex(res.index)
        wx.setStorageSync(this._getKey(res.index), res)
      }
    })
  }

  getClassic(index, nextOrPrevious, sCallback) {
    // 缓存中找数据 or http，写入到缓存中
    // 确定数据key
    let key = nextOrPrevious == 'next' ? this._getKey(index + 1) : this._getKey(index - 1)
    let classic = wx.getStorageSync(key)
    if (!classic) {
      this.request({
        url: `classic/${index}/${nextOrPrevious}`,
        success: (res) => {
          wx.setStorageSync(this._getKey(res.index), res)
          sCallback(res)
        }
      })
    } else {
      sCallback(classic)
    }
  }

  // 判断是不是第一期（最老的一期）
  isFirst(index) {
    return index == 1 ? true : false
  }

  // 判断是不是最后一起（最新的一期）
  isLatest(index) {
    let latestIndex = this._getLatestIndex()
    return latestIndex == index ? true : false
  }

  getMyFavor(success) {
    this.request({
      url: `classic/favor`,
      success: success
    })
  }

  getById(cid, type, success) {
    let params = {
      url: `classic/${type}/${cid}`,
      success: success
    }
    this.request(params)
  }
  _setLatestIndex(index) {
    // setStorageSync同步写入缓存
    wx.setStorageSync('latest', index)
  }

  _getLatestIndex() {
    let index = wx.getStorageSync('latest')
    return index
  }

  _getKey(index) {
    let key = 'classic-' + index
    return key
  }
}

export {
  HTTPClassicModel
}
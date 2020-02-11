import {
  HTTP
} from '../index-p.js'

const key = 'q'
const maxLen = 10
class HTTPKeywordModel extends HTTP {
  getHistory() {
    const words = wx.getStorageSync(key)
    if (!words) {
      return []
    }
    return words
  }

  getHotSearch() {
    // 参数
    // request({url, data = {}, method = 'get'}) {
    return this.request({
      url: '/book/hot_keyword'
    })
  }

  addToHistory(keyword) {
    let words = this.getHistory()
    // includes数组中是否存在 keyword
    const has = words.includes(keyword)
    if (!has) {
      const len = words.length
      if (len >= maxLen) {
        words.pop()
      }
      words.unshift(keyword)
      wx.setStorageSync(key, words)
    }
  }

}

export {
  HTTPKeywordModel
}
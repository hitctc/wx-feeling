import {
  HTTP
} from '../index-p-u.js'
import {
  config
} from '../config.js'
class HTTPMoodModel extends HTTP {
  // http://www.20200127.cn/resource/mood/mood.json
  // http://www.20200127.cn/resource/mood/keyword.json
  getMoodKey() {
    // 参数
    // request({url, data = {}, method = 'get'}) {
    return this.request({
      url: `${config.hc_api_base_url}/resource/mood/keyword.json`,
      data: {},
      method: 'GET'
    })
  }

  getMoodList() {
    // 参数
    // request({url, data = {}, method = 'get'}) {
    return this.request({
      url: `${config.hc_api_base_url}/resource/mood/mood.json`,
      data: {},
      method: 'GET'
    })
  }

}

export {
  HTTPMoodModel
}
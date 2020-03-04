import {
  HTTP
} from '../index-p-u.js'

class HTTPMoodModel extends HTTP {
  // http://www.20200127.cn/resource/mood/mood.json
  // http://www.20200127.cn/resource/mood/keyword.json
  getMoodList(time) {
    // 参数
    // request({url, data = {}, method = 'get'}) {
    return this.request({
      // url: `./resource/${param}.json`,
      // url: `./resource/xq${time}.json`,
      url: `http://www.20200127.cn/resource/mood/keyword.json`,
      data: {},
      method: 'GET'
    })
  }

}

export {
  HTTPMoodModel
}
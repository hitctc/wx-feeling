import {
  HTTP
} from '../index-p.js'

class HTTPMoodModel extends HTTP {
  getMoodList(time) {
    // 参数
    // request({url, data = {}, method = 'get'}) {
    return this.request({
      //   url: `./resource/${param}.json`,
      url: `./resource/xq${time}.json`,
      data: {},
      method: 'GET'
    })
  }

}

export {
  HTTPMoodModel
}
import {
  HTTP
} from '../index-p.js'

class HTTPBookModel extends HTTP {
  getHotList() {
    // 参数
    // request({url, data = {}, method = 'get'}) {
    return this.request({
      url: 'book/hot_list',
      data: {},
      method: 'GET'
    })
  }

  search(start, q) {
    return this.request({
      url: 'book/search?summary=1',
      data: {
        start: start,
        q: q
      }
    })
  }

  getMyBookCount() {
    return this.request({
      url: 'book/favor/count'
    })
  }

  getDetail(bid) {
    return this.request({
      url: `book/${bid}/detail`
    })
  }

  getLikeStatus(bid) {
    return this.request({
      url: `/book/${bid}/favor`
    })
  }

  getComments(bid) {
    return this.request({
      url: `book/${bid}/short_comment`
    })
  }

  postComments(bid, comment) {
    return this.request({
      url: `book/add/short_comment`,
      method: 'POST',
      data: {
        book_id: bid,
        content: comment
      }
    })
  }
}

export {
  HTTPBookModel
}
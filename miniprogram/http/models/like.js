import {
  HTTP
} from '../index.js'

// 继承extends，HTTP
class HTTPLikeModel extends HTTP {
  postLike(behavior, artId, category) {
    let url = behavior === 'like' ? 'like' : 'like/cancel'
    this.request({
      url: url,
      method: 'POST',
      data: {
        art_id: artId,
        type: category
      }
    })
  }

  getClassicLikeStatus(artId, category, sCallback) {
    this.request({
      url: 'classic/' + category + '/' + artId + '/favor',
      success: sCallback
    })
  }
}

export {
  HTTPLikeModel
}
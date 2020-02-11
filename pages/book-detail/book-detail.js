// pages/book-detail/book-detail.js
import {
  HTTPBookModel
} from '../../http/models/book.js'
import {
  HTTPLikeModel
} from '../../http/models/like.js'
const httpBookModel = new HTTPBookModel
const httpLikeModel = new HTTPLikeModel

Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments: [],
    book: null,
    likeStatus: false,
    likeCount: 0,
    posting: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '数据加载中'
    })
    // 页面接收id
    const bid = options.bid
    const detail = httpBookModel.getDetail(bid)
    const comments = httpBookModel.getComments(bid)
    const likeStatus = httpBookModel.getLikeStatus(bid)
    // 新的promise合体发起请求
    // Promise.all
    // Promise.race 先完成了的就执行回调
    Promise.all([detail, comments, likeStatus]).then(res => {
      // console.log(res)
      this.setData({
        book: res[0],
        comments: res[1].comments,
        likeStatus: res[2].like_status,
        likeCount: res[2].fav_nums
      })
      wx.hideLoading()
    })

    // detail.then(res => {
    //   console.log(res)
    //   this.setData({
    //     book: res
    //   })
    // })
    // comments.then(res => {
    //   console.log(res)
    //   this.setData({
    //     comments: res.comments
    //   })
    // })
    // likeStatus.then(res => {
    //   console.log(res)
    //   this.setData({
    //     likeStatus: res.like_status,
    //     likeCount: res.fav_nums
    //   })
    // })
  },

  onLike(event) {
    const likeOrCancel = event.detail.behavior
    httpLikeModel.postLike(likeOrCancel, this.data.book.id, 400)
  },

  onFakePost(event) {
    this.setData({
      posting: true
    })
  },

  onCancel(event) {
    this.setData({
      posting: false
    })
  },

  onPost(event) {
    const comment = event.detail.text || event.detail.value
    if (!comment) {
      wx.showToast({
        title: '短评不能为空',
        icon: 'none'
      })
      return
    }
    if (comment.length > 12) {
      wx.showToast({
        title: '短评不能超过12个字',
        icon: 'none'
      })
      return
    }
    httpBookModel.postComments(this.data.book.id, comment).then(res => {
      wx.showToast({
        title: `${comment} + 1`,
        icon: 'none'
      })
      this.data.comments.unshift({
        content: comment,
        nums: 1
      })
      this.setData({
        comments: this.data.comments,
        posting: false
      })
    })
  }
})
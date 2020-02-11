// pages/classic/classic.js
import {
  HTTPClassicModel
} from '../../http/models/classic.js'

import {
  HTTPLikeModel
} from '../../http/models/like.js'

const httpClassicModel = new HTTPClassicModel()
const httpLikeModel = new HTTPLikeModel()
Component({

  /**
   * 页面的初始数据
   */

  properties: {
    cid: Number,
    type: Number
  },

  data: {
    classicData: null,
    latest: true,
    first: false,
    likeCount: 0,
    likeStatus: false
  },

  attached(options) {
    const cid = this.properties.cid
    const type = this.properties.type
    console.log(cid)
    console.log(type)
    if (!cid) {
      httpClassicModel.getLatest((res) => {
        this.setData({
          classicData: res,
          likeCount: res.fav_nums,
          likeStatus: res.like_status
        })
      })
    } else {
      httpClassicModel.getById(cid, type, res => {
        this._getLikeStatus(res.id, res.type)
        this.setData({
          classicData: res,
          latest: httpClassicModel.isLatest(res.index),
          first: httpClassicModel.isFirst(res.index)
        })
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // onLoad: function(options) {
  //   httpClassicModel.getLatest((res) => {
  //     // 数据绑定/数据更新
  //     this.setData({
  //       classicData: res,
  //       likeCount: res.fav_nums,
  //       likeStatus: res.like_status
  //     })
  //   })
  // },

  methods: {
    onLike: function(event) {
      const behavior = event.detail.behavior
      httpLikeModel.postLike(
        behavior,
        this.data.classicData.id,
        this.data.classicData.type
      )
    },
    onNext: function(event) {
      console.log('点击上一个')
      this._updateClassic('next')
    },
    onPrevious: function(event) {
      console.log('点击下一个')
      this._updateClassic('previous')
    },
    _updateClassic: function(nextOrPrevious) {
      let index = this.data.classicData.index
      httpClassicModel.getClassic(index, nextOrPrevious, (res) => {
        this._getLikeStatus(res.id, res.type)
        this.setData({
          classicData: res,
          latest: httpClassicModel.isLatest(res.index),
          first: httpClassicModel.isFirst(res.index)
        })
      })
    },
    _getLikeStatus: function(artId, category) {
      httpLikeModel.getClassicLikeStatus(artId, category, (res) => {
        this.setData({
          likeCount: res.fav_nums,
          likeStatus: res.like_status
        })
      })
    }
  }

})
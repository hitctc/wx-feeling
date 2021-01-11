// pages/add-m/add-m.js
import { _showToast } from '../../utils/wxShowToast'
const db = wx.cloud.database(
  {
    // env: 'test'
  }
)
const _ = db.command
const movie = db.collection('movie')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    artData: {
      _id: '',
      radioSource: '百度',
      type: [],
      link: '',
      code: '',
      title: '',
      content: '',
      time: '',
      desc: '',
      imgUrl: '',
      status: ''
    },
    type: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log('🚀 ~ file: add-m.js ~ line 30 ~ options', options)
    console.log('🚀 ~ file: add-m.js ~ line 16 ~ movie', movie)
    const _self = this
    const type = options.type || 'add' // change or add
    console.log('🚀 ~ file: add-m.js ~ line 36 ~ type', type)
    const eventChannel = this.getOpenerEventChannel()
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    console.log('🚀 ~ file: add-m.js ~ line 45 ~ this.getOpenerEventChannel()', this.getOpenerEventChannel())
    if (JSON.stringify(eventChannel) === '{}') return
    eventChannel.on('setItemData', function(data) {
      console.log('🚀 ~ file: add-m.js ~ line 36 ~ data', data)
      console.log('🚀 ~ file: add-m.js ~ line 36 ~ data', data.data)
      _self.setData({
        type,
        artData: {
          _id: data.data._id,
          radioSource: data.data.source,
          type: data.data.tabType,
          link: data.data.link,
          code: data.data.code,
          title: data.data.title,
          content: data.data.content,
          time: data.data.time,
          desc: data.data.desc,
          imgUrl: data.data.imgUrl,
          status: data.data.status
        }
      })
    })
  },
  selectSource(event) {
    console.log('🚀 ~ file: add-m.js ~ line 65 ~ event', event)
    this.setData({
      'artData.radioSource': event.detail
    })
  },
  selectArtType(event) {
    console.log('🚀 ~ file: add-m.js ~ line 64 ~ event.detail', event.detail)
    this.setData({
      'artData.type': event.detail
    })
  },
  onSub() {
    const _self = this
    const type = _self.data.type
    console.log('🚀 ~ file: add-m.js ~ line 76 ~ type', type)
    // 添加
    if (type == 'change') {
      const _id = _self.data.artData._id
      console.log('🚀 ~ file: add-m.js ~ line 85 ~ _id', _id)
      // movie.doc(_id).update({
      //   data: {
      //     title: 'changeTitle'
      //   },
      //   success: (res) => {
      //     console.log('🚀 ~ file: add-m.js ~ line 90 ~ res', res)
      //   },
      //   fail: (err) => {
      //     console.log(err)
      //   }
      // })
      let args = {
        source: _self.data.artData.radioSource,
        tabType: _self.data.artData.type,
        link: _self.data.artData.link,
        code: _self.data.artData.code,
        title: _self.data.artData.title,
        content: _self.data.artData.content,
        time: '2020-12-30',
        desc: _self.data.artData.desc === '' ? '默认描述' : _self.data.artData.desc,
        imgUrl: 'https://djcollegeg.gzstv.com/resource/picture/get/490',
        status: true
      }
      console.log('🚀 ~ file: add-m.js ~ line 109 ~ args', args)

      movie.doc(_id).update({
        data: args,
        success(res) {
          console.log('🚀 ~ file: add-m.js ~ line 101 ~ res', res)
          _showToast('成功')
          console.log('🚀 ~ file: add-m.js ~ line 89 ~ res.data', res.data)
        },
        fail(err) {
          console.log('🚀 ~ file: add-m.js ~ line 93 ~ err', err)
        }
      })
      return
    }
    else {
      // 新增
      let args = {
        // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
        source: _self.data.radioSource,
        tabType: _self.data.type,
        link: _self.data.link,
        code: _self.data.code,
        title: _self.data.title,
        content: _self.data.content,
        time: '2020-12-30',
        desc: _self.data.desc === '' ? '默认描述' : _self.data.desc,
        imgUrl: 'https://djcollegeg.gzstv.com/resource/picture/get/490',
        status: true
      }
      console.log('🚀 ~ file: add-m.js ~ line 80 ~ args', args)
      movie
        .add({
          // data 字段表示需新增的 JSON 数据
          data: args
        })
        .then((res) => {
          if (res) {
            _showToast('成功')
          }
          console.log('🚀 ~ file: add-m.js ~ line 59 ~ res', res)
          // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        })
    }
  }
})

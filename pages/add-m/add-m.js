// pages/add-m/add-m.js
import { _showToast } from '../../utils/wxShowToast'
const db = wx.cloud.database(
  {
    // env: 'test'
  }
)
const movie = db.collection('movie')

Page({
  /**
   * 页面的初始数据
   */
  data: {
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log('🚀 ~ file: add-m.js ~ line 30 ~ options', options)
    console.log('🚀 ~ file: add-m.js ~ line 16 ~ movie', movie)

    const _self = this
    const eventChannel = this.getOpenerEventChannel()
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('setItemData', function(data) {
      console.log('🚀 ~ file: add-m.js ~ line 36 ~ data', data)
      console.log('🚀 ~ file: add-m.js ~ line 36 ~ data', data.data)
      console.log('🚀 ~ file: add-m.js ~ line 36 ~ data', data.title)
      _self.setData({
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
      })
    })
  },
  onChangeSource(event) {
    this.setData({
      radioSource: event.detail
    })
  },
  onChangeType(event) {
    console.log('🚀 ~ file: add-m.js ~ line 64 ~ event.detail', event.detail)
    this.setData({
      type: event.detail
    })
  },
  onSub() {
    const _self = this
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
})

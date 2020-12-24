// pages/add-m/add-m.js
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
    radioType: '最新',
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
    console.log('🚀 ~ file: add-m.js ~ line 16 ~ movie', movie)
  },
  onChangeSource(event) {
    this.setData({
      radioSource: event.detail
    })
  },
  onChangeType(event) {
    this.setData({
      radioType: event.detail
    })
  },
  onSub() {
    const _self = this
    console.log('🚀 ~ file: add-m.js ~ line 42 ~ _self', _self.data)
    let args = {
      // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
      source: _self.data.radioSource,
      tabType: _self.data.radioType,
      link: _self.data.link,
      code: _self.data.code,
      title: _self.data.title,
      content: _self.data.content,
      time: '2020-12-30',
      desc: '默认描述',
      imgUrl: 'https://djcollegeg.gzstv.com/resource/picture/get/490',
      status: true
    }
    movie
      .add({
        // data 字段表示需新增的 JSON 数据
        data: args
      })
      .then((res) => {
        console.log('🚀 ~ file: add-m.js ~ line 59 ~ res', res)
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
      })
  }
})

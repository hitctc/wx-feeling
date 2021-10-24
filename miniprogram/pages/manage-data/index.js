// pages/manage-data/index.js
import {
  _showToast
} from '../../utils/wxShowToast.js'
import {
  formatData
} from "../../utils/formatData.js";
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog.js';

const db = wx.cloud.database({
  // env: 'test'
})
const _ = db.command


const date = new Date()
const years = []
const months = []
const days = []

for (let i = 2020; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    _id: '', // 更改数据是用id查寻数据

    content: '', // 内容，简介
    imageUrl: '', // 图片
    keyTypeArr: ['ALL', '最新'], // keyType集合：最新，热门等
    selectTagTypeArr: [], // tagType
    title: '', // 标题
    shortTitle: '', // 短标题
    author: '', // 作者
    nickName: '', // 微信name
    likesCount: 0, // 点赞数
    collectCount: 0, // 收藏数
    commentCount: 0, // 评论数
    copyCount: 0, // 复制数
    lookCount: 0, // 看过数
    tagText: '', // 标签
    dateIssued: '', // 发布/更新时间
    highlightMark: true, // 高亮标记
    statusIssued: true, // 发布状态

    pageType: '', // 页面类型 change add
    allKeyType: [], // 所有资源类型
    allTagType: [], // 所有资源类型

    // 微信日期选择控件
    years,
    year: date.getFullYear(),
    months,
    month: 10,
    days,
    day: 10,
    dateValue: [2021, 0, 0],
    isDaytime: true,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _self = this
    const pageType = options.pageType || 'add' // change or add
    const _id = options._id || ''
    _self._getKeyType() // 获取keytype数据
    _self._getAllTagType() // 获取tagtype数据
    _self._initFormatDate() // 初始化时间
    _self.setData({
      pageType,
      _id,
    })
    if (options.pageType === 'change') {
      _self.getSingleData()
    }
  },

  // 选择日期改变
  bindChangeDate(e) {
    const val = e.detail.value // dateValue
    let yearT = this.data.years[val[0]]
    let monthT = this.data.months[val[1]] < 10 ? '0' + this.data.months[val[1]] : this.data.months[val[1]]
    let dayT = this.data.days[val[2]] < 10 ? '0' + this.data.days[val[2]] : this.data.days[val[2]]
    // dateValue
    this.setData({
      year: yearT,
      month: monthT,
      day: dayT,
      isDaytime: !val[3],
      dateIssued: yearT.toString().concat('-', monthT, '-', dayT),
    })
  },
  // 选择类型
  selectKeyType(event) {
    this.setData({
      keyTypeArr: event.detail
    })
  },

  // 选择标签
  selectTagType(event) {
    this.setData({
      selectTagTypeArr: event.detail
    })
  },

  // 是否高亮开关改变
  onHighlightMarkChange(event) {
    this.setData({
      highlightMark: event.detail.value
    });
  },

  // 发布状态的开关
  onChangeStatusIssued(event) {
    this.setData({
      statusIssued: event.detail.value
    });
  },

  // 跳转首页
  jumpPage(event) {
    wx.switchTab({
      url: '/pages/plate-index/index',
    })
  },

  // 跳转管理key
  jumpKeyType() {
    wx.navigateTo({
      url: '/pages/manage-key-type/index',
    })
  },

  // 跳转标记管理
  jumpTagType() {
    wx.navigateTo({
      url: '/pages/manage-tag-type/index',
    })
  },

  // 跳转添加页面
  jumpAddPage() {
    // ${new Date().getTime()}-${Math.floor(Math.random() * 1000)}
    wx.navigateTo({
      url: `/pages/manage-data/index?_timestamp=${new Date().getTime()}-${Math.floor(Math.random() * 1000)}`,
    })
  },

  // 修改提交,可以是新增,可以是修改
  onSubChange() {
    const _self = this
    const pageType = _self.data.pageType
    if (_self.data.keyTypeArr.length == 0) {
      _showToast('必须选择【keyType】')
      return
    }
    if (_self.data.selectTagTypeArr.length == 0) {
      _showToast('必须选择【标签】')
      return
    }
    if (_self.data.content == '') {
      _showToast('【内容】不能为空')
      return
    }
    // 修改
    if (pageType == 'change') {
      _showToast('努力修改中...')
      _self.confirmChangeSource()
    } else {
      // 新增提交逻辑
      _showToast('努力新增中...')
      _self.confirmAddData()
    }
  },

  // 新增提交
  onSubAdd() {
    const _self = this
    if (_self.data.keyTypeArr.length == 0) {
      _showToast('必须选择【keyType】')
      return
    }
    if (_self.data.selectTagTypeArr.length == 0) {
      _showToast('必须选择【标签】')
      return
    }
    if (_self.data.content == '') {
      _showToast('【内容】不能为空')
      return
    }
    if (_self.data.pageType == 'change') {
      wx.showModal({
        title: '提示',
        content: '当前是修改页面, 是否直接提交为【新增】',
        success(res) {
          if (res.confirm) {
            _showToast('努力新增中...')
            _self.confirmAddData()
          } else if (res.cancel) {
            _showToast('努力取消中...')
          }
        }
      })
    } else {
      _self.confirmAddData()
    }
  },

  // 获取所以Tag标签
  _getAllTagType() {
    let _self = this
    wx.showLoading({
      title: '努力获取标签中...',
    })
    wx.cloud.callFunction({
      name: 'getTagType'
    }).then(res => {
      if (res) {
        _self.setData({
          allTagType: res.result.data
        })
        wx.hideLoading({})
      }
    }).catch(console.error)
  },

  // 新增时提交逻辑
  confirmAddData() {
    const _self = this

    // content: '', // 内容，简介
    // imageUrl: '', // 图片
    // keyTypeArr: [], // keyType集合：最新，热门等
    // selectTagTypeArr: [], // tagType
    // title: '', // 标题
    // shortTitle: '', // 短标题
    // author: '', // 作者
    // nickName: '', // 微信name
    // likesCount: 0, // 点赞数
    // collectCount: 0, // 收藏数
    // commentCount: 0, // 评论数
    // copyCount: 0, // 复制数
    // lookCount: 0, // 看过数
    // tagText: '', // 标签
    // dateIssued: '', // 发布/更新时间
    // highlightMark: true, // 高亮标记
    // statusIssued: true, // 发布状态

    let args = {

      content: _self.data.content,
      imageUrl: _self.data.imageUrl,
      keyTypeArr: _self.data.keyTypeArr,
      selectTagTypeArr: _self.data.selectTagTypeArr,
      title: _self.data.title,
      shortTitle: _self.data.shortTitle,
      author: _self.data.author,
      nickName: _self.data.nickName,
      likesCount: _self.data.likesCount,
      collectCount: parseInt(_self.data.collectCount),
      commentCount: parseInt(_self.data.commentCount),
      copyCount: parseInt(_self.data.copyCount),
      lookCount: parseInt(_self.data.lookCount),
      tagText: _self.data.tagText,
      dateIssued: _self.data.dateIssued,
      highlightMark: _self.data.highlightMark,
      statusIssued: _self.data.statusIssued,
    }
    wx.showLoading({
      title: '新增中...',
    })

    // 调用云函数
    wx.cloud.callFunction({
      name: 'handleData',
      data: {
        handleType: 'add',
        args,
      }
    }).then(res => {
      wx.hideLoading({})
      if (res.result.errMsg.indexOf('ok') > -1) {
        Dialog.confirm({
          message: '新增完成',
          confirmButtonText: "确定",
          cancelButtonText: "继续添加"
        }).then(() => {
          _showToast("回到了顶部")
          wx.pageScrollTo({
            scrollTop: 0
          })
        }).catch(() => {
          wx.navigateTo({
            url: '/pages/manage-data/index',
          })
        });
      }
    }).catch(console.error)
  },

  // 修改时的提交逻辑
  confirmChangeSource() {
    let _self = this
    wx.showLoading({
      title: '修改中...',
    })
    let _id = _self.data._id
    let args = {
      content: _self.data.content,
      imageUrl: _self.data.imageUrl,
      keyTypeArr: _self.data.keyTypeArr,
      selectTagTypeArr: _self.data.selectTagTypeArr,
      title: _self.data.title,
      shortTitle: _self.data.shortTitle,
      author: _self.data.author,
      nickName: _self.data.nickName,
      likesCount: _self.data.likesCount,
      collectCount: parseInt(_self.data.collectCount),
      commentCount: parseInt(_self.data.commentCount),
      copyCount: parseInt(_self.data.copyCount),
      lookCount: parseInt(_self.data.lookCount),
      tagText: _self.data.tagText,
      dateIssued: _self.data.dateIssued,
      highlightMark: _self.data.highlightMark,
      statusIssued: _self.data.statusIssued,

    }

    // 调用云函数
    wx.cloud.callFunction({
      name: 'handleData',
      data: {
        handleType: 'change',
        _id,
        args,
      }
    }).then(res => {
      wx.hideLoading({
        success: (res) => { },
      })
      if (res.result.errMsg.indexOf('ok') > -1) {
        Dialog.confirm({
          message: '修改完成',
          confirmButtonText: "确定",
          cancelButtonText: "继续添加"
        }).then(() => {
          _showToast("回到了顶部")
          wx.pageScrollTo({
            scrollTop: 0
          })
        }).catch(() => {
          wx.navigateTo({
            url: '/pages/manage-data/index',
          })
          // wx.startPullDownRefresh()
          // wx.stopPullDownRefresh()
          // wx.pageScrollTo({
          //   scrollTop: 0
          // })
          // _self.onLoad({ pageType: 'add', _id: '' })
          // var pages = getCurrentPages(); // 当前页面
          // var beforePage = pages[pages.length - 2]; // 前一页
          // beforePage.onLoad({
          //   _id
          // }); // 执行前一个页面的onLoad方法
          // wx.navigateBack({
          //   delta: 1
          // });
        });
      }
    }).catch(console.error)
  },

  // 修改时获取单条数据
  async getSingleData() {
    const _self = this
    let _id = this.data._id
    wx.showLoading({
      title: '获取单条数据...',
    })
    await db.collection('pyq-data').doc(_id).get().then(res => {
      // res.data 包含该记录的数据
      let args = _self._handlePyqDataList(res.data)
      wx.hideLoading()
      _self.setData(args)
      // 设置顶部导航bar的title
      wx.setNavigationBarTitle({
        title: res.data.title
      })
    })
  },

  // 获取key
  _getKeyType() {
    let _self = this

    wx.cloud.callFunction({
      name: 'handleKeyType',
      data: {
        handleType: 'get'
      }
    }).then((res) => {
      let resT = JSON.parse(JSON.stringify(res.result))
      _self.setData({
        allKeyType: resT.data
      })
    })
    // 只能获取20条
    // db.collection('key-type').get().then(res => {
    //   // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
    //   _self.setData({
    //     allKeyType: res.data
    //   })
    // })
  },

  // 处理资源数据
  _handlePyqDataList(res) {
    let resT = JSON.parse(JSON.stringify(res))

    let args = {

      content: resT.content,
      imageUrl: resT.imageUrl,
      keyTypeArr: resT.keyTypeArr,
      selectTagTypeArr: resT.selectTagTypeArr,
      title: resT.title,
      shortTitle: resT.shortTitle,
      author: resT.author,
      nickName: resT.nickName,
      likesCount: resT.likesCount,
      collectCount: parseInt(resT.collectCount),
      commentCount: parseInt(resT.commentCount),
      copyCount: parseInt(resT.copyCount),
      lookCount: parseInt(resT.lookCount),
      tagText: resT.tagText,
      dateIssued: resT.dateIssued,

      statusIssued: typeof (resT.statusIssued) == 'undefined' ? true : resT.statusIssued,
      highlightMark: typeof (resT.highlightMark) == 'undefined' ? true : resT.highlightMark,

      // 日期
      year: parseInt(resT.dateIssued.substring(0, 4)),
      month: resT.dateIssued.substring(5, 7),
      day: resT.dateIssued.substring(8, 10),
      dateValue: [parseInt(resT.dateIssued.substring(0, 4)), resT.dateIssued.substring(5, 7) - 1, resT.dateIssued.substring(8, 10) - 1],
    }
    return args
  },

  // 初始化时间选择器的时间
  _initFormatDate() {
    // formatData().YYYYMMDDnorm
    let allDate = formatData()
    this.setData({
      year: allDate.YYYY,
      month: allDate.MM,
      day: allDate.DD,
      dateValue: [allDate.YYYY, allDate.MM - 1, allDate.DD - 1],
      dateIssued: allDate.YYYYMMDDnorm
    })
  }
})
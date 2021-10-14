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
    // 资源数据
    sourceList: [{
      name: '百度网盘',
      link: '',
      code: '',
      intactLink: ''
    }, {
      name: '迅雷云盘',
      link: '',
      code: '',
      intactLink: ''
    }, {
      name: '阿里网盘',
      link: '',
      code: '',
      intactLink: ''
    }],
    // 资源单独列表
    // 资源1
    sourceName1: '百度网盘',
    sourceBdLinkAll: '',
    sourceBdLink: '',
    sourceBdCode: '',
    // 资源2
    sourceName2: '迅雷云盘',
    sourceXlLinkAll: '',
    sourceXlLink: '',
    sourceXlCode: '',

    // 资源3
    sourceName3: '阿里网盘',
    sourceAlLinkAll: '',
    sourceAlLink: '',
    sourceAlCode: '',

    // 资源4
    sourceName4: '磁力链接',
    sourceClLinkAll: '',
    sourceClLink: '',
    sourceClCode: '',

    // 资源5
    sourceName5: '其它',
    sourceQtLinkAll: '',
    sourceQtLink: '',
    sourceQtCode: '',

    keyTypeArr: [], // keyType集合：最新，热门等
    title: '', // 标题
    aliasTitle: '', // 别名、译名
    shortTitle: '', // 短标题
    sortTitle: '', // 类别，例子：剧情，悬疑，推理等
    language: '', // 语言
    caption: '', // 语言字幕
    content: '', // 内容，简介
    premiere: '', // 首播，上映时间
    number: '', // 集数
    durationTime: '', // 时长，片长
    sum: 10, // 豆瓣评分
    IMDbsum: 10, //  IMDb评分
    director: '', // 导演
    scriptwriter: '', // 编剧
    producer: '', // 制片人
    protagonist: '', // 主演
    movieYears: '', // 年代
    movieDpi: '', // 分辨率
    movieTag: '', // 标签，例如，温情，真实，社会，剧情等
    music: '', // 音乐
    photography: '', // 摄影
    filmEditing: '', // 剪辑
    fineArts: '', // 美术
    awards: '', // 奖项
    likesCount: 0, // 点赞数
    badsCount: 0, // 点踩数
    dateIssued: '', // 发布/更新时间
    highlightMark: true, // 高亮标记
    statusIssued: true, // 发布状态
    movieIsOut: true, // 是否出局

    pageType: '', // 页面类型 change add
    allKeyType: [], // 所有资源类型
    allTagType: [], // 所有资源类型
    selectTagTypeArr: [],
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
    if (options.pageType === 'change') {
      _self.setData({
        pageType,
        _id,
      })
      _self.getSourceSingleData()
      _self._initFormatDate()

    } else {
      _self._initFormatDate()
      // _initFormatDate
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
    console.log('ACHUAN : selectKeyType : keyTypeArr', this.data.keyTypeArr)
  },

  // 选择标签
  selectTagType(event) {
    this.setData({
      selectTagTypeArr: event.detail
    })
    console.log('ACHUAN : selectKeyType : keyTypeArr', this.data.selectTagTypeArr)
  },

  // 改变状态
  onChange(event) {
    // statusIssued
    // 需要手动对 checked 状态进行更新
    this.setData({
      statusIssued: event.detail
    });
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

  // 是否出局开关
  onChangeMovieIsOut(event) {
    this.setData({
      movieIsOut: event.detail.value
    });
  },

  // 跳转页面
  jumpPage(event) {
    let pageType = event.currentTarget.dataset.pageType
    if (pageType === '添加页') {
      wx.navigateTo({
        url: '/pages/manager/manager',
      })
    } else if (pageType === '首页') {
      wx.switchTab({
        url: '/pages/index/index',
      })
    }
  },

  // 跳转管理key
  jumpKeyType() {
    wx.navigateTo({
      url: '/pages/manage-key-type/index',
    })
  },

  // 跳转标记
  jumpTagType() {
    wx.navigateTo({
      url: '/pages/manage-tag-type/index',
    })
  },
  // 修改提交,可以新增可以修改提交
  onSubChange() {
    const _self = this
    const pageType = _self.data.pageType
    if (_self.data.keyTypeArr.length == 0) {
      _showToast('必须选择【资源类型】')
      return
    }
    if (_self.data.title == '') {
      _showToast('【标题】不能为空')
      return
    }
    // 修改
    if (pageType == 'change') {
      _showToast('修改')
      _self.confirmChangeSource()
    } else {
      // 新增提交逻辑
      _showToast('新增')
      _self.confirmAddSource()
    }
  },

  // 新增提交
  onSubAdd() {
    const _self = this
    if (_self.data.keyTypeArr.length == 0) {
      _showToast('必须选择【资源类型】')
      return
    }
    if (_self.data.title == '') {
      _showToast('【标题】不能为空')
      return
    }
    _self.confirmAddSource()
  },

  // 获取所以
  _getAllTagType() {
    let _self = this

    wx.showLoading({
      title: '努力获取所有标签中...',
    })
    wx.cloud.callFunction({
      name: 'getTagType'
    }).then(res => {
      console.log('ACHUAN : getAllTagType : res', res)
      if (res) {
        _self.setData({
          allTagType: res.result.data
        })
        wx.hideLoading({})
      }
    }).catch(console.error)
  },

  // 新增时提交逻辑
  confirmAddSource() {
    const _self = this
    let args = {
      sourceList: [{
        // 默认：百度
        name: _self.data.sourceName1,
        linkAll: _self.data.sourceBdLinkAll,
        link: _self.data.sourceBdLink,
        code: _self.data.sourceBdCode
      }, {
        // 默认：迅雷
        name: _self.data.sourceName2,
        linkAll: _self.data.sourceXlLinkAll,
        link: _self.data.sourceXlLink,
        code: _self.data.sourceXlCode
      }, {
        // 默认：阿里
        name: _self.data.sourceName3,
        linkAll: _self.data.sourceAlLinkAll,
        link: _self.data.sourceAlLink,
        code: _self.data.sourceAlCode
      }, {
        // 默认：磁力
        name: _self.data.sourceName4,
        linkAll: _self.data.sourceClLinkAll,
        link: _self.data.sourceClLink,
        code: _self.data.sourceClCode
      }, {
        // 默认：其它
        name: _self.data.sourceName5,
        linkAll: _self.data.sourceQtLinkAll,
        link: _self.data.sourceQtLink,
        code: _self.data.sourceQtCode
      }],
      sourceType: _self.data.keyTypeArr,
      title: _self.data.title,
      aliasTitle: _self.data.aliasTitle,
      shortTitle: _self.data.shortTitle,
      sortTitle: _self.data.sortTitle,
      language: _self.data.language,
      caption: _self.data.caption,
      content: _self.data.content,
      premiere: _self.data.premiere,
      number: _self.data.number,
      durationTime: _self.data.durationTime,
      sum: parseInt(_self.data.sum),
      IMDbsum: parseInt(_self.data.IMDbsum),
      director: _self.data.director,
      scriptwriter: _self.data.scriptwriter,
      protagonist: _self.data.protagonist,
      movieYears: _self.data.movieYears,
      movieDpi: _self.data.movieDpi,
      movieTag: _self.data.movieTag,
      music: _self.data.music,
      photography: _self.data.photography,
      filmEditing: _self.data.filmEditing,
      fineArts: _self.data.fineArts,
      awards: _self.data.awards,
      likesCount: parseInt(_self.data.likesCount),
      badsCount: parseInt(_self.data.badsCount),
      dateIssued: _self.data.dateIssued,
      statusIssued: _self.data.statusIssued,
      highlightMark: _self.data.highlightMark,
      movieIsOut: _self.data.movieIsOut,
    }
    wx.showLoading({
      title: '加载中...',
    })
    db.collection('resource').add({
      // data 字段表示需新增的 JSON 数据
      data: args
    }).then((res) => {
      wx.hideLoading({
        success: (res) => {},
      })
      if (res) {
        Dialog.confirm({
          message: '新增成功',
          confirmButtonText: "确定",
          cancelButtonText: "继续添加"
        }).then(() => {
          // 滚动到顶部
          wx.pageScrollTo({
            scrollTop: 0
          })
        }).catch(() => {
          wx.navigateTo({
            url: '/pages/manage-data/index',
          })
          // var pages = getCurrentPages(); //当前页面
          // var beforePage = pages[pages.length - 2]; //前一页
          // beforePage.onLoad(); // 执行前一个页面的onLoad方法
          // wx.navigateBack({
          //   delta: 1
          // });
        });
      }
      // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
    })
  },
  // 修改时的提交逻辑
  confirmChangeSource() {
    let _self = this
    wx.showLoading({
      title: '加载中...',
    })
    let _id = _self.data._id
    let args = {
      sourceList: [{
        // 默认：百度
        name: _self.data.sourceName1,
        linkAll: _self.data.sourceBdLinkAll,
        link: _self.data.sourceBdLink,
        code: _self.data.sourceBdCode
      }, {
        // 默认：迅雷
        name: _self.data.sourceName2,
        linkAll: _self.data.sourceXlLinkAll,
        link: _self.data.sourceXlLink,
        code: _self.data.sourceXlCode
      }, {
        // 默认：阿里
        name: _self.data.sourceName3,
        linkAll: _self.data.sourceAlLinkAll,
        link: _self.data.sourceAlLink,
        code: _self.data.sourceAlCode
      }, {
        // 默认：磁力
        name: _self.data.sourceName4,
        linkAll: _self.data.sourceClLinkAll,
        link: _self.data.sourceClLink,
        code: _self.data.sourceClCode
      }, {
        // 默认：其它
        name: _self.data.sourceName5,
        linkAll: _self.data.sourceQtLinkAll,
        link: _self.data.sourceQtLink,
        code: _self.data.sourceQtCode
      }],
      sourceType: _self.data.keyTypeArr,
      title: _self.data.title,
      aliasTitle: _self.data.aliasTitle,
      shortTitle: _self.data.shortTitle,
      sortTitle: _self.data.sortTitle,
      language: _self.data.language,
      caption: _self.data.caption,
      content: _self.data.content,
      premiere: _self.data.premiere,
      number: _self.data.number,
      durationTime: _self.data.durationTime,
      sum: parseInt(_self.data.sum),
      IMDbsum: parseInt(_self.data.IMDbsum),
      director: _self.data.director,
      scriptwriter: _self.data.scriptwriter,
      protagonist: _self.data.protagonist,
      movieYears: _self.data.movieYears,
      movieDpi: _self.data.movieDpi,
      movieTag: _self.data.movieTag,
      music: _self.data.music,
      photography: _self.data.photography,
      filmEditing: _self.data.filmEditing,
      fineArts: _self.data.fineArts,
      awards: _self.data.awards,
      likesCount: parseInt(_self.data.likesCount),
      badsCount: parseInt(_self.data.badsCount),
      dateIssued: _self.data.dateIssued,
      statusIssued: _self.data.statusIssued,
      highlightMark: _self.data.highlightMark,
      movieIsOut: _self.data.movieIsOut,
    }

    // 调用云函数
    wx.cloud.callFunction({
      name: 'changeSource',
      data: {
        _id,
        args,
      }
    }).then(res => {
      wx.hideLoading({
        success: (res) => {},
      })
      if (res.result.errMsg.indexOf('ok') > -1) {
        Dialog.confirm({
          message: '编辑成功',
          confirmButtonText: "确定",
          cancelButtonText: "继续添加"
        }).then(() => {
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

  // 获取单条数据
  async getSourceSingleData() {
    const _self = this
    let _id = this.data._id
    wx.showLoading({
      title: '加载中...',
    })
    await db.collection('resource').doc(_id).get().then(res => {
      // res.data 包含该记录的数据
      let args = _self._handleSourceList(res.data)
      wx.hideLoading()
      _self.setData(args)
      // 设置顶部导航bar的title
      wx.setNavigationBarTitle({
        title: res.data.title
      })
    })
  },

  // 获取资源列表
  _getKeyType() {
    let _self = this
    db.collection('key-type').get().then(res => {
      // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
      _self.setData({
        allKeyType: res.data
      })
    })
  },

  // 处理资源数据
  _handleSourceList(res) {
    const _self = this
    let resT = JSON.parse(JSON.stringify(res))
    let forLen = 5 - resT.sourceList.length
    let sourceName1 = '百度网盘'
    let sourceBdLinkAll = ''
    let sourceBdLink = ''
    let sourceBdCode = ''
    // 资源2
    let sourceName2 = '迅雷云盘'
    let sourceXlLinkAll = ''
    let sourceXlLink = ''
    let sourceXlCode = ''
    // 资源3
    let sourceName3 = '阿里网盘'
    let sourceAlLinkAll = ''
    let sourceAlLink = ''
    let sourceAlCode = ''
    // 资源4
    let sourceName4 = '磁力链接'
    let sourceClLinkAll = ''
    let sourceClLink = ''
    let sourceClCode = ''
    // 资源5
    let sourceName5 = '其它'
    let sourceQtLinkAll = ''
    let sourceQtLink = ''
    let sourceQtCode = ''
    for (let i = 0; i < forLen; i++) {
      resT.sourceList.push({
        name: '',
        linkAll: '',
        link: '',
        code: '',
      })
    }
    resT.sourceList.forEach((item, index) => {
      resT.sourceList[index].name = item.name || ''
      resT.sourceList[index].linkAll = item.linkAll || ''
      resT.sourceList[index].link = item.link || ''
      resT.sourceList[index].code = item.code || ''
      if (index === 0) {
        sourceName1 = item.name || '百度网盘'
        sourceBdLinkAll = item.linkAll
        sourceBdLink = item.link
        sourceBdCode = item.code
      }
      if (index === 1) {
        sourceName2 = item.name || '迅雷云盘'
        sourceXlLinkAll = item.linkAll
        sourceXlLink = item.link
        sourceXlCode = item.code
      }
      if (index === 2) {
        sourceName3 = item.name || '阿里网盘'
        sourceAlLinkAll = item.linkAll
        sourceAlLink = item.link
        sourceAlCode = item.code
      }
      if (index === 3) {
        sourceName4 = item.name || '磁力链接'
        sourceClLinkAll = item.linkAll
        sourceClLink = item.link
        sourceClCode = item.code
      }
      if (index === 4) {
        sourceName5 = item.name || '其它'
        sourceQtLinkAll = item.linkAll
        sourceQtLink = item.link
        sourceQtCode = item.code
      }
    });
    let args = {
      // 资源单独列表
      // 资源1
      sourceName1,
      sourceBdLinkAll,
      sourceBdLink,
      sourceBdCode,
      // 资源2
      sourceName2,
      sourceXlLinkAll,
      sourceXlLink,
      sourceXlCode,
      // 资源3
      sourceName3,
      sourceAlLinkAll,
      sourceAlLink,
      sourceAlCode,
      // 资源4
      sourceName4,
      sourceClLinkAll,
      sourceClLink,
      sourceClCode,
      // 资源5
      sourceName5,
      sourceQtLinkAll,
      sourceQtLink,
      sourceQtCode,

      sourceType: resT.keyTypeArr,
      title: resT.title,
      aliasTitle: resT.aliasTitle || '',
      shortTitle: resT.shortTitle || '',
      sortTitle: resT.sortTitle || '',
      language: resT.language || '',
      caption: resT.caption || '',
      content: resT.content || '',
      premiere: resT.premiere || '',
      number: resT.number || '',
      durationTime: resT.durationTime || '',
      sum: parseInt(resT.sum) || 10,
      IMDbsum: parseInt(resT.IMDbsum) || 10,
      director: resT.director || '',
      scriptwriter: resT.scriptwriter || '',
      protagonist: resT.protagonist || '',
      movieYears: resT.movieYears || '',
      movieDpi: resT.movieDpi || '',
      movieTag: resT.movieTag || '',
      music: resT.music || '',
      photography: resT.photography || '',
      filmEditing: resT.filmEditing || '',
      fineArts: resT.fineArts || '',
      awards: resT.awards || '',
      likesCount: parseInt(resT.likesCount) || 0,
      badsCount: parseInt(resT.badsCount) || 0,
      dateIssued: resT.dateIssued,
      statusIssued: typeof (resT.statusIssued) == 'undefined' ? true : resT.statusIssued,
      highlightMark: typeof (resT.highlightMark) == 'undefined' ? true : resT.highlightMark,
      movieIsOut: typeof (resT.movieIsOut) == 'undefined' ? true : resT.movieIsOut,

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
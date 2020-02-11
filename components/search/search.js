import {
  HTTPKeywordModel
} from '../../http/models/keyword.js'
import {
  HTTPBookModel
} from '../../http/models/book.js'
import {
  paginationBev
} from '../behaviors/pagination.js'
const httpKeywordModel = new HTTPKeywordModel
const httpBookModel = new HTTPBookModel
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [paginationBev],
  properties: {
    more: {
      type: String,
      observer: 'loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    searching: false,
    q: '',
    loadingCenter: false,
    loadingBottom: false
  },

  attached() {
    httpKeywordModel.getHotSearch().then(res => {
      this._updateHistoryWords()
      this.setData({
        hotWords: res.hot
      })
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    loadMore() {
      if (!this.data.q) {
        return
      }
      if (this.isLocked()) {
        return
      }
      if (this.hasMore()) {
        this.locked()
        this._showLoadingBottom()
        httpBookModel.search(this.getCurrentStart(), this.data.q).then(res => {
          this.unLocked()
          this.setMoreData(res.books)
          this._hideLoadingBottom()
        }, () => {
          this.unLocked()
          this._hideLoadingBottom()
        })
      }
    },

    onCancel(event) {
      this.initialize()
      this.triggerEvent('cancel', {}, {})
    },

    onDelete() {
      this._updateHistoryWords()
      this._hideLoadingCenter()
      this._hideLoadingBottom()
      this._closeRes()
      this._setKeyword('')
      this.initialize()
    },
    onConfirm(event) {
      const word = event.detail.value || event.detail.text
      if (word != '') {
        this._showResult()
        this._showLoadingCenter()
        this._setKeyword(word)
        // 书籍搜索接口
        // /book/search
        httpBookModel.search(0, word).then(res => {
          console.log(res)
          this._hideLoadingCenter()
          this.setMoreData(res.books)
          this.setTotal(res.total)
          // 有效的返回关键词才放到历史搜索词中
          httpKeywordModel.addToHistory(word)
        })
      } else {
        wx.showToast({
          title: '搜索为空',
          icon: "none"
        })
      }
    },

    _showResult() {
      this.setData({
        searching: true
      })
    },

    _closeRes() {
      this.setData({
        searching: false
      })
    },

    _setKeyword(q) {
      this.setData({
        q: q
      })
    },

    _showLoadingCenter() {
      this.setData({
        loadingCenter: true
      })
    },

    _hideLoadingCenter() {
      this.setData({
        loadingCenter: false
      })
    },

    _showLoadingBottom() {
      this.setData({
        loadingBottom: true
      })
    },

    _hideLoadingBottom() {
      this.setData({
        loadingBottom: false
      })
    },

    _updateHistoryWords() {
      this.setData({
        historyWords: httpKeywordModel.getHistory()
      })
    }

    // 使用setData，还是直接修data数据，取决于页面是否需要渲染这个data
  }
})
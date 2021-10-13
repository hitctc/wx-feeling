// components/index/nav-tab/index.js

let app = getApp()
wx.cloud.init({
  env: 'cloud1-3gv4om0jed457476'
})
const db = wx.cloud.database()

import {
  _showToast
} from '../../../utils/wxShowToast';


Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    active: 1,
    page: 1,
    sourceList: [],
    sourceListAll: [],
    sourceListNew: [],
    sourceListDm: [],
    sourceListPhb: [],
    allSourceType: []
  },

  lifetimes: {
    ready() {
      this._getSourceType()
      this.getSource()
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 点击tab修改
    onChangeTab(event) {},
    getSource(page = 1, sourceTypeName = '首页') {
      let _self = this
      wx.cloud.callFunction({
        name: 'getSource',
        data: {
          page: page,
          sourceTypeName: sourceTypeName
        },
        success: res => {
          _self.setData({
            sourceList: res.result.data
          })
          _self._handingSource(res.result.data)
        }
      })
    },

    // 子组件的删除
    deleteSourceData(item) {
      const _self = this
      let sourceListT = JSON.parse(JSON.stringify(this.data.sourceList))
      sourceListT.forEach(item_i => {
        item_i.data.forEach((item_j, index) => {
          if (item_j._id === item.detail._id) {
            item_i.data.splice(index, 1)
          }
        });
      });
      _self.setData({
        sourceList: sourceListT
      })
    },

    // 获取所有资源类型
    _getSourceType() {
      let _self = this
      db.collection('resourceType').get().then(res => {
        // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
        _self.setData({
          allSourceType: res.data
        })
      })
    },

    _handingSource(data) {
      let dataT = []
      let allSourceTypeT = this.data.allSourceType
      allSourceTypeT.forEach(item_i => {
        dataT.push({
          name: item_i.sourceTypeName,
          data: []
        })
      });
      data.forEach(item_j => {
        item_j.sourceType.forEach(item_k => {
          dataT.forEach(item_l => {
            if (item_l.name === item_k) {
              item_l.data.push(item_j)
            }
          });
        });
      });
      this.setData({
        sourceList: dataT,
        active: 0,
      })
    }
  }
})
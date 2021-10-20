// pages/manage-upload/index.js
let app = getApp()
import envData from "../../envList.js";
wx.cloud.init({
  env: envData.envList.envId,
})
const db = wx.cloud.database()

import {
  _showToast
} from '../../utils/wxShowToast';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showUploadTip: false,
    haveGetImgSrc: false,
    envId: '',
    imgSrc: '',
    addEditDialogVisibel: false,
    allBgData: [],

    addEditImgSrc: '',
    addEditName: '',
    addEditVisible: true,
    _id: '',
    isAdd: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.setNavigationBarTitle({
    //   title: '你的顶部Title写这里即可'
    // })

    this._getAllBg()

    this.setData({
      envId: options.envId
    })
  },

  uploadImg() {
    wx.showLoading({
      title: '',
    })
    // 让用户选择一张图片
    wx.chooseImage({
      count: 1,
      success: chooseResult => {
        const filePath = chooseResult.tempFilePaths[0]
        console.log('ACHUAN : uploadImg : chooseResult', chooseResult)
        // 上传图片name
        // filePath.match(/\.[^.]+?$/)[0]}文件名后缀
        const cloudPath = `img/${new Date().getTime()}-${Math.floor(Math.random() * 1000)}${filePath.match(/\.[^.]+?$/)[0]}`

        console.log('ACHUAN : uploadImg : cloudPath', cloudPath)

        // 将图片上传至云存储空间
        wx.cloud.uploadFile({
          // 指定上传到的云路径
          cloudPath: cloudPath,
          // 指定要上传的文件的小程序临时文件路径
          filePath: filePath,
          config: {
            env: this.data.envId
          }
        }).then(res => {
          console.log('ACHUAN : uploadImg : res', res)
          this.setData({
            haveGetImgSrc: true,
            imgSrc: res.fileID,
            fileID: res.fileID,
            cloudPath: cloudPath,
            imagePath: filePath,
          })
          console.log(this.data);
          wx.hideLoading()
        }).catch((e) => {
          wx.hideLoading()
        })
      },
    })
  },

  clearImgSrc() {
    this.setData({
      haveGetImgSrc: false,
      imgSrc: ''
    })
  },


  // 复制成功
  onCopy(event) {
    // 点击复制
    const imgSrc = event.currentTarget.dataset.imgSrc || ''
    if (imgSrc === '') {
      _showToast('无可复制内容~')
      return
    }
    wx.setClipboardData({
      data: imgSrc,
      success: function (res) {
        // todo 复制成功之后走一次接口，记录被复制的次数
        _showToast(`已复制：${imgSrc}`)
      }
    })
  },

  // 编辑数据
  onEdit(event) {
    console.log('ACHUAN : onEdit : event', event)

    const item = event.currentTarget.dataset.item
    this.setData({
      addEditDialogVisibel: true,

      addEditImgSrc: item.imgSrc,
      addEditName: item.name,
      addEditVisible: item.isVisible,
      _id: item._id,
      isAdd: false,
    })

    console.log(this.data);

  },

  // 添加
  onAdd() {
    this.setData({
      addEditDialogVisibel: true,

      addEditImgSrc: '',
      addEditName: '',
      addEditVisible: true,
      _id: '',

      isAdd: true
    })
  },

  // 操作背景data
  confirmBgData() {
    const _self = this
    let isAdd = this.data.isAdd
    let _id = this.data._id
    let args = {
      name: this.data.addEditName,
      isVisible: this.data.addEditVisible,
      imgSrc: this.data.addEditImgSrc,
    }
    console.log('ACHUAN : confirmBgData : args', args)
    wx.showLoading({
      title: '努力操作中...',
    })

    // 调用云函数
    wx.cloud.callFunction({
      name: 'handleBg',
      data: {
        _id,
        isAdd,
        args,
      }
    }).then(res => {
      console.log('ACHUAN : confirmAddData : res', res)
      wx.hideLoading({})
      _showToast('努力的管理背景图完成了...')
      _self._getAllBg()
    }).catch(console.error)

  },

  // 改变key是否可见
  visibleChange(event) {
    console.log('ACHUAN : visibleChange : event', event)
    let _self = this
    let item = event.currentTarget.dataset.item
    let _id = item._id
    let name = item.name
    let imgSrc = item.imgSrc
    let switchVal = event.detail.value
    let isAdd = false

    let args = {
      name,
      isVisible: switchVal,
      imgSrc: imgSrc,
    }
    // 调用云函数
    wx.showLoading({
      title: '正在努力修改是否可见...',
    })
    wx.cloud.callFunction({
      name: 'handleBg',
      data: {
        _id,
        isAdd,
        args,
      }
    }).then(res => {
      if (res) {
        wx.hideLoading({
          success: (res) => {
            _showToast(`【${name}】可见，已更新`)
          },
        })
        _self._getAllBg()
      }
    }).catch(console.error)
  },

  // 获取所以资源类型
  _getAllBg() {
    let _self = this
    db.collection('bg-data').get().then(res => {
      // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
      _self.setData({
        allBgData: res.data
      })
      console.log(this.data.allBgData);
    })
  },
})
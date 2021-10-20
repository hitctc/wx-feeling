// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 操作背景数据
const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  try {
    if (event.isAdd) {
      // 新增
      return await db.collection('bg-data').add({
        // data 传入需要局部更新的数据
        data: event.args
      })
    } else {
      // 修改替换
      return await db.collection('bg-data').doc(event._id).update({
        // data 传入需要局部更新的数据
        data: event.args
      })
    }
  } catch (e) {
    console.error(e)
  }
}
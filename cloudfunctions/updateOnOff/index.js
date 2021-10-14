// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
// 使用了 async await 语法
const db = cloud.database()

exports.main = async (event, context) => {
  try {
    return await db.collection('on-off').where({
        _id: event._id
      })
      .update({
        data: {
          isVisible: event.isVisible
        }
      })
  } catch (e) {
    console.error(e)
  }
}
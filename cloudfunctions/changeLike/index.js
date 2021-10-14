// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
// 使用了 async await 语法
const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  try {
    if (event.type === 'likes') {
      return await db.collection('resource').doc(event._id).update({
        // data 传入需要局部更新的数据
        data: {
          likesCount: event.count
        }
      })
    } else {
      return await db.collection('resource').doc(event._id).update({
        // data 传入需要局部更新的数据
        data: {
          badsCount: event.count
        }
      })
    }

  } catch (e) {
    console.error(e)
  }
}
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

// 改变tag-type信息
exports.main = async (event, context) => {
  try {
    return await db.collection('tag-type').doc(event._id).update({
      // data 传入需要局部更新的数据
      data: {
        name: event.name
      }
    })
  } catch (e) {
    console.error(e)
  }
}
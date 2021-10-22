// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 操作开机内容
const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  try {
    if (event.handleType === 'add') {
      // 新增
      return await db.collection('boot-up').add({
        // data 传入需要局部更新的数据
        data: event.args
      })
    } else if (event.handleType === 'change') {
      // 修改替换
      return await db.collection('boot-up').doc(event._id).update({
        // data 传入需要局部更新的数据
        data: event.args
      })
    } else if (event.handleType === 'get') {
      //直接返回调取结果。
      return cloud.database().collection("boot-up").get({
        success(res) {
          return res
        },
        fail(err) {
          return err
        }
      })
    } else if (event.handleType === 'detele') {

    }
  } catch (e) {
    console.error(e)
  }
}
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'test-0grv4pdmbe43f9d5'
  // env: cloud.DYNAMIC_CURRENT_ENV // 默认第一个数据库
})

// 云函数入口函数
// exports.main = async (event, context) => {
//   const wxContext = cloud.getWXContext()
//   return {
//     event,
//     openid: wxContext.OPENID,
//     appid: wxContext.APPID,
//     unionid: wxContext.UNIONID,
//   }
// }

const db = cloud.database()
exports.main = async (event, context) => {
  // collection 上的 get 方法会返回一个 Promise，因此云函数会在数据库异步取完数据后返回结果
  return db.collection('movie').get()

  
}
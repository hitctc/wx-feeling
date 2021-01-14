// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'test-0grv4pdmbe43f9d5'
  // env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  // const wxContext = cloud.getWXContext()

  return {
    sum: event.a + event.b
  }

  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
}

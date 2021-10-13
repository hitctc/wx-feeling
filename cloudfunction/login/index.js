// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”

const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})

/**
 * 这个示例将经自动鉴权过的小程序用户 openid 返回给小程序端
 * 
 * event 参数包含小程序端调用传入的 data
 * 
 */
exports.main = async (event, context) => {

  // 可执行其他自定义逻辑
  // console.log 的内容可以在云开发云函数调用日志查看

  // 获取 WX Context (微信调用上下文)，包括 OPENID、APPID、及 UNIONID（需满足 UNIONID 获取条件）等信息
  const wxContext = cloud.getWXContext()

  // 调用数据库获取所有设备列表
  const db = cloud.database() // 获取数据库
  const usersCollection = db.collection('users') // 获取users集合
  const user = (await usersCollection.where({
    oId: wxContext.OPENID // 根据唯一open_id在user集合中查找已绑定的用户
  }).get())

  let hasUserOId = user.data.length > 0

  let now = new Date();

  return {
    event,
    data: user,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
    env: wxContext.ENV, // 云开发环境的id
    hasUserOId: hasUserOId,

    movie: {
      name: "霸王别姬",
      img: "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p1910813120.webp",
      desc: "风华绝代。"
    },
    movielist: ["肖申克的救赎", "霸王别姬", "这个杀手不太冷", "阿甘正传", "美丽人生"],
    now: now.toString(),
    fullyear: now.getFullYear(),
    date: now.getDate(),
    day: now.getDay(),
    hours: now.getHours(),
    minutes: now.getMinutes(),
    seconds: now.getSeconds(),
    time: now.getTime(),
  }
}
// 云函数入口文件
const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 获取所有的tagType
const db = cloud.database()
// 每次最多获取多少条记录,最大值为100
const MAX_LIMIT = 100
exports.main = async (event, context) => {
  /*
  以下是官方例子,查询表中所以数据
  */
  // 先取出集合记录总数
  const countResult = await db.collection('tag-type').count()
  const total = countResult.total
  const batchTimes = Math.ceil(total / 100)
  // 承载所有读操作的 promise 的数组
  const tasks = []
  for (let i = 0; i < batchTimes; i++) {
    const promise = db.collection('tag-type').orderBy('dateIssued', 'desc').skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
    tasks.push(promise)
  }
  // 等待所有
  return (await Promise.all(tasks)).reduce((acc, cur) => {
    return {
      data: acc.data.concat(cur.data),
      errMsg: acc.errMsg,
    }
  })
}
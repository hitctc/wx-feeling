// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 操作tag-type的数据
const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  try {
    if (event.handleType == 'add') {
      // 新增
      return await db.collection('tag-type').add({
        // data 传入需要局部更新的数据
        data: event.args
      })
    } else if (event.handleType == 'change') {
      // 修改替换
      try {
        return await db.collection('tag-type').doc(event._id).update({
          // data 传入需要局部更新的数据
          data: {
            name: event.name,
            category: event.category,
            order: event.order
          }
        })
      } catch (e) {
        console.error(e)
      }
    } else if (event.handleType == 'delete') {
      // 删除操作，通过_id
      return await db.collection('tag-type').where({
        _id: event._id
      }).remove().then(res => {
        return true
      })
    } else if (event.handleType == 'get') {
      /*
      以下是官方例子,查询表中所以数据
      */
      // 每次最多获取多少条记录,最大值为100
      const MAX_LIMIT = 100
      // 先取出集合记录总数
      const countResult = await db.collection('tag-type').count()
      const total = countResult.total
      const batchTimes = Math.ceil(total / 100)
      // 承载所有读操作的 promise 的数组
      const tasks = []
      for (let i = 0; i < batchTimes; i++) {
        const promise = db.collection('tag-type').orderBy('order', 'asc').skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
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
  } catch (e) {
    console.error(e)
  }
}
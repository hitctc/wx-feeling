// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 操作pyq-data的数据
const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  try {
    if (event.handleType == 'card') {
      console.log(event)
      // 先取出集合记录总数
      const countResult = await db.collection('pyq-data').count()
      const total = countResult.total
      console.log("总条数", total);

      // 计算有多少页
      let dataArr = []
      let errMsg = ''
      let name = event.args.name || ''
      // keyTypeArr: name
      await db.collection('pyq-data').where(_.or([{ // 标题
        keyTypeArr: db.RegExp({ // 使用正则查询，实现对搜索的模糊查询
          regexp: name,
          options: 'i', //大小写不区分
        }),
      }]))
        .orderBy('dateIssued', 'desc')
        .limit(total)
        .get()
        .then(res => {
          console.log(res);
          dataArr = dataArr.concat(res.data)
          errMsg = res.errMsg
        })

      return {
        data: dataArr,
        errMsg: errMsg,
      }
    }

    if (event.isAdd) {
      // 新增
      return await db.collection('pyq-data').add({
        // data 传入需要局部更新的数据
        data: event.args
      })
    } else if (!event.isAdd) {
      // 修改替换
      return await db.collection('pyq-data').doc(event._id).update({
        // data 传入需要局部更新的数据
        data: event.args
      })
    }
  } catch (e) {
    console.error(e)
  }
}
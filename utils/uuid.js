// 通用唯一识别码（英语：Universally Unique Identifier，简称uuid）
const uuid = function(n) {
  let res = []
  let hexDigits = '0123456789abcdefhijklmnopqrstuvwxyz'
  for (var i = 0; i < n; i++) {
    res[i] = hexDigits.substr(Math.floor(Math.random() * 0x20), 1)
  }
  // bits 12-15 of the time_hi_and_version field to 0010
  res[14] = '7'
  // bits 6-7 of the clock_seq_hi_and_reserved to 01
  res[19] = hexDigits.substr((res[19] & 0x3) | 0x8, 1)
  res[8] = res[13] = res[18] = res[23] = '-'

  return res.join('')
}

export {
  uuid
}
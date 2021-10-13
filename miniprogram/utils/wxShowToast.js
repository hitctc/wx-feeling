// 无icon
const _showToast = (title) => {
  wx.showToast({
    title: title,
    icon: 'none',
    duration: 2500
  })
}

// 可以设置持续时间
const _showToastDuration = (title, duration = 3000) => {
  wx.showToast({
    title: title,
    icon: 'none',
    duration: duration
  })
}

// 蒙层mask: true
const _showToastMask = (title) => {
  wx.showToast({
    title: title,
    icon: 'none',
    mask: true
  })
}

// import时 带有{}
// export default _showToast // import时 不带{}
export {
  _showToast,
  _showToastMask,
  _showToastDuration
}
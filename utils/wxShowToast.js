const _showToast = (title) => {
  // 积分提示Toast
  wx.showToast({
    title: title,
    icon: 'none',
    duration: 2500
  })
}

const _showToastDuration = (title, duration = 3000) => {
  // 积分提示Toast
  wx.showToast({
    title: title,
    icon: 'none',
    duration: duration
  })
}

//   mask: true
const _showToastMask = (title) => {
  wx.showToast({
    title: title,
    icon: 'none',
    mask: true
  })
}

export { _showToast, _showToastMask, _showToastDuration } // import时 带有{}
// export default _showToast // import时 不带{}

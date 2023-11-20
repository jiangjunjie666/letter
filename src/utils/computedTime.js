//一个计算时间的函数
//传入的时间参数格式为：2023-11-18 15:19

export const getIntervalTime = (startTime) => {
  const startDate = new Date(startTime)
  const currentTime = new Date()
  const diffTime = currentTime.getTime() - startDate.getTime()

  if (diffTime < 60000) {
    return '刚刚'
  } else if (diffTime < 3600000) {
    return Math.floor(diffTime / 60000) + '分钟前'
  } else if (diffTime < 86400000) {
    return Math.floor(diffTime / 3600000) + '小时前'
  } else if (diffTime < 2592000000) {
    return Math.floor(diffTime / 86400000) + '天前'
  } else {
    return startDate.toDateString()
  }
}

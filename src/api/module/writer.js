import http from '../http'

const API = {
  //获取朝代
  getDynasty: '/know/writer/getIndexes',
  //获取具体的诗人信息
  getWriter: '/know/writer/getWriter'
}

export const reqGetDynasty = () => {
  return http.get(API.getDynasty)
}

export const reqGetWriter = (dynasty, page, pageSize) => {
  return http.get(API.getWriter + `?dynasty=${dynasty}&page=${page}&pageSize=${pageSize}`)
}

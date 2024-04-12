import http from '../http'

const API = {
  //获取朝代
  getDynasty: '/know/writer/getIndexes',
  //获取具体的诗人信息
  getWriter: '/know/writer/getWriter',
  //根据作者获取相关的诗歌
  getPoetry: '/know/home/getPoetryByWriter',
  //根据id获取作者的详情
  getWriterDetail: '/know/writer/getWriterById'
}

export const reqGetDynasty = () => {
  return http.get(API.getDynasty)
}

export const reqGetWriter = (dynasty, page, pageSize) => {
  return http.get(API.getWriter + `?dynasty=${dynasty}&page=${page}&pageSize=${pageSize}`)
}

export const reqGetWriterPoetry = (writer) => {
  return http.get(API.getPoetry + `/${writer}`)
}

export const reqGetWriterDetail = (id) => {
  return http.get(API.getWriterDetail + `/${id}`)
}

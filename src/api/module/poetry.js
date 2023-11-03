import http from '../http'

const API = {
  //获取诗词分类接口
  getDetail: '/know/poetry/getIndexes',
  //获取诗词列表
  getPoetryList: '/know/poetry/getPoetryPage'
}

//获取诗词分类
export const reqGetDetail = () => {
  return http.get(API.getDetail)
}
//获取诗词列表
export const reqGetPoetryList = (dynasty, form, ip, page, pageSize, type, writer) => {
  return http.get(API.getPoetryList + `?dynasty=${dynasty}&form=${form}&ip=${ip}&page=${page}&pageSize=${pageSize}&type=${type}&writer=${writer}`)
}

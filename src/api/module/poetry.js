import http from '../http'

const API = {
  //获取诗词分类接口
  getDetail: '/know/poetry/getIndexes',
  //获取诗词列表
  getPoetryList: '/know/poetry/getPoetryPage',
  //根据id获取诗歌的详情
  getPoetryDetail: '/know/poetry/getDetail'
}

//获取诗词分类
export const reqGetDetail = () => {
  return http.get(API.getDetail)
}
//获取诗词列表
export const reqGetPoetryList = (dynasty = '', form = '', ip = '', page, pageSize, type = '', writer = '') => {
  return http.get(API.getPoetryList + `?dynasty=${dynasty}&form=${form}&ip=${ip}&page=${page}&pageSize=${pageSize}&type=${type}&writer=${writer}`)
}

//获取诗歌详情
export const reqGetPoetryDetail = (id) => {
  return http.get(API.getPoetryDetail + `?id=${id}`)
}

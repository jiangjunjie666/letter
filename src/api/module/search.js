import http from '../http'

const API = {
  //获取搜索的结果
  getSearchResult: '/know/home/getHome',
  //获取推荐搜索
  getRecommendSearch: '/know/home/getIndex'
}

export const reqGetSearchRes = (data) => {
  return http.post(API.getSearchResult, data)
}

export const reqGetRecommendSearch = (data) => {
  return http.post(API.getRecommendSearch, data)
}

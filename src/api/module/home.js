import http from '../http'

const API = {
  //获取推荐作者
  getRecommendAuthor: '/know/home/GoCareFor'
}

export const reqGetRecommendAuthor = (page, pageSize, userId) => {
  return http.get(API.getRecommendAuthor + `?page=${page}&pageSize=${pageSize}&userId=${userId}`)
}

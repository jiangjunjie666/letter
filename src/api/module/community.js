//社区接口
import http from '@/api/http.js'

const API = {
  //获取动态信息
  getCommunityList: '/know/talks/getTalks',
  //点赞某条评论
  likeComment: '/know/talks/like',
  //发布评论
  postComment: '/know/talks/addRemark',
  //获取评论
  getComment: '/know/talks/getRemarks',
  //获取点赞列表
  getLikeList: '/know/talks/getLikeUsers'
}

//获取动态信息
export const reqGetCommunityList = (page, pageSize, type, userId) => {
  //query参数
  return http.get(API.getCommunityList + `?page=${page}&pageSize=${pageSize}&type=${type}&userId=${userId}`)
}
//点赞某条评论
export const reqLikeComment = (talksLikeDTO) => {
  //query参数
  return http.put(API.likeComment, talksLikeDTO)
}

//发布评论
export const reqPostComment = (context, tid, createUserId) => {
  //query参数
  return http.post(API.postComment + `?tid=${tid}&createUserId=${createUserId}&context=${context}`)
}

//获取评论
export const reqGetComment = (tid, page, pageSize) => {
  //query参数
  return http.get(API.getComment + `?tid=${tid}&page=${page}&pageSize=${pageSize}`)
}

//获取点赞列表
export const reqGetLikeList = (tid, page, pageSize) => {
  //query参数
  return http.get(API.getLikeList + `?tid=${tid}&page=${page}&pageSize=${pageSize}`)
}

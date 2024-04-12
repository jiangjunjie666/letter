import http from '../http'

const API = {
  //注册
  registerUser: '/user/save',
  //账号密码登录
  login: '/user/login',
  //获取手机验证码
  getCode: '/common/getSmsCode',
  //验证码登录
  loginByCode: '/user/checkCode',
  //修改资料
  updateUserInfo: '/user/update',
  //修改头像
  updateAvatar: '/user/updateUserImage',
  //关注
  follow: '/user/carefor',
  //获取粉丝列表
  fansList: '/user/getFan',
  //获取点赞列表
  likeList: '/know/talks/likeDetailsPage',
  //修改密码
  updatePassword: '/user/updatePassword',
  //获取单个用户的个人信息
  getUserInfo: '/user',
  //创建聊天频道
  createChannel: '/websocket/createTopic'
}

//账号注册
export const reqRegisterUser = (data) => {
  return http.post(API.registerUser, data)
}
//账号密码登录
export const reqLogin = (data) => {
  return http.post(API.login, data)
}
//获取手机验证码
export const reqGetCode = (tele) => {
  return http.get(API.getCode + `?tele=${tele}`)
}
//验证码登录
export const reqLoginByCode = (data) => {
  return http.post(API.loginByCode, data)
}
//修改用户资料
export const reqUpdateUserInfo = (data) => {
  return http.put(API.updateUserInfo, data)
}
//修改头像
export const reqUpdateAvatar = (data) => {
  return http.post(API.updateAvatar, data)
}

//关注
export const reqFollow = (data) => {
  return http.post(API.follow, data)
}

//获取粉丝列表
export const reqFansList = (userId) => {
  return http.get(API.fansList + `?userId=${userId}`)
}

//获取点赞列表
export const reqLikeList = (pageNum, pageSize, tobeLikeUserId) => {
  return http.get(API.likeList + `?pageNum=${pageNum}&pageSize=${pageSize}&tobeLikeUserId=${tobeLikeUserId}`)
}

//修改密码
export const reqUpdatePassword = (data) => {
  return http.put(API.updatePassword, data)
}

//获取用户信息
export const reqGetUserInfo = (userId) => {
  return http.get(API.getUserInfo + `/${userId}`)
}

//创建聊天频道
export const reqCreateChannel = (data) => {
  return http.post(API.createChannel, data)
}

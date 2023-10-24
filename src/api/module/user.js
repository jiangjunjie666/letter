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
  updateUserInfo: '/common/update',
  //修改头像
  updateAvatar: '/common/upload'
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

import http from '../http'

const API = {
  //获取所有的聊天列表
  getChatList: '/websocket/getChat',
  //创建一个频道号
  createChannel: '/websocket/createTopic',
  //获取聊天记录
  getChatMesageList: '/websocket/getChatContent'
}

export const reqGetChatList = (userId) => {
  return http.get(API.getChatList + `?userId=${userId}`)
}

export const reqCreateChannel = (data) => {
  return http.post(API.createChannel, data)
}

export const reqGetChatMesageList = (page, pageSize, topic, userId) => {
  return http.get(API.getChatMesageList + `?page=${page}&pageSize=${pageSize}&topic=${topic}&userId=${userId}`)
}

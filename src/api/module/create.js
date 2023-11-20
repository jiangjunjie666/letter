//创作的接口
import http from '@/api/http'

const API = {
  //创作诗歌
  createPoetry: '/know/art/save',
  //发布动态
  createDynamic: '/know/talks/save'
}

//创作诗歌
export const reqCreatePoetry = (data) => {
  return http.post(API.createPoetry, data)
}

//发布动态
export const reqCreateDynamic = (data) => {
  return http.post(API.createDynamic, data)
}

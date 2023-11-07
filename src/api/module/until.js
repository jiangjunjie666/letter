import http from '../http'

const API = {
  //删除图片接口
  deleteImg: '/common/delete'
}

export const reqDeleteImg = (filePath) => {
  return http.delete(API.deleteImg + `?filePath=${filePath}`)
}

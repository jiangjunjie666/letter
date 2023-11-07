//定义info小仓库
import { defineStore } from 'pinia'
//第一个仓库:小仓库名字  第二个参数:小仓库配置对象
//defineStore方法执行会返回一个函数,函数作用就是让组件可以获取到仓库数据
import { reqLogin, reqLoginByCode } from '@/api/module/user'
import { ElMessage } from 'element-plus'
let useUserStore = defineStore('info', {
  //存储数据:state
  state: () => {
    return {
      userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {}
    }
  },
  actions: {
    //密码登录
    async pasLogin(userInfo) {
      let res = await reqLogin(userInfo)
      console.log(res)
      if (res.code != 1) {
        return ElMessage({
          type: 'error',
          message: res.msg
        })
      } else {
        localStorage.setItem('userInfo', JSON.stringify(res.data))
        localStorage.setItem('token', JSON.stringify(res.data.token))
        this.userInfo = res.data
        return ElMessage({
          type: 'success',
          message: '登录成功'
        })
      }
    },
    //手机号登录
    async phoneLogin(userInfo) {
      let res = await reqLoginByCode(userInfo)
      console.log(res)
      if (res.code != 1) {
        return ElMessage({
          type: 'error',
          message: res.msg
        })
      } else {
        localStorage.setItem('userInfo', JSON.stringify(res.data))
        localStorage.setItem('token', JSON.stringify(res.data.token))
        this.userInfo = res.data
        return ElMessage({
          type: 'success',
          message: '登录成功'
        })
      }
    },
    //退出登录
    loginOut() {
      localStorage.removeItem('userInfo')
      localStorage.removeItem('token')
      this.userInfo = {}
    },
    //修改头像
    updateAvatar(imgurl) {
      let userinfo = JSON.parse(localStorage.getItem('userInfo'))
      //修改image字段
      userinfo.image = imgurl
      localStorage.setItem('userInfo', JSON.stringify(userinfo))
      this.userInfo = userinfo
    }
  },
  getters: {}
})
//对外暴露方法
export default useUserStore

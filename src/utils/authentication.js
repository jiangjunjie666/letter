//路由鉴权
import router from '@/router/index.js'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css' //引入进度条样式
//全局前置守卫
router.beforeEach((to, from, next) => {
  nProgress.start() //进度条开始
  //判断是否存在token
  if (localStorage.getItem('token')) {
    next()
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
  next()
})

//全局后置守卫
router.afterEach((to, from) => {
  nProgress.done() //进度条结束
})

//通过vue-router管理路由
import { createRouter, createWebHistory } from 'vue-router'
import { homeRouter } from './route/home.js'

//创建路由器
let router = createRouter({
  //路由模式hash
  history: createWebHistory(),
  routes: homeRouter,
  scrollBehavior() {
    return {
      left: 0,
      top: 0
    }
  }
})

export default router

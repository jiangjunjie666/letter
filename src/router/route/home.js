//引入layout路由
import { homeLayoutRouter } from './homeLayout'
import { accontLayoutRouter } from './accountLayout'
//主页路由
export const homeRouter = [
  {
    path: '/',
    component: () => import('@/views/main/index.vue'),
    name: 'main',
    redirect: '/home',
    children: homeLayoutRouter
  },
  //匹配不到的情况
  {
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404'
  },
  {
    //任意路由
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
    meta: {
      title: '任意路由'
    }
  },
  {
    path: '/account',
    component: () => import('@/views/account/index.vue'),
    name: 'account',
    redirect: '/account/heart',
    meta: {
      title: '个人中心'
    },
    children: accontLayoutRouter
  }
]

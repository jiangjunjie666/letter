export const accontLayoutRouter = [
  {
    path: '/account/heart',
    name: 'heart',
    component: () => import('@/views/account/heart/index.vue')
  },
  {
    path: '/account/avatar',
    name: 'avatar',
    component: () => import('@/views/account/avatar/index.vue')
  },
  {
    path: '/account/message',
    name: 'message',
    component: () => import('@/views/account/message/index.vue')
  },
  {
    path: '/account/password',
    name: 'password',
    component: () => import('@/views/account/password/index.vue')
  }
]

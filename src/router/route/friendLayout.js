export const friendLayoutRoute = [
  {
    path: '/friend/fans',
    component: () => import('@/views/main/friend/friendson/fans/index.vue'),
    name: 'fans'
  },
  {
    path: '/friend/like',
    component: () => import('@/views/main/friend/friendson/like/index.vue'),
    name: 'like'
  },
  {
    path: '/friend/code',
    component: () => import('@/views/main/friend/friendson/code/index.vue'),
    name: 'code'
  }
]

export const homeLayoutRouter = [
  {
    path: '/home',
    component: () => import('@/views/main/home/index.vue'),
    name: 'home'
  },
  {
    path: '/friend',
    component: () => import('@/views/main/friend/index.vue'),
    name: 'friend'
  },
  {
    path: '/masterwork',
    component: () => import('@/views/main/masterwork/index.vue'),
    name: 'masterwork'
  },
  {
    path: '/poetry',
    component: () => import('@/views/main/poetry/index.vue'),
    name: 'poetry'
  },
  {
    path: 'writar',
    component: () => import('@/views/main/writar/index.vue'),
    name: 'writar'
  },
  {
    path: 'community',
    component: () => import('@/views/main/community/index.vue'),
    name: 'community'
  }
]

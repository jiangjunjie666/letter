import { friendLayoutRoute } from './friendLayout'
export const homeLayoutRouter = [
  {
    path: '/home',
    component: () => import('@/views/main/home/index.vue'),
    name: 'home'
  },
  {
    path: '/friend',
    component: () => import('@/views/main/friend/index.vue'),
    name: 'friend',
    children: friendLayoutRoute
  },
  {
    path: '/poetry',
    component: () => import('@/views/main/poetry/index.vue'),
    name: 'poetry'
  },
  {
    path: '/writar',
    component: () => import('@/views/main/writar/index.vue'),
    name: 'writar'
  },
  {
    path: '/community',
    component: () => import('@/views/main/community/index.vue'),
    name: 'community'
  }
]

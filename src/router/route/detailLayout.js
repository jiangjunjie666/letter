export const detailLayoutRouter = [
  {
    path: '/detail/poetry',
    component: () => import('@/views/detail/detailPoe/index.vue'),
    name: 'detailPoe'
  },
  {
    path: '/detail/writer',
    component: () => import('@/views/detail/detailWriter/index.vue'),
    name: 'detailWriter'
  }
]

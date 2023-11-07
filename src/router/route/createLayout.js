export const createLayoutRouter = [
  {
    path: '/create/analyse',
    component: () => import('@/views/create/createAnalyse/index.vue'),
    name: 'createAnalyse',
    meta: {
      title: '创作赏析'
    }
  },
  {
    path: '/create/poetry',
    component: () => import('@/views/create/createPoe/index.vue'),
    name: 'createPoetry',
    meta: {
      title: '创作诗歌'
    }
  },
  {
    path: '/create/status',
    component: () => import('@/views/create/createStatus/index.vue'),
    name: 'createStatus',
    meta: {
      title: '创作状态'
    }
  }
]

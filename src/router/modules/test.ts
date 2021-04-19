const routers: RouterConfig = [
  {
    path: '/test',
    component: () => import('/@views/test.vue'),
  },
  {
    path: '/test1',
    component: () => import('/@views/test2.vue'),
  },
]

export default routers

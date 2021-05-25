import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout/index.vue'

const routes = [
  {
    path: '/login',
    component: () => import('@/pages/users/login/Login.vue'),
    hidden: true,
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashbord',
    children: [
      {
        path: '/dashbord',
        name: 'dashbord',
        component: () => import('@/pages/home/index.vue'),
        meta: { title: 'dashbord', icon: 'el-icon-s-goods' },
      },
    ],
  },
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'icon-kongzhitai' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/pages/table/index.vue'),
        meta: { title: 'Table', icon: 'icon-yunyingduan-biaogezhanshi' },
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/pages/home/index.vue'),
        meta: { title: 'Tree', icon: 'icon-icon_zhuye' },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router

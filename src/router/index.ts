import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

const routes = [
  {
    path: '/login',
    component: () => import('@/pages/users/Login.vue'),
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
        meta: { title: 'dashbord', icon: 'el-icon-delete' },
      },
    ],
  },
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/pages/table/index.vue'),
        meta: { title: 'Table', icon: 'table' },
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/pages/home/index.vue'),
        meta: { title: 'Tree', icon: 'tree' },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router

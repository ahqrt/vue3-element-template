import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
const routes: RouteRecordRaw[] = [
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
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router

import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

export const Layout = () => import('@/layout/index.vue');

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/redirect',
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue'),
      },
    ],
  },

  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: { hidden: true },
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'homepage', affix: true },
      },
    ],
  },
];

// 创建路由
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes as RouteRecordRaw[],
  scrollBehavior: () => ({ left: 0, right: 0 }),
});

// 重置路由

export function resetRouter() {
  router.replace({ path: 'login' }), location.reload();
}

export default router;

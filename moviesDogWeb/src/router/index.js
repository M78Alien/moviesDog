import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: () => import('@/views/login/loginPage.vue') },
    {
      path: '/',
      component: () => import('@/views/layout/layoutContainer.vue'),
      redirect: '/movieManage',
      children: [
        // {
        //   path: '/home',
        //   component: () => import('@/views/home/homePage.vue')
        // },
        {
          path: '/movieManage',
          component: () => import('@/views/movieManage/movieManage.vue')
        },
        {
          path: '/cinemaManage',
          component: () => import('@/views/cinemaManage/cinemaManage.vue')
        },
        {
          path: '/orderManage',
          component: () => import('@/views/orderManage/orderManage.vue')
        },
        {
          path: '/roomManage',
          component: () => import('@/views/roomManage/roomManage.vue')
        },
        {
          path: '/userManage',
          component: () => import('@/views/userManage/userManage.vue')
        }
      ]
    }
  ],
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('adminKey');
  if (!isLoggedIn && to.path !== '/login') {
    next('/login');
  } else {
    next();
  }
});

export default router

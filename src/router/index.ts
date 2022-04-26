import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '../views/home/index.vue'
import Layout from '../components/layout.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'home',
        component: HomeView
      },
      {
        path: '/role',
        name: 'role',
        component: () => import(/* webpackChunkName: 'role' */ '@/views/role/index.vue')
      },
      {
        path: '/role/alloc-resource/:roleId',
        name: 'alloc-resource',
        component: () => import(/* webpackChunkName: 'role-alloc' */ '@/views/role/alloc-resource.vue'),
        props: true
      },
      {
        path: '/role/alloc-menu/:roleId',
        name: 'alloc-menu',
        component: () => import(/* webpackChunkName: 'role-alloc' */ '@/views/role/alloc-menu.vue'),
        props: true
      },
      {
        path: '/menu',
        name: 'menu',
        component: () => import(/* webpackChunkName: 'menu' */ '@/views/menu/index.vue')
      },
      {
        path: '/menu/create',
        name: 'menu-create',
        component: () => import(/* webpackChunkName: 'menu-create' */ '@/views/menu/create.vue')
      }, {
        path: '/menu/edit/:id',
        name: 'menu-edit',
        component: () => import(/* webpackChunkName: 'menu-create' */ '@/views/menu/edit.vue')
      },
      {
        path: '/resource',
        name: 'resource',
        component: () => import(/* webpackChunkName: 'resource' */ '@/views/resource/index.vue')
      }, {
        path: '/resource/create',
        name: 'resource-create',
        component: () => import(/* webpackChunkName: 'resource-create-edit' */ '@/views/resource/create.vue')
      }, {
        path: '/resource/edit/:id',
        name: 'resource-edit',
        component: () => import(/* webpackChunkName: 'resource-create-edit' */ '@/views/resource/edit.vue')
      },
      {
        path: '/course',
        name: 'course',
        component: () => import(/* webpackChunkName: 'course' */ '@/views/course/index.vue')
      },
      {
        path: '/course/create',
        name: 'course-create',
        component: () => import(/* webpackChunkName: 'course-create-edit' */ '@/views/course/create-edit.vue')
      },
      {
        path: '/course/:courseId/edit',
        name: 'course-edit',
        component: () => import(/* webpackChunkName: 'course-create-edit' */ '@/views/course/create-edit.vue'),
        props: true
      },
      {
        path: '/course/:courseId/section',
        name: 'course-section',
        component: () => import(/* webpackChunkName: 'course-section' */ '@/views/course/section.vue'),
        props: true
      },{
        path: '/course/:courseId/video',
        name: 'course-video',
        component: () => import(/* webpackChunkName: 'course-video' */ '@/views/course/video.vue'),
        props: true
      },
      {
        path: '/user',
        name: 'user',
        component: () => import(/* webpackChunkName: 'user' */ '@/views/user/index.vue')
      },
      {
        path: '/advert',
        name: 'advert',
        component: () => import(/* webpackChunkName: 'advert' */ '@/views/advert/index.vue')
      },
      {
        path: '/advert-space',
        name: 'advert-space',
        component: () => import(/* webpackChunkName: 'advert-space' */ '@/views/advert-space/index.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    meta: { noAuth: true },
    component: () => import(/* webpackChunkName: 'login' */ '@/views/login/index.vue')
  },
  {
    path: '*',
    name: '404',
    meta: { noAuth: true },
    component: () => import(/* webpackChunkName: '404' */ '@/views/error-page/404.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  /* if (to.path !== '/login') {
    // 检查状态
  } */
  // 路由元信息，meta
  if (!to.matched.every(record => record.meta.noAuth)) {
    // 不登录不能访问
    if (!store.state.user) {
      next({
        name: 'login',
        query: { redirect: to.fullPath }
      })
    }
  }
  next()
})

export default router

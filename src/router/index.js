import Frame from "../views/Frame.vue"
import { createRouter, createWebHistory } from 'vue-router'
import { route } from './routes.js'
import { useTabsStore } from "../stores/tabs"
const routes = [
  {
    path: '/login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/',
    component: Frame,
    children: [
      {
        path: '/',
        component: () => import('../views/HomePage.vue')
      },
      ...route
    ]
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})
/** 全局路由前置钩子 */
router.beforeEach((to, from, next) => {
  const tabsInstance = useTabsStore()
  const { addTab, changeTab } = tabsInstance
  const path = to.path
  addTab(path)
  changeTab(path)
  next()
})

export default router
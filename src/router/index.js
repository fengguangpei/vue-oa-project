import Frame from '../views/Frame.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { route } from './routes.js'
import { useTabsStore } from '../stores/tabs'
import { loadMicroApp } from 'qiankun'
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
router.onError((err) => {
  console.error(err)
})
/** 全局路由前置钩子 */
router.beforeEach((to, from, next) => {
  const path = to.path
  if (path.includes('RefreshPage')) {
    next()
    return
  }
  next()
  const tabsInstance = useTabsStore()
  const { addTab, changeTab } = tabsInstance
  addTab(path)
  changeTab(path)
})
/** 全局路由后置钩子 */
router.afterEach((to) => {
  to.path.includes('microApp') && initMicroApp()
  flag === 'mounted' && unmountMicroApp()
})

/** 子应用 */
let microApp = null
let flag = null
async function initMicroApp() {
  // 重新挂载
  if (flag === 'remount') {
    microApp.update({
      remount: true
    })
    flag = 'mounted'
  }
  // 子应用初始化
  if (flag === null) {
    microApp = loadMicroApp({
      name: 'micro-app',
      entry: '//localhost:8081',
      container: document.querySelector('#micro-app1')
    })
    await microApp.mountPromise
    microApp.update({
      $rootRouter: router
    })
    flag = 'mounted'
  }
}
// 卸载子应用Vue实例
async function unmountMicroApp() {
  const tabsInstance = useTabsStore()
  const { keepAlive } = tabsInstance
  if (!keepAlive.includes('MicroApp') && microApp) {
    await microApp.update({
      unmount: true
    })
    flag = 'remount'
  }
}
export default router

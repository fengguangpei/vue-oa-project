import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import router from './router/index.js'
import App from './App.vue'
import RefreshPage from './components/RefreshPage.vue'
import './assets/scss/common.scss'
import './assets/scss/base.scss'
import 'vxe-table/lib/style.css'
import { VXETable, Column, Table } from 'vxe-table'
import globalProperties from './assets/js/globalProperties.js'
// import { prefetchApps, registerMicroApps } from 'qiankun'
import vTip from './directives/vTip.js'
const app = createApp(App)
app.directive('tip', vTip)
// pinia
const pinia = createPinia()
pinia.use((store) => {
  store.router = markRaw(router)
})
// VXETable
const useTable = (app) => {
  app.use(VXETable).use(Column).use(Table)
}
// globalProperties
Object.entries(globalProperties).forEach(([key, value]) => {
  app.config.globalProperties[key] = value
})
app.use(router).use(pinia).use(useTable).mount('#app')
app.component(RefreshPage)
// const microAppEntry = PRODUCTION ? '/microApp' : '//localhost:8081'
// prefetchApps([{ name: 'micro-app', entry: microAppEntry }])
document.addEventListener('touchstart', function (event) {
  if (event.touches.length > 1) {
    event.preventDefault()
  }
})
var lastTouchEnd = 0
document.addEventListener(
  'touchend',
  function (event) {
    var now = new Date().getTime()
    if (now - lastTouchEnd <= 300) {
      event.preventDefault()
    }
    lastTouchEnd = now
  },
  false
)

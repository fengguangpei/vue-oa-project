import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import router from './router/index.js'
import App from './App.vue'
import RefreshPage from './components/RefreshPage.vue'
import './assets/scss/common.scss'
import './assets/scss/base.scss'
import 'xe-utils'
import { VXETable, Column, Table } from 'vxe-table'
import globalProperties from './assets/js/globalProperties.js'
import microApp from '@micro-zoe/micro-app'
const app = createApp(App)
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
microApp.start({
  plugins: {
    modules: {
      micro_app: [
        {
          loader(code) {
            if (code.indexOf('sockjs-node') > -1) {
              code = code
                .replace('window.location.port', '8081')
                .replace(
                  'window.location.hostname',
                  '子应用host，如果和基座相同则不需要替换hostname'
                )
            }
            return code
          }
        }
      ]
    }
  }
})

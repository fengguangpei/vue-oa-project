import { menus } from '../router/asides'
const map = new Map()
Object.values(menus)
  .flat()
  .forEach((item) => {
    const { name, keepAlive } = item
    map.set(name, keepAlive)
  })
import { useTabsStore } from '../stores/tabs.js'
import { useRouter } from 'vue-router'
function useReshPage() {
  const $router = useRouter()
  const tabsInstance = useTabsStore()
  const { changeExcludeTab } = tabsInstance
  return async function () {
    const $route = $router.currentRoute.value
    const name = $route.name
    const path = $route.fullPath
    const keepAlive = map.get(name)
    changeExcludeTab(keepAlive)
    await $router.replace({ path: '/' })
    changeExcludeTab('')
    $router.push({ path })
  }
}
export default useReshPage

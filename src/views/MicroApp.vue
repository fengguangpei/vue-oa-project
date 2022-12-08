<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { loadMicroApp } from 'qiankun'
const container = ref(null)
const microInstance = ref(null)
const $router = useRouter()
onMounted(async () => {
  microInstance.value = loadMicroApp({
    name: 'micro-app',
    entry: '//localhost:8081',
    container: container.value
  })
  await microInstance.value.mountPromise
  microInstance.value.update({
    $rootRouter: $router
  })
})
onUnmounted(() => {
  microInstance.value.unmount()
})
</script>

<template>
  <div id="micro-app1" ref="container"></div>
</template>

<style scoped lang="scss">
#micro-app1 {
  height: 100%;
  div {
    height: 100%;
  }
}
</style>

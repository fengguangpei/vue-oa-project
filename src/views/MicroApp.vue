<template>
  <div ref="container" class="micro-app">
    <el-icon class="is-loading">
      <Loading />
    </el-icon>
  </div>
</template>

<script setup>
  import { ref, onMounted, onUnmounted, markRaw } from 'vue'
  import { loadMicroApp } from 'qiankun';
  import { useRouter } from 'vue-router'
  const $parentRouter = useRouter()
  const container = ref('')
  const microApp = ref('')
  window.$parentRouter = markRaw($parentRouter)
  const mountMicroApp = () => {
    microApp.value = loadMicroApp({
      name: 'micro-vue-ts-app',
      entry: '//localhost:8081',
      container: container.value
    })
  }
  onMounted(() => {
    setTimeout(mountMicroApp, 300)
  })
  onUnmounted(() => {
    microApp.value.unmount()
  })
</script>

<style scoped lang="scss">
.micro-app {
  width: 100%;
  height: 100%;
  .is-loading {
    top: 50%;
    left: 50%;
    color: #0052D5;
    font-size: 35px;
  }
}
</style>
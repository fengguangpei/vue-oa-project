<template>
  <el-button text icon="Refresh" @click="refresh"></el-button>
</template>

<script setup>
import useReshPage from '../hooks/useRefresh'
const refresh = useReshPage()
</script>

<style scoped lang="scss">
.el-button {
  margin-left: auto !important;
  &:hover {
    background-color: rgba(11, 16, 25, 0.06) !important;
  }
  font-size: 16px;
}
</style>

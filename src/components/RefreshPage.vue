<template>
  <el-button text size="mini" @click="refresh">
    <el-icon>
      <IEpRefresh></IEpRefresh>
    </el-icon>
  </el-button>
</template>

<script setup>
import useReshPage from '../hooks/useRefresh'
const refresh = useReshPage()
</script>

<style scoped lang="scss">
.el-button {
  margin-left: auto !important;

  &:hover {
    background-color: rgb(11 16 25 / 6%) !important;
  }

  font-size: 16px;
}
</style>

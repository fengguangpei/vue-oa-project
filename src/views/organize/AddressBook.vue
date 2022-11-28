<script setup>
  import { ref } from 'vue'
  const name = ref('AddressBook')
</script>

<template>
  <div>
    address-book
    <el-input v-model="name"></el-input>
  </div>
</template>

<style scoped lang="scss">

</style>
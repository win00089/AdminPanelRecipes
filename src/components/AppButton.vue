<template>
  <el-button type="primary" class="btn">{{ text }}</el-button>
</template>

<script setup>
  const props = defineProps({
    text:{
      type: String,
      default: '',
    },
  });
</script>

<style lang="sass" scoped>
    @import '@/assets/styles/index'

    .btn
      padding: 20px 24px
      font-size: 17px
      border-radius: 4px
      background-color: $violet
</style>
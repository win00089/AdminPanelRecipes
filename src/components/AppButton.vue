<template>
  <el-button v-if="!circle" type="primary" class="btn">{{ text }}</el-button>
  <el-button v-else :icon="icon" circle type="primary" class="circle"/>
</template>

<script setup>
  const props = defineProps({
    text:{
      type: String,
      default: '',
    },
    circle:{
      type: Boolean,
      default: false,
    },
    icon:{
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
    
    .circle
      font-size: 16px
      background-color: $violet
</style>
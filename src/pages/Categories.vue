<script setup>
    import {ref, onMounted } from 'vue';
    import AppLayout from '@/layouts/AppLayout.vue';
    import AppButton from '@/components/AppButton.vue';
</script>
    
<template>
 <AppLayout>
    <template #title>Категории</template>
    <template #controls>
        <AppButton text="Добавить категорию"></AppButton>
    </template>
    <template #inner></template>
 </AppLayout>
</template>

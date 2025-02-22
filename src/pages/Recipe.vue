<script setup>
    import {ref, onMounted } from 'vue';
    import AppLayout from '@/layouts/AppLayout.vue';
    import AppButton from '@/components/AppButton.vue';
</script>
    
<template>
 <AppLayout>
    <template #title>Рецепт</template>
    <template #controls>
        <AppButton text="Сохранить"></AppButton>
    </template>
    <template #inner></template>
 </AppLayout>
</template>

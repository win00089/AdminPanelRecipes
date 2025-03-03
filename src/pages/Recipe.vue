<script setup>
    import {ref, onMounted } from 'vue';
    import { useRoute } from 'vue-router';
    import AppLayout from '@/layouts/AppLayout.vue';
    import AppButton from '@/components/AppButton.vue';

    const route = useRoute();
    const routeId = route?.params.id;

    onMounted(() => {
        console.log(routeId);
    });
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

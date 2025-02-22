<script setup>
    import {ref, onMounted } from 'vue';
    import { RecipeService } from '@/services';
    import AppLayout from '@/layouts/AppLayout.vue';
    import AppButton from '@/components/AppButton.vue';

    const recipes = ref();

    const fetchRecipes = async () =>{
        try{
            recipes.value = await RecipeService.getRecipensByLetter();
        }catch{}
    };

    onMounted(fetchRecipes);
</script>
    
<template>
 <AppLayout>
    <template #title>Рецепты</template>
    <template #controls>
        <AppButton text="Добавить рецепт"></AppButton>
    </template>
    <template #inner>{{ recipes }}</template>
 </AppLayout>
</template>

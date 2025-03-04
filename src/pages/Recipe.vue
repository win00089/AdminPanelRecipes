<script setup>
    import {ref, onMounted } from 'vue';
    import { useRoute } from 'vue-router';
    import { RecipeService } from '@/services';
    import AppLayout from '@/layouts/AppLayout.vue';
    import AppButton from '@/components/AppButton.vue';

    const route = useRoute();
    const recipeId = route?.params.id;
    const recipe = ref(RecipeService.getEmptyRecipe());
    const recipeUpdated = ref(RecipeService.getEmptyRecipe());
    const isCreatingMode = ref(true);

    const fetchRecipe = async () =>{
        try{
            const data = await RecipeService.getRecipeById(recipeId);
            recipe.value = data; 
            recipeUpdated.value = data; 
            isCreatingMode.value = false;
        } catch(error){
            console.log(error);
        }
    }

    onMounted(() => {
        if(parseInt(recipeId)){
            fetchRecipe();
        }
    });
</script>
    
<template>
 <AppLayout>
    <template #title>{{ isCreatingMode ? 'Новый рецепт' : recipeUpdated.strMeal }}</template>
    <template #controls>
        <AppButton text="Сохранить"></AppButton>
    </template>
    <template #inner>
        {{ recipeUpdated }}
    </template>
 </AppLayout>
</template>

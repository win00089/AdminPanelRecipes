<script setup>
    import {ref, computed, onMounted } from 'vue';
    import { useRoute } from 'vue-router';
    import { RecipeService, CommonService } from '@/services';
    import { useRootStore } from '@/stores/root';
    import AppLayout from '@/layouts/AppLayout.vue';
    import AppButton from '@/components/AppButton.vue';

    const route = useRoute();
    const rootStore = useRootStore();
    const recipeId = route?.params.id;
    const recipe = ref(RecipeService.getEmptyRecipe());
    const recipeUpdated = ref(RecipeService.getEmptyRecipe());
    const isCreatingMode = ref(true);
    const recipeIngredients = ref([CommonService.getEmptyIngredient()]);
    const areas = computed(() => rootStore.areas);
    const categories = computed(() => rootStore.categories);

    const fetchRecipe = async () =>{
        try{
            const data = await RecipeService.getRecipeById(recipeId);
            recipe.value = {...data}; 
            recipeUpdated.value = {...data}; 
            isCreatingMode.value = false;
        } catch(error){
            console.log(error);
        }
    }

    const normalizeRecipeIngredients = () =>{
        const normalizeIngredients = [];
        
        for(let i = 1; i <= 20; i++){
            if(recipe.value[`strIngredient${i}`]){
                // 32.07 дописать функцию и как работает
            }
        }
    }

    onMounted(async () => {
        if(parseInt(recipeId)){
            await fetchRecipe();
            normalizeRecipeIngredients();
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
        <div class="wrapper">
            <div class="row">
                <div class="col">
                    <div class="label">Title</div>
                    <el-input v-model="recipeUpdated.strMeal" placeholder="Title" />
                </div>
                <div class="col">
                    <div class="label">Area</div>
                    <el-select v-model="recipeUpdated.strArea" placeholder="Area">
                        <el-option 
                            v-for="item in areas"
                            :key="item.strArea"
                            :label="item.strArea"
                            :value="item.strArea"
                        />
                    </el-select>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <div class="label">Category</div>
                    <el-select v-model="recipeUpdated.strCategory" placeholder="Category">
                        <el-option 
                            v-for="item in categories"
                            :key="item.strCategory"
                            :label="item.strCategory"
                            :value="item.strCategory"
                        />
                    </el-select>
                </div>
            </div>
            <div class="row">
               <div class="col">
                    <div class="label">Instructions</div>
                    <el-input 
                        v-model="recipeUpdated.strInstructions"
                        :autosize="{minRows: 2, maxRows: 5}"
                        type="textarea"
                        placeholder="Instruction"
                    />
               </div> 
            </div>
        </div>
    </template>
 </AppLayout>
</template>

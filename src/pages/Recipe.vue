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
        const normalizedIngredients = [];
        
        for(let i = 1; i <= 20; i++){
            if(recipe.value[`strIngredient${i}`]){
                const ingr = {
                    title: recipe.value[`strIngredient${i}`],
                    measure: recipe.value[`strMeasure${i}`],
                };
                normalizedIngredients.push(ingr);
            }
        }
        recipeIngredients.value = normalizedIngredients;
    };

    const addIngredient = () => {
        recipeIngredients.value.push(CommonService.getEmptyIngredient());
    };

    const removeIngredient = (index) => {
        recipeIngredients.value.splice(index, 1);
    };

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
            <div class="ingredients">
                <div class="subtitle">Ingredients</div>
                <div
                    v-for="(ingredient, index) in recipeIngredients"
                    :key="`${ingredient.title}-${index}`"
                    class="row align-items-flex-end"
                >
                <div class="col col-small mb-2">
                    {{ index + 1 }}
                </div>
                <div class="col">
                    <div class="label">Measure</div>
                    <el-input
                        v-model="recipeIngredients[index].measure"
                        placeholder="Measure"
                    />
                </div>
                <div class="col">
                    <div class="label">Title</div>
                    <el-input
                        v-model="recipeIngredients[index].title"
                        placeholder="Title"            
                    />
                </div>
                <div class="col col-small mb-2">
                    <AppButton circle icon="Delete" @click="() => removeIngredient(index)" />
                </div>
                </div>
                <AppButton text="Add ingrdient" @click="addIngredient" />
            </div>
            <div class="row">
               <div class="col">
                    <div class="subtitle">Instructions</div>
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

<style lang="sass" scoped>
@import '@/assets/styles/index';

.ingredients
  padding-bottom: 16px

.mb-2
  margin-top: 5px
  padding-top: 15px              
  padding-left: 15px              
</style>

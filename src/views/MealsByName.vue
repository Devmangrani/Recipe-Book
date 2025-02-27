<template>
  <div class="p-8">
    <div class="max-w-4xl mx-auto text-center mb-8">
      <h1 class="text-4xl font-bold text-orange-500 mb-4">Find Your Perfect Meal</h1>
      <p class="text-xl text-gray-600 mb-8">Search from thousands of delicious recipes</p>
      
      <div class="flex items-center justify-center max-w-xl mx-auto">
        <div class="relative w-full">
          <input
            type="text"
            v-model="keyword"
            @change="searchMeals"
            class="w-full px-4 py-3 pl-12 rounded-xl border-2 bg-white border-gray-200 focus:ring-orange-500 focus:border-orange-500 transition-all"
            placeholder="Search for any meal..."
          />
          <svg 
            class="w-6 h-6 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-8">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
    </div>

    <!-- Results -->
    <div v-else>
      <h2 v-if="keyword && meals.length" class="text-2xl font-semibold text-gray-700 mb-6">
        Search Results for "{{ keyword }}"
      </h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <MealItem v-for="meal of meals" :key="meal.idMeal" :meal="meal" />
      </div>

      <!-- No Results -->
      <div v-if="keyword && !meals.length" class="text-center py-12">
        <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 class="text-xl font-semibold text-gray-600 mb-2">No Meals Found</h3>
        <p class="text-gray-500">Try searching with different keywords</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import store from "../store";
import MealItem from '../components/MealItem.vue';

const route = useRoute();
const keyword = ref("");
const loading = ref(false);
const meals = computed(() => store.state.searchedMeals);

function searchMeals() {
  if (keyword.value) {
    loading.value = true;
    store.dispatch("searchMeals", keyword.value)
      .finally(() => loading.value = false);
  } else {
    store.commit("setSearchedMeals", []);
  }
}

onMounted(() => {
  keyword.value = route.params.name;
  if (keyword.value) {
    searchMeals();
  }
});
</script>

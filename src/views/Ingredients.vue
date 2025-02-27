<template>
  <div class="p-8">
    <div class="max-w-4xl mx-auto text-center mb-8">
      <h1 class="text-4xl font-bold text-orange-500 mb-4">Browse by Ingredients</h1>
      <p class="text-xl text-gray-600 mb-8">Find meals by their main ingredients</p>

      <div class="flex items-center justify-center max-w-xl mx-auto">
        <div class="relative w-full">
          <input
            type="text"
            v-model="keyword"
            class="w-full px-4 py-3 pl-12 rounded-xl border-2 bg-white border-gray-200 focus:ring-orange-500 focus:border-orange-500 transition-all"
            placeholder="Search ingredients..."
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
    <div v-if="!ingredients.length" class="flex justify-center items-center py-8">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
    </div>

    <!-- Ingredients Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <a
        v-for="ingredient of computedIngredients"
        :key="ingredient.idIngredient"
        @click.prevent="openIngredient(ingredient)"
        class="block bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
      >
        <div class="flex items-center space-x-4">
          <div class="bg-orange-100 rounded-lg p-3">
            <svg class="w-8 h-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
            </svg>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-800">{{ ingredient.strIngredient }}</h3>
            <p class="text-sm text-gray-500">Click to view recipes</p>
          </div>
        </div>
      </a>
    </div>

    <!-- No Results -->
    <div v-if="keyword && !computedIngredients.length" class="text-center py-12">
      <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h3 class="text-xl font-semibold text-gray-600 mb-2">No Ingredients Found</h3>
      <p class="text-gray-500">Try searching with different keywords</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from "@vue/reactivity";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import axiosClient from "../axiosClient";
import store from "../store";

const router = useRouter();
const keyword = ref("");
const ingredients = ref([]);

const computedIngredients = computed(() => {
  if (!keyword.value) return ingredients.value;
  return ingredients.value.filter((i) =>
    i.strIngredient.toLowerCase().includes(keyword.value.toLowerCase())
  );
});

function openIngredient(ingredient) {
  store.commit('setIngredient', ingredient);
  router.push({
    name: "byIngredient",
    params: { ingredient: ingredient.strIngredient },
  });
}

onMounted(() => {
  axiosClient.get("list.php?i=list").then(({ data }) => {
    ingredients.value = data.meals;
  });
});
</script>

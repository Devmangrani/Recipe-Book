<template>
  <div class="p-8">
    <div class="max-w-4xl mx-auto text-center mb-12">
      <h1 class="text-5xl font-bold text-orange-500 mb-4">
        Discover Delicious Recipes
      </h1>
      <p class="text-xl text-gray-600">
        Explore our collection of mouth-watering recipes from around the world
      </p>
    </div>

    <div class="mb-12">
      <h2 class="text-3xl font-bold text-gray-800 mb-6">Featured Recipes</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="meal in meals.slice(0, 3)"
          :key="meal.idMeal"
          class="relative"
        >
          <MealItem :meal="meal" />
        </div>
      </div>
    </div>

    <div>
      <h2 class="text-3xl font-bold text-gray-800 mb-6">More Recipes</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="meal in meals.slice(3)" :key="meal.idMeal">
          <MealItem :meal="meal" />
        </div>
      </div>
    </div>

    <div
      v-if="!meals.length"
      class="flex flex-col items-center justify-center py-12"
    >
      <svg
        class="w-16 h-16 text-gray-400 mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
        />
      </svg>
      <p class="text-xl text-gray-600">Loading recipes...</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axiosClient from "../axiosClient.js";
import MealItem from "../components/MealItem.vue";

const meals = ref([]);

onMounted(async () => {
  for (let i = 0; i < 9; i++) {
    axiosClient
      .get(`random.php`)
      .then(({ data }) => meals.value.push(data.meals[0]));
  }
});
</script>

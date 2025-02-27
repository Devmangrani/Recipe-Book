<template>
  <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
    <router-link :to="{ name: 'mealDetails', params: { id: meal.idMeal } }">
      <div class="relative">
        <img
          :src="meal.strMealThumb"
          :alt="meal.strMeal"
          class="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
        />
        <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <h3 class="text-white font-bold text-lg">{{ meal.strMeal }}</h3>
        </div>
      </div>
    </router-link>
    <div class="p-4">
      <p class="text-gray-600 text-sm mb-4 line-clamp-3">
        {{ $filters.truncateWords(meal.strInstructions, 20) }}
      </p>
      <div class="flex items-center justify-between">
        <YouTubeButton :href="meal.strYoutube" />
        <router-link 
          :to="{ name: 'mealDetails', params: { id: meal.idMeal } }"
          class="text-orange-500 hover:text-orange-600 font-medium"
        >
          View Recipe →
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import YouTubeButton from './YouTubeButton.vue';

const { meal } = defineProps({
  meal: {
    required: true,
    type: Object
  }
});
</script>

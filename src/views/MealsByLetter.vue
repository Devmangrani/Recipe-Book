<template>
  <div class="p-8">
    <div class="max-w-4xl mx-auto text-center mb-8">
      <h1 class="text-4xl font-bold text-orange-500 mb-4">Browse Meals by Letter</h1>
      <p class="text-xl text-gray-600 mb-8">Explore recipes alphabetically</p>
    </div>

    <!-- Alphabet Navigation -->
    <div class="bg-white rounded-xl shadow-md p-4 mb-8">
      <div class="flex flex-wrap justify-center gap-2">
        <router-link
          v-for="letter of letters"
          :key="letter"
          :to="{ name: 'byLetter', params: { letter } }"
          class="w-10 h-10 flex items-center justify-center rounded-lg text-lg font-semibold transition-all"
          :class="route.params.letter === letter ? 
            'bg-orange-500 text-white' : 
            'text-gray-600 hover:bg-orange-50 hover:text-orange-500'"
        >
          {{ letter }}
        </router-link>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-8">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
    </div>

    <!-- Results -->
    <div v-else>
      <h2 v-if="route.params.letter" class="text-2xl font-semibold text-gray-700 mb-6">
        Meals Starting with "{{ route.params.letter }}"
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <MealItem v-for="meal of meals" :key="meal.idMeal" :meal="meal" />
      </div>

      <!-- No Results -->
      <div v-if="route.params.letter && !meals.length" class="text-center py-12">
        <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 class="text-xl font-semibold text-gray-600 mb-2">No Meals Found</h3>
        <p class="text-gray-500">Try another letter</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "@vue/reactivity";
import { onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import store from "../store";
import MealItem from "../components/MealItem.vue";

const route = useRoute();
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const loading = computed(() => store.state.loading);
const meals = computed(() => {
  const letter = route.params.letter;
  return letter ? store.state.mealsByLetter[letter] || [] : [];
});

watch(() => route.params.letter, (newLetter) => {
  if (newLetter) {
    store.dispatch("searchMealsByLetter", newLetter);
  }
});

onMounted(() => {
  if (route.params.letter) {
    store.dispatch("searchMealsByLetter", route.params.letter);
  }
});
</script>

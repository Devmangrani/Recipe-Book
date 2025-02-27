<template>
  <div class="max-w-5xl mx-auto p-8">
    <!-- Loading State -->
    <div v-if="!meal.idMeal" class="flex justify-center items-center py-8">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
    </div>

    <div v-else>
      <div class="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <img 
            :src="meal.strMealThumb" 
            :alt="meal.strMeal" 
            class="w-full h-96 object-cover rounded-xl shadow-lg"
          >
        </div>
        
        <div>
          <h1 class="text-4xl font-bold mb-4 text-gray-800">{{ meal.strMeal }}</h1>
          
          <div class="grid grid-cols-2 gap-4 mb-6">
            <div class="bg-orange-50 rounded-lg p-4">
              <h3 class="text-sm font-medium text-gray-500 mb-1">Category</h3>
              <p class="text-lg font-semibold text-orange-500">{{ meal.strCategory }}</p>
            </div>
            <div class="bg-orange-50 rounded-lg p-4">
              <h3 class="text-sm font-medium text-gray-500 mb-1">Area</h3>
              <p class="text-lg font-semibold text-orange-500">{{ meal.strArea }}</p>
            </div>
          </div>

          <div class="flex gap-4 mb-6">
            <YouTubeButton :href="meal.strYoutube" />
            <a
              v-if="meal.strSource"
              :href="meal.strSource"
              target="_blank"
              class="inline-flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-orange-500 text-orange-500 hover:bg-orange-50 transition-colors"
            >
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              View Original
            </a>
          </div>

          <div v-if="meal.strTags" class="mb-6">
            <h3 class="text-lg font-semibold mb-2">Tags</h3>
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="tag in meal.strTags.split(',')" 
                :key="tag"
                class="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
              >
                {{ tag.trim() }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Instructions</h2>
        <p class="text-gray-600 leading-relaxed whitespace-pre-line">{{ meal.strInstructions }}</p>
      </div>

      <div class="grid md:grid-cols-2 gap-8">
        <div>
          <h2 class="text-2xl font-bold mb-4">Ingredients</h2>
          <ul class="space-y-2">
            <li 
              v-for="(el, ind) of new Array(20)" 
              :key="ind"
              v-if="meal[`strIngredient${ind + 1}`]"
              class="flex items-center gap-2 bg-white p-2 rounded-lg shadow-sm"
            >
              <span class="w-8 h-8 bg-orange-100 text-orange-500 rounded-lg flex items-center justify-center font-semibold">
                {{ ind + 1 }}
              </span>
              {{ meal[`strIngredient${ind + 1}`] }}
            </li>
          </ul>
        </div>

        <div>
          <h2 class="text-2xl font-bold mb-4">Measures</h2>
          <ul class="space-y-2">
            <li 
              v-for="(el, ind) of new Array(20)" 
              :key="ind"
              v-if="meal[`strMeasure${ind + 1}`]"
              class="flex items-center gap-2 bg-white p-2 rounded-lg shadow-sm"
            >
              <span class="w-8 h-8 bg-orange-100 text-orange-500 rounded-lg flex items-center justify-center font-semibold">
                {{ ind + 1 }}
              </span>
              {{ meal[`strMeasure${ind + 1}`] }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router';
import axiosClient from '../axiosClient';
import YouTubeButton from '../components/YouTubeButton.vue';

const route = useRoute();
const meal = ref({})

onMounted(() => {
  axiosClient.get(`lookup.php?i=${route.params.id}`)
    .then(({ data }) => {
      meal.value = data.meals[0] || {}
    })
})

</script>
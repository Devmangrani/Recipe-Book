<template>
  <header class="bg-white shadow-md">
    <nav class="container mx-auto px-4 py-3">
      <div class="flex justify-between items-center">
        <router-link
          :to="{ name: 'home' }"
          class="text-2xl font-bold text-orange-500 hover:text-orange-600 transition-colors flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          Recipe Book
        </router-link>
        
        <div class="hidden md:flex items-center space-x-4">
          <router-link
            v-for="item in menuItems"
            :key="item.name"
            :to="item.to"
            class="px-4 py-2 rounded-lg text-gray-600 hover:text-orange-500 hover:bg-orange-50 transition-all"
            active-class="bg-orange-50 text-orange-500"
          >
            {{ item.name }}
          </router-link>
        </div>

        <!-- Mobile Menu Button -->
        <button @click="isOpen = !isOpen" class="md:hidden text-gray-500 hover:text-orange-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path v-if="!isOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div v-show="isOpen" class="md:hidden mt-4 space-y-2">
        <router-link
          v-for="item in menuItems"
          :key="item.name"
          :to="item.to"
          class="block px-4 py-2 text-gray-600 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-all"
          active-class="bg-orange-50 text-orange-500"
          @click="isOpen = false"
        >
          {{ item.name }}
        </router-link>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue';

const isOpen = ref(false);

const menuItems = [
  { name: 'Search Meals', to: { name: 'byName' } },
  { name: 'Meals By Letter', to: { name: 'byLetter' } },
  { name: 'Browse Ingredients', to: { name: 'ingredients' } }
];
</script>

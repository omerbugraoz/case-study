<template>
  <div class="sidebar hidden md:block min-h-screen p-4 w-64">
    <h1 class="text-xl font-bold mb-8">Forex App</h1>

    <template v-for="item in allRoutes" :key="item.path">
      <router-link v-slot="{ href, navigate, isActive }" :to="item.path" custom>
        <a
          :href="href"
          @click="navigate"
          :class="{ 'bg-primary/20 text-primary': isActive }"
          class="flex items-center px-4 py-2 rounded-md gap-2"
        >
          <span :class="item.icon" />
          <span class="ml-2">{{ item.name }}</span>
        </a>
      </router-link>
    </template>
  </div>
</template>

<script setup lang="ts">
import { allRoutes } from '../../../utils/constants'
</script>

<template>
  <div class="flex min-h-screen">
    <Sidebar class="w-64 flex-shrink-0" />
    <main class="flex-grow bg-gray-50">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import Sidebar from './components/layout/Sidebar/Sidebar.vue'
</script>
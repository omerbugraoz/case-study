<template>
  <div class="md:flex md:min-h-screen">
    <Sidebar />
    <MobileMenu />
    <main class="flex-grow bg-gray-50">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import Sidebar from './components/layout/Sidebar/Sidebar.vue'
import MobileMenu from './components/layout/MobileMenu/MobileMenu.vue'
</script>

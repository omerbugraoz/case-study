<template>
  <div class="sidebar bg-gray-800 min-h-screen p-4">
    <h1 class="text-white text-xl font-bold mb-8">Forex App</h1>
    <div class="flex flex-col gap-2">
      <Button
        class="p-button-text text-white justify-start"
        :class="{ 'bg-gray-700': route.path === '/tracker' }"
        @click="router.push('/tracker')"
      >
        <i class="pi pi-chart-line mr-2" />
        Tracker
      </Button>
      <Button
        class="p-button-text text-white justify-start"
        :class="{ 'bg-gray-700': route.path === '/assets' }"
        @click="router.push('/assets')"
      >
        <i class="pi pi-wallet mr-2" />
        My Assets
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import Button from 'primevue/button'

const router = useRouter()
const route = useRoute()
</script>

<style scoped>
.p-button.p-button-text {
  color: white;
  width: 100%;
  padding: 0.75rem;
}

.p-button.p-button-text:hover {
  background: rgba(255, 255, 255, 0.1);
}
</style>  
<template>
  <div>
    <div class="flex items-center justify-between md:hidden p-4 bg-white shadow">
      <Button icon="pi pi-bars" severity="secondary" @click="toggleSidebar" />
      <h1 class="text-xl font-bold ml-4">Forex App</h1>
    </div>

    <transition name="slide">
      <aside v-if="isOpen" class="fixed top-0 left-0 h-full w-full bg-white shadow-lg z-50 overflow-y-auto">
        <div class="flex items-center justify-between p-4 border-b">
          <h2 class="text-lg font-semibold">Menu</h2>
          <Button icon="pi pi-times" class="p-button-text" @click="toggleSidebar" />
        </div>
        <template v-for="item in allRoutes" :key="item.path">
          <router-link v-slot="{ href, isActive }" :to="item.path" custom>
            <a
              :href="href"
              :class="{ 'bg-primary/20 text-primary': isActive }"
              class="flex items-center px-4 py-2 rounded-md gap-2 mt-2"
            >
              <span :class="item.icon" />
              <span>{{ item.name }}</span>
            </a>
          </router-link>
        </template>
      </aside>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Button from 'primevue/button'
import { allRoutes } from '../../../utils/constants'

const isOpen = ref(false)

const toggleSidebar = () => {
  isOpen.value = !isOpen.value
}
</script>

<style scoped>
/* Fade transition for overlay */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 200ms ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

/* Slide transition for sidebar */
.slide-enter-active,
.slide-leave-active {
  transition: transform 200ms ease;
}
.slide-enter-from {
  transform: translateX(-100%);
}
.slide-enter-to {
  transform: translateX(0%);
}
.slide-leave-from {
  transform: translateX(0%);
}
.slide-leave-to {
  transform: translateX(-100%);
}
</style>

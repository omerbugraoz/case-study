<template>
  <div class="sideba min-h-screen p-4">
    <h1 class="text-xl font-bold mb-8">Forex App</h1>
    <div class="flex flex-col gap-2">
      <Button
        v-for="singleRoute in allRoutes"
        :key="singleRoute.path"
        @click="router.push(singleRoute.path)"
        :severity="singleRoute.path === route.path ? 'secondary' : 'primary'"
      >
        {{ singleRoute.name }}
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import Button from 'primevue/button'
import { allRoutes } from '../../../utils/constants'

const router = useRouter()
const route = useRoute()

</script>

<style scoped></style>

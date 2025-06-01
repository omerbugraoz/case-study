<template>
  <div class="flex justify-center items-center min-h-[80vh] p-8">
    <Card class="w-full max-w-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg">
      <template #content>
        <div class="text-center py-8 px-6">
          <i class="pi pi-exclamation-triangle text-6xl text-yellow-500 mb-6 block"></i>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">404 - Page Not Found</h1>
          <p class="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div class="flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              label="Go to Tracker"
              @click="$router.push('/tracker')"
              class="bg-blue-600 hover:bg-blue-700 text-white border-0 px-6 py-2"
            />
            <Button 
              label="Go to Assets"
              severity="secondary"
              @click="$router.push('/assets')"
              class="border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800 px-6 py-2"
            />
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import Card from 'primevue/card'
import Button from 'primevue/button'
</script>
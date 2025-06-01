<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">My Assets</h1>
    <DataTable :value="assets" :paginator="true" :rows="10" :rowsPerPageOptions="[10, 20, 50]">
      <Column field="pair" header="Pair" />
      <Column field="volume" header="Volume" />
      <Column field="price" header="Price" />
      <Column field="totalValue" header="Total Value" />
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAssetsStore } from '../stores/assets'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const assetsStore = useAssetsStore()

const assets = computed(() => assetsStore.assets)
</script>

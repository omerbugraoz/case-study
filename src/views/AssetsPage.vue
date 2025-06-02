<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">My Assets</h1>
    <DataTable
      :value="assets"
      :paginator="assets.length > 10"
      :rows="10"
      :rowsPerPageOptions="[10, 20, 50]"
      v-bind="{ 'v-slots': assets.length === 0 ? { empty: () => 'No assets found' } : {} }"
    >
      <Column field="symbol" sortable header="Pair" />
      <Column field="volume" sortable header="Volume" />
      <Column field="price" sortable header="Price" />
      <Column field="totalValue" sortable header="Total Value" />
      <Column>
        <template #body="slotProps">
          <Button
            icon="pi pi-trash"
            rounded
            severity="danger"
            @click="assetsStore.removeAsset(assets.indexOf(slotProps.data))"
          />
        </template>
      </Column>
      <template #empty>
        <div class="flex flex-col items-center justify-center p-6">
          <p class="text-xl text-gray-500">No assets found</p>
          <p class="text-gray-400">Your portfolio is empty. Visit the Tracker page to buy some assets.</p>
        </div>
      </template>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAssetsStore } from '../stores/assets'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'

const assetsStore = useAssetsStore()

const assets = computed(() => assetsStore.assets)
</script>

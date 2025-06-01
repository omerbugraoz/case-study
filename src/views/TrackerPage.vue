<template>
  <div class="p-4">
    <div class="flex justify-between">
      <h1 class="text-2xl font-bold mb-4">Forex Pairs Tracker</h1>
      <Button label="Buy" :disabled="selectedPairs.length === 0" @click="isAddAssetsContentVisible = true" />
    </div>
    <DataTable v-model:selection="selectedPairs" :value="dummyTracker" tableStyle="min-width: 50rem">
      <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
      <Column field="pair" sortable header="Pair"></Column>
      <Column field="price" sortable header="Price"></Column>
      <Column field="changePercent" sortable header="Change %"></Column>
      <Column field="volume" sortable header="Volume"></Column>
      <Column field="lastUpdate" sortable header="Last Update"></Column>
    </DataTable>
  </div>
  <Dialog v-model:visible="isAddAssetsContentVisible" header="Buy" :modal="true" :closable="false">
    <AddAssetsContent
      :assets="selectedPairs"
      @closeDialog="isAddAssetsContentVisible = false"
      @buyAssets="handleBuyAssets"
    />
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { dummyTracker } from '../../data/dummyTracker'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import AddAssetsContent from '../components/common/AddAssetsContent/AddAssetsContent.vue'
import { useAssetsStore } from '../stores/assets'
import type { IBuyAssetPayload } from '../types/assets'

const isAddAssetsContentVisible = ref(false)
const selectedPairs = ref<any[]>([])
const assetsStore = useAssetsStore()

const handleBuyAssets = (assets: IBuyAssetPayload[]) => {
  assets.forEach((asset) => {
    assetsStore.buyAsset(asset)
  })
  isAddAssetsContentVisible.value = false
  selectedPairs.value = []
}
</script>

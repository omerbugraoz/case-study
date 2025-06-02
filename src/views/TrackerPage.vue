<template>
  <div class="p-4">
    <div class="flex justify-between mb-2">
      <h1 class="text-2xl font-bold mb-4">Forex Pairs Tracker</h1>
      <Button
        :class="selectedPairs.length === 0 ? '!cursor-not-allowed' : ''"
        label="Buy"
        :disabled="selectedPairs.length === 0"
        @click="isAddAssetsContentVisible = true"
        raised
        variant="outlined"
        icon="pi pi-plus"
      />
    </div>
    <DataTable
      :value="isLoading ? loadingRows : tickArray"
      tableStyle="min-width: 100%"
      size="small"
      v-model:selection="selectedPairs"
      :selectionMode="isLoading ? undefined : 'multiple'"
      dataKey="symbol"
    >
      <Column v-if="!isLoading" selectionMode="multiple"></Column>
      <Column field="symbol" header="Pair" sortable>
        <template #body="{ data }" v-if="isLoading">
          <Skeleton width="8rem" height="1.2rem" />
        </template>
      </Column>
      <Column field="price" header="Price" sortable>
        <template #body="{ data }" v-if="isLoading">
          <Skeleton width="6rem" height="1.2rem" />
        </template>
      </Column>
      <Column field="changePercent" header="% Change" sortable>
        <template #body="{ data }">
          <template v-if="isLoading">
            <Skeleton width="5rem" height="1.2rem" />
          </template>
          <span
            v-else
            :class="{
              'text-green-600': parseFloat(data.changePercent) > 0,
              'text-red-600': parseFloat(data.changePercent) < 0,
            }"
          >
            {{ data.changePercent }}
          </span>
        </template>
      </Column>
      <Column field="volume" header="Volume" sortable>
        <template #body="{ data }" v-if="isLoading">
          <Skeleton width="7rem" height="1.2rem" />
        </template>
      </Column>
      <Column field="lastUpdate" header="Last Update" sortable>
        <template #body="{ data }" v-if="isLoading">
          <Skeleton width="6rem" height="1.2rem" />
        </template>
      </Column>
    </DataTable>
  </div>

  <p class="mb-2">
    Durum:
    <span
      :class="{
        'text-green-600': status === 'connected',
        'text-red-600': status === 'disconnected',
      }"
    >
      {{ status }}
    </span>
    <span v-if="statusInfo">{{ '(' + statusInfo + ')' }}</span>
  </p>

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
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import Skeleton from 'primevue/skeleton'
import AddAssetsContent from '../components/common/AddAssetsContent/AddAssetsContent.vue'
import { useAssetsStore } from '../stores/assets'
import type { IBuyAssetPayload } from '../types/assets'
import { computed, onMounted, onUnmounted } from 'vue'
import { useForexStore } from '../stores/forex'

const isAddAssetsContentVisible = ref(false)
const selectedPairs = ref<any[]>([])
const assetsStore = useAssetsStore()
const isLoading = ref(true)

const forexStore = useForexStore()

const ticks = computed(() => forexStore.ticks)
const status = computed(() => forexStore.status)
const statusInfo = computed(() => forexStore.statusInfo)

const tickArray = computed(() => {
  return Object.values(ticks.value).map((t) => {
    const lastUpdate = new Date(t.timestamp).toLocaleTimeString('tr-TR')
    const symbol = t.symbol.replace('OANDA:', '').replace('_', '/')
    const formatted = {
      symbol,
      price: t.price.toFixed(5),
      changePercent: t.changePercent.toFixed(3) + '%',
      volume: t.volume.toFixed(2),
      lastUpdate,
    }
    return formatted
  })
})

const loadingRows = Array(10).fill({
  symbol: '',
  price: '',
  changePercent: '',
  volume: '',
  lastUpdate: '',
})

const handleBuyAssets = (assets: IBuyAssetPayload[]) => {
  assets.forEach((asset) => {
    assetsStore.buyAsset(asset)
  })
  isAddAssetsContentVisible.value = false
  selectedPairs.value = []
}

onMounted(() => {
  forexStore.start()
  // Simulate initial loading
  setTimeout(() => {
    isLoading.value = false
  }, 1000)
})

onUnmounted(() => {
  forexStore.stop()
})
</script>

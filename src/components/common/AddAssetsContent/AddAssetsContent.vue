<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col gap-4">
      <div v-for="asset in assets" :key="asset.id" class="flex justify-between items-center gap-4">
        <span>{{ asset.symbol }} Volume</span>
        <InputNumber v-model="asset.volume" :min="1" :showButtons="false" />
      </div>
    </div>
    <div class="flex justify-end gap-4">
      <Button label="Cancel" severity="danger" @click="closeDialog" />
      <Button label="Buy" @click="buyAssets" />
    </div>
  </div>
</template>
<script setup lang="ts">
import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'
import type { IBuyAssetPayload } from '../../../types/assets'

const props = defineProps<{
  assets: IBuyAssetPayload[]
}>()

const emit = defineEmits<{
  closeDialog: [void]
  buyAssets: [assets: IBuyAssetPayload[]]
}>()

const closeDialog = () => {
  emit('closeDialog')
}

const buyAssets = () => {
  emit('buyAssets', props.assets)
}
</script>

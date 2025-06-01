<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Tracker</h1>
    <div v-if="connectionError" class="p-4 mb-4 text-red-700 bg-red-100 rounded-lg">
      {{ connectionError }}
    </div>
    <!-- Content will be added later -->
    <DataTable v-model:selection="selectedPairs" :value="dummyTracker" tableStyle="min-width: 50rem">
      <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
      <Column field="pair" sortable header="Pair"></Column>
      <Column field="price" sortable header="Price"></Column>
      <Column field="valume" sortable header="Valume"></Column>
      <Column field="changePercent" sortable header="Change Percent"></Column>
      <Column field="lastUpdate" sortable header="Last Update"></Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { dummyTracker } from '../../data/dummyTracker'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const connectionError = ref<string | null>(null)
const selectedPairs = ref<any[]>([])

</script>

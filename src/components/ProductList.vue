<script setup>
import { DataView, SelectButton } from 'primevue'
import { onMounted, ref } from 'vue'

//passing updateCartCount function using prop drilling
// const { updateCartCount } = defineProps(['updateCartCount'])

// passing updateCartCount using provide/inject and avoiding prop drilling
// const { updateCartCount } = inject('cartCount')

import { ProductService } from '@/service/ProductService'
import ProductGridView from './ProductGridView.vue'
import ProductListView from './ProductListView.vue'

onMounted(() => {
  ProductService.getProducts().then((data) => (products.value = data.slice(0, 12)))
})

const products = ref()
const layout = ref('grid')
const options = ref(['list', 'grid'])

const getSeverity = (product) => {
  switch (product.inventoryStatus) {
    case 'INSTOCK':
      return 'success'

    case 'LOWSTOCK':
      return 'warn'

    case 'OUTOFSTOCK':
      return 'danger'

    default:
      return null
  }
}
</script>

<template>
  <div class="card">
    <DataView :value="products" :layout="layout">
      <template #header>
        <div class="flex justify-end">
          <SelectButton v-model="layout" :options="options" :allowEmpty="false">
            <template #option="{ option }">
              <i :class="[option === 'list' ? 'pi pi-bars' : 'pi pi-table']" />
            </template>
          </SelectButton>
        </div>
      </template>

      <template #list="slotProps">
        <div class="flex flex-col">
          <div v-for="(item, index) in slotProps.items" :key="index">
            <div
              class="flex flex-col sm:flex-row sm:items-center p-6 gap-4"
              :class="{ 'border-t border-surface-200 dark:border-surface-700': index !== 0 }"
            >
              <ProductListView :product="item" :get-severity="getSeverity"></ProductListView>
            </div>
          </div>
        </div>
      </template>

      <template #grid="slotProps">
        <div class="grid grid-cols-12 gap-4">
          <div
            v-for="(item, index) in slotProps.items"
            :key="index"
            class="col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-6 p-2"
          >
            <ProductGridView :product="item" :get-severity="getSeverity"></ProductGridView>
          </div>
        </div>
      </template>
    </DataView>
  </div>
</template>

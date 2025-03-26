<script setup>
import { Button, Tag } from 'primevue'
import { inject } from 'vue'
import { RouterLink } from 'vue-router'

const addToCart = inject('addToCart')

const { product: item, getSeverity } = defineProps(['product', 'getSeverity'])
</script>
<template>
  <div
    class="p-6 border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 rounded flex flex-col"
  >
    <div class="bg-surface-50 flex justify-center rounded p-4">
      <RouterLink :to="`/product/${item.id}`">
        <div class="relative mx-auto">
          <img
            class="rounded w-full"
            :src="`https://primefaces.org/cdn/primevue/images/product/${item.image}`"
            :alt="item.name"
            style="max-width: 300px"
          />
          <div class="absolute bg-black/70 rounded-border" style="left: 4px; top: 4px">
            <Tag :value="item.inventoryStatus" :severity="getSeverity(item)"></Tag>
          </div></div
      ></RouterLink>
    </div>
    <div class="pt-6">
      <div class="flex flex-row justify-between items-start gap-2">
        <div>
          <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{
            item.category
          }}</span>
          <div class="text-lg font-medium mt-1">{{ item.name }}</div>
        </div>
        <div class="bg-surface-100 p-1" style="border-radius: 30px">
          <div
            class="bg-surface-0 flex items-center gap-2 justify-center py-1 px-2"
            style="
              border-radius: 30px;
              box-shadow:
                0px 1px 2px 0px rgba(0, 0, 0, 0.04),
                0px 1px 2px 0px rgba(0, 0, 0, 0.06);
            "
          >
            <span class="text-surface-900 font-medium text-sm">{{ item.rating }}</span>
            <i class="pi pi-star-fill text-yellow-500"></i>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-6 mt-6">
        <span class="text-2xl font-semibold">${{ item.price }}</span>
        <div class="flex gap-2">
          <Button
            icon="pi pi-shopping-cart"
            label="Buy Now"
            :disabled="item.inventoryStatus === 'OUTOFSTOCK'"
            class="flex-auto whitespace-nowrap"
            @click="() => addToCart(item)"
          ></Button>
          <Button icon="pi pi-heart" outlined></Button>
        </div>
      </div>
    </div>
  </div>
</template>

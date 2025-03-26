<script setup>
import { ProductService } from '@/service/ProductService'
import { Button } from 'primevue'
import { inject, onBeforeMount, ref } from 'vue'
// import { useRoute } from 'vue-router'

// const route = useRoute()
const product = ref(0)
const addToCart = inject('addToCart')

const { id } = defineProps({
  id: String,
})

onBeforeMount(async () => {
  product.value = await ProductService.getProducts().then((data) =>
    // using route params to get the product it
    // data.find((product) => product.id === route.params.id),

    // passing product id as a prop through the router
    data.find((product) => product.id === id),
  )
})
</script>

<template>
  <div
    class="p-6 border w-3xl border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 rounded flex flex-col"
  >
    <div class="bg-surface-50 flex justify-center rounded p-4 items-center">
      <div class="relative mx-auto">
        <img
          class="rounded w-full"
          :src="`https://primefaces.org/cdn/primevue/images/product/${product.image}`"
          :alt="product.name"
          style="max-width: 300px"
        />
        <!-- <div class="absolute bg-black/70 rounded-border" style="left: 4px; top: 4px">
          <Tag :value="product.inventoryStatus" :severity="getSeverity(item)"></Tag>
        </div> -->
      </div>
      <p>{{ product.description }}</p>
    </div>
    <div class="pt-6">
      <div class="flex flex-row justify-between items-start gap-2">
        <div>
          <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{
            product.category
          }}</span>
          <div class="text-lg font-medium mt-1">{{ product.name }}</div>
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
            <span class="text-surface-900 font-medium text-sm">{{ product.rating }}</span>
            <i class="pi pi-star-fill text-yellow-500"></i>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-6 mt-6">
        <span class="text-2xl font-semibold">${{ product.price }}</span>
        <div class="flex gap-2">
          <Button
            icon="pi pi-shopping-cart"
            label="Buy Now"
            :disabled="product.inventoryStatus === 'OUTOFSTOCK'"
            class="flex-auto whitespace-nowrap"
            @click="() => addToCart(product)"
          ></Button>
          <Button icon="pi pi-heart" outlined></Button>
        </div>
      </div>
    </div>
  </div>
</template>

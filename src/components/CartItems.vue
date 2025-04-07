<script setup>
import { Button, Column, DataTable, Rating } from 'primevue'
import { computed, inject, onMounted, ref } from 'vue'

//passing updateCartCount function using prop drilling
// const { updateCartCount } = defineProps(['updateCartCount'])

// passing updateCartCount using provide/inject and avoiding prop drilling
const { updateCartCount } = inject('cartCount')

const products = ref(JSON.parse(localStorage.getItem('cart')))

const formatCurrency = (value) => {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}

const addItem = (item) => {
  const product = products.value.find((product) => product.id === item.id)
  if (product) {
    product.quantity += 1
    localStorage.setItem('cart', JSON.stringify(products.value))
    updateCartCount()
  }
}

const removeItem = (item) => {
  const product = products.value.find((product) => product.id === item.id)
  if (product.quantity === 1) {
    const index = products.value.findIndex((product) => product.id === item.id)
    if (index !== -1) {
      products.value.splice(index, 1)
    }
  } else product.quantity -= 1
  localStorage.setItem('cart', JSON.stringify(products.value))
  updateCartCount()
}

const cartTotal = computed(() => {
  return products.value.reduce((acc, product) => acc + product.quantity * product.price, 0)
})

onMounted(() => {
  updateCartCount()
  //   cartItems.value = JSON.parse(localStorage.getItem('cart'))
})
</script>

<template>
  <div class="card">
    <DataTable :value="products" tableStyle="min-width: 50rem">
      <template #header>
        <div class="flex flex-wrap items-center justify-between gap-2">
          <span class="text-xl font-bold">Products</span>
          <Button icon="pi pi-refresh" rounded raised />
        </div>
      </template>
      <Column header="Name">
        <template #body="slotProps">
          <RouterLink :to="`/product/${slotProps.data.id}`">
            <p>{{ slotProps.data.name }}</p></RouterLink
          >
        </template></Column
      >
      <Column header="Image">
        <template #body="slotProps">
          <RouterLink :to="`/product/${slotProps.data.id}`">
            <img
              :src="`https://primefaces.org/cdn/primevue/images/product/${slotProps.data.image}`"
              :alt="slotProps.data.image"
              class="w-24 rounded"
          /></RouterLink>
        </template>
      </Column>
      <Column field="price" header="Price">
        <template #body="slotProps">
          {{ formatCurrency(slotProps.data.price) }}
        </template>
      </Column>
      <Column field="category" header="Category"></Column>
      <Column field="rating" header="Reviews">
        <template #body="slotProps">
          <Rating :modelValue="slotProps.data.rating" readonly />
        </template>
      </Column>
      <Column field="quantity" header="Quantity">
        <template #body="slotProps">
          <div class="flex justify-start items-center w-32">
            <Button
              icon="pi pi-minus"
              size="small"
              @click="() => removeItem(slotProps.data)"
            ></Button>
            <p class="px-4 text-base font-medium">{{ slotProps.data.quantity }}</p>
            <Button icon="pi pi-plus" size="small" @click="() => addItem(slotProps.data)"></Button>
          </div>
        </template>
      </Column>
      <template #footer>
        <div class="flex justify-between items-center mx-10">
          <p>In total there are {{ products ? products.length : 0 }} products.</p>
          <p>Total: {{ formatCurrency(cartTotal) }}</p>
        </div>
      </template>
    </DataTable>
  </div>
</template>

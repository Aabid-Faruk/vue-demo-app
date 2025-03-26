<script setup>
import { Button, InputText, Menubar } from 'primevue'
import { inject } from 'vue'
import { RouterLink } from 'vue-router'

// const { cartCount, displayCart, hideCart } = defineProps(['cartCount', 'displayCart', 'hideCart'])
const { cartCount } = inject('cartCount')
</script>
<template>
  <Menubar>
    <template #start>
      <RouterLink to="/"><Button label="Products" icon="pi pi-home" /></RouterLink
    ></template>
    <template #end>
      <RouterLink to="/cart">
        <div class="flex items-center gap-2">
          <InputText placeholder="Search" type="text" class="w-32 sm:w-auto" />
          <Button icon="pi pi-shopping-cart" :badge="cartCount.toString()" /></div
      ></RouterLink>
    </template>
  </Menubar>
</template>

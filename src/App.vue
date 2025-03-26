<script setup>
import { onMounted, provide, ref } from 'vue'
import MenuBar from './components/MenuBar.vue'
// import ProductList from './components/ProductList.vue'
// import CartItems from './components/CartItems.vue'
import { RouterView } from 'vue-router'

const cartCount = ref(0)
// const showCart = ref(false)

// const displayCart = () => (showCart.value = true)

// const hideCart = () => (showCart.value = false)

const updateCartCount = () => {
  let cart = JSON.parse(localStorage.getItem('cart')) || []
  cartCount.value = cart.reduce((acc, item) => acc + item.quantity, 0)
}

provide('cartCount', {
  cartCount,
  updateCartCount,
})

const addToCart = (product) => {
  let cart = JSON.parse(localStorage.getItem('cart')) || []
  let found = cart.find((item) => item.id === product.id)
  if (found) {
    found.quantity++
  } else {
    cart.push({ ...product, quantity: 1 })
  }
  localStorage.setItem('cart', JSON.stringify(cart))
  updateCartCount()
}

provide('addToCart', addToCart)

onMounted(() => {
  updateCartCount()
})
</script>

<template>
  <div class="flex-col space-y-3">
    <MenuBar></MenuBar>
    <RouterView></RouterView>
  </div>
</template>

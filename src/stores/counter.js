import { defineStore } from 'pinia'
import { ref } from 'vue'

let cart = JSON.parse(localStorage.getItem('cart')) || []
// export const useCartCounterStore = defineStore('counter', {
//   state: () => ({ count: cart.reduce((acc, item) => acc + item.quantity, 0) }),
//   actions: {
//     useCartCounterStore() {
//       console.log('I am executed')

//       cart = JSON.parse(localStorage.getItem('cart')) || []
//       this.count = cart.reduce((acc, item) => acc + item.quantity, 0)
//     },
//   },
// })

export const useCartCounterStore = defineStore('counter', () => {
  const count = ref(cart.reduce((acc, item) => acc + item.quantity, 0))
  function updateCartCount() {
    cart = JSON.parse(localStorage.getItem('cart')) || []
    count.value = cart.reduce((acc, item) => acc + item.quantity, 0)
  }

  return { count, updateCartCount }
})

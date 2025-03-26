import CartItems from '@/components/CartItems.vue'
import Product from '@/components/Product.vue'
import ProductList from '@/components/ProductList.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: ProductList },
  { path: '/cart', component: CartItems },
  { path: '/product/:id', component: Product, props: true },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

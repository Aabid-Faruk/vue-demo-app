import './assets/main.css'

import PrimeVue from 'primevue/config'
import { createApp } from 'vue'
import App from './App.vue'
import Noir from './presets/Noir'
import router from './router/routes'
import { createPinia } from 'pinia'

const app = createApp(App)
const pinia = createPinia()

app
  .use(PrimeVue, {
    theme: {
      preset: Noir,
      options: {
        prefix: 'p',
        darkModeSelector: '.p-dark',
        cssLayer: false,
      },
    },
  })
  .use(router)
  .use(pinia)
  .mount('#app')

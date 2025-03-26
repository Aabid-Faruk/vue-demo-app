import './assets/main.css'

import PrimeVue from 'primevue/config'
import { createApp } from 'vue'
import App from './App.vue'
import Noir from './presets/Noir'
import router from './router/routes'

const app = createApp(App)

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
  .mount('#app')

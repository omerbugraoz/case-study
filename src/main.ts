import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura' // https://primevue.org/themes/aura/

import { createPinia } from 'pinia'

const app = createApp(App)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})
app.use(createPinia())
app.mount('#app')

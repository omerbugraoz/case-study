import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura' // https://primevue.org/themes/aura/
import router from './router'
import { createPinia } from 'pinia'

const app = createApp(App)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: false || 'none',
    },
  },
})
app.use(router)
app.use(createPinia())
app.mount('#app')

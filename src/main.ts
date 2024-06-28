import '@/assets/css/index.css'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import primeVue from 'primevue/config'
import { configure } from 'vee-validate'
import App from './App.vue'
import { addDateTimerPickerDirective } from './components'
import router from './router'

const app = createApp(App)

/* vee-validate config*/
configure({
  validateOnInput: true
})
addDateTimerPickerDirective(app)
app.use(createPinia())
app.use(router)
app.use(primeVue)

app.mount('#app')

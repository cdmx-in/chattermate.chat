import './assets/styles/main.css'
import '@/assets/design-tokens.css'
import '@/assets/base.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { initializeFirebase } from './services/firebase'
const app = createApp(App)

app.use(createPinia())
app.use(router)

initializeFirebase()

app.mount('#app')

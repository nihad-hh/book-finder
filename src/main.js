import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vueDebounce from 'vue-debounce'
import './index.css'
import store from './store'

const app = createApp(App)

app.use(router)

app.use(store)

app.directive('debounce', vueDebounce({ lock: true }))

app.mount('#app')

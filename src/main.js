import './assets/main.css'
import AntD from 'ant-design-vue'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
const app = createApp(App)

app.use(createPinia())
app.use(AntD)
app.mount('#app')

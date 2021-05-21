import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import '@/styles/index.scss'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import 'element-plus/lib/theme-chalk/index.css'
import ElementPlus from 'element-plus'
import router from './router'
import './permission'
import { store } from './store'

createApp(App).use(ElementPlus).use(store).use(router).mount('#app')

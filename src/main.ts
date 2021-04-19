import { createApp } from 'vue'
import App from './App.vue'
import Router from './router'
import Store, { key } from './store'
import Plugins from './plugins'
import Directive from './directive'
import 'ant-design-vue/dist/antd.css'
import './style/theme.scss'
const app = createApp(App)

app.use(Store, key).use(Router).use(Plugins).use(Directive).mount('#app')

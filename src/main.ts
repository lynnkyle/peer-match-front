import {createApp} from 'vue'
import './style.css'
import 'vant/es/toast/style'
import App from './App.vue'
import router from "./config/router.ts";

const app = createApp(App)
app.use(router)
app.mount('#app')

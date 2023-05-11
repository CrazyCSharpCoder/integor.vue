import { createApp } from 'vue'
import App from './App.vue'

import router from "@/router";
import store from "@/store";
import routeNames from "@/plugins/routeNames";
import listKeyGenerator from "@/plugins/listKeyGenerator";

const app = createApp(App)

app.use(router)
app.use(store)
app.use(routeNames)
app.use(listKeyGenerator)

app.mount('#app')

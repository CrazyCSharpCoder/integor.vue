import { createApp } from 'vue'
import App from './App.vue'

import errorHandler from "@/helpers/errorHandler";

import router from "@/router";
import store from "@/store";
import routeNames from "@/plugins/routeNames";
import listKeyGenerator from "@/plugins/listKeyGenerator";
import modelValidation from "@/plugins/modelValidation";
import configuration from "@/plugins/appConfiguration";
import emitter from "@/plugins/emitter";
import appEvents from "@/plugins/appEvents";
import formHelpers from "@/plugins/formHelpers";
import api from "@/plugins/api";

const app = createApp(App)

const plugins = [
    router,
    store,
    routeNames,
    listKeyGenerator,
    modelValidation,
    configuration,
    emitter,
    appEvents,
    formHelpers,
    api
]

for (let plugin of plugins)
    app.use(plugin)

app.config.errorHandler = errorHandler

app.mount('#app')

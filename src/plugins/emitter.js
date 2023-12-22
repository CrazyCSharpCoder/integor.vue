import {emitter} from "@/helpers/appEvents";

export default {
    install(app) {
        app.config.globalProperties.$emitter = emitter
    }
}
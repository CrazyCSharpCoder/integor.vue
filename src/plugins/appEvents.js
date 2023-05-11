import appEvents from "@/helpers/appEvents";

export default {
    install(app) {
        app.config.globalProperties.$appEvents = appEvents
    }
}
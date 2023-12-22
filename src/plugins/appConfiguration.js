import configuration from "@/configuration";

export default {
    install(app) {
        app.config.globalProperties.$appConfiguration = configuration
    }
}
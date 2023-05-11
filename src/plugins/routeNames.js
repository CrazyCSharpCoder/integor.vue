import routeNames from "@/router/routeNames";

export default {
    install(app) {
        app.config.globalProperties.$routeNames = routeNames
    }
}
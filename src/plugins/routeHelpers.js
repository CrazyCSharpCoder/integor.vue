import routeHelpers from "@/helpers/routeHelpers";

export default function (app) {
    app.config.globalProperties.$routeHelpers = routeHelpers
}
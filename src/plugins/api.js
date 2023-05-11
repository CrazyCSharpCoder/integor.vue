import api from "@/api";

export default function (app) {
    app.config.globalProperties.$api = api
}

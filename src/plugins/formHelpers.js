import formHelpers from "@/helpers/formHelpers";

export default {
    install(app) {
        app.config.globalProperties.$formsHelp = formHelpers
    }
}
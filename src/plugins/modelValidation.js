import modelValidationHelpers from "@/helpers/modelValidationHelpers";

export default {
    install(app) {
        app.config.globalProperties.$modelValidation = modelValidationHelpers
    }
}
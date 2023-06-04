import botEventsHelpers from "@/helpers/special/botEventsHelpers";

export default function (app) {
    app.config.globalProperties.$special = {
        botEventsHelpers
    }
}

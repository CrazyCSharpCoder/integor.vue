import dateFormattingHelpers from "@/helpers/dateFormattingHelpers";

export default function (app) {
    app.config.globalProperties.$dateFormat = dateFormattingHelpers
}
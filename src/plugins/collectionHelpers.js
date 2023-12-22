import collectionHelpers from "@/helpers/collectionHelpers";

export default function (app) {
    app.config.globalProperties.$collectionHelp = collectionHelpers
}
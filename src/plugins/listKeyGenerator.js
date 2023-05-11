export default {
    install(app) {
        app.config.globalProperties.$generateKey = function (listItem) {
            if ('id' in listItem)
                return listItem.id

            return listItem
        }
    }
}
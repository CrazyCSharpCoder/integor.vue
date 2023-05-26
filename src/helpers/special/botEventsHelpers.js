export default {
    createMessageHtmlId(chatId, messageId) {
        return `message-${chatId}-${messageId}`
    },
    isMessageHtmlId(value) {
        return value.startsWith('message')
    }
}
export default {
    createMessageHtmlId(chatId, messageId) {
        return `message-${chatId}-${messageId}`
    },
    isMessageHtmlId(value) {
        return value.startsWith('message')
    },
    parseMessageHtmlId(id) {
        if (!this.isMessageHtmlId(id))
            return undefined

        const words = id.split('-')

        return {
            chatId: Number(words[1]),
            messageId:  Number(words[2])
        }
    }
}
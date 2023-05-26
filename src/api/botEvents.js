import configuration from "@/configuration";
import {handle} from "@/helpers/http"
import {methods} from "@/configuration/http";

const domain = configuration.http.domain
const prefix = 'telegram-events/'

export default {
    async getEvents(botId, startIndex, count, filter) {
        const url = domain + prefix + botId

        return await handle(url, {
            queryParams: {
                startIndex,
                count,
                ...filter
            }
        })
    },
    async getMessagePageIndex(botId, chatId, messageId, pageSize, filter) {
        const url = domain + prefix + `bot-${botId}` + '/page-index'

        return await handle(url, {
            method: methods.post,
            body: {
                chatId,
                messageId,
                pageSize,
                filter
            }
        })
    }
}
import configuration from "@/configuration";
import {handle} from "@/helpers/http"

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
    }
}
import configuration from "@/configuration";
import {handle} from "@/helpers/http"

const http = configuration.http
const prefix = 'bots/'

export default {
    async addBot(bot) {
        const url = http.domain + prefix
        return await handle(url, http.methods.post, bot)
    },
    async getBot(id) {
        const url = http.domain + prefix + id
        return await handle(url, http.methods.get)
    },
    async getAll() {
        const url = http.domain + prefix + 'all'
        return await handle(url, http.methods.get)
    }
}
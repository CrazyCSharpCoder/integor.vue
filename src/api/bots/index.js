import archive from "@/api/bots/archive";

import configuration from "@/configuration";
import {handle} from "@/helpers/http"

const http = configuration.http
const prefix = 'bots/'

export default {
    archive,

    async addBot(bot) {
        const url = http.domain + prefix

        return await handle(url, {
            method: http.methods.post,
            body: bot
        })
    },
    async updateBot(bot) {
        const url = http.domain + prefix + bot.id

        return await handle(url, {
            method: http.methods.put,
            body: bot
        })
    },
    async getBot(id) {
        const url = http.domain + prefix + id
        return await handle(url)
    },
    async getAll() {
        const url = http.domain + prefix + 'all'
        return await handle(url)
    }
}
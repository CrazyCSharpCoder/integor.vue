import {handle} from "@/helpers/http";
import {domain, methods} from "@/configuration/http";

const prefix = 'bots/'

const urls = {
    archive: 'archive/',
    unarchive: 'unarchive/',
    archived: 'archived/'
}

export default {
    async archiveBot(botId) {
        const url = domain + prefix + botId + '/' + urls.archive
        return await handle(url, {method: methods.post})
    },
    async unarchiveBot(botId) {
        const url = domain + prefix + botId + '/' + urls.unarchive
        return await handle(url, {method: methods.post})
    },
    async getArchivedBots() {
        const url = domain + prefix + urls.archived
        return await handle(url, {methods: methods.get})
    }
}
import {handle} from "@/helpers/http";
import {methods} from "@/configuration/http";

const domain = 'http://localhost:5116/'

export default {
    async getWebhookInfo(botToken) {
        const url = `${domain}bot${botToken}/getWebhookInfo`

        return await handle(url, {
            method: methods.get
        })
    }
}
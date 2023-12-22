import {handle} from "@/helpers/http";
import {domain, methods} from "@/configuration/http";

export default {
    async getWebhookInfo(botToken) {
        const url = `${domain}bots/${botToken}/getWebhookInfo`

        return await handle(url, {
            method: methods.get
        })
    }
}
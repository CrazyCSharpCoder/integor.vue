import {methods, domain} from "@/configuration/http";
import {handle} from "@/helpers/http";

const prefix = 'auth/'

const localPath = domain + prefix

export default {
    async register(data) {
        const url = localPath + 'register/'

        return await handle(url, {
            body: data,
            method: methods.post
        })
    },
    async login(credentials) {
        const url = localPath + 'login/'

        return await handle(url, {
            body: credentials,
            method: methods.post
        })
    },
    async logout() {
        const url = localPath + 'logout/'

        return await handle(url, {
            method: methods.post
        })
    },
    async getUser() {
        const url = localPath + 'me/'

        return await handle(url, {
            method: methods.get
        })
    }
}
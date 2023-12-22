import {remove} from "@/helpers/collectionHelpers";
import api from '@/api'

const archiveApi = api.bots.archive

export default {
    namespaced: true,

    state() {
        return {
            botsInfos: undefined
        }
    },
    getters: {
        bots(state) {
            return state.botsInfos
        }
    },
    mutations: {
        SET_BOT_INFOS(state, botsInfos) {
            state.botsInfos = botsInfos
        },
        REMOVE_BOT(state, botId) {
            const bot = state.botsInfos
                .find(botInfo => botInfo.bot.id == botId)

            remove(state.botsInfos, bot)
        },
        DISCARD(state) {
            state.botsInfos = undefined
        }
    },
    actions: {
        async load({commit}) {
            const result = await archiveApi.getArchivedBots()
            commit('SET_BOT_INFOS', result)

            return result
        },
        async unarchive({commit}, botId) {
            const unarchivedInfo = await archiveApi.unarchiveBot(botId)
            commit('REMOVE_BOT', unarchivedInfo.bot.id)

            return unarchivedInfo
        },
        discard({commit}) {
            commit('DISCARD')
        }
    }
}
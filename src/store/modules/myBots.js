import api from "@/api";
import {remove} from "@/helpers/collectionHelpers";

export default {
    state() {
        return {
            myBots: undefined
        }
    },
    getters: {
        myBots(state) {
            return state.myBots
        }
    },
    mutations: {
        SET_MY_BOTS(state, bots) {
            state.myBots = bots
        },
        ADD_BOT(state, botInfo) {
            state.myBots.push(botInfo)

            state.myBots.sort((a, b) => {
                const titleA = a.bot.title
                const titleB = b.bot.title

                if (titleA != titleB)
                    return titleA < titleB ? -1 : 1

                return a.bot.id < a.bot.id ? -1 : 1
            })
        },
        REMOVE_BOT(state, botId) {
            const removedItem = state.myBots
                .find(botInfo => botInfo.bot.id == botId)

            remove(state.myBots, removedItem)
        },
        UPDATE_BOT(state, updatedBotInfo) {
            const oldBot = state.myBots.find(botInfo => botInfo.bot.id == updatedBotInfo.bot.id)
            const index = state.myBots.indexOf(oldBot)

            state.myBots[index] = updatedBotInfo
        }
    },
    actions: {
        async loadBots({commit}) {
            const bots = await api.bots.getMy()
            commit('SET_MY_BOTS', bots)

            return bots
        },
        async addBot({commit, getters}, bot) {
            const addedBot = await api.bots.addBot(bot)

            if (!getters['myBots'])
                commit('SET_MY_BOTS', [addedBot])
            else
                commit('ADD_BOT', addedBot)

            return addedBot
        },
        async updateBot({commit}, bot) {
            const updatedBot = await api.bots.updateBot(bot)
            commit('UPDATE_BOT', updatedBot)

            return updatedBot
        },
        async archive({commit}, botId) {
            const result = await api.bots.archive.archiveBot(botId)
            commit('REMOVE_BOT', result.bot.id)

            return result
        }
    }
}
import api from "@/api";

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
        APPEND_BOT(state, bot) {
            state.myBots.push(bot)
        }
    },
    actions: {
        async loadBots({commit}) {
            const bots = await api.bots.getAll()
            commit('SET_MY_BOTS', bots)

            return bots
        },
        async addBot({commit, getters}, bot) {
            const addedBot = await api.bots.addBot(bot)

            if (!getters['myBots'])
                commit('SET_MY_BOTS', [addedBot])
            else
                commit('APPEND_BOT', addedBot)

            return addedBot
        }
    }
}
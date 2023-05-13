import api from "@/api";

const pageSize = 20

export default {
    namespaced: true,

    state() {
        return {
            bot: undefined,
            totalEvents: undefined,
            messages: undefined
        }
    },
    getters: {
        bot(state) {
            return state.bot
        },
        totalEvents(state) {
            return state.totalEvents
        },
        messages(state) {
            return state.messages
        },
        pagesCount(state) {
            if (!state.totalEvents)
                return undefined

            return Math.ceil(state.totalEvents / pageSize)
        }
    },
    mutations: {
        SET_EVENTS(state, {messages}) {
            state.messages = messages
        },
        SET_BOT_INFO(state, {bot, totalEvents}) {
            state.bot = bot
            state.totalEvents = totalEvents
        },
        DISCARD(state) {
            state.bot = state.totalEvents = state.messages = undefined
        }
    },
    actions: {
        discard({commit}) {
            commit('DISCARD')
        },
        async loadAll({commit}, {botId, pageIndex}) {
            const startIndex = pageIndex * pageSize

            const botEventsInfo = await api.botEvents.getEvents(
                botId, startIndex, pageSize
            )
            commit('SET_BOT_INFO', {
                bot: botEventsInfo.bot,
                totalEvents: botEventsInfo.total_events
            })
            commit('SET_EVENTS', {
                messages: botEventsInfo.messages
            })

            return botEventsInfo
        },
        async loadBot({commit}, botId) {
            const botInfo = await api.bots.getBot(botId)

            commit('SET_BOT_INFO', {
                bot: botInfo.bot,
                totalEvents: botInfo.total_events}
            )

            return botInfo
        }
    }
}
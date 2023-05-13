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
        SET_DATA(state, data) {
            state.bot = data.bot
            state.totalEvents = data.total_events
            state.messages = data.messages
        },
        DISCARD(state) {
            state.bot = state.totalEvents = state.messages = undefined
        }
    },
    actions: {
        discard({commit}) {
            commit('DISCARD')
        },
        async loadEvents({commit}, {botId, pageIndex}) {
            const startIndex = pageIndex * pageSize

            const botEventsInfo = await api.botEvents.getEvents(
                botId, startIndex, pageSize
            )
            commit('SET_DATA', botEventsInfo)

            return botEventsInfo
        }
    }
}
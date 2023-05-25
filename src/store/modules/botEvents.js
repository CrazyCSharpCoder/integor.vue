import api from "@/api";

const pageSize = 20

export default {
    namespaced: true,

    state() {
        return {
            bot: undefined,
            totalEvents: undefined,
            filteredEvents: undefined,
            messages: undefined,
            filter: undefined
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
            if (!state.filteredEvents)
                return undefined

            return Math.ceil(state.filteredEvents / pageSize)
        },
        filter(state) {
            return state.filter
        }
    },
    mutations: {
        SET_INFO(state, {bot, totalEvents, filteredEvents, messages, filter}) {
            state.bot = bot

            state.totalEvents = totalEvents
            state.filteredEvents = filteredEvents

            state.messages = messages

            state.filter = filter
        },
        DISCARD(state) {
            state.bot = state.totalEvents = state.messages = undefined
        }
    },
    actions: {
        discard({commit}) {
            commit('DISCARD')
        },
        async load({commit}, {botId, pageIndex, filter}) {
            const startIndex = pageIndex * pageSize

            filter = Object.fromEntries(
                Object.entries(filter).filter(entry => entry[1] !== undefined)
            )

            const botEventsInfo = await api.botEvents.getEvents(
                botId, startIndex, pageSize, filter
            )

            commit('SET_INFO', {
                bot: botEventsInfo.bot,
                totalEvents: botEventsInfo.totalEvents,
                filteredEvents: botEventsInfo.filteredEvents,
                messages: botEventsInfo.messages,
                filter: botEventsInfo.filter
            })

            return botEventsInfo
        }
    }
}
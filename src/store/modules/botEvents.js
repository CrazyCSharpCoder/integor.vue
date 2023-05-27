import api from "@/api";

const pageSize = 20

function filterToBody(filter) {
    return  Object.fromEntries(
        Object.entries(filter).filter(entry => entry[1] !== undefined)
    )
}

export default {
    namespaced: true,

    state() {
        return {
            bot: undefined,
            webhookInfo: undefined,

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
        webhookInfo(state) {
            return state.webhookInfo
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
        SET_INFO(state, {
            bot,
            totalEvents,
            filteredEvents,
            messages,
            filter,
            webhookInfo
        }) {
            state.bot = bot
            state.webhookInfo = webhookInfo

            state.totalEvents = totalEvents
            state.filteredEvents = filteredEvents

            state.messages = messages

            state.filter = filter
        },
        SET_MESSAGES(state, messages) {
            state.messages = messages
        },
        SET_BOT(state, bot) {
            state.bot = bot
        },
        DISCARD(state) {
            Object.keys(state)
                .forEach(key => state[key] = undefined)
        }
    },
    actions: {
        discard({commit}) {
            commit('DISCARD')
        },
        async load({commit}, {botId, pageIndex, filter}) {
            const startIndex = pageIndex * pageSize

            filter = filterToBody(filter)

            const botEventsInfo = await api.botEvents.getEvents(
                botId, startIndex, pageSize, filter
            )
            const webhookInfo = await api.webhook.getWebhookInfo(
                botEventsInfo.bot.token
            )

            commit('SET_INFO', {
                bot: botEventsInfo.bot,
                totalEvents: botEventsInfo.totalEvents,
                filteredEvents: botEventsInfo.filteredEvents,
                messages: botEventsInfo.messages,
                filter: botEventsInfo.filter,
                webhookInfo
            })

            return botEventsInfo
        },
        async updateBot({commit}, bot) {
            const updateResult = await api.bots.updateBot(bot)
            commit('SET_BOT', updateResult.bot)

            return bot
        },
        async searchMessage({commit}, {botId, chatId, messageId, filter}) {
            filter = filterToBody(filter)

            const response = await api.botEvents.searchMessage(
                botId, chatId, messageId,
                pageSize, filter
            )

            commit('SET_MESSAGES', response.messages)

            return response
        }
    }
}
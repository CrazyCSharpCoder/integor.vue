import {remove, getById} from "@/helpers/collectionHelpers";

import configuration from "@/configuration";

function createBotInfo(bot, chats = []) {
    return {
        bot,
        chats
    }
}

function getBot(botInfo) {
    return botInfo.bot
}

function setBot(botInfo, bot) {
    botInfo.bot = bot
}

function getChats(botInfo) {
    return botInfo.chats
}

function getBotInfoById(botInfos, id) {
    return botInfos.find(botInfo => getBot(botInfo).id == id)
}

export default {
    namespaced: true,

    state() {
        return {
            currentBotInfo: undefined,
            botInfos: []
        }
    },
    getters: {
        bots(state) {
            return state.botInfos.map(
                botInfo => getBot(botInfo)
            )
        },
        currentBot(state) {
            return state.currentBotInfo?.bot
        },
        currentChats(state) {
            return state.currentBotInfo?.chats
        }
    },
    mutations: {
        ADD_BOT(state, bot) {
            state.botInfos.unshift(
                createBotInfo(bot)
            )
        },
        REMOVE_BOT(state, botId) {
            const removedInfo = getBotInfoById(
                state.botInfos, botId
            )

            remove(state.botInfos, removedInfo)
        },
        REMOVE_LAST_BOT(state) {
            state.botInfos.pop()
        },
        UPDATE_BOT(state, bot) {
            const updatedInfo = getBotInfoById(
                state.botInfos, bot.id
            )

            setBot(updatedInfo, bot)
        },

        SET_CURRENT_BOT(state, botId) {
            state.currentBotInfo = getBotInfoById(
                state.botInfos, botId
            )
        },

        ADD_CHAT_TO_CURRENT(state, chat) {
            const chats = getChats(state.currentBotInfo)
            chats.unshift(chat)
        },
        REMOVE_CHAT_FROM_CURRENT(state, chatId) {
            const chats = getChats(state.currentBotInfo)
            const removedChat = getById(chats, chatId)

            remove(chats, removedChat)
        },
        REMOVE_LAST_CHAT_FROM_CURRENT(state) {
            getChats(state.currentBotInfo).pop()
        },

        DISCARD_CURRENT_BOT_INFO(state) {
            state.currentBotInfo = undefined
        }
    },
    actions: {
        addBot({commit, getters}, bot) {
            const bots = getters.bots

            if (getById(bots, bot.id))
                return

            if (bots.length == configuration.history.maxBots)
                commit('REMOVE_LAST_BOT')

            commit('ADD_BOT', bot)
        },
        updateBot({commit}, bot) {
            commit('UPDATE_BOT', bot)
        },
        removeBot({commit}, botId) {
            commit('REMOVE_BOT', botId)
        },

        setCurrentBot({commit}, botId) {
            commit('SET_CURRENT_BOT', botId)
        },

        addChatToCurrent({commit, getters}, chat) {
            const chats = getters.currentChats

            if (getById(chats, chat.id))
                return

            if (chats.length == configuration.history.maxChats)
                commit('REMOVE_LAST_CHAT_FROM_CURRENT')

            commit('ADD_CHAT_TO_CURRENT', chat)
        },
        removeChatFromCurrent({commit}, chatId) {
            commit('REMOVE_CHAT_FROM_CURRENT', chatId)
        },

        closeCurrentBot({commit}) {
            commit('DISCARD_CURRENT_BOT_INFO')
        }
    }
}

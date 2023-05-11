const botsMock = [
    {
        id: 1,
        title: 'Мой бот',
        botToken: 'fdsgseghsd-khfjsdvgfbjfkd-fbsdjfg',
        totalEvents: 561
    },
    {
        id: 2,
        title: 'Мой бот 2',
        botToken: 'gfhfdhokdfj-nhkdfgjpdgjn-bfgilfkgjdn',
        totalEvents: 40
    },
    {
        id: 3,
        title: 'Ещё один бот',
        botToken: 'jghjhgkgd-fgfdhfjfhgfjfcv-bvcbsjgfjgf',
        totalEvents: 7556
    },
    {
        id: 4,
        title: 'Мой бот',
        botToken: 'agfndjgsd-fklekrkweuiigfsi-gbfxnmveew',
        totalEvents: 423
    },
]

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
        }
    },
    actions: {
        async loadBots({commit}) {
            botsMock.sort((a, b) => {
                if (a.title != b.title)
                    return a.title < b.title ? 1 : -1

                return a.id > b.id ? 1 : -1
            })

            setTimeout(() => {
                commit('SET_MY_BOTS', botsMock)
            }, 2000)
        }
    }
}
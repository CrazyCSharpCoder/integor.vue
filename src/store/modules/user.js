import api from "@/api";
import {ServerError} from "@/errorHandling/serverErrors";

export default {
    state() {
        return {
            user: undefined
        }
    },
    getters: {
        isAuth(state) {
            if (state.user === undefined)
                return undefined

            return Boolean(state.user)
        },
        user(state) {
            return state.user
        }
    },
    mutations: {
        SET_USER(state, user) {
            state.user = user
        },
        UNAUTHORIZE(state) {
            state.user = null
        },
        DISCARD(state) {
            state.user = undefined
        }
    },
    actions: {
        async register({commit}, data) {
            const result = await api.auth.register(data)
            commit('SET_USER', result.user)

            return result
        },
        async login({commit}, credentials) {
            const result = await api.auth.login(credentials)
            commit('SET_USER', result.user)

            return result
        },
        async logout({commit}) {
            const result = await api.auth.logout()
            commit('UNAUTHORIZE')

            return result
        },
        async loadUser({commit}) {
            let user

            try {
                const result = await api.auth.getUser()
                user = result.user
            }
            catch (error) {
                if (!(error instanceof ServerError))
                    throw error

                if (error.statusCode != 401)
                    throw error

                user = null
            }

            commit('SET_USER', user)

            return user
        }
    }
}
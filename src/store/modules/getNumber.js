export default {
    state() {
        return {
            number: 10
        }
    },
    getters: {
        number(state) {
            return state.number
        }
    }
}
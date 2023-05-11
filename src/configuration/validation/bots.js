export default {
    title: {
        maxLength: 80
    },
    botToken(value) {
        return value.match(/^[0-9]{8,10}:[a-zA-Z0-9_-]{35}$/)
    }
}
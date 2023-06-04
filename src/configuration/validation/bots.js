export default {
    title: {
        maxLength: 80
    },
    token(value) {
        return value.match(/^[0-9]{8,10}:[a-zA-Z0-9_-]{35}$/)
    },
    description(value) {
        return value.match(/^[A-Za-zА-Яа-я0-9 \r\n.,?!-]*$/)
    }
}
const locale = 'ru-RU'

export default {
    formatDate(date) {
        return date.toLocaleDateString(locale, {
            year: '2-digit',
            month: '2-digit',
            day: '2-digit'
        })
    },
    formatDateTime(dateTime) {
        const dateString = this.formatDate(dateTime)
        const timeString = dateTime.toLocaleTimeString(locale, {
            hour: '2-digit',
            minute: '2-digit'
        })

        return `${dateString} ${timeString}`
    },

    formatStringDate(dateString) {
        const date = new Date(dateString)
        return this.formatDate(date)
    },
    formatStringDateTime(dateTimeString) {
        const dateTime = new Date(dateTimeString)
        return this.formatDateTime((dateTime))
    },

    parseUnixDateTime(unixDateTime) {
        const totalMilliseconds = unixDateTime * 1000
        return new Date(totalMilliseconds)
    }
}

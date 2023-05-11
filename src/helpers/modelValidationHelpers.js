const optionNames = {
    short: 'short'
}

const defaultOptions = {
    short: false
}

function getOption(options, optionName) {
    const defaultOption = defaultOptions[optionName]

    if (!options)
        return defaultOption

    return options[optionName] ? options[optionName] : defaultOption
}

const modelValidationHelpers = {
    lengthBetween(min, max, options) {
        if (getOption(options, optionNames.short))
            return `Длина значения ${min} - ${max} символов`

        return `Длина значения должна лежать в пределах ${min} - ${max} символов`
    },
    maxLength(max, options) {
        if (getOption(options, optionNames.short))
            return `Не больше ${max} символов`

        return `Максимально допустимая длина значения - ${max} символов`
    },

    valueBetween(min, max, options) {
        if (getOption(options, optionNames.short))
            return `В пределах ${min} - ${max}`

        let message = `Значение должно лежать в пределах ${min} - ${max}`
        const units = getOption('unit')

        if (units)
            message += ` ${units}`

        return message
    },

    required() {
        return 'Необходимо указать значение'
    }
}

export default modelValidationHelpers

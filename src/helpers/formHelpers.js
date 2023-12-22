function isTrimRequired(fieldsOptions, fieldName) {
    if (!fieldsOptions)
        return undefined

    return fieldsOptions[fieldName]
}

const helper = {
    trimStrings(data, propsOptions, depth = undefined) {
        if (depth === 0)
            return
        if (depth !== undefined && (typeof depth !== 'number' || depth < 0))
            throw new Error('Depth must be a number equal zero or greater')

        for (let prop in data) {
            const value = data[prop]

            let trimRequired = isTrimRequired(propsOptions, prop)
            if (trimRequired === false)
                continue

            if (typeof value === 'object') {
                this.trimStrings(
                    value,
                    trimRequired,
                    depth ? depth - 1 : undefined
                )
            }
            else if (typeof value === 'string') {
                data[prop] = value.trim()
            }
            else if (trimRequired !== undefined)
                throw new Error(
                    `Property "${prop}" cannot be trimmed because its ` +
                    `data type is "${typeof value}". Only types "string" ` +
                    `and "object" (i.e. properties inside this object) ` +
                    `can be trimmed`)
        }
    }
}

export default helper
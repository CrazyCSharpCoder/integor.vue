function equalObjectsShallow(a, b) {
    if (!a && !b)
        return true

    const entriesA = Object.entries(a)
    const entriesB = Object.entries(b)

    if (entriesA.length != entriesB.length)
        return false

    for (const entryA of entriesA) {
        const entryB = entriesB.find(entry => entryA[0] == entry[0])

        if (!entryB)
            return false

        if (entryA[1] != entryB[1])
            return false
    }

    return true
}

function parseHash(hash) {
    if (hash.startsWith('#'))
        hash = hash.substring(1)

    return hash
}

function sameRoutes(a, b) {
    if (a.name != b.name)
        return false

    if (!equalObjectsShallow(a.params, b.params))
        return false

    if (!equalObjectsShallow(a.query, b.query))
        return false

    return a.hash == b.hash
}

export {parseHash, sameRoutes}

export default {
    parseHash,
    sameRoutes
}
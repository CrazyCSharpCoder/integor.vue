function getById(collection, id) {
    return collection.find(item => item.id == id)
}

function getIndexById(collection, id) {
    const item = getById(collection, id)
    return collection.indexOf(item)
}

function remove(collection, item) {
    const index = collection.indexOf(item)
    collection.splice(index, 1)
}

function getLast(collection) {
    return collection[collection.length - 1]
}

export {getById, getIndexById, remove, getLast}

export default {
    getById,
    getIndexById,
    remove,
    getLast
}
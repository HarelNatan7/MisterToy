const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const utilService = require('../../services/util.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy) {
    try {
        const criteria = getFilterCriteria(filterBy)
        // console.log('criteria:', criteria)
        const collection = await dbService.getCollection('toy')
        var toys = await collection.find(criteria).toArray()
        // Sort
        if (filterBy.sortBy) {
            if (filterBy.sortBy === 'name') toys.sort((t1, t2) => (t1.name.localeCompare(t2.name)) * filterBy.desc)
            if (filterBy.sortBy === 'created') toys.sort((t1, t2) => (t1.createdAt - t2.createdAt) * filterBy.desc)
            if (filterBy.sortBy === 'price') toys.sort((t1, t2) => (t1.price - t2.price) * filterBy.desc)
        }
        return toys
    } catch (err) {
        logger.error('cannot find toys', err)
        throw err
    }
}

function getFilterCriteria(filterBy) {
    const criteria = {
        name: { $regex: filterBy.name, $options: 'i' },
        inStock: !!filterBy.inStock,
    }
    if (!filterBy.label) return criteria
     criteria.labels = { $all: filterBy.label.split(',') }
     return criteria
}

async function getById(toyId) {
    try {
        const collection = await dbService.getCollection('toy')
        const toy = collection.findOne({ _id: ObjectId(toyId) })
        return toy
    } catch (err) {
        logger.error(`while finding toy ${toyId}`, err)
        throw err
    }
}

async function add(toy) {
    try {
        const collection = await dbService.getCollection('toy')
        await collection.insertOne(toy)
        return toy
    } catch (err) {
        logger.error('cannot insert toy', err)
        throw err
    }
}

async function update(toy) {
    // console.log('toy:', toy)
    try {
        const toyToSave = {
            name: toy.name,
            price: +toy.price,
            labels: toy.labels,
            createdAt: toy.createdAt,
            inStock: toy.inStock
        }
        const collection = await dbService.getCollection('toy')
        await collection.updateOne({ _id: ObjectId(toy._id) }, { $set: toyToSave })
        return toy
    } catch (err) {
        logger.error(`cannot update toy ${toyId}`, err)
        throw err
    }
}

async function remove(toyId) {
    try {
        const collection = await dbService.getCollection('toy')
        await collection.deleteOne({ _id: ObjectId(toyId) })
        return toyId
    } catch (err) {
        logger.error(`cannot remove toy ${toyId}`, err)
        throw err
    }
}

async function addToyMsg(toyId, msg) {
    try {
        msg.id = utilService.makeId()
        const collection = await dbService.getCollection('toy')
        await collection.updateOne({ _id: ObjectId(toyId) }, { $push: { msgs: msg } })
        return msg
    } catch (err) {
        logger.error(`cannot add toy msg ${toyId}`, err)
        throw err
    }
}

async function removeToyMsg(toyId, msgId) {
    try {
        const collection = await dbService.getCollection('toy')
        await collection.updateOne({ _id: ObjectId(toyId) }, { $pull: { msgs: {id: msgId} } })
        return msgId
    } catch (err) {
        logger.error(`cannot add toy msg ${toyId}`, err)
        throw err
    }
}

module.exports = {
    query,
    getById,
    add,
    update,
    remove,
    addToyMsg,
    removeToyMsg
}

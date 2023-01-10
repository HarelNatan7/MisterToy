const fs = require('fs');
var toys = require('../data/toy.json')

module.exports = {
    query,
    get,
    remove,
    save
}

function query(filterBy) {
    let filteredToys = toys
    if (filterBy.name) {
        const regex = new RegExp(filterBy.name, 'i')
        filteredToys = filteredToys.filter(toy => regex.test(toy.name))
    }
    if (filterBy.inStock) filteredToys = filteredToys.filter(toy => toy.inStock)
    if (!filterBy.inStock) filteredToys = filteredToys.filter(toy => !toy.inStock)

    if (filterBy.label.length) {
        filterBy.label = filterBy.label.split(',')
        filteredToys = filteredToys.filter(toy => filterBy.label.every(i => toy.labels.includes(i)))
    }

    if (filterBy.sortBy === 'name') filteredToys.sort((t1, t2) => (t1.name.localeCompare(t2.name)) * filterBy.desc)
    if (filterBy.sortBy === 'created') filteredToys.sort((t1, t2) => (t1.createdAt - t2.createdAt) * filterBy.desc)
    if (filterBy.sortBy === 'price') filteredToys.sort((t1, t2) => (t1.price - t2.price) * filterBy.desc)
    return Promise.resolve(filteredToys)
}

function get(toyId) {
    const toy = toys.find(toy => toy._id === toyId)
    if (!toy) return Promise.reject('Toy not found')
    return Promise.resolve(toy)
}

function remove(toyId) {
    const idx = toys.findIndex(toy => toy._id === toyId)
    if (idx === -1) return Promise.reject('No Such Toy')
    const toy = toys[idx]
    toys.splice(idx, 1)
    return _writeToysToFile()
}


function save(toy) {
    if (toy._id) {
        const toyToUpdate = toys.find(currToy => currToy._id === toy._id)
        if (!toyToUpdate) return Promise.reject('No such Toy')
        toyToUpdate.name = toy.name
        toyToUpdate.price = +toy.price
        toyToUpdate.labels = toy.labels
        toyToUpdate.createdAt = toy.createdAt
        toyToUpdate.inStock = toy.inStock
    } else {
        toy._id = _makeId()
        toys.push(toy)
    }
    return _writeToysToFile().then(() => toy)
}

function _makeId(length = 5) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}


function _writeToysToFile() {
    return new Promise((res, rej) => {
        const data = JSON.stringify(toys, null, 2)
        fs.writeFile('data/toy.json', data, (err) => {
            if (err) return rej(err)
            // console.log("File written successfully\n");
            res()
        });
    })
}
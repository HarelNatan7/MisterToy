
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const TOY_KEY = 'toyDB'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy
}

const labels = ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor", "Battery Powered"]
const toys =  [
    {
        "_id": "t101",
        "name": "Talking Tom",
        "price": 123,
        "labels": ["Doll", "Battery Powered", "Baby"],
        "createdAt": 1631031801011,
        "inStock": true
    },
    {
        "_id": "t102",
        "name": "Fighting Buzz",
        "price": 777,
        "labels": ["Doll", "Battery Powered", "Baby"],
        "createdAt": 1636931801011,
        "inStock": true
    },
    {
        "_id": "t103",
        "name": "Riding Woody",
        "price": 555,
        "labels": ["Doll", "Battery Powered", "Baby"],
        "createdAt": 1631031691011,
        "inStock": true
    },
]
// saveToStorage(TOY_KEY, toys)

function query() {
    return storageService.query(TOY_KEY)
}

function getById(toyId) {
    return storageService.get(TOY_KEY, toyId)
}

function remove(toyId) {
    return storageService.remove(TOY_KEY, toyId)
}

function save(toy) {
    if (toy._id) {
        return storageService.put(TOY_KEY, toy)
    } else {
        return storageService.post(TOY_KEY, toy)
    }
}

function getEmptyToy() {
    return {
        name: '',
        price: '',
        labels: [],
        createdAt: Date.now(),
        inStock: true
    }
}

function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}
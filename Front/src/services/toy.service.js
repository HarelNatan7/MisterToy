import { utilService } from './util.service.js'
import { httpService } from './http.service.js'

const TOY_KEY = 'toyDB'
const BASE_URL = 'toy/'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter,
    getToyLabels
}

function query(filterBy = getDefaultFilter()) {
    const queryParams = 
    `?name=${filterBy.name}&inStock=${filterBy.inStock}&label=${filterBy.label}&sortBy=${filterBy.sortBy}&desc=${filterBy.desc}`
    return httpService.get(BASE_URL + queryParams)
}

function getById(toyId) {
    return httpService.get(BASE_URL + toyId)
}

function remove(toyId) {
    return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
    if (toy._id) {
        return httpService.put(BASE_URL + toy._id, toy)
    } else {
        return httpService.post(BASE_URL, toy)
    }
}

function getDefaultFilter() {
return {name: '', inStock: true , label: [], sortBy: '', desc: 1}
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

function getToyLabels() {
    const labels = ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor", "Battery Powered"]
    return labels
}
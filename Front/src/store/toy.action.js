import { toyService } from '../services/toy.service.js'
import { store } from './store.js'
import { ADD_TOY, REMOVE_TOY, SET_TOYS, UPDATE_TOY } from './toy.reducer.js'

export function loadToys() {
    return toyService.query()
        .then(toys => {
            console.log('toys:', toys)
            store.dispatch({ type: SET_TOYS, toys })
        })
        .catch(err => {
            console.log('Had issues loading toys', err)
            throw err
        })
}

export function saveToy(toy) {
        const type = (toy._id) ? UPDATE_TOY : ADD_TOY
        return toyService.save(toy)
            .then(savedToy => {
                store.dispatch({ type, toy: savedToy })
                return savedToy
            })
            .catch(err => {
                console.error('Cannot save toy:', err)
                throw err
            })
    }

export function removeToy(toyId) {
    return toyService.remove(toyId)
        .then(() => {
            store.dispatch({ type: REMOVE_TOY, toyId })
        })
        .catch(err => {
            console.log('Had issues Removing toy', err)
            throw err
        })
}

// export function saveTodo(todo) {
//     const type = (todo._id) ? UPDATE_TODO : ADD_TODO
//     return todoService.save(todo)
//         .then(savedTodo => {
//             store.dispatch({ type, todo: savedTodo })
//             return savedTodo
//         })
//         .catch(err => {
//             console.error('Cannot save todo:', err)
//             throw err
//         })
// }

// export function filterTodos(filterBy) {
//     store.dispatch({ type: SET_FILTER, filterBy })
// }
import { combineReducers, compose, legacy_createStore as createStore } from 'redux'
import { reviewReducer } from './review.reducer.js'

import { toyReducer } from './toy.reducer.js'

const middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() || compose

const rootReducer = combineReducers({
    // appModule: appReducer,
    toyModule: toyReducer,
    reviewModule: reviewReducer,
    // userModule: userReducer
})

export const store = createStore(rootReducer, middleware)
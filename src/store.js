// import { createStore, applyMiddleware } from 'redux'
import { createStore } from 'redux'
// import { composeWithDevTools } from 'redux-devtools-extension'
// import logger from 'redux-logger'
// import thunk from 'redux-thunk'

import roomCreateReducer from './reducers/roomCreateReducer'


const store = createStore(
    roomCreateReducer
  // rootReducer,
  // composeWithDevTools(applyMiddleware(logger, thunk))
)

export default store;
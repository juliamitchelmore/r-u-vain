import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware, compose  } from 'redux'
import appReducer from './reducers/index'

export default function configureStore(initialState) {
  return createStore(
    appReducer,
    compose(
      applyMiddleware(
        thunkMiddleware // lets us dispatch() functions
      ),
      window.devToolsExtension ? window.devToolsExtension() : f => f
      )
    )
}

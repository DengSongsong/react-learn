import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import rootReducer from 'src/reducers'

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState,
    applyMiddleware(logger),
    // 触发 redux-devtools
    window.devToolsExtension ? window.devToolsExtension() : undefined
)
  return store
}

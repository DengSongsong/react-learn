import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './index.less'
import registerServiceWorker from './registerServiceWorker'
import './common/style/index.less'
import 'lib-flexible/flexible'

import RouteMap from 'src/router/routeMap'
import configureStore from './store/configureStore'
import { getActivityInfo } from 'src/api/activityInfo'
import { update } from './actions/activityInfo'

const store = configureStore()
getActivityInfo().then(res => {
  store.dispatch(update(res.data.data))
  if (sessionStorage.getItem('activityId')) {
    return
  } else {
    sessionStorage.setItem('activityId', res.data.data.id)
  }
})

ReactDOM.render(
  <Provider store={store}>
    <RouteMap></RouteMap>
  </Provider>,
  document.getElementById('root'))
registerServiceWorker()

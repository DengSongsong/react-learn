import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'

import App from 'src/containers/App/App'
import RankList from 'src/containers/RankList'
import Detail from 'src/containers/Detail'

class RouteMap extends React.Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/" exact component={App}></Route>
          <Route path="/rankList" component={RankList}></Route>
          <Route path="/detail/:id" component={Detail}></Route>
        </Switch>   
      </HashRouter>
    )
  }
}
export default RouteMap
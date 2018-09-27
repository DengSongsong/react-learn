import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'

import Header from '../../components/Header'
import CurrentCity from '../../components/CurrentCity'
import CityList from '../../components/CityList'

import * as userinfoActionsFromOtherFile from '../../actions/userinfo'

import { CITYNAME } from '../../config/localStoreKey'
import localStore from '../../util/LocalStore'

class City extends React.Component {
  constructor() {
    super()
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }
  changeCity(newCity) {
    if (newCity === null) {
      return
    }
    const userinfo = this.props.userinfo
    userinfo.cityName = newCity
    this.props.userinfoActions.update(userinfo)

    localStorage.setItem(CITYNAME, newCity)

    hashHistory.push('/')
  }
  render() {
    return (
      <div>
        <Header title='选择城市'></Header>
        <CurrentCity cityName={this.props.userinfo.cityName}></CurrentCity>
        <CityList changeFn={this.changeCity.bind(this)}></CityList>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    userinfo: state.userinfo
  }
}

function mapDispatchToProps(dispatch) {
  return {
    userinfoActions: bindActionCreators(userinfoActionsFromOtherFile, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(City)
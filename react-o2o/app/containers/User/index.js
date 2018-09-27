import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'

import Header from '../../components/Header'
import UserInfo from '../../components/UserInfo'
import OrderList from './subpage/OrderList'

class User extends React.Component {
  constructor() {
    super()
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }
  componentDidMount() {
    if (!this.props.userinfo.username) {
      hashHistory.push('/Login')
    }
  }
  render() {
    const userinfo = this.props.userinfo
    return (
      <div>
        <Header title='用户主页' backRouter='/home'></Header>
        <UserInfo username={userinfo.username} city={userinfo.cityName}></UserInfo>
        <OrderList username={userinfo.username}></OrderList>
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
  return {}
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User)
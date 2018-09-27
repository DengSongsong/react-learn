import React from 'react'
import { connect } from 'react-redux'
import HomeHeader from '../../components/HomeHeader'
import Category from '../../components/Category'
import Ad from './subpage/Ad'
import List from './subpage/List'

class Home extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      console.log(this.props.userinfo.cityName)
    }, 0)
  }
  render() {
    return (
      <div>
        <HomeHeader cityName={this.props.userinfo.cityName}></HomeHeader>
        <Category></Category>
        <div style={{height: '15px'}}></div>
        <Ad></Ad>
        <List cityName={this.props.userinfo.cityName}></List>
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
)(Home)
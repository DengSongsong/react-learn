import React from 'react'
import './index.less'

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <img className="theme" src={require('../../common/images/rankList-theme.png')} alt=""/>
        <img src={require('../../common/images/detail.png')} alt="" className="detail"/>
        <span className="singerPlan">
          <img src={require('../../common/images/singerPlan.png')} alt=""/>
        </span>
      </div>
    )
  }
}
export default Header
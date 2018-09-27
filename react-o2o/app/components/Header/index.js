import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { hashHistory } from 'react-router'
import './style.less'

class Header extends React.Component {
  constructor() {
    super()
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }
  clickHandle() {
    const backRouter = this.props.backRouter
    if (backRouter) {
      hashHistory.push(hashHistory)
    } else {
      window.history.back()
    }
  }
  render() {
    return (
      <div id="common-header">
        <span className="back-icon" onClick={this.clickHandle.bind(this)}>
          <i className="icon-chevron-left"></i>
        </span>
        <h1>{this.props.title}</h1>
      </div>
    )
  }
}
export default Header
import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Item from './Item/Item'
import './style.less'

class ListItem extends React.Component {
  constructor() {
    super()
    this.PureRenderMixin = PureRenderMixin.shouldComponentUpdate.bind(this)
  }
  render() {
    return (
      <div className="sameCollegeList">
        <div className="contentWrapper">
          <div className="search">
            <div className="inputWrapper">
              <input type="text" className="input" placeholder="请输入关键字搜索"/>
              <img className="icon-search" src={require('../../common/images/icon-search.png')} alt=""/>
            </div>
            <span className="btn">搜索</span>
          </div>
          <Item data={this.props.data}></Item>
        </div>
      </div>
    )
  }
}
export default ListItem
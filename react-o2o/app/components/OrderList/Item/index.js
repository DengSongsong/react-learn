import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'

class Item extends React.Component {
  constructor() {
    super()
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }
  render() {
    const data = this.props.date
    return (
      <div className="clear-fix order-item-container">
        <div className="order-item-img float">
          <img src={data.img} />
        </div>
        <div className="order-item-comment float-right">
          <button>评价</button>
        </div>
        <div className="order-item-content">
          <span>商品：{data.title}</span>
          <span>数量：{data.count}</span>
          <span>价格：¥{data.price}</span>
        </div>
      </div>
    )
  }
}
export default Item
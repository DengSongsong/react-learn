import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import Item from './Item'

import './style.less'

class List extends React.Component {
  constructor() {
    super()
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }
  componentDidMount() {
    console.log(this.props.data)
  }
  render() {
    return (
      // <div className="list-container">
      //   {this.props.data.map((item, index) => {
      //     return <Item key={index} data={item}/>
      //   })}
      // </div>
      <div className="list-container">
        {
          this.props.data.map((item, index) => {
            return <Item key={index} data={item}></Item>
          })
        }
      </div>
    )
  }
}
export default List
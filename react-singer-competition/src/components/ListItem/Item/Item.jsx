import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import './style.less'

class Item extends React.Component {
  constructor() {
    super()
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }
  render() {
    return (
      this.props.data.map((item, index) => {
        return (
          <div className="item" key={index}>
            <div className="desc">
              <div className="school">{item.name}</div>
              <div className="vote">票数：{item.vote}</div>
            </div>
            {
              parseInt(item.vote, 10) > 0
              ? <div className="itemRank">
                  <span>第</span>
                  <span>{item.rank}</span>
                  <span>名</span>
                  {index === '0' ? <img src={require('../../../common/images/crown-01.png')} alt="" className="crown"/> : ''}
                  {index === '1' ? <img src={require('../../../common/images/crown-02.png')} alt="" className="crown"/> : ''}
                  {index === '2' ? <img src={require('../../../common/images/crown-03.png')} alt="" className="crown"/> : ''}
                </div>
              : <div className="itemRank disables">
                  <span>未</span>
                  <span>上</span>
                  <span>榜</span>
                </div>
            }
          </div>
        )
      })
    )
  }
}
export default Item
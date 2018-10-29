import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'

class DetailWrapper extends React.Component {
  constructor() {
    super()
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }
  render() {
    const data = this.props.data
    return (
      <div className="detailWrapper">
        <div className="avatar">
          <div className="imgWrapper">
            <img src={data.coverThumb} alt="" className="avatar-img"/>
            {
              data.file 
              && <div>
                    <img src={require('../../common/images/icon-mask.png')} alt="" className="mask"/>
                    <span className="btn">
                      <img src={require('../../common/images/play.png')} alt=""/>
                    </span>
                </div>
            }
          </div>
          <span className="name">{data.nickName}</span>
        </div>
        <div className="infoWrapper">
          <div className="info">
            <div className="school text">江西财经大学</div>
            <div className="title text">{data.name}</div>
            <div className="vote text">总票数：{data.vote}</div>
          </div>
        </div>
        <div className="progressWrapper">
        </div>
        <div className="btnWrapper">
          <div className="voteBtn">
            <span className="btn vote">投票</span>
            <span className="btn share">拉票</span>
          </div>
        </div>
        <div className="indexBtn">
          <span className="btn">活动首页</span>
        </div>
      </div>
    )
  }
}
export default DetailWrapper
import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { withRouter } from 'react-router-dom'
import './style.less'

class CollegeMineList extends React.Component {
  constructor() {
    super()
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }
  toDetail(id) {
    this.props.history.push(`/detail/${id}`)
    console.log(this.props)
  }
  render() {
    return (
      <div className="collegeMineList" ref="collegeMineList" id="collegeMineList">
        <div className="notice">
          <span className="icon">
            <img src={require('../../common/images/horn.png')} alt=""/>
          </span>
          <span className="text">作品征集报名时间：9.17-10.17</span>
          <span className="voteCount">今天可用票数：10</span>
        </div>
        {
          this.props.data.map((item, index) => {
            return (
              <div className="item" key={index}>
                {index + 1 <= 5 ? <div className="rank">{index + 1}</div> : <div className="rank"></div>}
                <div className="cover_wrap">
                  <img src={item.coverThumb} alt="" className="coverThumb"/>
                  <img src={require('../../common/images/icon-mask.png')} alt="" className="mask"/>
                  <span className="btn">
                    <img src={require('../../common/images/pause.png')} alt=""/>
                  </span>
                </div>
                <div className="info" onClick={this.toDetail.bind(this, item.id)}>
                  <div className="text">{item.name}</div>
                  <div className="text">{item.school}</div>
                  <div className="text">{item.vote}</div>
                </div>
                <div className="action">
                  <span className="btn vote">投票</span>
                  <span className="btn share">拉票</span>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}
export default withRouter(CollegeMineList)
import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Header from 'src/components/Header'
import DetailWrapper from 'src/components/DetailWrapper'
import { getUserInfo } from 'src/api/userInfo'
import { getActivityId } from 'src/common/js/utils.js'

import './style.less'

class Detail extends React.Component {
  constructor() {
    super()
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    this.state = {
      userInfo: {}
    }
  }
  componentDidMount() {
    this._getUserInfo()
  }
  _getUserInfo() {
    getActivityId().then(resolve => {
      getUserInfo({
        activityId: resolve,
        audioId: this.props.match.params.id
      }).then(res => {
        console.log(res.data.data)
        this.setState({
          userInfo: res.data.data
        })
      })
    })
  }
  render() {
    return (
      <div className="detail">
        <Header></Header>
        <DetailWrapper data={this.state.userInfo}></DetailWrapper>
      </div>
    )
  }
}
export default Detail
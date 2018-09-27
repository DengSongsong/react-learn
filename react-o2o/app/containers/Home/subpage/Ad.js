import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { getAdData } from '../../../fetch/home/home'
// import data  from '../../../../mock/home/ad'

import './style.less'
import HomeAd from '../../../components/HomeAd/index'

class Ad extends React.Component {
  constructor() {
    super()
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    this.state = {
      data: []
    }
  }
  componentDidMount() {
    // console.log(getAdData)
    // console.log(data)
    const result = getAdData()
    result.then(res => {
      // console.log(res.json())
      return res.json()
    }).then(json => {
      const data = json
      // console.log(data)
      if(data.length) {
        this.setState({
          data
        })
      }
    }).catch(ex => {
      if(__DEV__) {
        console.error('Home ads module get error', ex.message)
      }
    })
  }
  render() {
    return (
      <div>
        {
          this.state.data.length
          ? <HomeAd data={this.state.data}></HomeAd>
          : null
        }
      </div>
    )
  }
}
export default Ad
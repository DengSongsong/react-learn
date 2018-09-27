import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'
import ListComponent from '../../../components/List'
import LoadMore from '../../../components/LoadMore'
import { getListData } from '../../../fetch/home/home'

class List extends React.Component {
  constructor() {
    super()
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    this.state = {
      data: [],
      hasMore: false,
      isLoadingMore: false,
      page: 0
    }
  }
  componentDidMount() {
    this.loadFirstPageData()
  }
  loadFirstPageData() {
    const cityName = this.props.cityName
    console.log(cityName)
    const result = getListData(cityName, 0)
    this.resultHandle(result)
  }
  resultHandle(result) {
    result.then(res => {
      return res.json()
    }).then(json => {
      const hasMore = json.hasMore
      const data = json.data
      this.setState({
        hasMore,
        data: this.state.data.concat(data)
      })
      console.log(data)
      console.log(this.state.data)
    }).catch(err => {
      if (__DEV__) {
        console.error('首页”猜你喜欢“获取数据报错, ', err.message)
    }
    })
  }
  LoadMoreData() {
    this.setState({
      isLoadingMore: true
    })
    const cityName = this.props.cityName
    const page = this.state.page
    const result = getListData(cityName, page)
    this.resultHandle(result)

    this.setState({
      page: page + 1,
      isLoadingMore: false
    })
  }
  render() {
    return (
      <div>
        <h2 className="home-list-title">猜你喜欢</h2>
        {
          this.state.data.length
          ? <ListComponent data={this.state.data}></ListComponent>
          : <div></div>
        }
        {
          this.state.hasMore
          ? <LoadMore isLoadingMore={this.state.isLoadingMore} LoadMoreFn={this.LoadMoreData.bind(this)}></LoadMore>
          : ''
        }
      </div>
    )
  }
}
export default List
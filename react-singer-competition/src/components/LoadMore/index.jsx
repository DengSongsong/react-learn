import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import './style.less'

class LoadMore extends React.Component {
  constructor() {
    super()
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }
  loadMoreHandle() {
    this.props.LoadMoreFn()
  }
  componentDidMount() {
    // console.log(2)
    // const LoadMoreFn = this.props.LoadMoreFn
    // const wrapper = this.refs.wrapper
    // let timeoutId
    // function callback() {
    //   const top = wrapper.getBoundingClientRect().top
    //   console.log(top)
    //   const windowHeight = window.screen.height
    //   if (top && top < windowHeight) {
    //     LoadMoreFn()
    //   }
    // }
    // window.addEventListener('scroll', function (){
    //   console.log(1)
    //   if (this.props.isLoadingMore) {
    //     console.log(3)
    //     return
    //   }
    //   if (timeoutId) {
    //     clearTimeout(timeoutId)
    //   }
    //   timeoutId = setTimeout(callback, 50)
    // }.bind(this), false)
  }
  render() {
    return (
      <div className="loadMore" ref="wrapper">
        {
          this.props.isLoadingMore
          ? <span>加载中...</span>
          : <span onClick={this.loadMoreHandle.bind(this)}>加载更多</span>
        }
      </div>
    )
  }
}
export default LoadMore
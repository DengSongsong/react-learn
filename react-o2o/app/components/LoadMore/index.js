import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'

class LoadMore extends React.Component {
  constructor() {
    super()
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }
  LoadMoreHandle() {
    this.props.LoadMoreFn()
  }
  componentDidMount() {
    const LoadMoreFn = this.props.LoadMoreFn
    const wrapper = this.refs.wrapper
    let timeoutId
    function callback() {
      const top = wrapper.getBoundingClientRect().top
      console.log(top)
      const windowHeight = window.screen.height
      console.log(windowHeight)
      if (top && top < windowHeight) {
        LoadMoreFn()
      }
    }
    window.addEventListener('scroll', function() {
      if (this.props.isLoadingMore) {
        return
      }
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      timeoutId = setTimeout(callback, 50)
    }.bind(this), false)
  }
  render() {
    return (
      <div className="load-more" ref='wrapper'>
        {
          this.props.isLoadingMore
          ? <span>加载中...</span>
          : <span onClick={this.LoadMoreHandle.bind(this)}>加载更多</span>
        }
      </div>
    )
  }
}
export default LoadMore
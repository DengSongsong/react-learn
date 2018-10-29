import React from 'react'
import './style.less'

class Loading extends React.Component {
  render() {
    return (
      <div className="loading2">
        <img width="24" height="24" src={require('../../common/images/loading.gif')} alt=""/>
      </div>
    )
  }
}
export default Loading
import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import './App.less'

class App extends React.Component {
  constructor() {
    super()
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }
  clickHandle() {
    this.props.history.push('/rankList')
    console.log(this.props)
  }
  render() {
    return (
      <div className="App">
        <div className="log">
          <img src={require('../../common/images/logo.png')} alt=""/>
        </div>
        <div className="theme">
          <img src={require('../../common/images/theme.png')} alt=""/> 
        </div>
        <div className="cd">
          <img className="trans" src={require('../../common/images/CD.png')} alt=""/>
        </div>
        <div className="button" onClick={this.clickHandle.bind(this)}>
          <img src={require('../../common/images/btn-index.png')} alt=""/>
        </div>
      </div>
    )
  }
}
export default App

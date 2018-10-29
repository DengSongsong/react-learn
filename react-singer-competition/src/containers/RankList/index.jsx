import React from 'react'
import Header from 'src/components/Header'
import List from './subpage/List'
import Submit from './subpage/Submit'
import './style.less'

class RankList extends React.Component {
  render() {
    return (
      <div className="rankList">
        <Header></Header>
        <List></List>
        <Submit></Submit>
      </div>
    )
  }
}
export default RankList
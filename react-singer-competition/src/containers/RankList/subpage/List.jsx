import React from 'react'
import { connect } from 'react-redux'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import CollegeMineList from 'src/components/CollegeMineList'
import SameCollegeList from 'src/components/ListItem'
// import LoadMore from 'src/components/LoadMore'
import Loading from 'src/components/Loading'
import { getCollegeRank, getSameCollege, getMine } from 'src/api/rankList'
import { getActivityId } from 'src/common/js/utils.js'

class List extends React.Component {
  constructor() {
    super()
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    this.state = {
      tabs: {
        collegeRank: {
          name: '热门作品榜',
        },
        sameCollegeRank: {
          name: '热门校园榜',
        },
        mine: {
          name: '我的作品',
        }
      },
      collegeRankCnt: {
        pageIndex: 0,
        totalCount: 0,
        content: []
      },
      collegeRankContent: [],
      sameCollegeRankCnt: {
        pageIndex: 0,
        totalCount: 0,
        content: []
      },
      sameCollegeRankContent: [],
      mineCnt: {
        pageIndex: 1,
        totalCount: 0,
        content: []
      },
      mineContent: [],
      currentTab: 'collegeRank',
      isLoadingMore: true,
      hasMore: false
    }
  }
  componentWillMount() {
    this._getCollegeRank()
    this._getSameCollege()
    this._getMine()
  }
  componentDidMount() {
    const contentWrapper = this.refs.contentWrapper
    contentWrapper.addEventListener('scroll', function() {
      const scrollTop = contentWrapper.scrollTop
      const clientHeight = contentWrapper.clientHeight
      const scrollHeight = contentWrapper.scrollHeight
      if (scrollTop + clientHeight < scrollHeight) {
        return
      } else {
        this._loadMoreCollegeRank()
        this._loadMoreSameCollege()
      }
    }.bind(this), false)
  }
  changeTab(key) {
    this.setState({
      currentTab: key
    })
  }
  _getCollegeRank() {
    let pageIndex = this.state.collegeRankCnt.pageIndex + 1  
    getActivityId().then(resolve => {
      getCollegeRank(pageIndex, resolve).then(res => {
        this.setState({
          collegeRankCnt: res.data,
          collegeRankContent: res.data.content
        })
      })
    })
  }
  _getSameCollege() {
    let pageIndex = this.state.sameCollegeRankCnt.pageIndex + 1
    getActivityId().then(resolve => {
      getSameCollege(pageIndex, resolve).then(res => {
        this.setState({
          sameCollegeRankCnt: res.data,
          sameCollegeRankContent: res.data.content
        })
      })
    })
  }
  _getMine() {
    let pageIndex = this.state.mineCnt.pageIndex + 1
    getActivityId().then(resolve => {
      getMine(pageIndex, resolve).then(res => {
        this.setState({
          mineCnt: res.data,
          // mineContent: res.data.content
        })
      })
    })
  }
  _loadMoreCollegeRank() {
    let pageIndex = this.state.collegeRankCnt.pageIndex + 1
    getActivityId().then(resolve => {
      getCollegeRank(pageIndex, resolve).then(res => {
        console.log(res)
        this.setState({
          // collegeRankCnt: this.state.collegeRankCnt.content
          collegeRankCnt: res.data,
          collegeRankContent: this.state.collegeRankContent.concat(res.data.content)
        })
        this._checkMore(res.data)
      })
    })
  }
  _loadMoreSameCollege() {
    let pageIndex = this.state.sameCollegeRankCnt.pageIndex + 1
    getActivityId().then(resolve => {
      getSameCollege(pageIndex, resolve).then(res => {
        this.setState({
          sameCollegeRankCnt: res.data,
          sameCollegeRankContent: this.state.sameCollegeRankContent.concat(res.data.content)
        })
      })
    })
  }
  _checkMore(data) {
    if ((data.content.length + (data.pageIndex - 1) * data.pageSize) <= data.totalCount) {
      this.setState({
        hasMore: true
      })
    } else {
      this.setState({
        hasMore: false
      })
    }
  }
  render() {
    const items = []
    for (let item in this.state.tabs) {
      items.push(
        <span 
          key={item} 
          className={`tab ${this.state.currentTab === item ? 'active' : ''}`}
          onClick={this.changeTab.bind(this, item)}
        >{this.state.tabs[item].name}</span>
      )
    }
    let { currentTab } = this.state
    return (
      <div className="list">
        <div className="tabs">
          {items}
        </div>
        <div className="content" ref="contentWrapper">
          { 
            currentTab === 'collegeRank' && <CollegeMineList data={this.state.collegeRankContent}/> 
          }
          { currentTab === 'sameCollegeRank' && <SameCollegeList data={this.state.sameCollegeRankContent}/> }
          { currentTab === 'mine' && <CollegeMineList data={this.state.mineCnt}/> }
          { 
            this.state.hasMore || !this.state.collegeRankContent.length
            ? <Loading></Loading>
            : ''
          }
        </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    activityInfo: state.activityInfo
  }
}
function mapDispatchToProps(dispatch) {
  return {}
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List)
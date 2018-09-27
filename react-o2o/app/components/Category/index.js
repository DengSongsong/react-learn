import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import ReactSwipe from 'react-swipe'
import { Link } from 'react-router'

import './style.less'

class Category extends React.Component {
  constructor() {
    super()
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    this.state = {
      index: 0
    }
  }
  render() {
    const opt = {
      auto: 4500,
      callback: function(index) {
        this.setState({index})
      }.bind(this)
    }
    return (
      <div id='home-category'>
        <ReactSwipe swipeOptions={opt}>
          <div className="carousel-item">
            <ul className="clear-fix">
              <Link to="/search/jingdian">
                <li className="float-left">景点</li>
              </Link>
              <Link to="/search/ktv">
                <li className="float-left">KTV</li>
              </Link>
              <Link to="/search/gouwu">
                <li className="float-left">购物</li>
              </Link>
              <Link to="/search/shenghuifuwu">
                <li className="float-left">生活服务</li>
              </Link>
              <Link to="/search/jianshenyundong">
                <li className="float-left">健身运动</li>
              </Link>
              <Link to="/search/meifa">
                <li className="float-left">美发</li>
              </Link>
              <Link to="/search/qinzi">
                <li className="float-left">亲子</li>
              </Link>
              <Link to="/search/xiaochikuaican">
                <li className="float-left">小吃快餐</li>
              </Link>
              <Link to="/search/zizhucan">
                <li className="float-left">自助餐</li>
              </Link>
              <Link to="/search/jiuba">
                <li className="float-left">酒吧</li>
              </Link>
            </ul>
          </div>
          <div className="carousel-item">
            <ul className="clear-fix">
              <Link to="/search/meishi">
                <li className="float-left">美食</li>
              </Link>
              <Link to="/search/dianying">
                <li className="float-left">电影</li>
              </Link>
              <Link to="/search/jiudian">
                <li className="float-left">酒店</li>
              </Link>
              <Link to="/search/xiuxianyule">
                <li className="float-left">休闲娱乐</li>
              </Link>
              <Link to="/search/waimai">
                <li className="float-left">外卖</li>
              </Link>
              <Link to="/search/huoguo">
                <li className="float-left">火锅</li>
              </Link>
              <Link to="/search/liren">
                <li className="float-left">丽人</li>
              </Link>
              <Link to="/search/dujiachuxing">
                <li className="float-left">度假出行</li>
              </Link>
              <Link to="/search/zuliaoanmo">
                <li className="float-left">足疗按摩</li>
              </Link>
              <Link to="/search/zhoubianyou">
                <li className="float-left">周边游</li>
              </Link>
            </ul>
          </div>
          <div className="carousel-item">
            <ul className="clear-fix">
              <Link to="/search/ribencai">
                <li className="float-left">日本菜</li>
              </Link>
              <Link to="/search/spa">
                <li className="float-left">SPA</li>
              </Link>
              <Link to="/search/jiehun">
                <li className="float-left">结婚</li>
              </Link>
              <Link to="/search/xuexipeixun">
                <li className="float-left">学习培训</li>
              </Link>
              <Link to="/search/xican">
                <li className="float-left">西餐</li>
              </Link>
              <Link to="/search/huochejipiao">
                <li className="float-left">火车机票</li>
              </Link>
              <Link to="/search/shaokao">
                <li className="float-left">烧烤</li>
              </Link>
              <Link to="/search/jiazhuang">
                <li className="float-left">家装</li>
              </Link>
              <Link to="/search/chongwu">
                <li className="float-left">宠物</li>
              </Link>
              <Link to="/search/all">
                <li className="float-left">全部分类</li>
              </Link>
            </ul>
          </div>
        </ReactSwipe>
        <div className="index-container">
          <ul>
            <li className={this.state.index === 0 ? 'selected' : ''}></li>
            <li className={this.state.index === 1 ? 'selected' : ''}></li>
            <li className={this.state.index === 2 ? 'selected' : ''}></li>
          </ul>
        </div>
        </div>
    )
  }
}
export default Category
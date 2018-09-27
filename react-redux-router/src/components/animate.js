import { h, Component } from "preact";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

class Animated extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.props);
    return (
      <ReactCSSTransitionGroup
        transitionEnter={true}
        transitionLeave={true}
        transitionEnterTimeout={2500}
        transitionLeaveTimeout={1500}
        transitionName={{ enter: this.props.enter, leave: this.props.leave }}
        className="animated"
      >
        {this.props.children[0]}
      </ReactCSSTransitionGroup>
    );
  }
}
export default Animated;

import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

// @withRouter()
const mapStateToProps = state => {
  console.log(state);
  return { app: state.app };
};
@withRouter
@connect(mapStateToProps)
export default class IndexContainer extends Component {
  render() {
    console.log(this.props);
    return <div>{JSON.stringify(this.props.app)}</div>;
  }
}

import React from 'react';
import PropTypes from "prop-types";

class A extends React.Component {
  render() {
    return (<div className="B">{this.props.router && this.props.router.params && this.props.router.params.user}</div>);
  }
}

A.contextTypes = {
  router: PropTypes.object
};

export default A;

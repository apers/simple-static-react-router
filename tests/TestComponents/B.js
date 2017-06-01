import React from 'react';
import PropTypes from "prop-types";

class B extends React.Component {
  render() {
    return (<div className="B">{this.props.router && this.props.router.params && this.props.router.params.user}</div>);
  }
}

B.contextTypes = {
  router: PropTypes.object
};


export default B;
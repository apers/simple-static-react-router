import React from 'react';
import PropTypes from "prop-types";

class Link extends React.Component {
  render() {
    return (
      <a href={this.props.href}>
        {this.props.children}
      </a>
    );
  }
}

Link.propTypes = {
  href: PropTypes.string.isRequired,
};

export default Link;

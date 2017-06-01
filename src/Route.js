import React from 'react';
import PropTypes from "prop-types";

class Route extends React.Component {
  render() {
    let clonedChildren;

    if (!Array.isArray(this.props.children)) {
      clonedChildren = React.cloneElement(this.props.children, {
        router: this.context.router,
      });
    }
    else {
      clonedChildren = this.props.children.map((component, index) => {
        return React.cloneElement(component, {
          key: component.type.name + index,
          router: this.context.router,
        });
      });
    }

    return (<div>{clonedChildren}</div>);
  }
}

Route.propTypes = {
  path: PropTypes.string.isRequired,
};

Route.contextTypes = {
  router: PropTypes.object,
};

export default Route;

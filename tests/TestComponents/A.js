import React from 'react';

class A extends React.Component {
  render() {
    return (<div className="A">A</div>);
  }
}

A.contextTypes = {
  router: React.PropTypes.object
};

export default A;

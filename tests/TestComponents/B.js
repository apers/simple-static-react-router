import React from 'react';

class B extends React.Component {
  render() {
    return (<div className="B">B</div>);
  }
}

B.contextTypes = {
  router: React.PropTypes.object
};


export default B;
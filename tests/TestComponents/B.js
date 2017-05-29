import React from 'react';

class B extends React.Component {
  render() {
    return (<div className="B">this.props.router.params.username</div>);
  }
}

B.contextTypes = {
  router: React.PropTypes.object
};


export default B;
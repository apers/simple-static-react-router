import React from 'react';

class A extends React.Component {
  componentWillMount() {
    console.log("Mounting A");
  }

  render() {
    console.log(this.props, "this.state.props");
    console.log("render A");
    return (<div>A</div>);
  }
}

A.contextTypes = {
  router: React.PropTypes.object
};

export default A;

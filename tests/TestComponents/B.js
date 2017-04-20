import React from 'react';

class B extends React.Component {
  componentWillMount() {
    console.log("Mounting B");
  }

  render() {
    console.log(this.props, "this.state.props");
    console.log("Render B");
    return (<div>B</div>);
  }
}

B.contextTypes = {
  router: React.PropTypes.object
};


export default B;
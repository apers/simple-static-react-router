import React from 'react';

class Route extends React.Component {
    render() {
        const {
            currentLocation
        } = this.context;

        return (<div>{this.props.children}</div>);
    }
}

Route.contextTypes = {
  currentLocation: React.PropTypes.string
}

export default Route;

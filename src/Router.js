import React from "react";
import {
  computePathRegexMap,
  getPathFromHash,
  enableDebugMode,
  debug
} from "./RouterUtils.js";

class Router extends React.Component {
  constructor(props) {
    super(props);

    if (props.debug) {
      enableDebugMode();
    }

    // Save reference so we can remove event listener later
    const hashChangeListener = this.routeUpdate.bind(this);

    window.addEventListener("hashchange", hashChangeListener);

    this.state = {
      currentLocation: getPathFromHash(window.location.hash),
      pathMap: computePathRegexMap(this.props.children),
      hashChangeListener,
    }
  }

  componentWillUnmount() {
    window.removeEventListener("hashchange", this.state.hashChangeListener);
  }

  getChildContext() {
    return {
      currentLocation: this.state.currentLocation
    }
  }

  render() {
    let pathMatch = this.state.pathMap.find((pathObj) => {
      if (pathObj.regex.exec(this.state.currentLocation)) {
        debug("Match for route: " + pathObj.component.props.path);
        return true;
      }
      return false;
    });

    if (pathMatch) {
      return (<div>{pathMatch.component}</div>);
    }
    else {
      debug("No matches found for route: " + this.state.currentLocation);
      return (<div></div>);
    }
  }

  routeUpdate(changeEvent) {
    this.setState({
      currentLocation: getPathFromHash(window.location.hash)
    });
  }
}

Router.childContextTypes = {
  currentLocation: React.PropTypes.string
};

Router.propTypes = {
  /**
   * Enable debug mode
   */
  debug: React.PropTypes.bool
};

export default Router;

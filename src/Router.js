import React from "react";
import PropTypes from "prop-types";

import {
  computePathRegexMap,
  getPathFromHash,
  enableDebugMode,
  debug,
  constructPathParamObject
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

    const router = {
      currentLocation: getPathFromHash(window.location.hash),
    };

    let childrenArray;
    if(Array.isArray(this.props.children)) {
      childrenArray = this.props.children;
    } else {
      childrenArray = [this.props.children];
    }

    this.state = {
      router,
      pathMap: computePathRegexMap(childrenArray),
      hashChangeListener,
    }
  }

  componentWillReceiveProps() {
    this.routeUpdate();
  }

  componentWillMount() {
    this.routeUpdate();
  }

  componentWillUnmount() {
    window.removeEventListener("hashchange", this.state.hashChangeListener);
  }

  getChildContext() {
    return {
      router: this.state.router,
    }
  }

  render() {
    if (this.state.component) {
      return (<div className="router">{this.state.component}</div>);
    }
    else {
      debug("No matches found for route: " + this.state.router.currentLocation);
      return (<div className="router"></div>);
    }
  }

  routeUpdate(changeEvent) {
    debug("Hash update: ", changeEvent);
    let currentLocation = getPathFromHash(window.location.hash);

    let pathParams = null;
    let pathMatch = this.state.pathMap.find((pathObj) => {
      let regexObj = pathObj.regex.exec(currentLocation);
      if (regexObj) {
        pathParams = constructPathParamObject(regexObj, pathObj.keys);
        debug("Match for route: " + pathObj.component.props.path);
        debug("From pathObj" + pathObj);
        return true;
      }
      return false;
    });

    const router = this.state.router;
    router['currentLocation'] = currentLocation;


    if (pathMatch) {
      router['params'] = pathParams;
      this.setState({
        component: pathMatch.component,
        router,
      });
    } else {
      router['params'] = null;
      this.setState({
        component: null,
        router,
      });
    }
  }
}

Router.childContextTypes = {
  router: PropTypes.object.isRequired
};

Router.propTypes = {
  /**
   * Enable debug mode
   */
  debug: PropTypes.bool
};

export default Router;

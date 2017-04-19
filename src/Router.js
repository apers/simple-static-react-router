import React from "react";
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

    this.state = {
      router,
      pathMap: computePathRegexMap(this.props.children),
      hashChangeListener,
    }
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
      return (<div>{this.state.component}</div>);
    }
    else {
      debug("No matches found for route: " + this.state.router.currentLocation);
      return (<div></div>);
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
        return true;
      }
      return false;
    });

    const router = this.state.router;

    if(pathMatch) {
      this.setState({
        component: pathMatch.component,
      });
      router['params'] = pathParams;
    } else {
      this.setState({
        component: null,
      });
      router['params'] = null;
    }

    router['currentLocation'] = currentLocation;

    this.setState({
      router,
    });
  }
}

Router.childContextTypes = {
  router: React.PropTypes.object
};

Router.propTypes = {
  /**
   * Enable debug mode
   */
  debug: React.PropTypes.bool
};

export default Router;

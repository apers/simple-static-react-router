import React from "react";
import {assertTrue} from "./RouterUtils.js";
import pathToRegexp from "path-to-regexp";

class Router extends React.Component {
    constructor(props) {
        super(props);

        const hashChangeListener = this.routeUpdate.bind(this);

        window.addEventListener("hashchange", hashChangeListener);

        this.state= {
            currentLocation: Router.getPathFromHash(window.location.hash),
            pathMap: Router.computePathRegexMap(this.props.children), 
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
            if(pathObj.regex.exec(this.state.currentLocation)) {
                console.log("Match for route: " + pathObj.component.props.path);
                return true;
            }
            console.warn("No matches found for route: " + this.state.currentLocation);
            return false;
        });

        return (<div>{pathMatch.component}</div>);
    }

    routeUpdate(changeEvent) {
        this.setState({
            currentLocation: Router.getPathFromHash(window.location.hash)
        });
    }

    static getPathFromHash(hash) {
        return hash.substring(hash.indexOf("#")+1);
    }

    static computePathRegexMap(childComponents) {
        return childComponents.map((childComponent) => {
            assertTrue("Child of Router not Route", childComponent.type.name === "Route");
            assertTrue("Route has no path", childComponent.props.path);

            return {
                regex: pathToRegexp(childComponent.props.path),
                component: childComponent,
            }
        });
    }
}

Router.childContextTypes = {
    currentLocation: React.PropTypes.string
};

export default Router;

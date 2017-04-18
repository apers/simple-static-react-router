import pathToRegexp from "path-to-regexp";

let debugMode = false;

export function assertTrue(message, condition) {
  if (!condition) {
    debug(message);
  }
}

export function enableDebugMode() {
  debugMode = true;
}

export function debug(...args) {
  if (debugMode) {
    console.log.apply(console, args);
  }
}

export function getPathFromHash(hash) {
  return hash.substring(hash.indexOf("#") + 1);
}

export function computePathRegexMap(childComponents) {
  return childComponents.map((childComponent) => {
    assertTrue("Child of Router not Route", childComponent.type.name === "Route");
    assertTrue("Route has no path", childComponent.props.path);

    let keys = [];
    const regex = pathToRegexp(childComponent.props.path, keys);
    return {
      regex,
      keys,
      component: childComponent,
    }
  });
}

export function constructPathParamObject(regexMatch, pathKeys) {
  let matchObject = {};
  pathKeys.forEach((key, index) => {
    matchObject[key.name] = regexMatch[index+1];
  });
  return matchObject;
}
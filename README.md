# Simple react router
## Example usage:
```
<div className="App">
  <Router>
    <Route path="/:user?">
      {...reactComponents}
    </Route>
    <Route path="/:user?/:user2?">
      {...reactComponents}
    </Route>
  </Router>
</div>
```


## Path
Path regex uses: https://github.com/pillarjs/path-to-regexp

## Params
Path parameters available in ```context.router.params```


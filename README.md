
# react-async-import-component 📬

Resolve components asynchronously, with support for code splitting and advanced server side rendering use cases.

[![npm](https://img.shields.io/npm/v/react-async-component.svg?style=flat-square)]()
[![Travis](https://img.shields.io/travis/ctrlplusb/react-async-component.svg?style=flat-square)]()
[![Codecov](https://img.shields.io/codecov/c/github/ctrlplusb/react-async-component.svg?style=flat-square)]()

# Installation
```shell
npm install react-async-import-component
```
# Usage

```jsx
import asyncComponent from 'react-async-import-component';

const Component = asyncComponent({
    resolve: () => import(/* webpackChunkName: "Component" */ 'src/xxxx'),
    LoadingComponent: () => (<div>loading</div>),
    ErrorComponent: () => (<div>Error</div>),
})

const AppRouter = () => (
    <Router>
        <Switch>
            <Route path="/" component={Component} />
        </Switch>
    </Router>
);
```

or

```jsx
import asyncComponent from 'react-async-import-component';
const Component = asyncComponent(() => import(/* webpackChunkName: "status" */ 'src/xxxx'));
}

const AppRouter = () => (
    <Router>
        <Switch>
            <Route path="/" component={Component} />
        </Switch>
    </Router>
);
```

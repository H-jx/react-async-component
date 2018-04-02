import * as React from 'react';


/**
 * @interface Options {
 *  resolve: () =>:Promise {},
 *  LoadingComponent?: React.Component,
 *  ErrorComponent?: React.Component,
 * }
 * @param {Options | Function} options
 */
const asyncComponentHOC = (options) => {
    let resolve;
    let LoadingComponent = null;
    let ErrorComponent = null;
    if (typeof options === 'function') {
        resolve = options;
    } else if (Object.prototype.toString.call(options) === '[object Object]') {
        if (typeof options.resolve === 'function') {
            resolve = options.resolve;
        } else {
            throw Error('resolve: must be a function');
        }
        LoadingComponent = options.LoadingComponent === undefined ? null : options.LoadingComponent;
        ErrorComponent = options.ErrorComponent === undefined ? null : options.ErrorComponent;
    }

    return class asyncComponent extends React.Component {
        constructor() {
            super();
            this.state = {
                Component: LoadingComponent,
            };
        }

        componentWillMount() {
            resolve().then((module) => {
                if (module.default) {
                    return module.default;
                }
                return module;
            }).then((Component) => {
                this.setState({
                    Component,
                });
                this.displayName = Component.displayName || Component.name || 'Compnenet';
            }).catch((err) => {
                this.setState({
                    Component: ErrorComponent,
                });
                throw err;
            });
            return false;
        }

        render() {
            const { Component } = this.state;
            return (Component === null ? null : <Component {...this.props} />);
        }
    };
};
export default asyncComponentHOC;


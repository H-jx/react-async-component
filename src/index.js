import * as React from 'react';

export const asyncComponent = (importComponent) => (
    class asyncComponent extends React.Component {
        constructor() {
            super();
            this.state = {
                Component: null
            }
        }

        componentWillMount() {
            if (this.state.Component !== null) { return false; }
            importComponent()
                .then((module) => module.default)
                .then((Component) => {
                    this.setState({
                        Component
                    });
                    this.displayName = Component.displayName || Component.name || 'Compnenet';
                })
                .catch((err) => {
                    console.error('load Componet failed');
                    throw err;
                });
            return false;
        }

        render() {
            var { Component } = this.state;
            return (Component !== null) ? <Component {...this.props} /> : null;
        }

    }
)
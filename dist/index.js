'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.asyncComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var React = _interopRequireWildcard(_react);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var asyncComponent = exports.asyncComponent = function asyncComponent(importComponent) {
    return function (_React$Component) {
        _inherits(asyncComponent, _React$Component);

        function asyncComponent() {
            _classCallCheck(this, asyncComponent);

            var _this = _possibleConstructorReturn(this, (asyncComponent.__proto__ || Object.getPrototypeOf(asyncComponent)).call(this));

            _this.state = {
                Component: null
            };
            return _this;
        }

        _createClass(asyncComponent, [{
            key: 'componentWillMount',
            value: function componentWillMount() {
                var _this2 = this;

                if (this.state.Component !== null) {
                    return false;
                }
                importComponent().then(function (module) {
                    return module.default;
                }).then(function (Component) {
                    _this2.setState({
                        Component: Component
                    });
                    _this2.displayName = Component.displayName || Component.name || 'Compnenet';
                }).catch(function (err) {
                    console.error('load Componet failed');
                    throw err;
                });
                return false;
            }
        }, {
            key: 'render',
            value: function render() {
                var Component = this.state.Component;

                return Component !== null ? React.createElement(Component, this.props) : null;
            }
        }]);

        return asyncComponent;
    }(React.Component);
};
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var React = _interopRequireWildcard(_react);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @interface Options {
 *  resolve: () =>:Promise {},
 *  LoadingComponent?: React.Component,
 *  ErrorComponent?: React.Component,
 * }
 * @param {Options | Function} options
 */
var asyncComponentHOC = function asyncComponentHOC(options) {
    var resolve = void 0;
    var LoadingComponent = null;
    var ErrorComponent = null;
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

    return function (_React$Component) {
        _inherits(asyncComponent, _React$Component);

        function asyncComponent() {
            _classCallCheck(this, asyncComponent);

            var _this = _possibleConstructorReturn(this, (asyncComponent.__proto__ || Object.getPrototypeOf(asyncComponent)).call(this));

            _this.state = {
                Component: LoadingComponent
            };
            return _this;
        }

        _createClass(asyncComponent, [{
            key: 'componentWillMount',
            value: function componentWillMount() {
                var _this2 = this;

                resolve().then(function (module) {
                    if (module.default) {
                        return module.default;
                    }
                    return module;
                }).then(function (Component) {
                    _this2.setState({
                        Component: Component
                    });
                    _this2.displayName = Component.displayName || Component.name || 'Compnenet';
                }).catch(function (err) {
                    _this2.setState({
                        Component: ErrorComponent
                    });
                    throw err;
                });
                return false;
            }
        }, {
            key: 'render',
            value: function render() {
                var Component = this.state.Component;

                return Component === null ? null : React.createElement(Component, this.props);
            }
        }]);

        return asyncComponent;
    }(React.Component);
};
exports.default = asyncComponentHOC;
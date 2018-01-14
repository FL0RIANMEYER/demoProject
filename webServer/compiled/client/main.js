webpackJsonp([1],{

/***/ "./demoProject/webServer/app/ajaxHandler.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _superagent = __webpack_require__("./node_modules/superagent/lib/client.js");

var _superagent2 = _interopRequireDefault(_superagent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AjaxHandler = function AjaxHandler() {
    var _this = this;

    var responseHandler = function responseHandler(error, response) {
        return _this.updateTodos && _this.updateTodos((response.body || []).slice(-5));
    };

    this.todos = [];

    _superagent2.default.get('/todo').end(responseHandler);

    this.setUpdate = function (fn) {
        return _this.updateTodos = fn;
    };

    this.delete = function (id) {
        _superagent2.default.delete('/todo').send({ id: id }).end(responseHandler);
    };

    this.submit = function (event) {
        var task = event.currentTarget.task.value;

        event.preventDefault();

        _superagent2.default.post('/todo').send({ task: task }).end(responseHandler);
    };
};

exports.default = AjaxHandler;

/***/ }),

/***/ "./demoProject/webServer/app/app.jsx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__("./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__("./node_modules/react-dom/index.js");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactHotLoader = __webpack_require__("./node_modules/react-hot-loader/index.js");

var _component = __webpack_require__("./demoProject/webServer/app/component.jsx");

var _component2 = _interopRequireDefault(_component);

var _app = __webpack_require__("./demoProject/webServer/app/app.scss");

var _app2 = _interopRequireDefault(_app);

var _ajaxHandler = __webpack_require__("./demoProject/webServer/app/ajaxHandler.js");

var _ajaxHandler2 = _interopRequireDefault(_ajaxHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ajaxHandler = new _ajaxHandler2.default();

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App(props) {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this.state = { todos: [] };

        _this.updateTodos = _this.updateTodos.bind(_this);

        ajaxHandler.setUpdate(_this.updateTodos);
        return _this;
    }

    _createClass(App, [{
        key: 'updateTodos',
        value: function updateTodos(todos) {
            this.setState({ todos: todos });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: _app2.default.app },
                _react2.default.createElement(_component2.default, { onSubmit: ajaxHandler.submit, onDelete: ajaxHandler.delete, todos: this.state.todos })
            );
        }
    }]);

    return App;
}(_react2.default.Component);

_reactDom2.default.render(_react2.default.createElement(
    _reactHotLoader.AppContainer,
    null,
    _react2.default.createElement(App, null)
), document.getElementById('root'));

/***/ }),

/***/ "./demoProject/webServer/app/app.scss":
/***/ (function(module, exports, __webpack_require__) {

// removed by extract-text-webpack-plugin
module.exports = {"app":"app__app___1o5uL"};
    if(true) {
      // 1515219051936
      var cssReload = __webpack_require__("./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ }),

/***/ "./demoProject/webServer/app/component.jsx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__("./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _recompose = __webpack_require__("./node_modules/recompose/es/Recompose.js");

var _component = __webpack_require__("./demoProject/webServer/app/component.scss");

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _recompose.pure)(function (_ref) {
    var _ref$onSubmit = _ref.onSubmit,
        onSubmit = _ref$onSubmit === undefined ? function () {} : _ref$onSubmit,
        _ref$onDelete = _ref.onDelete,
        onDelete = _ref$onDelete === undefined ? function () {} : _ref$onDelete,
        todos = _ref.todos;

    return _react2.default.createElement(
        'div',
        { className: _component2.default.component },
        _react2.default.createElement(
            'form',
            { id: 'form', onSubmit: onSubmit },
            _react2.default.createElement('input', { className: _component2.default.input, type: 'text', name: 'task', placeholder: 'ToDo' }),
            _react2.default.createElement(
                'button',
                { className: _component2.default.button, type: 'submit' },
                'Send'
            )
        ),
        _react2.default.createElement(
            'div',
            null,
            todos.filter(function (e) {
                return e != null;
            }).map(function (entry, i) {
                return _react2.default.createElement(
                    'div',
                    { className: _component2.default.entry, key: i, onClick: function onClick() {
                            return onDelete(entry._id);
                        } },
                    entry.todo
                );
            })
        )
    );
});

/***/ }),

/***/ "./demoProject/webServer/app/component.scss":
/***/ (function(module, exports, __webpack_require__) {

// removed by extract-text-webpack-plugin
module.exports = {"component":"component__component___1_rev","button":"component__button___HPD8G","input":"component__input___2VK37","entry":"component__entry___1SpZh"};
    if(true) {
      // 1515219051941
      var cssReload = __webpack_require__("./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("./node_modules/react-hot-loader/patch.js");
__webpack_require__("./node_modules/babel-polyfill/lib/index.js");
module.exports = __webpack_require__("./demoProject/webServer/app/app.jsx");


/***/ })

},[0]);
//# sourceMappingURL=main.js.map
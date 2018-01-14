require("source-map-support").install();
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.staticPath = exports.port = undefined;

var _path = __webpack_require__(1);

var _path2 = _interopRequireDefault(_path);

var _path3 = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = 3000;
var staticPath = _path2.default.join(_path3.compiled, 'client');

exports.port = port;
exports.staticPath = staticPath;
exports.default = { port: port, staticPath: staticPath };

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(4);
module.exports = __webpack_require__(5);


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _config = __webpack_require__(0);

var _server = __webpack_require__(7);

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

new _server2.default(_config.port);

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var path = __webpack_require__(1);

var CURRENT_WORKING_DIR = path.resolve(process.cwd(), 'demoProject/webServer');

module.exports = {
    root: CURRENT_WORKING_DIR,
    server: path.resolve(CURRENT_WORKING_DIR, 'server'),
    client: path.resolve(CURRENT_WORKING_DIR, 'app'),
    compiled: path.resolve(CURRENT_WORKING_DIR, 'compiled'),
    modules: path.resolve(CURRENT_WORKING_DIR, 'node_modules')
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = __webpack_require__(2);

var _express2 = _interopRequireDefault(_express);

var _bodyParser = __webpack_require__(8);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _routes = __webpack_require__(9);

var _routes2 = _interopRequireDefault(_routes);

var _config = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Server = function Server(port) {
    var app = (0, _express2.default)();

    app.use(_bodyParser2.default.urlencoded({ extended: false }));
    app.use(_bodyParser2.default.json());
    app.use(_routes2.default);
    app.use(_express2.default.static(_config.staticPath));

    app.listen(port, function () {
        return console.log('Example app listening on port ' + port + '!');
    });
};

exports.default = Server;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = __webpack_require__(2);

var _express2 = _interopRequireDefault(_express);

var _db = __webpack_require__(10);

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var db = new _db2.default();
var router = _express2.default.Router();

router.route('/todo').get(function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var todos;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return db.getAll();

                    case 3:
                        todos = _context.sent;


                        res.json(todos);
                        _context.next = 10;
                        break;

                    case 7:
                        _context.prev = 7;
                        _context.t0 = _context['catch'](0);
                        res.status(400).send({ error: 'Invalid user parameter' });
                    case 10:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[0, 7]]);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}()).post(function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var todos;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.prev = 0;
                        _context2.next = 3;
                        return db.insert(req.body.task);

                    case 3:
                        _context2.next = 5;
                        return db.getAll();

                    case 5:
                        todos = _context2.sent;


                        res.json(todos);
                        _context2.next = 12;
                        break;

                    case 9:
                        _context2.prev = 9;
                        _context2.t0 = _context2['catch'](0);
                        res.status(400).send({ error: 'Invalid user parameter' });
                    case 12:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined, [[0, 9]]);
    }));

    return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}()).delete(function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var todos;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.prev = 0;
                        _context3.next = 3;
                        return db.delete(req.body.id);

                    case 3:
                        _context3.next = 5;
                        return db.getAll();

                    case 5:
                        todos = _context3.sent;


                        res.json(todos);
                        _context3.next = 12;
                        break;

                    case 9:
                        _context3.prev = 9;
                        _context3.t0 = _context3['catch'](0);
                        res.status(400).send({ error: 'Invalid user parameter' });
                    case 12:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined, [[0, 9]]);
    }));

    return function (_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}());

exports.default = router;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongodb = __webpack_require__(11);

var DB = function DB() {
    var url = 'mongodb://localhost:27017';
    var dbName = 'test';

    this.insert = function (todo) {
        return query(function (collection, resolve, reject) {
            return collection.insert({ todo: todo }, { w: 1 }, function (err) {
                return err ? reject(err) : resolve();
            });
        });
    };

    this.delete = function (_id) {
        return query(function (collection, resolve, reject) {
            return collection.deleteOne({ _id: (0, _mongodb.ObjectID)(_id) }, function (err) {
                return err ? reject(err) : resolve();
            });
        });
    };

    this.getAll = function () {
        return query(function (collection, resolve, reject) {
            return collection.find({}).toArray(function (err, items) {
                return err ? reject() : resolve(items);
            });
        });
    };

    function query(query) {
        return new Promise(function (resolve, reject) {
            return _mongodb.MongoClient.connect(url, function (err, client) {
                return query(client.db(dbName).collection('createIndexExample1'), function () {
                    return resolve.apply(undefined, arguments) || client.close();
                }, function () {
                    return reject.apply(undefined, arguments) || client.close();
                });
            });
        });
    }
};

exports.default = DB;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("mongodb");

/***/ })
/******/ ]);
//# sourceMappingURL=main.dev.js.map
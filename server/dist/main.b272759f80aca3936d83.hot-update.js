require("source-map-support").install();
exports.id = "main";
exports.modules = {

/***/ "./src/api/modules/auth.js":
/*!*********************************!*\
  !*** ./src/api/modules/auth.js ***!
  \*********************************/
/*! exports provided: getJWT, verifyToken */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getJWT", function() { return getJWT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "verifyToken", function() { return verifyToken; });
/* harmony import */ var babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/helpers/slicedToArray */ "babel-runtime/helpers/slicedToArray");
/* harmony import */ var babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babel-runtime/regenerator */ "babel-runtime/regenerator");
/* harmony import */ var babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! babel-runtime/helpers/asyncToGenerator */ "babel-runtime/helpers/asyncToGenerator");
/* harmony import */ var babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! babel-runtime/core-js/promise */ "babel-runtime/core-js/promise");
/* harmony import */ var babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_5__);





var _this = undefined;



var aaud = "1kim3ke0fq358jrota00sam46r";
var tokenUrl = 'https://cognito-idp.us-east-2.amazonaws.com/us-east-2_ZAwetvcgl/.well-known/jwks.json';

var tokenKeys = null;

var getJWT = function getJWT() {
    return new babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_3___default.a(function () {
        var _ref = babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee(resolve, reject) {
            var _ref2, keys;

            return babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.prev = 0;
                            _context.next = 3;
                            return axios__WEBPACK_IMPORTED_MODULE_4___default.a.get(tokenUrl);

                        case 3:
                            _ref2 = _context.sent;
                            keys = _ref2.data.keys;

                            tokenKeys = keys;
                            resolve();
                            _context.next = 12;
                            break;

                        case 9:
                            _context.prev = 9;
                            _context.t0 = _context['catch'](0);

                            reject(_context.t0);

                        case 12:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this, [[0, 9]]);
        }));

        return function (_x, _x2) {
            return _ref.apply(this, arguments);
        };
    }());
};

var verifyToken = function verifyToken(req, res, next) {
    var bearerLength = "Bearer ".length;
    var authorization = req.headers.authorization;

    if (authorization && authorization.length > bearerLength) {
        var token = authorization.slice(bearerLength);
        var tokenData = jsonwebtoken__WEBPACK_IMPORTED_MODULE_5___default.a.decode(token, { complete: true });
        console.log("req", { originalUrl: req.originalUrl, method: req.method.toLowerCase() });

        if (!!tokenData) {
            var _tokenData$header = tokenData.header,
                kid = _tokenData$header.kid,
                alg = _tokenData$header.alg,
                payload = tokenData.payload;
            var aud = payload.aud,
                exp = payload.exp;

            var _tokenKeys$filter = tokenKeys.filter(function (k) {
                return k.kid === kid && k.alg === alg;
            }),
                _tokenKeys$filter2 = babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_tokenKeys$filter, 1),
                matchKey = _tokenKeys$filter2[0];

            var current_ts = Math.floor(new Date() / 1000);
            console.log("next>|>");
            if (matchKey !== undefined && aaud === aud && current_ts < exp) {
                req.user = payload;
                console.log("next>>");
                next();
                return;
            }
        }
    } else if (req.originalUrl.match('/api/invoice') !== null && req.method.toLowerCase() === 'get' || req.originalUrl.match('/api/payment') !== null && req.method.toLowerCase() === 'post' || req.originalUrl.match('/api/payment') !== null && req.method.toLowerCase() === 'get' || req.originalUrl.match('/api/banks') !== null && req.method.toLowerCase() === 'get' || req.originalUrl.match('/api/dispute') !== null && req.method.toLowerCase() === 'post' || req.originalUrl.match('/api/dispute') !== null && req.method.toLowerCase() === 'get' || req.originalUrl.match('/api/verify') !== null && req.method.toLowerCase() === 'get') {
        console.log("50:final");
        next();
    } else {
        console.log("53:final");
        res.status(403).send({ success: false, error: 'Invalid auth token' });
    }
    console.log("did nothing");
};

/***/ })

};
//# sourceMappingURL=main.b272759f80aca3936d83.hot-update.js.map
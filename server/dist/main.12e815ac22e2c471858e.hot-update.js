require("source-map-support").install();
exports.id = "main";
exports.modules = {

/***/ "./src/api/resources/banks/banks.route.js":
/*!************************************************!*\
  !*** ./src/api/resources/banks/banks.route.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/regenerator */ "babel-runtime/regenerator");
/* harmony import */ var babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babel-runtime/helpers/asyncToGenerator */ "babel-runtime/helpers/asyncToGenerator");
/* harmony import */ var babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var superagent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! superagent */ "superagent");
/* harmony import */ var superagent__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(superagent__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_3__);



var _this = undefined;



var secret = "sk_test_ef208dee35b39342cf35bf961ec6cb19ebc2f94c";
var Router = express__WEBPACK_IMPORTED_MODULE_3___default.a.Router();

Router.route('/').get(function () {
    var _ref = babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(req, res) {
        return babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        superagent__WEBPACK_IMPORTED_MODULE_2___default.a.get('https://api.paystack.co/bank').set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + secret).end(function (err, _ref2) {
                            var data = _ref2.body.data;

                            if (err) res.status(400).send({ success: false, err: err });
                            res.send({ success: true, data: data });
                        });

                    case 1:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, _this);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}());

Router.route('/verify/:bank_code/:account_number').get(function () {
    var _ref3 = babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(req, res) {
        var _req$params, bank_code, account_number;

        return babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _req$params = req.params, bank_code = _req$params.bank_code, account_number = _req$params.account_number;


                        superagent__WEBPACK_IMPORTED_MODULE_2___default.a.get('https://api.paystack.co/bank/resolve?account_number=' + account_number + '&bank_code=' + bank_code).set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + secret).end(function (err, _ref4) {
                            var data = _ref4.body.data;

                            if (err) res.status(400).send({ success: false, err: err });
                            res.send({ success: true, data: data });
                        });

                    case 2:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, _this);
    }));

    return function (_x3, _x4) {
        return _ref3.apply(this, arguments);
    };
}());

/* harmony default export */ __webpack_exports__["default"] = (Router);

/***/ })

};
//# sourceMappingURL=main.12e815ac22e2c471858e.hot-update.js.map
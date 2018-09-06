require("source-map-support").install();
exports.id = "main";
exports.modules = {

/***/ "./src/api/modules/transfer.js":
/*!*************************************!*\
  !*** ./src/api/modules/transfer.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/regenerator */ "babel-runtime/regenerator");
/* harmony import */ var babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babel-runtime/helpers/asyncToGenerator */ "babel-runtime/helpers/asyncToGenerator");
/* harmony import */ var babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! babel-runtime/core-js/promise */ "babel-runtime/core-js/promise");
/* harmony import */ var babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var superagent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! superagent */ "superagent");
/* harmony import */ var superagent__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(superagent__WEBPACK_IMPORTED_MODULE_3__);




var _this = undefined;


var secret = "sk_test_ef208dee35b39342cf35bf961ec6cb19ebc2f94c";

var getReceipt = function getReceipt(name, account_number, bank_code) {
    return new babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_2___default.a(function (resolve, reject) {
        superagent__WEBPACK_IMPORTED_MODULE_3___default.a.post("https://api.paystack.co/transferrecipient").set("Authorization", "Bearer " + secret).send({
            "type": "nuban",
            name: name,
            account_number: account_number,
            bank_code: bank_code,
            currency: 'NGN'
        }).end(function (err, _ref) {
            var body = _ref.body;

            if (err) reject(err);
            console.log('body', body);
            resolve(body);
        });
    });
};

var makeTransfer = function makeTransfer(recipient_code, amount) {
    return new babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_2___default.a(function (resolve, reject) {
        superagent__WEBPACK_IMPORTED_MODULE_3___default.a.post("https://api.paystack.co/transfer").set("Authorization", "Bearer " + secret).send({
            "source": "balance",
            amount: amount,
            recipient_code: recipient_code,
            currency: 'NGN'
        }).end(function (err, data) {
            if (err) reject(err);
            resolve(data);
        });
    });
};

var transfer = function transfer(name, account_number, bank_code, amount) {
    return new babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_2___default.a(function () {
        var _ref2 = babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(resolve, reject) {
            var _ref3, recipient_code, _ref4, _status;

            return babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.prev = 0;
                            _context.next = 3;
                            return getReceipt(name, account_number, bank_code);

                        case 3:
                            _ref3 = _context.sent;
                            recipient_code = _ref3.recipient_code;

                            if (!(status && recipient_code)) {
                                _context.next = 13;
                                break;
                            }

                            _context.next = 8;
                            return makeTransfer(recipient_code, amount);

                        case 8:
                            _ref4 = _context.sent;
                            _status = _ref4.status;

                            if (_status) resolve();
                            _context.next = 14;
                            break;

                        case 13:
                            reject(new Error('No recipient_code'));

                        case 14:
                            _context.next = 19;
                            break;

                        case 16:
                            _context.prev = 16;
                            _context.t0 = _context["catch"](0);

                            reject(_context.t0);

                        case 19:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, _this, [[0, 16]]);
        }));

        return function (_x, _x2) {
            return _ref2.apply(this, arguments);
        };
    }());
};

/* harmony default export */ __webpack_exports__["default"] = (transfer);

/***/ })

};
//# sourceMappingURL=main.7ca85ada0da19a3f066f.hot-update.js.map
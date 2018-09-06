require("source-map-support").install();
exports.id = "main";
exports.modules = {

/***/ "./src/api/modules/invoice.js":
/*!************************************!*\
  !*** ./src/api/modules/invoice.js ***!
  \************************************/
/*! exports provided: CreateInvoice */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateInvoice", function() { return CreateInvoice; });
/* harmony import */ var babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/regenerator */ "babel-runtime/regenerator");
/* harmony import */ var babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babel-runtime/helpers/asyncToGenerator */ "babel-runtime/helpers/asyncToGenerator");
/* harmony import */ var babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! babel-runtime/core-js/promise */ "babel-runtime/core-js/promise");
/* harmony import */ var babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var superagent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! superagent */ "superagent");
/* harmony import */ var superagent__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(superagent__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var date_fns_add_days__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! date-fns/add_days */ "./node_modules/date-fns/add_days/index.js");
/* harmony import */ var date_fns_add_days__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(date_fns_add_days__WEBPACK_IMPORTED_MODULE_4__);




var _this = undefined;



var secret = "sk_test_ef208dee35b39342cf35bf961ec6cb19ebc2f94c";

var CreateCustomer = function CreateCustomer(_ref) {
    var name = _ref.name,
        email = _ref.email,
        phone = _ref.phone;
    return new babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_2___default.a(function (resolve, reject) {
        superagent__WEBPACK_IMPORTED_MODULE_3___default.a.post('https://api.paystack.co/customer').set("Authorization", 'Bearer ' + secret).send({
            name: name,
            email: email,
            phone: phone
        }).end(function (err, _ref2) {
            var body = _ref2.body;

            if (err) reject(err);
            resolve(body);
        });
    });
};

var CreateInvoice = function CreateInvoice(customer, amount, description) {
    return new babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_2___default.a(function () {
        var _ref3 = babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(resolve, reject) {
            var _ref4, customer_code, due_date;

            return babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return CreateCustomer(customer);

                        case 2:
                            _ref4 = _context.sent;
                            customer_code = _ref4.data.customer_code;
                            due_date = date_fns_add_days__WEBPACK_IMPORTED_MODULE_4___default()(new Date(), 7);


                            superagent__WEBPACK_IMPORTED_MODULE_3___default.a.post('https://api.paystack.co/paymentrequest').set("Authorization", 'Bearer ' + secret).send({
                                customer: customer_code,
                                description: description,
                                amount: amount,
                                due_date: due_date
                            }).end(function (err, _ref5) {
                                var body = _ref5.body;

                                if (err) reject(err);
                                resolve(body);
                            });

                        case 6:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this);
        }));

        return function (_x, _x2) {
            return _ref3.apply(this, arguments);
        };
    }());
};

/***/ })

};
//# sourceMappingURL=main.1839a0e06c3cc2dd3305.hot-update.js.map
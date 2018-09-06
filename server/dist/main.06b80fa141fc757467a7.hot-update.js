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




var _this = undefined;


var secret = "sk_test_ef208dee35b39342cf35bf961ec6cb19ebc2f94c";

var CreateCustomer = function CreateCustomer(_ref) {
    var name = _ref.name,
        email = _ref.email,
        phone = _ref.phone;
    return new babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_2___default.a(function (req, res) {
        superagent__WEBPACK_IMPORTED_MODULE_3___default.a.post("https://api.paystack.co/customer").set("Authorization", "Bearer " + secret).send({
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
            var _ref4, status, customer_code;

            return babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return CreateCustomer(customer);

                        case 2:
                            _ref4 = _context.sent;
                            status = _ref4.status;
                            customer_code = _ref4.data.customer_code;


                            superagent__WEBPACK_IMPORTED_MODULE_3___default.a.post("https://api.paystack.co/paymentrequest").set("Authorization", "Bearer " + secret).send({
                                customer: customer_code,
                                description: description,
                                amount: amount,
                                due_date: "2018-10-08"
                            }).end(function (err, _ref5) {
                                var body = _ref5.body;

                                if (err) reject(err);
                                resolve(body);
                            });

                        case 6:
                        case "end":
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

/***/ }),

/***/ "./src/api/resources/invoice/invoice.controller.js":
/*!*********************************************************!*\
  !*** ./src/api/resources/invoice/invoice.controller.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/regenerator */ "babel-runtime/regenerator");
/* harmony import */ var babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babel-runtime/helpers/asyncToGenerator */ "babel-runtime/helpers/asyncToGenerator");
/* harmony import */ var babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _invoice_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./invoice.model */ "./src/api/resources/invoice/invoice.model.js");
/* harmony import */ var _modules_mailer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../modules/mailer */ "./src/api/modules/mailer.js");
/* harmony import */ var _modules_recode__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../modules/recode */ "./src/api/modules/recode.js");
/* harmony import */ var _modules_generateController__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../modules/generateController */ "./src/api/modules/generateController.js");
/* harmony import */ var _modules_invoice__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../modules/invoice */ "./src/api/modules/invoice.js");



var _this = undefined;







/* harmony default export */ __webpack_exports__["default"] = (Object(_modules_generateController__WEBPACK_IMPORTED_MODULE_5__["default"])(_invoice_model__WEBPACK_IMPORTED_MODULE_2__["default"], {
    createOne: function () {
        var _ref = babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(req, res) {
            var body, _ref2, request_code;

            return babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            body = req.body;

                            body.userId = req.user.id;
                            body.marchantEmail = req.user.email;
                            body.status = "sent";
                            body.verifyCode =  false ? undefined : Object(_modules_recode__WEBPACK_IMPORTED_MODULE_4__["default"])();
                            body.totalPrice = 200 + body.purchaseAmount + body.deliveryAmount + body.purchaseAmount * 5 / 100;

                            _context2.prev = 6;
                            _context2.next = 9;
                            return Object(_modules_invoice__WEBPACK_IMPORTED_MODULE_6__["default"])({ email: body.customerEmail, name: body.customerName, phone: body.customerPhone }, body.totalPrice, body.description);

                        case 9:
                            _ref2 = _context2.sent;
                            request_code = _ref2.data.request_code;


                            body.invoice_code = request_code;

                            _invoice_model__WEBPACK_IMPORTED_MODULE_2__["default"].create(body, function () {
                                var _ref3 = babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(err, doc) {
                                    return babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
                                        while (1) {
                                            switch (_context.prev = _context.next) {
                                                case 0:
                                                    if (!err) {
                                                        _context.next = 2;
                                                        break;
                                                    }

                                                    return _context.abrupt('return', res.status(400).send({ error: { message: 'Could not create the invoice' }, success: false }));

                                                case 2:
                                                    delete doc.verifyCode;
                                                    res.send({ data: doc, success: true });

                                                case 4:
                                                case 'end':
                                                    return _context.stop();
                                            }
                                        }
                                    }, _callee, _this);
                                }));

                                return function (_x3, _x4) {
                                    return _ref3.apply(this, arguments);
                                };
                            }());
                            _context2.next = 18;
                            break;

                        case 15:
                            _context2.prev = 15;
                            _context2.t0 = _context2['catch'](6);
                            return _context2.abrupt('return', res.status(400).send({ err: _context2.t0, success: false }));

                        case 18:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, _this, [[6, 15]]);
        }));

        return function createOne(_x, _x2) {
            return _ref.apply(this, arguments);
        };
    }()
}));

/***/ }),

/***/ "./src/api/resources/invoice/invoice.model.js":
/*!****************************************************!*\
  !*** ./src/api/resources/invoice/invoice.model.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ "mongoose");
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);


var InvoiceSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.Schema({
    userId: String,
    description: String,
    deliveryAmount: Number,
    purchaseAmount: Number,
    totalPrice: Number,
    customerName: String,
    customerEmail: String,
    marchantName: String,
    marchantAccountNumber: String,
    marchantBankCode: String,
    marchantEmail: String,
    invoice_code: String,
    verifyCode: String,
    status: String
});

/* harmony default export */ __webpack_exports__["default"] = (mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.model('Invoice', InvoiceSchema));

/***/ })

};
//# sourceMappingURL=main.06b80fa141fc757467a7.hot-update.js.map
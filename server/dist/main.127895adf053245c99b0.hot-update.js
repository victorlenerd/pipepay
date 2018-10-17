require("source-map-support").install();
exports.id = "main";
exports.modules = {

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
/* harmony import */ var _modules_recode__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../modules/recode */ "./src/api/modules/recode.js");
/* harmony import */ var _modules_generateController__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../modules/generateController */ "./src/api/modules/generateController.js");
/* harmony import */ var _modules_invoice__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../modules/invoice */ "./src/api/modules/invoice.js");



var _this = undefined;






/* harmony default export */ __webpack_exports__["default"] = (Object(_modules_generateController__WEBPACK_IMPORTED_MODULE_4__["default"])(_invoice_model__WEBPACK_IMPORTED_MODULE_2__["default"], {
    createOne: function () {
        var _ref = babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(req, res) {
            var body, line_items, customerTotalAmount, customerDeliveryFee, customPipepayFee, reconciliator, _ref4, request_code;

            return babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            body = req.body;


                            console.log("body", body);

                            body.userId = req.user.sub;
                            body.marchantEmail = req.user.email;
                            body.marchantName = req.user.name;
                            body.marchantAccountNumber = req.user['custom:account_number'];
                            body.marchantBankCode = req.user['custom:bank_code'];

                            body.verifyCode =  false ? undefined : Object(_modules_recode__WEBPACK_IMPORTED_MODULE_3__["default"])();

                            if (body.type === 'good') {
                                body.bankCharges = 100;
                                body.pipePayFee = Math.min(body.purchaseAmount * 5 / 100, 5000) + body.bankCharges;
                                body.totalPrice = body.purchaseAmount + body.deliveryAmount + body.pipePayFee;
                            } else {
                                body.bankCharges = body.milestones.length * 50;
                                body.purchaseAmount = body.milestones.reduce(function (pv, _ref2) {
                                    var amount = _ref2.amount;
                                    return amount + pv;
                                }, 0);
                                body.purchaseAmount;
                                body.pipePayFee = Math.min(body.purchaseAmount * 5 / 100, 5000) + body.bankCharges;
                                body.deliveryAmount = 0;
                                body.totalPrice = body.purchaseAmount + body.pipePayFee;
                            }

                            line_items = [];
                            customerTotalAmount = body.purchaseAmount;
                            customerDeliveryFee = 0;
                            customPipepayFee = 0;

                            reconciliator = function reconciliator(who, original, fee) {
                                if (who === 'both') {
                                    return original += fee / 2;
                                } else if (who === 'buyer') {
                                    return original += fee;
                                } else {
                                    return original;
                                }
                            };

                            customerDeliveryFee = reconciliator(body.whoPaysDeliveryFee, customerDeliveryFee, body.deliveryAmount);
                            customPipepayFee = reconciliator(body.whoPaysPipepayFee, customPipepayFee, body.pipePayFee);

                            if (body.type === 'good') {
                                line_items = [{ 'name': 'Purchase Price', 'amount': customerTotalAmount * 100 }];

                                if (customPipepayFee > 0) line_items.push({ 'name': 'PipePay Fee', 'amount': customPipepayFee * 100 });
                                if (customerDeliveryFee > 0) line_items.push({ 'name': 'Delivery Fee', 'amount': customerDeliveryFee * 100 });
                            } else {
                                line_items = body.milestones.map(function (_ref3) {
                                    var description = _ref3.description,
                                        amount = _ref3.amount;
                                    return { name: description, amount: amount * 100 };
                                });
                                line_items.push({ 'name': 'PipePay Fee', 'amount': body.pipePayFee * 100 });
                            }

                            _context2.prev = 17;
                            _context2.next = 20;
                            return Object(_modules_invoice__WEBPACK_IMPORTED_MODULE_5__["CreateInvoice"])({ email: body.customerEmail, name: body.customerName, phone: body.customerPhone }, customerTotalAmount * 100, body.description, line_items);

                        case 20:
                            _ref4 = _context2.sent;
                            request_code = _ref4.data.request_code;


                            body.invoice_code = request_code;

                            _invoice_model__WEBPACK_IMPORTED_MODULE_2__["default"].create(body, function () {
                                var _ref5 = babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(err, doc) {
                                    return babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
                                        while (1) {
                                            switch (_context.prev = _context.next) {
                                                case 0:
                                                    if (!err) {
                                                        _context.next = 3;
                                                        break;
                                                    }

                                                    console.log("err", err);
                                                    return _context.abrupt('return', res.status(400).send({ error: { message: 'Could not create the invoice' }, success: false }));

                                                case 3:
                                                    delete doc.verifyCode;
                                                    doc.status = "sent";
                                                    doc.save();
                                                    res.send({ data: doc, success: true });

                                                case 7:
                                                case 'end':
                                                    return _context.stop();
                                            }
                                        }
                                    }, _callee, _this);
                                }));

                                return function (_x3, _x4) {
                                    return _ref5.apply(this, arguments);
                                };
                            }());
                            _context2.next = 30;
                            break;

                        case 26:
                            _context2.prev = 26;
                            _context2.t0 = _context2['catch'](17);

                            console.log('err', _context2.t0);
                            return _context2.abrupt('return', res.status(400).send({ err: _context2.t0, success: false }));

                        case 30:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, _this, [[17, 26]]);
        }));

        return function createOne(_x, _x2) {
            return _ref.apply(this, arguments);
        };
    }()
}));

/***/ })

};
//# sourceMappingURL=main.127895adf053245c99b0.hot-update.js.map
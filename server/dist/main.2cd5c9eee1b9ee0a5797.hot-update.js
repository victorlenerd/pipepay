require("source-map-support").install();
exports.id = "main";
exports.modules = {

/***/ "./src/api/resources/payment/payment.controller.js":
/*!*********************************************************!*\
  !*** ./src/api/resources/payment/payment.controller.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/helpers/extends */ "babel-runtime/helpers/extends");
/* harmony import */ var babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babel-runtime/regenerator */ "babel-runtime/regenerator");
/* harmony import */ var babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! babel-runtime/helpers/asyncToGenerator */ "babel-runtime/helpers/asyncToGenerator");
/* harmony import */ var babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var babel_runtime_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! babel-runtime/core-js/json/stringify */ "babel-runtime/core-js/json/stringify");
/* harmony import */ var babel_runtime_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! crypto */ "crypto");
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _payment_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./payment.model */ "./src/api/resources/payment/payment.model.js");
/* harmony import */ var _invoice_invoice_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../invoice/invoice.model */ "./src/api/resources/invoice/invoice.model.js");
/* harmony import */ var _modules_mailer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../modules/mailer */ "./src/api/modules/mailer.js");
/* harmony import */ var _modules_generateController__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../modules/generateController */ "./src/api/modules/generateController.js");
/* harmony import */ var _modules_transfer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../modules/transfer */ "./src/api/modules/transfer.js");





var _this = undefined;








var secret = "sk_test_ef208dee35b39342cf35bf961ec6cb19ebc2f94c";

/* harmony default export */ __webpack_exports__["default"] = (Object(_modules_generateController__WEBPACK_IMPORTED_MODULE_8__["default"])(_payment_model__WEBPACK_IMPORTED_MODULE_5__["default"], {
    createOne: function createOne(req, res) {
        var hash = crypto__WEBPACK_IMPORTED_MODULE_4___default.a.createHmac('sha512', secret).update(babel_runtime_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_3___default()(req.body)).digest('hex');
        var _req$body = req.body,
            event = _req$body.event,
            _req$body$data = _req$body.data,
            reference = _req$body$data.transaction.reference,
            amount = _req$body$data.amount,
            paid = _req$body$data.paid,
            invoice_code = _req$body$data.invoice_code,
            _req$body$data$custom = _req$body$data.customer,
            first_name = _req$body$data$custom.first_name,
            last_name = _req$body$data$custom.last_name,
            email = _req$body$data$custom.email;

        console.log({ hash: hash, event: event, paid: paid });
        if (hash === req.headers['x-paystack-signature'] && event === 'invoice.update' && paid) {
            _invoice_invoice_model__WEBPACK_IMPORTED_MODULE_6__["default"].findOneAndUpdate({ invoice_code: invoice_code }, { $set: { status: 'paid' } }, { new: true }, function () {
                var _ref = babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee(err, doc) {
                    var _id, type, whoPaysDeliveryFee, marchantName, marchantEmail, marchantBankCode, deliveryAmount, marchantAccountNumber;

                    return babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    if (!err) {
                                        _context.next = 3;
                                        break;
                                    }

                                    console.log(err);
                                    return _context.abrupt('return', res.status(400).send({ error: new Error(error), status: false }));

                                case 3:
                                    _id = doc._id, type = doc.type, whoPaysDeliveryFee = doc.whoPaysDeliveryFee, marchantName = doc.marchantName, marchantEmail = doc.marchantEmail, marchantBankCode = doc.marchantBankCode, deliveryAmount = doc.deliveryAmount, marchantAccountNumber = doc.marchantAccountNumber;


                                    console.log('updated invoice' + invoice_code);

                                    _context.prev = 5;

                                    if (!(type === 'good')) {
                                        _context.next = 11;
                                        break;
                                    }

                                    _context.next = 9;
                                    return Object(_modules_transfer__WEBPACK_IMPORTED_MODULE_9__["default"])(marchantName, marchantAccountNumber, marchantBankCode, deliveryAmount);

                                case 9:
                                    _context.next = 11;
                                    return _payment_model__WEBPACK_IMPORTED_MODULE_5__["default"].create({ customerEmail: email, marchantEmail: marchantEmail, reference: reference, deliveryAmount: deliveryAmount, invoiceId: _id });

                                case 11:
                                    _context.next = 13;
                                    return _modules_mailer__WEBPACK_IMPORTED_MODULE_7__["sendReceiptMail"](first_name + ' ' + last_name, email, marchantEmail, amount);

                                case 13:
                                    console.log('sent receipt to' + email);
                                    res.status(200).send({ success: true });
                                    _context.next = 21;
                                    break;

                                case 17:
                                    _context.prev = 17;
                                    _context.t0 = _context['catch'](5);

                                    console.log(_context.t0);
                                    return _context.abrupt('return', res.status(400).send({ error: { message: 'Could not send mail' }, success: false }));

                                case 21:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, _this, [[5, 17]]);
                }));

                return function (_x, _x2) {
                    return _ref.apply(this, arguments);
                };
            }());
        } else {
            res.status(400).send({ success: false });
        }
    },
    getOne: function getOne(req, res) {
        var id = req.params.invoiceId;
        _payment_model__WEBPACK_IMPORTED_MODULE_5__["default"].findOne({ invoiceId: id }, function (err, doc) {
            if (err) res.status(401).send({ success: false, error: babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, err) });
            res.status(200).send({ success: true, data: doc });
        });
    }
}));

/***/ })

};
//# sourceMappingURL=main.2cd5c9eee1b9ee0a5797.hot-update.js.map
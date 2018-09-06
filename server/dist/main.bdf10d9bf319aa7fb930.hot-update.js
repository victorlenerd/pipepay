require("source-map-support").install();
exports.id = "main";
exports.modules = {

/***/ "./src/api/resources/dispute/dispute.controller.js":
/*!*********************************************************!*\
  !*** ./src/api/resources/dispute/dispute.controller.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/regenerator */ "babel-runtime/regenerator");
/* harmony import */ var babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babel-runtime/helpers/asyncToGenerator */ "babel-runtime/helpers/asyncToGenerator");
/* harmony import */ var babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _dispute_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dispute.model */ "./src/api/resources/dispute/dispute.model.js");
/* harmony import */ var _invoice_invoice_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../invoice/invoice.model */ "./src/api/resources/invoice/invoice.model.js");
/* harmony import */ var _modules_generateController__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../modules/generateController */ "./src/api/modules/generateController.js");
/* harmony import */ var _modules_mailer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../modules/mailer */ "./src/api/modules/mailer.js");



var _this = undefined;






var DisputeController = Object(_modules_generateController__WEBPACK_IMPORTED_MODULE_4__["default"])(_dispute_model__WEBPACK_IMPORTED_MODULE_2__["default"], {
    getInvoiceId: function getInvoiceId(req, res, next) {
        var _id = req.params.invoiceId;

        _invoice_invoice_model__WEBPACK_IMPORTED_MODULE_3__["default"].findOne({ _id: _id }, function (err, doc) {
            if (err) return res.status(400).send({ error: { message: 'Invoice with id does not exits' }, success: false });
            req.invoice = doc;
            next();
        });
    },
    createOne: function createOne(req, res) {
        var body = req.body;
        var _req$invoice = req.invoice,
            marchantEmail = _req$invoice.marchantEmail,
            customerEmail = _req$invoice.customerEmail,
            customerName = _req$invoice.customerName,
            _id = _req$invoice._id;

        body.status = "open";
        body.invoiceId = _id;
        _dispute_model__WEBPACK_IMPORTED_MODULE_2__["default"].create(body, function () {
            var _ref = babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(err, doc) {
                return babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!err) {
                                    _context.next = 2;
                                    break;
                                }

                                return _context.abrupt('return', res.status(400).send({ error: { message: 'Could not create the dispute' }, success: false }));

                            case 2:
                                _context.prev = 2;
                                _context.next = 5;
                                return Object(_modules_mailer__WEBPACK_IMPORTED_MODULE_5__["sendDisputeMail"])(marchantEmail, customerEmail, customerName, body.reason);

                            case 5:
                                res.send({ data: doc, success: true });
                                _context.next = 11;
                                break;

                            case 8:
                                _context.prev = 8;
                                _context.t0 = _context['catch'](2);
                                return _context.abrupt('return', res.status(400).send({ error: { message: 'Could not send mail' }, success: false }));

                            case 11:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, _this, [[2, 8]]);
            }));

            return function (_x, _x2) {
                return _ref.apply(this, arguments);
            };
        }());
    },
    getOne: function getOne(req, res) {
        var invoiceId = req.params.invoiceId;
        _dispute_model__WEBPACK_IMPORTED_MODULE_2__["default"].findOne({ invoiceId: invoiceId }, function () {
            var _ref2 = babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(err, doc) {
                return babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                if (!err) {
                                    _context2.next = 2;
                                    break;
                                }

                                return _context2.abrupt('return', res.status(400).send({ error: { message: 'Find dispute' }, success: false }));

                            case 2:
                                res.send({ data: doc, success: true });

                            case 3:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, _this);
            }));

            return function (_x3, _x4) {
                return _ref2.apply(this, arguments);
            };
        }());
    }
});

/* harmony default export */ __webpack_exports__["default"] = (DisputeController);

/***/ })

};
//# sourceMappingURL=main.bdf10d9bf319aa7fb930.hot-update.js.map
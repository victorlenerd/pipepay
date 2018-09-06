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
/* harmony import */ var _modules_mailer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../modules/mailer */ "./src/api/modules/mailer.js");
/* harmony import */ var _modules_recode__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../modules/recode */ "./src/api/modules/recode.js");
/* harmony import */ var _modules_generateController__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../modules/generateController */ "./src/api/modules/generateController.js");



var _this = undefined;






/* harmony default export */ __webpack_exports__["default"] = (Object(_modules_generateController__WEBPACK_IMPORTED_MODULE_5__["default"])(_invoice_model__WEBPACK_IMPORTED_MODULE_2__["default"], {
    createOne: function createOne(req, res) {
        var body = req.body;
        body.userId = req.user.id;
        body.marchantEmail = req.user.email;
        body.status = "sent";
        body.verifyCode =  false ? undefined : Object(_modules_recode__WEBPACK_IMPORTED_MODULE_4__["default"])();
        body.totalPrice = 200 + body.purchaseAmount + body.deliveryAmount + body.purchaseAmount * 5 / 100;

        _invoice_model__WEBPACK_IMPORTED_MODULE_2__["default"].create(body, function () {
            var _ref = babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(err, doc) {
                return babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!err) {
                                    _context.next = 2;
                                    break;
                                }

                                return _context.abrupt('return', res.status(500).send({ error: { message: 'Could not create the invoice' }, success: false }));

                            case 2:
                                _context.prev = 2;

                                delete doc.verifyCode;
                                _context.next = 6;
                                return _modules_mailer__WEBPACK_IMPORTED_MODULE_3__["sendInvoiceMail"](doc);

                            case 6:
                                _context.next = 11;
                                break;

                            case 8:
                                _context.prev = 8;
                                _context.t0 = _context['catch'](2);
                                return _context.abrupt('return', res.status(500).send({ error: { message: 'Could not send mail' }, success: false }));

                            case 11:

                                res.send({ data: doc, success: true });

                            case 12:
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
    }
}));

/***/ })

};
//# sourceMappingURL=main.58123c49a5b041550144.hot-update.js.map
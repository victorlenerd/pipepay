require("source-map-support").install();
exports.id = "main";
exports.modules = {

/***/ "./src/api/resources/confirm/confirm.route.js":
/*!****************************************************!*\
  !*** ./src/api/resources/confirm/confirm.route.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/regenerator */ "babel-runtime/regenerator");
/* harmony import */ var babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babel-runtime/helpers/asyncToGenerator */ "babel-runtime/helpers/asyncToGenerator");
/* harmony import */ var babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _invoice_invoice_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../invoice/invoice.model */ "./src/api/resources/invoice/invoice.model.js");
/* harmony import */ var _modules_transfer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../modules/transfer */ "./src/api/modules/transfer.js");
/* harmony import */ var _dispute_dispute_controller__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../dispute/dispute.controller */ "./src/api/resources/dispute/dispute.controller.js");



var _this = undefined;






var ConfirmRouter = express__WEBPACK_IMPORTED_MODULE_2___default.a.Router();

ConfirmRouter.param('invoiceId', _dispute_dispute_controller__WEBPACK_IMPORTED_MODULE_5__["default"].getInvoiceId);
ConfirmRouter.route('/:invoiceId').post(function (req, res) {
    var invoiceId = req.params.invoiceId;
    var status = req.body.accepted ? 'accepted' : 'rejected';
    var emailCode = req.body.emailCode;

    if (req.invoice.verifyCode !== emailCode) return res.status(400).send({ success: false, error: new Error('Wrong invoice code') });

    _invoice_invoice_model__WEBPACK_IMPORTED_MODULE_3__["default"].findOneAndUpdate({ _id: invoiceId }, { $set: { status: status } }, { new: true }, function () {
        var _ref = babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(error, data) {
            return babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            if (error) res.status(400).send({ success: false, error: error });

                            if (!(status === "accepted")) {
                                _context.next = 10;
                                break;
                            }

                            _context.prev = 2;
                            _context.next = 5;
                            return Object(_modules_transfer__WEBPACK_IMPORTED_MODULE_4__["default"])(data['marchantName'], data['marchantAccountNumber'], data['marchantBankCode'], data['purchaseAmount'] * 100);

                        case 5:
                            _context.next = 10;
                            break;

                        case 7:
                            _context.prev = 7;
                            _context.t0 = _context['catch'](2);

                            res.status(400).send({ success: false, err: _context.t0 });

                        case 10:

                            res.status(200).send({ success: true, data: data });

                        case 11:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this, [[2, 7]]);
        }));

        return function (_x, _x2) {
            return _ref.apply(this, arguments);
        };
    }());
});

/* harmony default export */ __webpack_exports__["default"] = (ConfirmRouter);

/***/ })

};
//# sourceMappingURL=main.8090abf554b3ef1ac22b.hot-update.js.map
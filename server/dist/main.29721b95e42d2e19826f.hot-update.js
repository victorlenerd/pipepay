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
/* harmony import */ var babel_runtime_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babel-runtime/core-js/json/stringify */ "babel-runtime/core-js/json/stringify");
/* harmony import */ var babel_runtime_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! crypto */ "crypto");
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _payment_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./payment.model */ "./src/api/resources/payment/payment.model.js");
/* harmony import */ var _invoice_invoice_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../invoice/invoice.model */ "./src/api/resources/invoice/invoice.model.js");
/* harmony import */ var _modules_mailer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../modules/mailer */ "./src/api/modules/mailer.js");
/* harmony import */ var _modules_generateController__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../modules/generateController */ "./src/api/modules/generateController.js");
/* harmony import */ var _modules_transfer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../modules/transfer */ "./src/api/modules/transfer.js");









var secret = "sk_test_ef208dee35b39342cf35bf961ec6cb19ebc2f94c";

/* harmony default export */ __webpack_exports__["default"] = (Object(_modules_generateController__WEBPACK_IMPORTED_MODULE_6__["default"])(_payment_model__WEBPACK_IMPORTED_MODULE_3__["default"], {
    createOne: function createOne(req, res) {
        var hash = crypto__WEBPACK_IMPORTED_MODULE_2___default.a.createHmac('sha512', secret).update(babel_runtime_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_1___default()(req.body)).digest('hex');
        var _req$body = req.body,
            event = _req$body.event,
            _req$body$data = _req$body.data,
            reference = _req$body$data.reference,
            amount = _req$body$data.amount,
            paid = _req$body$data.paid,
            invoice_code = _req$body$data.invoice_code,
            _req$body$data$custom = _req$body$data.customer,
            first_name = _req$body$data$custom.first_name,
            last_name = _req$body$data$custom.last_name,
            email = _req$body$data$custom.email;


        if (hash === req.headers['x-paystack-signature'] && event === 'invoice.update' && paid) {

            _payment_model__WEBPACK_IMPORTED_MODULE_3__["default"].create({ customerEmail: email, reference: reference, amount: amount, invoiceId: invoice_code }, function (err) {
                if (err) return res.status(400).send({ error: new Error(error), status: false });
            });
        } else {
            res.status(400).send({ success: false });
        }
    },
    getOne: function getOne(req, res) {
        var id = req.params.invoiceId;
        _payment_model__WEBPACK_IMPORTED_MODULE_3__["default"].findOne({ invoiceId: id }, function (err, doc) {
            if (err) res.status(401).send({ success: false, error: babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, err) });
            res.status(200).send({ success: true, data: doc });
        });
    }
}));

/***/ })

};
//# sourceMappingURL=main.29721b95e42d2e19826f.hot-update.js.map
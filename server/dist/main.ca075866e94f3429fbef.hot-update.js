require("source-map-support").install();
exports.id = "main";
exports.modules = {

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
    marchantEmail: String,
    verifyCode: String,
    status: String
});

/* harmony default export */ __webpack_exports__["default"] = (mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.model('Invoice', InvoiceSchema));

/***/ })

};
//# sourceMappingURL=main.ca075866e94f3429fbef.hot-update.js.map
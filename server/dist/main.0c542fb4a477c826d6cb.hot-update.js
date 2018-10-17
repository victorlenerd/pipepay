require("source-map-support").install();
exports.id = "main";
exports.modules = {

/***/ "./src/api/resources/invoice/invoice.route.js":
/*!****************************************************!*\
  !*** ./src/api/resources/invoice/invoice.route.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _invoice_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./invoice.controller */ "./src/api/resources/invoice/invoice.controller.js");



var InvoiceRouter = express__WEBPACK_IMPORTED_MODULE_0___default.a.Router();

InvoiceRouter.param('id', _invoice_controller__WEBPACK_IMPORTED_MODULE_1__["default"].findByParam);

InvoiceRouter.route('/').get(function (req, res, next) {}).post(_invoice_controller__WEBPACK_IMPORTED_MODULE_1__["default"].createOne);

InvoiceRouter.route('/:id').get(_invoice_controller__WEBPACK_IMPORTED_MODULE_1__["default"].getOne).delete(_invoice_controller__WEBPACK_IMPORTED_MODULE_1__["default"].deleteOne);

/* harmony default export */ __webpack_exports__["default"] = (InvoiceRouter);

/***/ })

};
//# sourceMappingURL=main.0c542fb4a477c826d6cb.hot-update.js.map
require("source-map-support").install();
exports.id = "main";
exports.modules = {

/***/ "./src/api/resources/dispute/dispute.model.js":
/*!****************************************************!*\
  !*** ./src/api/resources/dispute/dispute.model.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ "mongoose");
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);


var DisputeSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.Schema({
    customerEmail: String,
    marchantEmail: String,
    from: String,
    reason: String,
    category: String,
    invoiceId: { type: String, unique: true },
    status: String
});

/* harmony default export */ __webpack_exports__["default"] = (mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.model('Dispute', DisputeSchema));

/***/ })

};
//# sourceMappingURL=main.81138aeddef924bbc4e9.hot-update.js.map
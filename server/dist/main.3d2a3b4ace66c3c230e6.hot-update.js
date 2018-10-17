require("source-map-support").install();
exports.id = "main";
exports.modules = {

/***/ "./src/api/resources/invoice/invoice.model.js":
/*!****************************************************!*\
  !*** ./src/api/resources/invoice/invoice.model.js ***!
  \****************************************************/
/*! exports provided: MilestoneSchema, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MilestoneSchema", function() { return MilestoneSchema; });
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ "mongoose");
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);


var MilestoneSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.Schema({
    amount: { type: Number, required: true },
    description: { type: String, required: true },
    dueDate: { type: Date },
    paid: { type: Boolean, required: true, default: false }
});

var InvoiceSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.Schema({
    userId: { type: String, required: true },
    type: { type: String, enum: ['service', 'good'], required: true },
    description: { type: String, required: true },

    deliveryAmount: { type: Number, required: true },
    purchaseAmount: { type: Number, required: true },
    pipePayFee: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    bankCharges: { type: Number, required: true },

    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    customerPhone: { type: String, required: true },

    marchantName: { type: String, required: true },
    marchantAccountNumber: { type: String, required: true },
    marchantBankCode: { type: String, required: true },
    marchantEmail: { type: String, required: true },

    milestones: [MilestoneSchema],

    invoice_code: { type: String, unique: true },
    verifyCode: { type: String, unique: true },

    whoPaysPipepayFee: { type: String, enum: ['buyer', 'seller', 'both'] },
    whoPaysDeliveryFee: { type: String, enum: ['buyer', 'seller', 'both'] },

    status: String
});

/* harmony default export */ __webpack_exports__["default"] = (mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.model('Invoice', InvoiceSchema));

/***/ })

};
//# sourceMappingURL=main.3d2a3b4ace66c3c230e6.hot-update.js.map
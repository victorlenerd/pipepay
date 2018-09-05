require("source-map-support").install();
exports.id = "main";
exports.modules = {

/***/ "./src/server.js":
/*!***********************!*\
  !*** ./src/server.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _middleware__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./middleware */ "./src/middleware.js");
/* harmony import */ var _api_resources__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./api/resources */ "./src/api/resources/index.js");
/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./db */ "./src/db.js");
/* harmony import */ var _api_modules_auth__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./api/modules/auth */ "./src/api/modules/auth.js");






var app = express__WEBPACK_IMPORTED_MODULE_0___default()();

Object(_api_modules_auth__WEBPACK_IMPORTED_MODULE_4__["getJWT"])();
Object(_middleware__WEBPACK_IMPORTED_MODULE_1__["default"])(app);
Object(_db__WEBPACK_IMPORTED_MODULE_3__["connect"])().catch(function (err) {
    console.error('DB error', err);
});

app.use('/api', _api_resources__WEBPACK_IMPORTED_MODULE_2__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (app);

/***/ })

};
//# sourceMappingURL=main.69624d5d2c583ca3c2d2.hot-update.js.map
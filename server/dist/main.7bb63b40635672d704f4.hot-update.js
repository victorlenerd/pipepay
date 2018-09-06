require("source-map-support").install();
exports.id = "main";
exports.modules = {

/***/ "./src/api/modules/recode.js":
/*!***********************************!*\
  !*** ./src/api/modules/recode.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var randomAlpha = function randomAlpha() {
    return 'abcdefghijklmnopqrstuvwxyz'.charAt(Math.floor(Math.random() * alpha.length));
};
var randomNum = function randomNum() {
    return Math.floor(Math.random() * 9);
};

/* harmony default export */ __webpack_exports__["default"] = (function () {
    return '' + randomAlpha() + randomNum() + randomAlpha() + randomNum() + randomAlpha() + randomNum();
});

/***/ })

};
//# sourceMappingURL=main.7bb63b40635672d704f4.hot-update.js.map
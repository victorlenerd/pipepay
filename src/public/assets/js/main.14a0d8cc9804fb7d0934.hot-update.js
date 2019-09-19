webpackHotUpdate("main",{

/***/ "./src/public/js/pages/newinvoice/summary.tsx":
/*!****************************************************!*\
  !*** ./src/public/js/pages/newinvoice/summary.tsx ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n(function () {\n  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;\n  enterModule && enterModule(module);\n})();\n\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal[\"default\"].signature : function (a) {\n  return a;\n};\n\n\n\nvar Summary = function Summary(_ref) {\n  var type = _ref.type,\n      data = _ref.data,\n      customerInfo = _ref.customerInfo,\n      back = _ref.back,\n      submit = _ref.submit;\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h2\", {\n    className: \"section-title\"\n  }, \"Summary\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"col-lg-8 col-md-8 col-lg-offset-2 col-md-offset-2 col-sm-12 col-xs-12\"\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"col-lg-6 col-md-6 col-sm-6 col-xs-12\"\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h3\", null, \"Customer Info\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"br\", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\", null, \"Name:\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h4\", null, customerInfo.customerName)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\", null, \"Email:\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h4\", null, customerInfo.customerEmail)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\", null, \"Phone:\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h4\", null, customerInfo.customerPhone))), type === \"good\" ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"col-lg-6 col-md-6 col-sm-6 col-xs-12\"\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h3\", null, \"Purchase Info\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"br\", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\", null, \"Price Of Good:\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h4\", null, data.purchase_amount)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\", null, \"Delivery Fee:\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h4\", null, data.delivery_fee)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\", null, \"Who Pays Delivery Fee\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h4\", null, data.whoPaysDeliveryFee)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\", null, \"Who Pays PipePay Fee\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h4\", null, data.whoPaysPipepayFee))) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"col-lg-6 col-md-6 col-sm-6 col-xs-12\"\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h2\", null, \"Milestones\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"br\", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"col-lg-12 col-md-12 col-sm-12 col-xs-12\"\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"col-lg-4 col-md-4 col-sm-4 col-xs-4\"\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\", null, \"Amount\")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"col-lg-4 col-md-4 col-sm-4 col-xs-4\"\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\", null, \"Description\")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"col-lg-4 col-md-4 col-sm-4 col-xs-4\"\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\", null, \"Due Date\"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"br\", null), \"// @ts-ignore:\", data.milestones.map(function (_ref2, i) {\n    var amount = _ref2.amount,\n        description = _ref2.description,\n        dueDate = _ref2.dueDate;\n    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      key: i,\n      className: \"col-lg-12 col-md-12 col-sm-12 col-xs-12 border-line-bottom\"\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"col-lg-4 col-md-4 col-sm-4 col-xs-4 \"\n    }, amount), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"col-lg-4 col-md-4 col-sm-4 col-xs-4\"\n    }, description), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"col-lg-4 col-md-4 col-sm-4 col-xs-4\"\n    }, dueDate));\n  }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"clearfix\"\n  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"br\", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"br\", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"form-buttons\"\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\", {\n    name: \"back-button\",\n    type: \"button\",\n    value: \"BACK\",\n    className: \"text-submit-inverse\",\n    onClick: back\n  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\", {\n    onClick: submit,\n    type: \"submit\",\n    value: \"SEND\",\n    id: \"send\",\n    className: \"text-submit\"\n  })));\n};\n\nvar _default = Summary;\n/* harmony default export */ __webpack_exports__[\"default\"] = (_default);\n;\n\n(function () {\n  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(Summary, \"Summary\", \"/Users/nvictor/pipepay/src/public/js/pages/newinvoice/summary.tsx\");\n  reactHotLoader.register(_default, \"default\", \"/Users/nvictor/pipepay/src/public/js/pages/newinvoice/summary.tsx\");\n})();\n\n;\n\n(function () {\n  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;\n  leaveModule && leaveModule(module);\n})();\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcHVibGljL2pzL3BhZ2VzL25ld2ludm9pY2Uvc3VtbWFyeS50c3guanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvcHVibGljL2pzL3BhZ2VzL25ld2ludm9pY2Uvc3VtbWFyeS50c3g/MmY1OSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5cbnR5cGUgUHJvcHMgPSB7XG5cdHR5cGU6IHN0cmluZyxcblx0Y3VzdG9tZXJJbmZvOiB7XG5cdFx0Y3VzdG9tZXJFbWFpbDogc3RyaW5nLFxuXHRcdGN1c3RvbWVyUGhvbmU6IHN0cmluZyxcblx0XHRjdXN0b21lck5hbWU6IHN0cmluZ1xuXHR9LFxuXHRzdWJtaXQ6ICgpID0+IHZvaWQsXG5cdGJhY2s6ICgpID0+IHZvaWQsXG5cdGRhdGE6IHtcblx0XHRwdXJjaGFzZV9hbW91bnQ6IG51bWJlclxuXHRcdGRlbGl2ZXJ5X2ZlZTogbnVtYmVyXG5cdFx0d2hvUGF5c0RlbGl2ZXJ5RmVlOiBzdHJpbmdcblx0XHR3aG9QYXlzUGlwZXBheUZlZTogc3RyaW5nXG5cdH1cbn07XG5cbmNvbnN0IFN1bW1hcnkgPSAoeyB0eXBlLCBkYXRhLCBjdXN0b21lckluZm8sIGJhY2ssIHN1Ym1pdCB9OiBQcm9wcykgPT4gKFxuXHQ8UmVhY3QuRnJhZ21lbnQ+XG5cdFx0PGgyIGNsYXNzTmFtZT1cInNlY3Rpb24tdGl0bGVcIj5TdW1tYXJ5PC9oMj5cblxuXHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLWxnLTggY29sLW1kLTggY29sLWxnLW9mZnNldC0yIGNvbC1tZC1vZmZzZXQtMiBjb2wtc20tMTIgY29sLXhzLTEyXCI+XG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC1sZy02IGNvbC1tZC02IGNvbC1zbS02IGNvbC14cy0xMlwiPlxuXHRcdFx0XHQ8aDM+Q3VzdG9tZXIgSW5mbzwvaDM+XG5cdFx0XHRcdDxiciAvPlxuXHRcdFx0XHQ8ZGl2PlxuXHRcdFx0XHRcdDxsYWJlbD5OYW1lOjwvbGFiZWw+XG5cdFx0XHRcdFx0PGg0PntjdXN0b21lckluZm8uY3VzdG9tZXJOYW1lfTwvaDQ+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2PlxuXHRcdFx0XHRcdDxsYWJlbD5FbWFpbDo8L2xhYmVsPlxuXHRcdFx0XHRcdDxoND57Y3VzdG9tZXJJbmZvLmN1c3RvbWVyRW1haWx9PC9oND5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxkaXY+XG5cdFx0XHRcdFx0PGxhYmVsPlBob25lOjwvbGFiZWw+XG5cdFx0XHRcdFx0PGg0PntjdXN0b21lckluZm8uY3VzdG9tZXJQaG9uZX08L2g0PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdFx0e3R5cGUgPT09IFwiZ29vZFwiID8gKFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC1sZy02IGNvbC1tZC02IGNvbC1zbS02IGNvbC14cy0xMlwiPlxuXHRcdFx0XHRcdDxoMz5QdXJjaGFzZSBJbmZvPC9oMz5cblx0XHRcdFx0XHQ8YnIgLz5cblx0XHRcdFx0XHQ8ZGl2PlxuXHRcdFx0XHRcdFx0PGxhYmVsPlByaWNlIE9mIEdvb2Q6PC9sYWJlbD5cblx0XHRcdFx0XHRcdDxoND57ZGF0YS5wdXJjaGFzZV9hbW91bnR9PC9oND5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQ8ZGl2PlxuXHRcdFx0XHRcdFx0PGxhYmVsPkRlbGl2ZXJ5IEZlZTo8L2xhYmVsPlxuXHRcdFx0XHRcdFx0PGg0PntkYXRhLmRlbGl2ZXJ5X2ZlZX08L2g0PlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDxkaXY+XG5cdFx0XHRcdFx0XHQ8bGFiZWw+V2hvIFBheXMgRGVsaXZlcnkgRmVlPC9sYWJlbD5cblx0XHRcdFx0XHRcdDxoND57ZGF0YS53aG9QYXlzRGVsaXZlcnlGZWV9PC9oND5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQ8ZGl2PlxuXHRcdFx0XHRcdFx0PGxhYmVsPldobyBQYXlzIFBpcGVQYXkgRmVlPC9sYWJlbD5cblx0XHRcdFx0XHRcdDxoND57ZGF0YS53aG9QYXlzUGlwZXBheUZlZX08L2g0PlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdCkgOiAoXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLWxnLTYgY29sLW1kLTYgY29sLXNtLTYgY29sLXhzLTEyXCI+XG5cdFx0XHRcdFx0PGgyPk1pbGVzdG9uZXM8L2gyPlxuXHRcdFx0XHRcdDxiciAvPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLWxnLTEyIGNvbC1tZC0xMiBjb2wtc20tMTIgY29sLXhzLTEyXCI+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC1sZy00IGNvbC1tZC00IGNvbC1zbS00IGNvbC14cy00XCI+XG5cdFx0XHRcdFx0XHRcdDxsYWJlbD5BbW91bnQ8L2xhYmVsPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC1sZy00IGNvbC1tZC00IGNvbC1zbS00IGNvbC14cy00XCI+XG5cdFx0XHRcdFx0XHRcdDxsYWJlbD5EZXNjcmlwdGlvbjwvbGFiZWw+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLWxnLTQgY29sLW1kLTQgY29sLXNtLTQgY29sLXhzLTRcIj5cblx0XHRcdFx0XHRcdFx0PGxhYmVsPkR1ZSBEYXRlPC9sYWJlbD5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDxiciAvPlxuXHRcdFx0XHRcdC8vIEB0cy1pZ25vcmU6XG5cdFx0XHRcdFx0e2RhdGEubWlsZXN0b25lcy5tYXAoKHsgYW1vdW50LCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSB9LCBpKSA9PiAoXG5cdFx0XHRcdFx0XHQ8ZGl2XG5cdFx0XHRcdFx0XHRcdGtleT17aX1cblx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lPVwiY29sLWxnLTEyIGNvbC1tZC0xMiBjb2wtc20tMTIgY29sLXhzLTEyIGJvcmRlci1saW5lLWJvdHRvbVwiXG5cdFx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLWxnLTQgY29sLW1kLTQgY29sLXNtLTQgY29sLXhzLTQgXCI+XG5cdFx0XHRcdFx0XHRcdFx0e2Ftb3VudH1cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLWxnLTQgY29sLW1kLTQgY29sLXNtLTQgY29sLXhzLTRcIj5cblx0XHRcdFx0XHRcdFx0XHR7ZGVzY3JpcHRpb259XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC1sZy00IGNvbC1tZC00IGNvbC1zbS00IGNvbC14cy00XCI+XG5cdFx0XHRcdFx0XHRcdFx0e2R1ZURhdGV9XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0KSl9XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0KX1cblx0XHQ8L2Rpdj5cblx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNsZWFyZml4XCIgLz5cblx0XHQ8YnIgLz5cblx0XHQ8YnIgLz5cblx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm0tYnV0dG9uc1wiPlxuXHRcdFx0PGlucHV0XG5cdFx0XHRcdG5hbWU9XCJiYWNrLWJ1dHRvblwiXG5cdFx0XHRcdHR5cGU9XCJidXR0b25cIlxuXHRcdFx0XHR2YWx1ZT1cIkJBQ0tcIlxuXHRcdFx0XHRjbGFzc05hbWU9XCJ0ZXh0LXN1Ym1pdC1pbnZlcnNlXCJcblx0XHRcdFx0b25DbGljaz17YmFja31cblx0XHRcdC8+XG5cdFx0XHQ8aW5wdXRcblx0XHRcdFx0b25DbGljaz17c3VibWl0fVxuXHRcdFx0XHR0eXBlPVwic3VibWl0XCJcblx0XHRcdFx0dmFsdWU9XCJTRU5EXCJcblx0XHRcdFx0aWQ9XCJzZW5kXCJcblx0XHRcdFx0Y2xhc3NOYW1lPVwidGV4dC1zdWJtaXRcIlxuXHRcdFx0Lz5cblx0XHQ8L2Rpdj5cblx0PC9SZWFjdC5GcmFnbWVudD5cbik7XG5cbmV4cG9ydCBkZWZhdWx0IFN1bW1hcnk7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFrQkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUFBO0FBRUE7QUFBQTtBQUNBO0FBQUE7QUFpQkE7QUFBQTtBQXFCQTtBQUFBO0FBR0E7QUFBQTtBQUNBO0FBQUE7QUFHQTtBQUFBO0FBR0E7QUFBQTtBQU1BO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFDQTtBQUZBO0FBSUE7QUFBQTtBQUdBO0FBQUE7QUFHQTtBQUFBO0FBWEE7QUFtQkE7QUFBQTtBQUdBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUF6RkE7QUFDQTtBQW1HQTtBQUFBOzs7Ozs7Ozs7O0FBcEdBOzs7Ozs7Ozs7O0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/public/js/pages/newinvoice/summary.tsx\n");

/***/ })

})
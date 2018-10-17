require("source-map-support").install();
exports.id = "main";
exports.modules = {

/***/ "./src/api/modules/mailer.js":
/*!***********************************!*\
  !*** ./src/api/modules/mailer.js ***!
  \***********************************/
/*! exports provided: sendInvoiceMail, sendReceiptMail, sendTransferMail, sendDisputeMail, sendCustormerVerificationCode, sendPaymentRequest */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sendInvoiceMail", function() { return sendInvoiceMail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sendReceiptMail", function() { return sendReceiptMail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sendTransferMail", function() { return sendTransferMail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sendDisputeMail", function() { return sendDisputeMail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sendCustormerVerificationCode", function() { return sendCustormerVerificationCode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sendPaymentRequest", function() { return sendPaymentRequest; });
/* harmony import */ var babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-runtime/regenerator */ "babel-runtime/regenerator");
/* harmony import */ var babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babel-runtime/helpers/extends */ "babel-runtime/helpers/extends");
/* harmony import */ var babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! babel-runtime/helpers/asyncToGenerator */ "babel-runtime/helpers/asyncToGenerator");
/* harmony import */ var babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! babel-runtime/core-js/promise */ "babel-runtime/core-js/promise");
/* harmony import */ var babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var nodemailer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! nodemailer */ "nodemailer");
/* harmony import */ var nodemailer__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(nodemailer__WEBPACK_IMPORTED_MODULE_4__);





var _this = undefined;



var ZOHO_EMAIL = "hello@pipepay.africa";
var ZOHO_PASSWORD = "G4eHR8WfEPCz";

var transporter = nodemailer__WEBPACK_IMPORTED_MODULE_4___default.a.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: {
        user: ZOHO_EMAIL,
        pass: ZOHO_PASSWORD
    }
});

var from = 'Pipepay <hello@pipepay.africa>';

var sendInvoiceMail = function sendInvoiceMail(_ref) {
    var customerEmail = _ref.customerEmail,
        totalPrice = _ref.totalPrice;
    return new babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_3___default.a(function (resolve, reject) {
        var mailOptions = {
            from: from,
            to: customerEmail,
            subject: 'Your Invoice Is Ready',
            text: 'Your invoice is worth ' + totalPrice
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return reject(new Error(error));
            }

            resolve(info);
        });
    });
};

var sendTo = function sendTo(mailOption) {
    return new babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_3___default.a(function (resolve, reject) {
        console.log("sendTo");
        transporter.sendMail(mailOption, function (error, info) {
            if (error) {
                console.log("error", error);
                return reject(new Error(error));
            }
            console.log("sentTo");
            resolve(info);
        });
    });
};

var sendReceiptMail = function sendReceiptMail(customerName, customerEmail, marchantEmail, amount) {
    return new babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_3___default.a(function () {
        var _ref2 = babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(resolve, reject) {
            var mailOption;
            return babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            mailOption = {
                                from: from,
                                subject: 'Your Receipt Is Ready',
                                text: customerName + ' made payment of ' + amount
                            };


                            console.log({ customerName: customerName, customerEmail: customerEmail, marchantEmail: marchantEmail, amount: amount });
                            console.log('sending mails...');
                            babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_3___default.a.all([sendTo(babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({}, mailOption, { to: customerEmail })), sendTo(babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({}, mailOption, { to: marchantEmail }))]).then(resolve).catch(reject);

                        case 4:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this);
        }));

        return function (_x, _x2) {
            return _ref2.apply(this, arguments);
        };
    }());
};

var sendTransferMail = function sendTransferMail(customerEmail, marchantEmail) {
    return new babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_3___default.a(function (esolve, reject) {});
};

var sendDisputeMail = function sendDisputeMail(marchantEmail, customerEmail, customerName, reason, disputeFrom) {
    var supportEmail = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 'hello@pipepay.africa';
    return new babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_3___default.a(function () {
        var _ref3 = babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(resolve, reject) {
            var mailOption;
            return babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            mailOption = {
                                from: from,
                                subject: 'Payment Dispute'
                            };
                            _context2.prev = 1;

                            if (!(disputeFrom !== 'marchant')) {
                                _context2.next = 7;
                                break;
                            }

                            _context2.next = 5;
                            return babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_3___default.a.all([sendTo(babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({}, mailOption, { to: customerEmail, text: 'Your dispute has been received, you will hear from our support rep soon.' })), sendTo(babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({}, mailOption, { to: marchantEmail, text: 'New dispute from ' + customerName + ' reason being that: "' + reason + '"' })), sendTo(babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({}, mailOption, { to: supportEmail, text: 'New dispute from ' + customerEmail + ' reason being that: "' + reason + '" marchant email is ' + marchantEmail }))]);

                        case 5:
                            _context2.next = 9;
                            break;

                        case 7:
                            _context2.next = 9;
                            return babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_3___default.a.all([sendTo(babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({}, mailOption, { to: customerEmail, text: 'Your dispute has been received, you will hear from our support rep soon.' })), sendTo(babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({}, mailOption, { to: marchantEmail, text: 'New dispute from ' + customerName + ' reason being that: "' + reason + '"' })), sendTo(babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({}, mailOption, { to: supportEmail, text: 'New dispute from ' + marchantEmail + ' reason being that: "' + reason + '" customer email is ' + customerEmail }))]);

                        case 9:
                            resolve();
                            _context2.next = 15;
                            break;

                        case 12:
                            _context2.prev = 12;
                            _context2.t0 = _context2['catch'](1);

                            reject(_context2.t0);

                        case 15:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, _this, [[1, 12]]);
        }));

        return function (_x4, _x5) {
            return _ref3.apply(this, arguments);
        };
    }());
};

var sendCustormerVerificationCode = function sendCustormerVerificationCode(customerEmail, code) {
    return new babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_3___default.a(function () {
        var _ref4 = babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3(resolve, reject) {
            var mailOption;
            return babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            mailOption = {
                                from: from,
                                subject: 'Invoice Mail Verification',
                                text: 'Your invoice verfication code is ' + code
                            };
                            _context3.prev = 1;
                            _context3.next = 4;
                            return sendTo(babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({}, mailOption, { to: customerEmail }));

                        case 4:
                            resolve();
                            _context3.next = 10;
                            break;

                        case 7:
                            _context3.prev = 7;
                            _context3.t0 = _context3['catch'](1);

                            reject(_context3.t0);

                        case 10:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, _this, [[1, 7]]);
        }));

        return function (_x6, _x7) {
            return _ref4.apply(this, arguments);
        };
    }());
};

var sendPaymentRequest = function sendPaymentRequest(_ref5, customerEmail, marchantName) {
    var amount = _ref5.amount,
        name = _ref5.name;
    return new babel_runtime_core_js_promise__WEBPACK_IMPORTED_MODULE_3___default.a(function () {
        var _ref6 = babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee4(resolve, reject) {
            var mailOption;
            return babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            mailOption = {
                                from: from,
                                subject: 'Payment Request',
                                text: marchantName + ' is requesting for payment for milestone "' + name + '"'
                            };
                            _context4.prev = 1;
                            _context4.next = 4;
                            return sendTo(babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({}, mailOption, { to: customerEmail }));

                        case 4:
                            resolve();
                            _context4.next = 11;
                            break;

                        case 7:
                            _context4.prev = 7;
                            _context4.t0 = _context4['catch'](1);

                            console.log('err', _context4.t0);
                            reject(_context4.t0);

                        case 11:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, _this, [[1, 7]]);
        }));

        return function (_x8, _x9) {
            return _ref6.apply(this, arguments);
        };
    }());
};

/***/ })

};
//# sourceMappingURL=main.a603929c552805760c90.hot-update.js.map
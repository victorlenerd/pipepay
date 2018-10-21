(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./src/public/js/pages/signin/index.js":
/*!*********************************************!*\
  !*** ./src/public/js/pages/signin/index.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _utils_auth__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../utils/auth */ "./src/public/js/utils/auth.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var nprogress__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! nprogress */ "./node_modules/nprogress/nprogress.js");
/* harmony import */ var nprogress__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(nprogress__WEBPACK_IMPORTED_MODULE_10__);







//@flow



 // type Props = {
// 	history: any,
// 	setCurrentUser?: any,
// };
// type State = {
// 	error: string,
// };

var SignIn =
/*#__PURE__*/
function (_React$PureComponent) {
  Object(_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_6__["default"])(SignIn, _React$PureComponent);

  function SignIn() {
    var _getPrototypeOf2;

    var _temp, _this;

    Object(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_2__["default"])(this, SignIn);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return Object(_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__["default"])(_this, (_temp = _this = Object(_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__["default"])(this, (_getPrototypeOf2 = Object(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(SignIn)).call.apply(_getPrototypeOf2, [this].concat(args))), _this.state = {
      error: ""
    }, _this.submit =
    /*#__PURE__*/
    function () {
      var _ref = Object(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(e) {
        var _this$props, setCurrentUser, history, email, password, username, cognitoUser;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this$props = _this.props, setCurrentUser = _this$props.setCurrentUser, history = _this$props.history;
                e.preventDefault();

                if (!(_this.formEl.checkValidity() === true)) {
                  _context.next = 22;
                  break;
                }

                email = e.target.email.value;
                password = e.target.password.value;
                username = email.split("@")[0];
                _context.prev = 6;
                nprogress__WEBPACK_IMPORTED_MODULE_10___default.a.start();
                _context.next = 10;
                return Object(_utils_auth__WEBPACK_IMPORTED_MODULE_8__["signin"])(username, password);

              case 10:
                cognitoUser = _utils_auth__WEBPACK_IMPORTED_MODULE_8__["userPool"].getCurrentUser();
                cognitoUser.getSession(function (err, result) {
                  if (result && result.isValid()) {
                    nprogress__WEBPACK_IMPORTED_MODULE_10___default.a.done();
                    var idToken = result.idToken;
                    var payload = idToken.payload,
                        jwtToken = idToken.jwtToken;
                    payload.token = jwtToken;
                    setCurrentUser(payload);

                    if (payload["custom:account_number"] && payload["custom:bank_code"]) {
                      history.push("/invoices");
                    } else {
                      history.push("/verifyaccn");
                    }

                    return;
                  }

                  _this.setState({
                    error: err.message
                  });
                });
                _context.next = 20;
                break;

              case 14:
                _context.prev = 14;
                _context.t0 = _context["catch"](6);
                nprogress__WEBPACK_IMPORTED_MODULE_10___default.a.done();

                if (!(_context.t0.code === "UserNotConfirmedException")) {
                  _context.next = 19;
                  break;
                }

                return _context.abrupt("return", history.push("/verifyemail", {
                  username: username,
                  password: password
                }));

              case 19:
                _this.setState({
                  error: _context.t0.message
                });

              case 20:
                _context.next = 23;
                break;

              case 22:
                _this.setState({
                  error: "Please fill all the required fields."
                });

              case 23:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[6, 14]]);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }(), _temp));
  }

  Object(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3__["default"])(SignIn, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_7___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: "col-lg-6 col-md-6 col-sm-12 col-xs-1 cloths-bg",
        id: "noPad"
      }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: "overlay"
      })), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: "col-lg-6 col-md-6 col-sm-12 col-xs-12 left-from-content"
      }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: "container-main"
      }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: "header"
      }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("h1", null, "Sign In.")), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: "form"
      }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("form", {
        ref: function ref(e) {
          return _this2.formEl = e;
        },
        name: "reg-form",
        onSubmit: this.submit
      }, this.state.error !== null && react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: "form-error"
      }, this.state.error), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("label", {
        htmlFor: "email"
      }, "Email"), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("input", {
        type: "email",
        name: "email",
        placeholder: "",
        className: "text-input",
        required: true
      }), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("label", {
        htmlFor: "password"
      }, "Password"), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("input", {
        type: "password",
        name: "password",
        placeholder: "",
        className: "text-input",
        required: true
      }), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_9__["Link"], {
        to: "forgotpassword",
        id: "forgot"
      }, "Forgot Password?"), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("input", {
        type: "submit",
        name: "sign-in",
        value: "SIGN IN",
        className: "text-submit"
      }), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        id: "have-account"
      }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_9__["Link"], {
        className: "text-centr",
        to: "signup"
      }, "I haven't created an account")))))));
    }
  }]);

  return SignIn;
}(react__WEBPACK_IMPORTED_MODULE_7___default.a.PureComponent);

/* harmony default export */ __webpack_exports__["default"] = (Object(react_router_dom__WEBPACK_IMPORTED_MODULE_9__["withRouter"])(SignIn));

/***/ })

}]);
//# sourceMappingURL=0.bundle.js.map
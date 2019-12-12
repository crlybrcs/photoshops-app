webpackHotUpdate("main",{

/***/ "./src/components/Product.js":
/*!***********************************!*\
  !*** ./src/components/Product.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _images_starYellow_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../images/starYellow.png */ "./src/images/starYellow.png");
/* harmony import */ var _images_starYellow_png__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_images_starYellow_png__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _images_starBlack_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../images/starBlack.png */ "./src/images/starBlack.png");
/* harmony import */ var _images_starBlack_png__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_images_starBlack_png__WEBPACK_IMPORTED_MODULE_2__);
var _jsxFileName = "/Users/kylechorley/Coding/ironHack/finalProject/photoshops-app/client/src/components/Product.js";




const Product = props => {
  const post = props.post,
        clickHandle = props.clickHandle,
        user = props.user,
        favorites = props.favorites,
        url = props.url;
  console.log(props);
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    key: post.product_id,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    onClick: () => clickHandle(post),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    },
    __self: undefined
  }, user ? favorites.includes(post.product_id) === false ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    src: _images_starBlack_png__WEBPACK_IMPORTED_MODULE_2___default.a,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    },
    __self: undefined
  }) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    src: _images_starYellow_png__WEBPACK_IMPORTED_MODULE_1___default.a,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    },
    __self: undefined
  }) : null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: url + post.product_id,
    target: "_blank",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    src: post.image,
    alt: "product pic",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    },
    __self: undefined
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    },
    __self: undefined
  }, post.title))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25
    },
    __self: undefined
  }, "--- $", Number(post.price / 100).toFixed(2), " --- Star Rating: ", post.stars, " ", "--- Number of Reviews: ", post.num_reviews, " ---", post.product_id, " ---"));
};

/* harmony default export */ __webpack_exports__["default"] = (Product);

/***/ })

})
//# sourceMappingURL=main.22637be17fdbb38464b4.hot-update.js.map
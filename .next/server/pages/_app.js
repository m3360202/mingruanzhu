/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "__barrel_optimize__?names=CircularProgress!=!./node_modules/@mui/material/index.js":
/*!******************************************************************************************!*\
  !*** __barrel_optimize__?names=CircularProgress!=!./node_modules/@mui/material/index.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CircularProgress: () => (/* reexport default from dynamic */ _CircularProgress__WEBPACK_IMPORTED_MODULE_0___default.a)
/* harmony export */ });
/* harmony import */ var _CircularProgress__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CircularProgress */ "./node_modules/@mui/material/node/CircularProgress/index.js");
/* harmony import */ var _CircularProgress__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_CircularProgress__WEBPACK_IMPORTED_MODULE_0__);



/***/ }),

/***/ "./pages/_app.tsx":
/*!************************!*\
  !*** ./pages/_app.tsx ***!
  \************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @emotion/react */ \"@emotion/react\");\n/* harmony import */ var _barrel_optimize_names_CircularProgress_mui_material__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! __barrel_optimize__?names=CircularProgress!=!@mui/material */ \"__barrel_optimize__?names=CircularProgress!=!./node_modules/@mui/material/index.js\");\n/* harmony import */ var _mui_material_CssBaseline__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mui/material/CssBaseline */ \"@mui/material/CssBaseline\");\n/* harmony import */ var _mui_material_CssBaseline__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mui_material_CssBaseline__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/material/styles */ \"@mui/material/styles\");\n/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mui_material_styles__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _sentry_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @sentry/react */ \"@sentry/react\");\n/* harmony import */ var _sentry_react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_sentry_react__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! next/head */ \"next/head\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var next_script__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! next/script */ \"./node_modules/next/script.js\");\n/* harmony import */ var next_script__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_script__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var _clients_EmotionCache__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @/clients/EmotionCache */ \"./src/clients/EmotionCache.ts\");\n/* harmony import */ var _hooks_useUser_context__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @/hooks/useUser/context */ \"./src/hooks/useUser/context.tsx\");\n/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @/theme */ \"./src/theme.ts\");\n/* harmony import */ var _styles_global_css__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @/styles/global.css */ \"./src/styles/global.css\");\n/* harmony import */ var _styles_global_css__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_styles_global_css__WEBPACK_IMPORTED_MODULE_12__);\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_emotion_react__WEBPACK_IMPORTED_MODULE_1__, _clients_EmotionCache__WEBPACK_IMPORTED_MODULE_9__]);\n([_emotion_react__WEBPACK_IMPORTED_MODULE_1__, _clients_EmotionCache__WEBPACK_IMPORTED_MODULE_9__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nconst clientSideEmotionCache = (0,_clients_EmotionCache__WEBPACK_IMPORTED_MODULE_9__[\"default\"])();\nfunction MyApp(props) {\n    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_6__.useRouter)();\n    const getLayout = Component.getLayout ?? ((page)=>page);\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_8__.useState)(false);\n    const [user, setUser] = (0,react__WEBPACK_IMPORTED_MODULE_8__.useState)(null);\n    (0,react__WEBPACK_IMPORTED_MODULE_8__.useEffect)(()=>{\n        const handleStart = (url)=>{\n            setLoading(true);\n        };\n        const handleComplete = (url)=>{\n            setLoading(false);\n        };\n        router.events.on(\"routeChangeStart\", handleStart);\n        router.events.on(\"routeChangeComplete\", handleComplete);\n        router.events.on(\"routeChangeError\", handleComplete);\n        return ()=>{\n            router.events.off(\"routeChangeStart\", handleStart);\n            router.events.off(\"routeChangeComplete\", handleComplete);\n            router.events.off(\"routeChangeError\", handleComplete);\n        };\n    }, [\n        router\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_emotion_react__WEBPACK_IMPORTED_MODULE_1__.CacheProvider, {\n        value: emotionCache,\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: `${_theme__WEBPACK_IMPORTED_MODULE_11__.koho.variable} ${_theme__WEBPACK_IMPORTED_MODULE_11__.italiana.variable} font-koho`,\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_head__WEBPACK_IMPORTED_MODULE_5___default()), {\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"meta\", {\n                            name: \"viewport\",\n                            content: \"initial-scale=1, width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no\"\n                        }, void 0, false, {\n                            fileName: \"E:\\\\mingruanzhu\\\\pages\\\\_app.tsx\",\n                            lineNumber: 69,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"link\", {\n                            rel: \"shortcut icon\",\n                            href: \"https://www.stey.com/static/img/icon.png\",\n                            type: \"image/x-icon\"\n                        }, void 0, false, {\n                            fileName: \"E:\\\\mingruanzhu\\\\pages\\\\_app.tsx\",\n                            lineNumber: 73,\n                            columnNumber: 11\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"E:\\\\mingruanzhu\\\\pages\\\\_app.tsx\",\n                    lineNumber: 68,\n                    columnNumber: 9\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_script__WEBPACK_IMPORTED_MODULE_7___default()), {\n                    src: \"https://static.geetest.com/v4/gt4.js\"\n                }, void 0, false, {\n                    fileName: \"E:\\\\mingruanzhu\\\\pages\\\\_app.tsx\",\n                    lineNumber: 79,\n                    columnNumber: 9\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material_styles__WEBPACK_IMPORTED_MODULE_3__.ThemeProvider, {\n                    theme: _theme__WEBPACK_IMPORTED_MODULE_11__[\"default\"],\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_hooks_useUser_context__WEBPACK_IMPORTED_MODULE_10__.UserProvider, {\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((_mui_material_CssBaseline__WEBPACK_IMPORTED_MODULE_2___default()), {}, void 0, false, {\n                                fileName: \"E:\\\\mingruanzhu\\\\pages\\\\_app.tsx\",\n                                lineNumber: 82,\n                                columnNumber: 13\n                            }, this),\n                            loading && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                style: {\n                                    position: \"fixed\",\n                                    top: 0,\n                                    left: 0,\n                                    width: \"100%\",\n                                    height: \"100%\",\n                                    display: \"flex\",\n                                    justifyContent: \"center\",\n                                    alignItems: \"center\",\n                                    backgroundColor: \"rgba(255, 255, 255, 0.7)\",\n                                    zIndex: 9999\n                                },\n                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_CircularProgress_mui_material__WEBPACK_IMPORTED_MODULE_13__.CircularProgress, {}, void 0, false, {\n                                    fileName: \"E:\\\\mingruanzhu\\\\pages\\\\_app.tsx\",\n                                    lineNumber: 98,\n                                    columnNumber: 17\n                                }, this)\n                            }, void 0, false, {\n                                fileName: \"E:\\\\mingruanzhu\\\\pages\\\\_app.tsx\",\n                                lineNumber: 84,\n                                columnNumber: 15\n                            }, this),\n                            getLayout(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                                ...pageProps,\n                                user: user\n                            }, void 0, false, {\n                                fileName: \"E:\\\\mingruanzhu\\\\pages\\\\_app.tsx\",\n                                lineNumber: 101,\n                                columnNumber: 24\n                            }, this))\n                        ]\n                    }, void 0, true, {\n                        fileName: \"E:\\\\mingruanzhu\\\\pages\\\\_app.tsx\",\n                        lineNumber: 81,\n                        columnNumber: 11\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"E:\\\\mingruanzhu\\\\pages\\\\_app.tsx\",\n                    lineNumber: 80,\n                    columnNumber: 9\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"E:\\\\mingruanzhu\\\\pages\\\\_app.tsx\",\n            lineNumber: 67,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"E:\\\\mingruanzhu\\\\pages\\\\_app.tsx\",\n        lineNumber: 66,\n        columnNumber: 5\n    }, this);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_sentry_react__WEBPACK_IMPORTED_MODULE_4__.withProfiler(MyApp));\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRStDO0FBQ0U7QUFDRztBQUNDO0FBQ2I7QUFDWDtBQUNXO0FBQ1A7QUFDVztBQU1ZO0FBQ1U7QUFDbEI7QUFDbkI7QUFjN0IsTUFBTWUseUJBQXlCTCxpRUFBa0JBO0FBRWpELFNBQVNNLE1BQU1DLEtBQXlCO0lBQ3RDLE1BQU0sRUFBRUMsU0FBUyxFQUFFQyxlQUFlSixzQkFBc0IsRUFBRUssU0FBUyxFQUFFLEdBQUdIO0lBQ3hFLE1BQU1JLFNBQVNmLHNEQUFTQTtJQUN4QixNQUFNZ0IsWUFBWUosVUFBVUksU0FBUyxJQUFLLEVBQUNDLE9BQVNBLElBQUc7SUFDdkQsTUFBTSxDQUFDQyxTQUFTQyxXQUFXLEdBQUdoQiwrQ0FBUUEsQ0FBQztJQUV2QyxNQUFNLENBQUNpQixNQUFNQyxRQUFRLEdBQUdsQiwrQ0FBUUEsQ0FBYztJQUc5Q0QsZ0RBQVNBLENBQUM7UUFDUixNQUFNb0IsY0FBYyxDQUFDQztZQUNuQkosV0FBVztRQUNiO1FBRUEsTUFBTUssaUJBQWlCLENBQUNEO1lBQ3RCSixXQUFXO1FBQ2I7UUFFQUosT0FBT1UsTUFBTSxDQUFDQyxFQUFFLENBQUMsb0JBQW9CSjtRQUNyQ1AsT0FBT1UsTUFBTSxDQUFDQyxFQUFFLENBQUMsdUJBQXVCRjtRQUN4Q1QsT0FBT1UsTUFBTSxDQUFDQyxFQUFFLENBQUMsb0JBQW9CRjtRQUVyQyxPQUFPO1lBQ0xULE9BQU9VLE1BQU0sQ0FBQ0UsR0FBRyxDQUFDLG9CQUFvQkw7WUFDdENQLE9BQU9VLE1BQU0sQ0FBQ0UsR0FBRyxDQUFDLHVCQUF1Qkg7WUFDekNULE9BQU9VLE1BQU0sQ0FBQ0UsR0FBRyxDQUFDLG9CQUFvQkg7UUFDeEM7SUFDRixHQUFHO1FBQUNUO0tBQU87SUFFWCxxQkFDRSw4REFBQ3JCLHlEQUFhQTtRQUFDa0MsT0FBT2Y7a0JBQ3BCLDRFQUFDZ0I7WUFBSUMsV0FBVyxDQUFDLEVBQUV2Qix5Q0FBSUEsQ0FBQ3dCLFFBQVEsQ0FBQyxDQUFDLEVBQUV2Qiw2Q0FBUUEsQ0FBQ3VCLFFBQVEsQ0FBQyxVQUFVLENBQUM7OzhCQUMvRCw4REFBQ2hDLGtEQUFJQTs7c0NBQ0gsOERBQUNpQzs0QkFDQ0MsTUFBSzs0QkFDTEMsU0FBUTs7Ozs7O3NDQUVWLDhEQUFDQzs0QkFDQ0MsS0FBSTs0QkFDSkMsTUFBSzs0QkFDTEMsTUFBSzs7Ozs7Ozs7Ozs7OzhCQUdULDhEQUFDckMsb0RBQU1BO29CQUFDc0MsS0FBSTs7Ozs7OzhCQUNaLDhEQUFDMUMsK0RBQWFBO29CQUFDUyxPQUFPQSwrQ0FBS0E7OEJBQ3pCLDRFQUFDRCxpRUFBWUE7OzBDQUNYLDhEQUFDVCxrRUFBV0E7Ozs7OzRCQUNYc0IseUJBQ0MsOERBQUNXO2dDQUNDVyxPQUFPO29DQUNMQyxVQUFVO29DQUNWQyxLQUFLO29DQUNMQyxNQUFNO29DQUNOQyxPQUFPO29DQUNQQyxRQUFRO29DQUNSQyxTQUFTO29DQUNUQyxnQkFBZ0I7b0NBQ2hCQyxZQUFZO29DQUNaQyxpQkFBaUI7b0NBQ2pCQyxRQUFRO2dDQUNWOzBDQUVBLDRFQUFDdkQsbUdBQWdCQTs7Ozs7Ozs7Ozs0QkFHcEJxQix3QkFBVSw4REFBQ0o7Z0NBQVcsR0FBR0UsU0FBUztnQ0FBRU0sTUFBTUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFNdkQ7QUFFQSxpRUFBZXRCLHVEQUFtQixDQUFDWSxNQUFNQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbWluZ3J1YW56aHUvLi9wYWdlcy9fYXBwLnRzeD8yZmJlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgUmVhY3RFbGVtZW50LCBSZWFjdE5vZGUgfSBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IENhY2hlUHJvdmlkZXIgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5pbXBvcnQgeyBDaXJjdWxhclByb2dyZXNzIH0gZnJvbSAnQG11aS9tYXRlcmlhbCc7XG5pbXBvcnQgQ3NzQmFzZWxpbmUgZnJvbSAnQG11aS9tYXRlcmlhbC9Dc3NCYXNlbGluZSc7XG5pbXBvcnQgeyBUaGVtZVByb3ZpZGVyIH0gZnJvbSAnQG11aS9tYXRlcmlhbC9zdHlsZXMnO1xuaW1wb3J0ICogYXMgU2VudHJ5IGZyb20gJ0BzZW50cnkvcmVhY3QnO1xuaW1wb3J0IEhlYWQgZnJvbSAnbmV4dC9oZWFkJztcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gJ25leHQvcm91dGVyJztcbmltcG9ydCBTY3JpcHQgZnJvbSAnbmV4dC9zY3JpcHQnO1xuaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHR5cGUgeyBFbW90aW9uQ2FjaGUgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5pbXBvcnQgdHlwZSB7IE5leHRQYWdlIH0gZnJvbSAnbmV4dCc7XG5pbXBvcnQgdHlwZSB7IEFwcFByb3BzIH0gZnJvbSAnbmV4dC9hcHAnO1xuXG5pbXBvcnQgY3JlYXRlRW1vdGlvbkNhY2hlIGZyb20gJ0AvY2xpZW50cy9FbW90aW9uQ2FjaGUnO1xuaW1wb3J0IHsgVXNlclByb3ZpZGVyLCB0eXBlIFVzZXIgfSBmcm9tIFwiQC9ob29rcy91c2VVc2VyL2NvbnRleHRcIjtcbmltcG9ydCB0aGVtZSwgeyBrb2hvLCBpdGFsaWFuYSB9IGZyb20gXCJAL3RoZW1lXCI7XG5pbXBvcnQgXCJAL3N0eWxlcy9nbG9iYWwuY3NzXCI7XG5cbmV4cG9ydCB0eXBlIE5leHRQYWdlV2l0aExheW91dDxQID0gUmVjb3JkPHN0cmluZywgdW5rbm93bj4sIElQID0gUD4gPSBOZXh0UGFnZTxcbiAgUCxcbiAgSVBcbj4gJiB7XG4gIGdldExheW91dD86IChwYWdlOiBSZWFjdEVsZW1lbnQpID0+IFJlYWN0Tm9kZTtcbn07XG5cbnR5cGUgQXBwUHJvcHNXaXRoTGF5b3V0ID0gQXBwUHJvcHMgJiB7XG4gIENvbXBvbmVudDogTmV4dFBhZ2VXaXRoTGF5b3V0O1xuICBlbW90aW9uQ2FjaGU6IEVtb3Rpb25DYWNoZTtcbn07XG5cbmNvbnN0IGNsaWVudFNpZGVFbW90aW9uQ2FjaGUgPSBjcmVhdGVFbW90aW9uQ2FjaGUoKTtcblxuZnVuY3Rpb24gTXlBcHAocHJvcHM6IEFwcFByb3BzV2l0aExheW91dCkge1xuICBjb25zdCB7IENvbXBvbmVudCwgZW1vdGlvbkNhY2hlID0gY2xpZW50U2lkZUVtb3Rpb25DYWNoZSwgcGFnZVByb3BzIH0gPSBwcm9wcztcbiAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XG4gIGNvbnN0IGdldExheW91dCA9IENvbXBvbmVudC5nZXRMYXlvdXQgPz8gKChwYWdlKSA9PiBwYWdlKTtcbiAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIGNvbnN0IFt1c2VyLCBzZXRVc2VyXSA9IHVzZVN0YXRlPFVzZXIgfCBudWxsPihudWxsKTtcblxuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgaGFuZGxlU3RhcnQgPSAodXJsOiBzdHJpbmcpID0+IHtcbiAgICAgIHNldExvYWRpbmcodHJ1ZSk7XG4gICAgfTtcblxuICAgIGNvbnN0IGhhbmRsZUNvbXBsZXRlID0gKHVybDogc3RyaW5nKSA9PiB7XG4gICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICB9O1xuXG4gICAgcm91dGVyLmV2ZW50cy5vbihcInJvdXRlQ2hhbmdlU3RhcnRcIiwgaGFuZGxlU3RhcnQpO1xuICAgIHJvdXRlci5ldmVudHMub24oXCJyb3V0ZUNoYW5nZUNvbXBsZXRlXCIsIGhhbmRsZUNvbXBsZXRlKTtcbiAgICByb3V0ZXIuZXZlbnRzLm9uKFwicm91dGVDaGFuZ2VFcnJvclwiLCBoYW5kbGVDb21wbGV0ZSk7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgcm91dGVyLmV2ZW50cy5vZmYoXCJyb3V0ZUNoYW5nZVN0YXJ0XCIsIGhhbmRsZVN0YXJ0KTtcbiAgICAgIHJvdXRlci5ldmVudHMub2ZmKFwicm91dGVDaGFuZ2VDb21wbGV0ZVwiLCBoYW5kbGVDb21wbGV0ZSk7XG4gICAgICByb3V0ZXIuZXZlbnRzLm9mZihcInJvdXRlQ2hhbmdlRXJyb3JcIiwgaGFuZGxlQ29tcGxldGUpO1xuICAgIH07XG4gIH0sIFtyb3V0ZXJdKTtcblxuICByZXR1cm4gKFxuICAgIDxDYWNoZVByb3ZpZGVyIHZhbHVlPXtlbW90aW9uQ2FjaGV9PlxuICAgICAgPGRpdiBjbGFzc05hbWU9e2Ake2tvaG8udmFyaWFibGV9ICR7aXRhbGlhbmEudmFyaWFibGV9IGZvbnQta29ob2B9PlxuICAgICAgICA8SGVhZD5cbiAgICAgICAgICA8bWV0YVxuICAgICAgICAgICAgbmFtZT1cInZpZXdwb3J0XCJcbiAgICAgICAgICAgIGNvbnRlbnQ9XCJpbml0aWFsLXNjYWxlPTEsIHdpZHRoPWRldmljZS13aWR0aCwgbWluaW11bS1zY2FsZT0xLjAsIG1heGltdW0tc2NhbGU9MS4wLCB1c2VyLXNjYWxhYmxlPW5vXCJcbiAgICAgICAgICAvPlxuICAgICAgICAgIDxsaW5rXG4gICAgICAgICAgICByZWw9XCJzaG9ydGN1dCBpY29uXCJcbiAgICAgICAgICAgIGhyZWY9XCJodHRwczovL3d3dy5zdGV5LmNvbS9zdGF0aWMvaW1nL2ljb24ucG5nXCJcbiAgICAgICAgICAgIHR5cGU9XCJpbWFnZS94LWljb25cIlxuICAgICAgICAgIC8+XG4gICAgICAgIDwvSGVhZD5cbiAgICAgICAgPFNjcmlwdCBzcmM9XCJodHRwczovL3N0YXRpYy5nZWV0ZXN0LmNvbS92NC9ndDQuanNcIiAvPlxuICAgICAgICA8VGhlbWVQcm92aWRlciB0aGVtZT17dGhlbWV9PlxuICAgICAgICAgIDxVc2VyUHJvdmlkZXI+XG4gICAgICAgICAgICA8Q3NzQmFzZWxpbmUgLz5cbiAgICAgICAgICAgIHtsb2FkaW5nICYmIChcbiAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICBwb3NpdGlvbjogXCJmaXhlZFwiLFxuICAgICAgICAgICAgICAgICAgdG9wOiAwLFxuICAgICAgICAgICAgICAgICAgbGVmdDogMCxcbiAgICAgICAgICAgICAgICAgIHdpZHRoOiBcIjEwMCVcIixcbiAgICAgICAgICAgICAgICAgIGhlaWdodDogXCIxMDAlXCIsXG4gICAgICAgICAgICAgICAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICAgICAgICAgICAgICAgIGp1c3RpZnlDb250ZW50OiBcImNlbnRlclwiLFxuICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogXCJjZW50ZXJcIixcbiAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogXCJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNylcIixcbiAgICAgICAgICAgICAgICAgIHpJbmRleDogOTk5OSxcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPENpcmN1bGFyUHJvZ3Jlc3MgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAge2dldExheW91dCg8Q29tcG9uZW50IHsuLi5wYWdlUHJvcHN9IHVzZXI9e3VzZXJ9IC8+KX1cbiAgICAgICAgICA8L1VzZXJQcm92aWRlciA+XG4gICAgICAgIDwvVGhlbWVQcm92aWRlciA+XG4gICAgICA8L2RpdiA+XG4gICAgPC9DYWNoZVByb3ZpZGVyID5cbiAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgU2VudHJ5LndpdGhQcm9maWxlcihNeUFwcCk7XG4iXSwibmFtZXMiOlsiQ2FjaGVQcm92aWRlciIsIkNpcmN1bGFyUHJvZ3Jlc3MiLCJDc3NCYXNlbGluZSIsIlRoZW1lUHJvdmlkZXIiLCJTZW50cnkiLCJIZWFkIiwidXNlUm91dGVyIiwiU2NyaXB0IiwidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJjcmVhdGVFbW90aW9uQ2FjaGUiLCJVc2VyUHJvdmlkZXIiLCJ0aGVtZSIsImtvaG8iLCJpdGFsaWFuYSIsImNsaWVudFNpZGVFbW90aW9uQ2FjaGUiLCJNeUFwcCIsInByb3BzIiwiQ29tcG9uZW50IiwiZW1vdGlvbkNhY2hlIiwicGFnZVByb3BzIiwicm91dGVyIiwiZ2V0TGF5b3V0IiwicGFnZSIsImxvYWRpbmciLCJzZXRMb2FkaW5nIiwidXNlciIsInNldFVzZXIiLCJoYW5kbGVTdGFydCIsInVybCIsImhhbmRsZUNvbXBsZXRlIiwiZXZlbnRzIiwib24iLCJvZmYiLCJ2YWx1ZSIsImRpdiIsImNsYXNzTmFtZSIsInZhcmlhYmxlIiwibWV0YSIsIm5hbWUiLCJjb250ZW50IiwibGluayIsInJlbCIsImhyZWYiLCJ0eXBlIiwic3JjIiwic3R5bGUiLCJwb3NpdGlvbiIsInRvcCIsImxlZnQiLCJ3aWR0aCIsImhlaWdodCIsImRpc3BsYXkiLCJqdXN0aWZ5Q29udGVudCIsImFsaWduSXRlbXMiLCJiYWNrZ3JvdW5kQ29sb3IiLCJ6SW5kZXgiLCJ3aXRoUHJvZmlsZXIiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/_app.tsx\n");

/***/ }),

/***/ "./src/clients/EmotionCache.ts":
/*!*************************************!*\
  !*** ./src/clients/EmotionCache.ts ***!
  \*************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ createEmotionCache)\n/* harmony export */ });\n/* harmony import */ var _emotion_cache__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/cache */ \"@emotion/cache\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_emotion_cache__WEBPACK_IMPORTED_MODULE_0__]);\n_emotion_cache__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\nconst isBrowser = typeof document !== \"undefined\";\n// On the client side, Create a meta tag at the top of the <head> and set it as insertionPoint.\n// This assures that MUI styles are loaded first.\n// It allows developers to easily override MUI styles with other styling solutions, like CSS modules.\nfunction createEmotionCache() {\n    let insertionPoint;\n    if (isBrowser) {\n        const emotionInsertionPoint = document.querySelector('meta[name=\"emotion-insertion-point\"]');\n        insertionPoint = emotionInsertionPoint ?? undefined;\n    }\n    return (0,_emotion_cache__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n        key: \"mui-style\",\n        insertionPoint\n    });\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY2xpZW50cy9FbW90aW9uQ2FjaGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBeUM7QUFFekMsTUFBTUMsWUFBWSxPQUFPQyxhQUFhO0FBRXRDLCtGQUErRjtBQUMvRixpREFBaUQ7QUFDakQscUdBQXFHO0FBQ3RGLFNBQVNDO0lBQ3RCLElBQUlDO0lBRUosSUFBSUgsV0FBVztRQUNiLE1BQU1JLHdCQUF3QkgsU0FBU0ksYUFBYSxDQUNsRDtRQUVGRixpQkFBaUJDLHlCQUF5QkU7SUFDNUM7SUFFQSxPQUFPUCwwREFBV0EsQ0FBQztRQUFFUSxLQUFLO1FBQWFKO0lBQWU7QUFDeEQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9taW5ncnVhbnpodS8uL3NyYy9jbGllbnRzL0Vtb3Rpb25DYWNoZS50cz8yN2FmIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjcmVhdGVDYWNoZSBmcm9tICdAZW1vdGlvbi9jYWNoZSc7XHJcblxyXG5jb25zdCBpc0Jyb3dzZXIgPSB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnO1xyXG5cclxuLy8gT24gdGhlIGNsaWVudCBzaWRlLCBDcmVhdGUgYSBtZXRhIHRhZyBhdCB0aGUgdG9wIG9mIHRoZSA8aGVhZD4gYW5kIHNldCBpdCBhcyBpbnNlcnRpb25Qb2ludC5cclxuLy8gVGhpcyBhc3N1cmVzIHRoYXQgTVVJIHN0eWxlcyBhcmUgbG9hZGVkIGZpcnN0LlxyXG4vLyBJdCBhbGxvd3MgZGV2ZWxvcGVycyB0byBlYXNpbHkgb3ZlcnJpZGUgTVVJIHN0eWxlcyB3aXRoIG90aGVyIHN0eWxpbmcgc29sdXRpb25zLCBsaWtlIENTUyBtb2R1bGVzLlxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVFbW90aW9uQ2FjaGUoKSB7XHJcbiAgbGV0IGluc2VydGlvblBvaW50O1xyXG5cclxuICBpZiAoaXNCcm93c2VyKSB7XHJcbiAgICBjb25zdCBlbW90aW9uSW5zZXJ0aW9uUG9pbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxNZXRhRWxlbWVudD4oXHJcbiAgICAgICdtZXRhW25hbWU9XCJlbW90aW9uLWluc2VydGlvbi1wb2ludFwiXSdcclxuICAgICk7XHJcbiAgICBpbnNlcnRpb25Qb2ludCA9IGVtb3Rpb25JbnNlcnRpb25Qb2ludCA/PyB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gY3JlYXRlQ2FjaGUoeyBrZXk6ICdtdWktc3R5bGUnLCBpbnNlcnRpb25Qb2ludCB9KTtcclxufVxyXG4iXSwibmFtZXMiOlsiY3JlYXRlQ2FjaGUiLCJpc0Jyb3dzZXIiLCJkb2N1bWVudCIsImNyZWF0ZUVtb3Rpb25DYWNoZSIsImluc2VydGlvblBvaW50IiwiZW1vdGlvbkluc2VydGlvblBvaW50IiwicXVlcnlTZWxlY3RvciIsInVuZGVmaW5lZCIsImtleSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/clients/EmotionCache.ts\n");

/***/ }),

/***/ "./src/hooks/useUser/context.tsx":
/*!***************************************!*\
  !*** ./src/hooks/useUser/context.tsx ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   UserProvider: () => (/* binding */ UserProvider),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n\n\n// 创建 Context\nconst UserContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({\n    user: null,\n    setUser: ()=>{\n        console.warn(\"setUser method is not implemented\");\n    },\n    openLoginDialog: false,\n    setOpenLoginDialog: ()=>{\n        console.warn(\"setOpenLoginDialog method is not implemented\");\n    }\n});\nconst UserProvider = ({ children })=>{\n    const [user, setUser] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [openLoginDialog, setOpenLoginDialog] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const setOpenLoginDialogHandler = (open)=>{\n        setOpenLoginDialog(open);\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(UserContext.Provider, {\n        value: {\n            user,\n            setUser,\n            openLoginDialog,\n            setOpenLoginDialog: setOpenLoginDialogHandler\n        },\n        children: children\n    }, void 0, false, {\n        fileName: \"E:\\\\mingruanzhu\\\\src\\\\hooks\\\\useUser\\\\context.tsx\",\n        lineNumber: 53,\n        columnNumber: 5\n    }, undefined);\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UserContext);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaG9va3MvdXNlVXNlci9jb250ZXh0LnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBT2U7QUFtQmYsYUFBYTtBQUNiLE1BQU1HLDRCQUFjRixvREFBYUEsQ0FBa0I7SUFDakRHLE1BQU07SUFDTkMsU0FBUztRQUNQQyxRQUFRQyxJQUFJLENBQUM7SUFDZjtJQUNBQyxpQkFBaUI7SUFDakJDLG9CQUFvQjtRQUNsQkgsUUFBUUMsSUFBSSxDQUFDO0lBQ2Y7QUFDRjtBQU9PLE1BQU1HLGVBQTRDLENBQUMsRUFBRUMsUUFBUSxFQUFFO0lBQ3BFLE1BQU0sQ0FBQ1AsTUFBTUMsUUFBUSxHQUFHSCwrQ0FBUUEsQ0FBYztJQUM5QyxNQUFNLENBQUNNLGlCQUFpQkMsbUJBQW1CLEdBQUdQLCtDQUFRQSxDQUFVO0lBRWhFLE1BQU1VLDRCQUFtRSxDQUFDQztRQUN4RUosbUJBQW1CSTtJQUNyQjtJQUVBLHFCQUNFLDhEQUFDVixZQUFZVyxRQUFRO1FBQ25CQyxPQUFPO1lBQ0xYO1lBQ0FDO1lBQ0FHO1lBQ0FDLG9CQUFvQkc7UUFDdEI7a0JBQ0NEOzs7Ozs7QUFHUCxFQUFFO0FBRUYsaUVBQWVSLFdBQVdBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9taW5ncnVhbnpodS8uL3NyYy9ob29rcy91c2VVc2VyL2NvbnRleHQudHN4Pzk2ZDkiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7XHJcbiAgY3JlYXRlQ29udGV4dCxcclxuICB1c2VTdGF0ZSxcclxuICB1c2VFZmZlY3QsXHJcbiAgdHlwZSBEaXNwYXRjaCxcclxuICB0eXBlIFJlYWN0Tm9kZSxcclxuICB0eXBlIFNldFN0YXRlQWN0aW9uXHJcbn0gZnJvbSAncmVhY3QnO1xyXG5cclxuLy8g5a6a5LmJ55So5oi357G75Z6LXHJcbmV4cG9ydCBpbnRlcmZhY2UgVXNlciB7XHJcbiAgdG9rZW46IHN0cmluZyB8IG51bGw7XHJcbiAgZW1haWw6IHN0cmluZyB8IG51bGw7XHJcbiAgbW9iaWxlOiBzdHJpbmcgfCBudWxsO1xyXG4gIGZpcnN0TmFtZTogc3RyaW5nIHwgbnVsbDtcclxuICBsYXN0TmFtZTogc3RyaW5nIHwgbnVsbDtcclxufVxyXG5cclxuLy8g5a6a5LmJIENvbnRleHQg55qE57G75Z6LXHJcbmludGVyZmFjZSBVc2VyQ29udGV4dFR5cGUge1xyXG4gIHVzZXI6IFVzZXIgfCBudWxsO1xyXG4gIHNldFVzZXI6IERpc3BhdGNoPFNldFN0YXRlQWN0aW9uPFVzZXIgfCBudWxsPj47XHJcbiAgb3BlbkxvZ2luRGlhbG9nOiBib29sZWFuO1xyXG4gIHNldE9wZW5Mb2dpbkRpYWxvZzogRGlzcGF0Y2g8U2V0U3RhdGVBY3Rpb248Ym9vbGVhbj4+O1xyXG59XHJcblxyXG4vLyDliJvlu7ogQ29udGV4dFxyXG5jb25zdCBVc2VyQ29udGV4dCA9IGNyZWF0ZUNvbnRleHQ8VXNlckNvbnRleHRUeXBlPih7XHJcbiAgdXNlcjogbnVsbCxcclxuICBzZXRVc2VyOiAoKSA9PiB7XHJcbiAgICBjb25zb2xlLndhcm4oJ3NldFVzZXIgbWV0aG9kIGlzIG5vdCBpbXBsZW1lbnRlZCcpO1xyXG4gIH0sXHJcbiAgb3BlbkxvZ2luRGlhbG9nOiBmYWxzZSxcclxuICBzZXRPcGVuTG9naW5EaWFsb2c6ICgpID0+IHtcclxuICAgIGNvbnNvbGUud2Fybignc2V0T3BlbkxvZ2luRGlhbG9nIG1ldGhvZCBpcyBub3QgaW1wbGVtZW50ZWQnKTtcclxuICB9XHJcbn0pO1xyXG5cclxuLy8gUHJvdmlkZXIg57uE5Lu2XHJcbmludGVyZmFjZSBVc2VyUHJvdmlkZXJQcm9wcyB7XHJcbiAgY2hpbGRyZW46IFJlYWN0Tm9kZTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IFVzZXJQcm92aWRlcjogUmVhY3QuRkM8VXNlclByb3ZpZGVyUHJvcHM+ID0gKHsgY2hpbGRyZW4gfSkgPT4ge1xyXG4gIGNvbnN0IFt1c2VyLCBzZXRVc2VyXSA9IHVzZVN0YXRlPFVzZXIgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBbb3BlbkxvZ2luRGlhbG9nLCBzZXRPcGVuTG9naW5EaWFsb2ddID0gdXNlU3RhdGU8Ym9vbGVhbj4oZmFsc2UpO1xyXG5cclxuICBjb25zdCBzZXRPcGVuTG9naW5EaWFsb2dIYW5kbGVyOiBVc2VyQ29udGV4dFR5cGVbJ3NldE9wZW5Mb2dpbkRpYWxvZyddID0gKG9wZW4pID0+IHtcclxuICAgIHNldE9wZW5Mb2dpbkRpYWxvZyhvcGVuKTtcclxuICB9O1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPFVzZXJDb250ZXh0LlByb3ZpZGVyXHJcbiAgICAgIHZhbHVlPXt7XHJcbiAgICAgICAgdXNlcixcclxuICAgICAgICBzZXRVc2VyLFxyXG4gICAgICAgIG9wZW5Mb2dpbkRpYWxvZyxcclxuICAgICAgICBzZXRPcGVuTG9naW5EaWFsb2c6IHNldE9wZW5Mb2dpbkRpYWxvZ0hhbmRsZXJcclxuICAgICAgfX0+XHJcbiAgICAgIHtjaGlsZHJlbn1cclxuICAgIDwvVXNlckNvbnRleHQuUHJvdmlkZXI+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFVzZXJDb250ZXh0O1xyXG4iXSwibmFtZXMiOlsiUmVhY3QiLCJjcmVhdGVDb250ZXh0IiwidXNlU3RhdGUiLCJVc2VyQ29udGV4dCIsInVzZXIiLCJzZXRVc2VyIiwiY29uc29sZSIsIndhcm4iLCJvcGVuTG9naW5EaWFsb2ciLCJzZXRPcGVuTG9naW5EaWFsb2ciLCJVc2VyUHJvdmlkZXIiLCJjaGlsZHJlbiIsInNldE9wZW5Mb2dpbkRpYWxvZ0hhbmRsZXIiLCJvcGVuIiwiUHJvdmlkZXIiLCJ2YWx1ZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/hooks/useUser/context.tsx\n");

/***/ }),

/***/ "./src/theme.ts":
/*!**********************!*\
  !*** ./src/theme.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   braTheme: () => (/* binding */ braTheme),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   italiana: () => (/* reexport default from dynamic */ next_font_google_target_css_path_src_theme_ts_import_Italiana_arguments_weight_400_subsets_latin_display_swap_variable_font_italiana_variableName_italiana___WEBPACK_IMPORTED_MODULE_1___default.a),\n/* harmony export */   koho: () => (/* reexport default from dynamic */ next_font_google_target_css_path_src_theme_ts_import_KoHo_arguments_weight_400_500_subsets_latin_display_swap_variable_font_koho_variableName_koho___WEBPACK_IMPORTED_MODULE_2___default.a),\n/* harmony export */   stlTheme: () => (/* binding */ stlTheme)\n/* harmony export */ });\n/* harmony import */ var next_font_google_target_css_path_src_theme_ts_import_Italiana_arguments_weight_400_subsets_latin_display_swap_variable_font_italiana_variableName_italiana___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/font/google/target.css?{\"path\":\"src\\\\theme.ts\",\"import\":\"Italiana\",\"arguments\":[{\"weight\":[\"400\"],\"subsets\":[\"latin\"],\"display\":\"swap\",\"variable\":\"--font-italiana\"}],\"variableName\":\"italiana\"} */ \"./node_modules/next/font/google/target.css?{\\\"path\\\":\\\"src\\\\\\\\theme.ts\\\",\\\"import\\\":\\\"Italiana\\\",\\\"arguments\\\":[{\\\"weight\\\":[\\\"400\\\"],\\\"subsets\\\":[\\\"latin\\\"],\\\"display\\\":\\\"swap\\\",\\\"variable\\\":\\\"--font-italiana\\\"}],\\\"variableName\\\":\\\"italiana\\\"}\");\n/* harmony import */ var next_font_google_target_css_path_src_theme_ts_import_Italiana_arguments_weight_400_subsets_latin_display_swap_variable_font_italiana_variableName_italiana___WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_font_google_target_css_path_src_theme_ts_import_Italiana_arguments_weight_400_subsets_latin_display_swap_variable_font_italiana_variableName_italiana___WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_font_google_target_css_path_src_theme_ts_import_KoHo_arguments_weight_400_500_subsets_latin_display_swap_variable_font_koho_variableName_koho___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/font/google/target.css?{\"path\":\"src\\\\theme.ts\",\"import\":\"KoHo\",\"arguments\":[{\"weight\":[\"400\",\"500\"],\"subsets\":[\"latin\"],\"display\":\"swap\",\"variable\":\"--font-koho\"}],\"variableName\":\"koho\"} */ \"./node_modules/next/font/google/target.css?{\\\"path\\\":\\\"src\\\\\\\\theme.ts\\\",\\\"import\\\":\\\"KoHo\\\",\\\"arguments\\\":[{\\\"weight\\\":[\\\"400\\\",\\\"500\\\"],\\\"subsets\\\":[\\\"latin\\\"],\\\"display\\\":\\\"swap\\\",\\\"variable\\\":\\\"--font-koho\\\"}],\\\"variableName\\\":\\\"koho\\\"}\");\n/* harmony import */ var next_font_google_target_css_path_src_theme_ts_import_KoHo_arguments_weight_400_500_subsets_latin_display_swap_variable_font_koho_variableName_koho___WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_font_google_target_css_path_src_theme_ts_import_KoHo_arguments_weight_400_500_subsets_latin_display_swap_variable_font_koho_variableName_koho___WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @mui/material/styles */ \"@mui/material/styles\");\n/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_mui_material_styles__WEBPACK_IMPORTED_MODULE_0__);\n\n\n\n// declare module '@mui/material/styles' {\n//   interface BreakpointOverrides {\n//     // xs: false; // removes the `xs` breakpoint\n//     // xl: false;\n//     mobile: true;\n//   }\n// }\n// Create a theme instance.\nconst theme = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_0__.createTheme)({\n    palette: {\n        primary: {\n            main: \"#1976d2\"\n        },\n        secondary: {\n            main: \"#000\"\n        },\n        text: {\n            primary: \"#000\",\n            secondary: \"#666F8D\"\n        }\n    },\n    spacing: (factor)=>`${0.8 * factor}rem`,\n    breakpoints: {\n        values: {\n            xs: 0,\n            sm: 0,\n            md: 768,\n            lg: 1024,\n            xl: 1920\n        }\n    },\n    typography: {\n        htmlFontSize: 10,\n        fontWeightLight: 400,\n        fontWeightMedium: 400,\n        fontWeightRegular: 400,\n        fontWeightBold: 500,\n        fontFamily: `var(--font-koho)`,\n        h1: {\n            fontWeight: \"bold\"\n        },\n        h2: {\n            fontWeight: \"bold\"\n        },\n        h3: {\n            fontWeight: \"bold\"\n        },\n        h4: {\n            fontWeight: \"bold\"\n        },\n        h5: {\n            fontWeight: \"bold\"\n        },\n        h6: {\n            fontWeight: \"bold\"\n        },\n        body1: {\n            lineHeight: 2,\n            fontSize: \"14px\"\n        },\n        subtitle1: {\n            fontWeight: \"bold\",\n            textTransform: \"uppercase\",\n            fontSize: \"14px\"\n        },\n        button: {\n            fontSize: \"14px\"\n        }\n    },\n    components: {\n        MuiCssBaseline: {\n            styleOverrides: {\n                body: {\n                    fontFamily: `var(--font-koho)`\n                }\n            }\n        },\n        MuiButton: {\n            defaultProps: {\n                disableRipple: true\n            },\n            styleOverrides: {\n                root: {\n                    borderRadius: 28,\n                    fontSize: \"14px\"\n                }\n            }\n        },\n        MuiTextField: {\n            styleOverrides: {\n                root: {\n                    \"& .MuiInputBase-input\": {\n                        fontSize: \"14px\"\n                    },\n                    \"& .MuiInputLabel-root\": {\n                        fontSize: \"12px\"\n                    },\n                    \"& .MuiFormHelperText-root\": {\n                        fontSize: \"12px\"\n                    }\n                }\n            }\n        },\n        MuiSelect: {\n            styleOverrides: {\n                root: {\n                    fontSize: \"14px\"\n                },\n                select: {\n                    fontSize: \"14px\"\n                }\n            }\n        },\n        MuiMenuItem: {\n            styleOverrides: {\n                root: {\n                    fontSize: \"14px\"\n                }\n            }\n        },\n        MuiInputLabel: {\n            styleOverrides: {\n                root: {\n                    fontSize: \"12px\"\n                }\n            }\n        },\n        MuiFormHelperText: {\n            styleOverrides: {\n                root: {\n                    fontSize: \"12px\"\n                }\n            }\n        }\n    }\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_0__.responsiveFontSizes)(theme));\nconst stlTheme = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_0__.responsiveFontSizes)((0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_0__.createTheme)({\n    palette: {\n        primary: {\n            light: \"#66D08E\",\n            main: \"#348A55\"\n        },\n        secondary: {\n            main: \"#FFD363\"\n        },\n        info: {\n            main: \"#FFFFFF\"\n        },\n        success: {\n            light: \"#57DE56\",\n            main: \"#348A55\",\n            dark: \"#526F66\"\n        },\n        text: {\n            primary: \"#FFFFFF\",\n            secondary: \"#535363\"\n        }\n    },\n    typography: {\n        fontFamily: [\n            '\"Poppins\"',\n            \"Microsoft YaHei\",\n            \"-apple-system\",\n            \"BlinkMacSystemFont\",\n            '\"Segoe UI\"',\n            '\"Helvetica Neue\"',\n            \"Arial\",\n            \"sans-serif\",\n            '\"Apple Color Emoji\"',\n            '\"Segoe UI Emoji\"',\n            '\"Segoe UI Symbol\"'\n        ].join(\",\"),\n        h1: {\n            fontSize: \"5.6rem\",\n            fontWeight: \"bold\"\n        },\n        h2: {\n            fontSize: \"4.8rem\",\n            fontWeight: \"bold\"\n        },\n        h3: {\n            fontSize: \"4rem\",\n            fontWeight: \"bold\"\n        },\n        h4: {\n            fontSize: \"3.2rem\",\n            fontWeight: \"bold\"\n        },\n        h5: {\n            fontSize: \"2.4rem\",\n            fontWeight: \"bold\"\n        },\n        h6: {\n            fontSize: \"2rem\",\n            fontWeight: \"bold\"\n        },\n        subtitle1: {\n            fontSize: \"1.8rem\",\n            fontWeight: \"bold\"\n        },\n        subtitle2: {\n            fontSize: \"1.6rem\",\n            fontWeight: \"bold\"\n        },\n        body1: {\n            fontSize: \"1.6rem\"\n        }\n    },\n    breakpoints: {\n        values: {\n            xs: 0,\n            sm: 425,\n            md: 768,\n            lg: 1024,\n            xl: 1440\n        }\n    },\n    components: {\n        MuiCssBaseline: {\n            styleOverrides: `\r\n          @font-face {\r\n            font-family: 'Poppins';  \r\n            font-style: normal;\r\n            font-display: swap;\r\n            font-weight: 600;\r\n            src: local('Poppins-SemiBold'), local('Poppins-SemiBold'), url('/fonts/Poppins-SemiBold.ttf') format('ttf');\r\n          }\r\n\r\n          @font-face {\r\n            font-family: 'Poppins';  \r\n            font-style: normal;\r\n            font-display: swap;\r\n            font-weight: 500;\r\n            src: local('Poppins-Regular'), local('Poppins-Regular'), url('/fonts/Poppins-Bold.ttf') format('ttf');\r\n          }\r\n  \r\n          @font-face {\r\n            font-family: 'Poppins';\r\n            font-style: normal;\r\n            font-display: swap;\r\n            font-weight: 400;\r\n            src: local('Poppins-Bold'), local('Poppins-Bold'), url('/fonts/Poppins-Regular.ttf') format('ttf');\r\n          }\r\n        `\n        }\n    }\n}));\nconst braTheme = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_0__.createTheme)({\n    palette: {\n        primary: {\n            main: \"#1976d2\"\n        },\n        secondary: {\n            main: \"#B6DBD1\"\n        },\n        text: {\n            primary: \"#5E6272\",\n            secondary: \"#12022F\"\n        }\n    },\n    spacing: (factor)=>`${0.8 * factor}rem`,\n    typography: {\n        htmlFontSize: 10,\n        fontWeightLight: 400,\n        fontWeightMedium: 400,\n        fontWeightRegular: 400,\n        fontWeightBold: 500,\n        fontFamily: [\n            \"Moderate\",\n            \"Microsoft YaHei\",\n            \"-apple-system\",\n            \"BlinkMacSystemFont\",\n            '\"Segoe UI\"',\n            '\"Helvetica Neue\"',\n            \"Arial\",\n            \"sans-serif\",\n            '\"Apple Color Emoji\"',\n            '\"Segoe UI Emoji\"',\n            '\"Segoe UI Symbol\"'\n        ].join(\",\"),\n        h1: {\n            fontWeight: \"bold\"\n        },\n        h2: {\n            fontWeight: \"bold\"\n        },\n        h3: {\n            fontWeight: \"bold\"\n        },\n        h4: {\n            fontSize: \"2.4rem\",\n            fontWeight: \"bold\",\n            lineHeight: \"3rem\"\n        },\n        h5: {\n            color: \"#333333\",\n            fontSize: \"2rem\",\n            fontWeight: \"bold\",\n            lineHeight: \"4rem\"\n        },\n        h6: {\n            fontWeight: \"bold\",\n            lineHeight: \"2.4rem\"\n        },\n        body1: {\n            fontSize: \"1.6rem\",\n            lineHeight: \"2rem\"\n        },\n        body2: {\n            fontSize: \"1.4rem\",\n            lineHeight: \"2rem\"\n        },\n        subtitle1: {\n            fontWeight: \"bold\",\n            textTransform: \"uppercase\"\n        },\n        subtitle2: {\n            fontSize: \"1.6rem\"\n        }\n    },\n    components: {\n        MuiCssBaseline: {\n            styleOverrides: `\r\n        @font-face {\r\n          font-family: 'Moderate';  \r\n          font-style: normal;\r\n          font-display: swap;\r\n          font-weight: 500;\r\n          src: local('Moderate-Regular'), local('Moderate-Regular'), url('/fonts/Moderat-Bold.woff2') format('woff2');\r\n        }\r\n\r\n        @font-face {\r\n          font-family: 'Moderate';\r\n          font-style: normal;\r\n          font-display: swap;\r\n          font-weight: 400;\r\n          src: local('Moderate-Bold'), local('Moderate-Bold'), url('/fonts/Moderat-Regular.woff2') format('woff2');\r\n        }\r\n      `\n        },\n        MuiButton: {\n            defaultProps: {\n                disableRipple: true\n            },\n            styleOverrides: {\n                root: {\n                    borderRadius: 28\n                }\n            }\n        },\n        MuiPaper: {\n            styleOverrides: {\n                root: {\n                    borderRadius: 20\n                }\n            }\n        }\n    }\n});\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QVk7WUFDVjtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1NBQ0QsQ0FBQ2tDLElBQUksQ0FBQztRQUNQakMsSUFBSTtZQUNGQyxZQUFZO1FBQ2Q7UUFDQUMsSUFBSTtZQUNGRCxZQUFZO1FBQ2Q7UUFDQUUsSUFBSTtZQUNGRixZQUFZO1FBQ2Q7UUFDQUcsSUFBSTtZQUNGSyxVQUFVO1lBQ1ZSLFlBQVk7WUFDWk8sWUFBWTtRQUNkO1FBQ0FILElBQUk7WUFDRitCLE9BQU87WUFDUDNCLFVBQVU7WUFDVlIsWUFBWTtZQUNaTyxZQUFZO1FBQ2Q7UUFDQUYsSUFBSTtZQUNGTCxZQUFZO1lBQ1pPLFlBQVk7UUFDZDtRQUNBRCxPQUFPO1lBQ0xFLFVBQVU7WUFDVkQsWUFBWTtRQUNkO1FBQ0E2QixPQUFPO1lBQ0w1QixVQUFVO1lBQ1ZELFlBQVk7UUFDZDtRQUNBRSxXQUFXO1lBQ1RULFlBQVk7WUFDWlUsZUFBZTtRQUNqQjtRQUNBdUIsV0FBVztZQUNUekIsVUFBVTtRQUNaO0lBQ0Y7SUFDQUksWUFBWTtRQUNWQyxnQkFBZ0I7WUFDZEMsZ0JBQWdCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7TUFnQmpCLENBQUM7UUFDSDtRQUNBRSxXQUFXO1lBQ1RDLGNBQWM7Z0JBQ1pDLGVBQWU7WUFDakI7WUFDQUosZ0JBQWdCO2dCQUNkSyxNQUFNO29CQUNKQyxjQUFjO2dCQUNoQjtZQUNGO1FBQ0Y7UUFDQWlCLFVBQVU7WUFDUnZCLGdCQUFnQjtnQkFDZEssTUFBTTtvQkFDSkMsY0FBYztnQkFDaEI7WUFDRjtRQUNGO0lBQ0Y7QUFDRixHQUFHO0FBL1dVL0M7QUFPQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9taW5ncnVhbnpodS8uL3NyYy90aGVtZS50cz9kYzlhIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZVRoZW1lLCByZXNwb25zaXZlRm9udFNpemVzIH0gZnJvbSAnQG11aS9tYXRlcmlhbC9zdHlsZXMnO1xyXG5pbXBvcnQgeyBJdGFsaWFuYSwgS29IbyB9IGZyb20gJ25leHQvZm9udC9nb29nbGUnO1xyXG5cclxuLy8gU2V0dXAgR29vZ2xlIEZvbnRzIHdpdGggbmV4dC9mb250XHJcbmV4cG9ydCBjb25zdCBpdGFsaWFuYSA9IEl0YWxpYW5hKHsgXHJcbiAgd2VpZ2h0OiBbJzQwMCddLCBcclxuICBzdWJzZXRzOiBbJ2xhdGluJ10sXHJcbiAgZGlzcGxheTogJ3N3YXAnLFxyXG4gIHZhcmlhYmxlOiAnLS1mb250LWl0YWxpYW5hJyxcclxufSk7XHJcblxyXG5leHBvcnQgY29uc3Qga29obyA9IEtvSG8oeyBcclxuICB3ZWlnaHQ6IFsnNDAwJywgJzUwMCddLCBcclxuICBzdWJzZXRzOiBbJ2xhdGluJ10sXHJcbiAgZGlzcGxheTogJ3N3YXAnLFxyXG4gIHZhcmlhYmxlOiAnLS1mb250LWtvaG8nLFxyXG59KTtcclxuXHJcbi8vIGRlY2xhcmUgbW9kdWxlICdAbXVpL21hdGVyaWFsL3N0eWxlcycge1xyXG4vLyAgIGludGVyZmFjZSBCcmVha3BvaW50T3ZlcnJpZGVzIHtcclxuLy8gICAgIC8vIHhzOiBmYWxzZTsgLy8gcmVtb3ZlcyB0aGUgYHhzYCBicmVha3BvaW50XHJcbi8vICAgICAvLyB4bDogZmFsc2U7XHJcbi8vICAgICBtb2JpbGU6IHRydWU7XHJcbi8vICAgfVxyXG4vLyB9XHJcblxyXG4vLyBDcmVhdGUgYSB0aGVtZSBpbnN0YW5jZS5cclxuY29uc3QgdGhlbWUgPSBjcmVhdGVUaGVtZSh7XHJcbiAgcGFsZXR0ZToge1xyXG4gICAgcHJpbWFyeToge1xyXG4gICAgICBtYWluOiAnIzE5NzZkMidcclxuICAgIH0sXHJcbiAgICBzZWNvbmRhcnk6IHtcclxuICAgICAgbWFpbjogJyMwMDAnXHJcbiAgICB9LFxyXG4gICAgdGV4dDoge1xyXG4gICAgICBwcmltYXJ5OiAnIzAwMCcsXHJcbiAgICAgIHNlY29uZGFyeTogJyM2NjZGOEQnXHJcbiAgICB9XHJcbiAgfSxcclxuICBzcGFjaW5nOiAoZmFjdG9yOiBudW1iZXIpID0+IGAkezAuOCAqIGZhY3Rvcn1yZW1gLFxyXG4gIGJyZWFrcG9pbnRzOiB7XHJcbiAgICB2YWx1ZXM6IHtcclxuICAgICAgeHM6IDAsXHJcbiAgICAgIHNtOiAwLFxyXG4gICAgICBtZDogNzY4LFxyXG4gICAgICBsZzogMTAyNCxcclxuICAgICAgeGw6IDE5MjBcclxuICAgIH1cclxuICB9LFxyXG4gIHR5cG9ncmFwaHk6IHtcclxuICAgIGh0bWxGb250U2l6ZTogMTAsXHJcbiAgICBmb250V2VpZ2h0TGlnaHQ6IDQwMCxcclxuICAgIGZvbnRXZWlnaHRNZWRpdW06IDQwMCxcclxuICAgIGZvbnRXZWlnaHRSZWd1bGFyOiA0MDAsXHJcbiAgICBmb250V2VpZ2h0Qm9sZDogNTAwLFxyXG4gICAgZm9udEZhbWlseTogYHZhcigtLWZvbnQta29obylgLFxyXG4gICAgaDE6IHsgZm9udFdlaWdodDogJ2JvbGQnIH0sXHJcbiAgICBoMjogeyBmb250V2VpZ2h0OiAnYm9sZCcgfSxcclxuICAgIGgzOiB7IGZvbnRXZWlnaHQ6ICdib2xkJyB9LFxyXG4gICAgaDQ6IHsgZm9udFdlaWdodDogJ2JvbGQnIH0sXHJcbiAgICBoNTogeyBmb250V2VpZ2h0OiAnYm9sZCcgfSxcclxuICAgIGg2OiB7IGZvbnRXZWlnaHQ6ICdib2xkJyB9LFxyXG4gICAgYm9keTE6IHtcclxuICAgICAgbGluZUhlaWdodDogMixcclxuICAgICAgZm9udFNpemU6ICcxNHB4J1xyXG4gICAgfSxcclxuICAgIHN1YnRpdGxlMToge1xyXG4gICAgICBmb250V2VpZ2h0OiAnYm9sZCcsXHJcbiAgICAgIHRleHRUcmFuc2Zvcm06ICd1cHBlcmNhc2UnLFxyXG4gICAgICBmb250U2l6ZTogJzE0cHgnXHJcbiAgICB9LFxyXG4gICAgYnV0dG9uOiB7XHJcbiAgICAgIGZvbnRTaXplOiAnMTRweCdcclxuICAgIH1cclxuICB9LFxyXG4gIGNvbXBvbmVudHM6IHtcclxuICAgIE11aUNzc0Jhc2VsaW5lOiB7XHJcbiAgICAgIHN0eWxlT3ZlcnJpZGVzOiB7XHJcbiAgICAgICAgYm9keToge1xyXG4gICAgICAgICAgZm9udEZhbWlseTogYHZhcigtLWZvbnQta29obylgXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgTXVpQnV0dG9uOiB7XHJcbiAgICAgIGRlZmF1bHRQcm9wczoge1xyXG4gICAgICAgIGRpc2FibGVSaXBwbGU6IHRydWVcclxuICAgICAgfSxcclxuICAgICAgc3R5bGVPdmVycmlkZXM6IHtcclxuICAgICAgICByb290OiB7XHJcbiAgICAgICAgICBib3JkZXJSYWRpdXM6IDI4LFxyXG4gICAgICAgICAgZm9udFNpemU6ICcxNHB4J1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIE11aVRleHRGaWVsZDoge1xyXG4gICAgICBzdHlsZU92ZXJyaWRlczoge1xyXG4gICAgICAgIHJvb3Q6IHtcclxuICAgICAgICAgICcmIC5NdWlJbnB1dEJhc2UtaW5wdXQnOiB7XHJcbiAgICAgICAgICAgIGZvbnRTaXplOiAnMTRweCdcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICAnJiAuTXVpSW5wdXRMYWJlbC1yb290Jzoge1xyXG4gICAgICAgICAgICBmb250U2l6ZTogJzEycHgnXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgJyYgLk11aUZvcm1IZWxwZXJUZXh0LXJvb3QnOiB7XHJcbiAgICAgICAgICAgIGZvbnRTaXplOiAnMTJweCdcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBNdWlTZWxlY3Q6IHtcclxuICAgICAgc3R5bGVPdmVycmlkZXM6IHtcclxuICAgICAgICByb290OiB7XHJcbiAgICAgICAgICBmb250U2l6ZTogJzE0cHgnXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZWxlY3Q6IHtcclxuICAgICAgICAgIGZvbnRTaXplOiAnMTRweCdcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBNdWlNZW51SXRlbToge1xyXG4gICAgICBzdHlsZU92ZXJyaWRlczoge1xyXG4gICAgICAgIHJvb3Q6IHtcclxuICAgICAgICAgIGZvbnRTaXplOiAnMTRweCdcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBNdWlJbnB1dExhYmVsOiB7XHJcbiAgICAgIHN0eWxlT3ZlcnJpZGVzOiB7XHJcbiAgICAgICAgcm9vdDoge1xyXG4gICAgICAgICAgZm9udFNpemU6ICcxMnB4J1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIE11aUZvcm1IZWxwZXJUZXh0OiB7XHJcbiAgICAgIHN0eWxlT3ZlcnJpZGVzOiB7XHJcbiAgICAgICAgcm9vdDoge1xyXG4gICAgICAgICAgZm9udFNpemU6ICcxMnB4J1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCByZXNwb25zaXZlRm9udFNpemVzKHRoZW1lKTtcclxuXHJcbmV4cG9ydCBjb25zdCBzdGxUaGVtZSA9IHJlc3BvbnNpdmVGb250U2l6ZXMoXHJcbiAgY3JlYXRlVGhlbWUoe1xyXG4gICAgcGFsZXR0ZToge1xyXG4gICAgICBwcmltYXJ5OiB7XHJcbiAgICAgICAgbGlnaHQ6ICcjNjZEMDhFJyxcclxuICAgICAgICBtYWluOiAnIzM0OEE1NSdcclxuICAgICAgfSxcclxuICAgICAgc2Vjb25kYXJ5OiB7XHJcbiAgICAgICAgbWFpbjogJyNGRkQzNjMnXHJcbiAgICAgIH0sXHJcbiAgICAgIGluZm86IHtcclxuICAgICAgICBtYWluOiAnI0ZGRkZGRidcclxuICAgICAgfSxcclxuICAgICAgc3VjY2Vzczoge1xyXG4gICAgICAgIGxpZ2h0OiAnIzU3REU1NicsXHJcbiAgICAgICAgbWFpbjogJyMzNDhBNTUnLFxyXG4gICAgICAgIGRhcms6ICcjNTI2RjY2J1xyXG4gICAgICB9LFxyXG4gICAgICB0ZXh0OiB7XHJcbiAgICAgICAgcHJpbWFyeTogJyNGRkZGRkYnLFxyXG4gICAgICAgIHNlY29uZGFyeTogJyM1MzUzNjMnXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICB0eXBvZ3JhcGh5OiB7XHJcbiAgICAgIGZvbnRGYW1pbHk6IFtcclxuICAgICAgICAnXCJQb3BwaW5zXCInLFxyXG4gICAgICAgICdNaWNyb3NvZnQgWWFIZWknLFxyXG4gICAgICAgICctYXBwbGUtc3lzdGVtJyxcclxuICAgICAgICAnQmxpbmtNYWNTeXN0ZW1Gb250JyxcclxuICAgICAgICAnXCJTZWdvZSBVSVwiJyxcclxuICAgICAgICAnXCJIZWx2ZXRpY2EgTmV1ZVwiJyxcclxuICAgICAgICAnQXJpYWwnLFxyXG4gICAgICAgICdzYW5zLXNlcmlmJyxcclxuICAgICAgICAnXCJBcHBsZSBDb2xvciBFbW9qaVwiJyxcclxuICAgICAgICAnXCJTZWdvZSBVSSBFbW9qaVwiJyxcclxuICAgICAgICAnXCJTZWdvZSBVSSBTeW1ib2xcIidcclxuICAgICAgXS5qb2luKCcsJyksXHJcbiAgICAgIGgxOiB7XHJcbiAgICAgICAgZm9udFNpemU6ICc1LjZyZW0nLFxyXG4gICAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJ1xyXG4gICAgICB9LFxyXG4gICAgICBoMjoge1xyXG4gICAgICAgIGZvbnRTaXplOiAnNC44cmVtJyxcclxuICAgICAgICBmb250V2VpZ2h0OiAnYm9sZCdcclxuICAgICAgfSxcclxuICAgICAgaDM6IHtcclxuICAgICAgICBmb250U2l6ZTogJzRyZW0nLFxyXG4gICAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJ1xyXG4gICAgICB9LFxyXG4gICAgICBoNDoge1xyXG4gICAgICAgIGZvbnRTaXplOiAnMy4ycmVtJyxcclxuICAgICAgICBmb250V2VpZ2h0OiAnYm9sZCdcclxuICAgICAgfSxcclxuICAgICAgaDU6IHtcclxuICAgICAgICBmb250U2l6ZTogJzIuNHJlbScsXHJcbiAgICAgICAgZm9udFdlaWdodDogJ2JvbGQnXHJcbiAgICAgIH0sXHJcbiAgICAgIGg2OiB7XHJcbiAgICAgICAgZm9udFNpemU6ICcycmVtJyxcclxuICAgICAgICBmb250V2VpZ2h0OiAnYm9sZCdcclxuICAgICAgfSxcclxuICAgICAgc3VidGl0bGUxOiB7XHJcbiAgICAgICAgZm9udFNpemU6ICcxLjhyZW0nLFxyXG4gICAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJ1xyXG4gICAgICB9LFxyXG4gICAgICBzdWJ0aXRsZTI6IHtcclxuICAgICAgICBmb250U2l6ZTogJzEuNnJlbScsXHJcbiAgICAgICAgZm9udFdlaWdodDogJ2JvbGQnXHJcbiAgICAgIH0sXHJcbiAgICAgIGJvZHkxOiB7XHJcbiAgICAgICAgZm9udFNpemU6ICcxLjZyZW0nXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBicmVha3BvaW50czoge1xyXG4gICAgICB2YWx1ZXM6IHtcclxuICAgICAgICB4czogMCxcclxuICAgICAgICBzbTogNDI1LFxyXG4gICAgICAgIG1kOiA3NjgsXHJcbiAgICAgICAgbGc6IDEwMjQsXHJcbiAgICAgICAgeGw6IDE0NDBcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGNvbXBvbmVudHM6IHtcclxuICAgICAgTXVpQ3NzQmFzZWxpbmU6IHtcclxuICAgICAgICBzdHlsZU92ZXJyaWRlczogYFxyXG4gICAgICAgICAgQGZvbnQtZmFjZSB7XHJcbiAgICAgICAgICAgIGZvbnQtZmFtaWx5OiAnUG9wcGlucyc7ICBcclxuICAgICAgICAgICAgZm9udC1zdHlsZTogbm9ybWFsO1xyXG4gICAgICAgICAgICBmb250LWRpc3BsYXk6IHN3YXA7XHJcbiAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICAgICAgICAgIHNyYzogbG9jYWwoJ1BvcHBpbnMtU2VtaUJvbGQnKSwgbG9jYWwoJ1BvcHBpbnMtU2VtaUJvbGQnKSwgdXJsKCcvZm9udHMvUG9wcGlucy1TZW1pQm9sZC50dGYnKSBmb3JtYXQoJ3R0ZicpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIEBmb250LWZhY2Uge1xyXG4gICAgICAgICAgICBmb250LWZhbWlseTogJ1BvcHBpbnMnOyAgXHJcbiAgICAgICAgICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcclxuICAgICAgICAgICAgZm9udC1kaXNwbGF5OiBzd2FwO1xyXG4gICAgICAgICAgICBmb250LXdlaWdodDogNTAwO1xyXG4gICAgICAgICAgICBzcmM6IGxvY2FsKCdQb3BwaW5zLVJlZ3VsYXInKSwgbG9jYWwoJ1BvcHBpbnMtUmVndWxhcicpLCB1cmwoJy9mb250cy9Qb3BwaW5zLUJvbGQudHRmJykgZm9ybWF0KCd0dGYnKTtcclxuICAgICAgICAgIH1cclxuICBcclxuICAgICAgICAgIEBmb250LWZhY2Uge1xyXG4gICAgICAgICAgICBmb250LWZhbWlseTogJ1BvcHBpbnMnO1xyXG4gICAgICAgICAgICBmb250LXN0eWxlOiBub3JtYWw7XHJcbiAgICAgICAgICAgIGZvbnQtZGlzcGxheTogc3dhcDtcclxuICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDQwMDtcclxuICAgICAgICAgICAgc3JjOiBsb2NhbCgnUG9wcGlucy1Cb2xkJyksIGxvY2FsKCdQb3BwaW5zLUJvbGQnKSwgdXJsKCcvZm9udHMvUG9wcGlucy1SZWd1bGFyLnR0ZicpIGZvcm1hdCgndHRmJyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgYFxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSlcclxuKTtcclxuXHJcbmV4cG9ydCBjb25zdCBicmFUaGVtZSA9IGNyZWF0ZVRoZW1lKHtcclxuICBwYWxldHRlOiB7XHJcbiAgICBwcmltYXJ5OiB7XHJcbiAgICAgIG1haW46ICcjMTk3NmQyJ1xyXG4gICAgfSxcclxuICAgIHNlY29uZGFyeToge1xyXG4gICAgICBtYWluOiAnI0I2REJEMSdcclxuICAgIH0sXHJcbiAgICB0ZXh0OiB7XHJcbiAgICAgIHByaW1hcnk6ICcjNUU2MjcyJyxcclxuICAgICAgc2Vjb25kYXJ5OiAnIzEyMDIyRidcclxuICAgIH1cclxuICB9LFxyXG4gIHNwYWNpbmc6IChmYWN0b3I6IG51bWJlcikgPT4gYCR7MC44ICogZmFjdG9yfXJlbWAsXHJcbiAgdHlwb2dyYXBoeToge1xyXG4gICAgaHRtbEZvbnRTaXplOiAxMCxcclxuICAgIGZvbnRXZWlnaHRMaWdodDogNDAwLFxyXG4gICAgZm9udFdlaWdodE1lZGl1bTogNDAwLFxyXG4gICAgZm9udFdlaWdodFJlZ3VsYXI6IDQwMCxcclxuICAgIGZvbnRXZWlnaHRCb2xkOiA1MDAsXHJcbiAgICBmb250RmFtaWx5OiBbXHJcbiAgICAgICdNb2RlcmF0ZScsXHJcbiAgICAgICdNaWNyb3NvZnQgWWFIZWknLFxyXG4gICAgICAnLWFwcGxlLXN5c3RlbScsXHJcbiAgICAgICdCbGlua01hY1N5c3RlbUZvbnQnLFxyXG4gICAgICAnXCJTZWdvZSBVSVwiJyxcclxuICAgICAgJ1wiSGVsdmV0aWNhIE5ldWVcIicsXHJcbiAgICAgICdBcmlhbCcsXHJcbiAgICAgICdzYW5zLXNlcmlmJyxcclxuICAgICAgJ1wiQXBwbGUgQ29sb3IgRW1vamlcIicsXHJcbiAgICAgICdcIlNlZ29lIFVJIEVtb2ppXCInLFxyXG4gICAgICAnXCJTZWdvZSBVSSBTeW1ib2xcIidcclxuICAgIF0uam9pbignLCcpLFxyXG4gICAgaDE6IHtcclxuICAgICAgZm9udFdlaWdodDogJ2JvbGQnXHJcbiAgICB9LFxyXG4gICAgaDI6IHtcclxuICAgICAgZm9udFdlaWdodDogJ2JvbGQnXHJcbiAgICB9LFxyXG4gICAgaDM6IHtcclxuICAgICAgZm9udFdlaWdodDogJ2JvbGQnXHJcbiAgICB9LFxyXG4gICAgaDQ6IHtcclxuICAgICAgZm9udFNpemU6ICcyLjRyZW0nLFxyXG4gICAgICBmb250V2VpZ2h0OiAnYm9sZCcsXHJcbiAgICAgIGxpbmVIZWlnaHQ6ICczcmVtJ1xyXG4gICAgfSxcclxuICAgIGg1OiB7XHJcbiAgICAgIGNvbG9yOiAnIzMzMzMzMycsXHJcbiAgICAgIGZvbnRTaXplOiAnMnJlbScsXHJcbiAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJyxcclxuICAgICAgbGluZUhlaWdodDogJzRyZW0nXHJcbiAgICB9LFxyXG4gICAgaDY6IHtcclxuICAgICAgZm9udFdlaWdodDogJ2JvbGQnLFxyXG4gICAgICBsaW5lSGVpZ2h0OiAnMi40cmVtJ1xyXG4gICAgfSxcclxuICAgIGJvZHkxOiB7XHJcbiAgICAgIGZvbnRTaXplOiAnMS42cmVtJyxcclxuICAgICAgbGluZUhlaWdodDogJzJyZW0nXHJcbiAgICB9LFxyXG4gICAgYm9keTI6IHtcclxuICAgICAgZm9udFNpemU6ICcxLjRyZW0nLFxyXG4gICAgICBsaW5lSGVpZ2h0OiAnMnJlbSdcclxuICAgIH0sXHJcbiAgICBzdWJ0aXRsZTE6IHtcclxuICAgICAgZm9udFdlaWdodDogJ2JvbGQnLFxyXG4gICAgICB0ZXh0VHJhbnNmb3JtOiAndXBwZXJjYXNlJ1xyXG4gICAgfSxcclxuICAgIHN1YnRpdGxlMjoge1xyXG4gICAgICBmb250U2l6ZTogJzEuNnJlbSdcclxuICAgIH1cclxuICB9LFxyXG4gIGNvbXBvbmVudHM6IHtcclxuICAgIE11aUNzc0Jhc2VsaW5lOiB7XHJcbiAgICAgIHN0eWxlT3ZlcnJpZGVzOiBgXHJcbiAgICAgICAgQGZvbnQtZmFjZSB7XHJcbiAgICAgICAgICBmb250LWZhbWlseTogJ01vZGVyYXRlJzsgIFxyXG4gICAgICAgICAgZm9udC1zdHlsZTogbm9ybWFsO1xyXG4gICAgICAgICAgZm9udC1kaXNwbGF5OiBzd2FwO1xyXG4gICAgICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICAgICAgICAgIHNyYzogbG9jYWwoJ01vZGVyYXRlLVJlZ3VsYXInKSwgbG9jYWwoJ01vZGVyYXRlLVJlZ3VsYXInKSwgdXJsKCcvZm9udHMvTW9kZXJhdC1Cb2xkLndvZmYyJykgZm9ybWF0KCd3b2ZmMicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgQGZvbnQtZmFjZSB7XHJcbiAgICAgICAgICBmb250LWZhbWlseTogJ01vZGVyYXRlJztcclxuICAgICAgICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcclxuICAgICAgICAgIGZvbnQtZGlzcGxheTogc3dhcDtcclxuICAgICAgICAgIGZvbnQtd2VpZ2h0OiA0MDA7XHJcbiAgICAgICAgICBzcmM6IGxvY2FsKCdNb2RlcmF0ZS1Cb2xkJyksIGxvY2FsKCdNb2RlcmF0ZS1Cb2xkJyksIHVybCgnL2ZvbnRzL01vZGVyYXQtUmVndWxhci53b2ZmMicpIGZvcm1hdCgnd29mZjInKTtcclxuICAgICAgICB9XHJcbiAgICAgIGBcclxuICAgIH0sXHJcbiAgICBNdWlCdXR0b246IHtcclxuICAgICAgZGVmYXVsdFByb3BzOiB7XHJcbiAgICAgICAgZGlzYWJsZVJpcHBsZTogdHJ1ZVxyXG4gICAgICB9LFxyXG4gICAgICBzdHlsZU92ZXJyaWRlczoge1xyXG4gICAgICAgIHJvb3Q6IHtcclxuICAgICAgICAgIGJvcmRlclJhZGl1czogMjhcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBNdWlQYXBlcjoge1xyXG4gICAgICBzdHlsZU92ZXJyaWRlczoge1xyXG4gICAgICAgIHJvb3Q6IHtcclxuICAgICAgICAgIGJvcmRlclJhZGl1czogMjBcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn0pO1xyXG4iXSwibmFtZXMiOlsiaXRhbGlhbmEiLCJrb2hvIiwiY3JlYXRlVGhlbWUiLCJyZXNwb25zaXZlRm9udFNpemVzIiwidGhlbWUiLCJwYWxldHRlIiwicHJpbWFyeSIsIm1haW4iLCJzZWNvbmRhcnkiLCJ0ZXh0Iiwic3BhY2luZyIsImZhY3RvciIsImJyZWFrcG9pbnRzIiwidmFsdWVzIiwieHMiLCJzbSIsIm1kIiwibGciLCJ4bCIsInR5cG9ncmFwaHkiLCJodG1sRm9udFNpemUiLCJmb250V2VpZ2h0TGlnaHQiLCJmb250V2VpZ2h0TWVkaXVtIiwiZm9udFdlaWdodFJlZ3VsYXIiLCJmb250V2VpZ2h0Qm9sZCIsImZvbnRGYW1pbHkiLCJoMSIsImZvbnRXZWlnaHQiLCJoMiIsImgzIiwiaDQiLCJoNSIsImg2IiwiYm9keTEiLCJsaW5lSGVpZ2h0IiwiZm9udFNpemUiLCJzdWJ0aXRsZTEiLCJ0ZXh0VHJhbnNmb3JtIiwiYnV0dG9uIiwiY29tcG9uZW50cyIsIk11aUNzc0Jhc2VsaW5lIiwic3R5bGVPdmVycmlkZXMiLCJib2R5IiwiTXVpQnV0dG9uIiwiZGVmYXVsdFByb3BzIiwiZGlzYWJsZVJpcHBsZSIsInJvb3QiLCJib3JkZXJSYWRpdXMiLCJNdWlUZXh0RmllbGQiLCJNdWlTZWxlY3QiLCJzZWxlY3QiLCJNdWlNZW51SXRlbSIsIk11aUlucHV0TGFiZWwiLCJNdWlGb3JtSGVscGVyVGV4dCIsInN0bFRoZW1lIiwibGlnaHQiLCJpbmZvIiwic3VjY2VzcyIsImRhcmsiLCJqb2luIiwic3VidGl0bGUyIiwiYnJhVGhlbWUiLCJjb2xvciIsImJvZHkyIiwiTXVpUGFwZXIiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/theme.ts\n");

/***/ }),

/***/ "./src/styles/global.css":
/*!*******************************!*\
  !*** ./src/styles/global.css ***!
  \*******************************/
/***/ (() => {



/***/ }),

/***/ "@mui/material/CssBaseline":
/*!********************************************!*\
  !*** external "@mui/material/CssBaseline" ***!
  \********************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/material/CssBaseline");

/***/ }),

/***/ "@mui/material/styles":
/*!***************************************!*\
  !*** external "@mui/material/styles" ***!
  \***************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/material/styles");

/***/ }),

/***/ "@mui/system":
/*!******************************!*\
  !*** external "@mui/system" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/system");

/***/ }),

/***/ "@mui/system/DefaultPropsProvider":
/*!***************************************************!*\
  !*** external "@mui/system/DefaultPropsProvider" ***!
  \***************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/system/DefaultPropsProvider");

/***/ }),

/***/ "@mui/system/colorManipulator":
/*!***********************************************!*\
  !*** external "@mui/system/colorManipulator" ***!
  \***********************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/system/colorManipulator");

/***/ }),

/***/ "@mui/system/createStyled":
/*!*******************************************!*\
  !*** external "@mui/system/createStyled" ***!
  \*******************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/system/createStyled");

/***/ }),

/***/ "@mui/system/createTheme":
/*!******************************************!*\
  !*** external "@mui/system/createTheme" ***!
  \******************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/system/createTheme");

/***/ }),

/***/ "@mui/system/styleFunctionSx":
/*!**********************************************!*\
  !*** external "@mui/system/styleFunctionSx" ***!
  \**********************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/system/styleFunctionSx");

/***/ }),

/***/ "@mui/utils/capitalize":
/*!****************************************!*\
  !*** external "@mui/utils/capitalize" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/utils/capitalize");

/***/ }),

/***/ "@mui/utils/chainPropTypes":
/*!********************************************!*\
  !*** external "@mui/utils/chainPropTypes" ***!
  \********************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/utils/chainPropTypes");

/***/ }),

/***/ "@mui/utils/composeClasses":
/*!********************************************!*\
  !*** external "@mui/utils/composeClasses" ***!
  \********************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/utils/composeClasses");

/***/ }),

/***/ "@mui/utils/deepmerge":
/*!***************************************!*\
  !*** external "@mui/utils/deepmerge" ***!
  \***************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/utils/deepmerge");

/***/ }),

/***/ "@mui/utils/formatMuiErrorMessage":
/*!***************************************************!*\
  !*** external "@mui/utils/formatMuiErrorMessage" ***!
  \***************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/utils/formatMuiErrorMessage");

/***/ }),

/***/ "@mui/utils/generateUtilityClass":
/*!**************************************************!*\
  !*** external "@mui/utils/generateUtilityClass" ***!
  \**************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/utils/generateUtilityClass");

/***/ }),

/***/ "@mui/utils/generateUtilityClasses":
/*!****************************************************!*\
  !*** external "@mui/utils/generateUtilityClasses" ***!
  \****************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/utils/generateUtilityClasses");

/***/ }),

/***/ "@sentry/react":
/*!********************************!*\
  !*** external "@sentry/react" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@sentry/react");

/***/ }),

/***/ "clsx":
/*!***********************!*\
  !*** external "clsx" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("clsx");

/***/ }),

/***/ "next/dist/compiled/next-server/pages.runtime.dev.js":
/*!**********************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages.runtime.dev.js" ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/pages.runtime.dev.js");

/***/ }),

/***/ "next/head":
/*!****************************!*\
  !*** external "next/head" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/head");

/***/ }),

/***/ "prop-types":
/*!*****************************!*\
  !*** external "prop-types" ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = require("prop-types");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react-dom":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-dom");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "react/jsx-runtime":
/*!************************************!*\
  !*** external "react/jsx-runtime" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ "@emotion/cache":
/*!*********************************!*\
  !*** external "@emotion/cache" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = import("@emotion/cache");;

/***/ }),

/***/ "@emotion/react":
/*!*********************************!*\
  !*** external "@emotion/react" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = import("@emotion/react");;

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@swc","vendor-chunks/@mui","vendor-chunks/@babel"], () => (__webpack_exec__("./pages/_app.tsx")));
module.exports = __webpack_exports__;

})();
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./appMain.lsc");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./appMain.lsc":
/*!*********************!*\
  !*** ./appMain.lsc ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _fs = __webpack_require__(/*! fs */ "fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = __webpack_require__(/*! path */ "path");

var _path2 = _interopRequireDefault(_path);

var _os = __webpack_require__(/*! os */ "os");

var _os2 = _interopRequireDefault(_os);

var _crypto = __webpack_require__(/*! crypto */ "crypto");

var _crypto2 = _interopRequireDefault(_crypto);

var _config = __webpack_require__(/*! ./config.json */ "./config.json");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
const desktopPath = _path2.default.join(_os2.default.homedir(), 'Desktop');

const date = new Date();
const dayOfTheMonth = date.getDate();
const month = months[date.getMonth()];
const year = `${date.getFullYear()}`.slice(2);

let downloadFolderPath = _path2.default.join(desktopPath, `${dayOfTheMonth}-${month}-${year}`);

if (_fs2.default.existsSync(downloadFolderPath)) {
  downloadFolderPath = _path2.default.join(desktopPath, `${dayOfTheMonth}-${month}-${year}-${_crypto2.default.randomBytes(4).toString('hex')}`);
}_fs2.default.mkdirSync(downloadFolderPath);

const prefsFileData = _fs2.default.readFileSync(_config2.default.firefoxPrefsFilePath, { encoding: 'utf-8' });

// user_pref("browser.download.dir", "C:\\Users\\Coop\\Desktop\\mon-20-aug-18");
const newPrefsFileData = prefsFileData.split(/\r?\n/g).reduce(function (fileData, line) {
  if (line.startsWith(`user_pref("browser.download.dir",`)) {
    return `${fileData}user_pref("browser.download.dir", "${addDoubleSlashesforWindows(downloadFolderPath)}");\n`;
  } else return `${fileData}${line}\n`;
}, '');

_fs2.default.writeFileSync(_config2.default.firefoxPrefsFilePath, newPrefsFileData);

function addDoubleSlashesforWindows(folderPath) {
  if (_os2.default.platform() === 'win32') {
    return folderPath.replace(/\\/g, '\\\\');
  }return folderPath;
}

/***/ }),

/***/ "./config.json":
/*!*********************!*\
  !*** ./config.json ***!
  \*********************/
/*! exports provided: firefoxPrefsFilePath, default */
/***/ (function(module) {

module.exports = {"firefoxPrefsFilePath":"C:\\Users\\Coop\\.FFPart\\FFprofile\\prefs.js"};

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ })

/******/ });
//# sourceMappingURL=appMain-compiled.js.map
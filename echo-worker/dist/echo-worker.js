(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.echoWorker || (g.echoWorker = {})).js = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postBuffer = exports.bufferToString = exports.bufferToJSON = void 0;
var post_buffer_1 = require("./post-buffer");
Object.defineProperty(exports, "bufferToJSON", { enumerable: true, get: function () { return post_buffer_1.bufferToJSON; } });
Object.defineProperty(exports, "bufferToString", { enumerable: true, get: function () { return post_buffer_1.bufferToString; } });
Object.defineProperty(exports, "postBuffer", { enumerable: true, get: function () { return post_buffer_1.postBuffer; } });

},{"./post-buffer":2}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postBuffer = exports.bufferToJSON = exports.bufferToString = void 0;
function jsonToBuffer(json) {
    try {
        let str = JSON.stringify(json);
        return stringToBuffer(str);
    }
    catch (err) {
        let nextErr = `Error in post-buffer, could not process argument into buffer: ${err}`;
        return [false, nextErr];
    }
}
function stringToBuffer(str) {
    let errMsg = '';
    try {
        let buffer = new ArrayBuffer(str.length * 2);
        let bufferView = new Uint16Array(buffer);
        for (let i = 0, stringLength = str.length; i < stringLength; i++) {
            bufferView[i] = str.charCodeAt(i);
        }
        return [buffer, errMsg];
    }
    catch (err) {
        errMsg = `Error in post-buffer, could not process argument into buffer: ${err}`;
        return [false, errMsg];
    }
}
// bufferToString takes an ArrayBuffer (the result of postBuffer) and decodes it to a plain string
// It returns an array of 2 values, the first being either the decoded string or false literal
// In case a false, the second value is an error message.
function bufferToString(buffer) {
    try {
        let result = new Uint16Array(buffer).reduce((data, byte) => {
            return data + String.fromCharCode(byte);
        }, '');
        return [result, ''];
    }
    catch (err) {
        let errMsg = `Error in post-buffer, could not process buffer to string, original error: ${err}`;
        return [false, errMsg];
    }
}
exports.bufferToString = bufferToString;
// bufferToJSON takes an ArrayBuffer (the result of postBuffer) and decodes it to a parsed JSON object
// It returns an array of 2 values, the first being either the parsed JSON or false literal
// In case a false, the second value is an error message.
function bufferToJSON(buffer) {
    let [str, errMsg] = bufferToString(buffer);
    if (str === false) {
        return [str, errMsg];
    }
    try {
        let obj = JSON.parse(str);
        return [obj, ''];
    }
    catch (err) {
        errMsg = `Error in post-buffer, could not process buffer to JSON, orginal error: ${err}`;
        return [false, errMsg];
    }
}
exports.bufferToJSON = bufferToJSON;
// postBuffer expects two arguements, the first being a string or something JSON stringifyable
// the second either being the worker (if the caller is the UI thread) or the scope (if a worker)
// Returns an array of two values, the first is boolean indicating if the operation is successful
// If it failed, the second is the error message.
function postBuffer(message, postable) {
    let buffer;
    let errMsg = '';
    if (typeof message === 'object') {
        [buffer, errMsg] = jsonToBuffer(message);
    }
    else if (typeof message === 'string') {
        [buffer, errMsg] = stringToBuffer(message);
    }
    else {
        buffer = false;
        errMsg = `Error in post-buffer, Invalid message type passed, must be an Object, Array or string, was ${typeof message}`;
    }
    if (buffer === false) {
        return [buffer, errMsg];
    }
    postable.postMessage(buffer, [buffer]);
    return [true, ''];
}
exports.postBuffer = postBuffer;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeEchoWorker = makeEchoWorker;

var work = require('webworkify');

function makeEchoWorker() {
  return work(require('./echo.worker.js'));
}

},{"./echo.worker.js":4,"webworkify":5}],4:[function(require,module,exports){
"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var pb = require('post-buffer');

module.exports = function (scope) {
  scope.onmessage = function (msg) {
    var data = msg.data;

    var _pb$bufferToJSON = pb.bufferToJSON(data),
        _pb$bufferToJSON2 = _slicedToArray(_pb$bufferToJSON, 2),
        result = _pb$bufferToJSON2[0],
        err = _pb$bufferToJSON2[1];

    if (!result) {
      console.error("Err in worker while building buffer:");
      console.error(err);
      return;
    }

    console.log("Echo worker heard:");
    console.log(result);

    var _pb$postBuffer = pb.postBuffer(result, scope),
        _pb$postBuffer2 = _slicedToArray(_pb$postBuffer, 2),
        success = _pb$postBuffer2[0],
        err2 = _pb$postBuffer2[1];

    if (!success) {
      console.error("Err in worker while posting buffer:");
      console.error(err2);
    }
  };
};

},{"post-buffer":1}],5:[function(require,module,exports){
var bundleFn = arguments[3];
var sources = arguments[4];
var cache = arguments[5];

var stringify = JSON.stringify;

module.exports = function (fn, options) {
    var wkey;
    var cacheKeys = Object.keys(cache);

    for (var i = 0, l = cacheKeys.length; i < l; i++) {
        var key = cacheKeys[i];
        var exp = cache[key].exports;
        // Using babel as a transpiler to use esmodule, the export will always
        // be an object with the default export as a property of it. To ensure
        // the existing api and babel esmodule exports are both supported we
        // check for both
        if (exp === fn || exp && exp.default === fn) {
            wkey = key;
            break;
        }
    }

    if (!wkey) {
        wkey = Math.floor(Math.pow(16, 8) * Math.random()).toString(16);
        var wcache = {};
        for (var i = 0, l = cacheKeys.length; i < l; i++) {
            var key = cacheKeys[i];
            wcache[key] = key;
        }
        sources[wkey] = [
            'function(require,module,exports){' + fn + '(self); }',
            wcache
        ];
    }
    var skey = Math.floor(Math.pow(16, 8) * Math.random()).toString(16);

    var scache = {}; scache[wkey] = wkey;
    sources[skey] = [
        'function(require,module,exports){' +
            // try to call default if defined to also support babel esmodule exports
            'var f = require(' + stringify(wkey) + ');' +
            '(f.default ? f.default : f)(self);' +
        '}',
        scache
    ];

    var workerSources = {};
    resolveSources(skey);

    function resolveSources(key) {
        workerSources[key] = true;

        for (var depPath in sources[key][1]) {
            var depKey = sources[key][1][depPath];
            if (!workerSources[depKey]) {
                resolveSources(depKey);
            }
        }
    }

    var src = '(' + bundleFn + ')({'
        + Object.keys(workerSources).map(function (key) {
            return stringify(key) + ':['
                + sources[key][0]
                + ',' + stringify(sources[key][1]) + ']'
            ;
        }).join(',')
        + '},{},[' + stringify(skey) + '])'
    ;

    var URL = window.URL || window.webkitURL || window.mozURL || window.msURL;

    var blob = new Blob([src], { type: 'text/javascript' });
    if (options && options.bare) { return blob; }
    var workerUrl = URL.createObjectURL(blob);
    var worker = new Worker(workerUrl);
    worker.objectURL = workerUrl;
    return worker;
};

},{}]},{},[3])(3)
});

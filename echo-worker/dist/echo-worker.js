(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.echoWorker || (g.echoWorker = {})).js = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postBuffer = exports.stringToBuffer = exports.jsonToBuffer = exports.bufferToString = exports.bufferToJSON = void 0;
var post_buffer_1 = require("./post-buffer");
Object.defineProperty(exports, "bufferToJSON", { enumerable: true, get: function () { return post_buffer_1.bufferToJSON; } });
Object.defineProperty(exports, "bufferToString", { enumerable: true, get: function () { return post_buffer_1.bufferToString; } });
Object.defineProperty(exports, "jsonToBuffer", { enumerable: true, get: function () { return post_buffer_1.jsonToBuffer; } });
Object.defineProperty(exports, "stringToBuffer", { enumerable: true, get: function () { return post_buffer_1.stringToBuffer; } });
Object.defineProperty(exports, "postBuffer", { enumerable: true, get: function () { return post_buffer_1.postBuffer; } });

},{"./post-buffer":2}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postBuffer = exports.bufferToJSON = exports.bufferToString = exports.stringToBuffer = exports.jsonToBuffer = void 0;
function jsonToBuffer(json) {
    try {
        let str = JSON.stringify(json);
        return stringToBuffer(str);
    }
    catch (err) {
        console.error(`Error in post-worker: Could not process argument into buffer: ${err}`);
        return false;
    }
}
exports.jsonToBuffer = jsonToBuffer;
function stringToBuffer(str) {
    try {
        let buffer = new ArrayBuffer(str.length * 2);
        let bufferView = new Uint16Array(buffer);
        for (let i = 0, stringLength = str.length; i < stringLength; i++) {
            bufferView[i] = str.charCodeAt(i);
        }
        return buffer;
    }
    catch (err) {
        console.error(`Error in post-worker: Could not process argument into buffer: ${err}`);
        return false;
    }
}
exports.stringToBuffer = stringToBuffer;
function bufferToString(buffer) {
    try {
        let result = new Uint16Array(buffer).reduce((data, byte) => {
            return data + String.fromCharCode(byte);
        }, '');
        return result;
    }
    catch (err) {
        console.error(`Error in post-worker: Could not process buffer to string: ${err}`);
        return false;
    }
}
exports.bufferToString = bufferToString;
function bufferToJSON(buffer) {
    let str = bufferToString(buffer);
    if (str === false) {
        return str;
    }
    try {
        let obj = JSON.parse(str);
        return obj;
    }
    catch (err) {
        console.error(`Error in post-worker: Could not process buffer to JSON: ${err}, Target:`);
        return false;
    }
}
exports.bufferToJSON = bufferToJSON;
function postBuffer(message, postable) {
    let buffer;
    if (typeof message === 'object') {
        buffer = jsonToBuffer(message);
        if (buffer === false) {
            return buffer;
        }
    }
    else if (typeof message === 'string') {
        buffer = stringToBuffer(message);
        if (buffer === false) {
            return buffer;
        }
    }
    else {
        console.error(`Error in post-worker: Invalid message type passed, must be an Object, Array or string, was ${typeof message}`);
        return false;
    }
    // if (postable) {
    postable.postMessage(buffer, [buffer]);
    // } else {
    //     // TODO: Test with worker loader
    //     this.postMessage(buffer, [buffer]);
    // }
    return true;
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

var pb = require('post-buffer');

module.exports = function (scope) {
  scope.onmessage = function (msg) {
    var data = msg.data;
    var result = pb.bufferToJSON(data);

    if (!result) {
      console.log('SEE ABOVE');
      return;
    }

    console.log("Echo worker heard:");
    console.log(result);
    pb.postBuffer(result, scope);
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

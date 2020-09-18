!function(r,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.workers=e():r.workers=e()}(window,(function(){return function(r){var e={};function t(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return r[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}return t.m=r,t.c=e,t.d=function(r,e,n){t.o(r,e)||Object.defineProperty(r,e,{enumerable:!0,get:n})},t.r=function(r){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(r,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(r,"__esModule",{value:!0})},t.t=function(r,e){if(1&e&&(r=t(r)),8&e)return r;if(4&e&&"object"==typeof r&&r&&r.__esModule)return r;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:r}),2&e&&"string"!=typeof r)for(var o in r)t.d(n,o,function(e){return r[e]}.bind(null,o));return n},t.n=function(r){var e=r&&r.__esModule?function(){return r.default}:function(){return r};return t.d(e,"a",e),e},t.o=function(r,e){return Object.prototype.hasOwnProperty.call(r,e)},t.p="",t(t.s=1)}([function(r,e,t){"use strict";r.exports=function(r,e,t,n){try{try{var o;try{o=new window.Blob([r])}catch(e){(o=new(window.BlobBuilder||window.WebKitBlobBuilder||window.MozBlobBuilder||window.MSBlobBuilder)).append(r),o=o.getBlob()}var u=window.URL||window.webkitURL,i=u.createObjectURL(o),f=new window[e](i,t);return u.revokeObjectURL(i),f}catch(n){return new window[e]("data:application/javascript,".concat(encodeURIComponent(r)),t)}}catch(r){if(!n)throw Error("Inline worker is not supported");return new window[e](n,t)}}},function(r,e,t){"use strict";t.r(e),t.d(e,"makeEchoWorker",(function(){return i}));var n=t(0),o=t.n(n),u=function(){return o()('!function(r){var e={};function t(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return r[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=r,t.c=e,t.d=function(r,e,n){t.o(r,e)||Object.defineProperty(r,e,{enumerable:!0,get:n})},t.r=function(r){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(r,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(r,"__esModule",{value:!0})},t.t=function(r,e){if(1&e&&(r=t(r)),8&e)return r;if(4&e&&"object"==typeof r&&r&&r.__esModule)return r;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:r}),2&e&&"string"!=typeof r)for(var o in r)t.d(n,o,function(e){return r[e]}.bind(null,o));return n},t.n=function(r){var e=r&&r.__esModule?function(){return r.default}:function(){return r};return t.d(e,"a",e),e},t.o=function(r,e){return Object.prototype.hasOwnProperty.call(r,e)},t.p="",t(t.s=1)}([function(r,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.postBuffer=e.bufferToString=e.bufferToJSON=void 0;var n=t(2);Object.defineProperty(e,"bufferToJSON",{enumerable:!0,get:function(){return n.bufferToJSON}}),Object.defineProperty(e,"bufferToString",{enumerable:!0,get:function(){return n.bufferToString}}),Object.defineProperty(e,"postBuffer",{enumerable:!0,get:function(){return n.postBuffer}})},function(r,e,t){"use strict";t.r(e);var n=t(0);function o(r,e){return function(r){if(Array.isArray(r))return r}(r)||function(r,e){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(r)))return;var t=[],n=!0,o=!1,u=void 0;try{for(var f,i=r[Symbol.iterator]();!(n=(f=i.next()).done)&&(t.push(f.value),!e||t.length!==e);n=!0);}catch(r){o=!0,u=r}finally{try{n||null==i.return||i.return()}finally{if(o)throw u}}return t}(r,e)||function(r,e){if(!r)return;if("string"==typeof r)return u(r,e);var t=Object.prototype.toString.call(r).slice(8,-1);"Object"===t&&r.constructor&&(t=r.constructor.name);if("Map"===t||"Set"===t)return Array.from(r);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return u(r,e)}(r,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function u(r,e){(null==e||e>r.length)&&(e=r.length);for(var t=0,n=new Array(e);t<e;t++)n[t]=r[t];return n}onmessage=function(r){var e=r.data,t=o(n.bufferToJSON(e),2),u=t[0],f=t[1];if(!u)return console.error("Err in worker while building buffer:"),void console.error(f);console.log("Echo worker heard:"),console.log(u);var i=o(n.postBuffer(u,void 0),2),c=i[0],a=i[1];c||(console.error("Err in worker while posting buffer:"),console.error(a))}},function(r,e,t){"use strict";function n(r){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(r){return typeof r}:function(r){return r&&"function"==typeof Symbol&&r.constructor===Symbol&&r!==Symbol.prototype?"symbol":typeof r})(r)}function o(r,e){return function(r){if(Array.isArray(r))return r}(r)||function(r,e){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(r)))return;var t=[],n=!0,o=!1,u=void 0;try{for(var f,i=r[Symbol.iterator]();!(n=(f=i.next()).done)&&(t.push(f.value),!e||t.length!==e);n=!0);}catch(r){o=!0,u=r}finally{try{n||null==i.return||i.return()}finally{if(o)throw u}}return t}(r,e)||function(r,e){if(!r)return;if("string"==typeof r)return u(r,e);var t=Object.prototype.toString.call(r).slice(8,-1);"Object"===t&&r.constructor&&(t=r.constructor.name);if("Map"===t||"Set"===t)return Array.from(r);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return u(r,e)}(r,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function u(r,e){(null==e||e>r.length)&&(e=r.length);for(var t=0,n=new Array(e);t<e;t++)n[t]=r[t];return n}function f(r){var e="";try{for(var t=new ArrayBuffer(2*r.length),n=new Uint16Array(t),o=0,u=r.length;o<u;o++)n[o]=r.charCodeAt(o);return[t,e]}catch(r){return[!1,e="Error in post-buffer, could not process argument into buffer: ".concat(r)]}}function i(r){try{return[new Uint16Array(r).reduce((function(r,e){return r+String.fromCharCode(e)}),""),""]}catch(r){return[!1,"Error in post-buffer, could not process buffer to string, original error: ".concat(r)]}}Object.defineProperty(e,"__esModule",{value:!0}),e.postBuffer=e.bufferToJSON=e.bufferToString=void 0,e.bufferToString=i,e.bufferToJSON=function(r){var e=o(i(r),2),t=e[0],n=e[1];if(!1===t)return[t,n];try{return[JSON.parse(t),""]}catch(r){return[!1,n="Error in post-buffer, could not process buffer to JSON, orginal error: ".concat(r)]}},e.postBuffer=function(r,e){var t,u="";if("object"===n(r)){var i=o(function(r){try{return f(JSON.stringify(r))}catch(r){return[!1,"Error in post-buffer, could not process argument into buffer: ".concat(r)]}}(r),2);t=i[0],u=i[1]}else if("string"==typeof r){var c=o(f(r),2);t=c[0],u=c[1]}else t=!1,u="Error in post-buffer, Invalid message type passed, must be an Object, Array or string, was ".concat(n(r));return!1===t?[t,u]:(e.postMessage(t,[t]),[!0,""])}}]);',"Worker",void 0,t.p+"workers.worker.js")};function i(){return new u}}])}));
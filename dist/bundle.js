var RegularRedux =
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/**
 * @module {function} 101/exists
 * @type {function}
 */

/**
 * Returns false for null and undefined, true for everything else.
 * @function module:101/exists
 * @param val {*} - value to be existance checked
 * @return {boolean} whether the value exists or not
 */
module.exports = exists;

function exists (val) {
  return val !== undefined && val !== null;
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Functional version of a strict object check (Arrays and RegExps are not objects)
 * @module 101/is-object
 */

/**
 * @function module:101/is-object
 * @param {*} val - value checked to be an object
 * @return {boolean} Whether the value is an object or not
 */
var exists = __webpack_require__(0);

module.exports = isObject;

function isObject (val) {
  return typeof val === 'object' &&
    exists(val) &&
    !Array.isArray(val) &&
    !(val instanceof RegExp) &&
    !(val instanceof String) &&
    !(val instanceof Number);
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const keypath = __webpack_require__(6)();

function getStore(ctx) {
    let parent = ctx.$parent;
    while(true) {
        if (!parent) {
            debugger
            throw new Error('Expected root Component use Provider!')
        }
        console.log(parent)
        if (parent.data.store) {
            return parent.data.store;
        }

        parent = parent.$parent;
    }
}

function Container(Component) {
    return Component.implement({
        events: {
            $config(data = this.data) {
                const store = getStore(this);
                const getters = this.data.getters;

                store.subscribe(function () {
                    const state = store.getState();
                    Object.keys(getters).forEach(item => {
                        keypath.set(data, getters[item], 
                            keypath.get(state, item)
                        )
                    });
                });

                store.dispatch({
                    type: 'INITIAL'
                });
                
                this.subscribe = store.subscribe;
                this.dispatch = store.dispatch;
            } 
        }
    })
}

module.exports = Container;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

const Provider = Regular.extend({
    name: 'Provider',
    template: `{#include this.$body}`,
    config({store} = this.data) {
        if (store) {
            this.store = store;
        }
    }
})

module.exports = Provider;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

/**
 * @module 101/is-function
 */

/**
 * Functional version of val typeof 'function'
 * @function module:101/is-function
 * @param {*} val - value checked to be a function
 * @return {boolean} Whether the value is a function or not
 */
module.exports = isFunction;

function isFunction (v) {
  return typeof v === 'function';
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @module 101/last
 */

var isObject = __webpack_require__(1);
var exists = __webpack_require__(0);
var isFunction = __webpack_require__(4);

/**
 * Returns the last value of the item.
 * @function module:101/last
 * @param {array|string|object} item - item whose last value is returned
 * @return {*} Last value of an array. Last char of a string. Last value of an object. Last char of item.toString() for everything else.
 */
module.exports = last;

function last (item) {
  var val;
  if (exists(item && item.length) && !isFunction(item)) {
    val = item[item.length - 1];
  }
  else {
    val = (item && item.toString) ? last(item.toString()) : undefined;
  }
  return val;
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var exists = __webpack_require__(0)
var isObject = __webpack_require__(1);
var last = __webpack_require__(5)

var keypather = module.exports = function (opts) {
  var keypather = new Keypather(opts && opts.force);
  return keypather;
};

if(true)
{
    module.exports = keypather;
}

function Keypather (force) {
  this.force = (force !== undefined) ? Boolean(force) : true; // force - default: true
}
Keypather.prototype.get = function (/* obj, keypath, fnArgs... */) {
  this.create = false;
  return this._get.apply(this, arguments);
};
Keypather.prototype.set = function (obj, keypath, value  /*, fnArgs... */) {
  this.obj = obj;
  keypath = keypath + '';
  this.create = this.force;
  this.fnArgs = Array.prototype.slice.call(arguments, 3).map(makeArray);
  if (keypath.match(/\(\)$/)) {
    throw new Error("Invalid left-hand side in assignment");
  }

  this.keypathSplit = this.splitKeypath(keypath);
  var lastKey = this.getLastKey();
  var val = this.getLastObj(arguments, true);
  val[lastKey] = value;
  return value;
};
Keypather.prototype.in = function (obj, keypath) {
  this.obj = obj;
  keypath = keypath + '';
  this.create = false;
  if (last(keypath) === ')') {
    throw new TypeError('keypath should not end in a function');
  }

  this.keypathSplit = this.splitKeypath(keypath);
  var lastKey = this.getLastKey();
  var val = this.getLastObj(arguments);

  if (this.force && !val) {
    return false;
  }
  return lastKey in val;
};
Keypather.prototype.has = function (obj, keypath) {
  this.obj = obj;
  keypath = keypath + '';
  this.create = false;
  if (last(keypath) === ')') {
    throw new TypeError('keypath should not end in a function');
  }

  this.keypathSplit = this.splitKeypath(keypath);
  var lastKey = this.getLastKey();
  var val = this.getLastObj(arguments);

  if (this.force && !val) {
    return false;
  }
  return val.hasOwnProperty(lastKey);
};
Keypather.prototype.del = function (obj, keypath  /*, fnArgs... */) {
  this.obj = obj;
  keypath = keypath + '';
  this.create = false;
  if (last(keypath) === ')') {
    // deletes function result..does nothing. equivalent to invoking function and returning true
    // this.get(obj, keypath); // not even necessary since this doesnt actually do anything
    return true;
  }

  this.keypathSplit = this.splitKeypath(keypath);
  this.fnArgs = Array.prototype.slice.call(arguments, 2).map(makeArray);
  var lastKey = this.getLastKey();
  var val = this.getLastObj(arguments);

  if (this.force && !val) {
    return true;
  }
  delete val[lastKey];
  return true;
};
Keypather.prototype.flatten = function (obj, delimeter, preKeypath, init) {
  var arr = Array.isArray(obj);
  var def = arr ? [] : {};
  var self = this;
  var keys = Object.keys(obj)
  if (init && preKeypath && !arr && keys.length === 0) {
    init[preKeypath] = {}
  }
  return keys.reduce(function (out, key) {
    var val = obj[key];
    if (arr) {
      key = [ '[', key, ']' ].join('');
    }
    var keypath = exists(preKeypath) ?
      [ preKeypath, key ].join(arr ? '' : delimeter) :
      key;
    if(Array.isArray(val) || isObject(val)) {
      delimeter = exists(delimeter) ? delimeter : '.';
      self.flatten(val, delimeter, keypath, out);
    }
    else {
      out[keypath] = val;
    }

    return out;
  }, init || def);
};
var arrKeypath = /^\[[0-9]+\]/;
Keypather.prototype.expand = function (flatObj, delimeter) {
  var self = this;
  var arrSoFar = true;
  if (exists(delimeter)) {
    var delimeterRegex = new RegExp(escapeRegExp(delimeter), 'g');
  }
  var out = Object.keys(flatObj).reduce(function (out, keypath) {
    if (arrSoFar) {
      arrSoFar = arrKeypath.test(keypath);
      if (!arrSoFar) {
        // change 'out' to an 'obj'
        out = out.reduce(function (obj, key) {
          obj[key] = out[key];
          return out;
        }, {});
      }
    }
    var val = flatObj[keypath];
    if (exists(delimeter)) {
      keypath = keypath.replace(delimeterRegex, '.');
    }
    self.set(out, keypath, val);
    return out;
  }, []);

  return out;
};

// internal
Keypather.prototype._get = function (obj, keypath /*, fnArgs... */) {
  this.obj = obj;
  keypath = keypath + '';
  this.keypathSplit = this.splitKeypath(keypath);
  this.fnArgs = Array.prototype.slice.call(arguments, 2).map(makeArray);
  return this.keypathSplit.reduce(this.getValue.bind(this), obj);
};
Keypather.prototype.splitKeypath = function (keypath) {
  var dotSplit = keypath.split('.');
  var split = [];
  var openParen = false;
  var openBracket = false;
  var parenBuffer, bracketBuffer, preParen, preBracket;
  dotSplit.forEach(function groupParens (part) {
    var parenSplit, leftover, bracketSplit;
    if (part.length === 0) {
      return;
    }
    else if (!openParen && ~part.indexOf('(')) {
      openParen = true;
      parenBuffer = [];
      parenSplit = part.split('(');
      preParen = parenSplit.shift() || '';
      leftover = parenSplit.join('(');
      if (leftover.length) groupParens(leftover);
    }
    else if (openParen) {
      if (~part.indexOf(')')) {
        openParen = false;
        parenSplit = part.split(')');
        parenBuffer.push(parenSplit.shift());
        split.push(preParen+'('+parenBuffer.join('.')+')');
        leftover = parenSplit.join(')');
        if (leftover.length) groupParens(leftover);
      }
      else {
        parenBuffer.push(part);
      }
    }
    else if (!openBracket && ~part.indexOf('[')) {
      openBracket = true;
      bracketBuffer = [];
      bracketSplit = part.split('[');
      preBracket = bracketSplit.shift() || '';
      leftover = bracketSplit.join('[');
      if (leftover.length) groupParens(leftover);
    }
    else if (openBracket) {
      if (~part.indexOf(']')) {
        openBracket = false;
        bracketSplit = part.split(']');
        bracketBuffer.push(bracketSplit.shift());
        split.push(preBracket+'['+bracketBuffer.join('.')+']');
        leftover = bracketSplit.join(']');
        if (leftover.length) groupParens(leftover);
      }
      else {
        bracketBuffer.push(part);
      }
    }
    else {
      split.push(part);
    }
  });
  return split;
};
Keypather.prototype.getValue = function (val, keyPart) {
  this.indexOpenParen = keyPart.indexOf('(');
  this.indexCloseParen = keyPart.indexOf(')');
  this.indexOpenBracket = keyPart.indexOf('[');
  this.indexCloseBracket = keyPart.indexOf(']');
  var keyHasParens = ~this.indexOpenParen && ~this.indexCloseParen && (this.indexOpenParen < this.indexCloseParen);
  var keyHasBrackets = ~this.indexOpenBracket && ~this.indexCloseBracket && (this.indexOpenBracket < this.indexCloseBracket);
  this.lastVal = val;
  if (!keyHasParens && !keyHasBrackets) {
    return this.handleKey(val, keyPart);
  }
  else if (keyHasParens && (!keyHasBrackets || this.indexOpenParen < this.indexOpenBracket)) {
    return this.handleFunction(val, keyPart);
  }
  else {
    return this.handleBrackets(val, keyPart);
  }
};
Keypather.prototype.handleKey = function (val, key) {
  if (this.create && !exists(val[key])) {
    return this.createPath(val, key);
  }
  return (this.force && !exists(val)) ?
      undefined : val[key];
};
Keypather.prototype.handleFunction = function (val, keyPart) {
  var subKey = keyPart.slice(0, this.indexOpenParen), ctx;
  var argsStr = keyPart.slice(this.indexOpenParen+1, this.indexCloseParen);
  if (subKey) {
    if (this.create && !exists(val[subKey])) {
      throw new Error('KeypathSetError: cannot force create a path where a function does not exist');
    }
    ctx = val;
    val = (this.force && (!exists(val) || !exists(val[subKey]))) ? undefined :
      (this.indexOpenParen+1 === this.indexCloseParen) ?
        val[subKey].call(ctx) :
        val[subKey].apply(ctx, this.parseFunctionArgs(argsStr));
  }
  else {
    ctx = this.lastVal || global;
    val = (this.force && !exists(val)) ? undefined :
      (this.indexOpenParen+1 === this.indexCloseParen) ? // maintain context (this.lastVal)
        val.call(ctx) :
        val.apply(ctx, this.parseFunctionArgs(argsStr));
  }
  keyPart = keyPart.slice(this.indexCloseParen+1); // update key, slice of function
  return keyPart ? // if keypart left, back to back fn or brackets so recurse
    this.getValue(val, keyPart) : val;
};
Keypather.prototype.handleBrackets = function (val, keyPart) {
  var subKey = keyPart.slice(0, this.indexOpenBracket);
  var bracketKey = keyPart.slice(this.indexOpenBracket+1, this.indexCloseBracket);
  bracketKey = parseBracketKey(bracketKey);
  if (!exists(bracketKey)) {
    // invalid bracket structure, use key as is.
    return this.handleKey(val, keyPart);
  }
  else {
    if (subKey) {
      if (this.create) {
        if (!exists(val[subKey])) {
          return this.createPath(val, subKey, bracketKey);
        }
        if (!exists(val[subKey][bracketKey])) {
          return this.createPath(val[subKey], bracketKey);
        }
      }
      val = (this.force && (!exists(val) || !exists(val[subKey]))) ?
        undefined : val[subKey][bracketKey];
    }
    else {
      if (this.create && !exists(val[bracketKey])) {
        return this.createPath(val, bracketKey);
      }
      val = (this.force && !exists(val)) ?
        undefined : val[bracketKey];
    }
    keyPart = keyPart.slice(this.indexCloseBracket+1); // update key, slice off bracket notation
    return keyPart ? // if keypart left, back to back fn or brackets so recurse
      this.getValue(val, keyPart) : val;
  }
};
Keypather.prototype.getLastKey = function () {
  var lastKeyPart = this.keypathSplit.pop();
  var indexOpenBracket = lastKeyPart.lastIndexOf('[');
  var indexCloseBracket = lastKeyPart.lastIndexOf(']');
  var keyHasBrackets = ~indexOpenBracket && ~indexCloseBracket && (indexOpenBracket < indexCloseBracket);

  if (keyHasBrackets) {
    var bracketKey = lastKeyPart.slice(indexOpenBracket+1, indexCloseBracket);
    bracketKey = parseBracketKey(bracketKey);
    lastKeyPart = lastKeyPart.slice(0, indexOpenBracket);
    this.keypathSplit.push(lastKeyPart);
    return bracketKey;
  }
  else {
    return lastKeyPart;
  }
};
Keypather.prototype.getLastObj = function (args, setOperation) {
  var val;
  if (this.keypathSplit.length === 0) {
    val = args[0];
  }
  else {
    var getArgs = Array.prototype.slice.call(args);
    getArgs[1] = this.keypathSplit.join('.');
    val = setOperation ?
      this._get.apply(this, getArgs):
      this.get.apply(this, getArgs);
  }
  return val;
};
Keypather.prototype.createPath = function (val /*, keys */) {
  var keys = Array.prototype.slice.call(arguments, 1);
  return keys.reduce(function (val, key, i) {
    if (typeof keys[i+1] === 'number') {
      val[key] = [];
    }
    else {
      val[key] = {};
    }
    return val[key];
  }, val);
};
Keypather.prototype.parseFunctionArgs = function (argsStr) {
  argsStr = argsStr.trim();
  if (argsStr.length === 0) {
    return [];
  }
  else if (argsStr==='%') {
    return this.fnArgs.pop() || [];
  }
  var argsSplit = argsStr.split(',').map(trim);
  var replacementArgs;
  var self = this;
  return argsSplit.map(function (arg) {
    if (arg==='%') {
      replacementArgs = replacementArgs || self.fnArgs.pop() || [];
      arg = replacementArgs.pop();
      return arg;
    }
    else {
      var parsed = parseBracketKey(arg);
      parsed = exists(parsed) ? parsed : keypather().get(self.obj, arg);
      if (exists(parsed)) {
        return parsed;
      }
      else {
        throw new ReferenceError('KeypatherError: Invalid function argument "'+arg+'"');
      }
    }
  });
};

function parseBracketKey (key) {
  key = key.replace(/'/g, '"'); // single quotes to double
  try {
    return JSON.parse(key);
  }
  catch (err) { //invalid
    // console.error(err);
    return;
  }
}

function makeArray (val) {
  return Array.isArray(val) ? val : [val];
}
function trim (str) {
  return str.trim();
}
function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ }),
/* 7 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

exports.Container = __webpack_require__(2);
exports.Provider = __webpack_require__(3);

/***/ })
/******/ ]);
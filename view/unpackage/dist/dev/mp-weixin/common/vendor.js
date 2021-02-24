(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],[
/* 0 */,
/* 1 */
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function addUuid(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    addUuid(result);
    addSafeAreaInsets(result);
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo };

var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"chats","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      appOptions.onShow.apply(app, args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      appOptions.onHide.apply(app, args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch.call(app, args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),
/* 2 */
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2021 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_NAME":"chats","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"chats","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"chats","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"chats","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 3 */
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/*!*********************************!*\
  !*** E:/chats/chats/pages.json ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 11 */
/*!*************************************!*\
  !*** E:/chats/chats/store/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 12));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
_vue.default.use(_vuex.default);

var store = new _vuex.default.Store({
  state: {
    index: 0 },

  mutations: {
    setState: function setState(state, repold) {
      state[repold.key] = repold.value;
    } },

  actions: {},


  getters: {} });var _default =




store;exports.default = _default;

/***/ }),
/* 12 */
/*!********************************************!*\
  !*** ./node_modules/vuex/dist/vuex.esm.js ***!
  \********************************************/
/*! exports provided: default, Store, createNamespacedHelpers, install, mapActions, mapGetters, mapMutations, mapState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNamespacedHelpers", function() { return createNamespacedHelpers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/*!
 * vuex v3.4.0
 * (c) 2020 Evan You
 * @license MIT
 */
function applyMixin (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
}

var target = typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
    ? global
    : {};
var devtoolHook = target.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  }, { prepend: true });

  store.subscribeAction(function (action, state) {
    devtoolHook.emit('vuex:action', action, state);
  }, { prepend: true });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */

/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

function partial (fn, arg) {
  return function () {
    return fn(arg)
  }
}

// Base data struct for store's module, package with some attribute and method
var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  // Store some children item
  this._children = Object.create(null);
  // Store the origin module object which passed by programmer
  this._rawModule = rawModule;
  var rawState = rawModule.state;

  // Store the origin module's state
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors = { namespaced: { configurable: true } };

prototypeAccessors.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.hasChild = function hasChild (key) {
  return key in this._children
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if ((true)) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

ModuleCollection.prototype.isRegistered = function isRegistered (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];

  return parent.hasChild(key)
};

function update (path, targetModule, newModule) {
  if ((true)) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if ((true)) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if ((true)) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();
  this._makeLocalGettersCache = Object.create(null);

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  var state = this._modules.root.state;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  var useDevtools = options.devtools !== undefined ? options.devtools : Vue.config.devtools;
  if (useDevtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors$1 = { state: { configurable: true } };

prototypeAccessors$1.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors$1.state.set = function (v) {
  if ((true)) {
    assert(false, "use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });

  this._subscribers
    .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
    .forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
    ( true) &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  try {
    this._actionSubscribers
      .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
      .filter(function (sub) { return sub.before; })
      .forEach(function (sub) { return sub.before(action, this$1.state); });
  } catch (e) {
    if ((true)) {
      console.warn("[vuex] error in before action subscribers: ");
      console.error(e);
    }
  }

  var result = entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload);

  return new Promise(function (resolve, reject) {
    result.then(function (res) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.after; })
          .forEach(function (sub) { return sub.after(action, this$1.state); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in after action subscribers: ");
          console.error(e);
        }
      }
      resolve(res);
    }, function (error) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.error; })
          .forEach(function (sub) { return sub.error(action, this$1.state, error); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in error action subscribers: ");
          console.error(e);
        }
      }
      reject(error);
    });
  })
};

Store.prototype.subscribe = function subscribe (fn, options) {
  return genericSubscribe(fn, this._subscribers, options)
};

Store.prototype.subscribeAction = function subscribeAction (fn, options) {
  var subs = typeof fn === 'function' ? { before: fn } : fn;
  return genericSubscribe(subs, this._actionSubscribers, options)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if ((true)) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hasModule = function hasModule (path) {
  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  return this._modules.isRegistered(path)
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors$1 );

function genericSubscribe (fn, subs, options) {
  if (subs.indexOf(fn) < 0) {
    options && options.prepend
      ? subs.unshift(fn)
      : subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  // reset local getters cache
  store._makeLocalGettersCache = Object.create(null);
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldVm.
    // using partial to return function with only arguments preserved in closure environment.
    computed[key] = partial(fn, store);
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    if (store._modulesNamespaceMap[namespace] && ("development" !== 'production')) {
      console.error(("[vuex] duplicate namespace " + namespace + " for the namespaced module " + (path.join('/'))));
    }
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      if ((true)) {
        if (moduleName in parentState) {
          console.warn(
            ("[vuex] state field \"" + moduleName + "\" was overridden by a module with the same name at \"" + (path.join('.')) + "\"")
          );
        }
      }
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  if (!store._makeLocalGettersCache[namespace]) {
    var gettersProxy = {};
    var splitPos = namespace.length;
    Object.keys(store.getters).forEach(function (type) {
      // skip if the target getter is not match this namespace
      if (type.slice(0, splitPos) !== namespace) { return }

      // extract local getter type
      var localType = type.slice(splitPos);

      // Add a port to the getters proxy.
      // Define as getter property because
      // we do not want to evaluate the getters in this time.
      Object.defineProperty(gettersProxy, localType, {
        get: function () { return store.getters[type]; },
        enumerable: true
      });
    });
    store._makeLocalGettersCache[namespace] = gettersProxy;
  }

  return store._makeLocalGettersCache[namespace]
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if ((true)) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if ((true)) {
      assert(store._committing, "do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.reduce(function (state, key) { return state[key]; }, state)
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if ((true)) {
    assert(typeof type === 'string', ("expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if ((true)) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

/**
 * Reduce the code which written in Vue.js for getting the state.
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
 * @param {Object}
 */
var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  if (( true) && !isValidMap(states)) {
    console.error('[vuex] mapState: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for committing the mutation
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} mutations # Object's item can be a function which accept `commit` function as the first param, it can accept anthor params. You can commit mutation and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  if (( true) && !isValidMap(mutations)) {
    console.error('[vuex] mapMutations: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // Get the commit method from store
      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for getting the getters
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} getters
 * @return {Object}
 */
var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  if (( true) && !isValidMap(getters)) {
    console.error('[vuex] mapGetters: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    // The namespace has been mutated by normalizeNamespace
    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (( true) && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for dispatch the action
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  if (( true) && !isValidMap(actions)) {
    console.error('[vuex] mapActions: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // get dispatch function from store
      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Rebinding namespace param for mapXXX function in special scoped, and return them by simple object
 * @param {String} namespace
 * @return {Object}
 */
var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */
function normalizeMap (map) {
  if (!isValidMap(map)) {
    return []
  }
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

/**
 * Validate whether given map is valid or not
 * @param {*} map
 * @return {Boolean}
 */
function isValidMap (map) {
  return Array.isArray(map) || isObject(map)
}

/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */
function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

/**
 * Search a special module from store by namespace. if module not exist, print error message.
 * @param {Object} store
 * @param {String} helper
 * @param {String} namespace
 * @return {Object}
 */
function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (( true) && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index = {
  Store: Store,
  install: install,
  version: '3.4.0',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};

/* harmony default export */ __webpack_exports__["default"] = (index);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 13 */
/*!****************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.install = install;Object.defineProperty(exports, "ActionSheet", { enumerable: true, get: function get() {return _actionSheet.default;} });Object.defineProperty(exports, "AddressEdit", { enumerable: true, get: function get() {return _addressEdit.default;} });Object.defineProperty(exports, "AddressList", { enumerable: true, get: function get() {return _addressList.default;} });Object.defineProperty(exports, "Area", { enumerable: true, get: function get() {return _area.default;} });Object.defineProperty(exports, "Badge", { enumerable: true, get: function get() {return _badge.default;} });Object.defineProperty(exports, "Button", { enumerable: true, get: function get() {return _button.default;} });Object.defineProperty(exports, "Calendar", { enumerable: true, get: function get() {return _calendar.default;} });Object.defineProperty(exports, "Card", { enumerable: true, get: function get() {return _card.default;} });Object.defineProperty(exports, "Cascader", { enumerable: true, get: function get() {return _cascader.default;} });Object.defineProperty(exports, "Cell", { enumerable: true, get: function get() {return _cell.default;} });Object.defineProperty(exports, "CellGroup", { enumerable: true, get: function get() {return _cellGroup.default;} });Object.defineProperty(exports, "Checkbox", { enumerable: true, get: function get() {return _checkbox.default;} });Object.defineProperty(exports, "CheckboxGroup", { enumerable: true, get: function get() {return _checkboxGroup.default;} });Object.defineProperty(exports, "Circle", { enumerable: true, get: function get() {return _circle.default;} });Object.defineProperty(exports, "Col", { enumerable: true, get: function get() {return _col.default;} });Object.defineProperty(exports, "Collapse", { enumerable: true, get: function get() {return _collapse.default;} });Object.defineProperty(exports, "CollapseItem", { enumerable: true, get: function get() {return _collapseItem.default;} });Object.defineProperty(exports, "ContactCard", { enumerable: true, get: function get() {return _contactCard.default;} });Object.defineProperty(exports, "ContactEdit", { enumerable: true, get: function get() {return _contactEdit.default;} });Object.defineProperty(exports, "ContactList", { enumerable: true, get: function get() {return _contactList.default;} });Object.defineProperty(exports, "CountDown", { enumerable: true, get: function get() {return _countDown.default;} });Object.defineProperty(exports, "Coupon", { enumerable: true, get: function get() {return _coupon.default;} });Object.defineProperty(exports, "CouponCell", { enumerable: true, get: function get() {return _couponCell.default;} });Object.defineProperty(exports, "CouponList", { enumerable: true, get: function get() {return _couponList.default;} });Object.defineProperty(exports, "DatetimePicker", { enumerable: true, get: function get() {return _datetimePicker.default;} });Object.defineProperty(exports, "Dialog", { enumerable: true, get: function get() {return _dialog.default;} });Object.defineProperty(exports, "Divider", { enumerable: true, get: function get() {return _divider.default;} });Object.defineProperty(exports, "DropdownItem", { enumerable: true, get: function get() {return _dropdownItem.default;} });Object.defineProperty(exports, "DropdownMenu", { enumerable: true, get: function get() {return _dropdownMenu.default;} });Object.defineProperty(exports, "Empty", { enumerable: true, get: function get() {return _empty.default;} });Object.defineProperty(exports, "Field", { enumerable: true, get: function get() {return _field.default;} });Object.defineProperty(exports, "Form", { enumerable: true, get: function get() {return _form.default;} });Object.defineProperty(exports, "GoodsAction", { enumerable: true, get: function get() {return _goodsAction.default;} });Object.defineProperty(exports, "GoodsActionButton", { enumerable: true, get: function get() {return _goodsActionButton.default;} });Object.defineProperty(exports, "GoodsActionIcon", { enumerable: true, get: function get() {return _goodsActionIcon.default;} });Object.defineProperty(exports, "Grid", { enumerable: true, get: function get() {return _grid.default;} });Object.defineProperty(exports, "GridItem", { enumerable: true, get: function get() {return _gridItem.default;} });Object.defineProperty(exports, "Icon", { enumerable: true, get: function get() {return _icon.default;} });Object.defineProperty(exports, "Image", { enumerable: true, get: function get() {return _image.default;} });Object.defineProperty(exports, "ImagePreview", { enumerable: true, get: function get() {return _imagePreview.default;} });Object.defineProperty(exports, "IndexAnchor", { enumerable: true, get: function get() {return _indexAnchor.default;} });Object.defineProperty(exports, "IndexBar", { enumerable: true, get: function get() {return _indexBar.default;} });Object.defineProperty(exports, "Info", { enumerable: true, get: function get() {return _info.default;} });Object.defineProperty(exports, "Lazyload", { enumerable: true, get: function get() {return _lazyload.default;} });Object.defineProperty(exports, "List", { enumerable: true, get: function get() {return _list.default;} });Object.defineProperty(exports, "Loading", { enumerable: true, get: function get() {return _loading.default;} });Object.defineProperty(exports, "Locale", { enumerable: true, get: function get() {return _locale.default;} });Object.defineProperty(exports, "NavBar", { enumerable: true, get: function get() {return _navBar.default;} });Object.defineProperty(exports, "NoticeBar", { enumerable: true, get: function get() {return _noticeBar.default;} });Object.defineProperty(exports, "Notify", { enumerable: true, get: function get() {return _notify.default;} });Object.defineProperty(exports, "NumberKeyboard", { enumerable: true, get: function get() {return _numberKeyboard.default;} });Object.defineProperty(exports, "Overlay", { enumerable: true, get: function get() {return _overlay.default;} });Object.defineProperty(exports, "Pagination", { enumerable: true, get: function get() {return _pagination.default;} });Object.defineProperty(exports, "Panel", { enumerable: true, get: function get() {return _panel.default;} });Object.defineProperty(exports, "PasswordInput", { enumerable: true, get: function get() {return _passwordInput.default;} });Object.defineProperty(exports, "Picker", { enumerable: true, get: function get() {return _picker.default;} });Object.defineProperty(exports, "Popover", { enumerable: true, get: function get() {return _popover.default;} });Object.defineProperty(exports, "Popup", { enumerable: true, get: function get() {return _popup.default;} });Object.defineProperty(exports, "Progress", { enumerable: true, get: function get() {return _progress.default;} });Object.defineProperty(exports, "PullRefresh", { enumerable: true, get: function get() {return _pullRefresh.default;} });Object.defineProperty(exports, "Radio", { enumerable: true, get: function get() {return _radio.default;} });Object.defineProperty(exports, "RadioGroup", { enumerable: true, get: function get() {return _radioGroup.default;} });Object.defineProperty(exports, "Rate", { enumerable: true, get: function get() {return _rate.default;} });Object.defineProperty(exports, "Row", { enumerable: true, get: function get() {return _row.default;} });Object.defineProperty(exports, "Search", { enumerable: true, get: function get() {return _search.default;} });Object.defineProperty(exports, "ShareSheet", { enumerable: true, get: function get() {return _shareSheet.default;} });Object.defineProperty(exports, "Sidebar", { enumerable: true, get: function get() {return _sidebar.default;} });Object.defineProperty(exports, "SidebarItem", { enumerable: true, get: function get() {return _sidebarItem.default;} });Object.defineProperty(exports, "Skeleton", { enumerable: true, get: function get() {return _skeleton.default;} });Object.defineProperty(exports, "Sku", { enumerable: true, get: function get() {return _sku.default;} });Object.defineProperty(exports, "Slider", { enumerable: true, get: function get() {return _slider.default;} });Object.defineProperty(exports, "Step", { enumerable: true, get: function get() {return _step.default;} });Object.defineProperty(exports, "Stepper", { enumerable: true, get: function get() {return _stepper.default;} });Object.defineProperty(exports, "Steps", { enumerable: true, get: function get() {return _steps.default;} });Object.defineProperty(exports, "Sticky", { enumerable: true, get: function get() {return _sticky.default;} });Object.defineProperty(exports, "SubmitBar", { enumerable: true, get: function get() {return _submitBar.default;} });Object.defineProperty(exports, "Swipe", { enumerable: true, get: function get() {return _swipe.default;} });Object.defineProperty(exports, "SwipeCell", { enumerable: true, get: function get() {return _swipeCell.default;} });Object.defineProperty(exports, "SwipeItem", { enumerable: true, get: function get() {return _swipeItem.default;} });Object.defineProperty(exports, "Switch", { enumerable: true, get: function get() {return _switch.default;} });Object.defineProperty(exports, "SwitchCell", { enumerable: true, get: function get() {return _switchCell.default;} });Object.defineProperty(exports, "Tab", { enumerable: true, get: function get() {return _tab.default;} });Object.defineProperty(exports, "Tabbar", { enumerable: true, get: function get() {return _tabbar.default;} });Object.defineProperty(exports, "TabbarItem", { enumerable: true, get: function get() {return _tabbarItem.default;} });Object.defineProperty(exports, "Tabs", { enumerable: true, get: function get() {return _tabs.default;} });Object.defineProperty(exports, "Tag", { enumerable: true, get: function get() {return _tag.default;} });Object.defineProperty(exports, "Toast", { enumerable: true, get: function get() {return _toast.default;} });Object.defineProperty(exports, "TreeSelect", { enumerable: true, get: function get() {return _treeSelect.default;} });Object.defineProperty(exports, "Uploader", { enumerable: true, get: function get() {return _uploader.default;} });exports.default = exports.version = void 0;var _actionSheet = _interopRequireDefault(__webpack_require__(/*! ./action-sheet */ 14));
var _addressEdit = _interopRequireDefault(__webpack_require__(/*! ./address-edit */ 45));
var _addressList = _interopRequireDefault(__webpack_require__(/*! ./address-list */ 74));
var _area = _interopRequireDefault(__webpack_require__(/*! ./area */ 47));
var _badge = _interopRequireDefault(__webpack_require__(/*! ./badge */ 80));
var _button = _interopRequireDefault(__webpack_require__(/*! ./button */ 63));
var _calendar = _interopRequireDefault(__webpack_require__(/*! ./calendar */ 81));
var _card = _interopRequireDefault(__webpack_require__(/*! ./card */ 88));
var _cascader = _interopRequireDefault(__webpack_require__(/*! ./cascader */ 90));
var _cell = _interopRequireDefault(__webpack_require__(/*! ./cell */ 54));
var _cellGroup = _interopRequireDefault(__webpack_require__(/*! ./cell-group */ 99));
var _checkbox = _interopRequireDefault(__webpack_require__(/*! ./checkbox */ 100));
var _checkboxGroup = _interopRequireDefault(__webpack_require__(/*! ./checkbox-group */ 101));
var _circle = _interopRequireDefault(__webpack_require__(/*! ./circle */ 102));
var _col = _interopRequireDefault(__webpack_require__(/*! ./col */ 103));
var _collapse = _interopRequireDefault(__webpack_require__(/*! ./collapse */ 104));
var _collapseItem = _interopRequireDefault(__webpack_require__(/*! ./collapse-item */ 105));
var _contactCard = _interopRequireDefault(__webpack_require__(/*! ./contact-card */ 106));
var _contactEdit = _interopRequireDefault(__webpack_require__(/*! ./contact-edit */ 107));
var _contactList = _interopRequireDefault(__webpack_require__(/*! ./contact-list */ 108));
var _countDown = _interopRequireDefault(__webpack_require__(/*! ./count-down */ 109));
var _coupon = _interopRequireDefault(__webpack_require__(/*! ./coupon */ 111));
var _couponCell = _interopRequireDefault(__webpack_require__(/*! ./coupon-cell */ 112));
var _couponList = _interopRequireDefault(__webpack_require__(/*! ./coupon-list */ 113));
var _datetimePicker = _interopRequireDefault(__webpack_require__(/*! ./datetime-picker */ 114));
var _dialog = _interopRequireDefault(__webpack_require__(/*! ./dialog */ 64));
var _divider = _interopRequireDefault(__webpack_require__(/*! ./divider */ 118));
var _dropdownItem = _interopRequireDefault(__webpack_require__(/*! ./dropdown-item */ 119));
var _dropdownMenu = _interopRequireDefault(__webpack_require__(/*! ./dropdown-menu */ 120));
var _empty = _interopRequireDefault(__webpack_require__(/*! ./empty */ 122));
var _field = _interopRequireDefault(__webpack_require__(/*! ./field */ 57));
var _form = _interopRequireDefault(__webpack_require__(/*! ./form */ 124));
var _goodsAction = _interopRequireDefault(__webpack_require__(/*! ./goods-action */ 66));
var _goodsActionButton = _interopRequireDefault(__webpack_require__(/*! ./goods-action-button */ 69));
var _goodsActionIcon = _interopRequireDefault(__webpack_require__(/*! ./goods-action-icon */ 125));
var _grid = _interopRequireDefault(__webpack_require__(/*! ./grid */ 126));
var _gridItem = _interopRequireDefault(__webpack_require__(/*! ./grid-item */ 127));
var _icon = _interopRequireDefault(__webpack_require__(/*! ./icon */ 41));
var _image = _interopRequireDefault(__webpack_require__(/*! ./image */ 89));
var _imagePreview = _interopRequireDefault(__webpack_require__(/*! ./image-preview */ 128));
var _indexAnchor = _interopRequireDefault(__webpack_require__(/*! ./index-anchor */ 134));
var _indexBar = _interopRequireDefault(__webpack_require__(/*! ./index-bar */ 135));
var _info = _interopRequireDefault(__webpack_require__(/*! ./info */ 42));
var _lazyload = _interopRequireDefault(__webpack_require__(/*! ./lazyload */ 136));
var _list = _interopRequireDefault(__webpack_require__(/*! ./list */ 138));
var _loading = _interopRequireDefault(__webpack_require__(/*! ./loading */ 44));
var _locale = _interopRequireDefault(__webpack_require__(/*! ./locale */ 21));
var _navBar = _interopRequireDefault(__webpack_require__(/*! ./nav-bar */ 139));
var _noticeBar = _interopRequireDefault(__webpack_require__(/*! ./notice-bar */ 140));
var _notify = _interopRequireDefault(__webpack_require__(/*! ./notify */ 141));
var _numberKeyboard = _interopRequireDefault(__webpack_require__(/*! ./number-keyboard */ 143));
var _overlay = _interopRequireDefault(__webpack_require__(/*! ./overlay */ 33));
var _pagination = _interopRequireDefault(__webpack_require__(/*! ./pagination */ 147));
var _panel = _interopRequireDefault(__webpack_require__(/*! ./panel */ 148));
var _passwordInput = _interopRequireDefault(__webpack_require__(/*! ./password-input */ 149));
var _picker = _interopRequireDefault(__webpack_require__(/*! ./picker */ 49));
var _popover = _interopRequireDefault(__webpack_require__(/*! ./popover */ 150));
var _popup = _interopRequireDefault(__webpack_require__(/*! ./popup */ 43));
var _progress = _interopRequireDefault(__webpack_require__(/*! ./progress */ 152));
var _pullRefresh = _interopRequireDefault(__webpack_require__(/*! ./pull-refresh */ 153));
var _radio = _interopRequireDefault(__webpack_require__(/*! ./radio */ 78));
var _radioGroup = _interopRequireDefault(__webpack_require__(/*! ./radio-group */ 75));
var _rate = _interopRequireDefault(__webpack_require__(/*! ./rate */ 154));
var _row = _interopRequireDefault(__webpack_require__(/*! ./row */ 155));
var _search = _interopRequireDefault(__webpack_require__(/*! ./search */ 156));
var _shareSheet = _interopRequireDefault(__webpack_require__(/*! ./share-sheet */ 157));
var _sidebar = _interopRequireDefault(__webpack_require__(/*! ./sidebar */ 158));
var _sidebarItem = _interopRequireDefault(__webpack_require__(/*! ./sidebar-item */ 159));
var _skeleton = _interopRequireDefault(__webpack_require__(/*! ./skeleton */ 160));
var _sku = _interopRequireDefault(__webpack_require__(/*! ./sku */ 161));
var _slider = _interopRequireDefault(__webpack_require__(/*! ./slider */ 181));
var _step = _interopRequireDefault(__webpack_require__(/*! ./step */ 182));
var _stepper = _interopRequireDefault(__webpack_require__(/*! ./stepper */ 172));
var _steps = _interopRequireDefault(__webpack_require__(/*! ./steps */ 183));
var _sticky = _interopRequireDefault(__webpack_require__(/*! ./sticky */ 97));
var _submitBar = _interopRequireDefault(__webpack_require__(/*! ./submit-bar */ 184));
var _swipe = _interopRequireDefault(__webpack_require__(/*! ./swipe */ 131));
var _swipeCell = _interopRequireDefault(__webpack_require__(/*! ./swipe-cell */ 185));
var _swipeItem = _interopRequireDefault(__webpack_require__(/*! ./swipe-item */ 133));
var _switch = _interopRequireDefault(__webpack_require__(/*! ./switch */ 71));
var _switchCell = _interopRequireDefault(__webpack_require__(/*! ./switch-cell */ 186));
var _tab = _interopRequireDefault(__webpack_require__(/*! ./tab */ 91));
var _tabbar = _interopRequireDefault(__webpack_require__(/*! ./tabbar */ 187));
var _tabbarItem = _interopRequireDefault(__webpack_require__(/*! ./tabbar-item */ 188));
var _tabs = _interopRequireDefault(__webpack_require__(/*! ./tabs */ 92));
var _tag = _interopRequireDefault(__webpack_require__(/*! ./tag */ 77));
var _toast = _interopRequireDefault(__webpack_require__(/*! ./toast */ 60));
var _treeSelect = _interopRequireDefault(__webpack_require__(/*! ./tree-select */ 189));
var _uploader = _interopRequireDefault(__webpack_require__(/*! ./uploader */ 176));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
var version = '2.12.6';exports.version = version;

function install(Vue) {
  var components = [_actionSheet.default, _addressEdit.default, _addressList.default, _area.default, _badge.default, _button.default, _calendar.default, _card.default, _cascader.default, _cell.default, _cellGroup.default, _checkbox.default, _checkboxGroup.default, _circle.default, _col.default, _collapse.default, _collapseItem.default, _contactCard.default, _contactEdit.default, _contactList.default, _countDown.default, _coupon.default, _couponCell.default, _couponList.default, _datetimePicker.default, _dialog.default, _divider.default, _dropdownItem.default, _dropdownMenu.default, _empty.default, _field.default, _form.default, _goodsAction.default, _goodsActionButton.default, _goodsActionIcon.default, _grid.default, _gridItem.default, _icon.default, _image.default, _imagePreview.default, _indexAnchor.default, _indexBar.default, _info.default, _list.default, _loading.default, _locale.default, _navBar.default, _noticeBar.default, _notify.default, _numberKeyboard.default, _overlay.default, _pagination.default, _panel.default, _passwordInput.default, _picker.default, _popover.default, _popup.default, _progress.default, _pullRefresh.default, _radio.default, _radioGroup.default, _rate.default, _row.default, _search.default, _shareSheet.default, _sidebar.default, _sidebarItem.default, _skeleton.default, _sku.default, _slider.default, _step.default, _stepper.default, _steps.default, _sticky.default, _submitBar.default, _swipe.default, _swipeCell.default, _swipeItem.default, _switch.default, _switchCell.default, _tab.default, _tabbar.default, _tabbarItem.default, _tabs.default, _tag.default, _toast.default, _treeSelect.default, _uploader.default];
  components.forEach(function (item) {
    if (item.install) {
      Vue.use(item);
    } else if (item.name) {
      Vue.component(item.name, item);
    }
  });
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}var _default =


{
  install: install,
  version: version };exports.default = _default;

/***/ }),
/* 14 */
/*!*****************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/action-sheet/index.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/esm/extends */ 15));
var _babelHelperVueJsxMergeProps = _interopRequireDefault(__webpack_require__(/*! @vue/babel-helper-vue-jsx-merge-props */ 16));

var _utils = __webpack_require__(/*! ../utils */ 17);
var _functional = __webpack_require__(/*! ../utils/functional */ 29);

var _popup = __webpack_require__(/*! ../mixins/popup */ 30);

var _icon = _interopRequireDefault(__webpack_require__(/*! ../icon */ 41));
var _popup2 = _interopRequireDefault(__webpack_require__(/*! ../popup */ 43));
var _loading = _interopRequireDefault(__webpack_require__(/*! ../loading */ 44));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // Utils
// Mixins
// Components
// Types
var _createNamespace = (0, _utils.createNamespace)('action-sheet'),createComponent = _createNamespace[0],bem = _createNamespace[1];

function ActionSheet(h, props, slots, ctx) {
  var title = props.title,
  cancelText = props.cancelText,
  closeable = props.closeable;

  function onCancel() {
    (0, _functional.emit)(ctx, 'input', false);
    (0, _functional.emit)(ctx, 'cancel');
  }

  function Header() {
    if (title) {
      return h("div", {
        "class": bem('header') },
      [title, closeable && h(_icon.default, {
        "attrs": {
          "name": props.closeIcon },

        "class": bem('close'),
        "on": {
          "click": onCancel } })]);


    }
  }

  function Option(item, index) {
    var disabled = item.disabled,
    loading = item.loading,
    callback = item.callback;

    function onClickOption(event) {
      event.stopPropagation();

      if (disabled || loading) {
        return;
      }

      if (callback) {
        callback(item);
      }

      (0, _functional.emit)(ctx, 'select', item, index);

      if (props.closeOnClickAction) {
        (0, _functional.emit)(ctx, 'input', false);
      }
    }

    function OptionContent() {
      if (loading) {
        return h(_loading.default, {
          "class": bem('loading-icon') });

      }

      return [h("span", {
        "class": bem('name') },
      [item.name]), item.subname && h("div", {
        "class": bem('subname') },
      [item.subname])];
    }

    return h("button", {
      "attrs": {
        "type": "button" },

      "class": [bem('item', {
        disabled: disabled,
        loading: loading }),
      item.className],
      "style": {
        color: item.color },

      "on": {
        "click": onClickOption } },

    [OptionContent()]);
  }

  function CancelText() {
    if (cancelText) {
      return [h("div", {
        "class": bem('gap') }),
      h("button", {
        "attrs": {
          "type": "button" },

        "class": bem('cancel'),
        "on": {
          "click": onCancel } },

      [cancelText])];
    }
  }

  function Description() {
    var description = (slots.description == null ? void 0 : slots.description()) || props.description;

    if (description) {
      return h("div", {
        "class": bem('description') },
      [description]);
    }
  }

  return h(_popup2.default, (0, _babelHelperVueJsxMergeProps.default)([{
    "class": bem(),
    "attrs": {
      "position": "bottom",
      "round": props.round,
      "value": props.value,
      "overlay": props.overlay,
      "duration": props.duration,
      "lazyRender": props.lazyRender,
      "lockScroll": props.lockScroll,
      "getContainer": props.getContainer,
      "closeOnPopstate": props.closeOnPopstate,
      "closeOnClickOverlay": props.closeOnClickOverlay,
      "safeAreaInsetBottom": props.safeAreaInsetBottom } },

  (0, _functional.inherit)(ctx, true)]), [Header(), Description(), h("div", {
    "class": bem('content') },
  [props.actions && props.actions.map(Option), slots.default == null ? void 0 : slots.default()]), CancelText()]);
}

ActionSheet.props = (0, _extends2.default)({}, _popup.popupMixinProps, {
  title: String,
  actions: Array,
  duration: [Number, String],
  cancelText: String,
  description: String,
  getContainer: [String, Function],
  closeOnPopstate: Boolean,
  closeOnClickAction: Boolean,
  round: {
    type: Boolean,
    default: true },

  closeable: {
    type: Boolean,
    default: true },

  closeIcon: {
    type: String,
    default: 'cross' },

  safeAreaInsetBottom: {
    type: Boolean,
    default: true },

  overlay: {
    type: Boolean,
    default: true },

  closeOnClickOverlay: {
    type: Boolean,
    default: true } });var _default =


createComponent(ActionSheet);exports.default = _default;

/***/ }),
/* 15 */
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/extends.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = _extends;function _extends() {
  exports.default = _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

/***/ }),
/* 16 */
/*!***************************************************************************!*\
  !*** ./node_modules/@vue/babel-helper-vue-jsx-merge-props/dist/helper.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function _extends(){return _extends=Object.assign||function(a){for(var b,c=1;c<arguments.length;c++)for(var d in b=arguments[c],b)Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d]);return a},_extends.apply(this,arguments)}var normalMerge=["attrs","props","domProps"],toArrayMerge=["class","style","directives"],functionalMerge=["on","nativeOn"],mergeJsxProps=function(a){return a.reduce(function(c,a){for(var b in a)if(!c[b])c[b]=a[b];else if(-1!==normalMerge.indexOf(b))c[b]=_extends({},c[b],a[b]);else if(-1!==toArrayMerge.indexOf(b)){var d=c[b]instanceof Array?c[b]:[c[b]],e=a[b]instanceof Array?a[b]:[a[b]];c[b]=d.concat(e)}else if(-1!==functionalMerge.indexOf(b)){for(var f in a[b])if(c[b][f]){var g=c[b][f]instanceof Array?c[b][f]:[c[b][f]],h=a[b][f]instanceof Array?a[b][f]:[a[b][f]];c[b][f]=g.concat(h)}else c[b][f]=a[b][f];}else if("hook"==b)for(var i in a[b])c[b][i]=c[b][i]?mergeFn(c[b][i],a[b][i]):a[b][i];else c[b]=a[b];return c},{})},mergeFn=function(a,b){return function(){a&&a.apply(this,arguments),b&&b.apply(this,arguments)}};module.exports=mergeJsxProps;


/***/ }),
/* 17 */
/*!**********************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/utils/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.noop = noop;exports.isDef = isDef;exports.isFunction = isFunction;exports.isObject = isObject;exports.isPromise = isPromise;exports.get = get;Object.defineProperty(exports, "createNamespace", { enumerable: true, get: function get() {return _create.createNamespace;} });Object.defineProperty(exports, "addUnit", { enumerable: true, get: function get() {return _unit.addUnit;} });exports.isServer = exports.inBrowser = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _create = __webpack_require__(/*! ./create */ 18);
var _unit = __webpack_require__(/*! ./format/unit */ 27);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
var inBrowser = typeof window !== 'undefined';exports.inBrowser = inBrowser;
var isServer = _vue.default.prototype.$isServer; // eslint-disable-next-line @typescript-eslint/no-empty-function
exports.isServer = isServer;
function noop() {}
function isDef(val) {
  return val !== undefined && val !== null;
}
function isFunction(val) {
  return typeof val === 'function';
}
function isObject(val) {
  return val !== null && typeof val === 'object';
}
function isPromise(val) {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch);
}
function get(object, path) {
  var keys = path.split('.');
  var result = object;
  keys.forEach(function (key) {
    var _result$key;

    result = (_result$key = result[key]) != null ? _result$key : '';
  });
  return result;
}

/***/ }),
/* 18 */
/*!*****************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/utils/create/index.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createNamespace = createNamespace;var _bem = __webpack_require__(/*! ./bem */ 19);
var _component = __webpack_require__(/*! ./component */ 20);
var _i18n = __webpack_require__(/*! ./i18n */ 26);
function createNamespace(name) {
  name = 'van-' + name;
  return [(0, _component.createComponent)(name), (0, _bem.createBEM)(name), (0, _i18n.createI18N)(name)];
}

/***/ }),
/* 19 */
/*!***************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/utils/create/bem.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createBEM = createBEM; /**
                                                                                                           * bem helper
                                                                                                           * b() // 'button'
                                                                                                           * b('text') // 'button__text'
                                                                                                           * b({ disabled }) // 'button button--disabled'
                                                                                                           * b('text', { disabled }) // 'button__text button__text--disabled'
                                                                                                           * b(['disabled', 'primary']) // 'button button--disabled button--primary'
                                                                                                           */
function gen(name, mods) {
  if (!mods) {
    return '';
  }

  if (typeof mods === 'string') {
    return " " + name + "--" + mods;
  }

  if (Array.isArray(mods)) {
    return mods.reduce(function (ret, item) {
      return ret + gen(name, item);
    }, '');
  }

  return Object.keys(mods).reduce(function (ret, key) {
    return ret + (mods[key] ? gen(name, key) : '');
  }, '');
}

function createBEM(name) {
  return function (el, mods) {
    if (el && typeof el !== 'string') {
      mods = el;
      el = '';
    }

    el = el ? name + "__" + el : name;
    return "" + el + gen(el, mods);
  };
}

/***/ }),
/* 20 */
/*!*********************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/utils/create/component.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.unifySlots = unifySlots;exports.createComponent = createComponent;


__webpack_require__(/*! ../../locale */ 21);
var _ = __webpack_require__(/*! .. */ 17);
var _string = __webpack_require__(/*! ../format/string */ 24);
var _slots = __webpack_require__(/*! ../../mixins/slots */ 25);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /**
                                                                                                                                                 * Create a basic component with common options
                                                                                                                                                 */function install(Vue) {
  var name = this.name;
  Vue.component(name, this);
  Vue.component((0, _string.camelize)("-" + name), this);
} // unify slots & scopedSlots


function unifySlots(context) {
  // use data.scopedSlots in lower Vue version
  var scopedSlots = context.scopedSlots || context.data.scopedSlots || {};
  var slots = context.slots();
  Object.keys(slots).forEach(function (key) {
    if (!scopedSlots[key]) {
      scopedSlots[key] = function () {
        return slots[key];
      };
    }
  });
  return scopedSlots;
} // should be removed after Vue 3

function transformFunctionComponent(pure) {
  return {
    functional: true,
    props: pure.props,
    model: pure.model,
    render: function render(h, context) {
      return pure(h, context.props, unifySlots(context), context);
    } };

}

function createComponent(name) {
  return function (sfc) {
    if ((0, _.isFunction)(sfc)) {
      sfc = transformFunctionComponent(sfc);
    }

    if (!sfc.functional) {
      sfc.mixins = sfc.mixins || [];
      sfc.mixins.push(_slots.SlotsMixin);
    }

    sfc.name = name;
    sfc.install = install;
    return sfc;
  };
}

/***/ }),
/* 21 */
/*!***********************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/locale/index.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _deepAssign = __webpack_require__(/*! ../utils/deep-assign */ 22);
var _zhCN = _interopRequireDefault(__webpack_require__(/*! ./lang/zh-CN */ 23));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
var proto = _vue.default.prototype;
var defineReactive = _vue.default.util.defineReactive;
defineReactive(proto, '$vantLang', 'zh-CN');
defineReactive(proto, '$vantMessages', {
  'zh-CN': _zhCN.default });var _default =

{
  messages: function messages() {
    return proto.$vantMessages[proto.$vantLang];
  },
  use: function use(lang, messages) {
    var _this$add;

    proto.$vantLang = lang;
    this.add((_this$add = {}, _this$add[lang] = messages, _this$add));
  },
  add: function add(messages) {
    if (messages === void 0) {
      messages = {};
    }

    (0, _deepAssign.deepAssign)(proto.$vantMessages, messages);
  } };exports.default = _default;

/***/ }),
/* 22 */
/*!****************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/utils/deep-assign.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.deepAssign = deepAssign;var _ = __webpack_require__(/*! . */ 17);
var hasOwnProperty = Object.prototype.hasOwnProperty;

function assignKey(to, from, key) {
  var val = from[key];

  if (!(0, _.isDef)(val)) {
    return;
  }

  if (!hasOwnProperty.call(to, key) || !(0, _.isObject)(val)) {
    to[key] = val;
  } else {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    to[key] = deepAssign(Object(to[key]), from[key]);
  }
}

function deepAssign(to, from) {
  Object.keys(from).forEach(function (key) {
    assignKey(to, from, key);
  });
  return to;
}

/***/ }),
/* 23 */
/*!****************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/locale/lang/zh-CN.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  name: '姓名',
  tel: '电话',
  save: '保存',
  confirm: '确认',
  cancel: '取消',
  delete: '删除',
  complete: '完成',
  loading: '加载中...',
  telEmpty: '请填写电话',
  nameEmpty: '请填写姓名',
  nameInvalid: '请输入正确的姓名',
  confirmDelete: '确定要删除吗',
  telInvalid: '请输入正确的手机号',
  vanCalendar: {
    end: '结束',
    start: '开始',
    title: '日期选择',
    confirm: '确定',
    startEnd: '开始/结束',
    weekdays: ['日', '一', '二', '三', '四', '五', '六'],
    monthTitle: function monthTitle(year, month) {
      return year + "\u5E74" + month + "\u6708";
    },
    rangePrompt: function rangePrompt(maxRange) {
      return "\u9009\u62E9\u5929\u6570\u4E0D\u80FD\u8D85\u8FC7 " + maxRange + " \u5929";
    } },

  vanCascader: {
    select: '请选择' },

  vanContactCard: {
    addText: '添加联系人' },

  vanContactList: {
    addText: '新建联系人' },

  vanPagination: {
    prev: '上一页',
    next: '下一页' },

  vanPullRefresh: {
    pulling: '下拉即可刷新...',
    loosing: '释放即可刷新...' },

  vanSubmitBar: {
    label: '合计：' },

  vanCoupon: {
    unlimited: '无使用门槛',
    discount: function discount(_discount) {
      return _discount + "\u6298";
    },
    condition: function condition(_condition) {
      return "\u6EE1" + _condition + "\u5143\u53EF\u7528";
    } },

  vanCouponCell: {
    title: '优惠券',
    tips: '暂无可用',
    count: function count(_count) {
      return _count + "\u5F20\u53EF\u7528";
    } },

  vanCouponList: {
    empty: '暂无优惠券',
    exchange: '兑换',
    close: '不使用优惠券',
    enable: '可用',
    disabled: '不可用',
    placeholder: '请输入优惠码' },

  vanAddressEdit: {
    area: '地区',
    postal: '邮政编码',
    areaEmpty: '请选择地区',
    addressEmpty: '请填写详细地址',
    postalEmpty: '邮政编码格式不正确',
    defaultAddress: '设为默认收货地址',
    telPlaceholder: '收货人手机号',
    namePlaceholder: '收货人姓名',
    areaPlaceholder: '选择省 / 市 / 区' },

  vanAddressEditDetail: {
    label: '详细地址',
    placeholder: '街道门牌、楼层房间号等信息' },

  vanAddressList: {
    add: '新增地址' } };exports.default = _default;

/***/ }),
/* 24 */
/*!******************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/utils/format/string.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.camelize = camelize;exports.padZero = padZero;var camelizeRE = /-(\w)/g;
function camelize(str) {
  return str.replace(camelizeRE, function (_, c) {
    return c.toUpperCase();
  });
}
function padZero(num, targetLength) {
  if (targetLength === void 0) {
    targetLength = 2;
  }

  var str = num + '';

  while (str.length < targetLength) {
    str = '0' + str;
  }

  return str;
}

/***/ }),
/* 25 */
/*!***********************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/mixins/slots.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.SlotsMixin = void 0; /**
                                                                                                         * Use scopedSlots in Vue 2.6+
                                                                                                         * downgrade to slots in lower version
                                                                                                         */
var SlotsMixin = {
  methods: {
    slots: function slots(name, props) {
      if (name === void 0) {
        name = 'default';
      }

      var $slots = this.$slots,
      $scopedSlots = this.$scopedSlots;
      var scopedSlot = $scopedSlots[name];

      if (scopedSlot) {
        return scopedSlot(props);
      }

      return $slots[name];
    } } };exports.SlotsMixin = SlotsMixin;

/***/ }),
/* 26 */
/*!****************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/utils/create/i18n.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createI18N = createI18N;var _ = __webpack_require__(/*! .. */ 17);
var _string = __webpack_require__(/*! ../format/string */ 24);
var _locale = _interopRequireDefault(__webpack_require__(/*! ../../locale */ 21));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
function createI18N(name) {
  var prefix = (0, _string.camelize)(name) + '.';
  return function (path) {
    var messages = _locale.default.messages();
    var message = (0, _.get)(messages, prefix + path) || (0, _.get)(messages, path);

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return (0, _.isFunction)(message) ? message.apply(void 0, args) : message;
  };
}

/***/ }),
/* 27 */
/*!****************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/utils/format/unit.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.addUnit = addUnit;exports.unitToPx = unitToPx;var _ = __webpack_require__(/*! .. */ 17);
var _number = __webpack_require__(/*! ../validate/number */ 28);
function addUnit(value) {
  if (!(0, _.isDef)(value)) {
    return undefined;
  }

  value = String(value);
  return (0, _number.isNumeric)(value) ? value + "px" : value;
} // cache

var rootFontSize;

function getRootFontSize() {
  if (!rootFontSize) {
    var doc = document.documentElement;
    var fontSize = doc.style.fontSize || window.getComputedStyle(doc).fontSize;
    rootFontSize = parseFloat(fontSize);
  }

  return rootFontSize;
}

function convertRem(value) {
  value = value.replace(/rem/g, '');
  return +value * getRootFontSize();
}

function convertVw(value) {
  value = value.replace(/vw/g, '');
  return +value * window.innerWidth / 100;
}

function convertVh(value) {
  value = value.replace(/vh/g, '');
  return +value * window.innerHeight / 100;
}

function unitToPx(value) {
  if (typeof value === 'number') {
    return value;
  }

  if (_.inBrowser) {
    if (value.indexOf('rem') !== -1) {
      return convertRem(value);
    }

    if (value.indexOf('vw') !== -1) {
      return convertVw(value);
    }

    if (value.indexOf('vh') !== -1) {
      return convertVh(value);
    }
  }

  return parseFloat(value);
}

/***/ }),
/* 28 */
/*!********************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/utils/validate/number.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.isNumeric = isNumeric;exports.isNaN = isNaN;function isNumeric(val) {
  return /^\d+(\.\d+)?$/.test(val);
}
function isNaN(val) {
  if (Number.isNaN) {
    return Number.isNaN(val);
  } // eslint-disable-next-line no-self-compare


  return val !== val;
}

/***/ }),
/* 29 */
/*!***************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/utils/functional.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.inherit = inherit;exports.emit = emit;exports.mount = mount;var _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/esm/extends */ 15));
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
var inheritKey = ['ref', 'style', 'class', 'attrs', 'refInFor', 'nativeOn', 'directives', 'staticClass', 'staticStyle'];
var mapInheritKey = {
  nativeOn: 'on' };
// inherit partial context, map nativeOn to on

function inherit(context, inheritListeners) {
  var result = inheritKey.reduce(function (obj, key) {
    if (context.data[key]) {
      obj[mapInheritKey[key] || key] = context.data[key];
    }

    return obj;
  }, {});

  if (inheritListeners) {
    result.on = result.on || {};

    (0, _extends2.default)(result.on, context.data.on);
  }

  return result;
} // emit event

function emit(context, eventName) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  var listeners = context.listeners[eventName];

  if (listeners) {
    if (Array.isArray(listeners)) {
      listeners.forEach(function (listener) {
        listener.apply(void 0, args);
      });
    } else {
      listeners.apply(void 0, args);
    }
  }
} // mount functional component

function mount(Component, data) {
  var instance = new _vue.default({
    el: document.createElement('div'),
    props: Component.props,
    render: function render(h) {
      return h(Component, (0, _extends2.default)({
        props: this.$props },
      data));
    } });

  document.body.appendChild(instance.$el);
  return instance;
}

/***/ }),
/* 30 */
/*!*****************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/mixins/popup/index.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.PopupMixin = PopupMixin;exports.popupMixinProps = void 0;
var _context = __webpack_require__(/*! ./context */ 31);
var _overlay = __webpack_require__(/*! ./overlay */ 32);

var _event = __webpack_require__(/*! ../../utils/dom/event */ 34);
var _node = __webpack_require__(/*! ../../utils/dom/node */ 35);
var _scroll = __webpack_require__(/*! ../../utils/dom/scroll */ 36);

var _touch = __webpack_require__(/*! ../touch */ 37);
var _portal = __webpack_require__(/*! ../portal */ 38);
var _closeOnPopstate = __webpack_require__(/*! ../close-on-popstate */ 39); // Context
// Utils
// Mixins
var popupMixinProps = { // Initial rendering animation
  transitionAppear: Boolean, // whether to show popup
  value: Boolean,
  // whether to show overlay
  overlay: Boolean,
  // overlay custom style
  overlayStyle: Object,
  // overlay custom class name
  overlayClass: String,
  // whether to close popup when overlay is clicked
  closeOnClickOverlay: Boolean,
  // z-index
  zIndex: [Number, String],
  // prevent body scroll
  lockScroll: {
    type: Boolean,
    default: true },

  // whether to lazy render
  lazyRender: {
    type: Boolean,
    default: true } };exports.popupMixinProps = popupMixinProps;


function PopupMixin(options) {
  if (options === void 0) {
    options = {};
  }

  return {
    mixins: [_touch.TouchMixin, _closeOnPopstate.CloseOnPopstateMixin, (0, _portal.PortalMixin)({
      afterPortal: function afterPortal() {
        if (this.overlay) {
          (0, _overlay.updateOverlay)();
        }
      } })],

    props: popupMixinProps,
    data: function data() {
      return {
        inited: this.value };

    },
    computed: {
      shouldRender: function shouldRender() {
        return this.inited || !this.lazyRender;
      } },

    watch: {
      value: function value(val) {
        var type = val ? 'open' : 'close';
        this.inited = this.inited || this.value;
        this[type]();

        if (!options.skipToggleEvent) {
          this.$emit(type);
        }
      },
      overlay: 'renderOverlay' },

    mounted: function mounted() {
      if (this.value) {
        this.open();
      }
    },

    /* istanbul ignore next */
    activated: function activated() {
      if (this.shouldReopen) {
        this.$emit('input', true);
        this.shouldReopen = false;
      }
    },
    beforeDestroy: function beforeDestroy() {
      (0, _overlay.removeOverlay)(this);

      if (this.opened) {
        this.removeLock();
      }

      if (this.getContainer) {
        (0, _node.removeNode)(this.$el);
      }
    },

    /* istanbul ignore next */
    deactivated: function deactivated() {
      if (this.value) {
        this.close();
        this.shouldReopen = true;
      }
    },
    methods: {
      open: function open() {
        /* istanbul ignore next */
        if (this.$isServer || this.opened) {
          return;
        } // cover default zIndex


        if (this.zIndex !== undefined) {
          _context.context.zIndex = this.zIndex;
        }

        this.opened = true;
        this.renderOverlay();
        this.addLock();
      },
      addLock: function addLock() {
        if (this.lockScroll) {
          (0, _event.on)(document, 'touchstart', this.touchStart);
          (0, _event.on)(document, 'touchmove', this.onTouchMove);

          if (!_context.context.lockCount) {
            document.body.classList.add('van-overflow-hidden');
          }

          _context.context.lockCount++;
        }
      },
      removeLock: function removeLock() {
        if (this.lockScroll && _context.context.lockCount) {
          _context.context.lockCount--;
          (0, _event.off)(document, 'touchstart', this.touchStart);
          (0, _event.off)(document, 'touchmove', this.onTouchMove);

          if (!_context.context.lockCount) {
            document.body.classList.remove('van-overflow-hidden');
          }
        }
      },
      close: function close() {
        if (!this.opened) {
          return;
        }

        (0, _overlay.closeOverlay)(this);
        this.opened = false;
        this.removeLock();
        this.$emit('input', false);
      },
      onTouchMove: function onTouchMove(event) {
        this.touchMove(event);
        var direction = this.deltaY > 0 ? '10' : '01';
        var el = (0, _scroll.getScroller)(event.target, this.$el);
        var scrollHeight = el.scrollHeight,
        offsetHeight = el.offsetHeight,
        scrollTop = el.scrollTop;
        var status = '11';
        /* istanbul ignore next */

        if (scrollTop === 0) {
          status = offsetHeight >= scrollHeight ? '00' : '01';
        } else if (scrollTop + offsetHeight >= scrollHeight) {
          status = '10';
        }
        /* istanbul ignore next */


        if (status !== '11' && this.direction === 'vertical' && !(parseInt(status, 2) & parseInt(direction, 2))) {
          (0, _event.preventDefault)(event, true);
        }
      },
      renderOverlay: function renderOverlay() {
        var _this = this;

        if (this.$isServer || !this.value) {
          return;
        }

        this.$nextTick(function () {
          _this.updateZIndex(_this.overlay ? 1 : 0);

          if (_this.overlay) {
            (0, _overlay.openOverlay)(_this, {
              zIndex: _context.context.zIndex++,
              duration: _this.duration,
              className: _this.overlayClass,
              customStyle: _this.overlayStyle });

          } else {
            (0, _overlay.closeOverlay)(_this);
          }
        });
      },
      updateZIndex: function updateZIndex(value) {
        if (value === void 0) {
          value = 0;
        }

        this.$el.style.zIndex = ++_context.context.zIndex + value;
      } } };


}

/***/ }),
/* 31 */
/*!*******************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/mixins/popup/context.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.context = void 0;var context = {
  zIndex: 2000,
  lockCount: 0,
  stack: [],
  find: function find(vm) {
    return this.stack.filter(function (item) {
      return item.vm === vm;
    })[0];
  } };exports.context = context;

/***/ }),
/* 32 */
/*!*******************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/mixins/popup/overlay.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.updateOverlay = updateOverlay;exports.openOverlay = openOverlay;exports.closeOverlay = closeOverlay;exports.removeOverlay = removeOverlay;var _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/esm/extends */ 15));
var _overlay = _interopRequireDefault(__webpack_require__(/*! ../../overlay */ 33));
var _context = __webpack_require__(/*! ./context */ 31);
var _functional = __webpack_require__(/*! ../../utils/functional */ 29);
var _node = __webpack_require__(/*! ../../utils/dom/node */ 35);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
var defaultConfig = {
  className: '',
  customStyle: {} };


function mountOverlay(vm) {
  return (0, _functional.mount)(_overlay.default, {
    on: {
      // close popup when overlay clicked & closeOnClickOverlay is true
      click: function click() {
        vm.$emit('click-overlay');

        if (vm.closeOnClickOverlay) {
          if (vm.onClickOverlay) {
            vm.onClickOverlay();
          } else {
            vm.close();
          }
        }
      } } });


}

function updateOverlay(vm) {
  var item = _context.context.find(vm);

  if (item) {
    var el = vm.$el;
    var config = item.config,
    overlay = item.overlay;

    if (el && el.parentNode) {
      el.parentNode.insertBefore(overlay.$el, el);
    }

    (0, _extends2.default)(overlay, defaultConfig, config, {
      show: true });

  }
}
function openOverlay(vm, config) {
  var item = _context.context.find(vm);

  if (item) {
    item.config = config;
  } else {
    var overlay = mountOverlay(vm);
    _context.context.stack.push({
      vm: vm,
      config: config,
      overlay: overlay });

  }

  updateOverlay(vm);
}
function closeOverlay(vm) {
  var item = _context.context.find(vm);

  if (item) {
    item.overlay.show = false;
  }
}
function removeOverlay(vm) {
  var item = _context.context.find(vm);

  if (item) {
    (0, _node.removeNode)(item.overlay.$el);
  }
}

/***/ }),
/* 33 */
/*!************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/overlay/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _babelHelperVueJsxMergeProps = _interopRequireDefault(__webpack_require__(/*! @vue/babel-helper-vue-jsx-merge-props */ 16));
var _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/esm/extends */ 15));

var _utils = __webpack_require__(/*! ../utils */ 17);
var _functional = __webpack_require__(/*! ../utils/functional */ 29);
var _event = __webpack_require__(/*! ../utils/dom/event */ 34);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // Utils
// Types
var _createNamespace = (0, _utils.createNamespace)('overlay'),
createComponent = _createNamespace[0],
bem = _createNamespace[1];

function preventTouchMove(event) {
  (0, _event.preventDefault)(event, true);
}

function Overlay(h, props, slots, ctx) {
  var style = (0, _extends2.default)({
    zIndex: props.zIndex },
  props.customStyle);

  if ((0, _utils.isDef)(props.duration)) {
    style.animationDuration = props.duration + "s";
  }

  return h("transition", {
    "attrs": {
      "name": "van-fade" } },

  [h("div", (0, _babelHelperVueJsxMergeProps.default)([{
    "directives": [{
      name: "show",
      value: props.show }],

    "style": style,
    "class": [bem(), props.className],
    "on": {
      "touchmove": props.lockScroll ? preventTouchMove : _utils.noop } },

  (0, _functional.inherit)(ctx, true)]), [slots.default == null ? void 0 : slots.default()])]);
}

Overlay.props = {
  show: Boolean,
  zIndex: [Number, String],
  duration: [Number, String],
  className: null,
  customStyle: Object,
  lockScroll: {
    type: Boolean,
    default: true } };var _default =


createComponent(Overlay);exports.default = _default;

/***/ }),
/* 34 */
/*!**************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/utils/dom/event.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.on = on;exports.off = off;exports.stopPropagation = stopPropagation;exports.preventDefault = preventDefault;exports.supportsPassive = void 0;var _ = __webpack_require__(/*! .. */ 17);
// eslint-disable-next-line import/no-mutable-exports
var supportsPassive = false;exports.supportsPassive = supportsPassive;

if (!_.isServer) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', {
      // eslint-disable-next-line getter-return
      get: function get() {
        /* istanbul ignore next */
        exports.supportsPassive = supportsPassive = true;
      } });

    window.addEventListener('test-passive', null, opts); // eslint-disable-next-line no-empty
  } catch (e) {}
}

function on(target, event, handler, passive) {
  if (passive === void 0) {
    passive = false;
  }

  if (!_.isServer) {
    target.addEventListener(event, handler, supportsPassive ? {
      capture: false,
      passive: passive } :
    false);
  }
}
function off(target, event, handler) {
  if (!_.isServer) {
    target.removeEventListener(event, handler);
  }
}
function stopPropagation(event) {
  event.stopPropagation();
}
function preventDefault(event, isStopPropagation) {
  /* istanbul ignore else */
  if (typeof event.cancelable !== 'boolean' || event.cancelable) {
    event.preventDefault();
  }

  if (isStopPropagation) {
    stopPropagation(event);
  }
}

/***/ }),
/* 35 */
/*!*************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/utils/dom/node.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.removeNode = removeNode;function removeNode(el) {
  var parent = el.parentNode;

  if (parent) {
    parent.removeChild(el);
  }
}

/***/ }),
/* 36 */
/*!***************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/utils/dom/scroll.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.getScroller = getScroller;exports.getScrollTop = getScrollTop;exports.setScrollTop = setScrollTop;exports.getRootScrollTop = getRootScrollTop;exports.setRootScrollTop = setRootScrollTop;exports.getElementTop = getElementTop;exports.getVisibleHeight = getVisibleHeight;exports.getVisibleTop = getVisibleTop;function isWindow(val) {
  return val === window;
} // get nearest scroll element
// https://github.com/youzan/vant/issues/3823


var overflowScrollReg = /scroll|auto/i;
function getScroller(el, root) {
  if (root === void 0) {
    root = window;
  }

  var node = el;

  while (node && node.tagName !== 'HTML' && node.tagName !== 'BODY' && node.nodeType === 1 && node !== root) {
    var _window$getComputedSt = window.getComputedStyle(node),
    overflowY = _window$getComputedSt.overflowY;

    if (overflowScrollReg.test(overflowY)) {
      return node;
    }

    node = node.parentNode;
  }

  return root;
}
function getScrollTop(el) {
  var top = 'scrollTop' in el ? el.scrollTop : el.pageYOffset; // iOS scroll bounce cause minus scrollTop

  return Math.max(top, 0);
}
function setScrollTop(el, value) {
  if ('scrollTop' in el) {
    el.scrollTop = value;
  } else {
    el.scrollTo(el.scrollX, value);
  }
}
function getRootScrollTop() {
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
}
function setRootScrollTop(value) {
  setScrollTop(window, value);
  setScrollTop(document.body, value);
} // get distance from element top to page top or scroller top

function getElementTop(el, scroller) {
  if (isWindow(el)) {
    return 0;
  }

  var scrollTop = scroller ? getScrollTop(scroller) : getRootScrollTop();
  return el.getBoundingClientRect().top + scrollTop;
}
function getVisibleHeight(el) {
  if (isWindow(el)) {
    return el.innerHeight;
  }

  return el.getBoundingClientRect().height;
}
function getVisibleTop(el) {
  if (isWindow(el)) {
    return 0;
  }

  return el.getBoundingClientRect().top;
}

/***/ }),
/* 37 */
/*!***********************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/mixins/touch.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.TouchMixin = void 0;var _event = __webpack_require__(/*! ../utils/dom/event */ 34);
var MIN_DISTANCE = 10;

function getDirection(x, y) {
  if (x > y && x > MIN_DISTANCE) {
    return 'horizontal';
  }

  if (y > x && y > MIN_DISTANCE) {
    return 'vertical';
  }

  return '';
}

var TouchMixin = {
  data: function data() {
    return {
      direction: '' };

  },
  methods: {
    touchStart: function touchStart(event) {
      this.resetTouchStatus();
      this.startX = event.touches[0].clientX;
      this.startY = event.touches[0].clientY;
    },
    touchMove: function touchMove(event) {
      var touch = event.touches[0];
      this.deltaX = touch.clientX - this.startX;
      this.deltaY = touch.clientY - this.startY;
      this.offsetX = Math.abs(this.deltaX);
      this.offsetY = Math.abs(this.deltaY);
      this.direction = this.direction || getDirection(this.offsetX, this.offsetY);
    },
    resetTouchStatus: function resetTouchStatus() {
      this.direction = '';
      this.deltaX = 0;
      this.deltaY = 0;
      this.offsetX = 0;
      this.offsetY = 0;
    },
    // avoid Vue 2.6 event bubble issues by manually binding events
    // https://github.com/youzan/vant/issues/3015
    bindTouchEvent: function bindTouchEvent(el) {
      var onTouchStart = this.onTouchStart,
      onTouchMove = this.onTouchMove,
      onTouchEnd = this.onTouchEnd;
      (0, _event.on)(el, 'touchstart', onTouchStart);
      (0, _event.on)(el, 'touchmove', onTouchMove);

      if (onTouchEnd) {
        (0, _event.on)(el, 'touchend', onTouchEnd);
        (0, _event.on)(el, 'touchcancel', onTouchEnd);
      }
    } } };exports.TouchMixin = TouchMixin;

/***/ }),
/* 38 */
/*!************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/mixins/portal.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.PortalMixin = PortalMixin;function getElement(selector) {
  if (typeof selector === 'string') {
    return document.querySelector(selector);
  }

  return selector();
}

function PortalMixin(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
  ref = _ref.ref,
  afterPortal = _ref.afterPortal;

  return {
    props: {
      getContainer: [String, Function] },

    watch: {
      getContainer: 'portal' },

    mounted: function mounted() {
      if (this.getContainer) {
        this.portal();
      }
    },
    methods: {
      portal: function portal() {
        var getContainer = this.getContainer;
        var el = ref ? this.$refs[ref] : this.$el;
        var container;

        if (getContainer) {
          container = getElement(getContainer);
        } else if (this.$parent) {
          container = this.$parent.$el;
        }

        if (container && container !== el.parentNode) {
          container.appendChild(el);
        }

        if (afterPortal) {
          afterPortal.call(this);
        }
      } } };


}

/***/ }),
/* 39 */
/*!***********************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/mixins/close-on-popstate.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.CloseOnPopstateMixin = void 0;var _event = __webpack_require__(/*! ../utils/dom/event */ 34);
var _bindEvent = __webpack_require__(/*! ./bind-event */ 40);
var CloseOnPopstateMixin = {
  mixins: [(0, _bindEvent.BindEventMixin)(function (bind, isBind) {
    this.handlePopstate(isBind && this.closeOnPopstate);
  })],
  props: {
    closeOnPopstate: Boolean },

  data: function data() {
    return {
      bindStatus: false };

  },
  watch: {
    closeOnPopstate: function closeOnPopstate(val) {
      this.handlePopstate(val);
    } },

  methods: {
    onPopstate: function onPopstate() {
      this.close();
      this.shouldReopen = false;
    },
    handlePopstate: function handlePopstate(bind) {
      /* istanbul ignore if */
      if (this.$isServer) {
        return;
      }

      if (this.bindStatus !== bind) {
        this.bindStatus = bind;
        var action = bind ? _event.on : _event.off;
        action(window, 'popstate', this.onPopstate);
      }
    } } };exports.CloseOnPopstateMixin = CloseOnPopstateMixin;

/***/ }),
/* 40 */
/*!****************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/mixins/bind-event.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.BindEventMixin = BindEventMixin;


var _event = __webpack_require__(/*! ../utils/dom/event */ 34); /**
                                             * Bind event when mounted or activated
                                             */var uid = 0;function BindEventMixin(handler) {
  var key = "binded_" + uid++;

  function bind() {
    if (!this[key]) {
      handler.call(this, _event.on, true);
      this[key] = true;
    }
  }

  function unbind() {
    if (this[key]) {
      handler.call(this, _event.off, false);
      this[key] = false;
    }
  }

  return {
    mounted: bind,
    activated: bind,
    deactivated: unbind,
    beforeDestroy: unbind };

}

/***/ }),
/* 41 */
/*!*********************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/icon/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _babelHelperVueJsxMergeProps = _interopRequireDefault(__webpack_require__(/*! @vue/babel-helper-vue-jsx-merge-props */ 16));

var _utils = __webpack_require__(/*! ../utils */ 17);
var _functional = __webpack_require__(/*! ../utils/functional */ 29);

var _info = _interopRequireDefault(__webpack_require__(/*! ../info */ 42));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // Utils
// Components
// Types
var _createNamespace = (0, _utils.createNamespace)('icon'),createComponent = _createNamespace[0],
bem = _createNamespace[1];

function isImage(name) {
  return name ? name.indexOf('/') !== -1 : false;
} // compatible with legacy usage, should be removed in next major version


var LEGACY_MAP = {
  medel: 'medal',
  'medel-o': 'medal-o',
  'calender-o': 'calendar-o' };


function correctName(name) {
  return name && LEGACY_MAP[name] || name;
}

function Icon(h, props, slots, ctx) {
  var _props$badge;

  var name = correctName(props.name);
  var imageIcon = isImage(name);

  if ( true && props.info) {
    console.warn('[Vant] Icon: "info" prop is deprecated, use "badge" prop instead.');
  }

  return h(props.tag, (0, _babelHelperVueJsxMergeProps.default)([{
    "class": [props.classPrefix, imageIcon ? '' : props.classPrefix + "-" + name],
    "style": {
      color: props.color,
      fontSize: (0, _utils.addUnit)(props.size) } },

  (0, _functional.inherit)(ctx, true)]), [slots.default && slots.default(), imageIcon && h("img", {
    "class": bem('image'),
    "attrs": {
      "src": name } }),

  h(_info.default, {
    "attrs": {
      "dot": props.dot,
      "info": (_props$badge = props.badge) != null ? _props$badge : props.info } })]);


}

Icon.props = {
  dot: Boolean,
  name: String,
  size: [Number, String],
  // @deprecated
  // should be removed in next major version
  info: [Number, String],
  badge: [Number, String],
  color: String,
  tag: {
    type: String,
    default: 'i' },

  classPrefix: {
    type: String,
    default: bem() } };var _default =


createComponent(Icon);exports.default = _default;

/***/ }),
/* 42 */
/*!*********************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/info/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _babelHelperVueJsxMergeProps = _interopRequireDefault(__webpack_require__(/*! @vue/babel-helper-vue-jsx-merge-props */ 16));

var _utils = __webpack_require__(/*! ../utils */ 17);
var _functional = __webpack_require__(/*! ../utils/functional */ 29);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // Utils
// Types
var _createNamespace = (0, _utils.createNamespace)('info'),
createComponent = _createNamespace[0],
bem = _createNamespace[1];

function Info(h, props, slots, ctx) {
  var dot = props.dot,
  info = props.info;
  var showInfo = (0, _utils.isDef)(info) && info !== '';

  if (!dot && !showInfo) {
    return;
  }

  return h("div", (0, _babelHelperVueJsxMergeProps.default)([{
    "class": bem({
      dot: dot }) },

  (0, _functional.inherit)(ctx, true)]), [dot ? '' : props.info]);
}

Info.props = {
  dot: Boolean,
  info: [Number, String] };var _default =

createComponent(Info);exports.default = _default;

/***/ }),
/* 43 */
/*!**********************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/popup/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _utils = __webpack_require__(/*! ../utils */ 17);
var _popup = __webpack_require__(/*! ../mixins/popup */ 30);
var _icon = _interopRequireDefault(__webpack_require__(/*! ../icon */ 41));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var _createNamespace = (0, _utils.createNamespace)('popup'),
createComponent = _createNamespace[0],
bem = _createNamespace[1];var _default =

createComponent({
  mixins: [(0, _popup.PopupMixin)()],
  props: {
    round: Boolean,
    duration: [Number, String],
    closeable: Boolean,
    transition: String,
    safeAreaInsetBottom: Boolean,
    closeIcon: {
      type: String,
      default: 'cross' },

    closeIconPosition: {
      type: String,
      default: 'top-right' },

    position: {
      type: String,
      default: 'center' },

    overlay: {
      type: Boolean,
      default: true },

    closeOnClickOverlay: {
      type: Boolean,
      default: true } },


  beforeCreate: function beforeCreate() {
    var _this = this;

    var createEmitter = function createEmitter(eventName) {
      return function (event) {
        return _this.$emit(eventName, event);
      };
    };

    this.onClick = createEmitter('click');
    this.onOpened = createEmitter('opened');
    this.onClosed = createEmitter('closed');
  },
  methods: {
    onClickCloseIcon: function onClickCloseIcon(event) {
      this.$emit('click-close-icon', event);
      this.close();
    } },

  render: function render() {
    var _bem;

    var h = arguments[0];

    if (!this.shouldRender) {
      return;
    }

    var round = this.round,
    position = this.position,
    duration = this.duration;
    var isCenter = position === 'center';
    var transitionName = this.transition || (isCenter ? 'van-fade' : "van-popup-slide-" + position);
    var style = {};

    if ((0, _utils.isDef)(duration)) {
      var key = isCenter ? 'animationDuration' : 'transitionDuration';
      style[key] = duration + "s";
    }

    return h("transition", {
      "attrs": {
        "appear": this.transitionAppear,
        "name": transitionName },

      "on": {
        "afterEnter": this.onOpened,
        "afterLeave": this.onClosed } },

    [h("div", {
      "directives": [{
        name: "show",
        value: this.value }],

      "style": style,
      "class": bem((_bem = {
        round: round },
      _bem[position] = position, _bem['safe-area-inset-bottom'] = this.safeAreaInsetBottom, _bem)),
      "on": {
        "click": this.onClick } },

    [this.slots(), this.closeable && h(_icon.default, {
      "attrs": {
        "role": "button",
        "tabindex": "0",
        "name": this.closeIcon },

      "class": bem('close-icon', this.closeIconPosition),
      "on": {
        "click": this.onClickCloseIcon } })])]);


  } });exports.default = _default;

/***/ }),
/* 44 */
/*!************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/loading/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _babelHelperVueJsxMergeProps = _interopRequireDefault(__webpack_require__(/*! @vue/babel-helper-vue-jsx-merge-props */ 16));

var _utils = __webpack_require__(/*! ../utils */ 17);
var _functional = __webpack_require__(/*! ../utils/functional */ 29);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // Utils
// Types
var _createNamespace = (0, _utils.createNamespace)('loading'),
createComponent = _createNamespace[0],
bem = _createNamespace[1];

function LoadingIcon(h, props) {
  if (props.type === 'spinner') {
    var Spin = [];

    for (var i = 0; i < 12; i++) {
      Spin.push(h("i"));
    }

    return Spin;
  }

  return h("svg", {
    "class": bem('circular'),
    "attrs": {
      "viewBox": "25 25 50 50" } },

  [h("circle", {
    "attrs": {
      "cx": "50",
      "cy": "50",
      "r": "20",
      "fill": "none" } })]);


}

function LoadingText(h, props, slots) {
  if (slots.default) {
    var _props$textColor;

    var style = {
      fontSize: (0, _utils.addUnit)(props.textSize),
      color: (_props$textColor = props.textColor) != null ? _props$textColor : props.color };

    return h("span", {
      "class": bem('text'),
      "style": style },
    [slots.default()]);
  }
}

function Loading(h, props, slots, ctx) {
  var color = props.color,
  size = props.size,
  type = props.type;
  var style = {
    color: color };


  if (size) {
    var iconSize = (0, _utils.addUnit)(size);
    style.width = iconSize;
    style.height = iconSize;
  }

  return h("div", (0, _babelHelperVueJsxMergeProps.default)([{
    "class": bem([type, {
      vertical: props.vertical }]) },

  (0, _functional.inherit)(ctx, true)]), [h("span", {
    "class": bem('spinner', type),
    "style": style },
  [LoadingIcon(h, props)]), LoadingText(h, props, slots)]);
}

Loading.props = {
  color: String,
  size: [Number, String],
  vertical: Boolean,
  textSize: [Number, String],
  textColor: String,
  type: {
    type: String,
    default: 'circular' } };var _default =


createComponent(Loading);exports.default = _default;

/***/ }),
/* 45 */
/*!*****************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/address-edit/index.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/esm/extends */ 15));

var _utils = __webpack_require__(/*! ../utils */ 17);
var _mobile = __webpack_require__(/*! ../utils/validate/mobile */ 46);

var _area = _interopRequireDefault(__webpack_require__(/*! ../area */ 47));
var _cell = _interopRequireDefault(__webpack_require__(/*! ../cell */ 54));
var _field = _interopRequireDefault(__webpack_require__(/*! ../field */ 57));
var _popup = _interopRequireDefault(__webpack_require__(/*! ../popup */ 43));
var _toast = _interopRequireDefault(__webpack_require__(/*! ../toast */ 60));
var _button = _interopRequireDefault(__webpack_require__(/*! ../button */ 63));
var _dialog = _interopRequireDefault(__webpack_require__(/*! ../dialog */ 64));
var _Detail = _interopRequireDefault(__webpack_require__(/*! ./Detail */ 70));
var _switch = _interopRequireDefault(__webpack_require__(/*! ../switch */ 71));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // Utils
// Components
var _createNamespace = (0, _utils.createNamespace)('address-edit'),
createComponent = _createNamespace[0],
bem = _createNamespace[1],
t = _createNamespace[2];

var defaultData = {
  name: '',
  tel: '',
  country: '',
  province: '',
  city: '',
  county: '',
  areaCode: '',
  postalCode: '',
  addressDetail: '',
  isDefault: false };


function isPostal(value) {
  return /^\d{6}$/.test(value);
}var _default2 =

createComponent({
  props: {
    areaList: Object,
    isSaving: Boolean,
    isDeleting: Boolean,
    validator: Function,
    showDelete: Boolean,
    showPostal: Boolean,
    searchResult: Array,
    telMaxlength: [Number, String],
    showSetDefault: Boolean,
    saveButtonText: String,
    areaPlaceholder: String,
    deleteButtonText: String,
    showSearchResult: Boolean,
    showArea: {
      type: Boolean,
      default: true },

    showDetail: {
      type: Boolean,
      default: true },

    disableArea: Boolean,
    detailRows: {
      type: [Number, String],
      default: 1 },

    detailMaxlength: {
      type: [Number, String],
      default: 200 },

    addressInfo: {
      type: Object,
      default: function _default() {
        return (0, _extends2.default)({}, defaultData);
      } },

    telValidator: {
      type: Function,
      default: _mobile.isMobile },

    postalValidator: {
      type: Function,
      default: isPostal },

    areaColumnsPlaceholder: {
      type: Array,
      default: function _default() {
        return [];
      } } },


  data: function data() {
    return {
      data: {},
      showAreaPopup: false,
      detailFocused: false,
      errorInfo: {
        tel: '',
        name: '',
        areaCode: '',
        postalCode: '',
        addressDetail: '' } };


  },
  computed: {
    areaListLoaded: function areaListLoaded() {
      return (0, _utils.isObject)(this.areaList) && Object.keys(this.areaList).length;
    },
    areaText: function areaText() {
      var _this$data = this.data,
      country = _this$data.country,
      province = _this$data.province,
      city = _this$data.city,
      county = _this$data.county,
      areaCode = _this$data.areaCode;

      if (areaCode) {
        var arr = [country, province, city, county];

        if (province && province === city) {
          arr.splice(1, 1);
        }

        return arr.filter(function (text) {
          return text;
        }).join('/');
      }

      return '';
    },
    // hide bottom field when use search && detail get focused
    hideBottomFields: function hideBottomFields() {
      var searchResult = this.searchResult;
      return searchResult && searchResult.length && this.detailFocused;
    } },

  watch: {
    addressInfo: {
      handler: function handler(val) {
        this.data = (0, _extends2.default)({}, defaultData, val);
        this.setAreaCode(val.areaCode);
      },
      deep: true,
      immediate: true },

    areaList: function areaList() {
      this.setAreaCode(this.data.areaCode);
    } },

  methods: {
    onFocus: function onFocus(key) {
      this.errorInfo[key] = '';
      this.detailFocused = key === 'addressDetail';
      this.$emit('focus', key);
    },
    onChangeDetail: function onChangeDetail(val) {
      this.data.addressDetail = val;
      this.$emit('change-detail', val);
    },
    onAreaConfirm: function onAreaConfirm(values) {
      values = values.filter(function (value) {
        return !!value;
      });

      if (values.some(function (value) {
        return !value.code;
      })) {
        (0, _toast.default)(t('areaEmpty'));
        return;
      }

      this.showAreaPopup = false;
      this.assignAreaValues();
      this.$emit('change-area', values);
    },
    assignAreaValues: function assignAreaValues() {
      var area = this.$refs.area;

      if (area) {
        var detail = area.getArea();
        detail.areaCode = detail.code;
        delete detail.code;

        (0, _extends2.default)(this.data, detail);
      }
    },
    onSave: function onSave() {
      var _this = this;

      var items = ['name', 'tel'];

      if (this.showArea) {
        items.push('areaCode');
      }

      if (this.showDetail) {
        items.push('addressDetail');
      }

      if (this.showPostal) {
        items.push('postalCode');
      }

      var isValid = items.every(function (item) {
        var msg = _this.getErrorMessage(item);

        if (msg) {
          _this.errorInfo[item] = msg;
        }

        return !msg;
      });

      if (isValid && !this.isSaving) {
        this.$emit('save', this.data);
      }
    },
    getErrorMessage: function getErrorMessage(key) {
      var value = String(this.data[key] || '').trim();

      if (this.validator) {
        var message = this.validator(key, value);

        if (message) {
          return message;
        }
      }

      switch (key) {
        case 'name':
          return value ? '' : t('nameEmpty');

        case 'tel':
          return this.telValidator(value) ? '' : t('telInvalid');

        case 'areaCode':
          return value ? '' : t('areaEmpty');

        case 'addressDetail':
          return value ? '' : t('addressEmpty');

        case 'postalCode':
          return value && !this.postalValidator(value) ? t('postalEmpty') : '';}

    },
    onDelete: function onDelete() {
      var _this2 = this;

      _dialog.default.confirm({
        title: t('confirmDelete') }).
      then(function () {
        _this2.$emit('delete', _this2.data);
      }).catch(function () {
        _this2.$emit('cancel-delete', _this2.data);
      });
    },
    // get values of area component
    getArea: function getArea() {
      return this.$refs.area ? this.$refs.area.getValues() : [];
    },
    // set area code to area component
    setAreaCode: function setAreaCode(code) {
      this.data.areaCode = code || '';

      if (code) {
        this.$nextTick(this.assignAreaValues);
      }
    },
    // @exposed-api
    setAddressDetail: function setAddressDetail(value) {
      this.data.addressDetail = value;
    },
    onDetailBlur: function onDetailBlur() {
      var _this3 = this;

      // await for click search event
      setTimeout(function () {
        _this3.detailFocused = false;
      });
    },
    genSetDefaultCell: function genSetDefaultCell(h) {
      var _this4 = this;

      if (this.showSetDefault) {
        var slots = {
          'right-icon': function rightIcon() {
            return h(_switch.default, {
              "attrs": {
                "size": "24" },

              "on": {
                "change": function change(event) {
                  _this4.$emit('change-default', event);
                } },

              "model": {
                value: _this4.data.isDefault,
                callback: function callback($$v) {
                  _this4.$set(_this4.data, "isDefault", $$v);
                } } });


          } };

        return h(_cell.default, {
          "directives": [{
            name: "show",
            value: !this.hideBottomFields }],

          "attrs": {
            "center": true,
            "title": t('defaultAddress') },

          "class": bem('default'),
          "scopedSlots": slots });

      }

      return h();
    } },

  render: function render(h) {
    var _this5 = this;

    var data = this.data,
    errorInfo = this.errorInfo,
    disableArea = this.disableArea,
    hideBottomFields = this.hideBottomFields;

    var onFocus = function onFocus(name) {
      return function () {
        return _this5.onFocus(name);
      };
    };

    return h("div", {
      "class": bem() },
    [h("div", {
      "class": bem('fields') },
    [h(_field.default, {
      "attrs": {
        "clearable": true,
        "label": t('name'),
        "placeholder": t('namePlaceholder'),
        "errorMessage": errorInfo.name },

      "on": {
        "focus": onFocus('name') },

      "model": {
        value: data.name,
        callback: function callback($$v) {
          _this5.$set(data, "name", $$v);
        } } }),

    h(_field.default, {
      "attrs": {
        "clearable": true,
        "type": "tel",
        "label": t('tel'),
        "maxlength": this.telMaxlength,
        "placeholder": t('telPlaceholder'),
        "errorMessage": errorInfo.tel },

      "on": {
        "focus": onFocus('tel') },

      "model": {
        value: data.tel,
        callback: function callback($$v) {
          _this5.$set(data, "tel", $$v);
        } } }),

    h(_field.default, {
      "directives": [{
        name: "show",
        value: this.showArea }],

      "attrs": {
        "readonly": true,
        "clickable": !disableArea,
        "label": t('area'),
        "placeholder": this.areaPlaceholder || t('areaPlaceholder'),
        "errorMessage": errorInfo.areaCode,
        "rightIcon": !disableArea ? 'arrow' : null,
        "value": this.areaText },

      "on": {
        "focus": onFocus('areaCode'),
        "click": function click() {
          _this5.$emit('click-area');

          _this5.showAreaPopup = !disableArea;
        } } }),

    h(_Detail.default, {
      "directives": [{
        name: "show",
        value: this.showDetail }],

      "attrs": {
        "focused": this.detailFocused,
        "value": data.addressDetail,
        "errorMessage": errorInfo.addressDetail,
        "detailRows": this.detailRows,
        "detailMaxlength": this.detailMaxlength,
        "searchResult": this.searchResult,
        "showSearchResult": this.showSearchResult },

      "on": {
        "focus": onFocus('addressDetail'),
        "blur": this.onDetailBlur,
        "input": this.onChangeDetail,
        "select-search": function selectSearch(event) {
          _this5.$emit('select-search', event);
        } } }),

    this.showPostal && h(_field.default, {
      "directives": [{
        name: "show",
        value: !hideBottomFields }],

      "attrs": {
        "type": "tel",
        "maxlength": "6",
        "label": t('postal'),
        "placeholder": t('postal'),
        "errorMessage": errorInfo.postalCode },

      "on": {
        "focus": onFocus('postalCode') },

      "model": {
        value: data.postalCode,
        callback: function callback($$v) {
          _this5.$set(data, "postalCode", $$v);
        } } }),

    this.slots()]), this.genSetDefaultCell(h), h("div", {
      "directives": [{
        name: "show",
        value: !hideBottomFields }],

      "class": bem('buttons') },
    [h(_button.default, {
      "attrs": {
        "block": true,
        "round": true,
        "loading": this.isSaving,
        "type": "danger",
        "text": this.saveButtonText || t('save') },

      "on": {
        "click": this.onSave } }),

    this.showDelete && h(_button.default, {
      "attrs": {
        "block": true,
        "round": true,
        "loading": this.isDeleting,
        "text": this.deleteButtonText || t('delete') },

      "on": {
        "click": this.onDelete } })]),

    h(_popup.default, {
      "attrs": {
        "round": true,
        "position": "bottom",
        "lazyRender": false,
        "getContainer": "body" },

      "model": {
        value: _this5.showAreaPopup,
        callback: function callback($$v) {
          _this5.showAreaPopup = $$v;
        } } },

    [h(_area.default, {
      "ref": "area",
      "attrs": {
        "value": data.areaCode,
        "loading": !this.areaListLoaded,
        "areaList": this.areaList,
        "columnsPlaceholder": this.areaColumnsPlaceholder },

      "on": {
        "confirm": this.onAreaConfirm,
        "cancel": function cancel() {
          _this5.showAreaPopup = false;
        } } })])]);


  } });exports.default = _default2;

/***/ }),
/* 46 */
/*!********************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/utils/validate/mobile.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.isMobile = isMobile;function isMobile(value) {
  value = value.replace(/[^-|\d]/g, '');
  return /^((\+86)|(86))?(1)\d{10}$/.test(value) || /^0[0-9-]{10,13}$/.test(value);
}

/***/ }),
/* 47 */
/*!*********************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/area/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/esm/extends */ 15));
var _utils = __webpack_require__(/*! ../utils */ 17);
var _shared = __webpack_require__(/*! ../picker/shared */ 48);
var _picker = _interopRequireDefault(__webpack_require__(/*! ../picker */ 49));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var _createNamespace = (0, _utils.createNamespace)('area'),
createComponent = _createNamespace[0],
bem = _createNamespace[1];

var PLACEHOLDER_CODE = '000000';

function isOverseaCode(code) {
  return code[0] === '9';
}

function pickSlots(instance, keys) {
  var $slots = instance.$slots,
  $scopedSlots = instance.$scopedSlots;
  var scopedSlots = {};
  keys.forEach(function (key) {
    if ($scopedSlots[key]) {
      scopedSlots[key] = $scopedSlots[key];
    } else if ($slots[key]) {
      scopedSlots[key] = function () {
        return $slots[key];
      };
    }
  });
  return scopedSlots;
}var _default2 =

createComponent({
  props: (0, _extends2.default)({}, _shared.pickerProps, {
    value: String,
    areaList: {
      type: Object,
      default: function _default() {
        return {};
      } },

    columnsNum: {
      type: [Number, String],
      default: 3 },

    isOverseaCode: {
      type: Function,
      default: isOverseaCode },

    columnsPlaceholder: {
      type: Array,
      default: function _default() {
        return [];
      } } }),


  data: function data() {
    return {
      code: this.value,
      columns: [{
        values: [] },
      {
        values: [] },
      {
        values: [] }] };


  },
  computed: {
    province: function province() {
      return this.areaList.province_list || {};
    },
    city: function city() {
      return this.areaList.city_list || {};
    },
    county: function county() {
      return this.areaList.county_list || {};
    },
    displayColumns: function displayColumns() {
      return this.columns.slice(0, +this.columnsNum);
    },
    placeholderMap: function placeholderMap() {
      return {
        province: this.columnsPlaceholder[0] || '',
        city: this.columnsPlaceholder[1] || '',
        county: this.columnsPlaceholder[2] || '' };

    } },

  watch: {
    value: function value(val) {
      this.code = val;
      this.setValues();
    },
    areaList: {
      deep: true,
      handler: 'setValues' },

    columnsNum: function columnsNum() {
      var _this = this;

      this.$nextTick(function () {
        _this.setValues();
      });
    } },

  mounted: function mounted() {
    this.setValues();
  },
  methods: {
    // get list by code
    getList: function getList(type, code) {
      var result = [];

      if (type !== 'province' && !code) {
        return result;
      }

      var list = this[type];
      result = Object.keys(list).map(function (listCode) {
        return {
          code: listCode,
          name: list[listCode] };

      });

      if (code) {
        // oversea code
        if (this.isOverseaCode(code) && type === 'city') {
          code = '9';
        }

        result = result.filter(function (item) {
          return item.code.indexOf(code) === 0;
        });
      }

      if (this.placeholderMap[type] && result.length) {
        // set columns placeholder
        var codeFill = '';

        if (type === 'city') {
          codeFill = PLACEHOLDER_CODE.slice(2, 4);
        } else if (type === 'county') {
          codeFill = PLACEHOLDER_CODE.slice(4, 6);
        }

        result.unshift({
          code: "" + code + codeFill,
          name: this.placeholderMap[type] });

      }

      return result;
    },
    // get index by code
    getIndex: function getIndex(type, code) {
      var compareNum = type === 'province' ? 2 : type === 'city' ? 4 : 6;
      var list = this.getList(type, code.slice(0, compareNum - 2)); // oversea code

      if (this.isOverseaCode(code) && type === 'province') {
        compareNum = 1;
      }

      code = code.slice(0, compareNum);

      for (var i = 0; i < list.length; i++) {
        if (list[i].code.slice(0, compareNum) === code) {
          return i;
        }
      }

      return 0;
    },
    // parse output columns data
    parseOutputValues: function parseOutputValues(values) {
      var _this2 = this;

      return values.map(function (value, index) {
        // save undefined value
        if (!value) return value;
        value = JSON.parse(JSON.stringify(value));

        if (!value.code || value.name === _this2.columnsPlaceholder[index]) {
          value.code = '';
          value.name = '';
        }

        return value;
      });
    },
    onChange: function onChange(picker, values, index) {
      this.code = values[index].code;
      this.setValues();
      var parsedValues = this.parseOutputValues(picker.getValues());
      this.$emit('change', picker, parsedValues, index);
    },
    onConfirm: function onConfirm(values, index) {
      values = this.parseOutputValues(values);
      this.setValues();
      this.$emit('confirm', values, index);
    },
    getDefaultCode: function getDefaultCode() {
      if (this.columnsPlaceholder.length) {
        return PLACEHOLDER_CODE;
      }

      var countyCodes = Object.keys(this.county);

      if (countyCodes[0]) {
        return countyCodes[0];
      }

      var cityCodes = Object.keys(this.city);

      if (cityCodes[0]) {
        return cityCodes[0];
      }

      return '';
    },
    setValues: function setValues() {
      var code = this.code;

      if (!code) {
        code = this.getDefaultCode();
      }

      var picker = this.$refs.picker;
      var province = this.getList('province');
      var city = this.getList('city', code.slice(0, 2));

      if (!picker) {
        return;
      }

      picker.setColumnValues(0, province);
      picker.setColumnValues(1, city);

      if (city.length && code.slice(2, 4) === '00' && !this.isOverseaCode(code)) {
        code = city[0].code;
      }

      picker.setColumnValues(2, this.getList('county', code.slice(0, 4)));
      picker.setIndexes([this.getIndex('province', code), this.getIndex('city', code), this.getIndex('county', code)]);
    },
    getValues: function getValues() {
      var picker = this.$refs.picker;
      var getValues = picker ? picker.getValues().filter(function (value) {
        return !!value;
      }) : [];
      getValues = this.parseOutputValues(getValues);
      return getValues;
    },
    getArea: function getArea() {
      var values = this.getValues();
      var area = {
        code: '',
        country: '',
        province: '',
        city: '',
        county: '' };


      if (!values.length) {
        return area;
      }

      var names = values.map(function (item) {
        return item.name;
      });
      var validValues = values.filter(function (value) {
        return !!value.code;
      });
      area.code = validValues.length ? validValues[validValues.length - 1].code : '';

      if (this.isOverseaCode(area.code)) {
        area.country = names[1] || '';
        area.province = names[2] || '';
      } else {
        area.province = names[0] || '';
        area.city = names[1] || '';
        area.county = names[2] || '';
      }

      return area;
    },
    // @exposed-api
    reset: function reset(code) {
      this.code = code || '';
      this.setValues();
    } },

  render: function render() {
    var h = arguments[0];

    var on = (0, _extends2.default)({}, this.$listeners, {
      change: this.onChange,
      confirm: this.onConfirm });


    return h(_picker.default, {
      "ref": "picker",
      "class": bem(),
      "attrs": {
        "showToolbar": true,
        "valueKey": "name",
        "title": this.title,
        "columns": this.displayColumns,
        "loading": this.loading,
        "readonly": this.readonly,
        "itemHeight": this.itemHeight,
        "swipeDuration": this.swipeDuration,
        "visibleItemCount": this.visibleItemCount,
        "cancelButtonText": this.cancelButtonText,
        "confirmButtonText": this.confirmButtonText },

      "scopedSlots": pickSlots(this, ['title', 'columns-top', 'columns-bottom']),
      "on": (0, _extends2.default)({}, on) });

  } });exports.default = _default2;

/***/ }),
/* 48 */
/*!************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/picker/shared.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.pickerProps = exports.DEFAULT_ITEM_HEIGHT = void 0;var DEFAULT_ITEM_HEIGHT = 44;exports.DEFAULT_ITEM_HEIGHT = DEFAULT_ITEM_HEIGHT;
var pickerProps = {
  title: String,
  loading: Boolean,
  readonly: Boolean,
  itemHeight: [Number, String],
  showToolbar: Boolean,
  cancelButtonText: String,
  confirmButtonText: String,
  allowHtml: {
    type: Boolean,
    default: true },

  visibleItemCount: {
    type: [Number, String],
    default: 6 },

  swipeDuration: {
    type: [Number, String],
    default: 1000 } };exports.pickerProps = pickerProps;

/***/ }),
/* 49 */
/*!***********************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/picker/index.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/esm/extends */ 15));

var _utils = __webpack_require__(/*! ../utils */ 17);
var _event = __webpack_require__(/*! ../utils/dom/event */ 34);
var _constant = __webpack_require__(/*! ../utils/constant */ 50);
var _shared = __webpack_require__(/*! ./shared */ 48);
var _unit = __webpack_require__(/*! ../utils/format/unit */ 27);

var _loading = _interopRequireDefault(__webpack_require__(/*! ../loading */ 44));
var _PickerColumn = _interopRequireDefault(__webpack_require__(/*! ./PickerColumn */ 51));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // Utils
// Components
var _createNamespace = (0, _utils.createNamespace)('picker'),
createComponent = _createNamespace[0],
bem = _createNamespace[1],
t = _createNamespace[2];var _default2 =

createComponent({
  props: (0, _extends2.default)({}, _shared.pickerProps, {
    defaultIndex: {
      type: [Number, String],
      default: 0 },

    columns: {
      type: Array,
      default: function _default() {
        return [];
      } },

    toolbarPosition: {
      type: String,
      default: 'top' },

    valueKey: {
      type: String,
      default: 'text' } }),


  data: function data() {
    return {
      children: [],
      formattedColumns: [] };

  },
  computed: {
    itemPxHeight: function itemPxHeight() {
      return this.itemHeight ? (0, _unit.unitToPx)(this.itemHeight) : _shared.DEFAULT_ITEM_HEIGHT;
    },
    dataType: function dataType() {
      var columns = this.columns;
      var firstColumn = columns[0] || {};

      if (firstColumn.children) {
        return 'cascade';
      }

      if (firstColumn.values) {
        return 'object';
      }

      return 'text';
    } },

  watch: {
    columns: {
      handler: 'format',
      immediate: true } },


  methods: {
    format: function format() {
      var columns = this.columns,
      dataType = this.dataType;

      if (dataType === 'text') {
        this.formattedColumns = [{
          values: columns }];

      } else if (dataType === 'cascade') {
        this.formatCascade();
      } else {
        this.formattedColumns = columns;
      }
    },
    formatCascade: function formatCascade() {
      var formatted = [];
      var cursor = {
        children: this.columns };


      while (cursor && cursor.children) {
        var _cursor$defaultIndex;

        var _cursor = cursor,
        children = _cursor.children;
        var defaultIndex = (_cursor$defaultIndex = cursor.defaultIndex) != null ? _cursor$defaultIndex : +this.defaultIndex;

        while (children[defaultIndex] && children[defaultIndex].disabled) {
          if (defaultIndex < children.length - 1) {
            defaultIndex++;
          } else {
            defaultIndex = 0;
            break;
          }
        }

        formatted.push({
          values: cursor.children,
          className: cursor.className,
          defaultIndex: defaultIndex });

        cursor = children[defaultIndex];
      }

      this.formattedColumns = formatted;
    },
    emit: function emit(event) {
      var _this = this;

      if (this.dataType === 'text') {
        this.$emit(event, this.getColumnValue(0), this.getColumnIndex(0));
      } else {
        var values = this.getValues(); // compatible with old version of wrong parameters
        // should be removed in next major version
        // see: https://github.com/youzan/vant/issues/5905

        if (this.dataType === 'cascade') {
          values = values.map(function (item) {
            return item[_this.valueKey];
          });
        }

        this.$emit(event, values, this.getIndexes());
      }
    },
    onCascadeChange: function onCascadeChange(columnIndex) {
      var cursor = {
        children: this.columns };

      var indexes = this.getIndexes();

      for (var i = 0; i <= columnIndex; i++) {
        cursor = cursor.children[indexes[i]];
      }

      while (cursor && cursor.children) {
        columnIndex++;
        this.setColumnValues(columnIndex, cursor.children);
        cursor = cursor.children[cursor.defaultIndex || 0];
      }
    },
    onChange: function onChange(columnIndex) {
      var _this2 = this;

      if (this.dataType === 'cascade') {
        this.onCascadeChange(columnIndex);
      }

      if (this.dataType === 'text') {
        this.$emit('change', this, this.getColumnValue(0), this.getColumnIndex(0));
      } else {
        var values = this.getValues(); // compatible with old version of wrong parameters
        // should be removed in next major version
        // see: https://github.com/youzan/vant/issues/5905

        if (this.dataType === 'cascade') {
          values = values.map(function (item) {
            return item[_this2.valueKey];
          });
        }

        this.$emit('change', this, values, columnIndex);
      }
    },
    // get column instance by index
    getColumn: function getColumn(index) {
      return this.children[index];
    },
    // @exposed-api
    // get column value by index
    getColumnValue: function getColumnValue(index) {
      var column = this.getColumn(index);
      return column && column.getValue();
    },
    // @exposed-api
    // set column value by index
    setColumnValue: function setColumnValue(index, value) {
      var column = this.getColumn(index);

      if (column) {
        column.setValue(value);

        if (this.dataType === 'cascade') {
          this.onCascadeChange(index);
        }
      }
    },
    // @exposed-api
    // get column option index by column index
    getColumnIndex: function getColumnIndex(columnIndex) {
      return (this.getColumn(columnIndex) || {}).currentIndex;
    },
    // @exposed-api
    // set column option index by column index
    setColumnIndex: function setColumnIndex(columnIndex, optionIndex) {
      var column = this.getColumn(columnIndex);

      if (column) {
        column.setIndex(optionIndex);

        if (this.dataType === 'cascade') {
          this.onCascadeChange(columnIndex);
        }
      }
    },
    // @exposed-api
    // get options of column by index
    getColumnValues: function getColumnValues(index) {
      return (this.children[index] || {}).options;
    },
    // @exposed-api
    // set options of column by index
    setColumnValues: function setColumnValues(index, options) {
      var column = this.children[index];

      if (column) {
        column.setOptions(options);
      }
    },
    // @exposed-api
    // get values of all columns
    getValues: function getValues() {
      return this.children.map(function (child) {
        return child.getValue();
      });
    },
    // @exposed-api
    // set values of all columns
    setValues: function setValues(values) {
      var _this3 = this;

      values.forEach(function (value, index) {
        _this3.setColumnValue(index, value);
      });
    },
    // @exposed-api
    // get indexes of all columns
    getIndexes: function getIndexes() {
      return this.children.map(function (child) {
        return child.currentIndex;
      });
    },
    // @exposed-api
    // set indexes of all columns
    setIndexes: function setIndexes(indexes) {
      var _this4 = this;

      indexes.forEach(function (optionIndex, columnIndex) {
        _this4.setColumnIndex(columnIndex, optionIndex);
      });
    },
    // @exposed-api
    confirm: function confirm() {
      this.children.forEach(function (child) {
        return child.stopMomentum();
      });
      this.emit('confirm');
    },
    cancel: function cancel() {
      this.emit('cancel');
    },
    genTitle: function genTitle() {
      var h = this.$createElement;
      var titleSlot = this.slots('title');

      if (titleSlot) {
        return titleSlot;
      }

      if (this.title) {
        return h("div", {
          "class": ['van-ellipsis', bem('title')] },
        [this.title]);
      }
    },
    genCancel: function genCancel() {
      var h = this.$createElement;
      return h("button", {
        "attrs": {
          "type": "button" },

        "class": bem('cancel'),
        "on": {
          "click": this.cancel } },

      [this.slots('cancel') || this.cancelButtonText || t('cancel')]);
    },
    genConfirm: function genConfirm() {
      var h = this.$createElement;
      return h("button", {
        "attrs": {
          "type": "button" },

        "class": bem('confirm'),
        "on": {
          "click": this.confirm } },

      [this.slots('confirm') || this.confirmButtonText || t('confirm')]);
    },
    genToolbar: function genToolbar() {
      var h = this.$createElement;

      if (this.showToolbar) {
        return h("div", {
          "class": bem('toolbar') },
        [this.slots() || [this.genCancel(), this.genTitle(), this.genConfirm()]]);
      }
    },
    genColumns: function genColumns() {
      var h = this.$createElement;
      var itemPxHeight = this.itemPxHeight;
      var wrapHeight = itemPxHeight * this.visibleItemCount;
      var frameStyle = {
        height: itemPxHeight + "px" };

      var columnsStyle = {
        height: wrapHeight + "px" };

      var maskStyle = {
        backgroundSize: "100% " + (wrapHeight - itemPxHeight) / 2 + "px" };

      return h("div", {
        "class": bem('columns'),
        "style": columnsStyle,
        "on": {
          "touchmove": _event.preventDefault } },

      [this.genColumnItems(), h("div", {
        "class": bem('mask'),
        "style": maskStyle }),
      h("div", {
        "class": [_constant.BORDER_UNSET_TOP_BOTTOM, bem('frame')],
        "style": frameStyle })]);

    },
    genColumnItems: function genColumnItems() {
      var _this5 = this;

      var h = this.$createElement;
      return this.formattedColumns.map(function (item, columnIndex) {
        var _item$defaultIndex;

        return h(_PickerColumn.default, {
          "attrs": {
            "readonly": _this5.readonly,
            "valueKey": _this5.valueKey,
            "allowHtml": _this5.allowHtml,
            "className": item.className,
            "itemHeight": _this5.itemPxHeight,
            "defaultIndex": (_item$defaultIndex = item.defaultIndex) != null ? _item$defaultIndex : +_this5.defaultIndex,
            "swipeDuration": _this5.swipeDuration,
            "visibleItemCount": _this5.visibleItemCount,
            "initialOptions": item.values },

          "scopedSlots": {
            option: _this5.$scopedSlots.option },

          "on": {
            "change": function change() {
              _this5.onChange(columnIndex);
            } } });


      });
    } },

  render: function render(h) {
    return h("div", {
      "class": bem() },
    [this.toolbarPosition === 'top' ? this.genToolbar() : h(), this.loading ? h(_loading.default, {
      "class": bem('loading') }) :
    h(), this.slots('columns-top'), this.genColumns(), this.slots('columns-bottom'), this.toolbarPosition === 'bottom' ? this.genToolbar() : h()]);
  } });exports.default = _default2;

/***/ }),
/* 50 */
/*!*************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/utils/constant.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.BORDER_UNSET_TOP_BOTTOM = exports.BORDER_TOP_BOTTOM = exports.BORDER_SURROUND = exports.BORDER_BOTTOM = exports.BORDER_LEFT = exports.BORDER_TOP = exports.BORDER = exports.RED = void 0; // color
var RED = '#ee0a24'; // border
exports.RED = RED;
var BORDER = 'van-hairline';exports.BORDER = BORDER;
var BORDER_TOP = BORDER + "--top";exports.BORDER_TOP = BORDER_TOP;
var BORDER_LEFT = BORDER + "--left";exports.BORDER_LEFT = BORDER_LEFT;
var BORDER_BOTTOM = BORDER + "--bottom";exports.BORDER_BOTTOM = BORDER_BOTTOM;
var BORDER_SURROUND = BORDER + "--surround";exports.BORDER_SURROUND = BORDER_SURROUND;
var BORDER_TOP_BOTTOM = BORDER + "--top-bottom";exports.BORDER_TOP_BOTTOM = BORDER_TOP_BOTTOM;
var BORDER_UNSET_TOP_BOTTOM = BORDER + "-unset--top-bottom";exports.BORDER_UNSET_TOP_BOTTOM = BORDER_UNSET_TOP_BOTTOM;

/***/ }),
/* 51 */
/*!******************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/picker/PickerColumn.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _babelHelperVueJsxMergeProps = _interopRequireDefault(__webpack_require__(/*! @vue/babel-helper-vue-jsx-merge-props */ 16));

var _deepClone = __webpack_require__(/*! ../utils/deep-clone */ 52);
var _utils = __webpack_require__(/*! ../utils */ 17);
var _number = __webpack_require__(/*! ../utils/format/number */ 53);
var _event = __webpack_require__(/*! ../utils/dom/event */ 34);
var _touch = __webpack_require__(/*! ../mixins/touch */ 37);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
var DEFAULT_DURATION = 200; // 惯性滑动思路:
// 在手指离开屏幕时，如果和上一次 move 时的间隔小于 `MOMENTUM_LIMIT_TIME` 且 move
// 距离大于 `MOMENTUM_LIMIT_DISTANCE` 时，执行惯性滑动

var MOMENTUM_LIMIT_TIME = 300;
var MOMENTUM_LIMIT_DISTANCE = 15;

var _createNamespace = (0, _utils.createNamespace)('picker-column'),
createComponent = _createNamespace[0],
bem = _createNamespace[1];

function getElementTranslateY(element) {
  var style = window.getComputedStyle(element);
  var transform = style.transform || style.webkitTransform;
  var translateY = transform.slice(7, transform.length - 1).split(', ')[5];
  return Number(translateY);
}

function isOptionDisabled(option) {
  return (0, _utils.isObject)(option) && option.disabled;
}var _default2 =

createComponent({
  mixins: [_touch.TouchMixin],
  props: {
    valueKey: String,
    readonly: Boolean,
    allowHtml: Boolean,
    className: String,
    itemHeight: Number,
    defaultIndex: Number,
    swipeDuration: [Number, String],
    visibleItemCount: [Number, String],
    initialOptions: {
      type: Array,
      default: function _default() {
        return [];
      } } },


  data: function data() {
    return {
      offset: 0,
      duration: 0,
      options: (0, _deepClone.deepClone)(this.initialOptions),
      currentIndex: this.defaultIndex };

  },
  created: function created() {
    if (this.$parent.children) {
      this.$parent.children.push(this);
    }

    this.setIndex(this.currentIndex);
  },
  mounted: function mounted() {
    this.bindTouchEvent(this.$el);
  },
  destroyed: function destroyed() {
    var children = this.$parent.children;

    if (children) {
      children.splice(children.indexOf(this), 1);
    }
  },
  watch: {
    initialOptions: 'setOptions',
    defaultIndex: function defaultIndex(val) {
      this.setIndex(val);
    } },

  computed: {
    count: function count() {
      return this.options.length;
    },
    baseOffset: function baseOffset() {
      return this.itemHeight * (this.visibleItemCount - 1) / 2;
    } },

  methods: {
    setOptions: function setOptions(options) {
      if (JSON.stringify(options) !== JSON.stringify(this.options)) {
        this.options = (0, _deepClone.deepClone)(options);
        this.setIndex(this.defaultIndex);
      }
    },
    onTouchStart: function onTouchStart(event) {
      if (this.readonly) {
        return;
      }

      this.touchStart(event);

      if (this.moving) {
        var translateY = getElementTranslateY(this.$refs.wrapper);
        this.offset = Math.min(0, translateY - this.baseOffset);
        this.startOffset = this.offset;
      } else {
        this.startOffset = this.offset;
      }

      this.duration = 0;
      this.transitionEndTrigger = null;
      this.touchStartTime = Date.now();
      this.momentumOffset = this.startOffset;
    },
    onTouchMove: function onTouchMove(event) {
      if (this.readonly) {
        return;
      }

      this.touchMove(event);

      if (this.direction === 'vertical') {
        this.moving = true;
        (0, _event.preventDefault)(event, true);
      }

      this.offset = (0, _number.range)(this.startOffset + this.deltaY, -(this.count * this.itemHeight), this.itemHeight);
      var now = Date.now();

      if (now - this.touchStartTime > MOMENTUM_LIMIT_TIME) {
        this.touchStartTime = now;
        this.momentumOffset = this.offset;
      }
    },
    onTouchEnd: function onTouchEnd() {
      var _this = this;

      if (this.readonly) {
        return;
      }

      var distance = this.offset - this.momentumOffset;
      var duration = Date.now() - this.touchStartTime;
      var allowMomentum = duration < MOMENTUM_LIMIT_TIME && Math.abs(distance) > MOMENTUM_LIMIT_DISTANCE;

      if (allowMomentum) {
        this.momentum(distance, duration);
        return;
      }

      var index = this.getIndexByOffset(this.offset);
      this.duration = DEFAULT_DURATION;
      this.setIndex(index, true); // compatible with desktop scenario
      // use setTimeout to skip the click event Emitted after touchstart

      setTimeout(function () {
        _this.moving = false;
      }, 0);
    },
    onTransitionEnd: function onTransitionEnd() {
      this.stopMomentum();
    },
    onClickItem: function onClickItem(index) {
      if (this.moving || this.readonly) {
        return;
      }

      this.transitionEndTrigger = null;
      this.duration = DEFAULT_DURATION;
      this.setIndex(index, true);
    },
    adjustIndex: function adjustIndex(index) {
      index = (0, _number.range)(index, 0, this.count);

      for (var i = index; i < this.count; i++) {
        if (!isOptionDisabled(this.options[i])) return i;
      }

      for (var _i = index - 1; _i >= 0; _i--) {
        if (!isOptionDisabled(this.options[_i])) return _i;
      }
    },
    getOptionText: function getOptionText(option) {
      if ((0, _utils.isObject)(option) && this.valueKey in option) {
        return option[this.valueKey];
      }

      return option;
    },
    setIndex: function setIndex(index, emitChange) {
      var _this2 = this;

      index = this.adjustIndex(index) || 0;
      var offset = -index * this.itemHeight;

      var trigger = function trigger() {
        if (index !== _this2.currentIndex) {
          _this2.currentIndex = index;

          if (emitChange) {
            _this2.$emit('change', index);
          }
        }
      }; // trigger the change event after transitionend when moving


      if (this.moving && offset !== this.offset) {
        this.transitionEndTrigger = trigger;
      } else {
        trigger();
      }

      this.offset = offset;
    },
    setValue: function setValue(value) {
      var options = this.options;

      for (var i = 0; i < options.length; i++) {
        if (this.getOptionText(options[i]) === value) {
          return this.setIndex(i);
        }
      }
    },
    getValue: function getValue() {
      return this.options[this.currentIndex];
    },
    getIndexByOffset: function getIndexByOffset(offset) {
      return (0, _number.range)(Math.round(-offset / this.itemHeight), 0, this.count - 1);
    },
    momentum: function momentum(distance, duration) {
      var speed = Math.abs(distance / duration);
      distance = this.offset + speed / 0.003 * (distance < 0 ? -1 : 1);
      var index = this.getIndexByOffset(distance);
      this.duration = +this.swipeDuration;
      this.setIndex(index, true);
    },
    stopMomentum: function stopMomentum() {
      this.moving = false;
      this.duration = 0;

      if (this.transitionEndTrigger) {
        this.transitionEndTrigger();
        this.transitionEndTrigger = null;
      }
    },
    genOptions: function genOptions() {
      var _this3 = this;

      var h = this.$createElement;
      var optionStyle = {
        height: this.itemHeight + "px" };

      return this.options.map(function (option, index) {
        var _domProps;

        var text = _this3.getOptionText(option);

        var disabled = isOptionDisabled(option);
        var data = {
          style: optionStyle,
          attrs: {
            role: 'button',
            tabindex: disabled ? -1 : 0 },

          class: [bem('item', {
            disabled: disabled,
            selected: index === _this3.currentIndex })],

          on: {
            click: function click() {
              _this3.onClickItem(index);
            } } };


        var childData = {
          class: 'van-ellipsis',
          domProps: (_domProps = {}, _domProps[_this3.allowHtml ? 'innerHTML' : 'textContent'] = text, _domProps) };

        return h("li", (0, _babelHelperVueJsxMergeProps.default)([{}, data]), [_this3.slots('option', option) || h("div", (0, _babelHelperVueJsxMergeProps.default)([{}, childData]))]);
      });
    } },

  render: function render() {
    var h = arguments[0];
    var wrapperStyle = {
      transform: "translate3d(0, " + (this.offset + this.baseOffset) + "px, 0)",
      transitionDuration: this.duration + "ms",
      transitionProperty: this.duration ? 'all' : 'none' };

    return h("div", {
      "class": [bem(), this.className] },
    [h("ul", {
      "ref": "wrapper",
      "style": wrapperStyle,
      "class": bem('wrapper'),
      "on": {
        "transitionend": this.onTransitionEnd } },

    [this.genOptions()])]);
  } });exports.default = _default2;

/***/ }),
/* 52 */
/*!***************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/utils/deep-clone.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.deepClone = deepClone;var _deepAssign = __webpack_require__(/*! ./deep-assign */ 22);
function deepClone(obj) {
  if (Array.isArray(obj)) {
    return obj.map(function (item) {
      return deepClone(item);
    });
  }

  if (typeof obj === 'object') {
    return (0, _deepAssign.deepAssign)({}, obj);
  }

  return obj;
}

/***/ }),
/* 53 */
/*!******************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/utils/format/number.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.range = range;exports.formatNumber = formatNumber;function range(num, min, max) {
  return Math.min(Math.max(num, min), max);
}

function trimExtraChar(value, _char, regExp) {
  var index = value.indexOf(_char);
  var prefix = '';

  if (index === -1) {
    return value;
  }

  if (_char === '-' && index !== 0) {
    return value.slice(0, index);
  }

  if (_char === '.' && value.match(/^(\.|-\.)/)) {
    prefix = index ? '-0' : '0';
  }

  return prefix + value.slice(0, index + 1) + value.slice(index).replace(regExp, '');
}

function formatNumber(value, allowDot, allowMinus) {
  if (allowDot === void 0) {
    allowDot = true;
  }

  if (allowMinus === void 0) {
    allowMinus = true;
  }

  if (allowDot) {
    value = trimExtraChar(value, '.', /\./g);
  } else {
    value = value.split('.')[0];
  }

  if (allowMinus) {
    value = trimExtraChar(value, '-', /-/g);
  } else {
    value = value.replace(/-/, '');
  }

  var regExp = allowDot ? /[^-0-9.]/g : /[^-0-9]/g;
  return value.replace(regExp, '');
}

/***/ }),
/* 54 */
/*!*********************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/cell/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/esm/extends */ 15));
var _babelHelperVueJsxMergeProps = _interopRequireDefault(__webpack_require__(/*! @vue/babel-helper-vue-jsx-merge-props */ 16));

var _utils = __webpack_require__(/*! ../utils */ 17);
var _functional = __webpack_require__(/*! ../utils/functional */ 29);
var _router = __webpack_require__(/*! ../utils/router */ 55);
var _shared = __webpack_require__(/*! ./shared */ 56);

var _icon = _interopRequireDefault(__webpack_require__(/*! ../icon */ 41));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // Utils
// Components
// Types
var _createNamespace = (0, _utils.createNamespace)('cell'),createComponent = _createNamespace[0],
bem = _createNamespace[1];

function Cell(h, props, slots, ctx) {
  var _props$clickable;

  var icon = props.icon,
  size = props.size,
  title = props.title,
  label = props.label,
  value = props.value,
  isLink = props.isLink;
  var showTitle = slots.title || (0, _utils.isDef)(title);

  function Label() {
    var showLabel = slots.label || (0, _utils.isDef)(label);

    if (showLabel) {
      return h("div", {
        "class": [bem('label'), props.labelClass] },
      [slots.label ? slots.label() : label]);
    }
  }

  function Title() {
    if (showTitle) {
      return h("div", {
        "class": [bem('title'), props.titleClass],
        "style": props.titleStyle },
      [slots.title ? slots.title() : h("span", [title]), Label()]);
    }
  }

  function Value() {
    var showValue = slots.default || (0, _utils.isDef)(value);

    if (showValue) {
      return h("div", {
        "class": [bem('value', {
          alone: !showTitle }),
        props.valueClass] },
      [slots.default ? slots.default() : h("span", [value])]);
    }
  }

  function LeftIcon() {
    if (slots.icon) {
      return slots.icon();
    }

    if (icon) {
      return h(_icon.default, {
        "class": bem('left-icon'),
        "attrs": {
          "name": icon,
          "classPrefix": props.iconPrefix } });


    }
  }

  function RightIcon() {
    var rightIconSlot = slots['right-icon'];

    if (rightIconSlot) {
      return rightIconSlot();
    }

    if (isLink) {
      var arrowDirection = props.arrowDirection;
      return h(_icon.default, {
        "class": bem('right-icon'),
        "attrs": {
          "name": arrowDirection ? "arrow-" + arrowDirection : 'arrow' } });


    }
  }

  function onClick(event) {
    (0, _functional.emit)(ctx, 'click', event);
    (0, _router.functionalRoute)(ctx);
  }

  var clickable = (_props$clickable = props.clickable) != null ? _props$clickable : isLink;
  var classes = {
    clickable: clickable,
    center: props.center,
    required: props.required,
    borderless: !props.border };


  if (size) {
    classes[size] = size;
  }

  return h("div", (0, _babelHelperVueJsxMergeProps.default)([{
    "class": bem(classes),
    "attrs": {
      "role": clickable ? 'button' : null,
      "tabindex": clickable ? 0 : null },

    "on": {
      "click": onClick } },

  (0, _functional.inherit)(ctx)]), [LeftIcon(), Title(), Value(), RightIcon(), slots.extra == null ? void 0 : slots.extra()]);
}

Cell.props = (0, _extends2.default)({}, _shared.cellProps, _router.routeProps);var _default =
createComponent(Cell);exports.default = _default;

/***/ }),
/* 55 */
/*!***********************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/utils/router.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.route = route;exports.functionalRoute = functionalRoute;exports.routeProps = void 0; /**
                                                                                                                                                                         * Vue Router support
                                                                                                                                                                         */
function isRedundantNavigation(err) {
  return err.name === 'NavigationDuplicated' || // compatible with vue-router@3.3
  err.message && err.message.indexOf('redundant navigation') !== -1;
}

function route(router, config) {
  var to = config.to,
  url = config.url,
  replace = config.replace;

  if (to && router) {
    var promise = router[replace ? 'replace' : 'push'](to);
    /* istanbul ignore else */

    if (promise && promise.catch) {
      promise.catch(function (err) {
        if (err && !isRedundantNavigation(err)) {
          throw err;
        }
      });
    }
  } else if (url) {
    replace ? location.replace(url) : location.href = url;
  }
}
function functionalRoute(context) {
  route(context.parent && context.parent.$router, context.props);
}
var routeProps = {
  url: String,
  replace: Boolean,
  to: [String, Object] };exports.routeProps = routeProps;

/***/ }),
/* 56 */
/*!**********************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/cell/shared.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.cellProps = void 0;var cellProps = {
  icon: String,
  size: String,
  center: Boolean,
  isLink: Boolean,
  required: Boolean,
  iconPrefix: String,
  titleStyle: null,
  titleClass: null,
  valueClass: null,
  labelClass: null,
  title: [Number, String],
  value: [Number, String],
  label: [Number, String],
  arrowDirection: String,
  border: {
    type: Boolean,
    default: true },

  clickable: {
    type: Boolean,
    default: null } };exports.cellProps = cellProps;

/***/ }),
/* 57 */
/*!**********************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/field/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _babelHelperVueJsxMergeProps = _interopRequireDefault(__webpack_require__(/*! @vue/babel-helper-vue-jsx-merge-props */ 16));

var _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/esm/extends */ 15));

var _resetScroll = __webpack_require__(/*! ../utils/dom/reset-scroll */ 58);
var _number = __webpack_require__(/*! ../utils/format/number */ 53);
var _event = __webpack_require__(/*! ../utils/dom/event */ 34);
var _utils = __webpack_require__(/*! ../utils */ 17);

var _icon = _interopRequireDefault(__webpack_require__(/*! ../icon */ 41));
var _cell = _interopRequireDefault(__webpack_require__(/*! ../cell */ 54));
var _shared = __webpack_require__(/*! ../cell/shared */ 56);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // Utils
// Components
var _createNamespace = (0, _utils.createNamespace)('field'),
createComponent = _createNamespace[0],
bem = _createNamespace[1];var _default =

createComponent({
  inheritAttrs: false,
  provide: function provide() {
    return {
      vanField: this };

  },
  inject: {
    vanForm: {
      default: null } },


  props: (0, _extends2.default)({}, _shared.cellProps, {
    name: String,
    rules: Array,
    disabled: {
      type: Boolean,
      default: null },

    readonly: {
      type: Boolean,
      default: null },

    autosize: [Boolean, Object],
    leftIcon: String,
    rightIcon: String,
    clearable: Boolean,
    formatter: Function,
    maxlength: [Number, String],
    labelWidth: [Number, String],
    labelClass: null,
    labelAlign: String,
    inputAlign: String,
    placeholder: String,
    errorMessage: String,
    errorMessageAlign: String,
    showWordLimit: Boolean,
    value: {
      type: [Number, String],
      default: '' },

    type: {
      type: String,
      default: 'text' },

    error: {
      type: Boolean,
      default: null },

    colon: {
      type: Boolean,
      default: null },

    clearTrigger: {
      type: String,
      default: 'focus' },

    formatTrigger: {
      type: String,
      default: 'onChange' } }),


  data: function data() {
    return {
      focused: false,
      validateFailed: false,
      validateMessage: '' };

  },
  watch: {
    value: function value() {
      this.updateValue(this.value);
      this.resetValidation();
      this.validateWithTrigger('onChange');
      this.$nextTick(this.adjustSize);
    } },

  mounted: function mounted() {
    this.updateValue(this.value, this.formatTrigger);
    this.$nextTick(this.adjustSize);

    if (this.vanForm) {
      this.vanForm.addField(this);
    }
  },
  beforeDestroy: function beforeDestroy() {
    if (this.vanForm) {
      this.vanForm.removeField(this);
    }
  },
  computed: {
    showClear: function showClear() {
      var readonly = this.getProp('readonly');

      if (this.clearable && !readonly) {
        var hasValue = (0, _utils.isDef)(this.value) && this.value !== '';
        var trigger = this.clearTrigger === 'always' || this.clearTrigger === 'focus' && this.focused;
        return hasValue && trigger;
      }
    },
    showError: function showError() {
      if (this.error !== null) {
        return this.error;
      }

      if (this.vanForm && this.vanForm.showError && this.validateFailed) {
        return true;
      }
    },
    listeners: function listeners() {
      return (0, _extends2.default)({}, this.$listeners, {
        blur: this.onBlur,
        focus: this.onFocus,
        input: this.onInput,
        click: this.onClickInput,
        keypress: this.onKeypress });

    },
    labelStyle: function labelStyle() {
      var labelWidth = this.getProp('labelWidth');

      if (labelWidth) {
        return {
          width: (0, _utils.addUnit)(labelWidth) };

      }
    },
    formValue: function formValue() {
      if (this.children && (this.$scopedSlots.input || this.$slots.input)) {
        return this.children.value;
      }

      return this.value;
    } },

  methods: {
    // @exposed-api
    focus: function focus() {
      if (this.$refs.input) {
        this.$refs.input.focus();
      }
    },
    // @exposed-api
    blur: function blur() {
      if (this.$refs.input) {
        this.$refs.input.blur();
      }
    },
    runValidator: function runValidator(value, rule) {
      return new Promise(function (resolve) {
        var returnVal = rule.validator(value, rule);

        if ((0, _utils.isPromise)(returnVal)) {
          return returnVal.then(resolve);
        }

        resolve(returnVal);
      });
    },
    isEmptyValue: function isEmptyValue(value) {
      if (Array.isArray(value)) {
        return !value.length;
      }

      if (value === 0) {
        return false;
      }

      return !value;
    },
    runSyncRule: function runSyncRule(value, rule) {
      if (rule.required && this.isEmptyValue(value)) {
        return false;
      }

      if (rule.pattern && !rule.pattern.test(value)) {
        return false;
      }

      return true;
    },
    getRuleMessage: function getRuleMessage(value, rule) {
      var message = rule.message;

      if ((0, _utils.isFunction)(message)) {
        return message(value, rule);
      }

      return message;
    },
    runRules: function runRules(rules) {
      var _this = this;

      return rules.reduce(function (promise, rule) {
        return promise.then(function () {
          if (_this.validateFailed) {
            return;
          }

          var value = _this.formValue;

          if (rule.formatter) {
            value = rule.formatter(value, rule);
          }

          if (!_this.runSyncRule(value, rule)) {
            _this.validateFailed = true;
            _this.validateMessage = _this.getRuleMessage(value, rule);
            return;
          }

          if (rule.validator) {
            return _this.runValidator(value, rule).then(function (result) {
              if (result === false) {
                _this.validateFailed = true;
                _this.validateMessage = _this.getRuleMessage(value, rule);
              }
            });
          }
        });
      }, Promise.resolve());
    },
    validate: function validate(rules) {
      var _this2 = this;

      if (rules === void 0) {
        rules = this.rules;
      }

      return new Promise(function (resolve) {
        if (!rules) {
          resolve();
        }

        _this2.resetValidation();

        _this2.runRules(rules).then(function () {
          if (_this2.validateFailed) {
            resolve({
              name: _this2.name,
              message: _this2.validateMessage });

          } else {
            resolve();
          }
        });
      });
    },
    validateWithTrigger: function validateWithTrigger(trigger) {
      if (this.vanForm && this.rules) {
        var defaultTrigger = this.vanForm.validateTrigger === trigger;
        var rules = this.rules.filter(function (rule) {
          if (rule.trigger) {
            return rule.trigger === trigger;
          }

          return defaultTrigger;
        });
        this.validate(rules);
      }
    },
    resetValidation: function resetValidation() {
      if (this.validateFailed) {
        this.validateFailed = false;
        this.validateMessage = '';
      }
    },
    updateValue: function updateValue(value, trigger) {
      if (trigger === void 0) {
        trigger = 'onChange';
      }

      value = (0, _utils.isDef)(value) ? String(value) : ''; // native maxlength have incorrect line-break counting
      // see: https://github.com/youzan/vant/issues/5033

      var maxlength = this.maxlength;

      if ((0, _utils.isDef)(maxlength) && value.length > maxlength) {
        if (this.value && this.value.length === +maxlength) {
          value = this.value;
        } else {
          value = value.slice(0, maxlength);
        }
      }

      if (this.type === 'number' || this.type === 'digit') {
        var isNumber = this.type === 'number';
        value = (0, _number.formatNumber)(value, isNumber, isNumber);
      }

      if (this.formatter && trigger === this.formatTrigger) {
        value = this.formatter(value);
      }

      var input = this.$refs.input;

      if (input && value !== input.value) {
        input.value = value;
      }

      if (value !== this.value) {
        this.$emit('input', value);
      }
    },
    onInput: function onInput(event) {
      // not update v-model when composing
      if (event.target.composing) {
        return;
      }

      this.updateValue(event.target.value);
    },
    onFocus: function onFocus(event) {
      this.focused = true;
      this.$emit('focus', event); // readonly not work in lagacy mobile safari

      /* istanbul ignore if */

      var readonly = this.getProp('readonly');

      if (readonly) {
        this.blur();
      }
    },
    onBlur: function onBlur(event) {
      this.focused = false;
      this.updateValue(this.value, 'onBlur');
      this.$emit('blur', event);
      this.validateWithTrigger('onBlur');
      (0, _resetScroll.resetScroll)();
    },
    onClick: function onClick(event) {
      this.$emit('click', event);
    },
    onClickInput: function onClickInput(event) {
      this.$emit('click-input', event);
    },
    onClickLeftIcon: function onClickLeftIcon(event) {
      this.$emit('click-left-icon', event);
    },
    onClickRightIcon: function onClickRightIcon(event) {
      this.$emit('click-right-icon', event);
    },
    onClear: function onClear(event) {
      (0, _event.preventDefault)(event);
      this.$emit('input', '');
      this.$emit('clear', event);
    },
    onKeypress: function onKeypress(event) {
      var ENTER_CODE = 13;

      if (event.keyCode === ENTER_CODE) {
        var submitOnEnter = this.getProp('submitOnEnter');

        if (!submitOnEnter && this.type !== 'textarea') {
          (0, _event.preventDefault)(event);
        } // trigger blur after click keyboard search button


        if (this.type === 'search') {
          this.blur();
        }
      }

      this.$emit('keypress', event);
    },
    adjustSize: function adjustSize() {
      var input = this.$refs.input;

      if (!(this.type === 'textarea' && this.autosize) || !input) {
        return;
      }

      input.style.height = 'auto';
      var height = input.scrollHeight;

      if ((0, _utils.isObject)(this.autosize)) {
        var _this$autosize = this.autosize,
        maxHeight = _this$autosize.maxHeight,
        minHeight = _this$autosize.minHeight;

        if (maxHeight) {
          height = Math.min(height, maxHeight);
        }

        if (minHeight) {
          height = Math.max(height, minHeight);
        }
      }

      if (height) {
        input.style.height = height + 'px';
      }
    },
    genInput: function genInput() {
      var h = this.$createElement;
      var type = this.type;
      var disabled = this.getProp('disabled');
      var readonly = this.getProp('readonly');
      var inputSlot = this.slots('input');
      var inputAlign = this.getProp('inputAlign');

      if (inputSlot) {
        return h("div", {
          "class": bem('control', [inputAlign, 'custom']),
          "on": {
            "click": this.onClickInput } },

        [inputSlot]);
      }

      var inputProps = {
        ref: 'input',
        class: bem('control', inputAlign),
        domProps: {
          value: this.value },

        attrs: (0, _extends2.default)({}, this.$attrs, {
          name: this.name,
          disabled: disabled,
          readonly: readonly,
          placeholder: this.placeholder }),

        on: this.listeners,
        // add model directive to skip IME composition
        directives: [{
          name: 'model',
          value: this.value }] };



      if (type === 'textarea') {
        return h("textarea", (0, _babelHelperVueJsxMergeProps.default)([{}, inputProps]));
      }

      var inputType = type;
      var inputMode; // type="number" is weired in iOS, and can't prevent dot in Android
      // so use inputmode to set keyboard in mordern browers

      if (type === 'number') {
        inputType = 'text';
        inputMode = 'decimal';
      }

      if (type === 'digit') {
        inputType = 'tel';
        inputMode = 'numeric';
      }

      return h("input", (0, _babelHelperVueJsxMergeProps.default)([{
        "attrs": {
          "type": inputType,
          "inputmode": inputMode } },

      inputProps]));
    },
    genLeftIcon: function genLeftIcon() {
      var h = this.$createElement;
      var showLeftIcon = this.slots('left-icon') || this.leftIcon;

      if (showLeftIcon) {
        return h("div", {
          "class": bem('left-icon'),
          "on": {
            "click": this.onClickLeftIcon } },

        [this.slots('left-icon') || h(_icon.default, {
          "attrs": {
            "name": this.leftIcon,
            "classPrefix": this.iconPrefix } })]);


      }
    },
    genRightIcon: function genRightIcon() {
      var h = this.$createElement;
      var slots = this.slots;
      var showRightIcon = slots('right-icon') || this.rightIcon;

      if (showRightIcon) {
        return h("div", {
          "class": bem('right-icon'),
          "on": {
            "click": this.onClickRightIcon } },

        [slots('right-icon') || h(_icon.default, {
          "attrs": {
            "name": this.rightIcon,
            "classPrefix": this.iconPrefix } })]);


      }
    },
    genWordLimit: function genWordLimit() {
      var h = this.$createElement;

      if (this.showWordLimit && this.maxlength) {
        var count = (this.value || '').length;
        return h("div", {
          "class": bem('word-limit') },
        [h("span", {
          "class": bem('word-num') },
        [count]), "/", this.maxlength]);
      }
    },
    genMessage: function genMessage() {
      var h = this.$createElement;

      if (this.vanForm && this.vanForm.showErrorMessage === false) {
        return;
      }

      var message = this.errorMessage || this.validateMessage;

      if (message) {
        var errorMessageAlign = this.getProp('errorMessageAlign');
        return h("div", {
          "class": bem('error-message', errorMessageAlign) },
        [message]);
      }
    },
    getProp: function getProp(key) {
      if ((0, _utils.isDef)(this[key])) {
        return this[key];
      }

      if (this.vanForm && (0, _utils.isDef)(this.vanForm[key])) {
        return this.vanForm[key];
      }
    },
    genLabel: function genLabel() {
      var h = this.$createElement;
      var colon = this.getProp('colon') ? ':' : '';

      if (this.slots('label')) {
        return [this.slots('label'), colon];
      }

      if (this.label) {
        return h("span", [this.label + colon]);
      }
    } },

  render: function render() {
    var _bem;

    var h = arguments[0];
    var slots = this.slots;
    var disabled = this.getProp('disabled');
    var labelAlign = this.getProp('labelAlign');
    var scopedSlots = {
      icon: this.genLeftIcon };

    var Label = this.genLabel();

    if (Label) {
      scopedSlots.title = function () {
        return Label;
      };
    }

    var extra = this.slots('extra');

    if (extra) {
      scopedSlots.extra = function () {
        return extra;
      };
    }

    return h(_cell.default, {
      "attrs": {
        "icon": this.leftIcon,
        "size": this.size,
        "center": this.center,
        "border": this.border,
        "isLink": this.isLink,
        "required": this.required,
        "clickable": this.clickable,
        "titleStyle": this.labelStyle,
        "valueClass": bem('value'),
        "titleClass": [bem('label', labelAlign), this.labelClass],
        "arrowDirection": this.arrowDirection },

      "scopedSlots": scopedSlots,
      "class": bem((_bem = {
        error: this.showError,
        disabled: disabled },
      _bem["label-" + labelAlign] = labelAlign, _bem['min-height'] = this.type === 'textarea' && !this.autosize, _bem)),
      "on": {
        "click": this.onClick } },

    [h("div", {
      "class": bem('body') },
    [this.genInput(), this.showClear && h(_icon.default, {
      "attrs": {
        "name": "clear" },

      "class": bem('clear'),
      "on": {
        "touchstart": this.onClear } }),

    this.genRightIcon(), slots('button') && h("div", {
      "class": bem('button') },
    [slots('button')])]), this.genWordLimit(), this.genMessage()]);
  } });exports.default = _default;

/***/ }),
/* 58 */
/*!*********************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/utils/dom/reset-scroll.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.resetScroll = resetScroll;



var _system = __webpack_require__(/*! ../validate/system */ 59);
var _scroll = __webpack_require__(/*! ./scroll */ 36); /**
                                    * Hack for iOS12 page scroll
                                    * https://developers.weixin.qq.com/community/develop/doc/00044ae90742f8c82fb78fcae56800
                                    */var isIOS = (0, _system.isIOS)(); /* istanbul ignore next */
function resetScroll() {
  if (isIOS) {
    (0, _scroll.setRootScrollTop)((0, _scroll.getRootScrollTop)());
  }
}

/***/ }),
/* 59 */
/*!********************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/utils/validate/system.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.isAndroid = isAndroid;exports.isIOS = isIOS;var _ = __webpack_require__(/*! .. */ 17);
function isAndroid() {
  /* istanbul ignore next */
  return _.isServer ? false : /android/.test(navigator.userAgent.toLowerCase());
}
function isIOS() {
  /* istanbul ignore next */
  return _.isServer ? false : /ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase());
}

/***/ }),
/* 60 */
/*!**********************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/toast/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/esm/extends */ 15));
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _Toast = _interopRequireDefault(__webpack_require__(/*! ./Toast */ 61));
var _utils = __webpack_require__(/*! ../utils */ 17);
var _node = __webpack_require__(/*! ../utils/dom/node */ 35);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
var defaultOptions = {
  icon: '',
  type: 'text',
  // @deprecated
  mask: false,
  value: true,
  message: '',
  className: '',
  overlay: false,
  onClose: null,
  onOpened: null,
  duration: 2000,
  iconPrefix: undefined,
  position: 'middle',
  transition: 'van-fade',
  forbidClick: false,
  loadingType: undefined,
  getContainer: 'body',
  overlayStyle: null,
  closeOnClick: false,
  closeOnClickOverlay: false };
// default options of specific type

var defaultOptionsMap = {};
var queue = [];
var multiple = false;

var currentOptions = (0, _extends2.default)({}, defaultOptions);

function parseOptions(message) {
  if ((0, _utils.isObject)(message)) {
    return message;
  }

  return {
    message: message };

}

function isInDocument(element) {
  return document.body.contains(element);
}

function createInstance() {
  /* istanbul ignore if */
  if (_utils.isServer) {
    return {};
  }

  queue = queue.filter(function (item) {
    return !item.$el.parentNode || isInDocument(item.$el);
  });

  if (!queue.length || multiple) {
    var toast = new (_vue.default.extend(_Toast.default))({
      el: document.createElement('div') });

    toast.$on('input', function (value) {
      toast.value = value;
    });
    queue.push(toast);
  }

  return queue[queue.length - 1];
} // transform toast options to popup props


function transformOptions(options) {
  return (0, _extends2.default)({}, options, {
    overlay: options.mask || options.overlay,
    mask: undefined,
    duration: undefined });

}

function Toast(options) {
  if (options === void 0) {
    options = {};
  }

  var toast = createInstance(); // should add z-index if previous toast has not disappeared

  if (toast.value) {
    toast.updateZIndex();
  }

  options = parseOptions(options);
  options = (0, _extends2.default)({}, currentOptions, defaultOptionsMap[options.type || currentOptions.type], options);

  if ( true && options.mask) {
    console.warn('[Vant] Toast: "mask" option is deprecated, use "overlay" option instead.');
  }

  options.clear = function () {
    toast.value = false;

    if (options.onClose) {
      options.onClose();
      options.onClose = null;
    }

    if (multiple && !_utils.isServer) {
      toast.$on('closed', function () {
        clearTimeout(toast.timer);
        queue = queue.filter(function (item) {
          return item !== toast;
        });
        (0, _node.removeNode)(toast.$el);
        toast.$destroy();
      });
    }
  };

  (0, _extends2.default)(toast, transformOptions(options));

  clearTimeout(toast.timer);

  if (options.duration > 0) {
    toast.timer = setTimeout(function () {
      toast.clear();
    }, options.duration);
  }

  return toast;
}

var createMethod = function createMethod(type) {
  return function (options) {
    return Toast((0, _extends2.default)({
      type: type },
    parseOptions(options)));
  };
};

['loading', 'success', 'fail'].forEach(function (method) {
  Toast[method] = createMethod(method);
});

Toast.clear = function (all) {
  if (queue.length) {
    if (all) {
      queue.forEach(function (toast) {
        toast.clear();
      });
      queue = [];
    } else if (!multiple) {
      queue[0].clear();
    } else {
      queue.shift().clear();
    }
  }
};

Toast.setDefaultOptions = function (type, options) {
  if (typeof type === 'string') {
    defaultOptionsMap[type] = options;
  } else {
    (0, _extends2.default)(currentOptions, type);
  }
};

Toast.resetDefaultOptions = function (type) {
  if (typeof type === 'string') {
    defaultOptionsMap[type] = null;
  } else {
    currentOptions = (0, _extends2.default)({}, defaultOptions);
    defaultOptionsMap = {};
  }
};

Toast.allowMultiple = function (value) {
  if (value === void 0) {
    value = true;
  }

  multiple = value;
};

Toast.install = function () {
  _vue.default.use(_Toast.default);
};

_vue.default.prototype.$toast = Toast;var _default =
Toast;exports.default = _default;

/***/ }),
/* 61 */
/*!**********************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/toast/Toast.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _utils = __webpack_require__(/*! ../utils */ 17);
var _lockClick = __webpack_require__(/*! ./lock-click */ 62);

var _popup = __webpack_require__(/*! ../mixins/popup */ 30);

var _icon = _interopRequireDefault(__webpack_require__(/*! ../icon */ 41));
var _loading = _interopRequireDefault(__webpack_require__(/*! ../loading */ 44));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // Utils
// Mixins
// Components
var _createNamespace = (0, _utils.createNamespace)('toast'),createComponent = _createNamespace[0],
bem = _createNamespace[1];var _default =

createComponent({
  mixins: [(0, _popup.PopupMixin)()],
  props: {
    icon: String,
    className: null,
    iconPrefix: String,
    loadingType: String,
    forbidClick: Boolean,
    closeOnClick: Boolean,
    message: [Number, String],
    type: {
      type: String,
      default: 'text' },

    position: {
      type: String,
      default: 'middle' },

    transition: {
      type: String,
      default: 'van-fade' },

    lockScroll: {
      type: Boolean,
      default: false } },


  data: function data() {
    return {
      clickable: false };

  },
  mounted: function mounted() {
    this.toggleClickable();
  },
  destroyed: function destroyed() {
    this.toggleClickable();
  },
  watch: {
    value: 'toggleClickable',
    forbidClick: 'toggleClickable' },

  methods: {
    onClick: function onClick() {
      if (this.closeOnClick) {
        this.close();
      }
    },
    toggleClickable: function toggleClickable() {
      var clickable = this.value && this.forbidClick;

      if (this.clickable !== clickable) {
        this.clickable = clickable;
        (0, _lockClick.lockClick)(clickable);
      }
    },

    /* istanbul ignore next */
    onAfterEnter: function onAfterEnter() {
      this.$emit('opened');

      if (this.onOpened) {
        this.onOpened();
      }
    },
    onAfterLeave: function onAfterLeave() {
      this.$emit('closed');
    },
    genIcon: function genIcon() {
      var h = this.$createElement;
      var icon = this.icon,
      type = this.type,
      iconPrefix = this.iconPrefix,
      loadingType = this.loadingType;
      var hasIcon = icon || type === 'success' || type === 'fail';

      if (hasIcon) {
        return h(_icon.default, {
          "class": bem('icon'),
          "attrs": {
            "classPrefix": iconPrefix,
            "name": icon || type } });


      }

      if (type === 'loading') {
        return h(_loading.default, {
          "class": bem('loading'),
          "attrs": {
            "type": loadingType } });


      }
    },
    genMessage: function genMessage() {
      var h = this.$createElement;
      var type = this.type,
      message = this.message;

      if (!(0, _utils.isDef)(message) || message === '') {
        return;
      }

      if (type === 'html') {
        return h("div", {
          "class": bem('text'),
          "domProps": {
            "innerHTML": message } });


      }

      return h("div", {
        "class": bem('text') },
      [message]);
    } },

  render: function render() {
    var _ref;

    var h = arguments[0];
    return h("transition", {
      "attrs": {
        "name": this.transition },

      "on": {
        "afterEnter": this.onAfterEnter,
        "afterLeave": this.onAfterLeave } },

    [h("div", {
      "directives": [{
        name: "show",
        value: this.value }],

      "class": [bem([this.position, (_ref = {}, _ref[this.type] = !this.icon, _ref)]), this.className],
      "on": {
        "click": this.onClick } },

    [this.genIcon(), this.genMessage()])]);
  } });exports.default = _default;

/***/ }),
/* 62 */
/*!***************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/toast/lock-click.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.lockClick = lockClick;var lockCount = 0;
function lockClick(lock) {
  if (lock) {
    if (!lockCount) {
      document.body.classList.add('van-toast--unclickable');
    }

    lockCount++;
  } else {
    lockCount--;

    if (!lockCount) {
      document.body.classList.remove('van-toast--unclickable');
    }
  }
}

/***/ }),
/* 63 */
/*!***********************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/button/index.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/esm/extends */ 15));
var _babelHelperVueJsxMergeProps = _interopRequireDefault(__webpack_require__(/*! @vue/babel-helper-vue-jsx-merge-props */ 16));

var _utils = __webpack_require__(/*! ../utils */ 17);
var _functional = __webpack_require__(/*! ../utils/functional */ 29);
var _constant = __webpack_require__(/*! ../utils/constant */ 50);
var _router = __webpack_require__(/*! ../utils/router */ 55);

var _icon = _interopRequireDefault(__webpack_require__(/*! ../icon */ 41));
var _loading = _interopRequireDefault(__webpack_require__(/*! ../loading */ 44));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // Utils
// Components
// Types
var _createNamespace = (0, _utils.createNamespace)('button'),createComponent = _createNamespace[0],
bem = _createNamespace[1];

function Button(h, props, slots, ctx) {
  var _ref;

  var tag = props.tag,
  icon = props.icon,
  type = props.type,
  color = props.color,
  plain = props.plain,
  disabled = props.disabled,
  loading = props.loading,
  hairline = props.hairline,
  loadingText = props.loadingText,
  iconPosition = props.iconPosition;
  var style = {};

  if (color) {
    style.color = plain ? color : 'white';

    if (!plain) {
      // Use background instead of backgroundColor to make linear-gradient work
      style.background = color;
    } // hide border when color is linear-gradient


    if (color.indexOf('gradient') !== -1) {
      style.border = 0;
    } else {
      style.borderColor = color;
    }
  }

  function onClick(event) {
    if (!loading && !disabled) {
      (0, _functional.emit)(ctx, 'click', event);
      (0, _router.functionalRoute)(ctx);
    }
  }

  function onTouchstart(event) {
    (0, _functional.emit)(ctx, 'touchstart', event);
  }

  var classes = [bem([type, props.size, {
    plain: plain,
    loading: loading,
    disabled: disabled,
    hairline: hairline,
    block: props.block,
    round: props.round,
    square: props.square }]), (
  _ref = {}, _ref[_constant.BORDER_SURROUND] = hairline, _ref)];

  function renderIcon() {
    if (loading) {
      return slots.loading ? slots.loading() : h(_loading.default, {
        "class": bem('loading'),
        "attrs": {
          "size": props.loadingSize,
          "type": props.loadingType,
          "color": "currentColor" } });


    }

    if (icon) {
      return h(_icon.default, {
        "attrs": {
          "name": icon,
          "classPrefix": props.iconPrefix },

        "class": bem('icon') });

    }
  }

  function renderContent() {
    var content = [];

    if (iconPosition === 'left') {
      content.push(renderIcon());
    }

    var text;

    if (loading) {
      text = loadingText;
    } else {
      text = slots.default ? slots.default() : props.text;
    }

    if (text) {
      content.push(h("span", {
        "class": bem('text') },
      [text]));
    }

    if (iconPosition === 'right') {
      content.push(renderIcon());
    }

    return content;
  }

  return h(tag, (0, _babelHelperVueJsxMergeProps.default)([{
    "style": style,
    "class": classes,
    "attrs": {
      "type": props.nativeType,
      "disabled": disabled },

    "on": {
      "click": onClick,
      "touchstart": onTouchstart } },

  (0, _functional.inherit)(ctx)]), [h("div", {
    "class": bem('content') },
  [renderContent()])]);
}

Button.props = (0, _extends2.default)({}, _router.routeProps, {
  text: String,
  icon: String,
  color: String,
  block: Boolean,
  plain: Boolean,
  round: Boolean,
  square: Boolean,
  loading: Boolean,
  hairline: Boolean,
  disabled: Boolean,
  iconPrefix: String,
  nativeType: String,
  loadingText: String,
  loadingType: String,
  tag: {
    type: String,
    default: 'button' },

  type: {
    type: String,
    default: 'default' },

  size: {
    type: String,
    default: 'normal' },

  loadingSize: {
    type: String,
    default: '20px' },

  iconPosition: {
    type: String,
    default: 'left' } });var _default =


createComponent(Button);exports.default = _default;

/***/ }),
/* 64 */
/*!***********************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/dialog/index.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/esm/extends */ 15));
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _Dialog = _interopRequireDefault(__webpack_require__(/*! ./Dialog */ 65));
var _utils = __webpack_require__(/*! ../utils */ 17);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
var instance;

function isInDocument(element) {
  return document.body.contains(element);
}

function initInstance() {
  if (instance) {
    instance.$destroy();
  }

  instance = new (_vue.default.extend(_Dialog.default))({
    el: document.createElement('div'),
    // avoid missing animation when first rendered
    propsData: {
      lazyRender: false } });


  instance.$on('input', function (value) {
    instance.value = value;
  });
}

function Dialog(options) {
  /* istanbul ignore if */
  if (_utils.isServer) {
    return Promise.resolve();
  }

  return new Promise(function (resolve, reject) {
    if (!instance || !isInDocument(instance.$el)) {
      initInstance();
    }

    (0, _extends2.default)(instance, Dialog.currentOptions, options, {
      resolve: resolve,
      reject: reject });

  });
}

Dialog.defaultOptions = {
  value: true,
  title: '',
  width: '',
  theme: null,
  message: '',
  overlay: true,
  className: '',
  allowHtml: true,
  lockScroll: true,
  transition: 'van-dialog-bounce',
  beforeClose: null,
  overlayClass: '',
  overlayStyle: null,
  messageAlign: '',
  getContainer: 'body',
  cancelButtonText: '',
  cancelButtonColor: null,
  confirmButtonText: '',
  confirmButtonColor: null,
  showConfirmButton: true,
  showCancelButton: false,
  closeOnPopstate: true,
  closeOnClickOverlay: false,
  callback: function callback(action) {
    instance[action === 'confirm' ? 'resolve' : 'reject'](action);
  } };

Dialog.alert = Dialog;

Dialog.confirm = function (options) {
  return Dialog((0, _extends2.default)({
    showCancelButton: true },
  options));
};

Dialog.close = function () {
  if (instance) {
    instance.value = false;
  }
};

Dialog.setDefaultOptions = function (options) {
  (0, _extends2.default)(Dialog.currentOptions, options);
};

Dialog.resetDefaultOptions = function () {
  Dialog.currentOptions = (0, _extends2.default)({}, Dialog.defaultOptions);
};

Dialog.resetDefaultOptions();

Dialog.install = function () {
  _vue.default.use(_Dialog.default);
};

Dialog.Component = _Dialog.default;
_vue.default.prototype.$dialog = Dialog;var _default =
Dialog;exports.default = _default;

/***/ }),
/* 65 */
/*!************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/dialog/Dialog.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _babelHelperVueJsxMergeProps = _interopRequireDefault(__webpack_require__(/*! @vue/babel-helper-vue-jsx-merge-props */ 16));
var _utils = __webpack_require__(/*! ../utils */ 17);
var _constant = __webpack_require__(/*! ../utils/constant */ 50);
var _popup = __webpack_require__(/*! ../mixins/popup */ 30);
var _button = _interopRequireDefault(__webpack_require__(/*! ../button */ 63));
var _goodsAction = _interopRequireDefault(__webpack_require__(/*! ../goods-action */ 66));
var _goodsActionButton = _interopRequireDefault(__webpack_require__(/*! ../goods-action-button */ 69));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var _createNamespace = (0, _utils.createNamespace)('dialog'),
createComponent = _createNamespace[0],
bem = _createNamespace[1],
t = _createNamespace[2];var _default =

createComponent({
  mixins: [(0, _popup.PopupMixin)()],
  props: {
    title: String,
    theme: String,
    width: [Number, String],
    message: String,
    className: null,
    callback: Function,
    beforeClose: Function,
    messageAlign: String,
    cancelButtonText: String,
    cancelButtonColor: String,
    confirmButtonText: String,
    confirmButtonColor: String,
    showCancelButton: Boolean,
    overlay: {
      type: Boolean,
      default: true },

    allowHtml: {
      type: Boolean,
      default: true },

    transition: {
      type: String,
      default: 'van-dialog-bounce' },

    showConfirmButton: {
      type: Boolean,
      default: true },

    closeOnPopstate: {
      type: Boolean,
      default: true },

    closeOnClickOverlay: {
      type: Boolean,
      default: false } },


  data: function data() {
    return {
      loading: {
        confirm: false,
        cancel: false } };


  },
  methods: {
    onClickOverlay: function onClickOverlay() {
      this.handleAction('overlay');
    },
    handleAction: function handleAction(action) {
      var _this = this;

      this.$emit(action); // show not trigger close event when hidden

      if (!this.value) {
        return;
      }

      if (this.beforeClose) {
        this.loading[action] = true;
        this.beforeClose(action, function (state) {
          if (state !== false && _this.loading[action]) {
            _this.onClose(action);
          }

          _this.loading.confirm = false;
          _this.loading.cancel = false;
        });
      } else {
        this.onClose(action);
      }
    },
    onClose: function onClose(action) {
      this.close();

      if (this.callback) {
        this.callback(action);
      }
    },
    onOpened: function onOpened() {
      this.$emit('opened');
    },
    onClosed: function onClosed() {
      this.$emit('closed');
    },
    genRoundButtons: function genRoundButtons() {
      var _this2 = this;

      var h = this.$createElement;
      return h(_goodsAction.default, {
        "class": bem('footer') },
      [this.showCancelButton && h(_goodsActionButton.default, {
        "attrs": {
          "size": "large",
          "type": "warning",
          "text": this.cancelButtonText || t('cancel'),
          "color": this.cancelButtonColor,
          "loading": this.loading.cancel },

        "class": bem('cancel'),
        "on": {
          "click": function click() {
            _this2.handleAction('cancel');
          } } }),

      this.showConfirmButton && h(_goodsActionButton.default, {
        "attrs": {
          "size": "large",
          "type": "danger",
          "text": this.confirmButtonText || t('confirm'),
          "color": this.confirmButtonColor,
          "loading": this.loading.confirm },

        "class": bem('confirm'),
        "on": {
          "click": function click() {
            _this2.handleAction('confirm');
          } } })]);


    },
    genButtons: function genButtons() {
      var _this3 = this,
      _ref;

      var h = this.$createElement;
      var multiple = this.showCancelButton && this.showConfirmButton;
      return h("div", {
        "class": [_constant.BORDER_TOP, bem('footer')] },
      [this.showCancelButton && h(_button.default, {
        "attrs": {
          "size": "large",
          "loading": this.loading.cancel,
          "text": this.cancelButtonText || t('cancel') },

        "class": bem('cancel'),
        "style": {
          color: this.cancelButtonColor },

        "on": {
          "click": function click() {
            _this3.handleAction('cancel');
          } } }),

      this.showConfirmButton && h(_button.default, {
        "attrs": {
          "size": "large",
          "loading": this.loading.confirm,
          "text": this.confirmButtonText || t('confirm') },

        "class": [bem('confirm'), (_ref = {}, _ref[_constant.BORDER_LEFT] = multiple, _ref)],
        "style": {
          color: this.confirmButtonColor },

        "on": {
          "click": function click() {
            _this3.handleAction('confirm');
          } } })]);


    },
    genContent: function genContent(hasTitle, messageSlot) {
      var h = this.$createElement;

      if (messageSlot) {
        return h("div", {
          "class": bem('content') },
        [messageSlot]);
      }

      var message = this.message,
      messageAlign = this.messageAlign;

      if (message) {
        var _bem, _domProps;

        var data = {
          class: bem('message', (_bem = {
            'has-title': hasTitle },
          _bem[messageAlign] = messageAlign, _bem)),
          domProps: (_domProps = {}, _domProps[this.allowHtml ? 'innerHTML' : 'textContent'] = message, _domProps) };

        return h("div", {
          "class": bem('content', {
            isolated: !hasTitle }) },

        [h("div", (0, _babelHelperVueJsxMergeProps.default)([{}, data]))]);
      }
    } },

  render: function render() {
    var h = arguments[0];

    if (!this.shouldRender) {
      return;
    }

    var message = this.message;
    var messageSlot = this.slots();
    var title = this.slots('title') || this.title;
    var Title = title && h("div", {
      "class": bem('header', {
        isolated: !message && !messageSlot }) },

    [title]);
    return h("transition", {
      "attrs": {
        "name": this.transition },

      "on": {
        "afterEnter": this.onOpened,
        "afterLeave": this.onClosed } },

    [h("div", {
      "directives": [{
        name: "show",
        value: this.value }],

      "attrs": {
        "role": "dialog",
        "aria-labelledby": this.title || message },

      "class": [bem([this.theme]), this.className],
      "style": {
        width: (0, _utils.addUnit)(this.width) } },

    [Title, this.genContent(title, messageSlot), this.theme === 'round-button' ? this.genRoundButtons() : this.genButtons()])]);
  } });exports.default = _default;

/***/ }),
/* 66 */
/*!*****************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/goods-action/index.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _utils = __webpack_require__(/*! ../utils */ 17);
var _relation = __webpack_require__(/*! ../mixins/relation */ 67);

var _createNamespace = (0, _utils.createNamespace)('goods-action'),
createComponent = _createNamespace[0],
bem = _createNamespace[1];var _default =

createComponent({
  mixins: [(0, _relation.ParentMixin)('vanGoodsAction')],
  props: {
    safeAreaInsetBottom: {
      type: Boolean,
      default: true } },


  render: function render() {
    var h = arguments[0];
    return h("div", {
      "class": bem({
        unfit: !this.safeAreaInsetBottom }) },

    [this.slots()]);
  } });exports.default = _default;

/***/ }),
/* 67 */
/*!**************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/mixins/relation.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.ChildrenMixin = ChildrenMixin;exports.ParentMixin = ParentMixin;var _vnodes = __webpack_require__(/*! ../utils/vnodes */ 68);
function ChildrenMixin(_parent, options) {
  var _inject, _computed;

  if (options === void 0) {
    options = {};
  }

  var indexKey = options.indexKey || 'index';
  return {
    inject: (_inject = {}, _inject[_parent] = {
      default: null },
    _inject),
    computed: (_computed = {
      parent: function parent() {
        if (this.disableBindRelation) {
          return null;
        }

        return this[_parent];
      } },
    _computed[indexKey] = function () {
      this.bindRelation();

      if (this.parent) {
        return this.parent.children.indexOf(this);
      }

      return null;
    }, _computed),
    watch: {
      disableBindRelation: function disableBindRelation(val) {
        if (!val) {
          this.bindRelation();
        }
      } },

    mounted: function mounted() {
      this.bindRelation();
    },
    beforeDestroy: function beforeDestroy() {
      var _this = this;

      if (this.parent) {
        this.parent.children = this.parent.children.filter(function (item) {
          return item !== _this;
        });
      }
    },
    methods: {
      bindRelation: function bindRelation() {
        if (!this.parent || this.parent.children.indexOf(this) !== -1) {
          return;
        }

        var children = [].concat(this.parent.children, [this]);
        (0, _vnodes.sortChildren)(children, this.parent);
        this.parent.children = children;
      } } };


}
function ParentMixin(parent) {
  return {
    provide: function provide() {
      var _ref;

      return _ref = {}, _ref[parent] = this, _ref;
    },
    data: function data() {
      return {
        children: [] };

    } };

}

/***/ }),
/* 68 */
/*!***********************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/utils/vnodes.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.sortChildren = sortChildren;function flattenVNodes(vnodes) {
  var result = [];

  function traverse(vnodes) {
    vnodes.forEach(function (vnode) {
      result.push(vnode);

      if (vnode.componentInstance) {
        traverse(vnode.componentInstance.$children.map(function (item) {
          return item.$vnode;
        }));
      }

      if (vnode.children) {
        traverse(vnode.children);
      }
    });
  }

  traverse(vnodes);
  return result;
} // sort children instances by vnodes order


function sortChildren(children, parent) {
  var componentOptions = parent.$vnode.componentOptions;

  if (!componentOptions || !componentOptions.children) {
    return;
  }

  var vnodes = flattenVNodes(componentOptions.children);
  children.sort(function (a, b) {
    return vnodes.indexOf(a.$vnode) - vnodes.indexOf(b.$vnode);
  });
}

/***/ }),
/* 69 */
/*!************************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/goods-action-button/index.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/esm/extends */ 15));
var _utils = __webpack_require__(/*! ../utils */ 17);
var _router = __webpack_require__(/*! ../utils/router */ 55);
var _relation = __webpack_require__(/*! ../mixins/relation */ 67);
var _button = _interopRequireDefault(__webpack_require__(/*! ../button */ 63));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var _createNamespace = (0, _utils.createNamespace)('goods-action-button'),
createComponent = _createNamespace[0],
bem = _createNamespace[1];var _default =

createComponent({
  mixins: [(0, _relation.ChildrenMixin)('vanGoodsAction')],
  props: (0, _extends2.default)({}, _router.routeProps, {
    type: String,
    text: String,
    icon: String,
    color: String,
    loading: Boolean,
    disabled: Boolean }),

  computed: {
    isFirst: function isFirst() {
      var prev = this.parent && this.parent.children[this.index - 1];
      return !prev || prev.$options.name !== this.$options.name;
    },
    isLast: function isLast() {
      var next = this.parent && this.parent.children[this.index + 1];
      return !next || next.$options.name !== this.$options.name;
    } },

  methods: {
    onClick: function onClick(event) {
      this.$emit('click', event);
      (0, _router.route)(this.$router, this);
    } },

  render: function render() {
    var h = arguments[0];
    return h(_button.default, {
      "class": bem([{
        first: this.isFirst,
        last: this.isLast },
      this.type]),
      "attrs": {
        "size": "large",
        "type": this.type,
        "icon": this.icon,
        "color": this.color,
        "loading": this.loading,
        "disabled": this.disabled },

      "on": {
        "click": this.onClick } },

    [this.slots() || this.text]);
  } });exports.default = _default;

/***/ }),
/* 70 */
/*!******************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/address-edit/Detail.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/esm/extends */ 15));

var _utils = __webpack_require__(/*! ../utils */ 17);
var _system = __webpack_require__(/*! ../utils/validate/system */ 59);

var _cell = _interopRequireDefault(__webpack_require__(/*! ../cell */ 54));
var _field = _interopRequireDefault(__webpack_require__(/*! ../field */ 57));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // Utils
// Components
var _createNamespace = (0, _utils.createNamespace)('address-edit-detail'),
createComponent = _createNamespace[0],
bem = _createNamespace[1],
t = _createNamespace[2];

var android = (0, _system.isAndroid)();var _default =
createComponent({
  props: {
    value: String,
    errorMessage: String,
    focused: Boolean,
    detailRows: [Number, String],
    searchResult: Array,
    detailMaxlength: [Number, String],
    showSearchResult: Boolean },

  computed: {
    shouldShowSearchResult: function shouldShowSearchResult() {
      return this.focused && this.searchResult && this.showSearchResult;
    } },

  methods: {
    onSelect: function onSelect(express) {
      this.$emit('select-search', express);
      this.$emit('input', ((express.address || '') + " " + (express.name || '')).trim());
    },
    onFinish: function onFinish() {
      this.$refs.field.blur();
    },
    genFinish: function genFinish() {
      var h = this.$createElement;
      var show = this.value && this.focused && android;

      if (show) {
        return h("div", {
          "class": bem('finish'),
          "on": {
            "click": this.onFinish } },

        [t('complete')]);
      }
    },
    genSearchResult: function genSearchResult() {
      var _this = this;

      var h = this.$createElement;
      var value = this.value,
      shouldShowSearchResult = this.shouldShowSearchResult,
      searchResult = this.searchResult;

      if (shouldShowSearchResult) {
        return searchResult.map(function (express) {
          return h(_cell.default, {
            "key": express.name + express.address,
            "attrs": {
              "clickable": true,
              "border": false,
              "icon": "location-o",
              "label": express.address },

            "class": bem('search-item'),
            "on": {
              "click": function click() {
                _this.onSelect(express);
              } },

            "scopedSlots": {
              title: function title() {
                if (express.name) {
                  var text = express.name.replace(value, "<span class=" + bem('keyword') + ">" + value + "</span>");
                  return h("div", {
                    "domProps": {
                      "innerHTML": text } });


                }
              } } });


        });
      }
    } },

  render: function render() {
    var h = arguments[0];
    return h(_cell.default, {
      "class": bem() },
    [h(_field.default, {
      "attrs": {
        "autosize": true,
        "rows": this.detailRows,
        "clearable": !android,
        "type": "textarea",
        "value": this.value,
        "errorMessage": this.errorMessage,
        "border": !this.shouldShowSearchResult,
        "label": t('label'),
        "maxlength": this.detailMaxlength,
        "placeholder": t('placeholder') },

      "ref": "field",
      "scopedSlots": {
        icon: this.genFinish },

      "on": (0, _extends2.default)({}, this.$listeners) }),
    this.genSearchResult()]);
  } });exports.default = _default;

/***/ }),
/* 71 */
/*!***********************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/switch/index.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _utils = __webpack_require__(/*! ../utils */ 17);
var _shared = __webpack_require__(/*! ./shared */ 72);

var _field = __webpack_require__(/*! ../mixins/field */ 73);

var _loading = _interopRequireDefault(__webpack_require__(/*! ../loading */ 44));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // Utils
// Mixins
// Components
var _createNamespace = (0, _utils.createNamespace)('switch'),createComponent = _createNamespace[0],
bem = _createNamespace[1];var _default =

createComponent({
  mixins: [_field.FieldMixin],
  props: _shared.switchProps,
  computed: {
    checked: function checked() {
      return this.value === this.activeValue;
    },
    style: function style() {
      return {
        fontSize: (0, _utils.addUnit)(this.size),
        backgroundColor: this.checked ? this.activeColor : this.inactiveColor };

    } },

  methods: {
    onClick: function onClick(event) {
      this.$emit('click', event);

      if (!this.disabled && !this.loading) {
        var newValue = this.checked ? this.inactiveValue : this.activeValue;
        this.$emit('input', newValue);
        this.$emit('change', newValue);
      }
    },
    genLoading: function genLoading() {
      var h = this.$createElement;

      if (this.loading) {
        var color = this.checked ? this.activeColor : this.inactiveColor;
        return h(_loading.default, {
          "class": bem('loading'),
          "attrs": {
            "color": color } });


      }
    } },

  render: function render() {
    var h = arguments[0];
    var checked = this.checked,
    loading = this.loading,
    disabled = this.disabled;
    return h("div", {
      "class": bem({
        on: checked,
        loading: loading,
        disabled: disabled }),

      "attrs": {
        "role": "switch",
        "aria-checked": String(checked) },

      "style": this.style,
      "on": {
        "click": this.onClick } },

    [h("div", {
      "class": bem('node') },
    [this.genLoading()])]);
  } });exports.default = _default;

/***/ }),
/* 72 */
/*!************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/switch/shared.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.switchProps = void 0; /**
                                                                                                          * Common Switch Props
                                                                                                          */
var switchProps = {
  size: [Number, String],
  value: null,
  loading: Boolean,
  disabled: Boolean,
  activeColor: String,
  inactiveColor: String,
  activeValue: {
    type: null,
    default: true },

  inactiveValue: {
    type: null,
    default: false } };exports.switchProps = switchProps;

/***/ }),
/* 73 */
/*!***********************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/mixins/field.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.FieldMixin = void 0;var FieldMixin = {
  inject: {
    vanField: {
      default: null } },


  watch: {
    value: function value() {
      var field = this.vanField;

      if (field) {
        field.resetValidation();
        field.validateWithTrigger('onChange');
      }
    } },

  created: function created() {
    var field = this.vanField;

    if (field && !field.children) {
      field.children = this;
    }
  } };exports.FieldMixin = FieldMixin;

/***/ }),
/* 74 */
/*!*****************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/address-list/index.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _babelHelperVueJsxMergeProps = _interopRequireDefault(__webpack_require__(/*! @vue/babel-helper-vue-jsx-merge-props */ 16));

var _utils = __webpack_require__(/*! ../utils */ 17);
var _functional = __webpack_require__(/*! ../utils/functional */ 29);

var _button = _interopRequireDefault(__webpack_require__(/*! ../button */ 63));
var _radioGroup = _interopRequireDefault(__webpack_require__(/*! ../radio-group */ 75));
var _Item = _interopRequireDefault(__webpack_require__(/*! ./Item */ 76));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // Utils
// Components
// Types
var _createNamespace = (0, _utils.createNamespace)('address-list'),createComponent = _createNamespace[0],
bem = _createNamespace[1],
t = _createNamespace[2];

function AddressList(h, props, slots, ctx) {
  function genList(list, disabled) {
    if (!list) {
      return;
    }

    return list.map(function (item, index) {
      return h(_Item.default, {
        "attrs": {
          "data": item,
          "disabled": disabled,
          "switchable": props.switchable,
          "defaultTagText": props.defaultTagText },

        "key": item.id,
        "scopedSlots": {
          bottom: slots['item-bottom'] },

        "on": {
          "select": function select() {
            (0, _functional.emit)(ctx, disabled ? 'select-disabled' : 'select', item, index);

            if (!disabled) {
              (0, _functional.emit)(ctx, 'input', item.id);
            }
          },
          "edit": function edit() {
            (0, _functional.emit)(ctx, disabled ? 'edit-disabled' : 'edit', item, index);
          },
          "click": function click() {
            (0, _functional.emit)(ctx, 'click-item', item, index);
          } } });


    });
  }

  var List = genList(props.list);
  var DisabledList = genList(props.disabledList, true);
  return h("div", (0, _babelHelperVueJsxMergeProps.default)([{
    "class": bem() },
  (0, _functional.inherit)(ctx)]), [slots.top == null ? void 0 : slots.top(), h(_radioGroup.default, {
    "attrs": {
      "value": props.value } },

  [List]), props.disabledText && h("div", {
    "class": bem('disabled-text') },
  [props.disabledText]), DisabledList, slots.default == null ? void 0 : slots.default(), h("div", {
    "class": bem('bottom') },
  [h(_button.default, {
    "attrs": {
      "round": true,
      "block": true,
      "type": "danger",
      "text": props.addButtonText || t('add') },

    "class": bem('add'),
    "on": {
      "click": function click() {
        (0, _functional.emit)(ctx, 'add');
      } } })])]);


}

AddressList.props = {
  list: Array,
  value: [Number, String],
  disabledList: Array,
  disabledText: String,
  addButtonText: String,
  defaultTagText: String,
  switchable: {
    type: Boolean,
    default: true } };var _default =


createComponent(AddressList);exports.default = _default;

/***/ }),
/* 75 */
/*!****************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/radio-group/index.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _utils = __webpack_require__(/*! ../utils */ 17);
var _field = __webpack_require__(/*! ../mixins/field */ 73);
var _relation = __webpack_require__(/*! ../mixins/relation */ 67);

var _createNamespace = (0, _utils.createNamespace)('radio-group'),
createComponent = _createNamespace[0],
bem = _createNamespace[1];var _default =

createComponent({
  mixins: [(0, _relation.ParentMixin)('vanRadio'), _field.FieldMixin],
  props: {
    value: null,
    disabled: Boolean,
    direction: String,
    checkedColor: String,
    iconSize: [Number, String] },

  watch: {
    value: function value(_value) {
      this.$emit('change', _value);
    } },

  render: function render() {
    var h = arguments[0];
    return h("div", {
      "class": bem([this.direction]),
      "attrs": {
        "role": "radiogroup" } },

    [this.slots()]);
  } });exports.default = _default;

/***/ }),
/* 76 */
/*!****************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/address-list/Item.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/esm/extends */ 15));
var _babelHelperVueJsxMergeProps = _interopRequireDefault(__webpack_require__(/*! @vue/babel-helper-vue-jsx-merge-props */ 16));

var _utils = __webpack_require__(/*! ../utils */ 17);
var _functional = __webpack_require__(/*! ../utils/functional */ 29);

var _tag = _interopRequireDefault(__webpack_require__(/*! ../tag */ 77));
var _icon = _interopRequireDefault(__webpack_require__(/*! ../icon */ 41));
var _cell = _interopRequireDefault(__webpack_require__(/*! ../cell */ 54));
var _radio = _interopRequireDefault(__webpack_require__(/*! ../radio */ 78));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // Utils
// Components
// Types
var _createNamespace = (0, _utils.createNamespace)('address-item'),createComponent = _createNamespace[0],
bem = _createNamespace[1];

function AddressItem(h, props, slots, ctx) {
  var disabled = props.disabled,
  switchable = props.switchable;

  function onClick() {
    if (switchable) {
      (0, _functional.emit)(ctx, 'select');
    }

    (0, _functional.emit)(ctx, 'click');
  }

  var genRightIcon = function genRightIcon() {
    return h(_icon.default, {
      "attrs": {
        "name": "edit" },

      "class": bem('edit'),
      "on": {
        "click": function click(event) {
          event.stopPropagation();
          (0, _functional.emit)(ctx, 'edit');
          (0, _functional.emit)(ctx, 'click');
        } } });


  };

  function genTag() {
    if (props.data.isDefault && props.defaultTagText) {
      return h(_tag.default, {
        "attrs": {
          "type": "danger",
          "round": true },

        "class": bem('tag') },
      [props.defaultTagText]);
    }
  }

  function genContent() {
    var data = props.data;
    var Info = [h("div", {
      "class": bem('name') },
    [data.name + " " + data.tel, genTag()]), h("div", {
      "class": bem('address') },
    [data.address])];

    if (switchable && !disabled) {
      return h(_radio.default, {
        "attrs": {
          "name": data.id,
          "iconSize": 18 } },

      [Info]);
    }

    return Info;
  }

  return h("div", {
    "class": bem({
      disabled: disabled }),

    "on": {
      "click": onClick } },

  [h(_cell.default, (0, _babelHelperVueJsxMergeProps.default)([{
    "attrs": {
      "border": false,
      "valueClass": bem('value') },

    "scopedSlots": {
      default: genContent,
      'right-icon': genRightIcon } },

  (0, _functional.inherit)(ctx)])), slots.bottom == null ? void 0 : slots.bottom((0, _extends2.default)({}, props.data, {
    disabled: disabled }))]);

}

AddressItem.props = {
  data: Object,
  disabled: Boolean,
  switchable: Boolean,
  defaultTagText: String };var _default =

createComponent(AddressItem);exports.default = _default;

/***/ }),
/* 77 */
/*!********************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/tag/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _babelHelperVueJsxMergeProps = _interopRequireDefault(__webpack_require__(/*! @vue/babel-helper-vue-jsx-merge-props */ 16));

var _utils = __webpack_require__(/*! ../utils */ 17);
var _functional = __webpack_require__(/*! ../utils/functional */ 29);

var _icon = _interopRequireDefault(__webpack_require__(/*! ../icon */ 41));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // Utils
// Components
// Types
var _createNamespace = (0, _utils.createNamespace)('tag'),createComponent = _createNamespace[0],
bem = _createNamespace[1];

function Tag(h, props, slots, ctx) {
  var _style;

  var type = props.type,
  mark = props.mark,
  plain = props.plain,
  color = props.color,
  round = props.round,
  size = props.size;
  var key = plain ? 'color' : 'backgroundColor';
  var style = (_style = {}, _style[key] = color, _style);

  if (props.textColor) {
    style.color = props.textColor;
  }

  var classes = {
    mark: mark,
    plain: plain,
    round: round };


  if (size) {
    classes[size] = size;
  }

  var CloseIcon = props.closeable && h(_icon.default, {
    "attrs": {
      "name": "cross" },

    "class": bem('close'),
    "on": {
      "click": function click(event) {
        event.stopPropagation();
        (0, _functional.emit)(ctx, 'close');
      } } });


  return h("transition", {
    "attrs": {
      "name": props.closeable ? 'van-fade' : null } },

  [h("span", (0, _babelHelperVueJsxMergeProps.default)([{
    "key": "content",
    "style": style,
    "class": bem([classes, type]) },
  (0, _functional.inherit)(ctx, true)]), [slots.default == null ? void 0 : slots.default(), CloseIcon])]);
}

Tag.props = {
  size: String,
  mark: Boolean,
  color: String,
  plain: Boolean,
  round: Boolean,
  textColor: String,
  closeable: Boolean,
  type: {
    type: String,
    default: 'default' } };var _default =


createComponent(Tag);exports.default = _default;

/***/ }),
/* 78 */
/*!**********************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/radio/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _utils = __webpack_require__(/*! ../utils */ 17);
var _checkbox = __webpack_require__(/*! ../mixins/checkbox */ 79);

var _createNamespace = (0, _utils.createNamespace)('radio'),
createComponent = _createNamespace[0],
bem = _createNamespace[1];var _default =

createComponent({
  mixins: [(0, _checkbox.CheckboxMixin)({
    bem: bem,
    role: 'radio',
    parent: 'vanRadio' })],

  computed: {
    currentValue: {
      get: function get() {
        return this.parent ? this.parent.value : this.value;
      },
      set: function set(val) {
        (this.parent || this).$emit('input', val);
      } },

    checked: function checked() {
      return this.currentValue === this.name;
    } },

  methods: {
    toggle: function toggle() {
      this.currentValue = this.name;
    } } });exports.default = _default;

/***/ }),
/* 79 */
/*!**************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/mixins/checkbox.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.CheckboxMixin = void 0;


var _icon = _interopRequireDefault(__webpack_require__(/*! ../icon */ 41));
var _field = __webpack_require__(/*! ./field */ 73);
var _relation = __webpack_require__(/*! ./relation */ 67);
var _utils = __webpack_require__(/*! ../utils */ 17);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /**
                                                                                                                                * Common part of Checkbox & Radio
                                                                                                                                */var CheckboxMixin = function CheckboxMixin(_ref) {var parent = _ref.parent,
  bem = _ref.bem,
  role = _ref.role;
  return {
    mixins: [(0, _relation.ChildrenMixin)(parent), _field.FieldMixin],
    props: {
      name: null,
      value: null,
      disabled: Boolean,
      iconSize: [Number, String],
      checkedColor: String,
      labelPosition: String,
      labelDisabled: Boolean,
      shape: {
        type: String,
        default: 'round' },

      bindGroup: {
        type: Boolean,
        default: true } },


    computed: {
      disableBindRelation: function disableBindRelation() {
        return !this.bindGroup;
      },
      isDisabled: function isDisabled() {
        return this.parent && this.parent.disabled || this.disabled;
      },
      direction: function direction() {
        return this.parent && this.parent.direction || null;
      },
      iconStyle: function iconStyle() {
        var checkedColor = this.checkedColor || this.parent && this.parent.checkedColor;

        if (checkedColor && this.checked && !this.isDisabled) {
          return {
            borderColor: checkedColor,
            backgroundColor: checkedColor };

        }
      },
      tabindex: function tabindex() {
        if (this.isDisabled || role === 'radio' && !this.checked) {
          return -1;
        }

        return 0;
      } },

    methods: {
      onClick: function onClick(event) {
        var _this = this;

        var target = event.target;
        var icon = this.$refs.icon;
        var iconClicked = icon === target || icon.contains(target);

        if (!this.isDisabled && (iconClicked || !this.labelDisabled)) {
          this.toggle(); // wait for toggle method to complete
          // so we can get the changed value in the click event listener

          setTimeout(function () {
            _this.$emit('click', event);
          });
        } else {
          this.$emit('click', event);
        }
      },
      genIcon: function genIcon() {
        var h = this.$createElement;
        var checked = this.checked;
        var iconSize = this.iconSize || this.parent && this.parent.iconSize;
        return h("div", {
          "ref": "icon",
          "class": bem('icon', [this.shape, {
            disabled: this.isDisabled,
            checked: checked }]),

          "style": {
            fontSize: (0, _utils.addUnit)(iconSize) } },

        [this.slots('icon', {
          checked: checked }) ||
        h(_icon.default, {
          "attrs": {
            "name": "success" },

          "style": this.iconStyle })]);

      },
      genLabel: function genLabel() {
        var h = this.$createElement;
        var slot = this.slots();

        if (slot) {
          return h("span", {
            "class": bem('label', [this.labelPosition, {
              disabled: this.isDisabled }]) },

          [slot]);
        }
      } },

    render: function render() {
      var h = arguments[0];
      var Children = [this.genIcon()];

      if (this.labelPosition === 'left') {
        Children.unshift(this.genLabel());
      } else {
        Children.push(this.genLabel());
      }

      return h("div", {
        "attrs": {
          "role": role,
          "tabindex": this.tabindex,
          "aria-checked": String(this.checked) },

        "class": bem([{
          disabled: this.isDisabled,
          'label-disabled': this.labelDisabled },
        this.direction]),
        "on": {
          "click": this.onClick } },

      [Children]);
    } };

};exports.CheckboxMixin = CheckboxMixin;

/***/ }),
/* 80 */
/*!**********************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/badge/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _utils = __webpack_require__(/*! ../utils */ 17);
var _number = __webpack_require__(/*! ../utils/validate/number */ 28);

var _createNamespace = (0, _utils.createNamespace)('badge'),
createComponent = _createNamespace[0],
bem = _createNamespace[1];var _default =

createComponent({
  props: {
    dot: Boolean,
    max: [Number, String],
    color: String,
    content: [Number, String],
    tag: {
      type: String,
      default: 'div' } },


  methods: {
    hasContent: function hasContent() {
      return !!(this.$scopedSlots.content || (0, _utils.isDef)(this.content) && this.content !== '');
    },
    renderContent: function renderContent() {
      var dot = this.dot,
      max = this.max,
      content = this.content;

      if (!dot && this.hasContent()) {
        if (this.$scopedSlots.content) {
          return this.$scopedSlots.content();
        }

        if ((0, _utils.isDef)(max) && (0, _number.isNumeric)(content) && +content > max) {
          return max + "+";
        }

        return content;
      }
    },
    renderBadge: function renderBadge() {
      var h = this.$createElement;

      if (this.hasContent() || this.dot) {
        return h("div", {
          "class": bem({
            dot: this.dot,
            fixed: !!this.$scopedSlots.default }),

          "style": {
            background: this.color } },

        [this.renderContent()]);
      }
    } },

  render: function render() {
    var h = arguments[0];

    if (this.$scopedSlots.default) {
      var tag = this.tag;
      return h(tag, {
        "class": bem('wrapper') },
      [this.$scopedSlots.default(), this.renderBadge()]);
    }

    return this.renderBadge();
  } });exports.default = _default;

/***/ }),
/* 81 */
/*!*************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/calendar/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _raf = __webpack_require__(/*! ../utils/dom/raf */ 82);
var _date = __webpack_require__(/*! ../utils/validate/date */ 83);
var _scroll = __webpack_require__(/*! ../utils/dom/scroll */ 36);
var _utils = __webpack_require__(/*! ./utils */ 84);

var _popup = _interopRequireDefault(__webpack_require__(/*! ../popup */ 43));
var _button = _interopRequireDefault(__webpack_require__(/*! ../button */ 63));
var _toast = _interopRequireDefault(__webpack_require__(/*! ../toast */ 60));
var _Month = _interopRequireDefault(__webpack_require__(/*! ./components/Month */ 85));
var _Header = _interopRequireDefault(__webpack_require__(/*! ./components/Header */ 87));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // Utils
// Components
var _default2 = (0, _utils.createComponent)({ props: {
    title: String,
    color: String,
    value: Boolean,
    readonly: Boolean,
    formatter: Function,
    rowHeight: [Number, String],
    confirmText: String,
    rangePrompt: String,
    defaultDate: [Date, Array],
    getContainer: [String, Function],
    allowSameDay: Boolean,
    confirmDisabledText: String,
    type: {
      type: String,
      default: 'single' },

    round: {
      type: Boolean,
      default: true },

    position: {
      type: String,
      default: 'bottom' },

    poppable: {
      type: Boolean,
      default: true },

    maxRange: {
      type: [Number, String],
      default: null },

    lazyRender: {
      type: Boolean,
      default: true },

    showMark: {
      type: Boolean,
      default: true },

    showTitle: {
      type: Boolean,
      default: true },

    showConfirm: {
      type: Boolean,
      default: true },

    showSubtitle: {
      type: Boolean,
      default: true },

    closeOnPopstate: {
      type: Boolean,
      default: true },

    closeOnClickOverlay: {
      type: Boolean,
      default: true },

    safeAreaInsetBottom: {
      type: Boolean,
      default: true },

    minDate: {
      type: Date,
      validator: _date.isDate,
      default: function _default() {
        return new Date();
      } },

    maxDate: {
      type: Date,
      validator: _date.isDate,
      default: function _default() {
        var now = new Date();
        return new Date(now.getFullYear(), now.getMonth() + 6, now.getDate());
      } },

    firstDayOfWeek: {
      type: [Number, String],
      default: 0,
      validator: function validator(val) {
        return val >= 0 && val <= 6;
      } } },


  data: function data() {
    return {
      subtitle: '',
      currentDate: this.getInitialDate() };

  },
  computed: {
    months: function months() {
      var months = [];
      var cursor = new Date(this.minDate);
      cursor.setDate(1);

      do {
        months.push(new Date(cursor));
        cursor.setMonth(cursor.getMonth() + 1);
      } while ((0, _utils.compareMonth)(cursor, this.maxDate) !== 1);

      return months;
    },
    buttonDisabled: function buttonDisabled() {
      var type = this.type,
      currentDate = this.currentDate;

      if (currentDate) {
        if (type === 'range') {
          return !currentDate[0] || !currentDate[1];
        }

        if (type === 'multiple') {
          return !currentDate.length;
        }
      }

      return !currentDate;
    },
    dayOffset: function dayOffset() {
      return this.firstDayOfWeek ? this.firstDayOfWeek % 7 : 0;
    } },

  watch: {
    value: 'init',
    type: function type() {
      this.reset();
    },
    defaultDate: function defaultDate(val) {
      this.currentDate = val;
      this.scrollIntoView();
    } },

  mounted: function mounted() {
    this.init();
  },

  /* istanbul ignore next */
  activated: function activated() {
    this.init();
  },
  methods: {
    // @exposed-api
    reset: function reset(date) {
      if (date === void 0) {
        date = this.getInitialDate();
      }

      this.currentDate = date;
      this.scrollIntoView();
    },
    init: function init() {
      var _this = this;

      if (this.poppable && !this.value) {
        return;
      }

      this.$nextTick(function () {
        // add Math.floor to avoid decimal height issues
        // https://github.com/youzan/vant/issues/5640
        _this.bodyHeight = Math.floor(_this.$refs.body.getBoundingClientRect().height);

        _this.onScroll();

        _this.scrollIntoView();
      });
    },
    // @exposed-api
    scrollToDate: function scrollToDate(targetDate) {
      var _this2 = this;

      (0, _raf.raf)(function () {
        var displayed = _this2.value || !_this2.poppable;
        /* istanbul ignore if */

        if (!targetDate || !displayed) {
          return;
        }

        _this2.months.some(function (month, index) {
          if ((0, _utils.compareMonth)(month, targetDate) === 0) {
            var _this2$$refs = _this2.$refs,
            body = _this2$$refs.body,
            months = _this2$$refs.months;
            months[index].scrollIntoView(body);
            return true;
          }

          return false;
        });
      });
    },
    // scroll to current month
    scrollIntoView: function scrollIntoView() {
      var currentDate = this.currentDate;

      if (currentDate) {
        var targetDate = this.type === 'single' ? currentDate : currentDate[0];
        this.scrollToDate(targetDate);
      }
    },
    getInitialDate: function getInitialDate() {
      var type = this.type,
      minDate = this.minDate,
      maxDate = this.maxDate,
      defaultDate = this.defaultDate;

      if (defaultDate === null) {
        return defaultDate;
      }

      var defaultVal = new Date();

      if ((0, _utils.compareDay)(defaultVal, minDate) === -1) {
        defaultVal = minDate;
      } else if ((0, _utils.compareDay)(defaultVal, maxDate) === 1) {
        defaultVal = maxDate;
      }

      if (type === 'range') {
        var _ref = defaultDate || [],
        startDay = _ref[0],
        endDay = _ref[1];

        return [startDay || defaultVal, endDay || (0, _utils.getNextDay)(defaultVal)];
      }

      if (type === 'multiple') {
        return defaultDate || [defaultVal];
      }

      return defaultDate || defaultVal;
    },
    // calculate the position of the elements
    // and find the elements that needs to be rendered
    onScroll: function onScroll() {
      var _this$$refs = this.$refs,
      body = _this$$refs.body,
      months = _this$$refs.months;
      var top = (0, _scroll.getScrollTop)(body);
      var bottom = top + this.bodyHeight;
      var heights = months.map(function (item) {
        return item.getHeight();
      });
      var heightSum = heights.reduce(function (a, b) {
        return a + b;
      }, 0); // iOS scroll bounce may exceed the range

      if (bottom > heightSum && top > 0) {
        return;
      }

      var height = 0;
      var currentMonth;
      var visibleRange = [-1, -1];

      for (var i = 0; i < months.length; i++) {
        var visible = height <= bottom && height + heights[i] >= top;

        if (visible) {
          visibleRange[1] = i;

          if (!currentMonth) {
            currentMonth = months[i];
            visibleRange[0] = i;
          }

          if (!months[i].showed) {
            months[i].showed = true;
            this.$emit('month-show', {
              date: months[i].date,
              title: months[i].title });

          }
        }

        height += heights[i];
      }

      months.forEach(function (month, index) {
        month.visible = index >= visibleRange[0] - 1 && index <= visibleRange[1] + 1;
      });
      /* istanbul ignore else */

      if (currentMonth) {
        this.subtitle = currentMonth.title;
      }
    },
    onClickDay: function onClickDay(item) {
      if (this.readonly) {
        return;
      }

      var date = item.date;
      var type = this.type,
      currentDate = this.currentDate;

      if (type === 'range') {
        if (!currentDate) {
          this.select([date, null]);
          return;
        }

        var startDay = currentDate[0],
        endDay = currentDate[1];

        if (startDay && !endDay) {
          var compareToStart = (0, _utils.compareDay)(date, startDay);

          if (compareToStart === 1) {
            this.select([startDay, date], true);
          } else if (compareToStart === -1) {
            this.select([date, null]);
          } else if (this.allowSameDay) {
            this.select([date, date], true);
          }
        } else {
          this.select([date, null]);
        }
      } else if (type === 'multiple') {
        if (!currentDate) {
          this.select([date]);
          return;
        }

        var selectedIndex;
        var selected = this.currentDate.some(function (dateItem, index) {
          var equal = (0, _utils.compareDay)(dateItem, date) === 0;

          if (equal) {
            selectedIndex = index;
          }

          return equal;
        });

        if (selected) {
          var _currentDate$splice = currentDate.splice(selectedIndex, 1),
          unselectedDate = _currentDate$splice[0];

          this.$emit('unselect', (0, _utils.copyDate)(unselectedDate));
        } else if (this.maxRange && currentDate.length >= this.maxRange) {
          (0, _toast.default)(this.rangePrompt || (0, _utils.t)('rangePrompt', this.maxRange));
        } else {
          this.select([].concat(currentDate, [date]));
        }
      } else {
        this.select(date, true);
      }
    },
    togglePopup: function togglePopup(val) {
      this.$emit('input', val);
    },
    select: function select(date, complete) {
      var _this3 = this;

      var emit = function emit(date) {
        _this3.currentDate = date;

        _this3.$emit('select', (0, _utils.copyDates)(_this3.currentDate));
      };

      if (complete && this.type === 'range') {
        var valid = this.checkRange(date);

        if (!valid) {
          // auto selected to max range if showConfirm
          if (this.showConfirm) {
            emit([date[0], (0, _utils.getDayByOffset)(date[0], this.maxRange - 1)]);
          } else {
            emit(date);
          }

          return;
        }
      }

      emit(date);

      if (complete && !this.showConfirm) {
        this.onConfirm();
      }
    },
    checkRange: function checkRange(date) {
      var maxRange = this.maxRange,
      rangePrompt = this.rangePrompt;

      if (maxRange && (0, _utils.calcDateNum)(date) > maxRange) {
        (0, _toast.default)(rangePrompt || (0, _utils.t)('rangePrompt', maxRange));
        return false;
      }

      return true;
    },
    onConfirm: function onConfirm() {
      this.$emit('confirm', (0, _utils.copyDates)(this.currentDate));
    },
    genMonth: function genMonth(date, index) {
      var h = this.$createElement;
      var showMonthTitle = index !== 0 || !this.showSubtitle;
      return h(_Month.default, {
        "ref": "months",
        "refInFor": true,
        "attrs": {
          "date": date,
          "type": this.type,
          "color": this.color,
          "minDate": this.minDate,
          "maxDate": this.maxDate,
          "showMark": this.showMark,
          "formatter": this.formatter,
          "rowHeight": this.rowHeight,
          "lazyRender": this.lazyRender,
          "currentDate": this.currentDate,
          "showSubtitle": this.showSubtitle,
          "allowSameDay": this.allowSameDay,
          "showMonthTitle": showMonthTitle,
          "firstDayOfWeek": this.dayOffset },

        "on": {
          "click": this.onClickDay } });


    },
    genFooterContent: function genFooterContent() {
      var h = this.$createElement;
      var slot = this.slots('footer');

      if (slot) {
        return slot;
      }

      if (this.showConfirm) {
        var text = this.buttonDisabled ? this.confirmDisabledText : this.confirmText;
        return h(_button.default, {
          "attrs": {
            "round": true,
            "block": true,
            "type": "danger",
            "color": this.color,
            "disabled": this.buttonDisabled,
            "nativeType": "button" },

          "class": (0, _utils.bem)('confirm'),
          "on": {
            "click": this.onConfirm } },

        [text || (0, _utils.t)('confirm')]);
      }
    },
    genFooter: function genFooter() {
      var h = this.$createElement;
      return h("div", {
        "class": (0, _utils.bem)('footer', {
          unfit: !this.safeAreaInsetBottom }) },

      [this.genFooterContent()]);
    },
    genCalendar: function genCalendar() {
      var _this4 = this;

      var h = this.$createElement;
      return h("div", {
        "class": (0, _utils.bem)() },
      [h(_Header.default, {
        "attrs": {
          "title": this.title,
          "showTitle": this.showTitle,
          "subtitle": this.subtitle,
          "showSubtitle": this.showSubtitle,
          "firstDayOfWeek": this.dayOffset },

        "scopedSlots": {
          title: function title() {
            return _this4.slots('title');
          } } }),

      h("div", {
        "ref": "body",
        "class": (0, _utils.bem)('body'),
        "on": {
          "scroll": this.onScroll } },

      [this.months.map(this.genMonth)]), this.genFooter()]);
    } },

  render: function render() {
    var _this5 = this;

    var h = arguments[0];

    if (this.poppable) {
      var _attrs;

      var createListener = function createListener(name) {
        return function () {
          return _this5.$emit(name);
        };
      };

      return h(_popup.default, {
        "attrs": (_attrs = {
          "round": true,
          "value": this.value },
        _attrs["round"] = this.round, _attrs["position"] = this.position, _attrs["closeable"] = this.showTitle || this.showSubtitle, _attrs["getContainer"] = this.getContainer, _attrs["closeOnPopstate"] = this.closeOnPopstate, _attrs["closeOnClickOverlay"] = this.closeOnClickOverlay, _attrs),
        "class": (0, _utils.bem)('popup'),
        "on": {
          "input": this.togglePopup,
          "open": createListener('open'),
          "opened": createListener('opened'),
          "close": createListener('close'),
          "closed": createListener('closed') } },

      [this.genCalendar()]);
    }

    return this.genCalendar();
  } });exports.default = _default2;

/***/ }),
/* 82 */
/*!************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/utils/dom/raf.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {Object.defineProperty(exports, "__esModule", { value: true });exports.raf = raf;exports.doubleRaf = doubleRaf;exports.cancelRaf = cancelRaf;


var _ = __webpack_require__(/*! .. */ 17); /**
                        * requestAnimationFrame polyfill
                        */var prev = Date.now(); /* istanbul ignore next */

function fallback(fn) {
  var curr = Date.now();
  var ms = Math.max(0, 16 - (curr - prev));
  var id = setTimeout(fn, ms);
  prev = curr + ms;
  return id;
}
/* istanbul ignore next */


var root = _.isServer ? global : window;
/* istanbul ignore next */

var iRaf = root.requestAnimationFrame || fallback;
/* istanbul ignore next */

var iCancel = root.cancelAnimationFrame || root.clearTimeout;
function raf(fn) {
  return iRaf.call(root, fn);
} // double raf for animation

function doubleRaf(fn) {
  raf(function () {
    raf(fn);
  });
}
function cancelRaf(id) {
  iCancel.call(root, id);
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! (webpack)/buildin/global.js */ 3)))

/***/ }),
/* 83 */
/*!******************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/utils/validate/date.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.isDate = isDate;var _number = __webpack_require__(/*! ./number */ 28);
function isDate(val) {
  return Object.prototype.toString.call(val) === '[object Date]' && !(0, _number.isNaN)(val.getTime());
}

/***/ }),
/* 84 */
/*!*************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/calendar/utils.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.formatMonthTitle = formatMonthTitle;exports.compareMonth = compareMonth;exports.compareDay = compareDay;exports.getDayByOffset = getDayByOffset;exports.getPrevDay = getPrevDay;exports.getNextDay = getNextDay;exports.calcDateNum = calcDateNum;exports.copyDate = copyDate;exports.copyDates = copyDates;exports.t = exports.bem = exports.createComponent = void 0;var _utils = __webpack_require__(/*! ../utils */ 17);

var _createNamespace = (0, _utils.createNamespace)('calendar'),
createComponent = _createNamespace[0],
bem = _createNamespace[1],
t = _createNamespace[2];exports.t = t;exports.bem = bem;exports.createComponent = createComponent;


function formatMonthTitle(date) {
  return t('monthTitle', date.getFullYear(), date.getMonth() + 1);
}
function compareMonth(date1, date2) {
  var year1 = date1.getFullYear();
  var year2 = date2.getFullYear();
  var month1 = date1.getMonth();
  var month2 = date2.getMonth();

  if (year1 === year2) {
    return month1 === month2 ? 0 : month1 > month2 ? 1 : -1;
  }

  return year1 > year2 ? 1 : -1;
}
function compareDay(day1, day2) {
  var compareMonthResult = compareMonth(day1, day2);

  if (compareMonthResult === 0) {
    var date1 = day1.getDate();
    var date2 = day2.getDate();
    return date1 === date2 ? 0 : date1 > date2 ? 1 : -1;
  }

  return compareMonthResult;
}
function getDayByOffset(date, offset) {
  date = new Date(date);
  date.setDate(date.getDate() + offset);
  return date;
}
function getPrevDay(date) {
  return getDayByOffset(date, -1);
}
function getNextDay(date) {
  return getDayByOffset(date, 1);
}
function calcDateNum(date) {
  var day1 = date[0].getTime();
  var day2 = date[1].getTime();
  return (day2 - day1) / (1000 * 60 * 60 * 24) + 1;
}
function copyDate(dates) {
  return new Date(dates);
}
function copyDates(dates) {
  if (Array.isArray(dates)) {
    return dates.map(function (date) {
      if (date === null) {
        return date;
      }

      return copyDate(date);
    });
  }

  return copyDate(dates);
}

/***/ }),
/* 85 */
/*!************************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/calendar/components/Month.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _utils = __webpack_require__(/*! ../../utils */ 17);
var _scroll = __webpack_require__(/*! ../../utils/dom/scroll */ 36);
var _utils2 = __webpack_require__(/*! ../utils */ 84);
var _utils3 = __webpack_require__(/*! ../../datetime-picker/utils */ 86);

var _createNamespace = (0, _utils.createNamespace)('calendar-month'),
createComponent = _createNamespace[0];var _default =

createComponent({
  props: {
    date: Date,
    type: String,
    color: String,
    minDate: Date,
    maxDate: Date,
    showMark: Boolean,
    rowHeight: [Number, String],
    formatter: Function,
    lazyRender: Boolean,
    currentDate: [Date, Array],
    allowSameDay: Boolean,
    showSubtitle: Boolean,
    showMonthTitle: Boolean,
    firstDayOfWeek: Number },

  data: function data() {
    return {
      visible: false };

  },
  computed: {
    title: function title() {
      return (0, _utils2.formatMonthTitle)(this.date);
    },
    rowHeightWithUnit: function rowHeightWithUnit() {
      return (0, _utils.addUnit)(this.rowHeight);
    },
    offset: function offset() {
      var firstDayOfWeek = this.firstDayOfWeek;
      var realDay = this.date.getDay();

      if (!firstDayOfWeek) {
        return realDay;
      }

      return (realDay + 7 - this.firstDayOfWeek) % 7;
    },
    totalDay: function totalDay() {
      return (0, _utils3.getMonthEndDay)(this.date.getFullYear(), this.date.getMonth() + 1);
    },
    shouldRender: function shouldRender() {
      return this.visible || !this.lazyRender;
    },
    placeholders: function placeholders() {
      var rows = [];
      var count = Math.ceil((this.totalDay + this.offset) / 7);

      for (var day = 1; day <= count; day++) {
        rows.push({
          type: 'placeholder' });

      }

      return rows;
    },
    days: function days() {
      var days = [];
      var year = this.date.getFullYear();
      var month = this.date.getMonth();

      for (var day = 1; day <= this.totalDay; day++) {
        var date = new Date(year, month, day);
        var type = this.getDayType(date);
        var config = {
          date: date,
          type: type,
          text: day,
          bottomInfo: this.getBottomInfo(type) };


        if (this.formatter) {
          config = this.formatter(config);
        }

        days.push(config);
      }

      return days;
    } },

  methods: {
    getHeight: function getHeight() {
      if (!this.height) {
        this.height = this.$el.getBoundingClientRect().height;
      }

      return this.height;
    },
    scrollIntoView: function scrollIntoView(body) {
      var _this$$refs = this.$refs,
      days = _this$$refs.days,
      month = _this$$refs.month;
      var el = this.showSubtitle ? days : month;
      var scrollTop = el.getBoundingClientRect().top - body.getBoundingClientRect().top + body.scrollTop;
      (0, _scroll.setScrollTop)(body, scrollTop);
    },
    getMultipleDayType: function getMultipleDayType(day) {
      var _this = this;

      var isSelected = function isSelected(date) {
        return _this.currentDate.some(function (item) {
          return (0, _utils2.compareDay)(item, date) === 0;
        });
      };

      if (isSelected(day)) {
        var prevDay = (0, _utils2.getPrevDay)(day);
        var nextDay = (0, _utils2.getNextDay)(day);
        var prevSelected = isSelected(prevDay);
        var nextSelected = isSelected(nextDay);

        if (prevSelected && nextSelected) {
          return 'multiple-middle';
        }

        if (prevSelected) {
          return 'end';
        }

        return nextSelected ? 'start' : 'multiple-selected';
      }

      return '';
    },
    getRangeDayType: function getRangeDayType(day) {
      var _this$currentDate = this.currentDate,
      startDay = _this$currentDate[0],
      endDay = _this$currentDate[1];

      if (!startDay) {
        return '';
      }

      var compareToStart = (0, _utils2.compareDay)(day, startDay);

      if (!endDay) {
        return compareToStart === 0 ? 'start' : '';
      }

      var compareToEnd = (0, _utils2.compareDay)(day, endDay);

      if (compareToStart === 0 && compareToEnd === 0 && this.allowSameDay) {
        return 'start-end';
      }

      if (compareToStart === 0) {
        return 'start';
      }

      if (compareToEnd === 0) {
        return 'end';
      }

      if (compareToStart > 0 && compareToEnd < 0) {
        return 'middle';
      }
    },
    getDayType: function getDayType(day) {
      var type = this.type,
      minDate = this.minDate,
      maxDate = this.maxDate,
      currentDate = this.currentDate;

      if ((0, _utils2.compareDay)(day, minDate) < 0 || (0, _utils2.compareDay)(day, maxDate) > 0) {
        return 'disabled';
      }

      if (currentDate === null) {
        return;
      }

      if (type === 'single') {
        return (0, _utils2.compareDay)(day, currentDate) === 0 ? 'selected' : '';
      }

      if (type === 'multiple') {
        return this.getMultipleDayType(day);
      }
      /* istanbul ignore else */


      if (type === 'range') {
        return this.getRangeDayType(day);
      }
    },
    getBottomInfo: function getBottomInfo(type) {
      if (this.type === 'range') {
        if (type === 'start' || type === 'end') {
          return (0, _utils2.t)(type);
        }

        if (type === 'start-end') {
          return (0, _utils2.t)('startEnd');
        }
      }
    },
    getDayStyle: function getDayStyle(type, index) {
      var style = {
        height: this.rowHeightWithUnit };


      if (type === 'placeholder') {
        style.width = '100%';
        return style;
      }

      if (index === 0) {
        style.marginLeft = 100 * this.offset / 7 + "%";
      }

      if (this.color) {
        if (type === 'start' || type === 'end' || type === 'start-end' || type === 'multiple-selected' || type === 'multiple-middle') {
          style.background = this.color;
        } else if (type === 'middle') {
          style.color = this.color;
        }
      }

      return style;
    },
    genTitle: function genTitle() {
      var h = this.$createElement;

      if (this.showMonthTitle) {
        return h("div", {
          "class": (0, _utils2.bem)('month-title') },
        [this.title]);
      }
    },
    genMark: function genMark() {
      var h = this.$createElement;

      if (this.showMark && this.shouldRender) {
        return h("div", {
          "class": (0, _utils2.bem)('month-mark') },
        [this.date.getMonth() + 1]);
      }
    },
    genDays: function genDays() {
      var h = this.$createElement;
      var days = this.shouldRender ? this.days : this.placeholders;
      return h("div", {
        "ref": "days",
        "attrs": {
          "role": "grid" },

        "class": (0, _utils2.bem)('days') },
      [this.genMark(), days.map(this.genDay)]);
    },
    genDay: function genDay(item, index) {
      var _this2 = this;

      var h = this.$createElement;
      var type = item.type,
      topInfo = item.topInfo,
      bottomInfo = item.bottomInfo;
      var style = this.getDayStyle(type, index);
      var disabled = type === 'disabled';

      var onClick = function onClick() {
        if (!disabled) {
          _this2.$emit('click', item);
        }
      };

      var TopInfo = topInfo && h("div", {
        "class": (0, _utils2.bem)('top-info') },
      [topInfo]);
      var BottomInfo = bottomInfo && h("div", {
        "class": (0, _utils2.bem)('bottom-info') },
      [bottomInfo]);

      if (type === 'selected') {
        return h("div", {
          "attrs": {
            "role": "gridcell",
            "tabindex": -1 },

          "style": style,
          "class": [(0, _utils2.bem)('day'), item.className],
          "on": {
            "click": onClick } },

        [h("div", {
          "class": (0, _utils2.bem)('selected-day'),
          "style": {
            width: this.rowHeightWithUnit,
            height: this.rowHeightWithUnit,
            background: this.color } },

        [TopInfo, item.text, BottomInfo])]);
      }

      return h("div", {
        "attrs": {
          "role": "gridcell",
          "tabindex": disabled ? null : -1 },

        "style": style,
        "class": [(0, _utils2.bem)('day', type), item.className],
        "on": {
          "click": onClick } },

      [TopInfo, item.text, BottomInfo]);
    } },

  render: function render() {
    var h = arguments[0];
    return h("div", {
      "class": (0, _utils2.bem)('month'),
      "ref": "month" },
    [this.genTitle(), this.genDays()]);
  } });exports.default = _default;

/***/ }),
/* 86 */
/*!********************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/datetime-picker/utils.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.times = times;exports.getTrueValue = getTrueValue;exports.getMonthEndDay = getMonthEndDay;var _number = __webpack_require__(/*! ../utils/validate/number */ 28);
function times(n, iteratee) {
  var index = -1;
  var result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }

  return result;
}
function getTrueValue(value) {
  if (!value) {
    return 0;
  }

  while ((0, _number.isNaN)(parseInt(value, 10))) {
    if (value.length > 1) {
      value = value.slice(1);
    } else {
      return 0;
    }
  }

  return parseInt(value, 10);
}
function getMonthEndDay(year, month) {
  return 32 - new Date(year, month - 1, 32).getDate();
}

/***/ }),
/* 87 */
/*!*************************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/calendar/components/Header.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _utils = __webpack_require__(/*! ../../utils */ 17);
var _utils2 = __webpack_require__(/*! ../utils */ 84);

var _createNamespace = (0, _utils.createNamespace)('calendar-header'),
createComponent = _createNamespace[0];var _default =

createComponent({
  props: {
    title: String,
    subtitle: String,
    showTitle: Boolean,
    showSubtitle: Boolean,
    firstDayOfWeek: Number },

  methods: {
    genTitle: function genTitle() {
      var h = this.$createElement;

      if (this.showTitle) {
        var title = this.slots('title') || this.title || (0, _utils2.t)('title');
        return h("div", {
          "class": (0, _utils2.bem)('header-title') },
        [title]);
      }
    },
    genSubtitle: function genSubtitle() {
      var h = this.$createElement;

      if (this.showSubtitle) {
        return h("div", {
          "class": (0, _utils2.bem)('header-subtitle') },
        [this.subtitle]);
      }
    },
    genWeekDays: function genWeekDays() {
      var h = this.$createElement;
      var weekdays = (0, _utils2.t)('weekdays');
      var firstDayOfWeek = this.firstDayOfWeek;
      var renderWeekDays = [].concat(weekdays.slice(firstDayOfWeek, 7), weekdays.slice(0, firstDayOfWeek));
      return h("div", {
        "class": (0, _utils2.bem)('weekdays') },
      [renderWeekDays.map(function (item) {
        return h("span", {
          "class": (0, _utils2.bem)('weekday') },
        [item]);
      })]);
    } },

  render: function render() {
    var h = arguments[0];
    return h("div", {
      "class": (0, _utils2.bem)('header') },
    [this.genTitle(), this.genSubtitle(), this.genWeekDays()]);
  } });exports.default = _default;

/***/ }),
/* 88 */
/*!*********************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/card/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _babelHelperVueJsxMergeProps = _interopRequireDefault(__webpack_require__(/*! @vue/babel-helper-vue-jsx-merge-props */ 16));

var _utils = __webpack_require__(/*! ../utils */ 17);
var _functional = __webpack_require__(/*! ../utils/functional */ 29);

var _tag = _interopRequireDefault(__webpack_require__(/*! ../tag */ 77));
var _image = _interopRequireDefault(__webpack_require__(/*! ../image */ 89));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // Utils
// Components
// Types
var _createNamespace = (0, _utils.createNamespace)('card'),createComponent = _createNamespace[0],
bem = _createNamespace[1];

function Card(h, props, slots, ctx) {
  var _slots$priceTop;

  var thumb = props.thumb;
  var showNum = slots.num || (0, _utils.isDef)(props.num);
  var showPrice = slots.price || (0, _utils.isDef)(props.price);
  var showOriginPrice = slots['origin-price'] || (0, _utils.isDef)(props.originPrice);
  var showBottom = showNum || showPrice || showOriginPrice || slots.bottom;

  function onThumbClick(event) {
    (0, _functional.emit)(ctx, 'click-thumb', event);
  }

  function ThumbTag() {
    if (slots.tag || props.tag) {
      return h("div", {
        "class": bem('tag') },
      [slots.tag ? slots.tag() : h(_tag.default, {
        "attrs": {
          "mark": true,
          "type": "danger" } },

      [props.tag])]);
    }
  }

  function Thumb() {
    if (slots.thumb || thumb) {
      return h("a", {
        "attrs": {
          "href": props.thumbLink },

        "class": bem('thumb'),
        "on": {
          "click": onThumbClick } },

      [slots.thumb ? slots.thumb() : h(_image.default, {
        "attrs": {
          "src": thumb,
          "width": "100%",
          "height": "100%",
          "fit": "cover",
          "lazy-load": props.lazyLoad } }),

      ThumbTag()]);
    }
  }

  function Title() {
    if (slots.title) {
      return slots.title();
    }

    if (props.title) {
      return h("div", {
        "class": [bem('title'), 'van-multi-ellipsis--l2'] },
      [props.title]);
    }
  }

  function Desc() {
    if (slots.desc) {
      return slots.desc();
    }

    if (props.desc) {
      return h("div", {
        "class": [bem('desc'), 'van-ellipsis'] },
      [props.desc]);
    }
  }

  function PriceContent() {
    var priceArr = props.price.toString().split('.');
    return h("div", [h("span", {
      "class": bem('price-currency') },
    [props.currency]), h("span", {
      "class": bem('price-integer') },
    [priceArr[0]]), ".", h("span", {
      "class": bem('price-decimal') },
    [priceArr[1]])]);
  }

  function Price() {
    if (showPrice) {
      return h("div", {
        "class": bem('price') },
      [slots.price ? slots.price() : PriceContent()]);
    }
  }

  function OriginPrice() {
    if (showOriginPrice) {
      var slot = slots['origin-price'];
      return h("div", {
        "class": bem('origin-price') },
      [slot ? slot() : props.currency + " " + props.originPrice]);
    }
  }

  function Num() {
    if (showNum) {
      return h("div", {
        "class": bem('num') },
      [slots.num ? slots.num() : "x" + props.num]);
    }
  }

  function Footer() {
    if (slots.footer) {
      return h("div", {
        "class": bem('footer') },
      [slots.footer()]);
    }
  }

  return h("div", (0, _babelHelperVueJsxMergeProps.default)([{
    "class": bem() },
  (0, _functional.inherit)(ctx, true)]), [h("div", {
    "class": bem('header') },
  [Thumb(), h("div", {
    "class": bem('content', {
      centered: props.centered }) },

  [h("div", [Title(), Desc(), slots.tags == null ? void 0 : slots.tags()]), showBottom && h("div", {
    "class": "van-card__bottom" },
  [(_slots$priceTop = slots['price-top']) == null ? void 0 : _slots$priceTop.call(slots), Price(), OriginPrice(), Num(), slots.bottom == null ? void 0 : slots.bottom()])])]), Footer()]);
}

Card.props = {
  tag: String,
  desc: String,
  thumb: String,
  title: String,
  centered: Boolean,
  lazyLoad: Boolean,
  thumbLink: String,
  num: [Number, String],
  price: [Number, String],
  originPrice: [Number, String],
  currency: {
    type: String,
    default: '¥' } };var _default =


createComponent(Card);exports.default = _default;

/***/ }),
/* 89 */
/*!**********************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/image/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _babelHelperVueJsxMergeProps = _interopRequireDefault(__webpack_require__(/*! @vue/babel-helper-vue-jsx-merge-props */ 16));

var _utils = __webpack_require__(/*! ../utils */ 17);
var _icon = _interopRequireDefault(__webpack_require__(/*! ../icon */ 41));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var _createNamespace = (0, _utils.createNamespace)('image'),
createComponent = _createNamespace[0],
bem = _createNamespace[1];var _default =

createComponent({
  props: {
    src: String,
    fit: String,
    alt: String,
    round: Boolean,
    width: [Number, String],
    height: [Number, String],
    radius: [Number, String],
    lazyLoad: Boolean,
    iconPrefix: String,
    showError: {
      type: Boolean,
      default: true },

    showLoading: {
      type: Boolean,
      default: true },

    errorIcon: {
      type: String,
      default: 'photo-fail' },

    loadingIcon: {
      type: String,
      default: 'photo' } },


  data: function data() {
    return {
      loading: true,
      error: false };

  },
  watch: {
    src: function src() {
      this.loading = true;
      this.error = false;
    } },

  computed: {
    style: function style() {
      var style = {};

      if ((0, _utils.isDef)(this.width)) {
        style.width = (0, _utils.addUnit)(this.width);
      }

      if ((0, _utils.isDef)(this.height)) {
        style.height = (0, _utils.addUnit)(this.height);
      }

      if ((0, _utils.isDef)(this.radius)) {
        style.overflow = 'hidden';
        style.borderRadius = (0, _utils.addUnit)(this.radius);
      }

      return style;
    } },

  created: function created() {
    var $Lazyload = this.$Lazyload;

    if ($Lazyload && _utils.inBrowser) {
      $Lazyload.$on('loaded', this.onLazyLoaded);
      $Lazyload.$on('error', this.onLazyLoadError);
    }
  },
  beforeDestroy: function beforeDestroy() {
    var $Lazyload = this.$Lazyload;

    if ($Lazyload) {
      $Lazyload.$off('loaded', this.onLazyLoaded);
      $Lazyload.$off('error', this.onLazyLoadError);
    }
  },
  methods: {
    onLoad: function onLoad(event) {
      this.loading = false;
      this.$emit('load', event);
    },
    onLazyLoaded: function onLazyLoaded(_ref) {
      var el = _ref.el;

      if (el === this.$refs.image && this.loading) {
        this.onLoad();
      }
    },
    onLazyLoadError: function onLazyLoadError(_ref2) {
      var el = _ref2.el;

      if (el === this.$refs.image && !this.error) {
        this.onError();
      }
    },
    onError: function onError(event) {
      this.error = true;
      this.loading = false;
      this.$emit('error', event);
    },
    onClick: function onClick(event) {
      this.$emit('click', event);
    },
    genPlaceholder: function genPlaceholder() {
      var h = this.$createElement;

      if (this.loading && this.showLoading) {
        return h("div", {
          "class": bem('loading') },
        [this.slots('loading') || h(_icon.default, {
          "attrs": {
            "name": this.loadingIcon,
            "classPrefix": this.iconPrefix },

          "class": bem('loading-icon') })]);

      }

      if (this.error && this.showError) {
        return h("div", {
          "class": bem('error') },
        [this.slots('error') || h(_icon.default, {
          "attrs": {
            "name": this.errorIcon,
            "classPrefix": this.iconPrefix },

          "class": bem('error-icon') })]);

      }
    },
    genImage: function genImage() {
      var h = this.$createElement;
      var imgData = {
        class: bem('img'),
        attrs: {
          alt: this.alt },

        style: {
          objectFit: this.fit } };



      if (this.error) {
        return;
      }

      if (this.lazyLoad) {
        return h("img", (0, _babelHelperVueJsxMergeProps.default)([{
          "ref": "image",
          "directives": [{
            name: "lazy",
            value: this.src }] },

        imgData]));
      }

      return h("img", (0, _babelHelperVueJsxMergeProps.default)([{
        "attrs": {
          "src": this.src },

        "on": {
          "load": this.onLoad,
          "error": this.onError } },

      imgData]));
    } },

  render: function render() {
    var h = arguments[0];
    return h("div", {
      "class": bem({
        round: this.round }),

      "style": this.style,
      "on": {
        "click": this.onClick } },

    [this.genImage(), this.genPlaceholder(), this.slots()]);
  } });exports.default = _default;

/***/ }),
/* 90 */
/*!*************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/cascader/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _utils = __webpack_require__(/*! ../utils */ 17);
var _tab = _interopRequireDefault(__webpack_require__(/*! ../tab */ 91));
var _tabs = _interopRequireDefault(__webpack_require__(/*! ../tabs */ 92));
var _icon = _interopRequireDefault(__webpack_require__(/*! ../icon */ 41));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var _createNamespace = (0, _utils.createNamespace)('cascader'),
createComponent = _createNamespace[0],
bem = _createNamespace[1],
t = _createNamespace[2];var _default2 =

createComponent({
  props: {
    title: String,
    value: [Number, String],
    fieldNames: Object,
    placeholder: String,
    activeColor: String,
    options: {
      type: Array,
      default: function _default() {
        return [];
      } },

    closeable: {
      type: Boolean,
      default: true } },


  data: function data() {
    return {
      tabs: [],
      activeTab: 0 };

  },
  computed: {
    textKey: function textKey() {
      var _this$fieldNames;

      return ((_this$fieldNames = this.fieldNames) == null ? void 0 : _this$fieldNames.text) || 'text';
    },
    valueKey: function valueKey() {
      var _this$fieldNames2;

      return ((_this$fieldNames2 = this.fieldNames) == null ? void 0 : _this$fieldNames2.value) || 'value';
    },
    childrenKey: function childrenKey() {
      var _this$fieldNames3;

      return ((_this$fieldNames3 = this.fieldNames) == null ? void 0 : _this$fieldNames3.children) || 'children';
    } },

  watch: {
    options: {
      deep: true,
      handler: 'updateTabs' },

    value: function value(_value) {
      var _this = this;

      if (_value || _value === 0) {
        var values = this.tabs.map(function (tab) {
          var _tab$selectedOption;

          return (_tab$selectedOption = tab.selectedOption) == null ? void 0 : _tab$selectedOption[_this.valueKey];
        });

        if (values.indexOf(_value) !== -1) {
          return;
        }
      }

      this.updateTabs();
    } },

  created: function created() {
    this.updateTabs();
  },
  methods: {
    getSelectedOptionsByValue: function getSelectedOptionsByValue(options, value) {
      for (var i = 0; i < options.length; i++) {
        var option = options[i];

        if (option[this.valueKey] === value) {
          return [option];
        }

        if (option[this.childrenKey]) {
          var selectedOptions = this.getSelectedOptionsByValue(option[this.childrenKey], value);

          if (selectedOptions) {
            return [option].concat(selectedOptions);
          }
        }
      }
    },
    updateTabs: function updateTabs() {
      var _this2 = this;

      if (this.value || this.value === 0) {
        var selectedOptions = this.getSelectedOptionsByValue(this.options, this.value);

        if (selectedOptions) {
          var optionsCursor = this.options;
          this.tabs = selectedOptions.map(function (option) {
            var tab = {
              options: optionsCursor,
              selectedOption: option };

            var next = optionsCursor.filter(function (item) {
              return item[_this2.valueKey] === option[_this2.valueKey];
            });

            if (next.length) {
              optionsCursor = next[0][_this2.childrenKey];
            }

            return tab;
          });

          if (optionsCursor) {
            this.tabs.push({
              options: optionsCursor,
              selectedOption: null });

          }

          this.$nextTick(function () {
            _this2.activeTab = _this2.tabs.length - 1;
          });
          return;
        }
      }

      this.tabs = [{
        options: this.options,
        selectedOption: null }];

    },
    onSelect: function onSelect(option, tabIndex) {
      var _this3 = this;

      this.tabs[tabIndex].selectedOption = option;

      if (this.tabs.length > tabIndex + 1) {
        this.tabs = this.tabs.slice(0, tabIndex + 1);
      }

      if (option[this.childrenKey]) {
        var nextTab = {
          options: option[this.childrenKey],
          selectedOption: null };


        if (this.tabs[tabIndex + 1]) {
          this.$set(this.tabs, tabIndex + 1, nextTab);
        } else {
          this.tabs.push(nextTab);
        }

        this.$nextTick(function () {
          _this3.activeTab++;
        });
      }

      var selectedOptions = this.tabs.map(function (tab) {
        return tab.selectedOption;
      }).filter(function (item) {
        return !!item;
      });
      var eventParams = {
        value: option[this.valueKey],
        tabIndex: tabIndex,
        selectedOptions: selectedOptions };

      this.$emit('input', option[this.valueKey]);
      this.$emit('change', eventParams);

      if (!option[this.childrenKey]) {
        this.$emit('finish', eventParams);
      }
    },
    onClose: function onClose() {
      this.$emit('close');
    },
    renderHeader: function renderHeader() {
      var h = this.$createElement;
      return h("div", {
        "class": bem('header') },
      [h("h2", {
        "class": bem('title') },
      [this.slots('title') || this.title]), this.closeable ? h(_icon.default, {
        "attrs": {
          "name": "cross" },

        "class": bem('close-icon'),
        "on": {
          "click": this.onClose } }) :

      null]);
    },
    renderOptions: function renderOptions(options, selectedOption, tabIndex) {
      var _this4 = this;

      var h = this.$createElement;

      var renderOption = function renderOption(option) {
        var isSelected = selectedOption && option[_this4.valueKey] === selectedOption[_this4.valueKey];
        return h("li", {
          "class": bem('option', {
            selected: isSelected }),

          "style": {
            color: isSelected ? _this4.activeColor : null },

          "on": {
            "click": function click() {
              _this4.onSelect(option, tabIndex);
            } } },

        [h("span", [option[_this4.textKey]]), isSelected ? h(_icon.default, {
          "attrs": {
            "name": "success" },

          "class": bem('selected-icon') }) :
        null]);
      };

      return h("ul", {
        "class": bem('options') },
      [options.map(renderOption)]);
    },
    renderTab: function renderTab(item, tabIndex) {
      var h = this.$createElement;
      var options = item.options,
      selectedOption = item.selectedOption;
      var title = selectedOption ? selectedOption[this.textKey] : this.placeholder || t('select');
      return h(_tab.default, {
        "attrs": {
          "title": title,
          "titleClass": bem('tab', {
            unselected: !selectedOption }) } },


      [this.renderOptions(options, selectedOption, tabIndex)]);
    },
    renderTabs: function renderTabs() {
      var _this5 = this;

      var h = this.$createElement;
      return h(_tabs.default, {
        "attrs": {
          "animated": true,
          "swipeable": true,
          "swipeThreshold": 0,
          "color": this.activeColor },

        "class": bem('tabs'),
        "model": {
          value: _this5.activeTab,
          callback: function callback($$v) {
            _this5.activeTab = $$v;
          } } },

      [this.tabs.map(this.renderTab)]);
    } },

  render: function render() {
    var h = arguments[0];
    return h("div", {
      "class": bem() },
    [this.renderHeader(), this.renderTabs()]);
  } });exports.default = _default2;

/***/ }),
/* 91 */
/*!********************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/tab/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/esm/extends */ 15));
var _utils = __webpack_require__(/*! ../utils */ 17);
var _relation = __webpack_require__(/*! ../mixins/relation */ 67);
var _router = __webpack_require__(/*! ../utils/router */ 55);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var _createNamespace = (0, _utils.createNamespace)('tab'),
createComponent = _createNamespace[0],
bem = _createNamespace[1];var _default =

createComponent({
  mixins: [(0, _relation.ChildrenMixin)('vanTabs')],
  props: (0, _extends2.default)({}, _router.routeProps, {
    dot: Boolean,
    name: [Number, String],
    // @deprecated
    info: [Number, String],
    badge: [Number, String],
    title: String,
    titleStyle: null,
    titleClass: null,
    disabled: Boolean }),

  data: function data() {
    return {
      inited: false };

  },
  computed: {
    computedName: function computedName() {
      var _this$name;

      return (_this$name = this.name) != null ? _this$name : this.index;
    },
    isActive: function isActive() {
      var active = this.computedName === this.parent.currentName;

      if (active) {
        this.inited = true;
      }

      return active;
    } },

  watch: {
    title: function title() {
      this.parent.setLine();
      this.parent.scrollIntoView();
    },
    inited: function inited(val) {
      var _this = this;

      if (this.parent.lazyRender && val) {
        this.$nextTick(function () {
          _this.parent.$emit('rendered', _this.computedName, _this.title);
        });
      }
    } },

  render: function render(h) {
    var slots = this.slots,
    parent = this.parent,
    isActive = this.isActive;
    var slotContent = slots();

    if ( true && this.info) {
      console.warn('[Vant] Tab: "info" prop is deprecated, use "badge" prop instead.');
    }

    if (!slotContent && !parent.animated) {
      return;
    }

    var show = parent.scrollspy || isActive;
    var shouldRender = this.inited || parent.scrollspy || !parent.lazyRender;
    var Content = shouldRender ? slotContent : h();

    if (parent.animated) {
      return h("div", {
        "attrs": {
          "role": "tabpanel",
          "aria-hidden": !isActive },

        "class": bem('pane-wrapper', {
          inactive: !isActive }) },

      [h("div", {
        "class": bem('pane') },
      [Content])]);
    }

    return h("div", {
      "directives": [{
        name: "show",
        value: show }],

      "attrs": {
        "role": "tabpanel" },

      "class": bem('pane') },
    [Content]);
  } });exports.default = _default;

/***/ }),
/* 92 */
/*!*********************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/tabs/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _utils = __webpack_require__(/*! ../utils */ 17);
var _utils2 = __webpack_require__(/*! ./utils */ 93);
var _router = __webpack_require__(/*! ../utils/router */ 55);
var _style = __webpack_require__(/*! ../utils/dom/style */ 94);
var _event = __webpack_require__(/*! ../utils/dom/event */ 34);
var _unit = __webpack_require__(/*! ../utils/format/unit */ 27);
var _constant = __webpack_require__(/*! ../utils/constant */ 50);
var _interceptor = __webpack_require__(/*! ../utils/interceptor */ 95);
var _scroll = __webpack_require__(/*! ../utils/dom/scroll */ 36);

var _relation = __webpack_require__(/*! ../mixins/relation */ 67);
var _bindEvent = __webpack_require__(/*! ../mixins/bind-event */ 40);

var _Title = _interopRequireDefault(__webpack_require__(/*! ./Title */ 96));
var _sticky = _interopRequireDefault(__webpack_require__(/*! ../sticky */ 97));
var _Content = _interopRequireDefault(__webpack_require__(/*! ./Content */ 98));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // Utils
// Mixins
// Components
var _createNamespace = (0, _utils.createNamespace)('tabs'),createComponent = _createNamespace[0],
bem = _createNamespace[1];var _default2 =

createComponent({
  mixins: [(0, _relation.ParentMixin)('vanTabs'), (0, _bindEvent.BindEventMixin)(function (bind) {
    if (!this.scroller) {
      this.scroller = (0, _scroll.getScroller)(this.$el);
    }

    bind(window, 'resize', this.resize, true);

    if (this.scrollspy) {
      bind(this.scroller, 'scroll', this.onScroll, true);
    }
  })],
  model: {
    prop: 'active' },

  props: {
    color: String,
    border: Boolean,
    sticky: Boolean,
    animated: Boolean,
    swipeable: Boolean,
    scrollspy: Boolean,
    background: String,
    lineWidth: [Number, String],
    lineHeight: [Number, String],
    beforeChange: Function,
    titleActiveColor: String,
    titleInactiveColor: String,
    type: {
      type: String,
      default: 'line' },

    active: {
      type: [Number, String],
      default: 0 },

    ellipsis: {
      type: Boolean,
      default: true },

    duration: {
      type: [Number, String],
      default: 0.3 },

    offsetTop: {
      type: [Number, String],
      default: 0 },

    lazyRender: {
      type: Boolean,
      default: true },

    swipeThreshold: {
      type: [Number, String],
      default: 5 } },


  data: function data() {
    return {
      position: '',
      currentIndex: null,
      lineStyle: {
        backgroundColor: this.color } };


  },
  computed: {
    // whether the nav is scrollable
    scrollable: function scrollable() {
      return this.children.length > this.swipeThreshold || !this.ellipsis;
    },
    navStyle: function navStyle() {
      return {
        borderColor: this.color,
        background: this.background };

    },
    currentName: function currentName() {
      var activeTab = this.children[this.currentIndex];

      if (activeTab) {
        return activeTab.computedName;
      }
    },
    offsetTopPx: function offsetTopPx() {
      return (0, _unit.unitToPx)(this.offsetTop);
    },
    scrollOffset: function scrollOffset() {
      if (this.sticky) {
        return this.offsetTopPx + this.tabHeight;
      }

      return 0;
    } },

  watch: {
    color: 'setLine',
    active: function active(name) {
      if (name !== this.currentName) {
        this.setCurrentIndexByName(name);
      }
    },
    children: function children() {
      var _this = this;

      this.setCurrentIndexByName(this.active || this.currentName);
      this.setLine();
      this.$nextTick(function () {
        _this.scrollIntoView(true);
      });
    },
    currentIndex: function currentIndex() {
      this.scrollIntoView();
      this.setLine(); // scroll to correct position

      if (this.stickyFixed && !this.scrollspy) {
        (0, _scroll.setRootScrollTop)(Math.ceil((0, _scroll.getElementTop)(this.$el) - this.offsetTopPx));
      }
    },
    scrollspy: function scrollspy(val) {
      if (val) {
        (0, _event.on)(this.scroller, 'scroll', this.onScroll, true);
      } else {
        (0, _event.off)(this.scroller, 'scroll', this.onScroll);
      }
    } },

  mounted: function mounted() {
    this.init();
  },
  activated: function activated() {
    this.init();
    this.setLine();
  },
  methods: {
    // @exposed-api
    resize: function resize() {
      this.setLine();
    },
    init: function init() {
      var _this2 = this;

      this.$nextTick(function () {
        _this2.inited = true;
        _this2.tabHeight = (0, _scroll.getVisibleHeight)(_this2.$refs.wrap);

        _this2.scrollIntoView(true);
      });
    },
    // update nav bar style
    setLine: function setLine() {
      var _this3 = this;

      var shouldAnimate = this.inited;
      this.$nextTick(function () {
        var titles = _this3.$refs.titles;

        if (!titles || !titles[_this3.currentIndex] || _this3.type !== 'line' || (0, _style.isHidden)(_this3.$el)) {
          return;
        }

        var title = titles[_this3.currentIndex].$el;
        var lineWidth = _this3.lineWidth,
        lineHeight = _this3.lineHeight;
        var left = title.offsetLeft + title.offsetWidth / 2;
        var lineStyle = {
          width: (0, _utils.addUnit)(lineWidth),
          backgroundColor: _this3.color,
          transform: "translateX(" + left + "px) translateX(-50%)" };


        if (shouldAnimate) {
          lineStyle.transitionDuration = _this3.duration + "s";
        }

        if ((0, _utils.isDef)(lineHeight)) {
          var height = (0, _utils.addUnit)(lineHeight);
          lineStyle.height = height;
          lineStyle.borderRadius = height;
        }

        _this3.lineStyle = lineStyle;
      });
    },
    // correct the index of active tab
    setCurrentIndexByName: function setCurrentIndexByName(name) {
      var matched = this.children.filter(function (tab) {
        return tab.computedName === name;
      });
      var defaultIndex = (this.children[0] || {}).index || 0;
      this.setCurrentIndex(matched.length ? matched[0].index : defaultIndex);
    },
    setCurrentIndex: function setCurrentIndex(currentIndex) {
      var newIndex = this.findAvailableTab(currentIndex);

      if (!(0, _utils.isDef)(newIndex)) {
        return;
      }

      var newTab = this.children[newIndex];
      var newName = newTab.computedName;
      var shouldEmitChange = this.currentIndex !== null;
      this.currentIndex = newIndex;

      if (newName !== this.active) {
        this.$emit('input', newName);

        if (shouldEmitChange) {
          this.$emit('change', newName, newTab.title);
        }
      }
    },
    findAvailableTab: function findAvailableTab(index) {
      var diff = index < this.currentIndex ? -1 : 1;

      while (index >= 0 && index < this.children.length) {
        if (!this.children[index].disabled) {
          return index;
        }

        index += diff;
      }
    },
    // emit event when clicked
    onClick: function onClick(item, index) {
      var _this4 = this;

      var _this$children$index = this.children[index],
      title = _this$children$index.title,
      disabled = _this$children$index.disabled,
      computedName = _this$children$index.computedName;

      if (disabled) {
        this.$emit('disabled', computedName, title);
      } else {
        (0, _interceptor.callInterceptor)({
          interceptor: this.beforeChange,
          args: [computedName],
          done: function done() {
            _this4.setCurrentIndex(index);

            _this4.scrollToCurrentContent();
          } });

        this.$emit('click', computedName, title);
        (0, _router.route)(item.$router, item);
      }
    },
    // scroll active tab into view
    scrollIntoView: function scrollIntoView(immediate) {
      var titles = this.$refs.titles;

      if (!this.scrollable || !titles || !titles[this.currentIndex]) {
        return;
      }

      var nav = this.$refs.nav;
      var title = titles[this.currentIndex].$el;
      var to = title.offsetLeft - (nav.offsetWidth - title.offsetWidth) / 2;
      (0, _utils2.scrollLeftTo)(nav, to, immediate ? 0 : +this.duration);
    },
    onSticktScroll: function onSticktScroll(params) {
      this.stickyFixed = params.isFixed;
      this.$emit('scroll', params);
    },
    // @exposed-api
    scrollTo: function scrollTo(name) {
      var _this5 = this;

      this.$nextTick(function () {
        _this5.setCurrentIndexByName(name);

        _this5.scrollToCurrentContent(true);
      });
    },
    scrollToCurrentContent: function scrollToCurrentContent(immediate) {
      var _this6 = this;

      if (immediate === void 0) {
        immediate = false;
      }

      if (this.scrollspy) {
        var target = this.children[this.currentIndex];
        var el = target == null ? void 0 : target.$el;

        if (el) {
          var to = (0, _scroll.getElementTop)(el, this.scroller) - this.scrollOffset;
          this.lockScroll = true;
          (0, _utils2.scrollTopTo)(this.scroller, to, immediate ? 0 : +this.duration, function () {
            _this6.lockScroll = false;
          });
        }
      }
    },
    onScroll: function onScroll() {
      if (this.scrollspy && !this.lockScroll) {
        var index = this.getCurrentIndexOnScroll();
        this.setCurrentIndex(index);
      }
    },
    getCurrentIndexOnScroll: function getCurrentIndexOnScroll() {
      var children = this.children;

      for (var index = 0; index < children.length; index++) {
        var top = (0, _scroll.getVisibleTop)(children[index].$el);

        if (top > this.scrollOffset) {
          return index === 0 ? 0 : index - 1;
        }
      }

      return children.length - 1;
    } },

  render: function render() {
    var _this7 = this,
    _ref;

    var h = arguments[0];
    var type = this.type,
    animated = this.animated,
    scrollable = this.scrollable;
    var Nav = this.children.map(function (item, index) {
      var _item$badge;

      return h(_Title.default, {
        "ref": "titles",
        "refInFor": true,
        "attrs": {
          "type": type,
          "dot": item.dot,
          "info": (_item$badge = item.badge) != null ? _item$badge : item.info,
          "title": item.title,
          "color": _this7.color,
          "isActive": index === _this7.currentIndex,
          "disabled": item.disabled,
          "scrollable": scrollable,
          "activeColor": _this7.titleActiveColor,
          "inactiveColor": _this7.titleInactiveColor },

        "style": item.titleStyle,
        "class": item.titleClass,
        "scopedSlots": {
          default: function _default() {
            return item.slots('title');
          } },

        "on": {
          "click": function click() {
            _this7.onClick(item, index);
          } } });


    });
    var Wrap = h("div", {
      "ref": "wrap",
      "class": [bem('wrap', {
        scrollable: scrollable }), (
      _ref = {}, _ref[_constant.BORDER_TOP_BOTTOM] = type === 'line' && this.border, _ref)] },
    [h("div", {
      "ref": "nav",
      "attrs": {
        "role": "tablist" },

      "class": bem('nav', [type, {
        complete: this.scrollable }]),

      "style": this.navStyle },
    [this.slots('nav-left'), Nav, type === 'line' && h("div", {
      "class": bem('line'),
      "style": this.lineStyle }),
    this.slots('nav-right')])]);
    return h("div", {
      "class": bem([type]) },
    [this.sticky ? h(_sticky.default, {
      "attrs": {
        "container": this.$el,
        "offsetTop": this.offsetTop },

      "on": {
        "scroll": this.onSticktScroll } },

    [Wrap]) : Wrap, h(_Content.default, {
      "attrs": {
        "count": this.children.length,
        "animated": animated,
        "duration": this.duration,
        "swipeable": this.swipeable,
        "currentIndex": this.currentIndex },

      "on": {
        "change": this.setCurrentIndex } },

    [this.slots()])]);
  } });exports.default = _default2;

/***/ }),
/* 93 */
/*!*********************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/tabs/utils.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.scrollLeftTo = scrollLeftTo;exports.scrollTopTo = scrollTopTo;var _raf = __webpack_require__(/*! ../utils/dom/raf */ 82);
var _scroll = __webpack_require__(/*! ../utils/dom/scroll */ 36);
var scrollLeftRafId;
function scrollLeftTo(scroller, to, duration) {
  (0, _raf.cancelRaf)(scrollLeftRafId);
  var count = 0;
  var from = scroller.scrollLeft;
  var frames = duration === 0 ? 1 : Math.round(duration * 1000 / 16);

  function animate() {
    scroller.scrollLeft += (to - from) / frames;

    if (++count < frames) {
      scrollLeftRafId = (0, _raf.raf)(animate);
    }
  }

  animate();
}
function scrollTopTo(scroller, to, duration, callback) {
  var current = (0, _scroll.getScrollTop)(scroller);
  var isDown = current < to;
  var frames = duration === 0 ? 1 : Math.round(duration * 1000 / 16);
  var step = (to - current) / frames;

  function animate() {
    current += step;

    if (isDown && current > to || !isDown && current < to) {
      current = to;
    }

    (0, _scroll.setScrollTop)(scroller, current);

    if (isDown && current < to || !isDown && current > to) {
      (0, _raf.raf)(animate);
    } else if (callback) {
      (0, _raf.raf)(callback);
    }
  }

  animate();
}

/***/ }),
/* 94 */
/*!**************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/utils/dom/style.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.isHidden = isHidden;function isHidden(el) {
  var style = window.getComputedStyle(el);
  var hidden = style.display === 'none'; // offsetParent returns null in the following situations:
  // 1. The element or its parent element has the display property set to none.
  // 2. The element has the position property set to fixed

  var parentHidden = el.offsetParent === null && style.position !== 'fixed';
  return hidden || parentHidden;
}

/***/ }),
/* 95 */
/*!****************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/utils/interceptor.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.callInterceptor = callInterceptor;var _ = __webpack_require__(/*! . */ 17);
function callInterceptor(options) {
  var interceptor = options.interceptor,
  args = options.args,
  done = options.done;

  if (interceptor) {
    var returnVal = interceptor.apply(void 0, args);

    if ((0, _.isPromise)(returnVal)) {
      returnVal.then(function (value) {
        if (value) {
          done();
        }
      }).catch(_.noop);
    } else if (returnVal) {
      done();
    }
  } else {
    done();
  }
}

/***/ }),
/* 96 */
/*!*********************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/tabs/Title.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _utils = __webpack_require__(/*! ../utils */ 17);
var _info = _interopRequireDefault(__webpack_require__(/*! ../info */ 42));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var _createNamespace = (0, _utils.createNamespace)('tab'),
createComponent = _createNamespace[0],
bem = _createNamespace[1];var _default =

createComponent({
  props: {
    dot: Boolean,
    type: String,
    info: [Number, String],
    color: String,
    title: String,
    isActive: Boolean,
    disabled: Boolean,
    scrollable: Boolean,
    activeColor: String,
    inactiveColor: String },

  computed: {
    style: function style() {
      var style = {};
      var color = this.color,
      isActive = this.isActive;
      var isCard = this.type === 'card'; // card theme color

      if (color && isCard) {
        style.borderColor = color;

        if (!this.disabled) {
          if (isActive) {
            style.backgroundColor = color;
          } else {
            style.color = color;
          }
        }
      }

      var titleColor = isActive ? this.activeColor : this.inactiveColor;

      if (titleColor) {
        style.color = titleColor;
      }

      return style;
    } },

  methods: {
    onClick: function onClick() {
      this.$emit('click');
    },
    genText: function genText() {
      var h = this.$createElement;
      var Text = h("span", {
        "class": bem('text', {
          ellipsis: !this.scrollable }) },

      [this.slots() || this.title]);

      if (this.dot || (0, _utils.isDef)(this.info) && this.info !== '') {
        return h("span", {
          "class": bem('text-wrapper') },
        [Text, h(_info.default, {
          "attrs": {
            "dot": this.dot,
            "info": this.info } })]);


      }

      return Text;
    } },

  render: function render() {
    var h = arguments[0];
    return h("div", {
      "attrs": {
        "role": "tab",
        "aria-selected": this.isActive },

      "class": [bem({
        active: this.isActive,
        disabled: this.disabled })],

      "style": this.style,
      "on": {
        "click": this.onClick } },

    [this.genText()]);
  } });exports.default = _default;

/***/ }),
/* 97 */
/*!***********************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/sticky/index.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _style = __webpack_require__(/*! ../utils/dom/style */ 94);
var _unit = __webpack_require__(/*! ../utils/format/unit */ 27);
var _utils = __webpack_require__(/*! ../utils */ 17);
var _scroll = __webpack_require__(/*! ../utils/dom/scroll */ 36);
var _bindEvent = __webpack_require__(/*! ../mixins/bind-event */ 40);

var _createNamespace = (0, _utils.createNamespace)('sticky'),
createComponent = _createNamespace[0],
bem = _createNamespace[1];var _default =

createComponent({
  mixins: [(0, _bindEvent.BindEventMixin)(function (bind, isBind) {
    if (!this.scroller) {
      this.scroller = (0, _scroll.getScroller)(this.$el);
    }

    if (this.observer) {
      var method = isBind ? 'observe' : 'unobserve';
      this.observer[method](this.$el);
    }

    bind(this.scroller, 'scroll', this.onScroll, true);
    this.onScroll();
  })],
  props: {
    zIndex: [Number, String],
    container: null,
    offsetTop: {
      type: [Number, String],
      default: 0 } },


  data: function data() {
    return {
      fixed: false,
      height: 0,
      transform: 0 };

  },
  computed: {
    offsetTopPx: function offsetTopPx() {
      return (0, _unit.unitToPx)(this.offsetTop);
    },
    style: function style() {
      if (!this.fixed) {
        return;
      }

      var style = {};

      if ((0, _utils.isDef)(this.zIndex)) {
        style.zIndex = this.zIndex;
      }

      if (this.offsetTopPx && this.fixed) {
        style.top = this.offsetTopPx + "px";
      }

      if (this.transform) {
        style.transform = "translate3d(0, " + this.transform + "px, 0)";
      }

      return style;
    } },

  created: function created() {
    var _this = this;

    // compatibility: https://caniuse.com/#feat=intersectionobserver
    if (!_utils.isServer && window.IntersectionObserver) {
      this.observer = new IntersectionObserver(function (entries) {
        // trigger scroll when visibility changed
        if (entries[0].intersectionRatio > 0) {
          _this.onScroll();
        }
      }, {
        root: document.body });

    }
  },
  methods: {
    onScroll: function onScroll() {
      var _this2 = this;

      if ((0, _style.isHidden)(this.$el)) {
        return;
      }

      this.height = this.$el.offsetHeight;
      var container = this.container,
      offsetTopPx = this.offsetTopPx;
      var scrollTop = (0, _scroll.getScrollTop)(window);
      var topToPageTop = (0, _scroll.getElementTop)(this.$el);

      var emitScrollEvent = function emitScrollEvent() {
        _this2.$emit('scroll', {
          scrollTop: scrollTop,
          isFixed: _this2.fixed });

      }; // The sticky component should be kept inside the container element


      if (container) {
        var bottomToPageTop = topToPageTop + container.offsetHeight;

        if (scrollTop + offsetTopPx + this.height > bottomToPageTop) {
          var distanceToBottom = this.height + scrollTop - bottomToPageTop;

          if (distanceToBottom < this.height) {
            this.fixed = true;
            this.transform = -(distanceToBottom + offsetTopPx);
          } else {
            this.fixed = false;
          }

          emitScrollEvent();
          return;
        }
      }

      if (scrollTop + offsetTopPx > topToPageTop) {
        this.fixed = true;
        this.transform = 0;
      } else {
        this.fixed = false;
      }

      emitScrollEvent();
    } },

  render: function render() {
    var h = arguments[0];
    var fixed = this.fixed;
    var style = {
      height: fixed ? this.height + "px" : null };

    return h("div", {
      "style": style },
    [h("div", {
      "class": bem({
        fixed: fixed }),

      "style": this.style },
    [this.slots()])]);
  } });exports.default = _default;

/***/ }),
/* 98 */
/*!***********************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/tabs/Content.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/esm/extends */ 15));
var _utils = __webpack_require__(/*! ../utils */ 17);
var _touch = __webpack_require__(/*! ../mixins/touch */ 37);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var _createNamespace = (0, _utils.createNamespace)('tabs'),
createComponent = _createNamespace[0],
bem = _createNamespace[1];

var MIN_SWIPE_DISTANCE = 50;var _default =
createComponent({
  mixins: [_touch.TouchMixin],
  props: {
    count: Number,
    duration: [Number, String],
    animated: Boolean,
    swipeable: Boolean,
    currentIndex: Number },

  computed: {
    style: function style() {
      if (this.animated) {
        return {
          transform: "translate3d(" + -1 * this.currentIndex * 100 + "%, 0, 0)",
          transitionDuration: this.duration + "s" };

      }
    },
    listeners: function listeners() {
      if (this.swipeable) {
        return {
          touchstart: this.touchStart,
          touchmove: this.touchMove,
          touchend: this.onTouchEnd,
          touchcancel: this.onTouchEnd };

      }
    } },

  methods: {
    // watch swipe touch end
    onTouchEnd: function onTouchEnd() {
      var direction = this.direction,
      deltaX = this.deltaX,
      currentIndex = this.currentIndex;
      /* istanbul ignore else */

      if (direction === 'horizontal' && this.offsetX >= MIN_SWIPE_DISTANCE) {
        /* istanbul ignore else */
        if (deltaX > 0 && currentIndex !== 0) {
          this.$emit('change', currentIndex - 1);
        } else if (deltaX < 0 && currentIndex !== this.count - 1) {
          this.$emit('change', currentIndex + 1);
        }
      }
    },
    genChildren: function genChildren() {
      var h = this.$createElement;

      if (this.animated) {
        return h("div", {
          "class": bem('track'),
          "style": this.style },
        [this.slots()]);
      }

      return this.slots();
    } },

  render: function render() {
    var h = arguments[0];
    return h("div", {
      "class": bem('content', {
        animated: this.animated }),

      "on": (0, _extends2.default)({}, this.listeners) },
    [this.genChildren()]);
  } });exports.default = _default;

/***/ }),
/* 99 */
/*!***************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/cell-group/index.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _babelHelperVueJsxMergeProps = _interopRequireDefault(__webpack_require__(/*! @vue/babel-helper-vue-jsx-merge-props */ 16));

var _utils = __webpack_require__(/*! ../utils */ 17);
var _functional = __webpack_require__(/*! ../utils/functional */ 29);
var _constant = __webpack_require__(/*! ../utils/constant */ 50);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // Utils
// Types
var _createNamespace = (0, _utils.createNamespace)('cell-group'),
createComponent = _createNamespace[0],
bem = _createNamespace[1];

function CellGroup(h, props, slots, ctx) {
  var _ref;

  var Group = h("div", (0, _babelHelperVueJsxMergeProps.default)([{
    "class": [bem(), (_ref = {}, _ref[_constant.BORDER_TOP_BOTTOM] = props.border, _ref)] },
  (0, _functional.inherit)(ctx, true)]), [slots.default == null ? void 0 : slots.default()]);

  if (props.title || slots.title) {
    return h("div", [h("div", {
      "class": bem('title') },
    [slots.title ? slots.title() : props.title]), Group]);
  }

  return Group;
}

CellGroup.props = {
  title: String,
  border: {
    type: Boolean,
    default: true } };var _default =


createComponent(CellGroup);exports.default = _default;

/***/ }),
/* 100 */
/*!*************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/checkbox/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _utils = __webpack_require__(/*! ../utils */ 17);
var _checkbox = __webpack_require__(/*! ../mixins/checkbox */ 79);

var _createNamespace = (0, _utils.createNamespace)('checkbox'),
createComponent = _createNamespace[0],
bem = _createNamespace[1];var _default =

createComponent({
  mixins: [(0, _checkbox.CheckboxMixin)({
    bem: bem,
    role: 'checkbox',
    parent: 'vanCheckbox' })],

  computed: {
    checked: {
      get: function get() {
        if (this.parent) {
          return this.parent.value.indexOf(this.name) !== -1;
        }

        return this.value;
      },
      set: function set(val) {
        if (this.parent) {
          this.setParentValue(val);
        } else {
          this.$emit('input', val);
        }
      } } },


  watch: {
    value: function value(val) {
      this.$emit('change', val);
    } },

  methods: {
    // @exposed-api
    toggle: function toggle(checked) {
      var _this = this;

      if (checked === void 0) {
        checked = !this.checked;
      }

      // When toggle method is called multiple times at the same time,
      // only the last call is valid.
      // This is a hack for usage inside Cell.
      clearTimeout(this.toggleTask);
      this.toggleTask = setTimeout(function () {
        _this.checked = checked;
      });
    },
    setParentValue: function setParentValue(val) {
      var parent = this.parent;
      var value = parent.value.slice();

      if (val) {
        if (parent.max && value.length >= parent.max) {
          return;
        }
        /* istanbul ignore else */


        if (value.indexOf(this.name) === -1) {
          value.push(this.name);
          parent.$emit('input', value);
        }
      } else {
        var index = value.indexOf(this.name);
        /* istanbul ignore else */

        if (index !== -1) {
          value.splice(index, 1);
          parent.$emit('input', value);
        }
      }
    } } });exports.default = _default;

/***/ }),
/* 101 */
/*!*******************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/checkbox-group/index.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _utils = __webpack_require__(/*! ../utils */ 17);
var _field = __webpack_require__(/*! ../mixins/field */ 73);
var _relation = __webpack_require__(/*! ../mixins/relation */ 67);

var _createNamespace = (0, _utils.createNamespace)('checkbox-group'),
createComponent = _createNamespace[0],
bem = _createNamespace[1];var _default2 =

createComponent({
  mixins: [(0, _relation.ParentMixin)('vanCheckbox'), _field.FieldMixin],
  props: {
    max: [Number, String],
    disabled: Boolean,
    direction: String,
    iconSize: [Number, String],
    checkedColor: String,
    value: {
      type: Array,
      default: function _default() {
        return [];
      } } },


  watch: {
    value: function value(val) {
      this.$emit('change', val);
    } },

  methods: {
    // @exposed-api
    toggleAll: function toggleAll(options) {
      if (options === void 0) {
        options = {};
      }

      if (typeof options === 'boolean') {
        options = {
          checked: options };

      }

      var _options = options,
      checked = _options.checked,
      skipDisabled = _options.skipDisabled;
      var children = this.children.filter(function (item) {
        if (item.disabled && skipDisabled) {
          return item.checked;
        }

        return checked != null ? checked : !item.checked;
      });
      var names = children.map(function (item) {
        return item.name;
      });
      this.$emit('input', names);
    } },

  render: function render() {
    var h = arguments[0];
    return h("div", {
      "class": bem([this.direction]) },
    [this.slots()]);
  } });exports.default = _default2;

/***/ }),
/* 102 */
/*!***********************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/circle/index.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _utils = __webpack_require__(/*! ../utils */ 17);
var _raf = __webpack_require__(/*! ../utils/dom/raf */ 82);

var _createNamespace = (0, _utils.createNamespace)('circle'),
createComponent = _createNamespace[0],
bem = _createNamespace[1];

var PERIMETER = 3140;
var uid = 0;

function format(rate) {
  return Math.min(Math.max(rate, 0), 100);
}

function getPath(clockwise, viewBoxSize) {
  var sweepFlag = clockwise ? 1 : 0;
  return "M " + viewBoxSize / 2 + " " + viewBoxSize / 2 + " m 0, -500 a 500, 500 0 1, " + sweepFlag + " 0, 1000 a 500, 500 0 1, " + sweepFlag + " 0, -1000";
}var _default =

createComponent({
  props: {
    text: String,
    size: [Number, String],
    color: [String, Object],
    layerColor: String,
    strokeLinecap: String,
    value: {
      type: Number,
      default: 0 },

    speed: {
      type: [Number, String],
      default: 0 },

    fill: {
      type: String,
      default: 'none' },

    rate: {
      type: [Number, String],
      default: 100 },

    strokeWidth: {
      type: [Number, String],
      default: 40 },

    clockwise: {
      type: Boolean,
      default: true } },


  beforeCreate: function beforeCreate() {
    this.uid = "van-circle-gradient-" + uid++;
  },
  computed: {
    style: function style() {
      var size = (0, _utils.addUnit)(this.size);
      return {
        width: size,
        height: size };

    },
    path: function path() {
      return getPath(this.clockwise, this.viewBoxSize);
    },
    viewBoxSize: function viewBoxSize() {
      return +this.strokeWidth + 1000;
    },
    layerStyle: function layerStyle() {
      return {
        fill: "" + this.fill,
        stroke: "" + this.layerColor,
        strokeWidth: this.strokeWidth + "px" };

    },
    hoverStyle: function hoverStyle() {
      var offset = PERIMETER * this.value / 100;
      return {
        stroke: "" + (this.gradient ? "url(#" + this.uid + ")" : this.color),
        strokeWidth: +this.strokeWidth + 1 + "px",
        strokeLinecap: this.strokeLinecap,
        strokeDasharray: offset + "px " + PERIMETER + "px" };

    },
    gradient: function gradient() {
      return (0, _utils.isObject)(this.color);
    },
    LinearGradient: function LinearGradient() {
      var _this = this;

      var h = this.$createElement;

      if (!this.gradient) {
        return;
      }

      var Stops = Object.keys(this.color).sort(function (a, b) {
        return parseFloat(a) - parseFloat(b);
      }).map(function (key, index) {
        return h("stop", {
          "key": index,
          "attrs": {
            "offset": key,
            "stop-color": _this.color[key] } });


      });
      return h("defs", [h("linearGradient", {
        "attrs": {
          "id": this.uid,
          "x1": "100%",
          "y1": "0%",
          "x2": "0%",
          "y2": "0%" } },

      [Stops])]);
    } },

  watch: {
    rate: {
      handler: function handler(rate) {
        this.startTime = Date.now();
        this.startRate = this.value;
        this.endRate = format(rate);
        this.increase = this.endRate > this.startRate;
        this.duration = Math.abs((this.startRate - this.endRate) * 1000 / this.speed);

        if (this.speed) {
          (0, _raf.cancelRaf)(this.rafId);
          this.rafId = (0, _raf.raf)(this.animate);
        } else {
          this.$emit('input', this.endRate);
        }
      },
      immediate: true } },


  methods: {
    animate: function animate() {
      var now = Date.now();
      var progress = Math.min((now - this.startTime) / this.duration, 1);
      var rate = progress * (this.endRate - this.startRate) + this.startRate;
      this.$emit('input', format(parseFloat(rate.toFixed(1))));

      if (this.increase ? rate < this.endRate : rate > this.endRate) {
        this.rafId = (0, _raf.raf)(this.animate);
      }
    } },

  render: function render() {
    var h = arguments[0];
    return h("div", {
      "class": bem(),
      "style": this.style },
    [h("svg", {
      "attrs": {
        "viewBox": "0 0 " + this.viewBoxSize + " " + this.viewBoxSize } },

    [this.LinearGradient, h("path", {
      "class": bem('layer'),
      "style": this.layerStyle,
      "attrs": {
        "d": this.path } }),

    h("path", {
      "attrs": {
        "d": this.path },

      "class": bem('hover'),
      "style": this.hoverStyle })]),
    this.slots() || this.text && h("div", {
      "class": bem('text') },
    [this.text])]);
  } });exports.default = _default;

/***/ }),
/* 103 */
/*!********************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/col/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _utils = __webpack_require__(/*! ../utils */ 17);
var _relation = __webpack_require__(/*! ../mixins/relation */ 67);

var _createNamespace = (0, _utils.createNamespace)('col'),
createComponent = _createNamespace[0],
bem = _createNamespace[1];var _default =

createComponent({
  mixins: [(0, _relation.ChildrenMixin)('vanRow')],
  props: {
    span: [Number, String],
    offset: [Number, String],
    tag: {
      type: String,
      default: 'div' } },


  computed: {
    style: function style() {
      var index = this.index;

      var _ref = this.parent || {},
      spaces = _ref.spaces;

      if (spaces && spaces[index]) {
        var _spaces$index = spaces[index],
        left = _spaces$index.left,
        right = _spaces$index.right;
        return {
          paddingLeft: left ? left + "px" : null,
          paddingRight: right ? right + "px" : null };

      }
    } },

  methods: {
    onClick: function onClick(event) {
      this.$emit('click', event);
    } },

  render: function render() {
    var _bem;

    var h = arguments[0];
    var span = this.span,
    offset = this.offset;
    return h(this.tag, {
      "style": this.style,
      "class": bem((_bem = {}, _bem[span] = span, _bem["offset-" + offset] = offset, _bem)),
      "on": {
        "click": this.onClick } },

    [this.slots()]);
  } });exports.default = _default;

/***/ }),
/* 104 */
/*!*************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/collapse/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _utils = __webpack_require__(/*! ../utils */ 17);
var _relation = __webpack_require__(/*! ../mixins/relation */ 67);
var _constant = __webpack_require__(/*! ../utils/constant */ 50);

var _createNamespace = (0, _utils.createNamespace)('collapse'),
createComponent = _createNamespace[0],
bem = _createNamespace[1];var _default =

createComponent({
  mixins: [(0, _relation.ParentMixin)('vanCollapse')],
  props: {
    accordion: Boolean,
    value: [String, Number, Array],
    border: {
      type: Boolean,
      default: true } },


  methods: {
    switch: function _switch(name, expanded) {
      if (!this.accordion) {
        name = expanded ? this.value.concat(name) : this.value.filter(function (activeName) {
          return activeName !== name;
        });
      }

      this.$emit('change', name);
      this.$emit('input', name);
    } },

  render: function render() {
    var _ref;

    var h = arguments[0];
    return h("div", {
      "class": [bem(), (_ref = {}, _ref[_constant.BORDER_TOP_BOTTOM] = this.border, _ref)] },
    [this.slots()]);
  } });exports.default = _default;

/***/ }),
/* 105 */
/*!******************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/collapse-item/index.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/esm/extends */ 15));

var _utils = __webpack_require__(/*! ../utils */ 17);
var _raf = __webpack_require__(/*! ../utils/dom/raf */ 82);

var _relation = __webpack_require__(/*! ../mixins/relation */ 67);

var _cell = _interopRequireDefault(__webpack_require__(/*! ../cell */ 54));
var _shared = __webpack_require__(/*! ../cell/shared */ 56);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // Utils
// Mixins
// Components
var _createNamespace = (0, _utils.createNamespace)('collapse-item'),createComponent = _createNamespace[0],
bem = _createNamespace[1];

var CELL_SLOTS = ['title', 'icon', 'right-icon'];var _default =
createComponent({
  mixins: [(0, _relation.ChildrenMixin)('vanCollapse')],
  props: (0, _extends2.default)({}, _shared.cellProps, {
    name: [Number, String],
    disabled: Boolean,
    isLink: {
      type: Boolean,
      default: true } }),


  data: function data() {
    return {
      show: null,
      inited: null };

  },
  computed: {
    currentName: function currentName() {
      var _this$name;

      return (_this$name = this.name) != null ? _this$name : this.index;
    },
    expanded: function expanded() {
      var _this = this;

      if (!this.parent) {
        return null;
      }

      var _this$parent = this.parent,
      value = _this$parent.value,
      accordion = _this$parent.accordion;

      if ( true && !accordion && !Array.isArray(value)) {
        console.error('[Vant] Collapse: type of prop "value" should be Array');
        return;
      }

      return accordion ? value === this.currentName : value.some(function (name) {
        return name === _this.currentName;
      });
    } },

  created: function created() {
    this.show = this.expanded;
    this.inited = this.expanded;
  },
  watch: {
    expanded: function expanded(_expanded, prev) {
      var _this2 = this;

      if (prev === null) {
        return;
      }

      if (_expanded) {
        this.show = true;
        this.inited = true;
      } // Use raf: flick when opened in safari
      // Use nextTick: closing animation failed when set `user-select: none`


      var nextTick = _expanded ? this.$nextTick : _raf.raf;
      nextTick(function () {
        var _this2$$refs = _this2.$refs,
        content = _this2$$refs.content,
        wrapper = _this2$$refs.wrapper;

        if (!content || !wrapper) {
          return;
        }

        var offsetHeight = content.offsetHeight;

        if (offsetHeight) {
          var contentHeight = offsetHeight + "px";
          wrapper.style.height = _expanded ? 0 : contentHeight; // use double raf to ensure animation can start

          (0, _raf.doubleRaf)(function () {
            wrapper.style.height = _expanded ? contentHeight : 0;
          });
        } else {
          _this2.onTransitionEnd();
        }
      });
    } },

  methods: {
    onClick: function onClick() {
      if (!this.disabled) {
        this.toggle();
      }
    },
    // @exposed-api
    toggle: function toggle(expanded) {
      if (expanded === void 0) {
        expanded = !this.expanded;
      }

      var parent = this.parent,
      currentName = this.currentName;
      var close = parent.accordion && currentName === parent.value;
      var name = close ? '' : currentName;
      this.parent.switch(name, expanded);
    },
    onTransitionEnd: function onTransitionEnd() {
      if (!this.expanded) {
        this.show = false;
      } else {
        this.$refs.wrapper.style.height = '';
      }
    },
    genTitle: function genTitle() {
      var _this3 = this;

      var h = this.$createElement;
      var border = this.border,
      disabled = this.disabled,
      expanded = this.expanded;
      var titleSlots = CELL_SLOTS.reduce(function (slots, name) {
        if (_this3.slots(name)) {
          slots[name] = function () {
            return _this3.slots(name);
          };
        }

        return slots;
      }, {});

      if (this.slots('value')) {
        titleSlots.default = function () {
          return _this3.slots('value');
        };
      }

      return h(_cell.default, {
        "attrs": {
          "role": "button",
          "tabindex": disabled ? -1 : 0,
          "aria-expanded": String(expanded) },

        "class": bem('title', {
          disabled: disabled,
          expanded: expanded,
          borderless: !border }),

        "on": {
          "click": this.onClick },

        "scopedSlots": titleSlots,
        "props": (0, _extends2.default)({}, this.$props) });

    },
    genContent: function genContent() {
      var h = this.$createElement;

      if (this.inited) {
        return h("div", {
          "directives": [{
            name: "show",
            value: this.show }],

          "ref": "wrapper",
          "class": bem('wrapper'),
          "on": {
            "transitionend": this.onTransitionEnd } },

        [h("div", {
          "ref": "content",
          "class": bem('content') },
        [this.slots()])]);
      }
    } },

  render: function render() {
    var h = arguments[0];
    return h("div", {
      "class": [bem({
        border: this.index && this.border })] },

    [this.genTitle(), this.genContent()]);
  } });exports.default = _default;

/***/ }),
/* 106 */
/*!*****************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/contact-card/index.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _babelHelperVueJsxMergeProps = _interopRequireDefault(__webpack_require__(/*! @vue/babel-helper-vue-jsx-merge-props */ 16));

var _utils = __webpack_require__(/*! ../utils */ 17);
var _functional = __webpack_require__(/*! ../utils/functional */ 29);

var _cell = _interopRequireDefault(__webpack_require__(/*! ../cell */ 54));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // Utils
// Components
// Types
var _createNamespace = (0, _utils.createNamespace)('contact-card'),createComponent = _createNamespace[0],
bem = _createNamespace[1],
t = _createNamespace[2];

function ContactCard(h, props, slots, ctx) {
  var type = props.type,
  editable = props.editable;

  function onClick(event) {
    if (editable) {
      (0, _functional.emit)(ctx, 'click', event);
    }
  }

  function Content() {
    if (type === 'add') {
      return props.addText || t('addText');
    }

    return [h("div", [t('name') + "\uFF1A" + props.name]), h("div", [t('tel') + "\uFF1A" + props.tel])];
  }

  return h(_cell.default, (0, _babelHelperVueJsxMergeProps.default)([{
    "attrs": {
      "center": true,
      "border": false,
      "isLink": editable,
      "valueClass": bem('value'),
      "icon": type === 'edit' ? 'contact' : 'add-square' },

    "class": bem([type]),
    "on": {
      "click": onClick } },

  (0, _functional.inherit)(ctx)]), [Content()]);
}

ContactCard.props = {
  tel: String,
  name: String,
  addText: String,
  editable: {
    type: Boolean,
    default: true },

  type: {
    type: String,
    default: 'add' } };var _default =


createComponent(ContactCard);exports.default = _default;

/***/ }),
/* 107 */
/*!*****************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/contact-edit/index.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/esm/extends */ 15));

var _utils = __webpack_require__(/*! ../utils */ 17);
var _mobile = __webpack_require__(/*! ../utils/validate/mobile */ 46);

var _cell = _interopRequireDefault(__webpack_require__(/*! ../cell */ 54));
var _field = _interopRequireDefault(__webpack_require__(/*! ../field */ 57));
var _button = _interopRequireDefault(__webpack_require__(/*! ../button */ 63));
var _dialog = _interopRequireDefault(__webpack_require__(/*! ../dialog */ 64));
var _switch = _interopRequireDefault(__webpack_require__(/*! ../switch */ 71));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // Utils
// Components
var _createNamespace = (0, _utils.createNamespace)('contact-edit'),
createComponent = _createNamespace[0],
bem = _createNamespace[1],
t = _createNamespace[2];

var defaultContact = {
  tel: '',
  name: '' };var _default2 =

createComponent({
  props: {
    isEdit: Boolean,
    isSaving: Boolean,
    isDeleting: Boolean,
    showSetDefault: Boolean,
    setDefaultLabel: String,
    contactInfo: {
      type: Object,
      default: function _default() {
        return (0, _extends2.default)({}, defaultContact);
      } },

    telValidator: {
      type: Function,
      default: _mobile.isMobile } },


  data: function data() {
    return {
      data: (0, _extends2.default)({}, defaultContact, this.contactInfo),
      errorInfo: {
        name: '',
        tel: '' } };


  },
  watch: {
    contactInfo: function contactInfo(val) {
      this.data = (0, _extends2.default)({}, defaultContact, val);
    } },

  methods: {
    onFocus: function onFocus(key) {
      this.errorInfo[key] = '';
    },
    getErrorMessageByKey: function getErrorMessageByKey(key) {
      var value = this.data[key].trim();

      switch (key) {
        case 'name':
          return value ? '' : t('nameInvalid');

        case 'tel':
          return this.telValidator(value) ? '' : t('telInvalid');}

    },
    onSave: function onSave() {
      var _this = this;

      var isValid = ['name', 'tel'].every(function (item) {
        var msg = _this.getErrorMessageByKey(item);

        if (msg) {
          _this.errorInfo[item] = msg;
        }

        return !msg;
      });

      if (isValid && !this.isSaving) {
        this.$emit('save', this.data);
      }
    },
    onDelete: function onDelete() {
      var _this2 = this;

      _dialog.default.confirm({
        title: t('confirmDelete') }).
      then(function () {
        _this2.$emit('delete', _this2.data);
      });
    } },

  render: function render() {
    var _this3 = this;

    var h = arguments[0];
    var data = this.data,
    errorInfo = this.errorInfo;

    var onFocus = function onFocus(name) {
      return function () {
        return _this3.onFocus(name);
      };
    };

    return h("div", {
      "class": bem() },
    [h("div", {
      "class": bem('fields') },
    [h(_field.default, {
      "attrs": {
        "clearable": true,
        "maxlength": "30",
        "label": t('name'),
        "placeholder": t('nameEmpty'),
        "errorMessage": errorInfo.name },

      "on": {
        "focus": onFocus('name') },

      "model": {
        value: data.name,
        callback: function callback($$v) {
          _this3.$set(data, "name", $$v);
        } } }),

    h(_field.default, {
      "attrs": {
        "clearable": true,
        "type": "tel",
        "label": t('tel'),
        "placeholder": t('telEmpty'),
        "errorMessage": errorInfo.tel },

      "on": {
        "focus": onFocus('tel') },

      "model": {
        value: data.tel,
        callback: function callback($$v) {
          _this3.$set(data, "tel", $$v);
        } } })]),

    this.showSetDefault && h(_cell.default, {
      "attrs": {
        "title": this.setDefaultLabel,
        "border": false },

      "class": bem('switch-cell') },
    [h(_switch.default, {
      "attrs": {
        "size": 24 },

      "slot": "right-icon",
      "on": {
        "change": function change(event) {
          _this3.$emit('change-default', event);
        } },

      "model": {
        value: data.isDefault,
        callback: function callback($$v) {
          _this3.$set(data, "isDefault", $$v);
        } } })]),

    h("div", {
      "class": bem('buttons') },
    [h(_button.default, {
      "attrs": {
        "block": true,
        "round": true,
        "type": "danger",
        "text": t('save'),
        "loading": this.isSaving },

      "on": {
        "click": this.onSave } }),

    this.isEdit && h(_button.default, {
      "attrs": {
        "block": true,
        "round": true,
        "text": t('delete'),
        "loading": this.isDeleting },

      "on": {
        "click": this.onDelete } })])]);


  } });exports.default = _default2;

/***/ }),
/* 108 */
/*!*****************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/contact-list/index.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _babelHelperVueJsxMergeProps = _interopRequireDefault(__webpack_require__(/*! @vue/babel-helper-vue-jsx-merge-props */ 16));

var _utils = __webpack_require__(/*! ../utils */ 17);
var _constant = __webpack_require__(/*! ../utils/constant */ 50);
var _functional = __webpack_require__(/*! ../utils/functional */ 29);

var _tag = _interopRequireDefault(__webpack_require__(/*! ../tag */ 77));
var _icon = _interopRequireDefault(__webpack_require__(/*! ../icon */ 41));
var _cell = _interopRequireDefault(__webpack_require__(/*! ../cell */ 54));
var _radio = _interopRequireDefault(__webpack_require__(/*! ../radio */ 78));
var _button = _interopRequireDefault(__webpack_require__(/*! ../button */ 63));
var _radioGroup = _interopRequireDefault(__webpack_require__(/*! ../radio-group */ 75));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // Utils
// Components
// Types
var _createNamespace = (0, _utils.createNamespace)('contact-list'),createComponent = _createNamespace[0],
bem = _createNamespace[1],
t = _createNamespace[2];

function ContactList(h, props, slots, ctx) {
  var List = props.list && props.list.map(function (item, index) {
    function onClick() {
      (0, _functional.emit)(ctx, 'input', item.id);
      (0, _functional.emit)(ctx, 'select', item, index);
    }

    function RightIcon() {
      return h(_radio.default, {
        "attrs": {
          "name": item.id,
          "iconSize": 16,
          "checkedColor": _constant.RED },

        "on": {
          "click": onClick } });


    }

    function LeftIcon() {
      return h(_icon.default, {
        "attrs": {
          "name": "edit" },

        "class": bem('edit'),
        "on": {
          "click": function click(event) {
            event.stopPropagation();
            (0, _functional.emit)(ctx, 'edit', item, index);
          } } });


    }

    function Content() {
      var nodes = [item.name + "\uFF0C" + item.tel];

      if (item.isDefault && props.defaultTagText) {
        nodes.push(h(_tag.default, {
          "attrs": {
            "type": "danger",
            "round": true },

          "class": bem('item-tag') },
        [props.defaultTagText]));
      }

      return nodes;
    }

    return h(_cell.default, {
      "key": item.id,
      "attrs": {
        "isLink": true,
        "center": true,
        "valueClass": bem('item-value') },

      "class": bem('item'),
      "scopedSlots": {
        icon: LeftIcon,
        default: Content,
        'right-icon': RightIcon },

      "on": {
        "click": onClick } });


  });
  return h("div", (0, _babelHelperVueJsxMergeProps.default)([{
    "class": bem() },
  (0, _functional.inherit)(ctx)]), [h(_radioGroup.default, {
    "attrs": {
      "value": props.value },

    "class": bem('group') },
  [List]), h("div", {
    "class": bem('bottom') },
  [h(_button.default, {
    "attrs": {
      "round": true,
      "block": true,
      "type": "danger",
      "text": props.addText || t('addText') },

    "class": bem('add'),
    "on": {
      "click": function click() {
        (0, _functional.emit)(ctx, 'add');
      } } })])]);


}

ContactList.props = {
  value: null,
  list: Array,
  addText: String,
  defaultTagText: String };var _default =

createComponent(ContactList);exports.default = _default;

/***/ }),
/* 109 */
/*!***************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/count-down/index.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _utils = __webpack_require__(/*! ../utils */ 17);
var _raf = __webpack_require__(/*! ../utils/dom/raf */ 82);
var _utils2 = __webpack_require__(/*! ./utils */ 110);

var _createNamespace = (0, _utils.createNamespace)('count-down'),
createComponent = _createNamespace[0],
bem = _createNamespace[1];var _default =

createComponent({
  props: {
    millisecond: Boolean,
    time: {
      type: [Number, String],
      default: 0 },

    format: {
      type: String,
      default: 'HH:mm:ss' },

    autoStart: {
      type: Boolean,
      default: true } },


  data: function data() {
    return {
      remain: 0 };

  },
  computed: {
    timeData: function timeData() {
      return (0, _utils2.parseTimeData)(this.remain);
    },
    formattedTime: function formattedTime() {
      return (0, _utils2.parseFormat)(this.format, this.timeData);
    } },

  watch: {
    time: {
      immediate: true,
      handler: 'reset' } },


  activated: function activated() {
    if (this.keepAlivePaused) {
      this.counting = true;
      this.keepAlivePaused = false;
      this.tick();
    }
  },
  deactivated: function deactivated() {
    if (this.counting) {
      this.pause();
      this.keepAlivePaused = true;
    }
  },
  beforeDestroy: function beforeDestroy() {
    this.pause();
  },
  methods: {
    // @exposed-api
    start: function start() {
      if (this.counting) {
        return;
      }

      this.counting = true;
      this.endTime = Date.now() + this.remain;
      this.tick();
    },
    // @exposed-api
    pause: function pause() {
      this.counting = false;
      (0, _raf.cancelRaf)(this.rafId);
    },
    // @exposed-api
    reset: function reset() {
      this.pause();
      this.remain = +this.time;

      if (this.autoStart) {
        this.start();
      }
    },
    tick: function tick() {
      // should not start counting in server
      // see: https://github.com/youzan/vant/issues/7807
      if (!_utils.inBrowser) {
        return;
      }

      if (this.millisecond) {
        this.microTick();
      } else {
        this.macroTick();
      }
    },
    microTick: function microTick() {
      var _this = this;

      this.rafId = (0, _raf.raf)(function () {
        /* istanbul ignore if */
        // in case of call reset immediately after finish
        if (!_this.counting) {
          return;
        }

        _this.setRemain(_this.getRemain());

        if (_this.remain > 0) {
          _this.microTick();
        }
      });
    },
    macroTick: function macroTick() {
      var _this2 = this;

      this.rafId = (0, _raf.raf)(function () {
        /* istanbul ignore if */
        // in case of call reset immediately after finish
        if (!_this2.counting) {
          return;
        }

        var remain = _this2.getRemain();

        if (!(0, _utils2.isSameSecond)(remain, _this2.remain) || remain === 0) {
          _this2.setRemain(remain);
        }

        if (_this2.remain > 0) {
          _this2.macroTick();
        }
      });
    },
    getRemain: function getRemain() {
      return Math.max(this.endTime - Date.now(), 0);
    },
    setRemain: function setRemain(remain) {
      this.remain = remain;
      this.$emit('change', this.timeData);

      if (remain === 0) {
        this.pause();
        this.$emit('finish');
      }
    } },

  render: function render() {
    var h = arguments[0];
    return h("div", {
      "class": bem() },
    [this.slots('default', this.timeData) || this.formattedTime]);
  } });exports.default = _default;

/***/ }),
/* 110 */
/*!***************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/count-down/utils.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.parseTimeData = parseTimeData;exports.parseFormat = parseFormat;exports.isSameSecond = isSameSecond;var _string = __webpack_require__(/*! ../utils/format/string */ 24);
var SECOND = 1000;
var MINUTE = 60 * SECOND;
var HOUR = 60 * MINUTE;
var DAY = 24 * HOUR;
function parseTimeData(time) {
  var days = Math.floor(time / DAY);
  var hours = Math.floor(time % DAY / HOUR);
  var minutes = Math.floor(time % HOUR / MINUTE);
  var seconds = Math.floor(time % MINUTE / SECOND);
  var milliseconds = Math.floor(time % SECOND);
  return {
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
    milliseconds: milliseconds };

}
function parseFormat(format, timeData) {
  var days = timeData.days;
  var hours = timeData.hours,
  minutes = timeData.minutes,
  seconds = timeData.seconds,
  milliseconds = timeData.milliseconds;

  if (format.indexOf('DD') === -1) {
    hours += days * 24;
  } else {
    format = format.replace('DD', (0, _string.padZero)(days));
  }

  if (format.indexOf('HH') === -1) {
    minutes += hours * 60;
  } else {
    format = format.replace('HH', (0, _string.padZero)(hours));
  }

  if (format.indexOf('mm') === -1) {
    seconds += minutes * 60;
  } else {
    format = format.replace('mm', (0, _string.padZero)(minutes));
  }

  if (format.indexOf('ss') === -1) {
    milliseconds += seconds * 1000;
  } else {
    format = format.replace('ss', (0, _string.padZero)(seconds));
  }

  if (format.indexOf('S') !== -1) {
    var ms = (0, _string.padZero)(milliseconds, 3);

    if (format.indexOf('SSS') !== -1) {
      format = format.replace('SSS', ms);
    } else if (format.indexOf('SS') !== -1) {
      format = format.replace('SS', ms.slice(0, 2));
    } else {
      format = format.replace('S', ms.charAt(0));
    }
  }

  return format;
}
function isSameSecond(time1, time2) {
  return Math.floor(time1 / 1000) === Math.floor(time2 / 1000);
}

/***/ }),
/* 111 */
/*!***********************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/coupon/index.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _utils = __webpack_require__(/*! ../utils */ 17);
var _constant = __webpack_require__(/*! ../utils/constant */ 50);
var _string = __webpack_require__(/*! ../utils/format/string */ 24);
var _checkbox = _interopRequireDefault(__webpack_require__(/*! ../checkbox */ 100));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var _createNamespace = (0, _utils.createNamespace)('coupon'),
createComponent = _createNamespace[0],
bem = _createNamespace[1],
t = _createNamespace[2];

function getDate(timeStamp) {
  var date = new Date(timeStamp * 1000);
  return date.getFullYear() + "." + (0, _string.padZero)(date.getMonth() + 1) + "." + (0, _string.padZero)(date.getDate());
}

function formatDiscount(discount) {
  return (discount / 10).toFixed(discount % 10 === 0 ? 0 : 1);
}

function formatAmount(amount) {
  return (amount / 100).toFixed(amount % 100 === 0 ? 0 : amount % 10 === 0 ? 1 : 2);
}var _default =

createComponent({
  props: {
    coupon: Object,
    chosen: Boolean,
    disabled: Boolean,
    currency: {
      type: String,
      default: '¥' } },


  computed: {
    validPeriod: function validPeriod() {
      var _this$coupon = this.coupon,
      startAt = _this$coupon.startAt,
      endAt = _this$coupon.endAt;
      return getDate(startAt) + " - " + getDate(endAt);
    },
    faceAmount: function faceAmount() {
      var coupon = this.coupon;

      if (coupon.valueDesc) {
        return coupon.valueDesc + "<span>" + (coupon.unitDesc || '') + "</span>";
      }

      if (coupon.denominations) {
        var denominations = formatAmount(coupon.denominations);
        return "<span>" + this.currency + "</span> " + denominations;
      }

      if (coupon.discount) {
        return t('discount', formatDiscount(coupon.discount));
      }

      return '';
    },
    conditionMessage: function conditionMessage() {
      var condition = formatAmount(this.coupon.originCondition);
      return condition === '0' ? t('unlimited') : t('condition', condition);
    } },

  render: function render() {
    var h = arguments[0];
    var coupon = this.coupon,
    disabled = this.disabled;
    var description = disabled && coupon.reason || coupon.description;
    return h("div", {
      "class": bem({
        disabled: disabled }) },

    [h("div", {
      "class": bem('content') },
    [h("div", {
      "class": bem('head') },
    [h("h2", {
      "class": bem('amount'),
      "domProps": {
        "innerHTML": this.faceAmount } }),

    h("p", {
      "class": bem('condition') },
    [this.coupon.condition || this.conditionMessage])]), h("div", {
      "class": bem('body') },
    [h("p", {
      "class": bem('name') },
    [coupon.name]), h("p", {
      "class": bem('valid') },
    [this.validPeriod]), !this.disabled && h(_checkbox.default, {
      "attrs": {
        "size": 18,
        "value": this.chosen,
        "checkedColor": _constant.RED },

      "class": bem('corner') })])]),
    description && h("p", {
      "class": bem('description') },
    [description])]);
  } });exports.default = _default;

/***/ }),
/* 112 */
/*!****************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/coupon-cell/index.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _babelHelperVueJsxMergeProps = _interopRequireDefault(__webpack_require__(/*! @vue/babel-helper-vue-jsx-merge-props */ 16));

var _utils = __webpack_require__(/*! ../utils */ 17);
var _functional = __webpack_require__(/*! ../utils/functional */ 29);

var _cell = _interopRequireDefault(__webpack_require__(/*! ../cell */ 54));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // Utils
// Components
// Types
var _createNamespace = (0, _utils.createNamespace)('coupon-cell'),createComponent = _createNamespace[0],
bem = _createNamespace[1],
t = _createNamespace[2];

function formatValue(props) {
  var coupons = props.coupons,
  chosenCoupon = props.chosenCoupon,
  currency = props.currency;
  var coupon = coupons[+chosenCoupon];

  if (coupon) {
    var value = 0;

    if ((0, _utils.isDef)(coupon.value)) {
      value = coupon.value;
    } else if ((0, _utils.isDef)(coupon.denominations)) {
      value = coupon.denominations;
    }

    return "-" + currency + " " + (value / 100).toFixed(2);
  }

  return coupons.length === 0 ? t('tips') : t('count', coupons.length);
}

function CouponCell(h, props, slots, ctx) {
  var selected = props.coupons[+props.chosenCoupon];
  var value = formatValue(props);
  return h(_cell.default, (0, _babelHelperVueJsxMergeProps.default)([{
    "class": bem(),
    "attrs": {
      "value": value,
      "title": props.title || t('title'),
      "border": props.border,
      "isLink": props.editable,
      "valueClass": bem('value', {
        selected: selected }) } },


  (0, _functional.inherit)(ctx, true)]));
}

CouponCell.model = {
  prop: 'chosenCoupon' };

CouponCell.props = {
  title: String,
  coupons: {
    type: Array,
    default: function _default() {
      return [];
    } },

  currency: {
    type: String,
    default: '¥' },

  border: {
    type: Boolean,
    default: true },

  editable: {
    type: Boolean,
    default: true },

  chosenCoupon: {
    type: [Number, String],
    default: -1 } };var _default2 =


createComponent(CouponCell);exports.default = _default2;

/***/ }),
/* 113 */
/*!****************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/coupon-list/index.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _utils = __webpack_require__(/*! ../utils */ 17);

var _tab = _interopRequireDefault(__webpack_require__(/*! ../tab */ 91));
var _tabs = _interopRequireDefault(__webpack_require__(/*! ../tabs */ 92));
var _field = _interopRequireDefault(__webpack_require__(/*! ../field */ 57));
var _button = _interopRequireDefault(__webpack_require__(/*! ../button */ 63));
var _coupon = _interopRequireDefault(__webpack_require__(/*! ../coupon */ 111));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // Utils
// Components
var _createNamespace = (0, _utils.createNamespace)('coupon-list'),
createComponent = _createNamespace[0],
bem = _createNamespace[1],
t = _createNamespace[2];

var EMPTY_IMAGE = 'https://img01.yzcdn.cn/vant/coupon-empty.png';var _default2 =
createComponent({
  model: {
    prop: 'code' },

  props: {
    code: String,
    closeButtonText: String,
    inputPlaceholder: String,
    enabledTitle: String,
    disabledTitle: String,
    exchangeButtonText: String,
    exchangeButtonLoading: Boolean,
    exchangeButtonDisabled: Boolean,
    exchangeMinLength: {
      type: Number,
      default: 1 },

    chosenCoupon: {
      type: Number,
      default: -1 },

    coupons: {
      type: Array,
      default: function _default() {
        return [];
      } },

    disabledCoupons: {
      type: Array,
      default: function _default() {
        return [];
      } },

    displayedCouponIndex: {
      type: Number,
      default: -1 },

    showExchangeBar: {
      type: Boolean,
      default: true },

    showCloseButton: {
      type: Boolean,
      default: true },

    showCount: {
      type: Boolean,
      default: true },

    currency: {
      type: String,
      default: '¥' },

    emptyImage: {
      type: String,
      default: EMPTY_IMAGE } },


  data: function data() {
    return {
      tab: 0,
      winHeight: window.innerHeight,
      currentCode: this.code || '' };

  },
  computed: {
    buttonDisabled: function buttonDisabled() {
      return !this.exchangeButtonLoading && (this.exchangeButtonDisabled || !this.currentCode || this.currentCode.length < this.exchangeMinLength);
    },
    listStyle: function listStyle() {
      return {
        height: this.winHeight - (this.showExchangeBar ? 140 : 94) + 'px' };

    } },

  watch: {
    code: function code(_code) {
      this.currentCode = _code;
    },
    currentCode: function currentCode(code) {
      this.$emit('input', code);
    },
    displayedCouponIndex: 'scrollToShowCoupon' },

  mounted: function mounted() {
    this.scrollToShowCoupon(this.displayedCouponIndex);
  },
  methods: {
    onClickExchangeButton: function onClickExchangeButton() {
      this.$emit('exchange', this.currentCode); // auto clear currentCode when not use vModel

      if (!this.code) {
        this.currentCode = '';
      }
    },
    // scroll to show specific coupon
    scrollToShowCoupon: function scrollToShowCoupon(index) {
      var _this = this;

      if (index === -1) {
        return;
      }

      this.$nextTick(function () {
        var _this$$refs = _this.$refs,
        card = _this$$refs.card,
        list = _this$$refs.list;
        /* istanbul ignore next */

        if (list && card && card[index]) {
          list.scrollTop = card[index].$el.offsetTop - 100;
        }
      });
    },
    genEmpty: function genEmpty() {
      var h = this.$createElement;
      return h("div", {
        "class": bem('empty') },
      [h("img", {
        "attrs": {
          "src": this.emptyImage } }),

      h("p", [t('empty')])]);
    },
    genExchangeButton: function genExchangeButton() {
      var h = this.$createElement;
      return h(_button.default, {
        "attrs": {
          "plain": true,
          "type": "danger",
          "text": this.exchangeButtonText || t('exchange'),
          "loading": this.exchangeButtonLoading,
          "disabled": this.buttonDisabled },

        "class": bem('exchange'),
        "on": {
          "click": this.onClickExchangeButton } });


    } },

  render: function render() {
    var _this2 = this;

    var h = arguments[0];
    var coupons = this.coupons,
    disabledCoupons = this.disabledCoupons;
    var count = this.showCount ? " (" + coupons.length + ")" : '';
    var title = (this.enabledTitle || t('enable')) + count;
    var disabledCount = this.showCount ? " (" + disabledCoupons.length + ")" : '';
    var disabledTitle = (this.disabledTitle || t('disabled')) + disabledCount;
    var ExchangeBar = this.showExchangeBar && h("div", {
      "class": bem('exchange-bar') },
    [h(_field.default, {
      "attrs": {
        "clearable": true,
        "border": false,
        "placeholder": this.inputPlaceholder || t('placeholder'),
        "maxlength": "20" },

      "class": bem('field'),
      "model": {
        value: _this2.currentCode,
        callback: function callback($$v) {
          _this2.currentCode = $$v;
        } } }),

    this.genExchangeButton()]);

    var onChange = function onChange(index) {
      return function () {
        return _this2.$emit('change', index);
      };
    };

    var CouponTab = h(_tab.default, {
      "attrs": {
        "title": title } },

    [h("div", {
      "class": bem('list', {
        'with-bottom': this.showCloseButton }),

      "style": this.listStyle },
    [coupons.map(function (coupon, index) {
      return h(_coupon.default, {
        "ref": "card",
        "key": coupon.id,
        "attrs": {
          "coupon": coupon,
          "currency": _this2.currency,
          "chosen": index === _this2.chosenCoupon },

        "nativeOn": {
          "click": onChange(index) } });


    }), !coupons.length && this.genEmpty()])]);
    var DisabledCouponTab = h(_tab.default, {
      "attrs": {
        "title": disabledTitle } },

    [h("div", {
      "class": bem('list', {
        'with-bottom': this.showCloseButton }),

      "style": this.listStyle },
    [disabledCoupons.map(function (coupon) {
      return h(_coupon.default, {
        "attrs": {
          "disabled": true,
          "coupon": coupon,
          "currency": _this2.currency },

        "key": coupon.id });

    }), !disabledCoupons.length && this.genEmpty()])]);
    return h("div", {
      "class": bem() },
    [ExchangeBar, h(_tabs.default, {
      "class": bem('tab'),
      "attrs": {
        "border": false },

      "model": {
        value: _this2.tab,
        callback: function callback($$v) {
          _this2.tab = $$v;
        } } },

    [CouponTab, DisabledCouponTab]), h("div", {
      "class": bem('bottom') },
    [h(_button.default, {
      "directives": [{
        name: "show",
        value: this.showCloseButton }],

      "attrs": {
        "round": true,
        "type": "danger",
        "block": true,
        "text": this.closeButtonText || t('close') },

      "class": bem('close'),
      "on": {
        "click": onChange(-1) } })])]);


  } });exports.default = _default2;

/***/ }),
/* 114 */
/*!********************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/datetime-picker/index.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/esm/extends */ 15));
var _utils = __webpack_require__(/*! ../utils */ 17);
var _TimePicker = _interopRequireDefault(__webpack_require__(/*! ./TimePicker */ 115));
var _DatePicker = _interopRequireDefault(__webpack_require__(/*! ./DatePicker */ 117));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var _createNamespace = (0, _utils.createNamespace)('datetime-picker'),
createComponent = _createNamespace[0],
bem = _createNamespace[1];var _default =

createComponent({
  props: (0, _extends2.default)({}, _TimePicker.default.props, _DatePicker.default.props),
  methods: {
    // @exposed-api
    getPicker: function getPicker() {
      return this.$refs.root.getPicker();
    } },

  render: function render() {
    var h = arguments[0];
    var Component = this.type === 'time' ? _TimePicker.default : _DatePicker.default;
    return h(Component, {
      "ref": "root",
      "class": bem(),
      "scopedSlots": this.$scopedSlots,
      "props": (0, _extends2.default)({}, this.$props),
      "on": (0, _extends2.default)({}, this.$listeners) });

  } });exports.default = _default;

/***/ }),
/* 115 */
/*!*************************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/datetime-picker/TimePicker.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/esm/extends */ 15));
var _utils = __webpack_require__(/*! ../utils */ 17);
var _string = __webpack_require__(/*! ../utils/format/string */ 24);
var _number = __webpack_require__(/*! ../utils/format/number */ 53);
var _shared = __webpack_require__(/*! ./shared */ 116);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var _createNamespace = (0, _utils.createNamespace)('time-picker'),
createComponent = _createNamespace[0];var _default =

createComponent({
  mixins: [_shared.TimePickerMixin],
  props: (0, _extends2.default)({}, _shared.sharedProps, {
    minHour: {
      type: [Number, String],
      default: 0 },

    maxHour: {
      type: [Number, String],
      default: 23 },

    minMinute: {
      type: [Number, String],
      default: 0 },

    maxMinute: {
      type: [Number, String],
      default: 59 } }),


  computed: {
    ranges: function ranges() {
      return [{
        type: 'hour',
        range: [+this.minHour, +this.maxHour] },
      {
        type: 'minute',
        range: [+this.minMinute, +this.maxMinute] }];

    } },

  watch: {
    filter: 'updateInnerValue',
    minHour: 'updateInnerValue',
    maxHour: 'updateInnerValue',
    minMinute: 'updateInnerValue',
    maxMinute: 'updateInnerValue',
    value: function value(val) {
      val = this.formatValue(val);

      if (val !== this.innerValue) {
        this.innerValue = val;
        this.updateColumnValue();
      }
    } },

  methods: {
    formatValue: function formatValue(value) {
      if (!value) {
        value = (0, _string.padZero)(this.minHour) + ":" + (0, _string.padZero)(this.minMinute);
      }

      var _value$split = value.split(':'),
      hour = _value$split[0],
      minute = _value$split[1];

      hour = (0, _string.padZero)((0, _number.range)(hour, this.minHour, this.maxHour));
      minute = (0, _string.padZero)((0, _number.range)(minute, this.minMinute, this.maxMinute));
      return hour + ":" + minute;
    },
    updateInnerValue: function updateInnerValue() {
      var _this$getPicker$getIn = this.getPicker().getIndexes(),
      hourIndex = _this$getPicker$getIn[0],
      minuteIndex = _this$getPicker$getIn[1];

      var _this$originColumns = this.originColumns,
      hourColumn = _this$originColumns[0],
      minuteColumn = _this$originColumns[1];
      var hour = hourColumn.values[hourIndex] || hourColumn.values[0];
      var minute = minuteColumn.values[minuteIndex] || minuteColumn.values[0];
      this.innerValue = this.formatValue(hour + ":" + minute);
      this.updateColumnValue();
    },
    onChange: function onChange(picker) {
      var _this = this;

      this.updateInnerValue();
      this.$nextTick(function () {
        _this.$nextTick(function () {
          _this.$emit('change', picker);
        });
      });
    },
    updateColumnValue: function updateColumnValue() {
      var _this2 = this;

      var formatter = this.formatter;
      var pair = this.innerValue.split(':');
      var values = [formatter('hour', pair[0]), formatter('minute', pair[1])];
      this.$nextTick(function () {
        _this2.getPicker().setValues(values);
      });
    } } });exports.default = _default;

/***/ }),
/* 116 */
/*!*********************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/datetime-picker/shared.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.TimePickerMixin = exports.sharedProps = void 0;var _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/esm/extends */ 15));
var _utils = __webpack_require__(/*! ./utils */ 86);
var _string = __webpack_require__(/*! ../utils/format/string */ 24);
var _shared = __webpack_require__(/*! ../picker/shared */ 48);
var _picker = _interopRequireDefault(__webpack_require__(/*! ../picker */ 49));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
var sharedProps = (0, _extends2.default)({}, _shared.pickerProps, {
  value: null,
  filter: Function,
  columnsOrder: Array,
  showToolbar: {
    type: Boolean,
    default: true },

  formatter: {
    type: Function,
    default: function _default(type, value) {
      return value;
    } } });exports.sharedProps = sharedProps;


var TimePickerMixin = {
  data: function data() {
    return {
      innerValue: this.formatValue(this.value) };

  },
  computed: {
    originColumns: function originColumns() {
      var _this = this;

      return this.ranges.map(function (_ref) {
        var type = _ref.type,
        rangeArr = _ref.range;
        var values = (0, _utils.times)(rangeArr[1] - rangeArr[0] + 1, function (index) {
          var value = (0, _string.padZero)(rangeArr[0] + index);
          return value;
        });

        if (_this.filter) {
          values = _this.filter(type, values);
        }

        return {
          type: type,
          values: values };

      });
    },
    columns: function columns() {
      var _this2 = this;

      return this.originColumns.map(function (column) {
        return {
          values: column.values.map(function (value) {
            return _this2.formatter(column.type, value);
          }) };

      });
    } },

  watch: {
    columns: 'updateColumnValue',
    innerValue: function innerValue(val) {
      this.$emit('input', val);
    } },

  mounted: function mounted() {
    var _this3 = this;

    this.updateColumnValue();
    this.$nextTick(function () {
      _this3.updateInnerValue();
    });
  },
  methods: {
    // @exposed-api
    getPicker: function getPicker() {
      return this.$refs.picker;
    },
    onConfirm: function onConfirm() {
      this.$emit('confirm', this.innerValue);
    },
    onCancel: function onCancel() {
      this.$emit('cancel');
    } },

  render: function render() {
    var _this4 = this;

    var h = arguments[0];
    var props = {};
    Object.keys(_shared.pickerProps).forEach(function (key) {
      props[key] = _this4[key];
    });
    return h(_picker.default, {
      "ref": "picker",
      "attrs": {
        "columns": this.columns,
        "readonly": this.readonly },

      "scopedSlots": this.$scopedSlots,
      "on": {
        "change": this.onChange,
        "confirm": this.onConfirm,
        "cancel": this.onCancel },

      "props": (0, _extends2.default)({}, props) });

  } };exports.TimePickerMixin = TimePickerMixin;

/***/ }),
/* 117 */
/*!*************************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/datetime-picker/DatePicker.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/esm/extends */ 15));
var _utils = __webpack_require__(/*! ../utils */ 17);
var _date = __webpack_require__(/*! ../utils/validate/date */ 83);
var _string = __webpack_require__(/*! ../utils/format/string */ 24);
var _utils2 = __webpack_require__(/*! ./utils */ 86);
var _shared = __webpack_require__(/*! ./shared */ 116);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
var currentYear = new Date().getFullYear();

var _createNamespace = (0, _utils.createNamespace)('date-picker'),
createComponent = _createNamespace[0];var _default2 =

createComponent({
  mixins: [_shared.TimePickerMixin],
  props: (0, _extends2.default)({}, _shared.sharedProps, {
    type: {
      type: String,
      default: 'datetime' },

    minDate: {
      type: Date,
      default: function _default() {
        return new Date(currentYear - 10, 0, 1);
      },
      validator: _date.isDate },

    maxDate: {
      type: Date,
      default: function _default() {
        return new Date(currentYear + 10, 11, 31);
      },
      validator: _date.isDate } }),


  watch: {
    filter: 'updateInnerValue',
    minDate: 'updateInnerValue',
    maxDate: 'updateInnerValue',
    value: function value(val) {
      val = this.formatValue(val);

      if (val.valueOf() !== this.innerValue.valueOf()) {
        this.innerValue = val;
      }
    } },

  computed: {
    ranges: function ranges() {
      var _this$getBoundary = this.getBoundary('max', this.innerValue),
      maxYear = _this$getBoundary.maxYear,
      maxDate = _this$getBoundary.maxDate,
      maxMonth = _this$getBoundary.maxMonth,
      maxHour = _this$getBoundary.maxHour,
      maxMinute = _this$getBoundary.maxMinute;

      var _this$getBoundary2 = this.getBoundary('min', this.innerValue),
      minYear = _this$getBoundary2.minYear,
      minDate = _this$getBoundary2.minDate,
      minMonth = _this$getBoundary2.minMonth,
      minHour = _this$getBoundary2.minHour,
      minMinute = _this$getBoundary2.minMinute;

      var result = [{
        type: 'year',
        range: [minYear, maxYear] },
      {
        type: 'month',
        range: [minMonth, maxMonth] },
      {
        type: 'day',
        range: [minDate, maxDate] },
      {
        type: 'hour',
        range: [minHour, maxHour] },
      {
        type: 'minute',
        range: [minMinute, maxMinute] }];


      switch (this.type) {
        case 'date':
          result = result.slice(0, 3);
          break;

        case 'year-month':
          result = result.slice(0, 2);
          break;

        case 'month-day':
          result = result.slice(1, 3);
          break;

        case 'datehour':
          result = result.slice(0, 4);
          break;}


      if (this.columnsOrder) {
        var columnsOrder = this.columnsOrder.concat(result.map(function (column) {
          return column.type;
        }));
        result.sort(function (a, b) {
          return columnsOrder.indexOf(a.type) - columnsOrder.indexOf(b.type);
        });
      }

      return result;
    } },

  methods: {
    formatValue: function formatValue(value) {
      if (!(0, _date.isDate)(value)) {
        value = this.minDate;
      }

      value = Math.max(value, this.minDate.getTime());
      value = Math.min(value, this.maxDate.getTime());
      return new Date(value);
    },
    getBoundary: function getBoundary(type, value) {
      var _ref;

      var boundary = this[type + "Date"];
      var year = boundary.getFullYear();
      var month = 1;
      var date = 1;
      var hour = 0;
      var minute = 0;

      if (type === 'max') {
        month = 12;
        date = (0, _utils2.getMonthEndDay)(value.getFullYear(), value.getMonth() + 1);
        hour = 23;
        minute = 59;
      }

      if (value.getFullYear() === year) {
        month = boundary.getMonth() + 1;

        if (value.getMonth() + 1 === month) {
          date = boundary.getDate();

          if (value.getDate() === date) {
            hour = boundary.getHours();

            if (value.getHours() === hour) {
              minute = boundary.getMinutes();
            }
          }
        }
      }

      return _ref = {}, _ref[type + "Year"] = year, _ref[type + "Month"] = month, _ref[type + "Date"] = date, _ref[type + "Hour"] = hour, _ref[type + "Minute"] = minute, _ref;
    },
    updateInnerValue: function updateInnerValue() {
      var _this = this;

      var type = this.type;
      var indexes = this.getPicker().getIndexes();

      var getValue = function getValue(type) {
        var index = 0;

        _this.originColumns.forEach(function (column, columnIndex) {
          if (type === column.type) {
            index = columnIndex;
          }
        });

        var values = _this.originColumns[index].values;
        return (0, _utils2.getTrueValue)(values[indexes[index]]);
      };

      var year;
      var month;
      var day;

      if (type === 'month-day') {
        year = this.innerValue.getFullYear();
        month = getValue('month');
        day = getValue('day');
      } else {
        year = getValue('year');
        month = getValue('month');
        day = type === 'year-month' ? 1 : getValue('day');
      }

      var maxDay = (0, _utils2.getMonthEndDay)(year, month);
      day = day > maxDay ? maxDay : day;
      var hour = 0;
      var minute = 0;

      if (type === 'datehour') {
        hour = getValue('hour');
      }

      if (type === 'datetime') {
        hour = getValue('hour');
        minute = getValue('minute');
      }

      var value = new Date(year, month - 1, day, hour, minute);
      this.innerValue = this.formatValue(value);
    },
    onChange: function onChange(picker) {
      var _this2 = this;

      this.updateInnerValue();
      this.$nextTick(function () {
        _this2.$nextTick(function () {
          _this2.$emit('change', picker);
        });
      });
    },
    updateColumnValue: function updateColumnValue() {
      var _this3 = this;

      var value = this.innerValue;
      var formatter = this.formatter;
      var values = this.originColumns.map(function (column) {
        switch (column.type) {
          case 'year':
            return formatter('year', "" + value.getFullYear());

          case 'month':
            return formatter('month', (0, _string.padZero)(value.getMonth() + 1));

          case 'day':
            return formatter('day', (0, _string.padZero)(value.getDate()));

          case 'hour':
            return formatter('hour', (0, _string.padZero)(value.getHours()));

          case 'minute':
            return formatter('minute', (0, _string.padZero)(value.getMinutes()));

          default:
            // no default
            return null;}

      });
      this.$nextTick(function () {
        _this3.getPicker().setValues(values);
      });
    } } });exports.default = _default2;

/***/ }),
/* 118 */
/*!************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/divider/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _babelHelperVueJsxMergeProps = _interopRequireDefault(__webpack_require__(/*! @vue/babel-helper-vue-jsx-merge-props */ 16));

var _utils = __webpack_require__(/*! ../utils */ 17);
var _functional = __webpack_require__(/*! ../utils/functional */ 29);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // Utils
// Types
var _createNamespace = (0, _utils.createNamespace)('divider'),
createComponent = _createNamespace[0],
bem = _createNamespace[1];

function Divider(h, props, slots, ctx) {
  var _bem;

  return h("div", (0, _babelHelperVueJsxMergeProps.default)([{
    "attrs": {
      "role": "separator" },

    "style": {
      borderColor: props.borderColor },

    "class": bem((_bem = {
      dashed: props.dashed,
      hairline: props.hairline },
    _bem["content-" + props.contentPosition] = slots.default, _bem)) },
  (0, _functional.inherit)(ctx, true)]), [slots.default && slots.default()]);
}

Divider.props = {
  dashed: Boolean,
  hairline: {
    type: Boolean,
    default: true },

  contentPosition: {
    type: String,
    default: 'center' } };var _default =


createComponent(Divider);exports.default = _default;

/***/ }),
/* 119 */
/*!******************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/dropdown-item/index.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _utils = __webpack_require__(/*! ../utils */ 17);
var _event = __webpack_require__(/*! ../utils/dom/event */ 34);

var _portal = __webpack_require__(/*! ../mixins/portal */ 38);
var _relation = __webpack_require__(/*! ../mixins/relation */ 67);

var _cell = _interopRequireDefault(__webpack_require__(/*! ../cell */ 54));
var _icon = _interopRequireDefault(__webpack_require__(/*! ../icon */ 41));
var _popup = _interopRequireDefault(__webpack_require__(/*! ../popup */ 43));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // Utils
// Mixins
// Components
var _createNamespace = (0, _utils.createNamespace)('dropdown-item'),createComponent = _createNamespace[0],
bem = _createNamespace[1];var _default2 =

createComponent({
  mixins: [(0, _portal.PortalMixin)({
    ref: 'wrapper' }),
  (0, _relation.ChildrenMixin)('vanDropdownMenu')],
  props: {
    value: null,
    title: String,
    disabled: Boolean,
    titleClass: String,
    options: {
      type: Array,
      default: function _default() {
        return [];
      } },

    lazyRender: {
      type: Boolean,
      default: true } },


  data: function data() {
    return {
      transition: true,
      showPopup: false,
      showWrapper: false };

  },
  computed: {
    displayTitle: function displayTitle() {
      var _this = this;

      if (this.title) {
        return this.title;
      }

      var match = this.options.filter(function (option) {
        return option.value === _this.value;
      });
      return match.length ? match[0].text : '';
    } },

  watch: {
    showPopup: function showPopup(val) {
      this.bindScroll(val);
    } },

  beforeCreate: function beforeCreate() {
    var _this2 = this;

    var createEmitter = function createEmitter(eventName) {
      return function () {
        return _this2.$emit(eventName);
      };
    };

    this.onOpen = createEmitter('open');
    this.onClose = createEmitter('close');
    this.onOpened = createEmitter('opened');
  },
  methods: {
    // @exposed-api
    toggle: function toggle(show, options) {
      if (show === void 0) {
        show = !this.showPopup;
      }

      if (options === void 0) {
        options = {};
      }

      if (show === this.showPopup) {
        return;
      }

      this.transition = !options.immediate;
      this.showPopup = show;

      if (show) {
        this.parent.updateOffset();
        this.showWrapper = true;
      }
    },
    bindScroll: function bindScroll(bind) {
      var scroller = this.parent.scroller;
      var action = bind ? _event.on : _event.off;
      action(scroller, 'scroll', this.onScroll, true);
    },
    onScroll: function onScroll() {
      this.parent.updateOffset();
    },
    onClickWrapper: function onClickWrapper(event) {
      // prevent being identified as clicking outside and closed when use get-contaienr
      if (this.getContainer) {
        event.stopPropagation();
      }
    } },

  render: function render() {
    var _this3 = this;

    var h = arguments[0];
    var _this$parent = this.parent,
    zIndex = _this$parent.zIndex,
    offset = _this$parent.offset,
    overlay = _this$parent.overlay,
    duration = _this$parent.duration,
    direction = _this$parent.direction,
    activeColor = _this$parent.activeColor,
    closeOnClickOverlay = _this$parent.closeOnClickOverlay;
    var Options = this.options.map(function (option) {
      var active = option.value === _this3.value;
      return h(_cell.default, {
        "attrs": {
          "clickable": true,
          "icon": option.icon,
          "title": option.text },

        "key": option.value,
        "class": bem('option', {
          active: active }),

        "style": {
          color: active ? activeColor : '' },

        "on": {
          "click": function click() {
            _this3.showPopup = false;

            if (option.value !== _this3.value) {
              _this3.$emit('input', option.value);

              _this3.$emit('change', option.value);
            }
          } } },

      [active && h(_icon.default, {
        "class": bem('icon'),
        "attrs": {
          "color": activeColor,
          "name": "success" } })]);


    });
    var style = {
      zIndex: zIndex };


    if (direction === 'down') {
      style.top = offset + "px";
    } else {
      style.bottom = offset + "px";
    }

    return h("div", [h("div", {
      "directives": [{
        name: "show",
        value: this.showWrapper }],

      "ref": "wrapper",
      "style": style,
      "class": bem([direction]),
      "on": {
        "click": this.onClickWrapper } },

    [h(_popup.default, {
      "attrs": {
        "overlay": overlay,
        "position": direction === 'down' ? 'top' : 'bottom',
        "duration": this.transition ? duration : 0,
        "lazyRender": this.lazyRender,
        "overlayStyle": {
          position: 'absolute' },

        "closeOnClickOverlay": closeOnClickOverlay },

      "class": bem('content'),
      "on": {
        "open": this.onOpen,
        "close": this.onClose,
        "opened": this.onOpened,
        "closed": function closed() {
          _this3.showWrapper = false;

          _this3.$emit('closed');
        } },

      "model": {
        value: _this3.showPopup,
        callback: function callback($$v) {
          _this3.showPopup = $$v;
        } } },

    [Options, this.slots('default')])])]);
  } });exports.default = _default2;

/***/ }),
/* 120 */
/*!******************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/dropdown-menu/index.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _utils = __webpack_require__(/*! ../utils */ 17);
var _scroll = __webpack_require__(/*! ../utils/dom/scroll */ 36);

var _relation = __webpack_require__(/*! ../mixins/relation */ 67);
var _clickOutside = __webpack_require__(/*! ../mixins/click-outside */ 121); // Utils
// Mixins
var _createNamespace = (0, _utils.createNamespace)('dropdown-menu'),
createComponent = _createNamespace[0],
bem = _createNamespace[1];var _default =

createComponent({
  mixins: [(0, _relation.ParentMixin)('vanDropdownMenu'), (0, _clickOutside.ClickOutsideMixin)({
    event: 'click',
    method: 'onClickOutside' })],

  props: {
    zIndex: [Number, String],
    activeColor: String,
    overlay: {
      type: Boolean,
      default: true },

    duration: {
      type: [Number, String],
      default: 0.2 },

    direction: {
      type: String,
      default: 'down' },

    closeOnClickOverlay: {
      type: Boolean,
      default: true } },


  data: function data() {
    return {
      offset: 0 };

  },
  computed: {
    scroller: function scroller() {
      return (0, _scroll.getScroller)(this.$el);
    },
    opened: function opened() {
      return this.children.some(function (item) {
        return item.showWrapper;
      });
    },
    barStyle: function barStyle() {
      if (this.opened && (0, _utils.isDef)(this.zIndex)) {
        return {
          zIndex: 1 + this.zIndex };

      }
    } },

  methods: {
    updateOffset: function updateOffset() {
      if (!this.$refs.bar) {
        return;
      }

      var rect = this.$refs.bar.getBoundingClientRect();

      if (this.direction === 'down') {
        this.offset = rect.bottom;
      } else {
        this.offset = window.innerHeight - rect.top;
      }
    },
    toggleItem: function toggleItem(active) {
      this.children.forEach(function (item, index) {
        if (index === active) {
          item.toggle();
        } else if (item.showPopup) {
          item.toggle(false, {
            immediate: true });

        }
      });
    },
    onClickOutside: function onClickOutside() {
      this.children.forEach(function (item) {
        item.toggle(false);
      });
    } },

  render: function render() {
    var _this = this;

    var h = arguments[0];
    var Titles = this.children.map(function (item, index) {
      return h("div", {
        "attrs": {
          "role": "button",
          "tabindex": item.disabled ? -1 : 0 },

        "class": bem('item', {
          disabled: item.disabled }),

        "on": {
          "click": function click() {
            if (!item.disabled) {
              _this.toggleItem(index);
            }
          } } },

      [h("span", {
        "class": [bem('title', {
          active: item.showPopup,
          down: item.showPopup === (_this.direction === 'down') }),
        item.titleClass],
        "style": {
          color: item.showPopup ? _this.activeColor : '' } },

      [h("div", {
        "class": "van-ellipsis" },
      [item.slots('title') || item.displayTitle])])]);
    });
    return h("div", {
      "class": bem() },
    [h("div", {
      "ref": "bar",
      "style": this.barStyle,
      "class": bem('bar', {
        opened: this.opened }) },

    [Titles]), this.slots('default')]);
  } });exports.default = _default;

/***/ }),
/* 121 */
/*!*******************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/mixins/click-outside.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.ClickOutsideMixin = void 0;


var _event = __webpack_require__(/*! ../utils/dom/event */ 34); /**
                                             * Listen to click outside event
                                             */var ClickOutsideMixin = function ClickOutsideMixin(config) {return {
    props: {
      closeOnClickOutside: {
        type: Boolean,
        default: true } },


    data: function data() {
      var _this = this;

      var clickOutsideHandler = function clickOutsideHandler(event) {
        if (_this.closeOnClickOutside && !_this.$el.contains(event.target)) {
          _this[config.method]();
        }
      };

      return {
        clickOutsideHandler: clickOutsideHandler };

    },
    mounted: function mounted() {
      (0, _event.on)(document, config.event, this.clickOutsideHandler);
    },
    beforeDestroy: function beforeDestroy() {
      (0, _event.off)(document, config.event, this.clickOutsideHandler);
    } };

};exports.ClickOutsideMixin = ClickOutsideMixin;

/***/ }),
/* 122 */
/*!**********************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/empty/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _utils = __webpack_require__(/*! ../utils */ 17);
var _Network = _interopRequireDefault(__webpack_require__(/*! ./Network */ 123));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var _createNamespace = (0, _utils.createNamespace)('empty'),
createComponent = _createNamespace[0],
bem = _createNamespace[1];

var PRESETS = ['error', 'search', 'default'];var _default =
createComponent({
  props: {
    imageSize: [Number, String],
    description: String,
    image: {
      type: String,
      default: 'default' } },


  methods: {
    genImageContent: function genImageContent() {
      var h = this.$createElement;
      var slots = this.slots('image');

      if (slots) {
        return slots;
      }

      if (this.image === 'network') {
        return h(_Network.default);
      }

      var image = this.image;

      if (PRESETS.indexOf(image) !== -1) {
        image = "https://img01.yzcdn.cn/vant/empty-image-" + image + ".png";
      }

      return h("img", {
        "attrs": {
          "src": image } });


    },
    genImage: function genImage() {
      var h = this.$createElement;
      var imageStyle = {
        width: (0, _utils.addUnit)(this.imageSize),
        height: (0, _utils.addUnit)(this.imageSize) };

      return h("div", {
        "class": bem('image'),
        "style": imageStyle },
      [this.genImageContent()]);
    },
    genDescription: function genDescription() {
      var h = this.$createElement;
      var description = this.slots('description') || this.description;

      if (description) {
        return h("p", {
          "class": bem('description') },
        [description]);
      }
    },
    genBottom: function genBottom() {
      var h = this.$createElement;
      var slot = this.slots();

      if (slot) {
        return h("div", {
          "class": bem('bottom') },
        [slot]);
      }
    } },

  render: function render() {
    var h = arguments[0];
    return h("div", {
      "class": bem() },
    [this.genImage(), this.genDescription(), this.genBottom()]);
  } });exports.default = _default;

/***/ }),
/* 123 */
/*!************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/empty/Network.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  render: function render() {
    var h = arguments[0];

    var genStop = function genStop(color, offset, opacity) {
      return h("stop", {
        "attrs": {
          "stop-color": color,
          "offset": offset + "%",
          "stop-opacity": opacity } });


    };

    return h("svg", {
      "attrs": {
        "viewBox": "0 0 160 160",
        "xmlns": "http://www.w3.org/2000/svg" } },

    [h("defs", [h("linearGradient", {
      "attrs": {
        "id": "c",
        "x1": "64.022%",
        "y1": "100%",
        "x2": "64.022%",
        "y2": "0%" } },

    [genStop('#FFF', 0, 0.5), genStop('#F2F3F5', 100)]), h("linearGradient", {
      "attrs": {
        "id": "d",
        "x1": "64.022%",
        "y1": "96.956%",
        "x2": "64.022%",
        "y2": "0%" } },

    [genStop('#F2F3F5', 0, 0.3), genStop('#F2F3F5', 100)]), h("linearGradient", {
      "attrs": {
        "id": "h",
        "x1": "50%",
        "y1": "0%",
        "x2": "50%",
        "y2": "84.459%" } },

    [genStop('#EBEDF0', 0), genStop('#DCDEE0', 100, 0)]), h("linearGradient", {
      "attrs": {
        "id": "i",
        "x1": "100%",
        "y1": "0%",
        "x2": "100%",
        "y2": "100%" } },

    [genStop('#EAEDF0', 0), genStop('#DCDEE0', 100)]), h("linearGradient", {
      "attrs": {
        "id": "k",
        "x1": "100%",
        "y1": "100%",
        "x2": "100%",
        "y2": "0%" } },

    [genStop('#EAEDF0', 0), genStop('#DCDEE0', 100)]), h("linearGradient", {
      "attrs": {
        "id": "m",
        "x1": "0%",
        "y1": "43.982%",
        "x2": "100%",
        "y2": "54.703%" } },

    [genStop('#EAEDF0', 0), genStop('#DCDEE0', 100)]), h("linearGradient", {
      "attrs": {
        "id": "n",
        "x1": "94.535%",
        "y1": "43.837%",
        "x2": "5.465%",
        "y2": "54.948%" } },

    [genStop('#EAEDF0', 0), genStop('#DCDEE0', 100)]), h("radialGradient", {
      "attrs": {
        "id": "g",
        "cx": "50%",
        "cy": "0%",
        "fx": "50%",
        "fy": "0%",
        "r": "100%",
        "gradientTransform": "matrix(0 1 -.54835 0 .5 -.5)" } },

    [genStop('#EBEDF0', 0), genStop('#FFF', 100, 0)])]), h("g", {
      "attrs": {
        "fill": "none",
        "fill-rule": "evenodd" } },

    [h("g", {
      "attrs": {
        "opacity": ".8" } },

    [h("path", {
      "attrs": {
        "d": "M0 124V46h20v20h14v58H0z",
        "fill": "url(#c)",
        "transform": "matrix(-1 0 0 1 36 7)" } }),

    h("path", {
      "attrs": {
        "d": "M40.5 5a8.504 8.504 0 018.13 6.009l.12-.005L49 11a8 8 0 11-1 15.938V27H34v-.174a6.5 6.5 0 11-1.985-12.808A8.5 8.5 0 0140.5 5z",
        "fill": "url(#d)",
        "transform": "translate(2 7)" } }),

    h("path", {
      "attrs": {
        "d": "M96.016 0a4.108 4.108 0 013.934 2.868l.179-.004c2.138 0 3.871 1.71 3.871 3.818 0 2.109-1.733 3.818-3.871 3.818-.164 0-.325-.01-.484-.03v.03h-6.774v-.083a3.196 3.196 0 01-.726.083C90.408 10.5 89 9.111 89 7.398c0-1.636 1.284-2.976 2.911-3.094a3.555 3.555 0 01-.008-.247c0-2.24 1.842-4.057 4.113-4.057z",
        "fill": "url(#d)",
        "transform": "translate(2 7)" } }),

    h("path", {
      "attrs": {
        "d": "M121 8h22.231v14H152v77.37h-31V8z",
        "fill": "url(#c)",
        "transform": "translate(2 7)" } })]),

    h("path", {
      "attrs": {
        "fill": "url(#g)",
        "d": "M0 139h160v21H0z" } }),

    h("path", {
      "attrs": {
        "d": "M37 18a7 7 0 013 13.326v26.742c0 1.23-.997 2.227-2.227 2.227h-1.546A2.227 2.227 0 0134 58.068V31.326A7 7 0 0137 18z",
        "fill": "url(#h)",
        "fill-rule": "nonzero",
        "transform": "translate(43 36)" } }),

    h("g", {
      "attrs": {
        "opacity": ".6",
        "stroke-linecap": "round",
        "stroke-width": "7" } },

    [h("path", {
      "attrs": {
        "d": "M20.875 11.136a18.868 18.868 0 00-5.284 13.121c0 5.094 2.012 9.718 5.284 13.12",
        "stroke": "url(#i)",
        "transform": "translate(43 36)" } }),

    h("path", {
      "attrs": {
        "d": "M9.849 0C3.756 6.225 0 14.747 0 24.146c0 9.398 3.756 17.92 9.849 24.145",
        "stroke": "url(#i)",
        "transform": "translate(43 36)" } }),

    h("path", {
      "attrs": {
        "d": "M57.625 11.136a18.868 18.868 0 00-5.284 13.121c0 5.094 2.012 9.718 5.284 13.12",
        "stroke": "url(#k)",
        "transform": "rotate(-180 76.483 42.257)" } }),

    h("path", {
      "attrs": {
        "d": "M73.216 0c-6.093 6.225-9.849 14.747-9.849 24.146 0 9.398 3.756 17.92 9.849 24.145",
        "stroke": "url(#k)",
        "transform": "rotate(-180 89.791 42.146)" } })]),

    h("g", {
      "attrs": {
        "transform": "translate(31 105)",
        "fill-rule": "nonzero" } },

    [h("rect", {
      "attrs": {
        "fill": "url(#m)",
        "width": "98",
        "height": "34",
        "rx": "2" } }),

    h("rect", {
      "attrs": {
        "fill": "#FFF",
        "x": "9",
        "y": "8",
        "width": "80",
        "height": "18",
        "rx": "1.114" } }),

    h("rect", {
      "attrs": {
        "fill": "url(#n)",
        "x": "15",
        "y": "12",
        "width": "18",
        "height": "6",
        "rx": "1.114" } })])])]);


  } };exports.default = _default;

/***/ }),
/* 124 */
/*!*********************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/form/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _utils = __webpack_require__(/*! ../utils */ 17);
var _vnodes = __webpack_require__(/*! ../utils/vnodes */ 68);

var _createNamespace = (0, _utils.createNamespace)('form'),
createComponent = _createNamespace[0],
bem = _createNamespace[1];var _default =

createComponent({
  props: {
    colon: Boolean,
    disabled: Boolean,
    readonly: Boolean,
    labelWidth: [Number, String],
    labelAlign: String,
    inputAlign: String,
    scrollToError: Boolean,
    validateFirst: Boolean,
    errorMessageAlign: String,
    submitOnEnter: {
      type: Boolean,
      default: true },

    validateTrigger: {
      type: String,
      default: 'onBlur' },

    showError: {
      type: Boolean,
      default: true },

    showErrorMessage: {
      type: Boolean,
      default: true } },


  provide: function provide() {
    return {
      vanForm: this };

  },
  data: function data() {
    return {
      fields: [] };

  },
  methods: {
    getFieldsByNames: function getFieldsByNames(names) {
      if (names) {
        return this.fields.filter(function (field) {
          return names.indexOf(field.name) !== -1;
        });
      }

      return this.fields;
    },
    validateSeq: function validateSeq(names) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        var errors = [];

        var fields = _this.getFieldsByNames(names);

        fields.reduce(function (promise, field) {
          return promise.then(function () {
            if (!errors.length) {
              return field.validate().then(function (error) {
                if (error) {
                  errors.push(error);
                }
              });
            }
          });
        }, Promise.resolve()).then(function () {
          if (errors.length) {
            reject(errors);
          } else {
            resolve();
          }
        });
      });
    },
    validateFields: function validateFields(names) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        var fields = _this2.getFieldsByNames(names);

        Promise.all(fields.map(function (item) {
          return item.validate();
        })).then(function (errors) {
          errors = errors.filter(function (item) {
            return item;
          });

          if (errors.length) {
            reject(errors);
          } else {
            resolve();
          }
        });
      });
    },
    // @exposed-api
    validate: function validate(name) {
      if (name && !Array.isArray(name)) {
        return this.validateField(name);
      }

      return this.validateFirst ? this.validateSeq(name) : this.validateFields(name);
    },
    validateField: function validateField(name) {
      var matched = this.fields.filter(function (item) {
        return item.name === name;
      });

      if (matched.length) {
        return new Promise(function (resolve, reject) {
          matched[0].validate().then(function (error) {
            if (error) {
              reject(error);
            } else {
              resolve();
            }
          });
        });
      }

      return Promise.reject();
    },
    // @exposed-api
    resetValidation: function resetValidation(name) {
      if (name && !Array.isArray(name)) {
        name = [name];
      }

      var fields = this.getFieldsByNames(name);
      fields.forEach(function (item) {
        item.resetValidation();
      });
    },
    // @exposed-api
    scrollToField: function scrollToField(name, options) {
      this.fields.some(function (item) {
        if (item.name === name) {
          item.$el.scrollIntoView(options);
          return true;
        }

        return false;
      });
    },
    addField: function addField(field) {
      this.fields.push(field);
      (0, _vnodes.sortChildren)(this.fields, this);
    },
    removeField: function removeField(field) {
      this.fields = this.fields.filter(function (item) {
        return item !== field;
      });
    },
    getValues: function getValues() {
      return this.fields.reduce(function (form, field) {
        form[field.name] = field.formValue;
        return form;
      }, {});
    },
    onSubmit: function onSubmit(event) {
      event.preventDefault();
      this.submit();
    },
    // @exposed-api
    submit: function submit() {
      var _this3 = this;

      var values = this.getValues();
      this.validate().then(function () {
        _this3.$emit('submit', values);
      }).catch(function (errors) {
        _this3.$emit('failed', {
          values: values,
          errors: errors });


        if (_this3.scrollToError) {
          _this3.scrollToField(errors[0].name);
        }
      });
    } },

  render: function render() {
    var h = arguments[0];
    return h("form", {
      "class": bem(),
      "on": {
        "submit": this.onSubmit } },

    [this.slots()]);
  } });exports.default = _default;

/***/ }),
/* 125 */
/*!**********************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/goods-action-icon/index.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/esm/extends */ 15));
var _utils = __webpack_require__(/*! ../utils */ 17);
var _router = __webpack_require__(/*! ../utils/router */ 55);
var _relation = __webpack_require__(/*! ../mixins/relation */ 67);
var _info = _interopRequireDefault(__webpack_require__(/*! ../info */ 42));
var _icon = _interopRequireDefault(__webpack_require__(/*! ../icon */ 41));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var _createNamespace = (0, _utils.createNamespace)('goods-action-icon'),
createComponent = _createNamespace[0],
bem = _createNamespace[1];var _default =

createComponent({
  mixins: [(0, _relation.ChildrenMixin)('vanGoodsAction')],
  props: (0, _extends2.default)({}, _router.routeProps, {
    dot: Boolean,
    text: String,
    icon: String,
    color: String,
    // @deprecated
    info: [Number, String],
    badge: [Number, String],
    iconClass: null }),

  methods: {
    onClick: function onClick(event) {
      this.$emit('click', event);
      (0, _router.route)(this.$router, this);
    },
    genIcon: function genIcon() {
      var _this$badge;

      var h = this.$createElement;
      var slot = this.slots('icon');
      var info = (_this$badge = this.badge) != null ? _this$badge : this.info;

      if ( true && this.info) {
        console.warn('[Vant] GoodsActionIcon: "info" prop is deprecated, use "badge" prop instead.');
      }

      if (slot) {
        return h("div", {
          "class": bem('icon') },
        [slot, h(_info.default, {
          "attrs": {
            "dot": this.dot,
            "info": info } })]);


      }

      return h(_icon.default, {
        "class": [bem('icon'), this.iconClass],
        "attrs": {
          "tag": "div",
          "dot": this.dot,
          "info": info,
          "name": this.icon,
          "color": this.color } });


    } },

  render: function render() {
    var h = arguments[0];
    return h("div", {
      "attrs": {
        "role": "button",
        "tabindex": "0" },

      "class": bem(),
      "on": {
        "click": this.onClick } },

    [this.genIcon(), this.slots() || this.text]);
  } });exports.default = _default;

/***/ }),
/* 126 */
/*!*********************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/grid/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _utils = __webpack_require__(/*! ../utils */ 17);
var _constant = __webpack_require__(/*! ../utils/constant */ 50);
var _relation = __webpack_require__(/*! ../mixins/relation */ 67);

var _createNamespace = (0, _utils.createNamespace)('grid'),
createComponent = _createNamespace[0],
bem = _createNamespace[1];var _default =

createComponent({
  mixins: [(0, _relation.ParentMixin)('vanGrid')],
  props: {
    square: Boolean,
    gutter: [Number, String],
    iconSize: [Number, String],
    direction: String,
    clickable: Boolean,
    columnNum: {
      type: [Number, String],
      default: 4 },

    center: {
      type: Boolean,
      default: true },

    border: {
      type: Boolean,
      default: true } },


  computed: {
    style: function style() {
      var gutter = this.gutter;

      if (gutter) {
        return {
          paddingLeft: (0, _utils.addUnit)(gutter) };

      }
    } },

  render: function render() {
    var _ref;

    var h = arguments[0];
    return h("div", {
      "style": this.style,
      "class": [bem(), (_ref = {}, _ref[_constant.BORDER_TOP] = this.border && !this.gutter, _ref)] },
    [this.slots()]);
  } });exports.default = _default;

/***/ }),
/* 127 */
/*!**************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/grid-item/index.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/esm/extends */ 15));

var _utils = __webpack_require__(/*! ../utils */ 17);
var _constant = __webpack_require__(/*! ../utils/constant */ 50);
var _router = __webpack_require__(/*! ../utils/router */ 55);

var _relation = __webpack_require__(/*! ../mixins/relation */ 67);

var _info = _interopRequireDefault(__webpack_require__(/*! ../info */ 42));
var _icon = _interopRequireDefault(__webpack_require__(/*! ../icon */ 41));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // Utils
// Mixins
// Components
var _createNamespace = (0, _utils.createNamespace)('grid-item'),createComponent = _createNamespace[0],
bem = _createNamespace[1];var _default =

createComponent({
  mixins: [(0, _relation.ChildrenMixin)('vanGrid')],
  props: (0, _extends2.default)({}, _router.routeProps, {
    dot: Boolean,
    text: String,
    icon: String,
    iconPrefix: String,
    // @deprecated
    info: [Number, String],
    badge: [Number, String] }),

  computed: {
    style: function style() {
      var _this$parent = this.parent,
      square = _this$parent.square,
      gutter = _this$parent.gutter,
      columnNum = _this$parent.columnNum;
      var percent = 100 / columnNum + "%";
      var style = {
        flexBasis: percent };


      if (square) {
        style.paddingTop = percent;
      } else if (gutter) {
        var gutterValue = (0, _utils.addUnit)(gutter);
        style.paddingRight = gutterValue;

        if (this.index >= columnNum) {
          style.marginTop = gutterValue;
        }
      }

      return style;
    },
    contentStyle: function contentStyle() {
      var _this$parent2 = this.parent,
      square = _this$parent2.square,
      gutter = _this$parent2.gutter;

      if (square && gutter) {
        var gutterValue = (0, _utils.addUnit)(gutter);
        return {
          right: gutterValue,
          bottom: gutterValue,
          height: 'auto' };

      }
    } },

  methods: {
    onClick: function onClick(event) {
      this.$emit('click', event);
      (0, _router.route)(this.$router, this);
    },
    genIcon: function genIcon() {
      var _this$badge;

      var h = this.$createElement;
      var iconSlot = this.slots('icon');
      var info = (_this$badge = this.badge) != null ? _this$badge : this.info;

      if ( true && this.info) {
        console.warn('[Vant] GridItem: "info" prop is deprecated, use "badge" prop instead.');
      }

      if (iconSlot) {
        return h("div", {
          "class": bem('icon-wrapper') },
        [iconSlot, h(_info.default, {
          "attrs": {
            "dot": this.dot,
            "info": info } })]);


      }

      if (this.icon) {
        return h(_icon.default, {
          "attrs": {
            "name": this.icon,
            "dot": this.dot,
            "badge": info,
            "size": this.parent.iconSize,
            "classPrefix": this.iconPrefix },

          "class": bem('icon') });

      }
    },
    getText: function getText() {
      var h = this.$createElement;
      var textSlot = this.slots('text');

      if (textSlot) {
        return textSlot;
      }

      if (this.text) {
        return h("span", {
          "class": bem('text') },
        [this.text]);
      }
    },
    genContent: function genContent() {
      var slot = this.slots();

      if (slot) {
        return slot;
      }

      return [this.genIcon(), this.getText()];
    } },

  render: function render() {
    var _ref;

    var h = arguments[0];
    var _this$parent3 = this.parent,
    center = _this$parent3.center,
    border = _this$parent3.border,
    square = _this$parent3.square,
    gutter = _this$parent3.gutter,
    direction = _this$parent3.direction,
    clickable = _this$parent3.clickable;
    return h("div", {
      "class": [bem({
        square: square })],

      "style": this.style },
    [h("div", {
      "style": this.contentStyle,
      "attrs": {
        "role": clickable ? 'button' : null,
        "tabindex": clickable ? 0 : null },

      "class": [bem('content', [direction, {
        center: center,
        square: square,
        clickable: clickable,
        surround: border && gutter }]), (
      _ref = {}, _ref[_constant.BORDER] = border, _ref)],
      "on": {
        "click": this.onClick } },

    [this.genContent()])]);
  } });exports.default = _default;

/***/ }),
/* 128 */
/*!******************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/image-preview/index.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/esm/extends */ 15));
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _ImagePreview = _interopRequireDefault(__webpack_require__(/*! ./ImagePreview */ 129));
var _utils = __webpack_require__(/*! ../utils */ 17);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
var instance;
var defaultConfig = {
  loop: true,
  value: true,
  images: [],
  maxZoom: 3,
  minZoom: 1 / 3,
  onClose: null,
  onChange: null,
  className: '',
  showIndex: true,
  closeable: false,
  closeIcon: 'clear',
  asyncClose: false,
  getContainer: 'body',
  startPosition: 0,
  swipeDuration: 300,
  showIndicators: false,
  closeOnPopstate: true,
  closeIconPosition: 'top-right' };


var initInstance = function initInstance() {
  instance = new (_vue.default.extend(_ImagePreview.default))({
    el: document.createElement('div') });

  document.body.appendChild(instance.$el);
  instance.$on('change', function (index) {
    if (instance.onChange) {
      instance.onChange(index);
    }
  });
  instance.$on('scale', function (data) {
    if (instance.onScale) {
      instance.onScale(data);
    }
  });
};

var ImagePreview = function ImagePreview(images, startPosition) {
  if (startPosition === void 0) {
    startPosition = 0;
  }

  /* istanbul ignore if */
  if (_utils.isServer) {
    return;
  }

  if (!instance) {
    initInstance();
  }

  var options = Array.isArray(images) ? {
    images: images,
    startPosition: startPosition } :
  images;

  (0, _extends2.default)(instance, defaultConfig, options);

  instance.$once('input', function (show) {
    instance.value = show;
  });
  instance.$once('closed', function () {
    instance.images = [];
  });

  if (options.onClose) {
    instance.$off('close');
    instance.$once('close', options.onClose);
  }

  return instance;
};

ImagePreview.Component = _ImagePreview.default;

ImagePreview.install = function () {
  _vue.default.use(_ImagePreview.default);
};var _default =

ImagePreview;exports.default = _default;

/***/ }),
/* 129 */
/*!*************************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/image-preview/ImagePreview.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _shared = __webpack_require__(/*! ./shared */ 130);

var _popup = __webpack_require__(/*! ../mixins/popup */ 30);
var _touch = __webpack_require__(/*! ../mixins/touch */ 37);
var _bindEvent = __webpack_require__(/*! ../mixins/bind-event */ 40);

var _icon = _interopRequireDefault(__webpack_require__(/*! ../icon */ 41));
var _swipe = _interopRequireDefault(__webpack_require__(/*! ../swipe */ 131));
var _ImagePreviewItem = _interopRequireDefault(__webpack_require__(/*! ./ImagePreviewItem */ 132));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // Utils
// Mixins
// Components
var _default2 = (0, _shared.createComponent)({ mixins: [_touch.TouchMixin, (0, _popup.PopupMixin)({ skipToggleEvent: true }),
  (0, _bindEvent.BindEventMixin)(function (bind) {
    bind(window, 'resize', this.resize, true);
    bind(window, 'orientationchange', this.resize, true);
  })],
  props: {
    className: null,
    closeable: Boolean,
    asyncClose: Boolean,
    showIndicators: Boolean,
    images: {
      type: Array,
      default: function _default() {
        return [];
      } },

    loop: {
      type: Boolean,
      default: true },

    overlay: {
      type: Boolean,
      default: true },

    minZoom: {
      type: [Number, String],
      default: 1 / 3 },

    maxZoom: {
      type: [Number, String],
      default: 3 },

    showIndex: {
      type: Boolean,
      default: true },

    swipeDuration: {
      type: [Number, String],
      default: 300 },

    startPosition: {
      type: [Number, String],
      default: 0 },

    overlayClass: {
      type: String,
      default: (0, _shared.bem)('overlay') },

    closeIcon: {
      type: String,
      default: 'clear' },

    closeOnPopstate: {
      type: Boolean,
      default: true },

    closeIconPosition: {
      type: String,
      default: 'top-right' } },


  data: function data() {
    return {
      active: 0,
      rootWidth: 0,
      rootHeight: 0,
      doubleClickTimer: null };

  },
  mounted: function mounted() {
    this.resize();
  },
  watch: {
    startPosition: 'setActive',
    value: function value(val) {
      var _this = this;

      if (val) {
        this.setActive(+this.startPosition);
        this.$nextTick(function () {
          _this.resize();

          _this.$refs.swipe.swipeTo(+_this.startPosition, {
            immediate: true });

        });
      } else {
        this.$emit('close', {
          index: this.active,
          url: this.images[this.active] });

      }
    } },

  methods: {
    resize: function resize() {
      if (this.$el && this.$el.getBoundingClientRect) {
        var rect = this.$el.getBoundingClientRect();
        this.rootWidth = rect.width;
        this.rootHeight = rect.height;
      }
    },
    emitClose: function emitClose() {
      if (!this.asyncClose) {
        this.$emit('input', false);
      }
    },
    emitScale: function emitScale(args) {
      this.$emit('scale', args);
    },
    setActive: function setActive(active) {
      if (active !== this.active) {
        this.active = active;
        this.$emit('change', active);
      }
    },
    genIndex: function genIndex() {
      var h = this.$createElement;

      if (this.showIndex) {
        return h("div", {
          "class": (0, _shared.bem)('index') },
        [this.slots('index', {
          index: this.active }) ||
        this.active + 1 + " / " + this.images.length]);
      }
    },
    genCover: function genCover() {
      var h = this.$createElement;
      var cover = this.slots('cover');

      if (cover) {
        return h("div", {
          "class": (0, _shared.bem)('cover') },
        [cover]);
      }
    },
    genImages: function genImages() {
      var _this2 = this;

      var h = this.$createElement;
      return h(_swipe.default, {
        "ref": "swipe",
        "attrs": {
          "lazyRender": true,
          "loop": this.loop,
          "duration": this.swipeDuration,
          "initialSwipe": this.startPosition,
          "showIndicators": this.showIndicators,
          "indicatorColor": "white" },

        "class": (0, _shared.bem)('swipe'),
        "on": {
          "change": this.setActive } },

      [this.images.map(function (image) {
        return h(_ImagePreviewItem.default, {
          "attrs": {
            "src": image,
            "show": _this2.value,
            "active": _this2.active,
            "maxZoom": _this2.maxZoom,
            "minZoom": _this2.minZoom,
            "rootWidth": _this2.rootWidth,
            "rootHeight": _this2.rootHeight },

          "on": {
            "scale": _this2.emitScale,
            "close": _this2.emitClose } });


      })]);
    },
    genClose: function genClose() {
      var h = this.$createElement;

      if (this.closeable) {
        return h(_icon.default, {
          "attrs": {
            "role": "button",
            "name": this.closeIcon },

          "class": (0, _shared.bem)('close-icon', this.closeIconPosition),
          "on": {
            "click": this.emitClose } });


      }
    },
    onClosed: function onClosed() {
      this.$emit('closed');
    },
    // @exposed-api
    swipeTo: function swipeTo(index, options) {
      if (this.$refs.swipe) {
        this.$refs.swipe.swipeTo(index, options);
      }
    } },

  render: function render() {
    var h = arguments[0];

    if (!this.shouldRender) {
      return;
    }

    return h("transition", {
      "attrs": {
        "name": "van-fade" },

      "on": {
        "afterLeave": this.onClosed } },

    [h("div", {
      "directives": [{
        name: "show",
        value: this.value }],

      "class": [(0, _shared.bem)(), this.className] },
    [this.genClose(), this.genImages(), this.genIndex(), this.genCover()])]);
  } });exports.default = _default2;

/***/ }),
/* 130 */
/*!*******************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/image-preview/shared.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.bem = exports.createComponent = void 0;var _utils = __webpack_require__(/*! ../utils */ 17);

var _createNamespace = (0, _utils.createNamespace)('image-preview'),
createComponent = _createNamespace[0],
bem = _createNamespace[1];exports.bem = bem;exports.createComponent = createComponent;

/***/ }),
/* 131 */
/*!**********************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/swipe/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _utils = __webpack_require__(/*! ../utils */ 17);
var _style = __webpack_require__(/*! ../utils/dom/style */ 94);
var _event = __webpack_require__(/*! ../utils/dom/event */ 34);
var _raf = __webpack_require__(/*! ../utils/dom/raf */ 82);
var _number = __webpack_require__(/*! ../utils/format/number */ 53);

var _touch = __webpack_require__(/*! ../mixins/touch */ 37);
var _relation = __webpack_require__(/*! ../mixins/relation */ 67);
var _bindEvent = __webpack_require__(/*! ../mixins/bind-event */ 40); // Utils
// Mixins
var _createNamespace = (0, _utils.createNamespace)('swipe'),
createComponent = _createNamespace[0],
bem = _createNamespace[1];var _default =

createComponent({
  mixins: [_touch.TouchMixin, (0, _relation.ParentMixin)('vanSwipe'), (0, _bindEvent.BindEventMixin)(function (bind, isBind) {
    bind(window, 'resize', this.resize, true);
    bind(window, 'orientationchange', this.resize, true);
    bind(window, 'visibilitychange', this.onVisibilityChange);

    if (isBind) {
      this.initialize();
    } else {
      this.clear();
    }
  })],
  props: {
    width: [Number, String],
    height: [Number, String],
    autoplay: [Number, String],
    vertical: Boolean,
    lazyRender: Boolean,
    indicatorColor: String,
    loop: {
      type: Boolean,
      default: true },

    duration: {
      type: [Number, String],
      default: 500 },

    touchable: {
      type: Boolean,
      default: true },

    initialSwipe: {
      type: [Number, String],
      default: 0 },

    showIndicators: {
      type: Boolean,
      default: true },

    stopPropagation: {
      type: Boolean,
      default: true } },


  data: function data() {
    return {
      rect: null,
      offset: 0,
      active: 0,
      deltaX: 0,
      deltaY: 0,
      swiping: false,
      computedWidth: 0,
      computedHeight: 0 };

  },
  watch: {
    children: function children() {
      this.initialize();
    },
    initialSwipe: function initialSwipe() {
      this.initialize();
    },
    autoplay: function autoplay(_autoplay) {
      if (_autoplay > 0) {
        this.autoPlay();
      } else {
        this.clear();
      }
    } },

  computed: {
    count: function count() {
      return this.children.length;
    },
    maxCount: function maxCount() {
      return Math.ceil(Math.abs(this.minOffset) / this.size);
    },
    delta: function delta() {
      return this.vertical ? this.deltaY : this.deltaX;
    },
    size: function size() {
      return this[this.vertical ? 'computedHeight' : 'computedWidth'];
    },
    trackSize: function trackSize() {
      return this.count * this.size;
    },
    activeIndicator: function activeIndicator() {
      return (this.active + this.count) % this.count;
    },
    isCorrectDirection: function isCorrectDirection() {
      var expect = this.vertical ? 'vertical' : 'horizontal';
      return this.direction === expect;
    },
    trackStyle: function trackStyle() {
      var style = {
        transitionDuration: (this.swiping ? 0 : this.duration) + "ms",
        transform: "translate" + (this.vertical ? 'Y' : 'X') + "(" + this.offset + "px)" };


      if (this.size) {
        var mainAxis = this.vertical ? 'height' : 'width';
        var crossAxis = this.vertical ? 'width' : 'height';
        style[mainAxis] = this.trackSize + "px";
        style[crossAxis] = this[crossAxis] ? this[crossAxis] + "px" : '';
      }

      return style;
    },
    indicatorStyle: function indicatorStyle() {
      return {
        backgroundColor: this.indicatorColor };

    },
    minOffset: function minOffset() {
      return (this.vertical ? this.rect.height : this.rect.width) - this.size * this.count;
    } },

  mounted: function mounted() {
    this.bindTouchEvent(this.$refs.track);
  },
  methods: {
    // initialize swipe position
    initialize: function initialize(active) {
      if (active === void 0) {
        active = +this.initialSwipe;
      }

      if (!this.$el || (0, _style.isHidden)(this.$el)) {
        return;
      }

      clearTimeout(this.timer);
      var rect = this.$el.getBoundingClientRect();
      this.rect = rect;
      this.swiping = true;
      this.active = active;
      this.computedWidth = +this.width || rect.width;
      this.computedHeight = +this.height || rect.height;
      this.offset = this.getTargetOffset(active);
      this.children.forEach(function (swipe) {
        swipe.offset = 0;
      });
      this.autoPlay();
    },
    // @exposed-api
    resize: function resize() {
      this.initialize(this.activeIndicator);
    },
    onVisibilityChange: function onVisibilityChange() {
      if (document.hidden) {
        this.clear();
      } else {
        this.autoPlay();
      }
    },
    onTouchStart: function onTouchStart(event) {
      if (!this.touchable) return;
      this.clear();
      this.touchStartTime = Date.now();
      this.touchStart(event);
      this.correctPosition();
    },
    onTouchMove: function onTouchMove(event) {
      if (!this.touchable || !this.swiping) return;
      this.touchMove(event);

      if (this.isCorrectDirection) {
        (0, _event.preventDefault)(event, this.stopPropagation);
        this.move({
          offset: this.delta });

      }
    },
    onTouchEnd: function onTouchEnd() {
      if (!this.touchable || !this.swiping) return;
      var size = this.size,
      delta = this.delta;
      var duration = Date.now() - this.touchStartTime;
      var speed = delta / duration;
      var shouldSwipe = Math.abs(speed) > 0.25 || Math.abs(delta) > size / 2;

      if (shouldSwipe && this.isCorrectDirection) {
        var offset = this.vertical ? this.offsetY : this.offsetX;
        var pace = 0;

        if (this.loop) {
          pace = offset > 0 ? delta > 0 ? -1 : 1 : 0;
        } else {
          pace = -Math[delta > 0 ? 'ceil' : 'floor'](delta / size);
        }

        this.move({
          pace: pace,
          emitChange: true });

      } else if (delta) {
        this.move({
          pace: 0 });

      }

      this.swiping = false;
      this.autoPlay();
    },
    getTargetActive: function getTargetActive(pace) {
      var active = this.active,
      count = this.count,
      maxCount = this.maxCount;

      if (pace) {
        if (this.loop) {
          return (0, _number.range)(active + pace, -1, count);
        }

        return (0, _number.range)(active + pace, 0, maxCount);
      }

      return active;
    },
    getTargetOffset: function getTargetOffset(targetActive, offset) {
      if (offset === void 0) {
        offset = 0;
      }

      var currentPosition = targetActive * this.size;

      if (!this.loop) {
        currentPosition = Math.min(currentPosition, -this.minOffset);
      }

      var targetOffset = offset - currentPosition;

      if (!this.loop) {
        targetOffset = (0, _number.range)(targetOffset, this.minOffset, 0);
      }

      return targetOffset;
    },
    move: function move(_ref) {
      var _ref$pace = _ref.pace,
      pace = _ref$pace === void 0 ? 0 : _ref$pace,
      _ref$offset = _ref.offset,
      offset = _ref$offset === void 0 ? 0 : _ref$offset,
      emitChange = _ref.emitChange;
      var loop = this.loop,
      count = this.count,
      active = this.active,
      children = this.children,
      trackSize = this.trackSize,
      minOffset = this.minOffset;

      if (count <= 1) {
        return;
      }

      var targetActive = this.getTargetActive(pace);
      var targetOffset = this.getTargetOffset(targetActive, offset); // auto move first and last swipe in loop mode

      if (loop) {
        if (children[0] && targetOffset !== minOffset) {
          var outRightBound = targetOffset < minOffset;
          children[0].offset = outRightBound ? trackSize : 0;
        }

        if (children[count - 1] && targetOffset !== 0) {
          var outLeftBound = targetOffset > 0;
          children[count - 1].offset = outLeftBound ? -trackSize : 0;
        }
      }

      this.active = targetActive;
      this.offset = targetOffset;

      if (emitChange && targetActive !== active) {
        this.$emit('change', this.activeIndicator);
      }
    },
    // @exposed-api
    prev: function prev() {
      var _this = this;

      this.correctPosition();
      this.resetTouchStatus();
      (0, _raf.doubleRaf)(function () {
        _this.swiping = false;

        _this.move({
          pace: -1,
          emitChange: true });

      });
    },
    // @exposed-api
    next: function next() {
      var _this2 = this;

      this.correctPosition();
      this.resetTouchStatus();
      (0, _raf.doubleRaf)(function () {
        _this2.swiping = false;

        _this2.move({
          pace: 1,
          emitChange: true });

      });
    },
    // @exposed-api
    swipeTo: function swipeTo(index, options) {
      var _this3 = this;

      if (options === void 0) {
        options = {};
      }

      this.correctPosition();
      this.resetTouchStatus();
      (0, _raf.doubleRaf)(function () {
        var targetIndex;

        if (_this3.loop && index === _this3.count) {
          targetIndex = _this3.active === 0 ? 0 : index;
        } else {
          targetIndex = index % _this3.count;
        }

        if (options.immediate) {
          (0, _raf.doubleRaf)(function () {
            _this3.swiping = false;
          });
        } else {
          _this3.swiping = false;
        }

        _this3.move({
          pace: targetIndex - _this3.active,
          emitChange: true });

      });
    },
    correctPosition: function correctPosition() {
      this.swiping = true;

      if (this.active <= -1) {
        this.move({
          pace: this.count });

      }

      if (this.active >= this.count) {
        this.move({
          pace: -this.count });

      }
    },
    clear: function clear() {
      clearTimeout(this.timer);
    },
    autoPlay: function autoPlay() {
      var _this4 = this;

      var autoplay = this.autoplay;

      if (autoplay > 0 && this.count > 1) {
        this.clear();
        this.timer = setTimeout(function () {
          _this4.next();

          _this4.autoPlay();
        }, autoplay);
      }
    },
    genIndicator: function genIndicator() {
      var _this5 = this;

      var h = this.$createElement;
      var count = this.count,
      activeIndicator = this.activeIndicator;
      var slot = this.slots('indicator');

      if (slot) {
        return slot;
      }

      if (this.showIndicators && count > 1) {
        return h("div", {
          "class": bem('indicators', {
            vertical: this.vertical }) },

        [Array.apply(void 0, Array(count)).map(function (empty, index) {
          return h("i", {
            "class": bem('indicator', {
              active: index === activeIndicator }),

            "style": index === activeIndicator ? _this5.indicatorStyle : null });

        })]);
      }
    } },

  render: function render() {
    var h = arguments[0];
    return h("div", {
      "class": bem() },
    [h("div", {
      "ref": "track",
      "style": this.trackStyle,
      "class": bem('track', {
        vertical: this.vertical }) },

    [this.slots()]), this.genIndicator()]);
  } });exports.default = _default;

/***/ }),
/* 132 */
/*!*****************************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/image-preview/ImagePreviewItem.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _shared = __webpack_require__(/*! ./shared */ 130);
var _number = __webpack_require__(/*! ../utils/format/number */ 53);
var _event = __webpack_require__(/*! ../utils/dom/event */ 34);

var _touch = __webpack_require__(/*! ../mixins/touch */ 37);

var _image = _interopRequireDefault(__webpack_require__(/*! ../image */ 89));
var _loading = _interopRequireDefault(__webpack_require__(/*! ../loading */ 44));
var _swipeItem = _interopRequireDefault(__webpack_require__(/*! ../swipe-item */ 133));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // Utils
// Mixins
// Component
function getDistance(touches) {return Math.sqrt(Math.pow(touches[0].clientX - touches[1].clientX, 2) + Math.pow(touches[0].clientY - touches[1].clientY, 2));
}var _default =

{
  mixins: [_touch.TouchMixin],
  props: {
    src: String,
    show: Boolean,
    active: Number,
    minZoom: [Number, String],
    maxZoom: [Number, String],
    rootWidth: Number,
    rootHeight: Number },

  data: function data() {
    return {
      scale: 1,
      moveX: 0,
      moveY: 0,
      moving: false,
      zooming: false,
      imageRatio: 0,
      displayWidth: 0,
      displayHeight: 0 };

  },
  computed: {
    vertical: function vertical() {
      var rootWidth = this.rootWidth,
      rootHeight = this.rootHeight;
      var rootRatio = rootHeight / rootWidth;
      return this.imageRatio > rootRatio;
    },
    imageStyle: function imageStyle() {
      var scale = this.scale;
      var style = {
        transitionDuration: this.zooming || this.moving ? '0s' : '.3s' };


      if (scale !== 1) {
        var offsetX = this.moveX / scale;
        var offsetY = this.moveY / scale;
        style.transform = "scale(" + scale + ", " + scale + ") translate(" + offsetX + "px, " + offsetY + "px)";
      }

      return style;
    },
    maxMoveX: function maxMoveX() {
      if (this.imageRatio) {
        var displayWidth = this.vertical ? this.rootHeight / this.imageRatio : this.rootWidth;
        return Math.max(0, (this.scale * displayWidth - this.rootWidth) / 2);
      }

      return 0;
    },
    maxMoveY: function maxMoveY() {
      if (this.imageRatio) {
        var displayHeight = this.vertical ? this.rootHeight : this.rootWidth * this.imageRatio;
        return Math.max(0, (this.scale * displayHeight - this.rootHeight) / 2);
      }

      return 0;
    } },

  watch: {
    active: 'resetScale',
    show: function show(val) {
      if (!val) {
        this.resetScale();
      }
    } },

  mounted: function mounted() {
    this.bindTouchEvent(this.$el);
  },
  methods: {
    resetScale: function resetScale() {
      this.setScale(1);
      this.moveX = 0;
      this.moveY = 0;
    },
    setScale: function setScale(scale) {
      scale = (0, _number.range)(scale, +this.minZoom, +this.maxZoom);

      if (scale !== this.scale) {
        this.scale = scale;
        this.$emit('scale', {
          scale: this.scale,
          index: this.active });

      }
    },
    toggleScale: function toggleScale() {
      var scale = this.scale > 1 ? 1 : 2;
      this.setScale(scale);
      this.moveX = 0;
      this.moveY = 0;
    },
    onTouchStart: function onTouchStart(event) {
      var touches = event.touches;
      var _this$offsetX = this.offsetX,
      offsetX = _this$offsetX === void 0 ? 0 : _this$offsetX;
      this.touchStart(event);
      this.touchStartTime = new Date();
      this.startMoveX = this.moveX;
      this.startMoveY = this.moveY;
      this.moving = touches.length === 1 && this.scale !== 1;
      this.zooming = touches.length === 2 && !offsetX;

      if (this.zooming) {
        this.startScale = this.scale;
        this.startDistance = getDistance(event.touches);
      }
    },
    onTouchMove: function onTouchMove(event) {
      var touches = event.touches;
      this.touchMove(event);

      if (this.moving || this.zooming) {
        (0, _event.preventDefault)(event, true);
      }

      if (this.moving) {
        var moveX = this.deltaX + this.startMoveX;
        var moveY = this.deltaY + this.startMoveY;
        this.moveX = (0, _number.range)(moveX, -this.maxMoveX, this.maxMoveX);
        this.moveY = (0, _number.range)(moveY, -this.maxMoveY, this.maxMoveY);
      }

      if (this.zooming && touches.length === 2) {
        var distance = getDistance(touches);
        var scale = this.startScale * distance / this.startDistance;
        this.setScale(scale);
      }
    },
    onTouchEnd: function onTouchEnd(event) {
      var stopPropagation = false;
      /* istanbul ignore else */

      if (this.moving || this.zooming) {
        stopPropagation = true;

        if (this.moving && this.startMoveX === this.moveX && this.startMoveY === this.moveY) {
          stopPropagation = false;
        }

        if (!event.touches.length) {
          if (this.zooming) {
            this.moveX = (0, _number.range)(this.moveX, -this.maxMoveX, this.maxMoveX);
            this.moveY = (0, _number.range)(this.moveY, -this.maxMoveY, this.maxMoveY);
            this.zooming = false;
          }

          this.moving = false;
          this.startMoveX = 0;
          this.startMoveY = 0;
          this.startScale = 1;

          if (this.scale < 1) {
            this.resetScale();
          }
        }
      } // eliminate tap delay on safari


      (0, _event.preventDefault)(event, stopPropagation);
      this.checkTap();
      this.resetTouchStatus();
    },
    checkTap: function checkTap() {
      var _this = this;

      var _this$offsetX2 = this.offsetX,
      offsetX = _this$offsetX2 === void 0 ? 0 : _this$offsetX2,
      _this$offsetY = this.offsetY,
      offsetY = _this$offsetY === void 0 ? 0 : _this$offsetY;
      var deltaTime = new Date() - this.touchStartTime;
      var TAP_TIME = 250;
      var TAP_OFFSET = 10;

      if (offsetX < TAP_OFFSET && offsetY < TAP_OFFSET && deltaTime < TAP_TIME) {
        if (this.doubleTapTimer) {
          clearTimeout(this.doubleTapTimer);
          this.doubleTapTimer = null;
          this.toggleScale();
        } else {
          this.doubleTapTimer = setTimeout(function () {
            _this.$emit('close');

            _this.doubleTapTimer = null;
          }, TAP_TIME);
        }
      }
    },
    onLoad: function onLoad(event) {
      var _event$target = event.target,
      naturalWidth = _event$target.naturalWidth,
      naturalHeight = _event$target.naturalHeight;
      this.imageRatio = naturalHeight / naturalWidth;
    } },

  render: function render() {
    var h = arguments[0];
    var imageSlots = {
      loading: function loading() {
        return h(_loading.default, {
          "attrs": {
            "type": "spinner" } });


      } };

    return h(_swipeItem.default, {
      "class": (0, _shared.bem)('swipe-item') },
    [h(_image.default, {
      "attrs": {
        "src": this.src,
        "fit": "contain" },

      "class": (0, _shared.bem)('image', {
        vertical: this.vertical }),

      "style": this.imageStyle,
      "scopedSlots": imageSlots,
      "on": {
        "load": this.onLoad } })]);


  } };exports.default = _default;

/***/ }),
/* 133 */
/*!***************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/swipe-item/index.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/esm/extends */ 15));
var _utils = __webpack_require__(/*! ../utils */ 17);
var _relation = __webpack_require__(/*! ../mixins/relation */ 67);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var _createNamespace = (0, _utils.createNamespace)('swipe-item'),
createComponent = _createNamespace[0],
bem = _createNamespace[1];var _default =

createComponent({
  mixins: [(0, _relation.ChildrenMixin)('vanSwipe')],
  data: function data() {
    return {
      offset: 0,
      inited: false,
      mounted: false };

  },
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      _this.mounted = true;
    });
  },
  computed: {
    style: function style() {
      var style = {};
      var _this$parent = this.parent,
      size = _this$parent.size,
      vertical = _this$parent.vertical;

      if (size) {
        style[vertical ? 'height' : 'width'] = size + "px";
      }

      if (this.offset) {
        style.transform = "translate" + (vertical ? 'Y' : 'X') + "(" + this.offset + "px)";
      }

      return style;
    },
    shouldRender: function shouldRender() {
      var index = this.index,
      inited = this.inited,
      parent = this.parent,
      mounted = this.mounted;

      if (!parent.lazyRender || inited) {
        return true;
      } // wait for all item to mount, so we can get the exact count


      if (!mounted) {
        return false;
      }

      var active = parent.activeIndicator;
      var maxActive = parent.count - 1;
      var prevActive = active === 0 && parent.loop ? maxActive : active - 1;
      var nextActive = active === maxActive && parent.loop ? 0 : active + 1;
      var shouldRender = index === active || index === prevActive || index === nextActive;

      if (shouldRender) {
        this.inited = true;
      }

      return shouldRender;
    } },

  render: function render() {
    var h = arguments[0];
    return h("div", {
      "class": bem(),
      "style": this.style,
      "on": (0, _extends2.default)({}, this.$listeners) },
    [this.shouldRender && this.slots()]);
  } });exports.default = _default;

/***/ }),
/* 134 */
/*!*****************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/index-anchor/index.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _utils = __webpack_require__(/*! ../utils */ 17);
var _relation = __webpack_require__(/*! ../mixins/relation */ 67);
var _constant = __webpack_require__(/*! ../utils/constant */ 50);
var _scroll = __webpack_require__(/*! ../utils/dom/scroll */ 36);

var _createNamespace = (0, _utils.createNamespace)('index-anchor'),
createComponent = _createNamespace[0],
bem = _createNamespace[1];var _default =

createComponent({
  mixins: [(0, _relation.ChildrenMixin)('vanIndexBar', {
    indexKey: 'childrenIndex' })],

  props: {
    index: [Number, String] },

  data: function data() {
    return {
      top: 0,
      left: null,
      rect: {
        top: 0,
        height: 0 },

      width: null,
      active: false };

  },
  computed: {
    sticky: function sticky() {
      return this.active && this.parent.sticky;
    },
    anchorStyle: function anchorStyle() {
      if (this.sticky) {
        return {
          zIndex: "" + this.parent.zIndex,
          left: this.left ? this.left + "px" : null,
          width: this.width ? this.width + "px" : null,
          transform: "translate3d(0, " + this.top + "px, 0)",
          color: this.parent.highlightColor };

      }
    } },

  mounted: function mounted() {
    var rect = this.$el.getBoundingClientRect();
    this.rect.height = rect.height;
  },
  methods: {
    scrollIntoView: function scrollIntoView() {
      this.$el.scrollIntoView();
    },
    getRect: function getRect(scroller, scrollerRect) {
      var el = this.$el;
      var elRect = el.getBoundingClientRect();
      this.rect.height = elRect.height;

      if (scroller === window || scroller === document.body) {
        this.rect.top = elRect.top + (0, _scroll.getRootScrollTop)();
      } else {
        this.rect.top = elRect.top + (0, _scroll.getScrollTop)(scroller) - scrollerRect.top;
      }

      return this.rect;
    } },

  render: function render() {
    var _ref;

    var h = arguments[0];
    var sticky = this.sticky;
    return h("div", {
      "style": {
        height: sticky ? this.rect.height + "px" : null } },

    [h("div", {
      "style": this.anchorStyle,
      "class": [bem({
        sticky: sticky }), (
      _ref = {}, _ref[_constant.BORDER_BOTTOM] = sticky, _ref)] },
    [this.slots('default') || this.index])]);
  } });exports.default = _default;

/***/ }),
/* 135 */
/*!**************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/index-bar/index.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _utils = __webpack_require__(/*! ../utils */ 17);
var _style = __webpack_require__(/*! ../utils/dom/style */ 94);
var _event = __webpack_require__(/*! ../utils/dom/event */ 34);
var _scroll = __webpack_require__(/*! ../utils/dom/scroll */ 36);

var _touch = __webpack_require__(/*! ../mixins/touch */ 37);
var _relation = __webpack_require__(/*! ../mixins/relation */ 67);
var _bindEvent = __webpack_require__(/*! ../mixins/bind-event */ 40); // Utils
// Mixins
function genAlphabet() {
  var indexList = [];
  var charCodeOfA = 'A'.charCodeAt(0);

  for (var i = 0; i < 26; i++) {
    indexList.push(String.fromCharCode(charCodeOfA + i));
  }

  return indexList;
}

var _createNamespace = (0, _utils.createNamespace)('index-bar'),
createComponent = _createNamespace[0],
bem = _createNamespace[1];var _default =

createComponent({
  mixins: [_touch.TouchMixin, (0, _relation.ParentMixin)('vanIndexBar'), (0, _bindEvent.BindEventMixin)(function (bind) {
    if (!this.scroller) {
      this.scroller = (0, _scroll.getScroller)(this.$el);
    }

    bind(this.scroller, 'scroll', this.onScroll);
  })],
  props: {
    zIndex: [Number, String],
    highlightColor: String,
    sticky: {
      type: Boolean,
      default: true },

    stickyOffsetTop: {
      type: Number,
      default: 0 },

    indexList: {
      type: Array,
      default: genAlphabet } },


  data: function data() {
    return {
      activeAnchorIndex: null };

  },
  computed: {
    sidebarStyle: function sidebarStyle() {
      if ((0, _utils.isDef)(this.zIndex)) {
        return {
          zIndex: this.zIndex + 1 };

      }
    },
    highlightStyle: function highlightStyle() {
      var highlightColor = this.highlightColor;

      if (highlightColor) {
        return {
          color: highlightColor };

      }
    } },

  watch: {
    indexList: function indexList() {
      this.$nextTick(this.onScroll);
    },
    activeAnchorIndex: function activeAnchorIndex(value) {
      if (value) {
        this.$emit('change', value);
      }
    } },

  methods: {
    onScroll: function onScroll() {
      var _this = this;

      if ((0, _style.isHidden)(this.$el)) {
        return;
      }

      var scrollTop = (0, _scroll.getScrollTop)(this.scroller);
      var scrollerRect = this.getScrollerRect();
      var rects = this.children.map(function (item) {
        return item.getRect(_this.scroller, scrollerRect);
      });
      var active = this.getActiveAnchorIndex(scrollTop, rects);
      this.activeAnchorIndex = this.indexList[active];

      if (this.sticky) {
        this.children.forEach(function (item, index) {
          if (index === active || index === active - 1) {
            var rect = item.$el.getBoundingClientRect();
            item.left = rect.left;
            item.width = rect.width;
          } else {
            item.left = null;
            item.width = null;
          }

          if (index === active) {
            item.active = true;
            item.top = Math.max(_this.stickyOffsetTop, rects[index].top - scrollTop) + scrollerRect.top;
          } else if (index === active - 1) {
            var activeItemTop = rects[active].top - scrollTop;
            item.active = activeItemTop > 0;
            item.top = activeItemTop + scrollerRect.top - rects[index].height;
          } else {
            item.active = false;
          }
        });
      }
    },
    getScrollerRect: function getScrollerRect() {
      if (this.scroller.getBoundingClientRect) {
        return this.scroller.getBoundingClientRect();
      }

      return {
        top: 0,
        left: 0 };

    },
    getActiveAnchorIndex: function getActiveAnchorIndex(scrollTop, rects) {
      for (var i = this.children.length - 1; i >= 0; i--) {
        var prevHeight = i > 0 ? rects[i - 1].height : 0;
        var reachTop = this.sticky ? prevHeight + this.stickyOffsetTop : 0;

        if (scrollTop + reachTop >= rects[i].top) {
          return i;
        }
      }

      return -1;
    },
    onClick: function onClick(event) {
      this.scrollToElement(event.target);
    },
    onTouchMove: function onTouchMove(event) {
      this.touchMove(event);

      if (this.direction === 'vertical') {
        (0, _event.preventDefault)(event);
        var _event$touches$ = event.touches[0],
        clientX = _event$touches$.clientX,
        clientY = _event$touches$.clientY;
        var target = document.elementFromPoint(clientX, clientY);

        if (target) {
          var index = target.dataset.index;
          /* istanbul ignore else */

          if (this.touchActiveIndex !== index) {
            this.touchActiveIndex = index;
            this.scrollToElement(target);
          }
        }
      }
    },
    scrollTo: function scrollTo(index) {
      var match = this.children.filter(function (item) {
        return String(item.index) === index;
      });

      if (match[0]) {
        match[0].scrollIntoView();

        if (this.sticky && this.stickyOffsetTop) {
          (0, _scroll.setRootScrollTop)((0, _scroll.getRootScrollTop)() - this.stickyOffsetTop);
        }

        this.$emit('select', match[0].index);
      }
    },
    scrollToElement: function scrollToElement(element) {
      var index = element.dataset.index;
      this.scrollTo(index);
    },
    onTouchEnd: function onTouchEnd() {
      this.active = null;
    } },

  render: function render() {
    var _this2 = this;

    var h = arguments[0];
    var Indexes = this.indexList.map(function (index) {
      var active = index === _this2.activeAnchorIndex;
      return h("span", {
        "class": bem('index', {
          active: active }),

        "style": active ? _this2.highlightStyle : null,
        "attrs": {
          "data-index": index } },

      [index]);
    });
    return h("div", {
      "class": bem() },
    [h("div", {
      "class": bem('sidebar'),
      "style": this.sidebarStyle,
      "on": {
        "click": this.onClick,
        "touchstart": this.touchStart,
        "touchmove": this.onTouchMove,
        "touchend": this.onTouchEnd,
        "touchcancel": this.onTouchEnd } },

    [Indexes]), this.slots('default')]);
  } });exports.default = _default;

/***/ }),
/* 136 */
/*!*************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/lazyload/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vueLazyload = _interopRequireDefault(__webpack_require__(/*! vue-lazyload */ 137));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =
_vueLazyload.default;exports.default = _default;

/***/ }),
/* 137 */
/*!****************************************************************!*\
  !*** E:/chats/chats/node_modules/vue-lazyload/vue-lazyload.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * Vue-Lazyload.js v1.2.3
 * (c) 2018 Awe <hilongjw@gmail.com>
 * Released under the MIT License.
 */
!function (e, t) { true ? module.exports = t() : undefined;}(this, function () {"use strict";function e(e) {return e.constructor && "function" == typeof e.constructor.isBuffer && e.constructor.isBuffer(e);}function t(e) {e = e || {};var t = arguments.length,i = 0;if (1 === t) return e;for (; ++i < t;) {var o = arguments[i];g(e) && (e = o), r(o) && n(e, o);}return e;}function n(e, n) {m(e, n);for (var o in n) {if ("__proto__" !== o && i(n, o)) {var a = n[o];r(a) ? ("undefined" === L(e[o]) && "function" === L(a) && (e[o] = a), e[o] = t(e[o] || {}, a)) : e[o] = a;}}return e;}function r(e) {return "object" === L(e) || "function" === L(e);}function i(e, t) {return Object.prototype.hasOwnProperty.call(e, t);}function o(e, t) {if (e.length) {var n = e.indexOf(t);return n > -1 ? e.splice(n, 1) : void 0;}}function a(e, t) {for (var n = !1, r = 0, i = e.length; r < i; r++) {if (t(e[r])) {n = !0;break;}}return n;}function s(e, t) {if ("IMG" === e.tagName && e.getAttribute("data-srcset")) {var n = e.getAttribute("data-srcset"),r = [],i = e.parentNode,o = i.offsetWidth * t,a = void 0,s = void 0,u = void 0;n = n.trim().split(","), n.map(function (e) {e = e.trim(), a = e.lastIndexOf(" "), -1 === a ? (s = e, u = 999998) : (s = e.substr(0, a), u = parseInt(e.substr(a + 1, e.length - a - 2), 10)), r.push([u, s]);}), r.sort(function (e, t) {if (e[0] < t[0]) return -1;if (e[0] > t[0]) return 1;if (e[0] === t[0]) {if (-1 !== t[1].indexOf(".webp", t[1].length - 5)) return 1;if (-1 !== e[1].indexOf(".webp", e[1].length - 5)) return -1;}return 0;});for (var l = "", d = void 0, c = r.length, h = 0; h < c; h++) {if (d = r[h], d[0] >= o) {l = d[1];break;}}return l;}}function u(e, t) {for (var n = void 0, r = 0, i = e.length; r < i; r++) {if (t(e[r])) {n = e[r];break;}}return n;}function l() {if (!k) return !1;var e = !0,t = document;try {var n = t.createElement("object");n.type = "image/webp", n.style.visibility = "hidden", n.innerHTML = "!", t.body.appendChild(n), e = !n.offsetWidth, t.body.removeChild(n);} catch (t) {e = !1;}return e;}function d(e, t) {var n = null,r = 0;return function () {if (!n) {var i = Date.now() - r,o = this,a = arguments,s = function s() {r = Date.now(), n = !1, e.apply(o, a);};i >= t ? s() : n = setTimeout(s, t);}};}function c(e) {return null !== e && "object" === (void 0 === e ? "undefined" : p(e));}function h(e) {if (!(e instanceof Object)) return [];if (Object.keys) return Object.keys(e);var t = [];for (var n in e) {e.hasOwnProperty(n) && t.push(n);}return t;}function f(e) {for (var t = e.length, n = [], r = 0; r < t; r++) {n.push(e[r]);}return n;}function v() {}var p = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {return typeof e;} : function (e) {return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;},b = function b(e, t) {if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");},y = function () {function e(e, t) {for (var n = 0; n < t.length; n++) {var r = t[n];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);}}return function (t, n, r) {return n && e(t.prototype, n), r && e(t, r), t;};}(),g = function g(e) {return null == e || "function" != typeof e && "object" !== (void 0 === e ? "undefined" : p(e));},m = function m(e, t) {if (null === e || void 0 === e) throw new TypeError("expected first argument to be an object.");if (void 0 === t || "undefined" == typeof Symbol) return e;if ("function" != typeof Object.getOwnPropertySymbols) return e;for (var n = Object.prototype.propertyIsEnumerable, r = Object(e), i = arguments.length, o = 0; ++o < i;) {for (var a = Object(arguments[o]), s = Object.getOwnPropertySymbols(a), u = 0; u < s.length; u++) {var l = s[u];n.call(a, l) && (r[l] = a[l]);}}return r;},w = Object.prototype.toString,L = function L(t) {var n = void 0 === t ? "undefined" : p(t);return "undefined" === n ? "undefined" : null === t ? "null" : !0 === t || !1 === t || t instanceof Boolean ? "boolean" : "string" === n || t instanceof String ? "string" : "number" === n || t instanceof Number ? "number" : "function" === n || t instanceof Function ? void 0 !== t.constructor.name && "Generator" === t.constructor.name.slice(0, 9) ? "generatorfunction" : "function" : void 0 !== Array.isArray && Array.isArray(t) ? "array" : t instanceof RegExp ? "regexp" : t instanceof Date ? "date" : (n = w.call(t), "[object RegExp]" === n ? "regexp" : "[object Date]" === n ? "date" : "[object Arguments]" === n ? "arguments" : "[object Error]" === n ? "error" : "[object Promise]" === n ? "promise" : e(t) ? "buffer" : "[object Set]" === n ? "set" : "[object WeakSet]" === n ? "weakset" : "[object Map]" === n ? "map" : "[object WeakMap]" === n ? "weakmap" : "[object Symbol]" === n ? "symbol" : "[object Map Iterator]" === n ? "mapiterator" : "[object Set Iterator]" === n ? "setiterator" : "[object String Iterator]" === n ? "stringiterator" : "[object Array Iterator]" === n ? "arrayiterator" : "[object Int8Array]" === n ? "int8array" : "[object Uint8Array]" === n ? "uint8array" : "[object Uint8ClampedArray]" === n ? "uint8clampedarray" : "[object Int16Array]" === n ? "int16array" : "[object Uint16Array]" === n ? "uint16array" : "[object Int32Array]" === n ? "int32array" : "[object Uint32Array]" === n ? "uint32array" : "[object Float32Array]" === n ? "float32array" : "[object Float64Array]" === n ? "float64array" : "object");},_ = t,k = "undefined" != typeof window,E = k && "IntersectionObserver" in window,A = { event: "event", observer: "observer" },j = function () {function e(e, t) {t = t || { bubbles: !1, cancelable: !1, detail: void 0 };var n = document.createEvent("CustomEvent");return n.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), n;}if (k) return "function" == typeof window.CustomEvent ? window.CustomEvent : (e.prototype = window.Event.prototype, e);}(),z = function z() {var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;return k ? window.devicePixelRatio || e : e;},T = function () {if (k) {var e = !1;try {var t = Object.defineProperty({}, "passive", { get: function get() {e = !0;} });window.addEventListener("test", null, t);} catch (e) {}return e;}}(),O = { on: function on(e, t, n) {var r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];T ? e.addEventListener(t, n, { capture: r, passive: !0 }) : e.addEventListener(t, n, r);}, off: function off(e, t, n) {var r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];e.removeEventListener(t, n, r);} },I = function I(e, t, n) {var r = new Image();r.src = e.src, r.onload = function () {t({ naturalHeight: r.naturalHeight, naturalWidth: r.naturalWidth, src: r.src });}, r.onerror = function (e) {n(e);};},x = function x(e, t) {return "undefined" != typeof getComputedStyle ? getComputedStyle(e, null).getPropertyValue(t) : e.style[t];},S = function S(e) {return x(e, "overflow") + x(e, "overflow-y") + x(e, "overflow-x");},$ = function $(e) {if (k) {if (!(e instanceof HTMLElement)) return window;for (var t = e; t && t !== document.body && t !== document.documentElement && t.parentNode;) {if (/(scroll|auto)/.test(S(t))) return t;t = t.parentNode;}return window;}},H = {},Q = function () {function e(t) {var n = t.el,r = t.src,i = t.error,o = t.loading,a = t.bindType,s = t.$parent,u = t.options,l = t.elRenderer;b(this, e), this.el = n, this.src = r, this.error = i, this.loading = o, this.bindType = a, this.attempt = 0, this.naturalHeight = 0, this.naturalWidth = 0, this.options = u, this.rect = null, this.$parent = s, this.elRenderer = l, this.performanceData = { init: Date.now(), loadStart: 0, loadEnd: 0 }, this.filter(), this.initState(), this.render("loading", !1);}return y(e, [{ key: "initState", value: function value() {this.el.dataset.src = this.src, this.state = { error: !1, loaded: !1, rendered: !1 };} }, { key: "record", value: function value(e) {this.performanceData[e] = Date.now();} }, { key: "update", value: function value(e) {var t = e.src,n = e.loading,r = e.error,i = this.src;this.src = t, this.loading = n, this.error = r, this.filter(), i !== this.src && (this.attempt = 0, this.initState());} }, { key: "getRect", value: function value() {this.rect = this.el.getBoundingClientRect();} }, { key: "checkInView", value: function value() {return this.getRect(), this.rect.top < window.innerHeight * this.options.preLoad && this.rect.bottom > this.options.preLoadTop && this.rect.left < window.innerWidth * this.options.preLoad && this.rect.right > 0;} }, { key: "filter", value: function value() {var e = this;h(this.options.filter).map(function (t) {e.options.filter[t](e, e.options);});} }, { key: "renderLoading", value: function value(e) {var t = this;I({ src: this.loading }, function (n) {t.render("loading", !1), e();}, function () {e(), t.options.silent || console.warn("VueLazyload log: load failed with loading image(" + t.loading + ")");});} }, { key: "load", value: function value() {var e = this,t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : v;return this.attempt > this.options.attempt - 1 && this.state.error ? (this.options.silent || console.log("VueLazyload log: " + this.src + " tried too more than " + this.options.attempt + " times"), void t()) : this.state.loaded || H[this.src] ? (this.state.loaded = !0, t(), this.render("loaded", !0)) : void this.renderLoading(function () {e.attempt++, e.record("loadStart"), I({ src: e.src }, function (n) {e.naturalHeight = n.naturalHeight, e.naturalWidth = n.naturalWidth, e.state.loaded = !0, e.state.error = !1, e.record("loadEnd"), e.render("loaded", !1), H[e.src] = 1, t();}, function (t) {!e.options.silent && console.error(t), e.state.error = !0, e.state.loaded = !1, e.render("error", !1);});});} }, { key: "render", value: function value(e, t) {this.elRenderer(this, e, t);} }, { key: "performance", value: function value() {var e = "loading",t = 0;return this.state.loaded && (e = "loaded", t = (this.performanceData.loadEnd - this.performanceData.loadStart) / 1e3), this.state.error && (e = "error"), { src: this.src, state: e, time: t };} }, { key: "destroy", value: function value() {this.el = null, this.src = null, this.error = null, this.loading = null, this.bindType = null, this.attempt = 0;} }]), e;}(),C = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",R = ["scroll", "wheel", "mousewheel", "resize", "animationend", "transitionend", "touchmove"],W = { rootMargin: "0px", threshold: 0 },D = function D(e) {return function () {function t(e) {var n = e.preLoad,r = e.error,i = e.throttleWait,o = e.preLoadTop,a = e.dispatchEvent,s = e.loading,u = e.attempt,c = e.silent,h = void 0 === c || c,f = e.scale,v = e.listenEvents,p = (e.hasbind, e.filter),y = e.adapter,g = e.observer,m = e.observerOptions;b(this, t), this.version = "1.2.3", this.mode = A.event, this.ListenerQueue = [], this.TargetIndex = 0, this.TargetQueue = [], this.options = { silent: h, dispatchEvent: !!a, throttleWait: i || 200, preLoad: n || 1.3, preLoadTop: o || 0, error: r || C, loading: s || C, attempt: u || 3, scale: f || z(f), ListenEvents: v || R, hasbind: !1, supportWebp: l(), filter: p || {}, adapter: y || {}, observer: !!g, observerOptions: m || W }, this._initEvent(), this.lazyLoadHandler = d(this._lazyLoadHandler.bind(this), this.options.throttleWait), this.setMode(this.options.observer ? A.observer : A.event);}return y(t, [{ key: "config", value: function value() {var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};_(this.options, e);} }, { key: "performance", value: function value() {var e = [];return this.ListenerQueue.map(function (t) {e.push(t.performance());}), e;} }, { key: "addLazyBox", value: function value(e) {this.ListenerQueue.push(e), k && (this._addListenerTarget(window), this._observer && this._observer.observe(e.el), e.$el && e.$el.parentNode && this._addListenerTarget(e.$el.parentNode));} }, { key: "add", value: function value(t, n, r) {var i = this;if (a(this.ListenerQueue, function (e) {return e.el === t;})) return this.update(t, n), e.nextTick(this.lazyLoadHandler);var o = this._valueFormatter(n.value),u = o.src,l = o.loading,d = o.error;e.nextTick(function () {u = s(t, i.options.scale) || u, i._observer && i._observer.observe(t);var o = Object.keys(n.modifiers)[0],a = void 0;o && (a = r.context.$refs[o], a = a ? a.$el || a : document.getElementById(o)), a || (a = $(t));var c = new Q({ bindType: n.arg, $parent: a, el: t, loading: l, error: d, src: u, elRenderer: i._elRenderer.bind(i), options: i.options });i.ListenerQueue.push(c), k && (i._addListenerTarget(window), i._addListenerTarget(a)), i.lazyLoadHandler(), e.nextTick(function () {return i.lazyLoadHandler();});});} }, { key: "update", value: function value(t, n) {var r = this,i = this._valueFormatter(n.value),o = i.src,a = i.loading,l = i.error;o = s(t, this.options.scale) || o;var d = u(this.ListenerQueue, function (e) {return e.el === t;});d && d.update({ src: o, loading: a, error: l }), this._observer && (this._observer.unobserve(t), this._observer.observe(t)), this.lazyLoadHandler(), e.nextTick(function () {return r.lazyLoadHandler();});} }, { key: "remove", value: function value(e) {if (e) {this._observer && this._observer.unobserve(e);var t = u(this.ListenerQueue, function (t) {return t.el === e;});t && (this._removeListenerTarget(t.$parent), this._removeListenerTarget(window), o(this.ListenerQueue, t) && t.destroy());}} }, { key: "removeComponent", value: function value(e) {e && (o(this.ListenerQueue, e), this._observer && this._observer.unobserve(e.el), e.$parent && e.$el.parentNode && this._removeListenerTarget(e.$el.parentNode), this._removeListenerTarget(window));} }, { key: "setMode", value: function value(e) {var t = this;E || e !== A.observer || (e = A.event), this.mode = e, e === A.event ? (this._observer && (this.ListenerQueue.forEach(function (e) {t._observer.unobserve(e.el);}), this._observer = null), this.TargetQueue.forEach(function (e) {t._initListen(e.el, !0);})) : (this.TargetQueue.forEach(function (e) {t._initListen(e.el, !1);}), this._initIntersectionObserver());} }, { key: "_addListenerTarget", value: function value(e) {if (e) {var t = u(this.TargetQueue, function (t) {return t.el === e;});return t ? t.childrenCount++ : (t = { el: e, id: ++this.TargetIndex, childrenCount: 1, listened: !0 }, this.mode === A.event && this._initListen(t.el, !0), this.TargetQueue.push(t)), this.TargetIndex;}} }, { key: "_removeListenerTarget", value: function value(e) {var t = this;this.TargetQueue.forEach(function (n, r) {n.el === e && (--n.childrenCount || (t._initListen(n.el, !1), t.TargetQueue.splice(r, 1), n = null));});} }, { key: "_initListen", value: function value(e, t) {var n = this;this.options.ListenEvents.forEach(function (r) {return O[t ? "on" : "off"](e, r, n.lazyLoadHandler);});} }, { key: "_initEvent", value: function value() {var e = this;this.Event = { listeners: { loading: [], loaded: [], error: [] } }, this.$on = function (t, n) {e.Event.listeners[t].push(n);}, this.$once = function (t, n) {function r() {i.$off(t, r), n.apply(i, arguments);}var i = e;e.$on(t, r);}, this.$off = function (t, n) {if (!n) return void (e.Event.listeners[t] = []);o(e.Event.listeners[t], n);}, this.$emit = function (t, n, r) {e.Event.listeners[t].forEach(function (e) {return e(n, r);});};} }, { key: "_lazyLoadHandler", value: function value() {var e = this,t = !1;this.ListenerQueue.forEach(function (n, r) {n.state.loaded || (t = n.checkInView()) && n.load(function () {!n.error && n.loaded && e.ListenerQueue.splice(r, 1);});});} }, { key: "_initIntersectionObserver", value: function value() {var e = this;E && (this._observer = new IntersectionObserver(this._observerHandler.bind(this), this.options.observerOptions), this.ListenerQueue.length && this.ListenerQueue.forEach(function (t) {e._observer.observe(t.el);}));} }, { key: "_observerHandler", value: function value(e, t) {var n = this;e.forEach(function (e) {e.isIntersecting && n.ListenerQueue.forEach(function (t) {if (t.el === e.target) {if (t.state.loaded) return n._observer.unobserve(t.el);t.load();}});});} }, { key: "_elRenderer", value: function value(e, t, n) {if (e.el) {var r = e.el,i = e.bindType,o = void 0;switch (t) {case "loading":o = e.loading;break;case "error":o = e.error;break;default:o = e.src;}if (i ? r.style[i] = 'url("' + o + '")' : r.getAttribute("src") !== o && r.setAttribute("src", o), r.setAttribute("lazy", t), this.$emit(t, e, n), this.options.adapter[t] && this.options.adapter[t](e, this.options), this.options.dispatchEvent) {var a = new j(t, { detail: e });r.dispatchEvent(a);}}} }, { key: "_valueFormatter", value: function value(e) {var t = e,n = this.options.loading,r = this.options.error;return c(e) && (e.src || this.options.silent || console.error("Vue Lazyload warning: miss src with " + e), t = e.src, n = e.loading || this.options.loading, r = e.error || this.options.error), { src: t, loading: n, error: r };} }]), t;}();},B = function B(e) {return { props: { tag: { type: String, default: "div" } }, render: function render(e) {return !1 === this.show ? e(this.tag) : e(this.tag, null, this.$slots.default);}, data: function data() {return { el: null, state: { loaded: !1 }, rect: {}, show: !1 };}, mounted: function mounted() {this.el = this.$el, e.addLazyBox(this), e.lazyLoadHandler();}, beforeDestroy: function beforeDestroy() {e.removeComponent(this);}, methods: { getRect: function getRect() {this.rect = this.$el.getBoundingClientRect();}, checkInView: function checkInView() {return this.getRect(), k && this.rect.top < window.innerHeight * e.options.preLoad && this.rect.bottom > 0 && this.rect.left < window.innerWidth * e.options.preLoad && this.rect.right > 0;}, load: function load() {this.show = !0, this.state.loaded = !0, this.$emit("show", this);} } };},V = function () {function e(t) {var n = t.lazy;b(this, e), this.lazy = n, n.lazyContainerMananger = this, this._queue = [];}return y(e, [{ key: "bind", value: function value(e, t, n) {var r = new N({ el: e, binding: t, vnode: n, lazy: this.lazy });this._queue.push(r);} }, { key: "update", value: function value(e, t, n) {var r = u(this._queue, function (t) {return t.el === e;});r && r.update({ el: e, binding: t, vnode: n });} }, { key: "unbind", value: function value(e, t, n) {var r = u(this._queue, function (t) {return t.el === e;});r && (r.clear(), o(this._queue, r));} }]), e;}(),M = { selector: "img" },N = function () {function e(t) {var n = t.el,r = t.binding,i = t.vnode,o = t.lazy;b(this, e), this.el = null, this.vnode = i, this.binding = r, this.options = {}, this.lazy = o, this._queue = [], this.update({ el: n, binding: r });}return y(e, [{ key: "update", value: function value(e) {var t = this,n = e.el,r = e.binding;this.el = n, this.options = _({}, M, r.value), this.getImgs().forEach(function (e) {t.lazy.add(e, _({}, t.binding, { value: { src: e.dataset.src, error: e.dataset.error, loading: e.dataset.loading } }), t.vnode);});} }, { key: "getImgs", value: function value() {return f(this.el.querySelectorAll(this.options.selector));} }, { key: "clear", value: function value() {var e = this;this.getImgs().forEach(function (t) {return e.lazy.remove(t);}), this.vnode = null, this.binding = null, this.lazy = null;} }]), e;}();return { install: function install(e) {var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},n = D(e),r = new n(t),i = new V({ lazy: r }),o = "2" === e.version.split(".")[0];e.prototype.$Lazyload = r, t.lazyComponent && e.component("lazy-component", B(r)), o ? (e.directive("lazy", { bind: r.add.bind(r), update: r.update.bind(r), componentUpdated: r.lazyLoadHandler.bind(r), unbind: r.remove.bind(r) }), e.directive("lazy-container", { bind: i.bind.bind(i), update: i.update.bind(i), unbind: i.unbind.bind(i) })) : (e.directive("lazy", { bind: r.lazyLoadHandler.bind(r), update: function update(e, t) {_(this.vm.$refs, this.vm.$els), r.add(this.el, { modifiers: this.modifiers || {}, arg: this.arg, value: e, oldValue: t }, { context: this.vm });}, unbind: function unbind() {r.remove(this.el);} }), e.directive("lazy-container", { update: function update(e, t) {i.update(this.el, { modifiers: this.modifiers || {}, arg: this.arg, value: e, oldValue: t }, { context: this.vm });}, unbind: function unbind() {i.unbind(this.el);} }));} };});

/***/ }),
/* 138 */
/*!*********************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/list/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _utils = __webpack_require__(/*! ../utils */ 17);
var _style = __webpack_require__(/*! ../utils/dom/style */ 94);
var _scroll = __webpack_require__(/*! ../utils/dom/scroll */ 36);

var _bindEvent = __webpack_require__(/*! ../mixins/bind-event */ 40);

var _loading = _interopRequireDefault(__webpack_require__(/*! ../loading */ 44));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // Utils
// Mixins
// Components
var _createNamespace = (0, _utils.createNamespace)('list'),createComponent = _createNamespace[0],
bem = _createNamespace[1],
t = _createNamespace[2];var _default =

createComponent({
  mixins: [(0, _bindEvent.BindEventMixin)(function (bind) {
    if (!this.scroller) {
      this.scroller = (0, _scroll.getScroller)(this.$el);
    }

    bind(this.scroller, 'scroll', this.check);
  })],
  model: {
    prop: 'loading' },

  props: {
    error: Boolean,
    loading: Boolean,
    finished: Boolean,
    errorText: String,
    loadingText: String,
    finishedText: String,
    immediateCheck: {
      type: Boolean,
      default: true },

    offset: {
      type: [Number, String],
      default: 300 },

    direction: {
      type: String,
      default: 'down' } },


  data: function data() {
    return {
      // use sync innerLoading state to avoid repeated loading in some edge cases
      innerLoading: this.loading };

  },
  updated: function updated() {
    this.innerLoading = this.loading;
  },
  mounted: function mounted() {
    if (this.immediateCheck) {
      this.check();
    }
  },
  watch: {
    loading: 'check',
    finished: 'check' },

  methods: {
    // @exposed-api
    check: function check() {
      var _this = this;

      this.$nextTick(function () {
        if (_this.innerLoading || _this.finished || _this.error) {
          return;
        }

        var el = _this.$el,
        scroller = _this.scroller,
        offset = _this.offset,
        direction = _this.direction;
        var scrollerRect;

        if (scroller.getBoundingClientRect) {
          scrollerRect = scroller.getBoundingClientRect();
        } else {
          scrollerRect = {
            top: 0,
            bottom: scroller.innerHeight };

        }

        var scrollerHeight = scrollerRect.bottom - scrollerRect.top;
        /* istanbul ignore next */

        if (!scrollerHeight || (0, _style.isHidden)(el)) {
          return false;
        }

        var isReachEdge = false;

        var placeholderRect = _this.$refs.placeholder.getBoundingClientRect();

        if (direction === 'up') {
          isReachEdge = scrollerRect.top - placeholderRect.top <= offset;
        } else {
          isReachEdge = placeholderRect.bottom - scrollerRect.bottom <= offset;
        }

        if (isReachEdge) {
          _this.innerLoading = true;

          _this.$emit('input', true);

          _this.$emit('load');
        }
      });
    },
    clickErrorText: function clickErrorText() {
      this.$emit('update:error', false);
      this.check();
    },
    genLoading: function genLoading() {
      var h = this.$createElement;

      if (this.innerLoading && !this.finished) {
        return h("div", {
          "key": "loading",
          "class": bem('loading') },
        [this.slots('loading') || h(_loading.default, {
          "attrs": {
            "size": "16" } },

        [this.loadingText || t('loading')])]);
      }
    },
    genFinishedText: function genFinishedText() {
      var h = this.$createElement;

      if (this.finished) {
        var text = this.slots('finished') || this.finishedText;

        if (text) {
          return h("div", {
            "class": bem('finished-text') },
          [text]);
        }
      }
    },
    genErrorText: function genErrorText() {
      var h = this.$createElement;

      if (this.error) {
        var text = this.slots('error') || this.errorText;

        if (text) {
          return h("div", {
            "on": {
              "click": this.clickErrorText },

            "class": bem('error-text') },
          [text]);
        }
      }
    } },

  render: function render() {
    var h = arguments[0];
    var Placeholder = h("div", {
      "ref": "placeholder",
      "key": "placeholder",
      "class": bem('placeholder') });

    return h("div", {
      "class": bem(),
      "attrs": {
        "role": "feed",
        "aria-busy": this.innerLoading } },

    [this.direction === 'down' ? this.slots() : Placeholder, this.genLoading(), this.genFinishedText(), this.genErrorText(), this.direction === 'up' ? this.slots() : Placeholder]);
  } });exports.default = _default;

/***/ }),
/* 139 */
/*!************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/nav-bar/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _utils = __webpack_require__(/*! ../utils */ 17);
var _constant = __webpack_require__(/*! ../utils/constant */ 50);

var _icon = _interopRequireDefault(__webpack_require__(/*! ../icon */ 41));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // Utils
// Components
var _createNamespace = (0, _utils.createNamespace)('nav-bar'),
createComponent = _createNamespace[0],
bem = _createNamespace[1];var _default =

createComponent({
  props: {
    title: String,
    fixed: Boolean,
    zIndex: [Number, String],
    leftText: String,
    rightText: String,
    leftArrow: Boolean,
    placeholder: Boolean,
    safeAreaInsetTop: Boolean,
    border: {
      type: Boolean,
      default: true } },


  data: function data() {
    return {
      height: null };

  },
  mounted: function mounted() {
    if (this.placeholder && this.fixed) {
      this.height = this.$refs.navBar.getBoundingClientRect().height;
    }
  },
  methods: {
    genLeft: function genLeft() {
      var h = this.$createElement;
      var leftSlot = this.slots('left');

      if (leftSlot) {
        return leftSlot;
      }

      return [this.leftArrow && h(_icon.default, {
        "class": bem('arrow'),
        "attrs": {
          "name": "arrow-left" } }),

      this.leftText && h("span", {
        "class": bem('text') },
      [this.leftText])];
    },
    genRight: function genRight() {
      var h = this.$createElement;
      var rightSlot = this.slots('right');

      if (rightSlot) {
        return rightSlot;
      }

      if (this.rightText) {
        return h("span", {
          "class": bem('text') },
        [this.rightText]);
      }
    },
    genNavBar: function genNavBar() {
      var _ref;

      var h = this.$createElement;
      return h("div", {
        "ref": "navBar",
        "style": {
          zIndex: this.zIndex },

        "class": [bem({
          fixed: this.fixed,
          'safe-area-inset-top': this.safeAreaInsetTop }), (
        _ref = {}, _ref[_constant.BORDER_BOTTOM] = this.border, _ref)] },
      [h("div", {
        "class": bem('content') },
      [this.hasLeft() && h("div", {
        "class": bem('left'),
        "on": {
          "click": this.onClickLeft } },

      [this.genLeft()]), h("div", {
        "class": [bem('title'), 'van-ellipsis'] },
      [this.slots('title') || this.title]), this.hasRight() && h("div", {
        "class": bem('right'),
        "on": {
          "click": this.onClickRight } },

      [this.genRight()])])]);
    },
    hasLeft: function hasLeft() {
      return this.leftArrow || this.leftText || this.slots('left');
    },
    hasRight: function hasRight() {
      return this.rightText || this.slots('right');
    },
    onClickLeft: function onClickLeft(event) {
      this.$emit('click-left', event);
    },
    onClickRight: function onClickRight(event) {
      this.$emit('click-right', event);
    } },

  render: function render() {
    var h = arguments[0];

    if (this.placeholder && this.fixed) {
      return h("div", {
        "class": bem('placeholder'),
        "style": {
          height: this.height + "px" } },

      [this.genNavBar()]);
    }

    return this.genNavBar();
  } });exports.default = _default;

/***/ }),
/* 140 */
/*!***************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/notice-bar/index.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _utils = __webpack_require__(/*! ../utils */ 17);
var _raf = __webpack_require__(/*! ../utils/dom/raf */ 82);
var _bindEvent = __webpack_require__(/*! ../mixins/bind-event */ 40);
var _icon = _interopRequireDefault(__webpack_require__(/*! ../icon */ 41));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var _createNamespace = (0, _utils.createNamespace)('notice-bar'),
createComponent = _createNamespace[0],
bem = _createNamespace[1];var _default =

createComponent({
  mixins: [(0, _bindEvent.BindEventMixin)(function (bind) {
    // fix cache issues with forwards and back history in safari
    // see: https://guwii.com/cache-issues-with-forwards-and-back-history-in-safari/
    bind(window, 'pageshow', this.start);
  })],
  props: {
    text: String,
    mode: String,
    color: String,
    leftIcon: String,
    wrapable: Boolean,
    background: String,
    scrollable: {
      type: Boolean,
      default: null },

    delay: {
      type: [Number, String],
      default: 1 },

    speed: {
      type: [Number, String],
      default: 50 } },


  data: function data() {
    return {
      show: true,
      offset: 0,
      duration: 0,
      wrapWidth: 0,
      contentWidth: 0 };

  },
  watch: {
    scrollable: 'start',
    text: {
      handler: 'start',
      immediate: true } },


  activated: function activated() {
    this.start();
  },
  methods: {
    onClickIcon: function onClickIcon(event) {
      if (this.mode === 'closeable') {
        this.show = false;
        this.$emit('close', event);
      }
    },
    onTransitionEnd: function onTransitionEnd() {
      var _this = this;

      this.offset = this.wrapWidth;
      this.duration = 0; // wait for Vue to render offset
      // using nextTick won't work in iOS14

      (0, _raf.raf)(function () {
        // use double raf to ensure animation can start
        (0, _raf.doubleRaf)(function () {
          _this.offset = -_this.contentWidth;
          _this.duration = (_this.contentWidth + _this.wrapWidth) / _this.speed;

          _this.$emit('replay');
        });
      });
    },
    reset: function reset() {
      this.offset = 0;
      this.duration = 0;
      this.wrapWidth = 0;
      this.contentWidth = 0;
    },
    start: function start() {
      var _this2 = this;

      var delay = (0, _utils.isDef)(this.delay) ? this.delay * 1000 : 0;
      this.reset();
      clearTimeout(this.startTimer);
      this.startTimer = setTimeout(function () {
        var _this2$$refs = _this2.$refs,
        wrap = _this2$$refs.wrap,
        content = _this2$$refs.content;

        if (!wrap || !content || _this2.scrollable === false) {
          return;
        }

        var wrapWidth = wrap.getBoundingClientRect().width;
        var contentWidth = content.getBoundingClientRect().width;

        if (_this2.scrollable || contentWidth > wrapWidth) {
          (0, _raf.doubleRaf)(function () {
            _this2.offset = -contentWidth;
            _this2.duration = contentWidth / _this2.speed;
            _this2.wrapWidth = wrapWidth;
            _this2.contentWidth = contentWidth;
          });
        }
      }, delay);
    } },

  render: function render() {
    var _this3 = this;

    var h = arguments[0];
    var slots = this.slots,
    mode = this.mode,
    leftIcon = this.leftIcon,
    onClickIcon = this.onClickIcon;
    var barStyle = {
      color: this.color,
      background: this.background };

    var contentStyle = {
      transform: this.offset ? "translateX(" + this.offset + "px)" : '',
      transitionDuration: this.duration + 's' };


    function LeftIcon() {
      var slot = slots('left-icon');

      if (slot) {
        return slot;
      }

      if (leftIcon) {
        return h(_icon.default, {
          "class": bem('left-icon'),
          "attrs": {
            "name": leftIcon } });


      }
    }

    function RightIcon() {
      var slot = slots('right-icon');

      if (slot) {
        return slot;
      }

      var iconName;

      if (mode === 'closeable') {
        iconName = 'cross';
      } else if (mode === 'link') {
        iconName = 'arrow';
      }

      if (iconName) {
        return h(_icon.default, {
          "class": bem('right-icon'),
          "attrs": {
            "name": iconName },

          "on": {
            "click": onClickIcon } });


      }
    }

    return h("div", {
      "attrs": {
        "role": "alert" },

      "directives": [{
        name: "show",
        value: this.show }],

      "class": bem({
        wrapable: this.wrapable }),

      "style": barStyle,
      "on": {
        "click": function click(event) {
          _this3.$emit('click', event);
        } } },

    [LeftIcon(), h("div", {
      "ref": "wrap",
      "class": bem('wrap'),
      "attrs": {
        "role": "marquee" } },

    [h("div", {
      "ref": "content",
      "class": [bem('content'), {
        'van-ellipsis': this.scrollable === false && !this.wrapable }],

      "style": contentStyle,
      "on": {
        "transitionend": this.onTransitionEnd } },

    [this.slots() || this.text])]), RightIcon()]);
  } });exports.default = _default;

/***/ }),
/* 141 */
/*!***********************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/notify/index.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/esm/extends */ 15));
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _Notify = _interopRequireDefault(__webpack_require__(/*! ./Notify */ 142));
var _utils = __webpack_require__(/*! ../utils */ 17);
var _functional = __webpack_require__(/*! ../utils/functional */ 29);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
var timer;
var instance;

function parseOptions(message) {
  return (0, _utils.isObject)(message) ? message : {
    message: message };

}

function Notify(options) {
  /* istanbul ignore if */
  if (_utils.isServer) {
    return;
  }

  if (!instance) {
    instance = (0, _functional.mount)(_Notify.default, {
      on: {
        click: function click(event) {
          if (instance.onClick) {
            instance.onClick(event);
          }
        },
        close: function close() {
          if (instance.onClose) {
            instance.onClose();
          }
        },
        opened: function opened() {
          if (instance.onOpened) {
            instance.onOpened();
          }
        } } });


  }

  options = (0, _extends2.default)({}, Notify.currentOptions, parseOptions(options));

  (0, _extends2.default)(instance, options);

  clearTimeout(timer);

  if (options.duration && options.duration > 0) {
    timer = setTimeout(Notify.clear, options.duration);
  }

  return instance;
}

function defaultOptions() {
  return {
    type: 'danger',
    value: true,
    message: '',
    color: undefined,
    background: undefined,
    duration: 3000,
    className: '',
    onClose: null,
    onClick: null,
    onOpened: null };

}

Notify.clear = function () {
  if (instance) {
    instance.value = false;
  }
};

Notify.currentOptions = defaultOptions();

Notify.setDefaultOptions = function (options) {
  (0, _extends2.default)(Notify.currentOptions, options);
};

Notify.resetDefaultOptions = function () {
  Notify.currentOptions = defaultOptions();
};

Notify.install = function () {
  _vue.default.use(_Notify.default);
};

Notify.Component = _Notify.default;
_vue.default.prototype.$notify = Notify;var _default =
Notify;exports.default = _default;

/***/ }),
/* 142 */
/*!************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/notify/Notify.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/esm/extends */ 15));
var _babelHelperVueJsxMergeProps = _interopRequireDefault(__webpack_require__(/*! @vue/babel-helper-vue-jsx-merge-props */ 16));

var _utils = __webpack_require__(/*! ../utils */ 17);
var _functional = __webpack_require__(/*! ../utils/functional */ 29);

var _popup = __webpack_require__(/*! ../mixins/popup */ 30);

var _popup2 = _interopRequireDefault(__webpack_require__(/*! ../popup */ 43));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // Utils
// Mixins
// Components
// Types
var _createNamespace = (0, _utils.createNamespace)('notify'),createComponent = _createNamespace[0],bem = _createNamespace[1];

function Notify(h, props, slots, ctx) {
  var style = {
    color: props.color,
    background: props.background };

  return h(_popup2.default, (0, _babelHelperVueJsxMergeProps.default)([{
    "attrs": {
      "value": props.value,
      "position": "top",
      "overlay": false,
      "duration": 0.2,
      "lockScroll": false },

    "style": style,
    "class": [bem([props.type]), props.className] },
  (0, _functional.inherit)(ctx, true)]), [(slots.default == null ? void 0 : slots.default()) || props.message]);
}

Notify.props = (0, _extends2.default)({}, _popup.popupMixinProps, {
  color: String,
  message: [Number, String],
  duration: [Number, String],
  className: null,
  background: String,
  getContainer: [String, Function],
  type: {
    type: String,
    default: 'danger' } });var _default =


createComponent(Notify);exports.default = _default;

/***/ }),
/* 143 */
/*!********************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/number-keyboard/index.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _utils = __webpack_require__(/*! ../utils */ 17);
var _event = __webpack_require__(/*! ../utils/dom/event */ 34);
var _portal = __webpack_require__(/*! ../mixins/portal */ 38);
var _bindEvent = __webpack_require__(/*! ../mixins/bind-event */ 40);
var _Key = _interopRequireDefault(__webpack_require__(/*! ./Key */ 144));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var _createNamespace = (0, _utils.createNamespace)('number-keyboard'),
createComponent = _createNamespace[0],
bem = _createNamespace[1];var _default =

createComponent({
  mixins: [(0, _portal.PortalMixin)(), (0, _bindEvent.BindEventMixin)(function (bind) {
    if (this.hideOnClickOutside) {
      bind(document.body, 'touchstart', this.onBlur);
    }
  })],
  model: {
    event: 'update:value' },

  props: {
    show: Boolean,
    title: String,
    zIndex: [Number, String],
    randomKeyOrder: Boolean,
    closeButtonText: String,
    deleteButtonText: String,
    closeButtonLoading: Boolean,
    theme: {
      type: String,
      default: 'default' },

    value: {
      type: String,
      default: '' },

    extraKey: {
      type: [String, Array],
      default: '' },

    maxlength: {
      type: [Number, String],
      default: Number.MAX_VALUE },

    transition: {
      type: Boolean,
      default: true },

    showDeleteKey: {
      type: Boolean,
      default: true },

    hideOnClickOutside: {
      type: Boolean,
      default: true },

    safeAreaInsetBottom: {
      type: Boolean,
      default: true } },


  watch: {
    show: function show(val) {
      if (!this.transition) {
        this.$emit(val ? 'show' : 'hide');
      }
    } },

  computed: {
    keys: function keys() {
      if (this.theme === 'custom') {
        return this.genCustomKeys();
      }

      return this.genDefaultKeys();
    } },

  methods: {
    genBasicKeys: function genBasicKeys() {
      var keys = [];

      for (var i = 1; i <= 9; i++) {
        keys.push({
          text: i });

      }

      if (this.randomKeyOrder) {
        keys.sort(function () {
          return Math.random() > 0.5 ? 1 : -1;
        });
      }

      return keys;
    },
    genDefaultKeys: function genDefaultKeys() {
      return [].concat(this.genBasicKeys(), [{
        text: this.extraKey,
        type: 'extra' },
      {
        text: 0 },
      {
        text: this.showDeleteKey ? this.deleteButtonText : '',
        type: this.showDeleteKey ? 'delete' : '' }]);

    },
    genCustomKeys: function genCustomKeys() {
      var keys = this.genBasicKeys();
      var extraKey = this.extraKey;
      var extraKeys = Array.isArray(extraKey) ? extraKey : [extraKey];

      if (extraKeys.length === 1) {
        keys.push({
          text: 0,
          wider: true },
        {
          text: extraKeys[0],
          type: 'extra' });

      } else if (extraKeys.length === 2) {
        keys.push({
          text: extraKeys[0],
          type: 'extra' },
        {
          text: 0 },
        {
          text: extraKeys[1],
          type: 'extra' });

      }

      return keys;
    },
    onBlur: function onBlur() {
      this.show && this.$emit('blur');
    },
    onClose: function onClose() {
      this.$emit('close');
      this.onBlur();
    },
    onAnimationEnd: function onAnimationEnd() {
      this.$emit(this.show ? 'show' : 'hide');
    },
    onPress: function onPress(text, type) {
      if (text === '') {
        if (type === 'extra') {
          this.onBlur();
        }

        return;
      }

      var value = this.value;

      if (type === 'delete') {
        this.$emit('delete');
        this.$emit('update:value', value.slice(0, value.length - 1));
      } else if (type === 'close') {
        this.onClose();
      } else if (value.length < this.maxlength) {
        this.$emit('input', text);
        this.$emit('update:value', value + text);
      }
    },
    genTitle: function genTitle() {
      var h = this.$createElement;
      var title = this.title,
      theme = this.theme,
      closeButtonText = this.closeButtonText;
      var titleLeft = this.slots('title-left');
      var showClose = closeButtonText && theme === 'default';
      var showTitle = title || showClose || titleLeft;

      if (!showTitle) {
        return;
      }

      return h("div", {
        "class": bem('header') },
      [titleLeft && h("span", {
        "class": bem('title-left') },
      [titleLeft]), title && h("h2", {
        "class": bem('title') },
      [title]), showClose && h("button", {
        "attrs": {
          "type": "button" },

        "class": bem('close'),
        "on": {
          "click": this.onClose } },

      [closeButtonText])]);
    },
    genKeys: function genKeys() {
      var _this = this;

      var h = this.$createElement;
      return this.keys.map(function (key) {
        return h(_Key.default, {
          "key": key.text,
          "attrs": {
            "text": key.text,
            "type": key.type,
            "wider": key.wider,
            "color": key.color },

          "on": {
            "press": _this.onPress } },

        [key.type === 'delete' && _this.slots('delete'), key.type === 'extra' && _this.slots('extra-key')]);
      });
    },
    genSidebar: function genSidebar() {
      var h = this.$createElement;

      if (this.theme === 'custom') {
        return h("div", {
          "class": bem('sidebar') },
        [this.showDeleteKey && h(_Key.default, {
          "attrs": {
            "large": true,
            "text": this.deleteButtonText,
            "type": "delete" },

          "on": {
            "press": this.onPress } },

        [this.slots('delete')]), h(_Key.default, {
          "attrs": {
            "large": true,
            "text": this.closeButtonText,
            "type": "close",
            "color": "blue",
            "loading": this.closeButtonLoading },

          "on": {
            "press": this.onPress } })]);


      }
    } },

  render: function render() {
    var h = arguments[0];
    var Title = this.genTitle();
    return h("transition", {
      "attrs": {
        "name": this.transition ? 'van-slide-up' : '' } },

    [h("div", {
      "directives": [{
        name: "show",
        value: this.show }],

      "style": {
        zIndex: this.zIndex },

      "class": bem({
        unfit: !this.safeAreaInsetBottom,
        'with-title': Title }),

      "on": {
        "touchstart": _event.stopPropagation,
        "animationend": this.onAnimationEnd,
        "webkitAnimationEnd": this.onAnimationEnd } },

    [Title, h("div", {
      "class": bem('body') },
    [h("div", {
      "class": bem('keys') },
    [this.genKeys()]), this.genSidebar()])])]);
  } });exports.default = _default;

/***/ }),
/* 144 */
/*!******************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/number-keyboard/Key.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _utils = __webpack_require__(/*! ../utils */ 17);
var _touch = __webpack_require__(/*! ../mixins/touch */ 37);
var _loading = _interopRequireDefault(__webpack_require__(/*! ../loading */ 44));
var _DeleteIcon = _interopRequireDefault(__webpack_require__(/*! ./DeleteIcon */ 145));
var _CollapseIcon = _interopRequireDefault(__webpack_require__(/*! ./CollapseIcon */ 146));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var _createNamespace = (0, _utils.createNamespace)('key'),
createComponent = _createNamespace[0],
bem = _createNamespace[1];var _default =

createComponent({
  mixins: [_touch.TouchMixin],
  props: {
    type: String,
    text: [Number, String],
    color: String,
    wider: Boolean,
    large: Boolean,
    loading: Boolean },

  data: function data() {
    return {
      active: false };

  },
  mounted: function mounted() {
    this.bindTouchEvent(this.$el);
  },
  methods: {
    onTouchStart: function onTouchStart(event) {
      // compatible with Vue 2.6 event bubble bug
      event.stopPropagation();
      this.touchStart(event);
      this.active = true;
    },
    onTouchMove: function onTouchMove(event) {
      this.touchMove(event);

      if (this.direction) {
        this.active = false;
      }
    },
    onTouchEnd: function onTouchEnd(event) {
      if (this.active) {
        // eliminate tap delay on safari
        // see: https://github.com/youzan/vant/issues/6836
        if (!this.slots('default')) {
          event.preventDefault();
        }

        this.active = false;
        this.$emit('press', this.text, this.type);
      }
    },
    genContent: function genContent() {
      var h = this.$createElement;
      var isExtra = this.type === 'extra';
      var isDelete = this.type === 'delete';
      var text = this.slots('default') || this.text;

      if (this.loading) {
        return h(_loading.default, {
          "class": bem('loading-icon') });

      }

      if (isDelete) {
        return text || h(_DeleteIcon.default, {
          "class": bem('delete-icon') });

      }

      if (isExtra) {
        return text || h(_CollapseIcon.default, {
          "class": bem('collapse-icon') });

      }

      return text;
    } },

  render: function render() {
    var h = arguments[0];
    return h("div", {
      "class": bem('wrapper', {
        wider: this.wider }) },

    [h("div", {
      "attrs": {
        "role": "button",
        "tabindex": "0" },

      "class": bem([this.color, {
        large: this.large,
        active: this.active,
        delete: this.type === 'delete' }]) },

    [this.genContent()])]);
  } });exports.default = _default;

/***/ }),
/* 145 */
/*!*************************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/number-keyboard/DeleteIcon.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  render: function render() {
    var h = arguments[0];
    return h("svg", {
      "attrs": {
        "viewBox": "0 0 32 22",
        "xmlns": "http://www.w3.org/2000/svg" } },

    [h("path", {
      "attrs": {
        "d": "M28.016 0A3.991 3.991 0 0132 3.987v14.026c0 2.2-1.787 3.987-3.98 3.987H10.382c-.509 0-.996-.206-1.374-.585L.89 13.09C.33 12.62 0 11.84 0 11.006c0-.86.325-1.62.887-2.08L9.01.585A1.936 1.936 0 0110.383 0zm0 1.947H10.368L2.24 10.28c-.224.226-.312.432-.312.73 0 .287.094.51.312.729l8.128 8.333h17.648a2.041 2.041 0 002.037-2.04V3.987c0-1.127-.915-2.04-2.037-2.04zM23.028 6a.96.96 0 01.678.292.95.95 0 01-.003 1.377l-3.342 3.348 3.326 3.333c.189.188.292.43.292.679 0 .248-.103.49-.292.679a.96.96 0 01-.678.292.959.959 0 01-.677-.292L18.99 12.36l-3.343 3.345a.96.96 0 01-.677.292.96.96 0 01-.678-.292.962.962 0 01-.292-.68c0-.248.104-.49.292-.679l3.342-3.348-3.342-3.348A.963.963 0 0114 6.971c0-.248.104-.49.292-.679A.96.96 0 0114.97 6a.96.96 0 01.677.292l3.358 3.348 3.345-3.348A.96.96 0 0123.028 6z",
        "fill": "currentColor" } })]);


  } };exports.default = _default;

/***/ }),
/* 146 */
/*!***************************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/number-keyboard/CollapseIcon.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  render: function render() {
    var h = arguments[0];
    return h("svg", {
      "attrs": {
        "viewBox": "0 0 30 24",
        "xmlns": "http://www.w3.org/2000/svg" } },

    [h("path", {
      "attrs": {
        "d": "M25.877 12.843h-1.502c-.188 0-.188 0-.188.19v1.512c0 .188 0 .188.188.188h1.5c.187 0 .187 0 .187-.188v-1.511c0-.19 0-.191-.185-.191zM17.999 10.2c0 .188 0 .188.188.188h1.687c.188 0 .188 0 .188-.188V8.688c0-.187.004-.187-.186-.19h-1.69c-.187 0-.187 0-.187.19V10.2zm2.25-3.967h1.5c.188 0 .188 0 .188-.188v-1.7c0-.19 0-.19-.188-.19h-1.5c-.189 0-.189 0-.189.19v1.7c0 .188 0 .188.19.188zm2.063 4.157h3.563c.187 0 .187 0 .187-.189V4.346c0-.19.004-.19-.185-.19h-1.69c-.187 0-.187 0-.187.188v4.155h-1.688c-.187 0-.187 0-.187.189v1.514c0 .19 0 .19.187.19zM14.812 24l2.812-3.4H12l2.813 3.4zm-9-11.157H4.31c-.188 0-.188 0-.188.19v1.512c0 .188 0 .188.188.188h1.502c.187 0 .187 0 .187-.188v-1.511c0-.19.01-.191-.189-.191zm15.937 0H8.25c-.188 0-.188 0-.188.19v1.512c0 .188 0 .188.188.188h13.5c.188 0 .188 0 .188-.188v-1.511c0-.19 0-.191-.188-.191zm-11.438-2.454h1.5c.188 0 .188 0 .188-.188V8.688c0-.187 0-.187-.188-.189h-1.5c-.187 0-.187 0-.187.189V10.2c0 .188 0 .188.187.188zM27.94 0c.563 0 .917.21 1.313.567.518.466.748.757.748 1.51v14.92c0 .567-.188 1.134-.562 1.512-.376.378-.938.566-1.313.566H2.063c-.563 0-.938-.188-1.313-.566-.562-.378-.75-.945-.75-1.511V2.078C0 1.51.188.944.562.567.938.189 1.5 0 1.875 0zm-.062 2H2v14.92h25.877V2zM5.81 4.157c.19 0 .19 0 .19.189v1.762c-.003.126-.024.126-.188.126H4.249c-.126-.003-.126-.023-.126-.188v-1.7c-.187-.19 0-.19.188-.19zm10.5 2.077h1.503c.187 0 .187 0 .187-.188v-1.7c0-.19 0-.19-.187-.19h-1.502c-.188 0-.188.001-.188.19v1.7c0 .188 0 .188.188.188zM7.875 8.5c.187 0 .187.002.187.189V10.2c0 .188 0 .188-.187.188H4.249c-.126-.002-.126-.023-.126-.188V8.625c.003-.126.024-.126.188-.126zm7.875 0c.19.002.19.002.19.189v1.575c-.003.126-.024.126-.19.126h-1.563c-.126-.002-.126-.023-.126-.188V8.625c.002-.126.023-.126.189-.126zm-6-4.342c.187 0 .187 0 .187.189v1.7c0 .188 0 .188-.187.188H8.187c-.126-.003-.126-.023-.126-.188V4.283c.003-.126.024-.126.188-.126zm3.94 0c.185 0 .372 0 .372.189v1.762c-.002.126-.023.126-.187.126h-1.75C12 6.231 12 6.211 12 6.046v-1.7c0-.19.187-.19.187-.19z",
        "fill": "currentColor" } })]);


  } };exports.default = _default;

/***/ }),
/* 147 */
/*!***************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/pagination/index.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _utils = __webpack_require__(/*! ../utils */ 17);
var _constant = __webpack_require__(/*! ../utils/constant */ 50);

var _createNamespace = (0, _utils.createNamespace)('pagination'),
createComponent = _createNamespace[0],
bem = _createNamespace[1],
t = _createNamespace[2];

function makePage(number, text, active) {
  return {
    number: number,
    text: text,
    active: active };

}var _default =

createComponent({
  props: {
    prevText: String,
    nextText: String,
    forceEllipses: Boolean,
    mode: {
      type: String,
      default: 'multi' },

    value: {
      type: Number,
      default: 0 },

    pageCount: {
      type: [Number, String],
      default: 0 },

    totalItems: {
      type: [Number, String],
      default: 0 },

    itemsPerPage: {
      type: [Number, String],
      default: 10 },

    showPageSize: {
      type: [Number, String],
      default: 5 } },


  computed: {
    count: function count() {
      var count = this.pageCount || Math.ceil(this.totalItems / this.itemsPerPage);
      return Math.max(1, count);
    },
    pages: function pages() {
      var pages = [];
      var pageCount = this.count;
      var showPageSize = +this.showPageSize;

      if (this.mode !== 'multi') {
        return pages;
      } // Default page limits


      var startPage = 1;
      var endPage = pageCount;
      var isMaxSized = showPageSize < pageCount; // recompute if showPageSize

      if (isMaxSized) {
        // Current page is displayed in the middle of the visible ones
        startPage = Math.max(this.value - Math.floor(showPageSize / 2), 1);
        endPage = startPage + showPageSize - 1; // Adjust if limit is exceeded

        if (endPage > pageCount) {
          endPage = pageCount;
          startPage = endPage - showPageSize + 1;
        }
      } // Add page number links


      for (var number = startPage; number <= endPage; number++) {
        var page = makePage(number, number, number === this.value);
        pages.push(page);
      } // Add links to move between page sets


      if (isMaxSized && showPageSize > 0 && this.forceEllipses) {
        if (startPage > 1) {
          var previousPageSet = makePage(startPage - 1, '...', false);
          pages.unshift(previousPageSet);
        }

        if (endPage < pageCount) {
          var nextPageSet = makePage(endPage + 1, '...', false);
          pages.push(nextPageSet);
        }
      }

      return pages;
    } },

  watch: {
    value: {
      handler: function handler(page) {
        this.select(page || this.value);
      },
      immediate: true } },


  methods: {
    select: function select(page, emitChange) {
      page = Math.min(this.count, Math.max(1, page));

      if (this.value !== page) {
        this.$emit('input', page);

        if (emitChange) {
          this.$emit('change', page);
        }
      }
    } },

  render: function render() {
    var _this = this,
    _this$slots,
    _this$slots3;

    var h = arguments[0];
    var value = this.value;
    var simple = this.mode !== 'multi';

    var onSelect = function onSelect(value) {
      return function () {
        _this.select(value, true);
      };
    };

    return h("ul", {
      "class": bem({
        simple: simple }) },

    [h("li", {
      "class": [bem('item', {
        disabled: value === 1 }),
      bem('prev'), _constant.BORDER],
      "on": {
        "click": onSelect(value - 1) } },

    [((_this$slots = this.slots('prev-text')) != null ? _this$slots : this.prevText) || t('prev')]), this.pages.map(function (page) {
      var _this$slots2;

      return h("li", {
        "class": [bem('item', {
          active: page.active }),
        bem('page'), _constant.BORDER],
        "on": {
          "click": onSelect(page.number) } },

      [(_this$slots2 = _this.slots('page', page)) != null ? _this$slots2 : page.text]);
    }), simple && h("li", {
      "class": bem('page-desc') },
    [this.slots('pageDesc') || value + "/" + this.count]), h("li", {
      "class": [bem('item', {
        disabled: value === this.count }),
      bem('next'), _constant.BORDER],
      "on": {
        "click": onSelect(value + 1) } },

    [((_this$slots3 = this.slots('next-text')) != null ? _this$slots3 : this.nextText) || t('next')])]);
  } });exports.default = _default;

/***/ }),
/* 148 */
/*!**********************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/panel/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _babelHelperVueJsxMergeProps = _interopRequireDefault(__webpack_require__(/*! @vue/babel-helper-vue-jsx-merge-props */ 16));

var _utils = __webpack_require__(/*! ../utils */ 17);
var _functional = __webpack_require__(/*! ../utils/functional */ 29);
var _constant = __webpack_require__(/*! ../utils/constant */ 50);

var _cell = _interopRequireDefault(__webpack_require__(/*! ../cell */ 54));
var _cellGroup = _interopRequireDefault(__webpack_require__(/*! ../cell-group */ 99));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // Utils
// Components
// Types
var _createNamespace = (0, _utils.createNamespace)('panel'),createComponent = _createNamespace[0],
bem = _createNamespace[1];

function Panel(h, props, slots, ctx) {
  var Content = function Content() {
    return [slots.header ? slots.header() : h(_cell.default, {
      "attrs": {
        "icon": props.icon,
        "label": props.desc,
        "title": props.title,
        "value": props.status,
        "valueClass": bem('header-value') },

      "class": bem('header') }),
    h("div", {
      "class": bem('content') },
    [slots.default && slots.default()]), slots.footer && h("div", {
      "class": [bem('footer'), _constant.BORDER_TOP] },
    [slots.footer()])];
  };

  return h(_cellGroup.default, (0, _babelHelperVueJsxMergeProps.default)([{
    "class": bem(),
    "scopedSlots": {
      default: Content } },

  (0, _functional.inherit)(ctx, true)]));
}

Panel.props = {
  icon: String,
  desc: String,
  title: String,
  status: String };var _default =

createComponent(Panel);exports.default = _default;

/***/ }),
/* 149 */
/*!*******************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/password-input/index.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _babelHelperVueJsxMergeProps = _interopRequireDefault(__webpack_require__(/*! @vue/babel-helper-vue-jsx-merge-props */ 16));

var _utils = __webpack_require__(/*! ../utils */ 17);
var _functional = __webpack_require__(/*! ../utils/functional */ 29);
var _constant = __webpack_require__(/*! ../utils/constant */ 50);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // Utils
// Types
var _createNamespace = (0, _utils.createNamespace)('password-input'),
createComponent = _createNamespace[0],
bem = _createNamespace[1];

function PasswordInput(h, props, slots, ctx) {
  var _ref2;

  var mask = props.mask,
  value = props.value,
  length = props.length,
  gutter = props.gutter,
  focused = props.focused,
  errorInfo = props.errorInfo;
  var info = errorInfo || props.info;
  var Points = [];

  for (var i = 0; i < length; i++) {
    var _ref;

    var _char = value[i];
    var showBorder = i !== 0 && !gutter;
    var showCursor = focused && i === value.length;
    var style = void 0;

    if (i !== 0 && gutter) {
      style = {
        marginLeft: (0, _utils.addUnit)(gutter) };

    }

    Points.push(h("li", {
      "class": [(_ref = {}, _ref[_constant.BORDER_LEFT] = showBorder, _ref), bem('item', {
        focus: showCursor })],

      "style": style },
    [mask ? h("i", {
      "style": {
        visibility: _char ? 'visible' : 'hidden' } }) :

    _char, showCursor && h("div", {
      "class": bem('cursor') })]));

  }

  return h("div", {
    "class": bem() },
  [h("ul", (0, _babelHelperVueJsxMergeProps.default)([{
    "class": [bem('security'), (_ref2 = {}, _ref2[_constant.BORDER_SURROUND] = !gutter, _ref2)],
    "on": {
      "touchstart": function touchstart(event) {
        event.stopPropagation();
        (0, _functional.emit)(ctx, 'focus', event);
      } } },

  (0, _functional.inherit)(ctx, true)]), [Points]), info && h("div", {
    "class": bem(errorInfo ? 'error-info' : 'info') },
  [info])]);
}

PasswordInput.props = {
  info: String,
  gutter: [Number, String],
  focused: Boolean,
  errorInfo: String,
  mask: {
    type: Boolean,
    default: true },

  value: {
    type: String,
    default: '' },

  length: {
    type: [Number, String],
    default: 6 } };var _default =


createComponent(PasswordInput);exports.default = _default;

/***/ }),
/* 150 */
/*!************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/popover/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/esm/extends */ 15));
var _popperjs = __webpack_require__(/*! @vant/popperjs */ 151);
var _utils = __webpack_require__(/*! ../utils */ 17);
var _constant = __webpack_require__(/*! ../utils/constant */ 50);

var _clickOutside = __webpack_require__(/*! ../mixins/click-outside */ 121);

var _icon = _interopRequireDefault(__webpack_require__(/*! ../icon */ 41));
var _popup = _interopRequireDefault(__webpack_require__(/*! ../popup */ 43));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // Mixins
// Components
var _createNamespace = (0, _utils.createNamespace)('popover'),
createComponent = _createNamespace[0],
bem = _createNamespace[1];var _default2 =

createComponent({
  mixins: [(0, _clickOutside.ClickOutsideMixin)({
    event: 'touchstart',
    method: 'onClickOutside' })],

  props: {
    value: Boolean,
    trigger: String,
    overlay: Boolean,
    offset: {
      type: Array,
      default: function _default() {
        return [0, 8];
      } },

    theme: {
      type: String,
      default: 'light' },

    actions: {
      type: Array,
      default: function _default() {
        return [];
      } },

    placement: {
      type: String,
      default: 'bottom' },

    getContainer: {
      type: [String, Function],
      default: 'body' },

    closeOnClickAction: {
      type: Boolean,
      default: true } },


  watch: {
    value: 'updateLocation',
    placement: 'updateLocation' },

  mounted: function mounted() {
    this.updateLocation();
  },
  beforeDestroy: function beforeDestroy() {
    if (this.popper) {
      this.popper.destroy();
      this.popper = null;
    }
  },
  methods: {
    createPopper: function createPopper() {
      return (0, _popperjs.createPopper)(this.$refs.wrapper, this.$refs.popover.$el, {
        placement: this.placement,
        modifiers: [{
          name: 'computeStyles',
          options: {
            adaptive: false,
            gpuAcceleration: false } },

        (0, _extends2.default)({}, _popperjs.offsetModifier, {
          options: {
            offset: this.offset } })] });



    },
    updateLocation: function updateLocation() {
      var _this = this;

      this.$nextTick(function () {
        if (!_this.value) {
          return;
        }

        if (!_this.popper) {
          _this.popper = _this.createPopper();
        } else {
          _this.popper.setOptions({
            placement: _this.placement });

        }
      });
    },
    renderAction: function renderAction(action, index) {
      var _this2 = this;

      var h = this.$createElement;
      var icon = action.icon,
      text = action.text,
      disabled = action.disabled,
      className = action.className;
      return h("div", {
        "attrs": {
          "role": "menuitem" },

        "class": [bem('action', {
          disabled: disabled,
          'with-icon': icon }),
        className],
        "on": {
          "click": function click() {
            return _this2.onClickAction(action, index);
          } } },

      [icon && h(_icon.default, {
        "attrs": {
          "name": icon },

        "class": bem('action-icon') }),
      h("div", {
        "class": [bem('action-text'), _constant.BORDER_BOTTOM] },
      [text])]);
    },
    onToggle: function onToggle(value) {
      this.$emit('input', value);
    },
    onClickWrapper: function onClickWrapper() {
      if (this.trigger === 'click') {
        this.onToggle(!this.value);
      }
    },
    onTouchstart: function onTouchstart(event) {
      event.stopPropagation();
      this.$emit('touchstart', event);
    },
    onClickAction: function onClickAction(action, index) {
      if (action.disabled) {
        return;
      }

      this.$emit('select', action, index);

      if (this.closeOnClickAction) {
        this.$emit('input', false);
      }
    },
    onClickOutside: function onClickOutside() {
      this.$emit('input', false);
    },
    onOpen: function onOpen() {
      this.$emit('open');
    },

    /* istanbul ignore next */
    onOpened: function onOpened() {
      this.$emit('opened');
    },
    onClose: function onClose() {
      this.$emit('close');
    },

    /* istanbul ignore next */
    onClosed: function onClosed() {
      this.$emit('closed');
    } },

  render: function render() {
    var h = arguments[0];
    return h("span", {
      "ref": "wrapper",
      "class": bem('wrapper'),
      "on": {
        "click": this.onClickWrapper } },

    [h(_popup.default, {
      "ref": "popover",
      "attrs": {
        "value": this.value,
        "overlay": this.overlay,
        "position": null,
        "transition": "van-popover-zoom",
        "lockScroll": false,
        "getContainer": this.getContainer },

      "class": bem([this.theme]),
      "on": {
        "open": this.onOpen,
        "close": this.onClose,
        "input": this.onToggle,
        "opened": this.onOpened,
        "closed": this.onClosed },

      "nativeOn": {
        "touchstart": this.onTouchstart } },

    [h("div", {
      "class": bem('arrow') }),
    h("div", {
      "class": bem('content'),
      "attrs": {
        "role": "menu" } },

    [this.slots('default') || this.actions.map(this.renderAction)])]), this.slots('reference')]);
  } });exports.default = _default2;

/***/ }),
/* 151 */
/*!********************************************************************!*\
  !*** E:/chats/chats/node_modules/@vant/popperjs/dist/esm/index.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.offsetModifier = exports.createPopper = void 0;function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function getBoundingClientRect(element) {
  var rect = element.getBoundingClientRect();
  return {
    width: rect.width,
    height: rect.height,
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    left: rect.left,
    x: rect.left,
    y: rect.top };

}

/*:: import type { Window } from '../types'; */

/*:: declare function getWindow(node: Node | Window): Window; */
function getWindow(node) {
  if (node.toString() !== '[object Window]') {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }

  return node;
}

function getWindowScroll(node) {
  var win = getWindow(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft: scrollLeft,
    scrollTop: scrollTop };

}

/*:: declare function isElement(node: mixed): boolean %checks(node instanceof
    Element); */

function isElement(node) {
  var OwnElement = getWindow(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}
/*:: declare function isHTMLElement(node: mixed): boolean %checks(node instanceof
    HTMLElement); */


function isHTMLElement(node) {
  var OwnElement = getWindow(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}

function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop };

}

function getNodeScroll(node) {
  if (node === getWindow(node) || !isHTMLElement(node)) {
    return getWindowScroll(node);
  } else {
    return getHTMLElementScroll(node);
  }
}

function getNodeName(element) {
  return element ? (element.nodeName || '').toLowerCase() : null;
}

function getDocumentElement(element) {
  // $FlowFixMe: assume body is always available
  return ((isElement(element) ? element.ownerDocument : element.document) || window.document).documentElement;
}

function getWindowScrollBarX(element) {
  // If <html> has a CSS width greater than the viewport, then this will be
  // incorrect for RTL.
  // Popper 1 is broken in this case and never had a bug report so let's assume
  // it's not an issue. I don't think anyone ever specifies width on <html>
  // anyway.
  // Browsers where the left scrollbar doesn't cause an issue report `0` for
  // this (e.g. Edge 2019, IE11, Safari)
  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
}

function getComputedStyle(element) {
  return getWindow(element).getComputedStyle(element);
}

function isScrollParent(element) {
  // Firefox wants us to check `-x` and `-y` variations as well
  var _getComputedStyle = getComputedStyle(element),
  overflow = _getComputedStyle.overflow,
  overflowX = _getComputedStyle.overflowX,
  overflowY = _getComputedStyle.overflowY;

  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}

// Composite means it takes into account transforms as well as layout.

function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }

  var documentElement = getDocumentElement(offsetParent);
  var rect = getBoundingClientRect(elementOrVirtualElement);
  var isOffsetParentAnElement = isHTMLElement(offsetParent);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0 };

  var offsets = {
    x: 0,
    y: 0 };


  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
    isScrollParent(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }

    if (isHTMLElement(offsetParent)) {
      offsets = getBoundingClientRect(offsetParent);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }

  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height };

}

// Returns the layout rect of an element relative to its offsetParent. Layout
// means it doesn't take into account transforms.
function getLayoutRect(element) {
  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width: element.offsetWidth,
    height: element.offsetHeight };

}

function getParentNode(element) {
  if (getNodeName(element) === 'html') {
    return element;
  }

  return (// $FlowFixMe: this is a quicker (but less type safe) way to save quite some bytes from the bundle
    element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    element.parentNode || // DOM Element detected
    // $FlowFixMe: need a better way to handle this...
    element.host || // ShadowRoot detected
    // $FlowFixMe: HTMLElement is a Node
    getDocumentElement(element) // fallback
  );

}

function getScrollParent(node) {
  if (['html', 'body', '#document'].indexOf(getNodeName(node)) >= 0) {
    // $FlowFixMe: assume body is always available
    return node.ownerDocument.body;
  }

  if (isHTMLElement(node) && isScrollParent(node)) {
    return node;
  }

  return getScrollParent(getParentNode(node));
}

/*
  given a DOM element, return the list of all scroll parents, up the list of ancesors
  until we get to the top window object. This list is what we attach scroll listeners
  to, because if any of these parent elements scroll, we'll need to re-calculate the 
  reference element's position.
  */

function listScrollParents(element, list) {
  if (list === void 0) {
    list = [];
  }

  var scrollParent = getScrollParent(element);
  var isBody = getNodeName(scrollParent) === 'body';
  var win = getWindow(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : // $FlowFixMe: isBody tells us target will be an HTMLElement here
  updatedList.concat(listScrollParents(getParentNode(target)));
}

function isTableElement(element) {
  return ['table', 'td', 'th'].indexOf(getNodeName(element)) >= 0;
}

function getTrueOffsetParent(element) {
  if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
  getComputedStyle(element).position === 'fixed') {
    return null;
  }

  var offsetParent = element.offsetParent;

  if (offsetParent) {
    var html = getDocumentElement(offsetParent);

    if (getNodeName(offsetParent) === 'body' && getComputedStyle(offsetParent).position === 'static' && getComputedStyle(html).position !== 'static') {
      return html;
    }
  }

  return offsetParent;
} // `.offsetParent` reports `null` for fixed elements, while absolute elements
// return the containing block


function getContainingBlock(element) {
  var currentNode = getParentNode(element);

  while (isHTMLElement(currentNode) && ['html', 'body'].indexOf(getNodeName(currentNode)) < 0) {
    var css = getComputedStyle(currentNode); // This is non-exhaustive but covers the most common CSS properties that
    // create a containing block.

    if (css.transform !== 'none' || css.perspective !== 'none' || css.willChange && css.willChange !== 'auto') {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }

  return null;
} // Gets the closest ancestor positioned element. Handles some edge cases,
// such as table ancestors and cross browser bugs.


function getOffsetParent(element) {
  var window = getWindow(element);
  var offsetParent = getTrueOffsetParent(element);

  while (offsetParent && isTableElement(offsetParent) && getComputedStyle(offsetParent).position === 'static') {
    offsetParent = getTrueOffsetParent(offsetParent);
  }

  if (offsetParent && getNodeName(offsetParent) === 'body' && getComputedStyle(offsetParent).position === 'static') {
    return window;
  }

  return offsetParent || getContainingBlock(element) || window;
}

var top = 'top';
var bottom = 'bottom';
var right = 'right';
var left = 'left';
var auto = 'auto';
var basePlacements = [top, bottom, right, left];
var start = 'start';
var end = 'end';
var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []); // modifiers that need to read the DOM

var beforeRead = 'beforeRead';
var read = 'read';
var afterRead = 'afterRead'; // pure-logic modifiers

var beforeMain = 'beforeMain';
var main = 'main';
var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

var beforeWrite = 'beforeWrite';
var write = 'write';
var afterWrite = 'afterWrite';
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

function order(modifiers) {
  var map = new Map();
  var visited = new Set();
  var result = [];
  modifiers.forEach(function (modifier) {
    map.set(modifier.name, modifier);
  }); // On visiting object, check for its dependencies and visit them recursively

  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function (dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);

        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }

  modifiers.forEach(function (modifier) {
    if (!visited.has(modifier.name)) {
      // check for visited object
      sort(modifier);
    }
  });
  return result;
}

function orderModifiers(modifiers) {
  // order based on dependencies
  var orderedModifiers = order(modifiers); // order based on phase

  return modifierPhases.reduce(function (acc, phase) {
    return acc.concat(orderedModifiers.filter(function (modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}

function debounce(fn) {
  var pending;
  return function () {
    if (!pending) {
      pending = new Promise(function (resolve) {
        Promise.resolve().then(function () {
          pending = undefined;
          resolve(fn());
        });
      });
    }

    return pending;
  };
}

function format(str) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return [].concat(args).reduce(function (p, c) {
    return p.replace(/%s/, c);
  }, str);
}

var INVALID_MODIFIER_ERROR = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s';
var MISSING_DEPENDENCY_ERROR = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available';
var VALID_PROPERTIES = ['name', 'enabled', 'phase', 'fn', 'effect', 'requires', 'options'];
function validateModifiers(modifiers) {
  modifiers.forEach(function (modifier) {
    Object.keys(modifier).forEach(function (key) {
      switch (key) {
        case 'name':
          if (typeof modifier.name !== 'string') {
            console.error(format(INVALID_MODIFIER_ERROR, String(modifier.name), '"name"', '"string"', "\"" + String(modifier.name) + "\""));
          }

          break;

        case 'enabled':
          if (typeof modifier.enabled !== 'boolean') {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"enabled"', '"boolean"', "\"" + String(modifier.enabled) + "\""));
          }

        case 'phase':
          if (modifierPhases.indexOf(modifier.phase) < 0) {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"phase"', "either " + modifierPhases.join(', '), "\"" + String(modifier.phase) + "\""));
          }

          break;

        case 'fn':
          if (typeof modifier.fn !== 'function') {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"fn"', '"function"', "\"" + String(modifier.fn) + "\""));
          }

          break;

        case 'effect':
          if (typeof modifier.effect !== 'function') {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"effect"', '"function"', "\"" + String(modifier.fn) + "\""));
          }

          break;

        case 'requires':
          if (!Array.isArray(modifier.requires)) {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"requires"', '"array"', "\"" + String(modifier.requires) + "\""));
          }

          break;

        case 'requiresIfExists':
          if (!Array.isArray(modifier.requiresIfExists)) {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"requiresIfExists"', '"array"', "\"" + String(modifier.requiresIfExists) + "\""));
          }

          break;

        case 'options':
        case 'data':
          break;

        default:
          console.error("PopperJS: an invalid property has been provided to the \"" + modifier.name + "\" modifier, valid properties are " + VALID_PROPERTIES.map(function (s) {
            return "\"" + s + "\"";
          }).join(', ') + "; but \"" + key + "\" was provided.");}


      modifier.requires && modifier.requires.forEach(function (requirement) {
        if (modifiers.find(function (mod) {
          return mod.name === requirement;
        }) == null) {
          console.error(format(MISSING_DEPENDENCY_ERROR, String(modifier.name), requirement, requirement));
        }
      });
    });
  });
}

function uniqueBy(arr, fn) {
  var identifiers = new Set();
  return arr.filter(function (item) {
    var identifier = fn(item);

    if (!identifiers.has(identifier)) {
      identifiers.add(identifier);
      return true;
    }
  });
}

function getBasePlacement(placement) {
  return placement.split('-')[0];
}

function mergeByName(modifiers) {
  var merged = modifiers.reduce(function (merged, current) {
    var existing = merged[current.name];
    merged[current.name] = existing ? _extends(_extends(_extends({}, existing), current), {}, {
      options: _extends(_extends({}, existing.options), current.options),
      data: _extends(_extends({}, existing.data), current.data) }) :
    current;
    return merged;
  }, {}); // IE11 does not support Object.values

  return Object.keys(merged).map(function (key) {
    return merged[key];
  });
}

function getVariation(placement) {
  return placement.split('-')[1];
}

function getMainAxisFromPlacement(placement) {
  return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
}

function computeOffsets(_ref) {
  var reference = _ref.reference,
  element = _ref.element,
  placement = _ref.placement;
  var basePlacement = placement ? getBasePlacement(placement) : null;
  var variation = placement ? getVariation(placement) : null;
  var commonX = reference.x + reference.width / 2 - element.width / 2;
  var commonY = reference.y + reference.height / 2 - element.height / 2;
  var offsets;

  switch (basePlacement) {
    case top:
      offsets = {
        x: commonX,
        y: reference.y - element.height };

      break;

    case bottom:
      offsets = {
        x: commonX,
        y: reference.y + reference.height };

      break;

    case right:
      offsets = {
        x: reference.x + reference.width,
        y: commonY };

      break;

    case left:
      offsets = {
        x: reference.x - element.width,
        y: commonY };

      break;

    default:
      offsets = {
        x: reference.x,
        y: reference.y };}



  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;

  if (mainAxis != null) {
    var len = mainAxis === 'y' ? 'height' : 'width';

    switch (variation) {
      case start:
        offsets[mainAxis] = Math.floor(offsets[mainAxis]) - Math.floor(reference[len] / 2 - element[len] / 2);
        break;

      case end:
        offsets[mainAxis] = Math.floor(offsets[mainAxis]) + Math.ceil(reference[len] / 2 - element[len] / 2);
        break;}

  }

  return offsets;
}

var INVALID_ELEMENT_ERROR = 'Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.';
var INFINITE_LOOP_ERROR = 'Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.';
var DEFAULT_OPTIONS = {
  placement: 'bottom',
  modifiers: [],
  strategy: 'absolute' };


function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return !args.some(function (element) {
    return !(element && typeof element.getBoundingClientRect === 'function');
  });
}

function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }

  var _generatorOptions = generatorOptions,
  _generatorOptions$def = _generatorOptions.defaultModifiers,
  defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
  _generatorOptions$def2 = _generatorOptions.defaultOptions,
  defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper(reference, popper, options) {
    if (options === void 0) {
      options = defaultOptions;
    }

    var state = {
      placement: 'bottom',
      orderedModifiers: [],
      options: _extends(_extends({}, DEFAULT_OPTIONS), defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference,
        popper: popper },

      attributes: {},
      styles: {} };

    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state: state,
      setOptions: function setOptions(options) {
        cleanupModifierEffects();
        state.options = _extends(_extends(_extends({}, defaultOptions), state.options), options);
        state.scrollParents = {
          reference: isElement(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
          popper: listScrollParents(popper) };
        // Orders the modifiers based on their dependencies and `phase`
        // properties

        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

        state.orderedModifiers = orderedModifiers.filter(function (m) {
          return m.enabled;
        }); // Validate the provided modifiers so that the consumer will get warned
        // if one of the modifiers is invalid for any reason

        if (true) {
          var modifiers = uniqueBy([].concat(orderedModifiers, state.options.modifiers), function (_ref) {
            var name = _ref.name;
            return name;
          });
          validateModifiers(modifiers);

          if (getBasePlacement(state.options.placement) === auto) {
            var flipModifier = state.orderedModifiers.find(function (_ref2) {
              var name = _ref2.name;
              return name === 'flip';
            });

            if (!flipModifier) {
              console.error(['Popper: "auto" placements require the "flip" modifier be', 'present and enabled to work.'].join(' '));
            }
          }

          var _getComputedStyle = getComputedStyle(popper),
          marginTop = _getComputedStyle.marginTop,
          marginRight = _getComputedStyle.marginRight,
          marginBottom = _getComputedStyle.marginBottom,
          marginLeft = _getComputedStyle.marginLeft; // We no longer take into account `margins` on the popper, and it can
          // cause bugs with positioning, so we'll warn the consumer


          if ([marginTop, marginRight, marginBottom, marginLeft].some(function (margin) {
            return parseFloat(margin);
          })) {
            console.warn(['Popper: CSS "margin" styles cannot be used to apply padding', 'between the popper and its reference element or boundary.', 'To replicate margin, use the `offset` modifier, as well as', 'the `padding` option in the `preventOverflow` and `flip`', 'modifiers.'].join(' '));
          }
        }

        runModifierEffects();
        return instance.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }

        var _state$elements = state.elements,
        reference = _state$elements.reference,
        popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
        // anymore

        if (!areValidElements(reference, popper)) {
          if (true) {
            console.error(INVALID_ELEMENT_ERROR);
          }

          return;
        } // Store the reference and popper rects to be read by modifiers


        state.rects = {
          reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === 'fixed'),
          popper: getLayoutRect(popper) };
        // Modifiers have the ability to reset the current update cycle. The
        // most common use case for this is the `flip` modifier changing the
        // placement, which then needs to re-run all the modifiers, because the
        // logic was previously ran for the previous placement and is therefore
        // stale/incorrect

        state.reset = false;
        state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
        // is filled with the initial data specified by the modifier. This means
        // it doesn't persist and is fresh on each update.
        // To ensure persistent data, use `${name}#persistent`

        state.orderedModifiers.forEach(function (modifier) {
          return state.modifiersData[modifier.name] = _extends({}, modifier.data);
        });
        var __debug_loops__ = 0;

        for (var index = 0; index < state.orderedModifiers.length; index++) {
          if (true) {
            __debug_loops__ += 1;

            if (__debug_loops__ > 100) {
              console.error(INFINITE_LOOP_ERROR);
              break;
            }
          }

          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }

          var _state$orderedModifie = state.orderedModifiers[index],
          fn = _state$orderedModifie.fn,
          _state$orderedModifie2 = _state$orderedModifie.options,
          _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
          name = _state$orderedModifie.name;

          if (typeof fn === 'function') {
            state = fn({
              state: state,
              options: _options,
              name: name,
              instance: instance }) ||
            state;
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: debounce(function () {
        return new Promise(function (resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      } };


    if (!areValidElements(reference, popper)) {
      if (true) {
        console.error(INVALID_ELEMENT_ERROR);
      }

      return instance;
    }

    instance.setOptions(options).then(function (state) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state);
      }
    }); // Modifiers have the ability to execute arbitrary code before the first
    // update cycle runs. They will be executed in the same order as the update
    // cycle. This is useful when a modifier adds some persistent data that
    // other modifiers need to use, but the modifier is run after the dependent
    // one.

    function runModifierEffects() {
      state.orderedModifiers.forEach(function (_ref3) {
        var name = _ref3.name,
        _ref3$options = _ref3.options,
        options = _ref3$options === void 0 ? {} : _ref3$options,
        effect = _ref3.effect;

        if (typeof effect === 'function') {
          var cleanupFn = effect({
            state: state,
            name: name,
            instance: instance,
            options: options });


          var noopFn = function noopFn() {};

          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }

    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function (fn) {
        return fn();
      });
      effectCleanupFns = [];
    }

    return instance;
  };
}

var passive = {
  passive: true };


function effect(_ref) {
  var state = _ref.state,
  instance = _ref.instance,
  options = _ref.options;
  var _options$scroll = options.scroll,
  scroll = _options$scroll === void 0 ? true : _options$scroll,
  _options$resize = options.resize,
  resize = _options$resize === void 0 ? true : _options$resize;
  var window = getWindow(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

  if (scroll) {
    scrollParents.forEach(function (scrollParent) {
      scrollParent.addEventListener('scroll', instance.update, passive);
    });
  }

  if (resize) {
    window.addEventListener('resize', instance.update, passive);
  }

  return function () {
    if (scroll) {
      scrollParents.forEach(function (scrollParent) {
        scrollParent.removeEventListener('scroll', instance.update, passive);
      });
    }

    if (resize) {
      window.removeEventListener('resize', instance.update, passive);
    }
  };
} // eslint-disable-next-line import/no-unused-modules


var eventListeners = {
  name: 'eventListeners',
  enabled: true,
  phase: 'write',
  fn: function fn() {},
  effect: effect,
  data: {} };


function popperOffsets(_ref) {
  var state = _ref.state,
  name = _ref.name; // Offsets are the actual position the popper needs to have to be
  // properly positioned near its reference element
  // This is the most basic placement, and will be adjusted by
  // the modifiers in the next step

  state.modifiersData[name] = computeOffsets({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: 'absolute',
    placement: state.placement });

} // eslint-disable-next-line import/no-unused-modules


var popperOffsets$1 = {
  name: 'popperOffsets',
  enabled: true,
  phase: 'read',
  fn: popperOffsets,
  data: {} };


var unsetSides = {
  top: 'auto',
  right: 'auto',
  bottom: 'auto',
  left: 'auto' };
// Round the offsets to the nearest suitable subpixel based on the DPR.
// Zooming can change the DPR, but it seems to report a value that will
// cleanly divide the values into the appropriate subpixels.

function roundOffsets(_ref) {
  var x = _ref.x,
  y = _ref.y;
  var win = window;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: Math.round(x * dpr) / dpr || 0,
    y: Math.round(y * dpr) / dpr || 0 };

}

function mapToStyles(_ref2) {
  var _Object$assign2;

  var popper = _ref2.popper,
  popperRect = _ref2.popperRect,
  placement = _ref2.placement,
  offsets = _ref2.offsets,
  position = _ref2.position,
  gpuAcceleration = _ref2.gpuAcceleration,
  adaptive = _ref2.adaptive;

  var _roundOffsets = roundOffsets(offsets),
  x = _roundOffsets.x,
  y = _roundOffsets.y;

  var hasX = offsets.hasOwnProperty('x');
  var hasY = offsets.hasOwnProperty('y');
  var sideX = left;
  var sideY = top;
  var win = window;

  if (adaptive) {
    var offsetParent = getOffsetParent(popper);

    if (offsetParent === getWindow(popper)) {
      offsetParent = getDocumentElement(popper);
    } // $FlowFixMe: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it

    /*:: offsetParent = (offsetParent: Element); */


    if (placement === top) {
      sideY = bottom;
      y -= offsetParent.clientHeight - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }

    if (placement === left) {
      sideX = right;
      x -= offsetParent.clientWidth - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }

  var commonStyles = _extends({
    position: position },
  adaptive && unsetSides);

  if (gpuAcceleration) {
    var _Object$assign;

    return _extends(_extends({}, commonStyles), {}, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) < 2 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }

  return _extends(_extends({}, commonStyles), {}, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
}

function computeStyles(_ref3) {
  var state = _ref3.state,
  options = _ref3.options;
  var _options$gpuAccelerat = options.gpuAcceleration,
  gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
  _options$adaptive = options.adaptive,
  adaptive = _options$adaptive === void 0 ? true : _options$adaptive;

  if (true) {
    var transitionProperty = getComputedStyle(state.elements.popper).transitionProperty || '';

    if (adaptive && ['transform', 'top', 'right', 'bottom', 'left'].some(function (property) {
      return transitionProperty.indexOf(property) >= 0;
    })) {
      console.warn(['Popper: Detected CSS transitions on at least one of the following', 'CSS properties: "transform", "top", "right", "bottom", "left".', '\n\n', 'Disable the "computeStyles" modifier\'s `adaptive` option to allow', 'for smooth transitions, or remove these properties from the CSS', 'transition declaration on the popper element if only transitioning', 'opacity or background-color for example.', '\n\n', 'We recommend using the popper element as a wrapper around an inner', 'element that can have any CSS property transitioned for animations.'].join(' '));
    }
  }

  var commonStyles = {
    placement: getBasePlacement(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration: gpuAcceleration };


  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = _extends(_extends({}, state.styles.popper), mapToStyles(_extends(_extends({}, commonStyles), {}, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive: adaptive })));

  }

  if (state.modifiersData.arrow != null) {
    state.styles.arrow = _extends(_extends({}, state.styles.arrow), mapToStyles(_extends(_extends({}, commonStyles), {}, {
      offsets: state.modifiersData.arrow,
      position: 'absolute',
      adaptive: false })));

  }

  state.attributes.popper = _extends(_extends({}, state.attributes.popper), {}, {
    'data-popper-placement': state.placement });

} // eslint-disable-next-line import/no-unused-modules


var computeStyles$1 = {
  name: 'computeStyles',
  enabled: true,
  phase: 'beforeWrite',
  fn: computeStyles,
  data: {} };


// and applies them to the HTMLElements such as popper and arrow

function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function (name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name]; // arrow is optional + virtual elements

    if (!isHTMLElement(element) || !getNodeName(element)) {
      return;
    } // Flow doesn't support to extend this property, but it's the most
    // effective way to apply styles to an HTMLElement
    // $FlowFixMe


    _extends(element.style, style);

    Object.keys(attributes).forEach(function (name) {
      var value = attributes[name];

      if (value === false) {
        element.removeAttribute(name);
      } else {
        element.setAttribute(name, value === true ? '' : value);
      }
    });
  });
}

function effect$1(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: '0',
      top: '0',
      margin: '0' },

    arrow: {
      position: 'absolute' },

    reference: {} };


  _extends(state.elements.popper.style, initialStyles.popper);

  if (state.elements.arrow) {
    _extends(state.elements.arrow.style, initialStyles.arrow);
  }

  return function () {
    Object.keys(state.elements).forEach(function (name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

      var style = styleProperties.reduce(function (style, property) {
        style[property] = '';
        return style;
      }, {}); // arrow is optional + virtual elements

      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      } // Flow doesn't support to extend this property, but it's the most
      // effective way to apply styles to an HTMLElement
      // $FlowFixMe


      _extends(element.style, style);

      Object.keys(attributes).forEach(function (attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
} // eslint-disable-next-line import/no-unused-modules


var applyStyles$1 = {
  name: 'applyStyles',
  enabled: true,
  phase: 'write',
  fn: applyStyles,
  effect: effect$1,
  requires: ['computeStyles'] };


var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1];
var createPopper = /*#__PURE__*/popperGenerator({
  defaultModifiers: defaultModifiers });
// eslint-disable-next-line import/no-unused-modules
exports.createPopper = createPopper;
function distanceAndSkiddingToXY(placement, rects, offset) {
  var basePlacement = getBasePlacement(placement);
  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;

  var _ref = typeof offset === 'function' ? offset(_extends(_extends({}, rects), {}, {
    placement: placement })) :
  offset,
  skidding = _ref[0],
  distance = _ref[1];

  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [left, right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding } :
  {
    x: skidding,
    y: distance };

}

function offset(_ref2) {
  var state = _ref2.state,
  options = _ref2.options,
  name = _ref2.name;
  var _options$offset = options.offset,
  offset = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = placements.reduce(function (acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement],
  x = _data$state$placement.x,
  y = _data$state$placement.y;

  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


var offset$1 = {
  name: 'offset',
  enabled: true,
  phase: 'main',
  requires: ['popperOffsets'],
  fn: offset };exports.offsetModifier = offset$1;

/***/ }),
/* 152 */
/*!*************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/progress/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _utils = __webpack_require__(/*! ../utils */ 17);

var _createNamespace = (0, _utils.createNamespace)('progress'),
createComponent = _createNamespace[0],
bem = _createNamespace[1];var _default =

createComponent({
  props: {
    color: String,
    inactive: Boolean,
    pivotText: String,
    textColor: String,
    pivotColor: String,
    trackColor: String,
    strokeWidth: [Number, String],
    percentage: {
      type: [Number, String],
      required: true,
      validator: function validator(value) {
        return value >= 0 && value <= 100;
      } },

    showPivot: {
      type: Boolean,
      default: true } },


  data: function data() {
    return {
      pivotWidth: 0,
      progressWidth: 0 };

  },
  mounted: function mounted() {
    this.resize();
  },
  watch: {
    showPivot: 'resize',
    pivotText: 'resize' },

  methods: {
    // @exposed-api
    resize: function resize() {
      var _this = this;

      this.$nextTick(function () {
        _this.progressWidth = _this.$el.offsetWidth;
        _this.pivotWidth = _this.$refs.pivot ? _this.$refs.pivot.offsetWidth : 0;
      });
    } },

  render: function render() {
    var h = arguments[0];
    var pivotText = this.pivotText,
    percentage = this.percentage;
    var text = pivotText != null ? pivotText : percentage + '%';
    var showPivot = this.showPivot && text;
    var background = this.inactive ? '#cacaca' : this.color;
    var pivotStyle = {
      color: this.textColor,
      left: (this.progressWidth - this.pivotWidth) * percentage / 100 + "px",
      background: this.pivotColor || background };

    var portionStyle = {
      background: background,
      width: this.progressWidth * percentage / 100 + 'px' };

    var wrapperStyle = {
      background: this.trackColor,
      height: (0, _utils.addUnit)(this.strokeWidth) };

    return h("div", {
      "class": bem(),
      "style": wrapperStyle },
    [h("span", {
      "class": bem('portion'),
      "style": portionStyle },
    [showPivot && h("span", {
      "ref": "pivot",
      "style": pivotStyle,
      "class": bem('pivot') },
    [text])])]);
  } });exports.default = _default;

/***/ }),
/* 153 */
/*!*****************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/pull-refresh/index.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _utils = __webpack_require__(/*! ../utils */ 17);
var _event = __webpack_require__(/*! ../utils/dom/event */ 34);
var _scroll = __webpack_require__(/*! ../utils/dom/scroll */ 36);

var _touch = __webpack_require__(/*! ../mixins/touch */ 37);

var _loading = _interopRequireDefault(__webpack_require__(/*! ../loading */ 44));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // Utils
// Mixins
// Components
var _createNamespace = (0, _utils.createNamespace)('pull-refresh'),createComponent = _createNamespace[0],
bem = _createNamespace[1],
t = _createNamespace[2];

var DEFAULT_HEAD_HEIGHT = 50;
var TEXT_STATUS = ['pulling', 'loosing', 'success'];var _default =
createComponent({
  mixins: [_touch.TouchMixin],
  props: {
    disabled: Boolean,
    successText: String,
    pullingText: String,
    loosingText: String,
    loadingText: String,
    value: {
      type: Boolean,
      required: true },

    successDuration: {
      type: [Number, String],
      default: 500 },

    animationDuration: {
      type: [Number, String],
      default: 300 },

    headHeight: {
      type: [Number, String],
      default: DEFAULT_HEAD_HEIGHT } },


  data: function data() {
    return {
      status: 'normal',
      distance: 0,
      duration: 0 };

  },
  computed: {
    touchable: function touchable() {
      return this.status !== 'loading' && this.status !== 'success' && !this.disabled;
    },
    headStyle: function headStyle() {
      if (this.headHeight !== DEFAULT_HEAD_HEIGHT) {
        return {
          height: this.headHeight + "px" };

      }
    } },

  watch: {
    value: function value(loading) {
      this.duration = this.animationDuration;

      if (loading) {
        this.setStatus(+this.headHeight, true);
      } else if (this.slots('success') || this.successText) {
        this.showSuccessTip();
      } else {
        this.setStatus(0, false);
      }
    } },

  mounted: function mounted() {
    this.bindTouchEvent(this.$refs.track);
    this.scrollEl = (0, _scroll.getScroller)(this.$el);
  },
  methods: {
    checkPullStart: function checkPullStart(event) {
      this.ceiling = (0, _scroll.getScrollTop)(this.scrollEl) === 0;

      if (this.ceiling) {
        this.duration = 0;
        this.touchStart(event);
      }
    },
    onTouchStart: function onTouchStart(event) {
      if (this.touchable) {
        this.checkPullStart(event);
      }
    },
    onTouchMove: function onTouchMove(event) {
      if (!this.touchable) {
        return;
      }

      if (!this.ceiling) {
        this.checkPullStart(event);
      }

      this.touchMove(event);

      if (this.ceiling && this.deltaY >= 0 && this.direction === 'vertical') {
        (0, _event.preventDefault)(event);
        this.setStatus(this.ease(this.deltaY));
      }
    },
    onTouchEnd: function onTouchEnd() {
      var _this = this;

      if (this.touchable && this.ceiling && this.deltaY) {
        this.duration = this.animationDuration;

        if (this.status === 'loosing') {
          this.setStatus(+this.headHeight, true);
          this.$emit('input', true); // ensure value change can be watched

          this.$nextTick(function () {
            _this.$emit('refresh');
          });
        } else {
          this.setStatus(0);
        }
      }
    },
    ease: function ease(distance) {
      var headHeight = +this.headHeight;

      if (distance > headHeight) {
        if (distance < headHeight * 2) {
          distance = headHeight + (distance - headHeight) / 2;
        } else {
          distance = headHeight * 1.5 + (distance - headHeight * 2) / 4;
        }
      }

      return Math.round(distance);
    },
    setStatus: function setStatus(distance, isLoading) {
      var status;

      if (isLoading) {
        status = 'loading';
      } else if (distance === 0) {
        status = 'normal';
      } else {
        status = distance < this.headHeight ? 'pulling' : 'loosing';
      }

      this.distance = distance;

      if (status !== this.status) {
        this.status = status;
      }
    },
    genStatus: function genStatus() {
      var h = this.$createElement;
      var status = this.status,
      distance = this.distance;
      var slot = this.slots(status, {
        distance: distance });


      if (slot) {
        return slot;
      }

      var nodes = [];
      var text = this[status + "Text"] || t(status);

      if (TEXT_STATUS.indexOf(status) !== -1) {
        nodes.push(h("div", {
          "class": bem('text') },
        [text]));
      }

      if (status === 'loading') {
        nodes.push(h(_loading.default, {
          "attrs": {
            "size": "16" } },

        [text]));
      }

      return nodes;
    },
    showSuccessTip: function showSuccessTip() {
      var _this2 = this;

      this.status = 'success';
      setTimeout(function () {
        _this2.setStatus(0);
      }, this.successDuration);
    } },

  render: function render() {
    var h = arguments[0];
    var trackStyle = {
      transitionDuration: this.duration + "ms",
      transform: this.distance ? "translate3d(0," + this.distance + "px, 0)" : '' };

    return h("div", {
      "class": bem() },
    [h("div", {
      "ref": "track",
      "class": bem('track'),
      "style": trackStyle },
    [h("div", {
      "class": bem('head'),
      "style": this.headStyle },
    [this.genStatus()]), this.slots()])]);
  } });exports.default = _default;

/***/ }),
/* 154 */
/*!*********************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/rate/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _utils = __webpack_require__(/*! ../utils */ 17);
var _event = __webpack_require__(/*! ../utils/dom/event */ 34);

var _touch = __webpack_require__(/*! ../mixins/touch */ 37);
var _field = __webpack_require__(/*! ../mixins/field */ 73);

var _icon = _interopRequireDefault(__webpack_require__(/*! ../icon */ 41));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // Utils
// Mixins
// Components
var _createNamespace = (0, _utils.createNamespace)('rate'),createComponent = _createNamespace[0],
bem = _createNamespace[1];

function getRateStatus(value, index, allowHalf) {
  if (value >= index) {
    return 'full';
  }

  if (value + 0.5 >= index && allowHalf) {
    return 'half';
  }

  return 'void';
}var _default =

createComponent({
  mixins: [_touch.TouchMixin, _field.FieldMixin],
  props: {
    size: [Number, String],
    color: String,
    gutter: [Number, String],
    readonly: Boolean,
    disabled: Boolean,
    allowHalf: Boolean,
    voidColor: String,
    iconPrefix: String,
    disabledColor: String,
    value: {
      type: Number,
      default: 0 },

    icon: {
      type: String,
      default: 'star' },

    voidIcon: {
      type: String,
      default: 'star-o' },

    count: {
      type: [Number, String],
      default: 5 },

    touchable: {
      type: Boolean,
      default: true } },


  computed: {
    list: function list() {
      var list = [];

      for (var i = 1; i <= this.count; i++) {
        list.push(getRateStatus(this.value, i, this.allowHalf));
      }

      return list;
    },
    sizeWithUnit: function sizeWithUnit() {
      return (0, _utils.addUnit)(this.size);
    },
    gutterWithUnit: function gutterWithUnit() {
      return (0, _utils.addUnit)(this.gutter);
    } },

  mounted: function mounted() {
    this.bindTouchEvent(this.$el);
  },
  methods: {
    select: function select(index) {
      if (!this.disabled && !this.readonly && index !== this.value) {
        this.$emit('input', index);
        this.$emit('change', index);
      }
    },
    onTouchStart: function onTouchStart(event) {
      var _this = this;

      if (this.readonly || this.disabled || !this.touchable) {
        return;
      }

      this.touchStart(event);
      var rects = this.$refs.items.map(function (item) {
        return item.getBoundingClientRect();
      });
      var ranges = [];
      rects.forEach(function (rect, index) {
        if (_this.allowHalf) {
          ranges.push({
            score: index + 0.5,
            left: rect.left },
          {
            score: index + 1,
            left: rect.left + rect.width / 2 });

        } else {
          ranges.push({
            score: index + 1,
            left: rect.left });

        }
      });
      this.ranges = ranges;
    },
    onTouchMove: function onTouchMove(event) {
      if (this.readonly || this.disabled || !this.touchable) {
        return;
      }

      this.touchMove(event);

      if (this.direction === 'horizontal') {
        (0, _event.preventDefault)(event);
        var clientX = event.touches[0].clientX;
        this.select(this.getScoreByPosition(clientX));
      }
    },
    getScoreByPosition: function getScoreByPosition(x) {
      for (var i = this.ranges.length - 1; i > 0; i--) {
        if (x > this.ranges[i].left) {
          return this.ranges[i].score;
        }
      }

      return this.allowHalf ? 0.5 : 1;
    },
    genStar: function genStar(status, index) {
      var _this2 = this;

      var h = this.$createElement;
      var icon = this.icon,
      color = this.color,
      count = this.count,
      voidIcon = this.voidIcon,
      disabled = this.disabled,
      voidColor = this.voidColor,
      disabledColor = this.disabledColor;
      var score = index + 1;
      var isFull = status === 'full';
      var isVoid = status === 'void';
      var style;

      if (this.gutterWithUnit && score !== +count) {
        style = {
          paddingRight: this.gutterWithUnit };

      }

      return h("div", {
        "ref": "items",
        "refInFor": true,
        "key": index,
        "attrs": {
          "role": "radio",
          "tabindex": "0",
          "aria-setsize": count,
          "aria-posinset": score,
          "aria-checked": String(!isVoid) },

        "style": style,
        "class": bem('item') },
      [h(_icon.default, {
        "attrs": {
          "size": this.sizeWithUnit,
          "name": isFull ? icon : voidIcon,
          "color": disabled ? disabledColor : isFull ? color : voidColor,
          "classPrefix": this.iconPrefix,
          "data-score": score },

        "class": bem('icon', {
          disabled: disabled,
          full: isFull }),

        "on": {
          "click": function click() {
            _this2.select(score);
          } } }),

      this.allowHalf && h(_icon.default, {
        "attrs": {
          "size": this.sizeWithUnit,
          "name": isVoid ? voidIcon : icon,
          "color": disabled ? disabledColor : isVoid ? voidColor : color,
          "classPrefix": this.iconPrefix,
          "data-score": score - 0.5 },

        "class": bem('icon', ['half', {
          disabled: disabled,
          full: !isVoid }]),

        "on": {
          "click": function click() {
            _this2.select(score - 0.5);
          } } })]);


    } },

  render: function render() {
    var _this3 = this;

    var h = arguments[0];
    return h("div", {
      "class": bem({
        readonly: this.readonly,
        disabled: this.disabled }),

      "attrs": {
        "tabindex": "0",
        "role": "radiogroup" } },

    [this.list.map(function (status, index) {
      return _this3.genStar(status, index);
    })]);
  } });exports.default = _default;

/***/ }),
/* 155 */
/*!********************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/row/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _utils = __webpack_require__(/*! ../utils */ 17);
var _relation = __webpack_require__(/*! ../mixins/relation */ 67);

var _createNamespace = (0, _utils.createNamespace)('row'),
createComponent = _createNamespace[0],
bem = _createNamespace[1];var _default =

createComponent({
  mixins: [(0, _relation.ParentMixin)('vanRow')],
  props: {
    type: String,
    align: String,
    justify: String,
    tag: {
      type: String,
      default: 'div' },

    gutter: {
      type: [Number, String],
      default: 0 } },


  computed: {
    spaces: function spaces() {
      var gutter = Number(this.gutter);

      if (!gutter) {
        return;
      }

      var spaces = [];
      var groups = [[]];
      var totalSpan = 0;
      this.children.forEach(function (item, index) {
        totalSpan += Number(item.span);

        if (totalSpan > 24) {
          groups.push([index]);
          totalSpan -= 24;
        } else {
          groups[groups.length - 1].push(index);
        }
      });
      groups.forEach(function (group) {
        var averagePadding = gutter * (group.length - 1) / group.length;
        group.forEach(function (item, index) {
          if (index === 0) {
            spaces.push({
              right: averagePadding });

          } else {
            var left = gutter - spaces[item - 1].right;
            var right = averagePadding - left;
            spaces.push({
              left: left,
              right: right });

          }
        });
      });
      return spaces;
    } },

  methods: {
    onClick: function onClick(event) {
      this.$emit('click', event);
    } },

  render: function render() {
    var _bem;

    var h = arguments[0];
    var align = this.align,
    justify = this.justify;
    var flex = this.type === 'flex';
    return h(this.tag, {
      "class": bem((_bem = {
        flex: flex },
      _bem["align-" + align] = flex && align, _bem["justify-" + justify] = flex && justify, _bem)),
      "on": {
        "click": this.onClick } },

    [this.slots()]);
  } });exports.default = _default;

/***/ }),
/* 156 */
/*!***********************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/search/index.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _babelHelperVueJsxMergeProps = _interopRequireDefault(__webpack_require__(/*! @vue/babel-helper-vue-jsx-merge-props */ 16));

var _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/esm/extends */ 15));

var _utils = __webpack_require__(/*! ../utils */ 17);
var _functional = __webpack_require__(/*! ../utils/functional */ 29);
var _event = __webpack_require__(/*! ../utils/dom/event */ 34);

var _field = _interopRequireDefault(__webpack_require__(/*! ../field */ 57));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // Utils
// Components
// Types
var _createNamespace = (0, _utils.createNamespace)('search'),createComponent = _createNamespace[0],
bem = _createNamespace[1],
t = _createNamespace[2];

function Search(h, props, slots, ctx) {
  function Label() {
    if (slots.label || props.label) {
      return h("div", {
        "class": bem('label') },
      [slots.label ? slots.label() : props.label]);
    }
  }

  function Action() {
    if (!props.showAction) {
      return;
    }

    function onCancel() {
      if (slots.action) {
        return;
      }

      (0, _functional.emit)(ctx, 'input', '');
      (0, _functional.emit)(ctx, 'cancel');
    }

    return h("div", {
      "class": bem('action'),
      "attrs": {
        "role": "button",
        "tabindex": "0" },

      "on": {
        "click": onCancel } },

    [slots.action ? slots.action() : props.actionText || t('cancel')]);
  }

  var fieldData = {
    attrs: ctx.data.attrs,
    on: (0, _extends2.default)({}, ctx.listeners, {
      keypress: function keypress(event) {
        // press enter
        if (event.keyCode === 13) {
          (0, _event.preventDefault)(event);
          (0, _functional.emit)(ctx, 'search', props.value);
        }

        (0, _functional.emit)(ctx, 'keypress', event);
      } }) };


  var inheritData = (0, _functional.inherit)(ctx);
  inheritData.attrs = undefined;
  return h("div", (0, _babelHelperVueJsxMergeProps.default)([{
    "class": bem({
      'show-action': props.showAction }),

    "style": {
      background: props.background } },

  inheritData]), [slots.left == null ? void 0 : slots.left(), h("div", {
    "class": bem('content', props.shape) },
  [Label(), h(_field.default, (0, _babelHelperVueJsxMergeProps.default)([{
    "attrs": {
      "type": "search",
      "border": false,
      "value": props.value,
      "leftIcon": props.leftIcon,
      "rightIcon": props.rightIcon,
      "clearable": props.clearable,
      "clearTrigger": props.clearTrigger },

    "scopedSlots": {
      'left-icon': slots['left-icon'],
      'right-icon': slots['right-icon'] } },

  fieldData]))]), Action()]);
}

Search.props = {
  value: String,
  label: String,
  rightIcon: String,
  actionText: String,
  background: String,
  showAction: Boolean,
  clearTrigger: String,
  shape: {
    type: String,
    default: 'square' },

  clearable: {
    type: Boolean,
    default: true },

  leftIcon: {
    type: String,
    default: 'search' } };var _default =


createComponent(Search);exports.default = _default;

/***/ }),
/* 157 */
/*!****************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/share-sheet/index.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/esm/extends */ 15));

var _utils = __webpack_require__(/*! ../utils */ 17);

var _popup = __webpack_require__(/*! ../mixins/popup */ 30);

var _popup2 = _interopRequireDefault(__webpack_require__(/*! ../popup */ 43));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // Utils
// Mixins
// Components
var PRESET_ICONS = ['qq', 'link', 'weibo', 'wechat', 'poster', 'qrcode', 'weapp-qrcode', 'wechat-moments'];var _createNamespace = (0, _utils.createNamespace)('share-sheet'),
createComponent = _createNamespace[0],
bem = _createNamespace[1],
t = _createNamespace[2];var _default2 =

createComponent({
  props: (0, _extends2.default)({}, _popup.popupMixinProps, {
    title: String,
    cancelText: String,
    description: String,
    getContainer: [String, Function],
    options: {
      type: Array,
      default: function _default() {
        return [];
      } },

    overlay: {
      type: Boolean,
      default: true },

    closeOnPopstate: {
      type: Boolean,
      default: true },

    safeAreaInsetBottom: {
      type: Boolean,
      default: true },

    closeOnClickOverlay: {
      type: Boolean,
      default: true } }),


  methods: {
    onCancel: function onCancel() {
      this.toggle(false);
      this.$emit('cancel');
    },
    onSelect: function onSelect(option, index) {
      this.$emit('select', option, index);
    },
    toggle: function toggle(val) {
      this.$emit('input', val);
    },
    getIconURL: function getIconURL(icon) {
      if (PRESET_ICONS.indexOf(icon) !== -1) {
        return "https://img01.yzcdn.cn/vant/share-sheet-" + icon + ".png";
      }

      return icon;
    },
    genHeader: function genHeader() {
      var h = this.$createElement;
      var title = this.slots('title') || this.title;
      var description = this.slots('description') || this.description;

      if (!title && !description) {
        return;
      }

      return h("div", {
        "class": bem('header') },
      [title && h("h2", {
        "class": bem('title') },
      [title]), description && h("span", {
        "class": bem('description') },
      [description])]);
    },
    genOptions: function genOptions(options, showBorder) {
      var _this = this;

      var h = this.$createElement;
      return h("div", {
        "class": bem('options', {
          border: showBorder }) },

      [options.map(function (option, index) {
        return h("div", {
          "attrs": {
            "role": "button",
            "tabindex": "0" },

          "class": [bem('option'), option.className],
          "on": {
            "click": function click() {
              _this.onSelect(option, index);
            } } },

        [h("img", {
          "attrs": {
            "src": _this.getIconURL(option.icon) },

          "class": bem('icon') }),
        option.name && h("span", {
          "class": bem('name') },
        [option.name]), option.description && h("span", {
          "class": bem('option-description') },
        [option.description])]);
      })]);
    },
    genRows: function genRows() {
      var _this2 = this;

      var options = this.options;

      if (Array.isArray(options[0])) {
        return options.map(function (item, index) {
          return _this2.genOptions(item, index !== 0);
        });
      }

      return this.genOptions(options);
    },
    genCancelText: function genCancelText() {
      var _this$cancelText;

      var h = this.$createElement;
      var cancelText = (_this$cancelText = this.cancelText) != null ? _this$cancelText : t('cancel');

      if (cancelText) {
        return h("button", {
          "attrs": {
            "type": "button" },

          "class": bem('cancel'),
          "on": {
            "click": this.onCancel } },

        [cancelText]);
      }
    },
    onClickOverlay: function onClickOverlay() {
      this.$emit('click-overlay');
    } },

  render: function render() {
    var h = arguments[0];
    return h(_popup2.default, {
      "attrs": {
        "round": true,
        "value": this.value,
        "position": "bottom",
        "overlay": this.overlay,
        "duration": this.duration,
        "lazyRender": this.lazyRender,
        "lockScroll": this.lockScroll,
        "getContainer": this.getContainer,
        "closeOnPopstate": this.closeOnPopstate,
        "closeOnClickOverlay": this.closeOnClickOverlay,
        "safeAreaInsetBottom": this.safeAreaInsetBottom },

      "class": bem(),
      "on": {
        "input": this.toggle,
        "click-overlay": this.onClickOverlay } },

    [this.genHeader(), this.genRows(), this.genCancelText()]);
  } });exports.default = _default2;

/***/ }),
/* 158 */
/*!************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/sidebar/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _utils = __webpack_require__(/*! ../utils */ 17);
var _relation = __webpack_require__(/*! ../mixins/relation */ 67);

var _createNamespace = (0, _utils.createNamespace)('sidebar'),
createComponent = _createNamespace[0],
bem = _createNamespace[1];var _default =

createComponent({
  mixins: [(0, _relation.ParentMixin)('vanSidebar')],
  model: {
    prop: 'activeKey' },

  props: {
    activeKey: {
      type: [Number, String],
      default: 0 } },


  data: function data() {
    return {
      index: +this.activeKey };

  },
  watch: {
    activeKey: function activeKey() {
      this.setIndex(+this.activeKey);
    } },

  methods: {
    setIndex: function setIndex(index) {
      if (index !== this.index) {
        this.index = index;
        this.$emit('change', index);
      }
    } },

  render: function render() {
    var h = arguments[0];
    return h("div", {
      "class": bem() },
    [this.slots()]);
  } });exports.default = _default;

/***/ }),
/* 159 */
/*!*****************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/sidebar-item/index.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/esm/extends */ 15));
var _utils = __webpack_require__(/*! ../utils */ 17);
var _relation = __webpack_require__(/*! ../mixins/relation */ 67);
var _router = __webpack_require__(/*! ../utils/router */ 55);
var _info = _interopRequireDefault(__webpack_require__(/*! ../info */ 42));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var _createNamespace = (0, _utils.createNamespace)('sidebar-item'),
createComponent = _createNamespace[0],
bem = _createNamespace[1];var _default =

createComponent({
  mixins: [(0, _relation.ChildrenMixin)('vanSidebar')],
  props: (0, _extends2.default)({}, _router.routeProps, {
    dot: Boolean,
    // @deprecated
    info: [Number, String],
    badge: [Number, String],
    title: String,
    disabled: Boolean }),

  computed: {
    select: function select() {
      return this.index === +this.parent.activeKey;
    } },

  methods: {
    onClick: function onClick() {
      if (this.disabled) {
        return;
      }

      this.$emit('click', this.index);
      this.parent.$emit('input', this.index);
      this.parent.setIndex(this.index);
      (0, _router.route)(this.$router, this);
    } },

  render: function render() {
    var _this$slots, _this$badge;

    var h = arguments[0];

    if ( true && this.info) {
      console.warn('[Vant] SidebarItem: "info" prop is deprecated, use "badge" prop instead.');
    }

    return h("a", {
      "class": bem({
        select: this.select,
        disabled: this.disabled }),

      "on": {
        "click": this.onClick } },

    [h("div", {
      "class": bem('text') },
    [(_this$slots = this.slots('title')) != null ? _this$slots : this.title, h(_info.default, {
      "attrs": {
        "dot": this.dot,
        "info": (_this$badge = this.badge) != null ? _this$badge : this.info },

      "class": bem('info') })])]);

  } });exports.default = _default;

/***/ }),
/* 160 */
/*!*************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/skeleton/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _babelHelperVueJsxMergeProps = _interopRequireDefault(__webpack_require__(/*! @vue/babel-helper-vue-jsx-merge-props */ 16));

var _utils = __webpack_require__(/*! ../utils */ 17);
var _functional = __webpack_require__(/*! ../utils/functional */ 29);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // Utils
// Types
var _createNamespace = (0, _utils.createNamespace)('skeleton'),
createComponent = _createNamespace[0],
bem = _createNamespace[1];

var DEFAULT_ROW_WIDTH = '100%';
var DEFAULT_LAST_ROW_WIDTH = '60%';

function Skeleton(h, props, slots, ctx) {
  if (!props.loading) {
    return slots.default && slots.default();
  }

  function Title() {
    if (props.title) {
      return h("h3", {
        "class": bem('title'),
        "style": {
          width: (0, _utils.addUnit)(props.titleWidth) } });


    }
  }

  function Rows() {
    var Rows = [];
    var rowWidth = props.rowWidth;

    function getRowWidth(index) {
      if (rowWidth === DEFAULT_ROW_WIDTH && index === +props.row - 1) {
        return DEFAULT_LAST_ROW_WIDTH;
      }

      if (Array.isArray(rowWidth)) {
        return rowWidth[index];
      }

      return rowWidth;
    }

    for (var i = 0; i < props.row; i++) {
      Rows.push(h("div", {
        "class": bem('row'),
        "style": {
          width: (0, _utils.addUnit)(getRowWidth(i)) } }));


    }

    return Rows;
  }

  function Avatar() {
    if (props.avatar) {
      var size = (0, _utils.addUnit)(props.avatarSize);
      return h("div", {
        "class": bem('avatar', props.avatarShape),
        "style": {
          width: size,
          height: size } });


    }
  }

  return h("div", (0, _babelHelperVueJsxMergeProps.default)([{
    "class": bem({
      animate: props.animate,
      round: props.round }) },

  (0, _functional.inherit)(ctx)]), [Avatar(), h("div", {
    "class": bem('content') },
  [Title(), Rows()])]);
}

Skeleton.props = {
  title: Boolean,
  round: Boolean,
  avatar: Boolean,
  titleWidth: [Number, String],
  avatarSize: [Number, String],
  row: {
    type: [Number, String],
    default: 0 },

  loading: {
    type: Boolean,
    default: true },

  animate: {
    type: Boolean,
    default: true },

  avatarShape: {
    type: String,
    default: 'round' },

  rowWidth: {
    type: [Number, String, Array],
    default: DEFAULT_ROW_WIDTH } };var _default =


createComponent(Skeleton);exports.default = _default;

/***/ }),
/* 161 */
/*!********************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/sku/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _lang = _interopRequireDefault(__webpack_require__(/*! ./lang */ 162));
var _constants = _interopRequireDefault(__webpack_require__(/*! ./constants */ 163));
var _skuHelper = _interopRequireDefault(__webpack_require__(/*! ./utils/sku-helper */ 164));

var _Sku = _interopRequireDefault(__webpack_require__(/*! ./Sku */ 165));
var _locale = _interopRequireDefault(__webpack_require__(/*! ../locale */ 21));
var _SkuActions = _interopRequireDefault(__webpack_require__(/*! ./components/SkuActions */ 180));
var _SkuHeader = _interopRequireDefault(__webpack_require__(/*! ./components/SkuHeader */ 166));
var _SkuHeaderItem = _interopRequireDefault(__webpack_require__(/*! ./components/SkuHeaderItem */ 167));
var _SkuMessages = _interopRequireDefault(__webpack_require__(/*! ./components/SkuMessages */ 173));
var _SkuStepper = _interopRequireDefault(__webpack_require__(/*! ./components/SkuStepper */ 171));
var _SkuRow = _interopRequireDefault(__webpack_require__(/*! ./components/SkuRow */ 168));
var _SkuRowItem = _interopRequireDefault(__webpack_require__(/*! ./components/SkuRowItem */ 169));
var _SkuRowPropItem = _interopRequireDefault(__webpack_require__(/*! ./components/SkuRowPropItem */ 170));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // Utils
// Components
_locale.default.add(_lang.default);_Sku.default.SkuActions = _SkuActions.default;
_Sku.default.SkuHeader = _SkuHeader.default;
_Sku.default.SkuHeaderItem = _SkuHeaderItem.default;
_Sku.default.SkuMessages = _SkuMessages.default;
_Sku.default.SkuStepper = _SkuStepper.default;
_Sku.default.SkuRow = _SkuRow.default;
_Sku.default.SkuRowItem = _SkuRowItem.default;
_Sku.default.SkuRowPropItem = _SkuRowPropItem.default;
_Sku.default.skuHelper = _skuHelper.default;
_Sku.default.skuConstants = _constants.default;var _default =
_Sku.default;exports.default = _default;

/***/ }),
/* 162 */
/*!*******************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/sku/lang.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * Sku only provide zh-CN lang by default
                                                                                                      */var _default =
{
  'zh-CN': {
    vanSku: {
      select: '请选择',
      selected: '已选',
      selectSku: '请先选择商品规格',
      soldout: '库存不足',
      originPrice: '原价',
      minusTip: '至少选择一件',
      minusStartTip: function minusStartTip(start) {
        return start + "\u4EF6\u8D77\u552E";
      },
      unavailable: '商品已经无法购买啦',
      stock: '剩余',
      stockUnit: '件',
      quotaTip: function quotaTip(quota) {
        return "\u6BCF\u4EBA\u9650\u8D2D" + quota + "\u4EF6";
      },
      quotaUsedTip: function quotaUsedTip(quota, count) {
        return "\u6BCF\u4EBA\u9650\u8D2D" + quota + "\u4EF6\uFF0C\u4F60\u5DF2\u8D2D\u4E70" + count + "\u4EF6";
      } },

    vanSkuActions: {
      buy: '立即购买',
      addCart: '加入购物车' },

    vanSkuImgUploader: {
      oversize: function oversize(maxSize) {
        return "\u6700\u5927\u53EF\u4E0A\u4F20\u56FE\u7247\u4E3A" + maxSize + "MB\uFF0C\u8BF7\u5C1D\u8BD5\u538B\u7F29\u56FE\u7247\u5C3A\u5BF8";
      },
      fail: '上传失败',
      uploading: '上传中...' },

    vanSkuStepper: {
      quotaLimit: function quotaLimit(quota) {
        return "\u9650\u8D2D" + quota + "\u4EF6";
      },
      quotaStart: function quotaStart(start) {
        return start + "\u4EF6\u8D77\u552E";
      },
      comma: '，',
      num: '购买数量' },

    vanSkuMessages: {
      fill: '请填写',
      upload: '请上传',
      imageLabel: '仅限一张',
      invalid: {
        tel: '请填写正确的数字格式留言',
        mobile: '手机号长度为6-20位数字',
        email: '请填写正确的邮箱',
        id_no: '请填写正确的身份证号码' },

      placeholder: {
        id_no: '请填写身份证号',
        text: '请填写留言',
        tel: '请填写数字',
        email: '请填写邮箱',
        date: '请选择日期',
        time: '请选择时间',
        textarea: '请填写留言',
        mobile: '请填写手机号' } },


    vanSkuRow: {
      multiple: '可多选' },

    vanSkuDatetimeField: {
      title: {
        date: '选择年月日',
        time: '选择时间',
        datetime: '选择日期时间' },

      format: {
        year: '年',
        month: '月',
        day: '日',
        hour: '时',
        minute: '分' } } } };exports.default = _default;

/***/ }),
/* 163 */
/*!************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/sku/constants.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.UNSELECTED_SKU_VALUE_ID = exports.LIMIT_TYPE = void 0;var LIMIT_TYPE = {
  QUOTA_LIMIT: 0,
  STOCK_LIMIT: 1 };exports.LIMIT_TYPE = LIMIT_TYPE;

var UNSELECTED_SKU_VALUE_ID = '';exports.UNSELECTED_SKU_VALUE_ID = UNSELECTED_SKU_VALUE_ID;var _default =
{
  LIMIT_TYPE: LIMIT_TYPE,
  UNSELECTED_SKU_VALUE_ID: UNSELECTED_SKU_VALUE_ID };exports.default = _default;

/***/ }),
/* 164 */
/*!*******************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/sku/utils/sku-helper.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.getSelectedProperties = exports.getSelectedPropValues = exports.isSkuChoosable = exports.getSelectedSkuValues = exports.getSkuComb = exports.isAllSelected = exports.normalizePropList = exports.normalizeSkuTree = void 0;var _extends3 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/esm/extends */ 15));
var _constants = __webpack_require__(/*! ../constants */ 163);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
/*
                                                                                                                                         normalize sku tree
                                                                                                                                       
                                                                                                                                         [
                                                                                                                                           {
                                                                                                                                             count: 2,
                                                                                                                                             k: "品种", // 规格名称 skuKeyName
                                                                                                                                             k_id: "1200", // skuKeyId
                                                                                                                                             k_s: "s1" // skuKeyStr
                                                                                                                                             v: [ // skuValues
                                                                                                                                               { // skuValue
                                                                                                                                                 id: "1201", // skuValueId
                                                                                                                                                 name: "萌" // 具体的规格值 skuValueName
                                                                                                                                               }, {
                                                                                                                                                 id: "973",
                                                                                                                                                 name: "帅"
                                                                                                                                               }
                                                                                                                                             ]
                                                                                                                                           },
                                                                                                                                           ...
                                                                                                                                         ]
                                                                                                                                                       |
                                                                                                                                                       v
                                                                                                                                         {
                                                                                                                                           s1: [{
                                                                                                                                             id: "1201",
                                                                                                                                             name: "萌"
                                                                                                                                           }, {
                                                                                                                                             id: "973",
                                                                                                                                             name: "帅"
                                                                                                                                           }],
                                                                                                                                           ...
                                                                                                                                         }
                                                                                                                                        */

var normalizeSkuTree = function normalizeSkuTree(skuTree) {
  var normalizedTree = {};
  skuTree.forEach(function (treeItem) {
    normalizedTree[treeItem.k_s] = treeItem.v;
  });
  return normalizedTree;
};exports.normalizeSkuTree = normalizeSkuTree;
var normalizePropList = function normalizePropList(propList) {
  var normalizedProp = {};
  propList.forEach(function (item) {
    var itemObj = {};
    item.v.forEach(function (it) {
      itemObj[it.id] = it;
    });
    normalizedProp[item.k_id] = itemObj;
  });
  return normalizedProp;
}; // 判断是否所有的sku都已经选中
exports.normalizePropList = normalizePropList;
var isAllSelected = function isAllSelected(skuTree, selectedSku) {
  // 筛选selectedSku对象中key值不为空的值
  var selected = Object.keys(selectedSku).filter(function (skuKeyStr) {
    return selectedSku[skuKeyStr] !== _constants.UNSELECTED_SKU_VALUE_ID;
  });
  return skuTree.length === selected.length;
}; // 根据已选择的 sku 获取 skuComb
exports.isAllSelected = isAllSelected;
var getSkuComb = function getSkuComb(skuList, selectedSku) {
  var skuComb = skuList.filter(function (item) {
    return Object.keys(selectedSku).every(function (skuKeyStr) {
      return String(item[skuKeyStr]) === String(selectedSku[skuKeyStr]);
    });
  });
  return skuComb[0];
}; // 获取已选择的sku名称
exports.getSkuComb = getSkuComb;
var getSelectedSkuValues = function getSelectedSkuValues(skuTree, selectedSku) {
  var normalizedTree = normalizeSkuTree(skuTree);
  return Object.keys(selectedSku).reduce(function (selectedValues, skuKeyStr) {
    var skuValues = normalizedTree[skuKeyStr];
    var skuValueId = selectedSku[skuKeyStr];

    if (skuValueId !== _constants.UNSELECTED_SKU_VALUE_ID) {
      var skuValue = skuValues.filter(function (value) {
        return value.id === skuValueId;
      })[0];
      skuValue && selectedValues.push(skuValue);
    }

    return selectedValues;
  }, []);
}; // 判断sku是否可选
exports.getSelectedSkuValues = getSelectedSkuValues;
var isSkuChoosable = function isSkuChoosable(skuList, selectedSku, skuToChoose) {
  var _extends2;

  var key = skuToChoose.key,
  valueId = skuToChoose.valueId; // 先假设sku已选中，拼入已选中sku对象中

  var matchedSku = (0, _extends3.default)({}, selectedSku, (_extends2 = {}, _extends2[key] = valueId, _extends2)); // 再判断剩余sku是否全部不可选，若不可选则当前sku不可选中


  var skusToCheck = Object.keys(matchedSku).filter(function (skuKey) {
    return matchedSku[skuKey] !== _constants.UNSELECTED_SKU_VALUE_ID;
  });
  var filteredSku = skuList.filter(function (sku) {
    return skusToCheck.every(function (skuKey) {
      return String(matchedSku[skuKey]) === String(sku[skuKey]);
    });
  });
  var stock = filteredSku.reduce(function (total, sku) {
    total += sku.stock_num;
    return total;
  }, 0);
  return stock > 0;
};exports.isSkuChoosable = isSkuChoosable;
var getSelectedPropValues = function getSelectedPropValues(propList, selectedProp) {
  var normalizeProp = normalizePropList(propList);
  return Object.keys(selectedProp).reduce(function (acc, cur) {
    selectedProp[cur].forEach(function (it) {
      acc.push((0, _extends3.default)({}, normalizeProp[cur][it]));
    });
    return acc;
  }, []);
};exports.getSelectedPropValues = getSelectedPropValues;
var getSelectedProperties = function getSelectedProperties(propList, selectedProp) {
  var list = [];
  (propList || []).forEach(function (prop) {
    if (selectedProp[prop.k_id] && selectedProp[prop.k_id].length > 0) {
      var v = [];
      prop.v.forEach(function (it) {
        if (selectedProp[prop.k_id].indexOf(it.id) > -1) {
          v.push((0, _extends3.default)({}, it));
        }
      });
      list.push((0, _extends3.default)({}, prop, {
        v: v }));

    }
  });
  return list;
};exports.getSelectedProperties = getSelectedProperties;var _default =
{
  normalizeSkuTree: normalizeSkuTree,
  getSkuComb: getSkuComb,
  getSelectedSkuValues: getSelectedSkuValues,
  isAllSelected: isAllSelected,
  isSkuChoosable: isSkuChoosable,
  getSelectedPropValues: getSelectedPropValues,
  getSelectedProperties: getSelectedProperties };exports.default = _default;

/***/ }),
/* 165 */
/*!******************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/sku/Sku.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _extends5 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/esm/extends */ 15));
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _popup = _interopRequireDefault(__webpack_require__(/*! ../popup */ 43));
var _toast = _interopRequireDefault(__webpack_require__(/*! ../toast */ 60));
var _imagePreview = _interopRequireDefault(__webpack_require__(/*! ../image-preview */ 128));
var _SkuHeader = _interopRequireDefault(__webpack_require__(/*! ./components/SkuHeader */ 166));
var _SkuHeaderItem = _interopRequireDefault(__webpack_require__(/*! ./components/SkuHeaderItem */ 167));
var _SkuRow = _interopRequireDefault(__webpack_require__(/*! ./components/SkuRow */ 168));
var _SkuRowItem = _interopRequireDefault(__webpack_require__(/*! ./components/SkuRowItem */ 169));
var _SkuRowPropItem = _interopRequireDefault(__webpack_require__(/*! ./components/SkuRowPropItem */ 170));
var _SkuStepper = _interopRequireDefault(__webpack_require__(/*! ./components/SkuStepper */ 171));
var _SkuMessages = _interopRequireDefault(__webpack_require__(/*! ./components/SkuMessages */ 173));
var _SkuActions = _interopRequireDefault(__webpack_require__(/*! ./components/SkuActions */ 180));
var _utils = __webpack_require__(/*! ../utils */ 17);
var _skuHelper = __webpack_require__(/*! ./utils/sku-helper */ 164);
var _constants = __webpack_require__(/*! ./constants */ 163);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
var namespace = (0, _utils.createNamespace)('sku');
var createComponent = namespace[0],
bem = namespace[1],
t = namespace[2];
var QUOTA_LIMIT = _constants.LIMIT_TYPE.QUOTA_LIMIT;var _default2 =
createComponent({
  props: {
    sku: Object,
    goods: Object,
    value: Boolean,
    buyText: String,
    goodsId: [Number, String],
    priceTag: String,
    lazyLoad: Boolean,
    hideStock: Boolean,
    properties: Array,
    addCartText: String,
    stepperTitle: String,
    getContainer: [String, Function],
    hideQuotaText: Boolean,
    hideSelectedText: Boolean,
    resetStepperOnHide: Boolean,
    customSkuValidator: Function,
    disableStepperInput: Boolean,
    resetSelectedSkuOnHide: Boolean,
    quota: {
      type: Number,
      default: 0 },

    quotaUsed: {
      type: Number,
      default: 0 },

    startSaleNum: {
      type: Number,
      default: 1 },

    initialSku: {
      type: Object,
      default: function _default() {
        return {};
      } },

    stockThreshold: {
      type: Number,
      default: 50 },

    showSoldoutSku: {
      type: Boolean,
      default: true },

    showAddCartBtn: {
      type: Boolean,
      default: true },

    disableSoldoutSku: {
      type: Boolean,
      default: true },

    customStepperConfig: {
      type: Object,
      default: function _default() {
        return {};
      } },

    showHeaderImage: {
      type: Boolean,
      default: true },

    previewOnClickImage: {
      type: Boolean,
      default: true },

    safeAreaInsetBottom: {
      type: Boolean,
      default: true },

    closeOnClickOverlay: {
      type: Boolean,
      default: true },

    bodyOffsetTop: {
      type: Number,
      default: 200 },

    messageConfig: {
      type: Object,
      default: function _default() {
        return {
          initialMessages: {},
          placeholderMap: {},
          uploadImg: function uploadImg() {
            return Promise.resolve();
          },
          uploadMaxSize: 5 };

      } } },


  data: function data() {
    return {
      selectedSku: {},
      selectedProp: {},
      selectedNum: 1,
      show: this.value };

  },
  watch: {
    show: function show(val) {
      this.$emit('input', val);

      if (!val) {
        this.$emit('sku-close', {
          selectedSkuValues: this.selectedSkuValues,
          selectedNum: this.selectedNum,
          selectedSkuComb: this.selectedSkuComb });


        if (this.resetStepperOnHide) {
          this.resetStepper();
        }

        if (this.resetSelectedSkuOnHide) {
          this.resetSelectedSku();
        }
      }
    },
    value: function value(val) {
      this.show = val;
    },
    skuTree: 'resetSelectedSku',
    initialSku: function initialSku() {
      this.resetStepper();
      this.resetSelectedSku();
    } },

  computed: {
    skuGroupClass: function skuGroupClass() {
      return ['van-sku-group-container', {
        'van-sku-group-container--hide-soldout': !this.showSoldoutSku }];

    },
    bodyStyle: function bodyStyle() {
      if (this.$isServer) {
        return;
      }

      var maxHeight = window.innerHeight - this.bodyOffsetTop;
      return {
        maxHeight: maxHeight + 'px' };

    },
    isSkuCombSelected: function isSkuCombSelected() {
      var _this = this;

      // SKU 未选完
      if (this.hasSku && !(0, _skuHelper.isAllSelected)(this.skuTree, this.selectedSku)) {
        return false;
      } // 属性未全选


      return !this.propList.some(function (it) {
        return (_this.selectedProp[it.k_id] || []).length < 1;
      });
    },
    isSkuEmpty: function isSkuEmpty() {
      return Object.keys(this.sku).length === 0;
    },
    hasSku: function hasSku() {
      return !this.sku.none_sku;
    },
    hasSkuOrAttr: function hasSkuOrAttr() {
      return this.hasSku || this.propList.length > 0;
    },
    selectedSkuComb: function selectedSkuComb() {
      var skuComb = null;

      if (this.isSkuCombSelected) {
        if (this.hasSku) {
          skuComb = (0, _skuHelper.getSkuComb)(this.skuList, this.selectedSku);
        } else {
          skuComb = {
            id: this.sku.collection_id,
            price: Math.round(this.sku.price * 100),
            stock_num: this.sku.stock_num };

        }

        if (skuComb) {
          skuComb.properties = (0, _skuHelper.getSelectedProperties)(this.propList, this.selectedProp);
          skuComb.property_price = this.selectedPropValues.reduce(function (acc, cur) {
            return acc + (cur.price || 0);
          }, 0);
        }
      }

      return skuComb;
    },
    selectedSkuValues: function selectedSkuValues() {
      return (0, _skuHelper.getSelectedSkuValues)(this.skuTree, this.selectedSku);
    },
    selectedPropValues: function selectedPropValues() {
      return (0, _skuHelper.getSelectedPropValues)(this.propList, this.selectedProp);
    },
    price: function price() {
      if (this.selectedSkuComb) {
        return ((this.selectedSkuComb.price + this.selectedSkuComb.property_price) / 100).toFixed(2);
      } // sku.price是一个格式化好的价格区间


      return this.sku.price;
    },
    originPrice: function originPrice() {
      if (this.selectedSkuComb && this.selectedSkuComb.origin_price) {
        return ((this.selectedSkuComb.origin_price + this.selectedSkuComb.property_price) / 100).toFixed(2);
      }

      return this.sku.origin_price;
    },
    skuTree: function skuTree() {
      return this.sku.tree || [];
    },
    skuList: function skuList() {
      return this.sku.list || [];
    },
    propList: function propList() {
      return this.properties || [];
    },
    imageList: function imageList() {
      var imageList = [this.goods.picture];

      if (this.skuTree.length > 0) {
        this.skuTree.forEach(function (treeItem) {
          if (!treeItem.v) {
            return;
          }

          treeItem.v.forEach(function (vItem) {
            var imgUrl = vItem.previewImgUrl || vItem.imgUrl || vItem.img_url;

            if (imgUrl && imageList.indexOf(imgUrl) === -1) {
              imageList.push(imgUrl);
            }
          });
        });
      }

      return imageList;
    },
    stock: function stock() {
      var stockNum = this.customStepperConfig.stockNum;

      if (stockNum !== undefined) {
        return stockNum;
      }

      if (this.selectedSkuComb) {
        return this.selectedSkuComb.stock_num;
      }

      return this.sku.stock_num;
    },
    stockText: function stockText() {
      var h = this.$createElement;
      var stockFormatter = this.customStepperConfig.stockFormatter;

      if (stockFormatter) {
        return stockFormatter(this.stock);
      }

      return [t('stock') + " ", h("span", {
        "class": bem('stock-num', {
          highlight: this.stock < this.stockThreshold }) },

      [this.stock]), " " + t('stockUnit')];
    },
    selectedText: function selectedText() {
      var _this2 = this;

      if (this.selectedSkuComb) {
        var values = this.selectedSkuValues.concat(this.selectedPropValues);
        return t('selected') + " " + values.map(function (item) {
          return item.name;
        }).join(' ');
      }

      var unselectedSku = this.skuTree.filter(function (item) {
        return _this2.selectedSku[item.k_s] === _constants.UNSELECTED_SKU_VALUE_ID;
      }).map(function (item) {
        return item.k;
      });
      var unselectedProp = this.propList.filter(function (item) {
        return (_this2.selectedProp[item.k_id] || []).length < 1;
      }).map(function (item) {
        return item.k;
      });
      return t('select') + " " + unselectedSku.concat(unselectedProp).join(' ');
    } },

  created: function created() {
    var skuEventBus = new _vue.default();
    this.skuEventBus = skuEventBus;
    skuEventBus.$on('sku:select', this.onSelect);
    skuEventBus.$on('sku:propSelect', this.onPropSelect);
    skuEventBus.$on('sku:numChange', this.onNumChange);
    skuEventBus.$on('sku:previewImage', this.onPreviewImage);
    skuEventBus.$on('sku:overLimit', this.onOverLimit);
    skuEventBus.$on('sku:stepperState', this.onStepperState);
    skuEventBus.$on('sku:addCart', this.onAddCart);
    skuEventBus.$on('sku:buy', this.onBuy);
    this.resetStepper();
    this.resetSelectedSku(); // 组件初始化后的钩子，抛出skuEventBus

    this.$emit('after-sku-create', skuEventBus);
  },
  methods: {
    resetStepper: function resetStepper() {
      var skuStepper = this.$refs.skuStepper;
      var selectedNum = this.initialSku.selectedNum;
      var num = selectedNum != null ? selectedNum : this.startSaleNum; // 用来缓存不合法的情况

      this.stepperError = null;

      if (skuStepper) {
        skuStepper.setCurrentNum(num);
      } else {
        // 当首次加载（skuStepper 为空）时，传入数量如果不合法，可能会存在问题
        this.selectedNum = num;
      }
    },
    // @exposed-api
    resetSelectedSku: function resetSelectedSku() {
      var _this3 = this;

      this.selectedSku = {}; // 重置 selectedSku

      this.skuTree.forEach(function (item) {
        _this3.selectedSku[item.k_s] = _constants.UNSELECTED_SKU_VALUE_ID;
      });
      this.skuTree.forEach(function (item) {
        var key = item.k_s; // 规格值只有1个时，优先判断

        var valueId = item.v.length === 1 ? item.v[0].id : _this3.initialSku[key];

        if (valueId && (0, _skuHelper.isSkuChoosable)(_this3.skuList, _this3.selectedSku, {
          key: key,
          valueId: valueId }))
        {
          _this3.selectedSku[key] = valueId;
        }
      });
      var skuValues = this.selectedSkuValues;

      if (skuValues.length > 0) {
        this.$nextTick(function () {
          _this3.$emit('sku-selected', {
            skuValue: skuValues[skuValues.length - 1],
            selectedSku: _this3.selectedSku,
            selectedSkuComb: _this3.selectedSkuComb });

        });
      } // 重置商品属性


      this.selectedProp = {};
      var _this$initialSku$sele = this.initialSku.selectedProp,
      selectedProp = _this$initialSku$sele === void 0 ? {} : _this$initialSku$sele; // 只有一个属性值时，默认选中，且选中外部传入信息

      this.propList.forEach(function (item) {
        if (item.v && item.v.length === 1) {
          _this3.selectedProp[item.k_id] = [item.v[0].id];
        } else if (selectedProp[item.k_id]) {
          _this3.selectedProp[item.k_id] = selectedProp[item.k_id];
        }
      });
      var propValues = this.selectedPropValues;

      if (propValues.length > 0) {
        this.$emit('sku-prop-selected', {
          propValue: propValues[propValues.length - 1],
          selectedProp: this.selectedProp,
          selectedSkuComb: this.selectedSkuComb });

      } // 抛出重置事件


      this.$emit('sku-reset', {
        selectedSku: this.selectedSku,
        selectedProp: this.selectedProp,
        selectedSkuComb: this.selectedSkuComb });

      this.centerInitialSku();
    },
    getSkuMessages: function getSkuMessages() {
      return this.$refs.skuMessages ? this.$refs.skuMessages.getMessages() : {};
    },
    getSkuCartMessages: function getSkuCartMessages() {
      return this.$refs.skuMessages ? this.$refs.skuMessages.getCartMessages() : {};
    },
    validateSkuMessages: function validateSkuMessages() {
      return this.$refs.skuMessages ? this.$refs.skuMessages.validateMessages() : '';
    },
    validateSku: function validateSku() {
      if (this.selectedNum === 0) {
        return t('unavailable');
      }

      if (this.isSkuCombSelected) {
        return this.validateSkuMessages();
      } // 自定义sku校验


      if (this.customSkuValidator) {
        var err = this.customSkuValidator(this);
        if (err) return err;
      }

      return t('selectSku');
    },
    onSelect: function onSelect(skuValue) {
      var _extends2, _extends3;

      // 点击已选中的sku时则取消选中
      this.selectedSku = this.selectedSku[skuValue.skuKeyStr] === skuValue.id ? (0, _extends5.default)({}, this.selectedSku, (_extends2 = {}, _extends2[skuValue.skuKeyStr] = _constants.UNSELECTED_SKU_VALUE_ID, _extends2)) : (0, _extends5.default)({}, this.selectedSku, (_extends3 = {}, _extends3[skuValue.skuKeyStr] = skuValue.id, _extends3));
      this.$emit('sku-selected', {
        skuValue: skuValue,
        selectedSku: this.selectedSku,
        selectedSkuComb: this.selectedSkuComb });

    },
    onPropSelect: function onPropSelect(propValue) {
      var _extends4;

      var arr = this.selectedProp[propValue.skuKeyStr] || [];
      var pos = arr.indexOf(propValue.id);

      if (pos > -1) {
        arr.splice(pos, 1);
      } else if (propValue.multiple) {
        arr.push(propValue.id);
      } else {
        arr.splice(0, 1, propValue.id);
      }

      this.selectedProp = (0, _extends5.default)({}, this.selectedProp, (_extends4 = {}, _extends4[propValue.skuKeyStr] = arr, _extends4));
      this.$emit('sku-prop-selected', {
        propValue: propValue,
        selectedProp: this.selectedProp,
        selectedSkuComb: this.selectedSkuComb });

    },
    onNumChange: function onNumChange(num) {
      this.selectedNum = num;
    },
    onPreviewImage: function onPreviewImage(selectedValue) {
      var _this4 = this;

      var imageList = this.imageList;
      var index = 0;
      var indexImage = imageList[0];

      if (selectedValue && selectedValue.imgUrl) {
        this.imageList.some(function (image, pos) {
          if (image === selectedValue.imgUrl) {
            index = pos;
            return true;
          }

          return false;
        });
        indexImage = selectedValue.imgUrl;
      }

      var params = (0, _extends5.default)({}, selectedValue, {
        index: index,
        imageList: this.imageList,
        indexImage: indexImage });


      this.$emit('open-preview', params);

      if (!this.previewOnClickImage) {
        return;
      }

      (0, _imagePreview.default)({
        images: this.imageList,
        startPosition: index,
        onClose: function onClose() {
          _this4.$emit('close-preview', params);
        } });

    },
    onOverLimit: function onOverLimit(data) {
      var action = data.action,
      limitType = data.limitType,
      quota = data.quota,
      quotaUsed = data.quotaUsed;
      var handleOverLimit = this.customStepperConfig.handleOverLimit;

      if (handleOverLimit) {
        handleOverLimit(data);
        return;
      }

      if (action === 'minus') {
        if (this.startSaleNum > 1) {
          (0, _toast.default)(t('minusStartTip', this.startSaleNum));
        } else {
          (0, _toast.default)(t('minusTip'));
        }
      } else if (action === 'plus') {
        if (limitType === QUOTA_LIMIT) {
          if (quotaUsed > 0) {
            (0, _toast.default)(t('quotaUsedTip', quota, quotaUsed));
          } else {
            (0, _toast.default)(t('quotaTip', quota));
          }
        } else {
          (0, _toast.default)(t('soldout'));
        }
      }
    },
    onStepperState: function onStepperState(data) {
      this.stepperError = data.valid ? null : (0, _extends5.default)({}, data, {
        action: 'plus' });

    },
    onAddCart: function onAddCart() {
      this.onBuyOrAddCart('add-cart');
    },
    onBuy: function onBuy() {
      this.onBuyOrAddCart('buy-clicked');
    },
    onBuyOrAddCart: function onBuyOrAddCart(type) {
      // sku 不符合购买条件
      if (this.stepperError) {
        return this.onOverLimit(this.stepperError);
      }

      var error = this.validateSku();

      if (error) {
        (0, _toast.default)(error);
      } else {
        this.$emit(type, this.getSkuData());
      }
    },
    // @exposed-api
    getSkuData: function getSkuData() {
      return {
        goodsId: this.goodsId,
        messages: this.getSkuMessages(),
        selectedNum: this.selectedNum,
        cartMessages: this.getSkuCartMessages(),
        selectedSkuComb: this.selectedSkuComb };

    },
    // 当 popup 完全打开后执行
    onOpened: function onOpened() {
      this.centerInitialSku();
    },
    centerInitialSku: function centerInitialSku() {
      var _this5 = this;

      (this.$refs.skuRows || []).forEach(function (it) {
        var _ref = it.skuRow || {},
        k_s = _ref.k_s;

        it.centerItem(_this5.initialSku[k_s]);
      });
    } },

  render: function render() {
    var _this6 = this;

    var h = arguments[0];

    if (this.isSkuEmpty) {
      return;
    }

    var sku = this.sku,
    skuList = this.skuList,
    goods = this.goods,
    price = this.price,
    lazyLoad = this.lazyLoad,
    originPrice = this.originPrice,
    skuEventBus = this.skuEventBus,
    selectedSku = this.selectedSku,
    selectedProp = this.selectedProp,
    selectedNum = this.selectedNum,
    stepperTitle = this.stepperTitle,
    selectedSkuComb = this.selectedSkuComb,
    showHeaderImage = this.showHeaderImage,
    disableSoldoutSku = this.disableSoldoutSku;
    var slotsProps = {
      price: price,
      originPrice: originPrice,
      selectedNum: selectedNum,
      skuEventBus: skuEventBus,
      selectedSku: selectedSku,
      selectedSkuComb: selectedSkuComb };


    var slots = function slots(name) {
      return _this6.slots(name, slotsProps);
    };

    var Header = slots('sku-header') || h(_SkuHeader.default, {
      "attrs": {
        "sku": sku,
        "goods": goods,
        "skuEventBus": skuEventBus,
        "selectedSku": selectedSku,
        "showHeaderImage": showHeaderImage } },

    [h("template", {
      "slot": "sku-header-image-extra" },
    [slots('sku-header-image-extra')]), slots('sku-header-price') || h("div", {
      "class": "van-sku__goods-price" },
    [h("span", {
      "class": "van-sku__price-symbol" },
    ["\uFFE5"]), h("span", {
      "class": "van-sku__price-num" },
    [price]), this.priceTag && h("span", {
      "class": "van-sku__price-tag" },
    [this.priceTag])]), slots('sku-header-origin-price') || originPrice && h(_SkuHeaderItem.default, [t('originPrice'), " \uFFE5", originPrice]), !this.hideStock && h(_SkuHeaderItem.default, [h("span", {
      "class": "van-sku__stock" },
    [this.stockText])]), this.hasSkuOrAttr && !this.hideSelectedText && h(_SkuHeaderItem.default, [this.selectedText]), slots('sku-header-extra')]);
    var Group = slots('sku-group') || this.hasSkuOrAttr && h("div", {
      "class": this.skuGroupClass },
    [this.skuTree.map(function (skuTreeItem) {
      return h(_SkuRow.default, {
        "attrs": {
          "skuRow": skuTreeItem },

        "ref": "skuRows",
        "refInFor": true },
      [skuTreeItem.v.map(function (skuValue) {
        return h(_SkuRowItem.default, {
          "attrs": {
            "skuList": skuList,
            "lazyLoad": lazyLoad,
            "skuValue": skuValue,
            "skuKeyStr": skuTreeItem.k_s,
            "selectedSku": selectedSku,
            "skuEventBus": skuEventBus,
            "disableSoldoutSku": disableSoldoutSku,
            "largeImageMode": skuTreeItem.largeImageMode } });


      })]);
    }), this.propList.map(function (skuTreeItem) {
      return h(_SkuRow.default, {
        "attrs": {
          "skuRow": skuTreeItem } },

      [skuTreeItem.v.map(function (skuValue) {
        return h(_SkuRowPropItem.default, {
          "attrs": {
            "skuValue": skuValue,
            "skuKeyStr": skuTreeItem.k_id + '',
            "selectedProp": selectedProp,
            "skuEventBus": skuEventBus,
            "multiple": skuTreeItem.is_multiple } });


      })]);
    })]);
    var Stepper = slots('sku-stepper') || h(_SkuStepper.default, {
      "ref": "skuStepper",
      "attrs": {
        "stock": this.stock,
        "quota": this.quota,
        "quotaUsed": this.quotaUsed,
        "startSaleNum": this.startSaleNum,
        "skuEventBus": skuEventBus,
        "selectedNum": selectedNum,
        "stepperTitle": stepperTitle,
        "skuStockNum": sku.stock_num,
        "disableStepperInput": this.disableStepperInput,
        "customStepperConfig": this.customStepperConfig,
        "hideQuotaText": this.hideQuotaText },

      "on": {
        "change": function change(event) {
          _this6.$emit('stepper-change', event);
        } } });


    var Messages = slots('sku-messages') || h(_SkuMessages.default, {
      "ref": "skuMessages",
      "attrs": {
        "goodsId": this.goodsId,
        "messageConfig": this.messageConfig,
        "messages": sku.messages } });


    var Actions = slots('sku-actions') || h(_SkuActions.default, {
      "attrs": {
        "buyText": this.buyText,
        "skuEventBus": skuEventBus,
        "addCartText": this.addCartText,
        "showAddCartBtn": this.showAddCartBtn } });


    return h(_popup.default, {
      "attrs": {
        "round": true,
        "closeable": true,
        "position": "bottom",
        "getContainer": this.getContainer,
        "closeOnClickOverlay": this.closeOnClickOverlay,
        "safeAreaInsetBottom": this.safeAreaInsetBottom },

      "class": "van-sku-container",
      "on": {
        "opened": this.onOpened },

      "model": {
        value: _this6.show,
        callback: function callback($$v) {
          _this6.show = $$v;
        } } },

    [Header, h("div", {
      "class": "van-sku-body",
      "style": this.bodyStyle },
    [slots('sku-body-top'), Group, slots('extra-sku-group'), Stepper, Messages]), slots('sku-actions-top'), Actions]);
  } });exports.default = _default2;

/***/ }),
/* 166 */
/*!***********************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/sku/components/SkuHeader.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _babelHelperVueJsxMergeProps = _interopRequireDefault(__webpack_require__(/*! @vue/babel-helper-vue-jsx-merge-props */ 16));
var _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/esm/extends */ 15));

var _utils = __webpack_require__(/*! ../../utils */ 17);
var _functional = __webpack_require__(/*! ../../utils/functional */ 29);
var _constant = __webpack_require__(/*! ../../utils/constant */ 50);

var _image = _interopRequireDefault(__webpack_require__(/*! ../../image */ 89));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // Utils
// Components
// Types
var _createNamespace = (0, _utils.createNamespace)('sku-header'),createComponent = _createNamespace[0],
bem = _createNamespace[1];

function getSkuImgValue(sku, selectedSku) {
  var imgValue;
  sku.tree.some(function (item) {
    var id = selectedSku[item.k_s];

    if (id && item.v) {
      var matchedSku = item.v.filter(function (skuValue) {
        return skuValue.id === id;
      })[0] || {};
      var img = matchedSku.previewImgUrl || matchedSku.imgUrl || matchedSku.img_url;

      if (img) {
        imgValue = (0, _extends2.default)({}, matchedSku, {
          ks: item.k_s,
          imgUrl: img });

        return true;
      }
    }

    return false;
  });
  return imgValue;
}

function SkuHeader(h, props, slots, ctx) {
  var _slots$skuHeaderIma;

  var sku = props.sku,
  goods = props.goods,
  skuEventBus = props.skuEventBus,
  selectedSku = props.selectedSku,
  _props$showHeaderImag = props.showHeaderImage,
  showHeaderImage = _props$showHeaderImag === void 0 ? true : _props$showHeaderImag;
  var selectedValue = getSkuImgValue(sku, selectedSku);
  var imgUrl = selectedValue ? selectedValue.imgUrl : goods.picture;

  var previewImage = function previewImage() {
    skuEventBus.$emit('sku:previewImage', selectedValue);
  };

  return h("div", (0, _babelHelperVueJsxMergeProps.default)([{
    "class": [bem(), _constant.BORDER_BOTTOM] },
  (0, _functional.inherit)(ctx)]), [showHeaderImage && h(_image.default, {
    "attrs": {
      "fit": "cover",
      "src": imgUrl },

    "class": bem('img-wrap'),
    "on": {
      "click": previewImage } },

  [(_slots$skuHeaderIma = slots['sku-header-image-extra']) == null ? void 0 : _slots$skuHeaderIma.call(slots)]), h("div", {
    "class": bem('goods-info') },
  [slots.default == null ? void 0 : slots.default()])]);
}

SkuHeader.props = {
  sku: Object,
  goods: Object,
  skuEventBus: Object,
  selectedSku: Object,
  showHeaderImage: Boolean };var _default =

createComponent(SkuHeader);exports.default = _default;

/***/ }),
/* 167 */
/*!***************************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/sku/components/SkuHeaderItem.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _babelHelperVueJsxMergeProps = _interopRequireDefault(__webpack_require__(/*! @vue/babel-helper-vue-jsx-merge-props */ 16));

var _utils = __webpack_require__(/*! ../../utils */ 17);
var _functional = __webpack_require__(/*! ../../utils/functional */ 29);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // Utils
// Types
var _createNamespace = (0, _utils.createNamespace)('sku-header-item'),
createComponent = _createNamespace[0],
bem = _createNamespace[1];

function SkuHeader(h, props, slots, ctx) {
  return h("div", (0, _babelHelperVueJsxMergeProps.default)([{
    "class": bem() },
  (0, _functional.inherit)(ctx)]), [slots.default && slots.default()]);
}var _default =

createComponent(SkuHeader);exports.default = _default;

/***/ }),
/* 168 */
/*!********************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/sku/components/SkuRow.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.bem = void 0;
var _utils = __webpack_require__(/*! ../../utils */ 17);
var _constant = __webpack_require__(/*! ../../utils/constant */ 50);

var _relation = __webpack_require__(/*! ../../mixins/relation */ 67);
var _bindEvent = __webpack_require__(/*! ../../mixins/bind-event */ 40); // Utils
// Mixins
var _createNamespace = (0, _utils.createNamespace)('sku-row'),
createComponent = _createNamespace[0],
bem = _createNamespace[1],
t = _createNamespace[2];exports.bem = bem;var _default =


createComponent({
  mixins: [(0, _relation.ParentMixin)('vanSkuRows'), (0, _bindEvent.BindEventMixin)(function (bind) {
    if (this.scrollable && this.$refs.scroller) {
      bind(this.$refs.scroller, 'scroll', this.onScroll);
    }
  })],
  props: {
    skuRow: Object },

  data: function data() {
    return {
      progress: 0 };

  },
  computed: {
    scrollable: function scrollable() {
      return this.skuRow.largeImageMode && this.skuRow.v.length > 6;
    } },

  methods: {
    onScroll: function onScroll() {
      var _this$$refs = this.$refs,
      scroller = _this$$refs.scroller,
      row = _this$$refs.row;
      var distance = row.offsetWidth - scroller.offsetWidth;
      this.progress = scroller.scrollLeft / distance;
    },
    genTitle: function genTitle() {
      var h = this.$createElement;
      return h("div", {
        "class": bem('title') },
      [this.skuRow.k, this.skuRow.is_multiple && h("span", {
        "class": bem('title-multiple') },
      ["\uFF08", t('multiple'), "\uFF09"])]);
    },
    genIndicator: function genIndicator() {
      var h = this.$createElement;

      if (this.scrollable) {
        var style = {
          transform: "translate3d(" + this.progress * 20 + "px, 0, 0)" };

        return h("div", {
          "class": bem('indicator-wrapper') },
        [h("div", {
          "class": bem('indicator') },
        [h("div", {
          "class": bem('indicator-slider'),
          "style": style })])]);

      }
    },
    genContent: function genContent() {
      var h = this.$createElement;
      var nodes = this.slots();

      if (this.skuRow.largeImageMode) {
        var top = [];
        var bottom = [];
        nodes.forEach(function (node, index) {
          var group = Math.floor(index / 3) % 2 === 0 ? top : bottom;
          group.push(node);
        });
        return h("div", {
          "class": bem('scroller'),
          "ref": "scroller" },
        [h("div", {
          "class": bem('row'),
          "ref": "row" },
        [top]), bottom.length ? h("div", {
          "class": bem('row') },
        [bottom]) : null]);
      }

      return nodes;
    },
    centerItem: function centerItem(selectSkuId) {
      if (!this.skuRow.largeImageMode || !selectSkuId) {
        return;
      }

      var _this$children = this.children,
      children = _this$children === void 0 ? [] : _this$children;
      var _this$$refs2 = this.$refs,
      scroller = _this$$refs2.scroller,
      row = _this$$refs2.row;
      var child = children.find(function (it) {
        return +it.skuValue.id === +selectSkuId;
      });

      if (scroller && row && child && child.$el) {
        var target = child.$el;
        var to = target.offsetLeft - (scroller.offsetWidth - target.offsetWidth) / 2;
        scroller.scrollLeft = to;
      }
    } },

  render: function render() {
    var h = arguments[0];
    return h("div", {
      "class": [bem(), _constant.BORDER_BOTTOM] },
    [this.genTitle(), this.genContent(), this.genIndicator()]);
  } });exports.default = _default;

/***/ }),
/* 169 */
/*!************************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/sku/components/SkuRowItem.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/esm/extends */ 15));
var _SkuRow = __webpack_require__(/*! ./SkuRow */ 168);
var _utils = __webpack_require__(/*! ../../utils */ 17);
var _skuHelper = __webpack_require__(/*! ../utils/sku-helper */ 164);
var _relation = __webpack_require__(/*! ../../mixins/relation */ 67);
var _icon = _interopRequireDefault(__webpack_require__(/*! ../../icon */ 41));
var _image = _interopRequireDefault(__webpack_require__(/*! ../../image */ 89));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var _createNamespace = (0, _utils.createNamespace)('sku-row-item'),
createComponent = _createNamespace[0];var _default2 =

createComponent({
  mixins: [(0, _relation.ChildrenMixin)('vanSkuRows')],
  props: {
    lazyLoad: Boolean,
    skuValue: Object,
    skuKeyStr: String,
    skuEventBus: Object,
    selectedSku: Object,
    largeImageMode: Boolean,
    disableSoldoutSku: Boolean,
    skuList: {
      type: Array,
      default: function _default() {
        return [];
      } } },


  computed: {
    imgUrl: function imgUrl() {
      var url = this.skuValue.imgUrl || this.skuValue.img_url;
      return this.largeImageMode ? url || 'https://img01.yzcdn.cn/upload_files/2020/06/24/FmKWDg0bN9rMcTp9ne8MXiQWGtLn.png' : url;
    },
    choosable: function choosable() {
      if (!this.disableSoldoutSku) {
        return true;
      }

      return (0, _skuHelper.isSkuChoosable)(this.skuList, this.selectedSku, {
        key: this.skuKeyStr,
        valueId: this.skuValue.id });

    } },

  methods: {
    onSelect: function onSelect() {
      if (this.choosable) {
        this.skuEventBus.$emit('sku:select', (0, _extends2.default)({}, this.skuValue, {
          skuKeyStr: this.skuKeyStr }));

      }
    },
    onPreviewImg: function onPreviewImg(event) {
      event.stopPropagation();
      var skuValue = this.skuValue,
      skuKeyStr = this.skuKeyStr;
      this.skuEventBus.$emit('sku:previewImage', (0, _extends2.default)({}, skuValue, {
        ks: skuKeyStr,
        imgUrl: skuValue.imgUrl || skuValue.img_url }));

    },
    genImage: function genImage(classPrefix) {
      var h = this.$createElement;

      if (this.imgUrl) {
        return h(_image.default, {
          "attrs": {
            "fit": "cover",
            "src": this.imgUrl,
            "lazyLoad": this.lazyLoad },

          "class": classPrefix + "-img" });

      }
    } },

  render: function render() {
    var h = arguments[0];
    var choosed = this.skuValue.id === this.selectedSku[this.skuKeyStr];
    var classPrefix = this.largeImageMode ? (0, _SkuRow.bem)('image-item') : (0, _SkuRow.bem)('item');
    return h("span", {
      "class": [classPrefix, choosed ? classPrefix + "--active" : '', !this.choosable ? classPrefix + "--disabled" : ''],
      "on": {
        "click": this.onSelect } },

    [this.genImage(classPrefix), h("div", {
      "class": classPrefix + "-name" },
    [this.largeImageMode ? h("span", {
      "class": {
        'van-multi-ellipsis--l2': this.largeImageMode } },

    [this.skuValue.name]) : this.skuValue.name]), this.largeImageMode && h(_icon.default, {
      "attrs": {
        "name": "enlarge" },

      "class": classPrefix + "-img-icon",
      "on": {
        "click": this.onPreviewImg } })]);


  } });exports.default = _default2;

/***/ }),
/* 170 */
/*!****************************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/sku/components/SkuRowPropItem.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/esm/extends */ 15));
var _utils = __webpack_require__(/*! ../../utils */ 17);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var _createNamespace = (0, _utils.createNamespace)('sku-row-prop-item'),
createComponent = _createNamespace[0];var _default =

createComponent({
  props: {
    skuValue: Object,
    skuKeyStr: String,
    skuEventBus: Object,
    selectedProp: Object,
    multiple: Boolean },

  computed: {
    choosed: function choosed() {
      var selectedProp = this.selectedProp,
      skuKeyStr = this.skuKeyStr,
      skuValue = this.skuValue;

      if (selectedProp && selectedProp[skuKeyStr]) {
        return selectedProp[skuKeyStr].indexOf(skuValue.id) > -1;
      }

      return false;
    } },

  methods: {
    onSelect: function onSelect() {
      this.skuEventBus.$emit('sku:propSelect', (0, _extends2.default)({}, this.skuValue, {
        skuKeyStr: this.skuKeyStr,
        multiple: this.multiple }));

    } },

  render: function render() {
    var h = arguments[0];
    return h("span", {
      "class": ['van-sku-row__item', {
        'van-sku-row__item--active': this.choosed }],

      "on": {
        "click": this.onSelect } },

    [h("span", {
      "class": "van-sku-row__item-name" },
    [this.skuValue.name])]);
  } });exports.default = _default;

/***/ }),
/* 171 */
/*!************************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/sku/components/SkuStepper.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _utils = __webpack_require__(/*! ../../utils */ 17);
var _constants = __webpack_require__(/*! ../constants */ 163);
var _stepper = _interopRequireDefault(__webpack_require__(/*! ../../stepper */ 172));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
var namespace = (0, _utils.createNamespace)('sku-stepper');
var createComponent = namespace[0];
var t = namespace[2];
var QUOTA_LIMIT = _constants.LIMIT_TYPE.QUOTA_LIMIT,
STOCK_LIMIT = _constants.LIMIT_TYPE.STOCK_LIMIT;var _default =
createComponent({
  props: {
    stock: Number,
    skuEventBus: Object,
    skuStockNum: Number,
    selectedNum: Number,
    stepperTitle: String,
    disableStepperInput: Boolean,
    customStepperConfig: Object,
    hideQuotaText: Boolean,
    quota: {
      type: Number,
      default: 0 },

    quotaUsed: {
      type: Number,
      default: 0 },

    startSaleNum: {
      type: Number,
      default: 1 } },


  data: function data() {
    return {
      currentNum: this.selectedNum,
      // 购买限制类型: 限购/库存
      limitType: STOCK_LIMIT };

  },
  watch: {
    currentNum: function currentNum(num) {
      var intValue = parseInt(num, 10);

      if (intValue >= this.stepperMinLimit && intValue <= this.stepperLimit) {
        this.skuEventBus.$emit('sku:numChange', intValue);
      }
    },
    stepperLimit: function stepperLimit(limit) {
      if (limit < this.currentNum && this.stepperMinLimit <= limit) {
        this.currentNum = limit;
      }

      this.checkState(this.stepperMinLimit, limit);
    },
    stepperMinLimit: function stepperMinLimit(start) {
      if (start > this.currentNum || start > this.stepperLimit) {
        this.currentNum = start;
      }

      this.checkState(start, this.stepperLimit);
    } },

  computed: {
    stepperLimit: function stepperLimit() {
      var quotaLimit = this.quota - this.quotaUsed;
      var limit; // 无限购时直接取库存，有限购时取限购数和库存数中小的那个

      if (this.quota > 0 && quotaLimit <= this.stock) {
        // 修正负的limit
        limit = quotaLimit < 0 ? 0 : quotaLimit;
        this.limitType = QUOTA_LIMIT;
      } else {
        limit = this.stock;
        this.limitType = STOCK_LIMIT;
      }

      return limit;
    },
    stepperMinLimit: function stepperMinLimit() {
      return this.startSaleNum < 1 ? 1 : this.startSaleNum;
    },
    quotaText: function quotaText() {
      var _this$customStepperCo = this.customStepperConfig,
      quotaText = _this$customStepperCo.quotaText,
      hideQuotaText = _this$customStepperCo.hideQuotaText;
      if (hideQuotaText) return '';
      var text = '';

      if (quotaText) {
        text = quotaText;
      } else {
        var textArr = [];

        if (this.startSaleNum > 1) {
          textArr.push(t('quotaStart', this.startSaleNum));
        }

        if (this.quota > 0) {
          textArr.push(t('quotaLimit', this.quota));
        }

        text = textArr.join(t('comma'));
      }

      return text;
    } },

  created: function created() {
    this.checkState(this.stepperMinLimit, this.stepperLimit);
  },
  methods: {
    setCurrentNum: function setCurrentNum(num) {
      this.currentNum = num;
      this.checkState(this.stepperMinLimit, this.stepperLimit);
    },
    onOverLimit: function onOverLimit(action) {
      this.skuEventBus.$emit('sku:overLimit', {
        action: action,
        limitType: this.limitType,
        quota: this.quota,
        quotaUsed: this.quotaUsed,
        startSaleNum: this.startSaleNum });

    },
    onChange: function onChange(currentValue) {
      var intValue = parseInt(currentValue, 10);
      var handleStepperChange = this.customStepperConfig.handleStepperChange;
      handleStepperChange && handleStepperChange(intValue);
      this.$emit('change', intValue);
    },
    checkState: function checkState(min, max) {
      // 如果选择小于起售，则强制变为起售
      if (this.currentNum < min || min > max) {
        this.currentNum = min;
      } else if (this.currentNum > max) {
        // 当前选择数量大于最大可选时，需要重置已选数量
        this.currentNum = max;
      }

      this.skuEventBus.$emit('sku:stepperState', {
        valid: min <= max,
        min: min,
        max: max,
        limitType: this.limitType,
        quota: this.quota,
        quotaUsed: this.quotaUsed,
        startSaleNum: this.startSaleNum });

    } },

  render: function render() {
    var _this = this;

    var h = arguments[0];
    return h("div", {
      "class": "van-sku-stepper-stock" },
    [h("div", {
      "class": "van-sku__stepper-title" },
    [this.stepperTitle || t('num')]), h(_stepper.default, {
      "attrs": {
        "integer": true,
        "min": this.stepperMinLimit,
        "max": this.stepperLimit,
        "disableInput": this.disableStepperInput },

      "class": "van-sku__stepper",
      "on": {
        "overlimit": this.onOverLimit,
        "change": this.onChange },

      "model": {
        value: _this.currentNum,
        callback: function callback($$v) {
          _this.currentNum = $$v;
        } } }),

    !this.hideQuotaText && this.quotaText && h("span", {
      "class": "van-sku__stepper-quota" },
    ["(", this.quotaText, ")"])]);
  } });exports.default = _default;

/***/ }),
/* 172 */
/*!************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/stepper/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _babelHelperVueJsxMergeProps = _interopRequireDefault(__webpack_require__(/*! @vue/babel-helper-vue-jsx-merge-props */ 16));

var _utils = __webpack_require__(/*! ../utils */ 17);
var _resetScroll = __webpack_require__(/*! ../utils/dom/reset-scroll */ 58);
var _event = __webpack_require__(/*! ../utils/dom/event */ 34);
var _number = __webpack_require__(/*! ../utils/format/number */ 53);
var _number2 = __webpack_require__(/*! ../utils/validate/number */ 28);
var _field = __webpack_require__(/*! ../mixins/field */ 73);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var _createNamespace = (0, _utils.createNamespace)('stepper'),
createComponent = _createNamespace[0],
bem = _createNamespace[1];

var LONG_PRESS_START_TIME = 600;
var LONG_PRESS_INTERVAL = 200;

function equal(value1, value2) {
  return String(value1) === String(value2);
} // add num and avoid float number


function add(num1, num2) {
  var cardinal = Math.pow(10, 10);
  return Math.round((num1 + num2) * cardinal) / cardinal;
}var _default =

createComponent({
  mixins: [_field.FieldMixin],
  props: {
    value: null,
    theme: String,
    integer: Boolean,
    disabled: Boolean,
    allowEmpty: Boolean,
    inputWidth: [Number, String],
    buttonSize: [Number, String],
    asyncChange: Boolean,
    placeholder: String,
    disablePlus: Boolean,
    disableMinus: Boolean,
    disableInput: Boolean,
    decimalLength: [Number, String],
    name: {
      type: [Number, String],
      default: '' },

    min: {
      type: [Number, String],
      default: 1 },

    max: {
      type: [Number, String],
      default: Infinity },

    step: {
      type: [Number, String],
      default: 1 },

    defaultValue: {
      type: [Number, String],
      default: 1 },

    showPlus: {
      type: Boolean,
      default: true },

    showMinus: {
      type: Boolean,
      default: true },

    showInput: {
      type: Boolean,
      default: true },

    longPress: {
      type: Boolean,
      default: true } },


  data: function data() {
    var _this$value;

    var defaultValue = (_this$value = this.value) != null ? _this$value : this.defaultValue;
    var value = this.format(defaultValue);

    if (!equal(value, this.value)) {
      this.$emit('input', value);
    }

    return {
      currentValue: value };

  },
  computed: {
    minusDisabled: function minusDisabled() {
      return this.disabled || this.disableMinus || this.currentValue <= +this.min;
    },
    plusDisabled: function plusDisabled() {
      return this.disabled || this.disablePlus || this.currentValue >= +this.max;
    },
    inputStyle: function inputStyle() {
      var style = {};

      if (this.inputWidth) {
        style.width = (0, _utils.addUnit)(this.inputWidth);
      }

      if (this.buttonSize) {
        style.height = (0, _utils.addUnit)(this.buttonSize);
      }

      return style;
    },
    buttonStyle: function buttonStyle() {
      if (this.buttonSize) {
        var size = (0, _utils.addUnit)(this.buttonSize);
        return {
          width: size,
          height: size };

      }
    } },

  watch: {
    max: 'check',
    min: 'check',
    integer: 'check',
    decimalLength: 'check',
    value: function value(val) {
      if (!equal(val, this.currentValue)) {
        this.currentValue = this.format(val);
      }
    },
    currentValue: function currentValue(val) {
      this.$emit('input', val);
      this.$emit('change', val, {
        name: this.name });

    } },

  methods: {
    check: function check() {
      var val = this.format(this.currentValue);

      if (!equal(val, this.currentValue)) {
        this.currentValue = val;
      }
    },
    // formatNumber illegal characters
    formatNumber: function formatNumber(value) {
      return (0, _number.formatNumber)(String(value), !this.integer);
    },
    format: function format(value) {
      if (this.allowEmpty && value === '') {
        return value;
      }

      value = this.formatNumber(value); // format range

      value = value === '' ? 0 : +value;
      value = (0, _number2.isNaN)(value) ? this.min : value;
      value = Math.max(Math.min(this.max, value), this.min); // format decimal

      if ((0, _utils.isDef)(this.decimalLength)) {
        value = value.toFixed(this.decimalLength);
      }

      return value;
    },
    onInput: function onInput(event) {
      var value = event.target.value;
      var formatted = this.formatNumber(value); // limit max decimal length

      if ((0, _utils.isDef)(this.decimalLength) && formatted.indexOf('.') !== -1) {
        var pair = formatted.split('.');
        formatted = pair[0] + "." + pair[1].slice(0, this.decimalLength);
      }

      if (!equal(value, formatted)) {
        event.target.value = formatted;
      } // perfer number type


      if (formatted === String(+formatted)) {
        formatted = +formatted;
      }

      this.emitChange(formatted);
    },
    emitChange: function emitChange(value) {
      if (this.asyncChange) {
        this.$emit('input', value);
        this.$emit('change', value, {
          name: this.name });

      } else {
        this.currentValue = value;
      }
    },
    onChange: function onChange() {
      var type = this.type;

      if (this[type + "Disabled"]) {
        this.$emit('overlimit', type);
        return;
      }

      var diff = type === 'minus' ? -this.step : +this.step;
      var value = this.format(add(+this.currentValue, diff));
      this.emitChange(value);
      this.$emit(type);
    },
    onFocus: function onFocus(event) {
      // readonly not work in lagacy mobile safari
      if (this.disableInput && this.$refs.input) {
        this.$refs.input.blur();
      } else {
        this.$emit('focus', event);
      }
    },
    onBlur: function onBlur(event) {
      var value = this.format(event.target.value);
      event.target.value = value;
      this.currentValue = value;
      this.$emit('blur', event);
      (0, _resetScroll.resetScroll)();
    },
    longPressStep: function longPressStep() {
      var _this = this;

      this.longPressTimer = setTimeout(function () {
        _this.onChange();

        _this.longPressStep(_this.type);
      }, LONG_PRESS_INTERVAL);
    },
    onTouchStart: function onTouchStart() {
      var _this2 = this;

      if (!this.longPress) {
        return;
      }

      clearTimeout(this.longPressTimer);
      this.isLongPress = false;
      this.longPressTimer = setTimeout(function () {
        _this2.isLongPress = true;

        _this2.onChange();

        _this2.longPressStep();
      }, LONG_PRESS_START_TIME);
    },
    onTouchEnd: function onTouchEnd(event) {
      if (!this.longPress) {
        return;
      }

      clearTimeout(this.longPressTimer);

      if (this.isLongPress) {
        (0, _event.preventDefault)(event);
      }
    },
    onMousedown: function onMousedown(event) {
      // fix mobile safari page scroll down issue
      // see: https://github.com/youzan/vant/issues/7690
      if (this.disableInput) {
        event.preventDefault();
      }
    } },

  render: function render() {
    var _this3 = this;

    var h = arguments[0];

    var createListeners = function createListeners(type) {
      return {
        on: {
          click: function click(e) {
            // disable double tap scrolling on mobile safari
            e.preventDefault();
            _this3.type = type;

            _this3.onChange();
          },
          touchstart: function touchstart() {
            _this3.type = type;

            _this3.onTouchStart();
          },
          touchend: _this3.onTouchEnd,
          touchcancel: _this3.onTouchEnd } };


    };

    return h("div", {
      "class": bem([this.theme]) },
    [h("button", (0, _babelHelperVueJsxMergeProps.default)([{
      "directives": [{
        name: "show",
        value: this.showMinus }],

      "attrs": {
        "type": "button" },

      "style": this.buttonStyle,
      "class": bem('minus', {
        disabled: this.minusDisabled }) },

    createListeners('minus')])), h("input", {
      "directives": [{
        name: "show",
        value: this.showInput }],

      "ref": "input",
      "attrs": {
        "type": this.integer ? 'tel' : 'text',
        "role": "spinbutton",
        "disabled": this.disabled,
        "readonly": this.disableInput,
        "inputmode": this.integer ? 'numeric' : 'decimal',
        "placeholder": this.placeholder,
        "aria-valuemax": this.max,
        "aria-valuemin": this.min,
        "aria-valuenow": this.currentValue },

      "class": bem('input'),
      "domProps": {
        "value": this.currentValue },

      "style": this.inputStyle,
      "on": {
        "input": this.onInput,
        "focus": this.onFocus,
        "blur": this.onBlur,
        "mousedown": this.onMousedown } }),

    h("button", (0, _babelHelperVueJsxMergeProps.default)([{
      "directives": [{
        name: "show",
        value: this.showPlus }],

      "attrs": {
        "type": "button" },

      "style": this.buttonStyle,
      "class": bem('plus', {
        disabled: this.plusDisabled }) },

    createListeners('plus')]))]);
  } });exports.default = _default;

/***/ }),
/* 173 */
/*!*************************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/sku/components/SkuMessages.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _utils = __webpack_require__(/*! ../../utils */ 17);
var _email = __webpack_require__(/*! ../../utils/validate/email */ 174);
var _number = __webpack_require__(/*! ../../utils/validate/number */ 28);

var _cell = _interopRequireDefault(__webpack_require__(/*! ../../cell */ 54));
var _field = _interopRequireDefault(__webpack_require__(/*! ../../field */ 57));
var _SkuImgUploader = _interopRequireDefault(__webpack_require__(/*! ./SkuImgUploader */ 175));
var _SkuDateTimeField = _interopRequireDefault(__webpack_require__(/*! ./SkuDateTimeField */ 178));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // Utils
// Components
var _createNamespace = (0, _utils.createNamespace)('sku-messages'),
createComponent = _createNamespace[0],
bem = _createNamespace[1],
t = _createNamespace[2];var _default2 =

createComponent({
  props: {
    messageConfig: Object,
    goodsId: [Number, String],
    messages: {
      type: Array,
      default: function _default() {
        return [];
      } } },


  data: function data() {
    return {
      messageValues: this.resetMessageValues(this.messages) };

  },
  watch: {
    messages: function messages(val) {
      this.messageValues = this.resetMessageValues(val);
    } },

  methods: {
    resetMessageValues: function resetMessageValues(messages) {
      var messageConfig = this.messageConfig;
      var _messageConfig$initia = messageConfig.initialMessages,
      initialMessages = _messageConfig$initia === void 0 ? {} : _messageConfig$initia;
      return (messages || []).map(function (message) {
        return {
          value: initialMessages[message.name] || '' };

      });
    },
    getType: function getType(message) {
      if (+message.multiple === 1) {
        return 'textarea';
      }

      if (message.type === 'id_no') {
        return 'text';
      }

      return message.datetime > 0 ? 'datetime' : message.type;
    },
    getMessages: function getMessages() {
      var messages = {};
      this.messageValues.forEach(function (item, index) {
        messages["message_" + index] = item.value;
      });
      return messages;
    },
    getCartMessages: function getCartMessages() {
      var _this = this;

      var messages = {};
      this.messageValues.forEach(function (item, index) {
        var message = _this.messages[index];
        messages[message.name] = item.value;
      });
      return messages;
    },
    getPlaceholder: function getPlaceholder(message) {
      var type = +message.multiple === 1 ? 'textarea' : message.type;
      var map = this.messageConfig.placeholderMap || {};
      return message.placeholder || map[type] || t("placeholder." + type);
    },
    validateMessages: function validateMessages() {
      var values = this.messageValues;

      for (var i = 0; i < values.length; i++) {
        var value = values[i].value;
        var message = this.messages[i];

        if (value === '') {
          // 必填字段的校验
          if (String(message.required) === '1') {
            var textType = t(message.type === 'image' ? 'upload' : 'fill');
            return textType + message.name;
          }
        } else {
          if (message.type === 'tel' && !(0, _number.isNumeric)(value)) {
            return t('invalid.tel');
          }

          if (message.type === 'mobile' && !/^\d{6,20}$/.test(value)) {
            return t('invalid.mobile');
          }

          if (message.type === 'email' && !(0, _email.isEmail)(value)) {
            return t('invalid.email');
          }

          if (message.type === 'id_no' && (value.length < 15 || value.length > 18)) {
            return t('invalid.id_no');
          }
        }
      }
    },

    /**
        * The phone number copied from IOS mobile phone address book
        * will add spaces and invisible Unicode characters
        * which cannot pass the /^\d+$/ verification
        * so keep numbers and dots
        */
    getFormatter: function getFormatter(message) {
      return function formatter(value) {
        if (message.type === 'mobile' || message.type === 'tel') {
          return value.replace(/[^\d.]/g, '');
        }

        return value;
      };
    },
    genMessage: function genMessage(message, index) {
      var _this2 = this;

      var h = this.$createElement;

      if (message.type === 'image') {
        return h(_cell.default, {
          "key": this.goodsId + "-" + index,
          "attrs": {
            "title": message.name,
            "required": String(message.required) === '1',
            "valueClass": bem('image-cell-value') },

          "class": bem('image-cell') },
        [h(_SkuImgUploader.default, {
          "attrs": {
            "maxSize": this.messageConfig.uploadMaxSize,
            "uploadImg": this.messageConfig.uploadImg },

          "model": {
            value: _this2.messageValues[index].value,
            callback: function callback($$v) {
              _this2.$set(_this2.messageValues[index], "value", $$v);
            } } }),

        h("div", {
          "class": bem('image-cell-label') },
        [t('imageLabel')])]);
      } // 时间和日期使用的vant选择器


      var isDateOrTime = ['date', 'time'].indexOf(message.type) > -1;

      if (isDateOrTime) {
        return h(_SkuDateTimeField.default, {
          "attrs": {
            "label": message.name,
            "required": String(message.required) === '1',
            "placeholder": this.getPlaceholder(message),
            "type": this.getType(message) },

          "key": this.goodsId + "-" + index,
          "model": {
            value: _this2.messageValues[index].value,
            callback: function callback($$v) {
              _this2.$set(_this2.messageValues[index], "value", $$v);
            } } });


      }

      return h(_field.default, {
        "attrs": {
          "maxlength": "200",
          "center": !message.multiple,
          "label": message.name,
          "required": String(message.required) === '1',
          "placeholder": this.getPlaceholder(message),
          "type": this.getType(message),
          "formatter": this.getFormatter(message) },

        "key": this.goodsId + "-" + index,
        "model": {
          value: _this2.messageValues[index].value,
          callback: function callback($$v) {
            _this2.$set(_this2.messageValues[index], "value", $$v);
          } } });


    } },

  render: function render() {
    var h = arguments[0];
    return h("div", {
      "class": bem() },
    [this.messages.map(this.genMessage)]);
  } });exports.default = _default2;

/***/ }),
/* 174 */
/*!*******************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/utils/validate/email.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.isEmail = isEmail; /* eslint-disable */
function isEmail(value) {
  var reg = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
  return reg.test(value);
}

/***/ }),
/* 175 */
/*!****************************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/sku/components/SkuImgUploader.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _utils = __webpack_require__(/*! ../../utils */ 17);

var _uploader = _interopRequireDefault(__webpack_require__(/*! ../../uploader */ 176));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // Utils
// Components
var namespace = (0, _utils.createNamespace)('sku-img-uploader');var createComponent = namespace[0];
var t = namespace[2];var _default =
createComponent({
  props: {
    value: String,
    uploadImg: Function,
    maxSize: {
      type: Number,
      default: 6 } },


  data: function data() {
    return {
      fileList: [] };

  },
  watch: {
    value: function value(val) {
      if (val) {
        this.fileList = [{
          url: val,
          isImage: true }];

      } else {
        this.fileList = [];
      }
    } },

  methods: {
    afterReadFile: function afterReadFile(file) {
      var _this = this;

      file.status = 'uploading';
      file.message = t('uploading');
      this.uploadImg(file.file, file.content).then(function (img) {
        file.status = 'done';

        _this.$emit('input', img);
      }).catch(function () {
        file.status = 'failed';
        file.message = t('fail');
      });
    },
    onOversize: function onOversize() {
      this.$toast(t('oversize', this.maxSize));
    },
    onDelete: function onDelete() {
      this.$emit('input', '');
    } },

  render: function render() {
    var _this2 = this;

    var h = arguments[0];
    return h(_uploader.default, {
      "attrs": {
        "maxCount": 1,
        "afterRead": this.afterReadFile,
        "maxSize": this.maxSize * 1024 * 1024 },

      "on": {
        "oversize": this.onOversize,
        "delete": this.onDelete },

      "model": {
        value: _this2.fileList,
        callback: function callback($$v) {
          _this2.fileList = $$v;
        } } });


  } });exports.default = _default;

/***/ }),
/* 176 */
/*!*************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/uploader/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/esm/extends */ 15));

var _utils = __webpack_require__(/*! ../utils */ 17);
var _utils2 = __webpack_require__(/*! ./utils */ 177);

var _field = __webpack_require__(/*! ../mixins/field */ 73);

var _icon = _interopRequireDefault(__webpack_require__(/*! ../icon */ 41));
var _image = _interopRequireDefault(__webpack_require__(/*! ../image */ 89));
var _loading = _interopRequireDefault(__webpack_require__(/*! ../loading */ 44));
var _imagePreview = _interopRequireDefault(__webpack_require__(/*! ../image-preview */ 128));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // Utils
// Mixins
// Components
var _createNamespace = (0, _utils.createNamespace)('uploader'),createComponent = _createNamespace[0],
bem = _createNamespace[1];var _default2 =

createComponent({
  inheritAttrs: false,
  mixins: [_field.FieldMixin],
  model: {
    prop: 'fileList' },

  props: {
    disabled: Boolean,
    lazyLoad: Boolean,
    uploadText: String,
    afterRead: Function,
    beforeRead: Function,
    beforeDelete: Function,
    previewSize: [Number, String],
    previewOptions: Object,
    name: {
      type: [Number, String],
      default: '' },

    accept: {
      type: String,
      default: 'image/*' },

    fileList: {
      type: Array,
      default: function _default() {
        return [];
      } },

    maxSize: {
      type: [Number, String],
      default: Number.MAX_VALUE },

    maxCount: {
      type: [Number, String],
      default: Number.MAX_VALUE },

    deletable: {
      type: Boolean,
      default: true },

    showUpload: {
      type: Boolean,
      default: true },

    previewImage: {
      type: Boolean,
      default: true },

    previewFullImage: {
      type: Boolean,
      default: true },

    imageFit: {
      type: String,
      default: 'cover' },

    resultType: {
      type: String,
      default: 'dataUrl' },

    uploadIcon: {
      type: String,
      default: 'photograph' } },


  computed: {
    previewSizeWithUnit: function previewSizeWithUnit() {
      return (0, _utils.addUnit)(this.previewSize);
    },
    // for form
    value: function value() {
      return this.fileList;
    } },

  methods: {
    getDetail: function getDetail(index) {
      if (index === void 0) {
        index = this.fileList.length;
      }

      return {
        name: this.name,
        index: index };

    },
    onChange: function onChange(event) {
      var _this = this;

      var files = event.target.files;

      if (this.disabled || !files.length) {
        return;
      }

      files = files.length === 1 ? files[0] : [].slice.call(files);

      if (this.beforeRead) {
        var response = this.beforeRead(files, this.getDetail());

        if (!response) {
          this.resetInput();
          return;
        }

        if ((0, _utils.isPromise)(response)) {
          response.then(function (data) {
            if (data) {
              _this.readFile(data);
            } else {
              _this.readFile(files);
            }
          }).catch(this.resetInput);
          return;
        }
      }

      this.readFile(files);
    },
    readFile: function readFile(files) {
      var _this2 = this;

      var oversize = (0, _utils2.isOversize)(files, this.maxSize);

      if (Array.isArray(files)) {
        var maxCount = this.maxCount - this.fileList.length;

        if (files.length > maxCount) {
          files = files.slice(0, maxCount);
        }

        Promise.all(files.map(function (file) {
          return (0, _utils2.readFile)(file, _this2.resultType);
        })).then(function (contents) {
          var fileList = files.map(function (file, index) {
            var result = {
              file: file,
              status: '',
              message: '' };


            if (contents[index]) {
              result.content = contents[index];
            }

            return result;
          });

          _this2.onAfterRead(fileList, oversize);
        });
      } else {
        (0, _utils2.readFile)(files, this.resultType).then(function (content) {
          var result = {
            file: files,
            status: '',
            message: '' };


          if (content) {
            result.content = content;
          }

          _this2.onAfterRead(result, oversize);
        });
      }
    },
    onAfterRead: function onAfterRead(files, oversize) {
      var _this3 = this;

      this.resetInput();
      var validFiles = files;

      if (oversize) {
        var oversizeFiles = files;

        if (Array.isArray(files)) {
          oversizeFiles = [];
          validFiles = [];
          files.forEach(function (item) {
            if (item.file) {
              if (item.file.size > _this3.maxSize) {
                oversizeFiles.push(item);
              } else {
                validFiles.push(item);
              }
            }
          });
        } else {
          validFiles = null;
        }

        this.$emit('oversize', oversizeFiles, this.getDetail());
      }

      var isValidFiles = Array.isArray(validFiles) ? Boolean(validFiles.length) : Boolean(validFiles);

      if (isValidFiles) {
        this.$emit('input', [].concat(this.fileList, (0, _utils2.toArray)(validFiles)));

        if (this.afterRead) {
          this.afterRead(validFiles, this.getDetail());
        }
      }
    },
    onDelete: function onDelete(file, index) {
      var _file$beforeDelete,
      _this4 = this;

      var beforeDelete = (_file$beforeDelete = file.beforeDelete) != null ? _file$beforeDelete : this.beforeDelete;

      if (beforeDelete) {
        var response = beforeDelete(file, this.getDetail(index));

        if (!response) {
          return;
        }

        if ((0, _utils.isPromise)(response)) {
          response.then(function () {
            _this4.deleteFile(file, index);
          }).catch(_utils.noop);
          return;
        }
      }

      this.deleteFile(file, index);
    },
    deleteFile: function deleteFile(file, index) {
      var fileList = this.fileList.slice(0);
      fileList.splice(index, 1);
      this.$emit('input', fileList);
      this.$emit('delete', file, this.getDetail(index));
    },
    resetInput: function resetInput() {
      /* istanbul ignore else */
      if (this.$refs.input) {
        this.$refs.input.value = '';
      }
    },
    onPreviewImage: function onPreviewImage(item) {
      var _this5 = this;

      if (!this.previewFullImage) {
        return;
      }

      var imageFiles = this.fileList.filter(function (item) {
        return (0, _utils2.isImageFile)(item);
      });
      var imageContents = imageFiles.map(function (item) {
        return item.content || item.url;
      });
      this.imagePreview = (0, _imagePreview.default)((0, _extends2.default)({
        images: imageContents,
        startPosition: imageFiles.indexOf(item),
        onClose: function onClose() {
          _this5.$emit('close-preview');
        } },
      this.previewOptions));
    },
    // @exposed-api
    closeImagePreview: function closeImagePreview() {
      if (this.imagePreview) {
        this.imagePreview.close();
      }
    },
    // @exposed-api
    chooseFile: function chooseFile() {
      if (this.disabled) {
        return;
      }
      /* istanbul ignore else */


      if (this.$refs.input) {
        this.$refs.input.click();
      }
    },
    genPreviewMask: function genPreviewMask(item) {
      var h = this.$createElement;
      var status = item.status,
      message = item.message;

      if (status === 'uploading' || status === 'failed') {
        var MaskIcon = status === 'failed' ? h(_icon.default, {
          "attrs": {
            "name": "close" },

          "class": bem('mask-icon') }) :
        h(_loading.default, {
          "class": bem('loading') });

        var showMessage = (0, _utils.isDef)(message) && message !== '';
        return h("div", {
          "class": bem('mask') },
        [MaskIcon, showMessage && h("div", {
          "class": bem('mask-message') },
        [message])]);
      }
    },
    genPreviewItem: function genPreviewItem(item, index) {
      var _item$deletable,
      _this6 = this,
      _item$previewSize,
      _item$imageFit;

      var h = this.$createElement;
      var deleteAble = (_item$deletable = item.deletable) != null ? _item$deletable : this.deletable;
      var showDelete = item.status !== 'uploading' && deleteAble;
      var DeleteIcon = showDelete && h("div", {
        "class": bem('preview-delete'),
        "on": {
          "click": function click(event) {
            event.stopPropagation();

            _this6.onDelete(item, index);
          } } },

      [h(_icon.default, {
        "attrs": {
          "name": "cross" },

        "class": bem('preview-delete-icon') })]);

      var PreviewCoverContent = this.slots('preview-cover', (0, _extends2.default)({
        index: index },
      item));
      var PreviewCover = PreviewCoverContent && h("div", {
        "class": bem('preview-cover') },
      [PreviewCoverContent]);
      var previewSize = (_item$previewSize = item.previewSize) != null ? _item$previewSize : this.previewSize;
      var imageFit = (_item$imageFit = item.imageFit) != null ? _item$imageFit : this.imageFit;
      var Preview = (0, _utils2.isImageFile)(item) ? h(_image.default, {
        "attrs": {
          "fit": imageFit,
          "src": item.content || item.url,
          "width": previewSize,
          "height": previewSize,
          "lazyLoad": this.lazyLoad },

        "class": bem('preview-image'),
        "on": {
          "click": function click() {
            _this6.onPreviewImage(item);
          } } },

      [PreviewCover]) : h("div", {
        "class": bem('file'),
        "style": {
          width: this.previewSizeWithUnit,
          height: this.previewSizeWithUnit } },

      [h(_icon.default, {
        "class": bem('file-icon'),
        "attrs": {
          "name": "description" } }),

      h("div", {
        "class": [bem('file-name'), 'van-ellipsis'] },
      [item.file ? item.file.name : item.url]), PreviewCover]);
      return h("div", {
        "class": bem('preview'),
        "on": {
          "click": function click() {
            _this6.$emit('click-preview', item, _this6.getDetail(index));
          } } },

      [Preview, this.genPreviewMask(item), DeleteIcon]);
    },
    genPreviewList: function genPreviewList() {
      if (this.previewImage) {
        return this.fileList.map(this.genPreviewItem);
      }
    },
    genUpload: function genUpload() {
      var h = this.$createElement;

      if (this.fileList.length >= this.maxCount || !this.showUpload) {
        return;
      }

      var slot = this.slots();
      var Input = h("input", {
        "attrs": (0, _extends2.default)({}, this.$attrs, {
          "type": "file",
          "accept": this.accept,
          "disabled": this.disabled }),

        "ref": "input",
        "class": bem('input'),
        "on": {
          "change": this.onChange } });



      if (slot) {
        return h("div", {
          "class": bem('input-wrapper') },
        [slot, Input]);
      }

      var style;

      if (this.previewSize) {
        var size = this.previewSizeWithUnit;
        style = {
          width: size,
          height: size };

      }

      return h("div", {
        "class": bem('upload'),
        "style": style },
      [h(_icon.default, {
        "attrs": {
          "name": this.uploadIcon },

        "class": bem('upload-icon') }),
      this.uploadText && h("span", {
        "class": bem('upload-text') },
      [this.uploadText]), Input]);
    } },

  render: function render() {
    var h = arguments[0];
    return h("div", {
      "class": bem() },
    [h("div", {
      "class": bem('wrapper', {
        disabled: this.disabled }) },

    [this.genPreviewList(), this.genUpload()])]);
  } });exports.default = _default2;

/***/ }),
/* 177 */
/*!*************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/uploader/utils.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.toArray = toArray;exports.readFile = readFile;exports.isOversize = isOversize;exports.isImageUrl = isImageUrl;exports.isImageFile = isImageFile;function toArray(item) {
  if (Array.isArray(item)) {
    return item;
  }

  return [item];
}
function readFile(file, resultType) {
  return new Promise(function (resolve) {
    if (resultType === 'file') {
      resolve();
      return;
    }

    var reader = new FileReader();

    reader.onload = function (event) {
      resolve(event.target.result);
    };

    if (resultType === 'dataUrl') {
      reader.readAsDataURL(file);
    } else if (resultType === 'text') {
      reader.readAsText(file);
    }
  });
}
function isOversize(files, maxSize) {
  return toArray(files).some(function (file) {
    return file.size > maxSize;
  });
}
var IMAGE_REGEXP = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i;
function isImageUrl(url) {
  return IMAGE_REGEXP.test(url);
}
function isImageFile(item) {
  // some special urls cannot be recognized
  // user can add `isImage` flag to mark it as an image url
  if (item.isImage) {
    return true;
  }

  if (item.file && item.file.type) {
    return item.file.type.indexOf('image') === 0;
  }

  if (item.url) {
    return isImageUrl(item.url);
  }

  if (item.content) {
    return item.content.indexOf('data:image') === 0;
  }

  return false;
}

/***/ }),
/* 178 */
/*!******************************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/sku/components/SkuDateTimeField.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _utils = __webpack_require__(/*! ../../utils */ 17);
var _timeHelper = __webpack_require__(/*! ../utils/time-helper */ 179);

var _popup = _interopRequireDefault(__webpack_require__(/*! ../../popup */ 43));
var _datetimePicker = _interopRequireDefault(__webpack_require__(/*! ../../datetime-picker */ 114));
var _field = _interopRequireDefault(__webpack_require__(/*! ../../field */ 57));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // Utils
// Components
var namespace = (0, _utils.createNamespace)('sku-datetime-field');var createComponent = namespace[0];
var t = namespace[2];var _default =
createComponent({
  props: {
    value: String,
    label: String,
    required: Boolean,
    placeholder: String,
    type: {
      type: String,
      default: 'date' } },


  data: function data() {
    return {
      showDatePicker: false,
      currentDate: this.type === 'time' ? '' : new Date(),
      minDate: new Date(new Date().getFullYear() - 60, 0, 1) };

  },
  watch: {
    value: function value(val) {
      switch (this.type) {
        case 'time':
          this.currentDate = val;
          break;

        case 'date':
        case 'datetime':
          this.currentDate = (0, _timeHelper.stringToDate)(val) || new Date();
          break;}

    } },

  computed: {
    title: function title() {
      return t("title." + this.type);
    } },

  methods: {
    onClick: function onClick() {
      this.showDatePicker = true;
    },
    onConfirm: function onConfirm(val) {
      var data = val;

      if (this.type !== 'time') {
        data = (0, _timeHelper.dateToString)(val, this.type);
      }

      this.$emit('input', data);
      this.showDatePicker = false;
    },
    onCancel: function onCancel() {
      this.showDatePicker = false;
    },
    formatter: function formatter(type, val) {
      var word = t("format." + type);
      return "" + val + word;
    } },

  render: function render() {
    var _this = this;

    var h = arguments[0];
    return h(_field.default, {
      "attrs": {
        "readonly": true,
        "is-link": true,
        "center": true,
        "value": this.value,
        "label": this.label,
        "required": this.required,
        "placeholder": this.placeholder },

      "on": {
        "click": this.onClick } },

    [h(_popup.default, {
      "attrs": {
        "round": true,
        "position": "bottom",
        "getContainer": "body" },

      "slot": "extra",
      "model": {
        value: _this.showDatePicker,
        callback: function callback($$v) {
          _this.showDatePicker = $$v;
        } } },

    [h(_datetimePicker.default, {
      "attrs": {
        "type": this.type,
        "title": this.title,
        "value": this.currentDate,
        "minDate": this.minDate,
        "formatter": this.formatter },

      "on": {
        "cancel": this.onCancel,
        "confirm": this.onConfirm } })])]);


  } });exports.default = _default;

/***/ }),
/* 179 */
/*!********************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/sku/utils/time-helper.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.stringToDate = stringToDate;exports.dateToString = dateToString;var _string = __webpack_require__(/*! ../../utils/format/string */ 24); // 字符串转 Date
// 只处理 YYYY-MM-DD 或者 YYYY-MM-DD HH:MM 格式

function stringToDate(timeString) {
  if (!timeString) {
    return null;
  }

  return new Date(timeString.replace(/-/g, '/'));
} // Date 转字符串
// type: date or datetime

function dateToString(date, type) {
  if (type === void 0) {
    type = 'date';
  }

  if (!date) {
    return '';
  }

  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var timeString = year + "-" + (0, _string.padZero)(month) + "-" + (0, _string.padZero)(day);

  if (type === 'datetime') {
    var hours = date.getHours();
    var minute = date.getMinutes();
    timeString += " " + (0, _string.padZero)(hours) + ":" + (0, _string.padZero)(minute);
  }

  return timeString;
}

/***/ }),
/* 180 */
/*!************************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/sku/components/SkuActions.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _babelHelperVueJsxMergeProps = _interopRequireDefault(__webpack_require__(/*! @vue/babel-helper-vue-jsx-merge-props */ 16));

var _utils = __webpack_require__(/*! ../../utils */ 17);
var _functional = __webpack_require__(/*! ../../utils/functional */ 29);

var _button = _interopRequireDefault(__webpack_require__(/*! ../../button */ 63));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // Utils
// Components
// Types
var _createNamespace = (0, _utils.createNamespace)('sku-actions'),createComponent = _createNamespace[0],
bem = _createNamespace[1],
t = _createNamespace[2];

function SkuActions(h, props, slots, ctx) {
  var createEmitter = function createEmitter(name) {
    return function () {
      props.skuEventBus.$emit(name);
    };
  };

  return h("div", (0, _babelHelperVueJsxMergeProps.default)([{
    "class": bem() },
  (0, _functional.inherit)(ctx)]), [props.showAddCartBtn && h(_button.default, {
    "attrs": {
      "size": "large",
      "type": "warning",
      "text": props.addCartText || t('addCart') },

    "on": {
      "click": createEmitter('sku:addCart') } }),

  h(_button.default, {
    "attrs": {
      "size": "large",
      "type": "danger",
      "text": props.buyText || t('buy') },

    "on": {
      "click": createEmitter('sku:buy') } })]);


}

SkuActions.props = {
  buyText: String,
  addCartText: String,
  skuEventBus: Object,
  showAddCartBtn: Boolean };var _default =

createComponent(SkuActions);exports.default = _default;

/***/ }),
/* 181 */
/*!***********************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/slider/index.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _utils = __webpack_require__(/*! ../utils */ 17);
var _deepClone = __webpack_require__(/*! ../utils/deep-clone */ 52);
var _event = __webpack_require__(/*! ../utils/dom/event */ 34);
var _touch = __webpack_require__(/*! ../mixins/touch */ 37);
var _field = __webpack_require__(/*! ../mixins/field */ 73);

var _createNamespace = (0, _utils.createNamespace)('slider'),
createComponent = _createNamespace[0],
bem = _createNamespace[1];

var isSameValue = function isSameValue(newValue, oldValue) {
  return JSON.stringify(newValue) === JSON.stringify(oldValue);
};var _default =

createComponent({
  mixins: [_touch.TouchMixin, _field.FieldMixin],
  props: {
    disabled: Boolean,
    vertical: Boolean,
    range: Boolean,
    barHeight: [Number, String],
    buttonSize: [Number, String],
    activeColor: String,
    inactiveColor: String,
    min: {
      type: [Number, String],
      default: 0 },

    max: {
      type: [Number, String],
      default: 100 },

    step: {
      type: [Number, String],
      default: 1 },

    value: {
      type: [Number, Array],
      default: 0 } },


  data: function data() {
    return {
      dragStatus: '' };

  },
  computed: {
    scope: function scope() {
      return this.max - this.min;
    },
    buttonStyle: function buttonStyle() {
      if (this.buttonSize) {
        var size = (0, _utils.addUnit)(this.buttonSize);
        return {
          width: size,
          height: size };

      }
    } },

  created: function created() {
    // format initial value
    this.updateValue(this.value);
  },
  mounted: function mounted() {
    if (this.range) {
      this.bindTouchEvent(this.$refs.wrapper0);
      this.bindTouchEvent(this.$refs.wrapper1);
    } else {
      this.bindTouchEvent(this.$refs.wrapper);
    }
  },
  methods: {
    onTouchStart: function onTouchStart(event) {
      if (this.disabled) {
        return;
      }

      this.touchStart(event);
      this.currentValue = this.value;

      if (this.range) {
        this.startValue = this.value.map(this.format);
      } else {
        this.startValue = this.format(this.value);
      }

      this.dragStatus = 'start';
    },
    onTouchMove: function onTouchMove(event) {
      if (this.disabled) {
        return;
      }

      if (this.dragStatus === 'start') {
        this.$emit('drag-start');
      }

      (0, _event.preventDefault)(event, true);
      this.touchMove(event);
      this.dragStatus = 'draging';
      var rect = this.$el.getBoundingClientRect();
      var delta = this.vertical ? this.deltaY : this.deltaX;
      var total = this.vertical ? rect.height : rect.width;
      var diff = delta / total * this.scope;

      if (this.range) {
        this.currentValue[this.index] = this.startValue[this.index] + diff;
      } else {
        this.currentValue = this.startValue + diff;
      }

      this.updateValue(this.currentValue);
    },
    onTouchEnd: function onTouchEnd() {
      if (this.disabled) {
        return;
      }

      if (this.dragStatus === 'draging') {
        this.updateValue(this.currentValue, true);
        this.$emit('drag-end');
      }

      this.dragStatus = '';
    },
    onClick: function onClick(event) {
      event.stopPropagation();
      if (this.disabled) return;
      var rect = this.$el.getBoundingClientRect();
      var delta = this.vertical ? event.clientY - rect.top : event.clientX - rect.left;
      var total = this.vertical ? rect.height : rect.width;
      var value = +this.min + delta / total * this.scope;

      if (this.range) {
        var _this$value = this.value,
        left = _this$value[0],
        right = _this$value[1];
        var middle = (left + right) / 2;

        if (value <= middle) {
          left = value;
        } else {
          right = value;
        }

        value = [left, right];
      }

      this.startValue = this.value;
      this.updateValue(value, true);
    },
    // 处理两个滑块重叠之后的情况
    handleOverlap: function handleOverlap(value) {
      if (value[0] > value[1]) {
        value = (0, _deepClone.deepClone)(value);
        return value.reverse();
      }

      return value;
    },
    updateValue: function updateValue(value, end) {
      if (this.range) {
        value = this.handleOverlap(value).map(this.format);
      } else {
        value = this.format(value);
      }

      if (!isSameValue(value, this.value)) {
        this.$emit('input', value);
      }

      if (end && !isSameValue(value, this.startValue)) {
        this.$emit('change', value);
      }
    },
    format: function format(value) {
      return Math.round(Math.max(this.min, Math.min(value, this.max)) / this.step) * this.step;
    } },

  render: function render() {
    var _wrapperStyle,
    _this = this,
    _barStyle;

    var h = arguments[0];
    var vertical = this.vertical;
    var mainAxis = vertical ? 'height' : 'width';
    var crossAxis = vertical ? 'width' : 'height';
    var wrapperStyle = (_wrapperStyle = {
      background: this.inactiveColor },
    _wrapperStyle[crossAxis] = (0, _utils.addUnit)(this.barHeight), _wrapperStyle); // 计算选中条的长度百分比

    var calcMainAxis = function calcMainAxis() {
      var value = _this.value,
      min = _this.min,
      range = _this.range,
      scope = _this.scope;

      if (range) {
        return (value[1] - value[0]) * 100 / scope + "%";
      }

      return (value - min) * 100 / scope + "%";
    }; // 计算选中条的开始位置的偏移量


    var calcOffset = function calcOffset() {
      var value = _this.value,
      min = _this.min,
      range = _this.range,
      scope = _this.scope;

      if (range) {
        return (value[0] - min) * 100 / scope + "%";
      }

      return null;
    };

    var barStyle = (_barStyle = {}, _barStyle[mainAxis] = calcMainAxis(), _barStyle.left = this.vertical ? null : calcOffset(), _barStyle.top = this.vertical ? calcOffset() : null, _barStyle.background = this.activeColor, _barStyle);

    if (this.dragStatus) {
      barStyle.transition = 'none';
    }

    var renderButton = function renderButton(i) {
      var map = ['left', 'right'];
      var isNumber = typeof i === 'number';

      var getClassName = function getClassName() {
        if (isNumber) {
          return "button-wrapper-" + map[i];
        }

        return "button-wrapper";
      };

      var getRefName = function getRefName() {
        if (isNumber) {
          return "wrapper" + i;
        }

        return "wrapper";
      };

      return h("div", {
        "ref": getRefName(),
        "attrs": {
          "role": "slider",
          "tabindex": _this.disabled ? -1 : 0,
          "aria-valuemin": _this.min,
          "aria-valuenow": _this.value,
          "aria-valuemax": _this.max,
          "aria-orientation": _this.vertical ? 'vertical' : 'horizontal' },

        "class": bem(getClassName()),
        "on": {
          "touchstart": function touchstart() {
            if (isNumber) {
              // 保存当前按钮的索引
              _this.index = i;
            }
          },
          "click": function click(e) {
            return e.stopPropagation();
          } } },

      [_this.slots('button') || h("div", {
        "class": bem('button'),
        "style": _this.buttonStyle })]);

    };

    return h("div", {
      "style": wrapperStyle,
      "class": bem({
        disabled: this.disabled,
        vertical: vertical }),

      "on": {
        "click": this.onClick } },

    [h("div", {
      "class": bem('bar'),
      "style": barStyle },
    [this.range ? [renderButton(0), renderButton(1)] : renderButton()])]);
  } });exports.default = _default;

/***/ }),
/* 182 */
/*!*********************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/step/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _utils = __webpack_require__(/*! ../utils */ 17);
var _constant = __webpack_require__(/*! ../utils/constant */ 50);
var _relation = __webpack_require__(/*! ../mixins/relation */ 67);
var _icon = _interopRequireDefault(__webpack_require__(/*! ../icon */ 41));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var _createNamespace = (0, _utils.createNamespace)('step'),
createComponent = _createNamespace[0],
bem = _createNamespace[1];var _default =

createComponent({
  mixins: [(0, _relation.ChildrenMixin)('vanSteps')],
  computed: {
    status: function status() {
      if (this.index < this.parent.active) {
        return 'finish';
      }

      if (this.index === +this.parent.active) {
        return 'process';
      }
    },
    active: function active() {
      return this.status === 'process';
    },
    lineStyle: function lineStyle() {
      if (this.status === 'finish') {
        return {
          background: this.parent.activeColor };

      }

      return {
        background: this.parent.inactiveColor };

    },
    titleStyle: function titleStyle() {
      if (this.active) {
        return {
          color: this.parent.activeColor };

      }

      if (!this.status) {
        return {
          color: this.parent.inactiveColor };

      }
    } },

  methods: {
    genCircle: function genCircle() {
      var h = this.$createElement;
      var _this$parent = this.parent,
      activeIcon = _this$parent.activeIcon,
      activeColor = _this$parent.activeColor,
      inactiveIcon = _this$parent.inactiveIcon;

      if (this.active) {
        return this.slots('active-icon') || h(_icon.default, {
          "class": bem('icon', 'active'),
          "attrs": {
            "name": activeIcon,
            "color": activeColor } });


      }

      var inactiveIconSlot = this.slots('inactive-icon');

      if (inactiveIcon || inactiveIconSlot) {
        return inactiveIconSlot || h(_icon.default, {
          "class": bem('icon'),
          "attrs": {
            "name": inactiveIcon } });


      }

      return h("i", {
        "class": bem('circle'),
        "style": this.lineStyle });

    },
    onClickStep: function onClickStep() {
      this.parent.$emit('click-step', this.index);
    } },

  render: function render() {
    var _ref;

    var h = arguments[0];
    var status = this.status,
    active = this.active;
    var direction = this.parent.direction;
    return h("div", {
      "class": [_constant.BORDER, bem([direction, (_ref = {}, _ref[status] = status, _ref)])] },
    [h("div", {
      "class": bem('title', {
        active: active }),

      "style": this.titleStyle,
      "on": {
        "click": this.onClickStep } },

    [this.slots()]), h("div", {
      "class": bem('circle-container'),
      "on": {
        "click": this.onClickStep } },

    [this.genCircle()]), h("div", {
      "class": bem('line'),
      "style": this.lineStyle })]);

  } });exports.default = _default;

/***/ }),
/* 183 */
/*!**********************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/steps/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _utils = __webpack_require__(/*! ../utils */ 17);
var _relation = __webpack_require__(/*! ../mixins/relation */ 67);

var _createNamespace = (0, _utils.createNamespace)('steps'),
createComponent = _createNamespace[0],
bem = _createNamespace[1];var _default =

createComponent({
  mixins: [(0, _relation.ParentMixin)('vanSteps')],
  props: {
    activeColor: String,
    inactiveIcon: String,
    inactiveColor: String,
    active: {
      type: [Number, String],
      default: 0 },

    direction: {
      type: String,
      default: 'horizontal' },

    activeIcon: {
      type: String,
      default: 'checked' } },


  render: function render() {
    var h = arguments[0];
    return h("div", {
      "class": bem([this.direction]) },
    [h("div", {
      "class": bem('items') },
    [this.slots()])]);
  } });exports.default = _default;

/***/ }),
/* 184 */
/*!***************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/submit-bar/index.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _babelHelperVueJsxMergeProps = _interopRequireDefault(__webpack_require__(/*! @vue/babel-helper-vue-jsx-merge-props */ 16));

var _utils = __webpack_require__(/*! ../utils */ 17);
var _functional = __webpack_require__(/*! ../utils/functional */ 29);

var _icon = _interopRequireDefault(__webpack_require__(/*! ../icon */ 41));
var _button = _interopRequireDefault(__webpack_require__(/*! ../button */ 63));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // Utils
// Components
// Types
var _createNamespace = (0, _utils.createNamespace)('submit-bar'),createComponent = _createNamespace[0],
bem = _createNamespace[1],
t = _createNamespace[2];

function SubmitBar(h, props, slots, ctx) {
  var tip = props.tip,
  price = props.price,
  tipIcon = props.tipIcon;

  function Text() {
    if (typeof price === 'number') {
      var priceArr = (price / 100).toFixed(props.decimalLength).split('.');
      var decimalStr = props.decimalLength ? "." + priceArr[1] : '';
      return h("div", {
        "style": {
          textAlign: props.textAlign ? props.textAlign : '' },

        "class": bem('text') },
      [h("span", [props.label || t('label')]), h("span", {
        "class": bem('price') },
      [props.currency, h("span", {
        "class": bem('price', 'integer') },
      [priceArr[0]]), decimalStr]), props.suffixLabel && h("span", {
        "class": bem('suffix-label') },
      [props.suffixLabel])]);
    }
  }

  function Tip() {
    if (slots.tip || tip) {
      return h("div", {
        "class": bem('tip') },
      [tipIcon && h(_icon.default, {
        "class": bem('tip-icon'),
        "attrs": {
          "name": tipIcon } }),

      tip && h("span", {
        "class": bem('tip-text') },
      [tip]), slots.tip && slots.tip()]);
    }
  }

  return h("div", (0, _babelHelperVueJsxMergeProps.default)([{
    "class": bem({
      unfit: !props.safeAreaInsetBottom }) },

  (0, _functional.inherit)(ctx)]), [slots.top && slots.top(), Tip(), h("div", {
    "class": bem('bar') },
  [slots.default && slots.default(), Text(), slots.button ? slots.button() : h(_button.default, {
    "attrs": {
      "round": true,
      "type": props.buttonType,
      "text": props.loading ? '' : props.buttonText,
      "color": props.buttonColor,
      "loading": props.loading,
      "disabled": props.disabled },

    "class": bem('button', props.buttonType),
    "on": {
      "click": function click() {
        (0, _functional.emit)(ctx, 'submit');
      } } })])]);


}

SubmitBar.props = {
  tip: String,
  label: String,
  price: Number,
  tipIcon: String,
  loading: Boolean,
  disabled: Boolean,
  textAlign: String,
  buttonText: String,
  buttonColor: String,
  suffixLabel: String,
  safeAreaInsetBottom: {
    type: Boolean,
    default: true },

  decimalLength: {
    type: [Number, String],
    default: 2 },

  currency: {
    type: String,
    default: '¥' },

  buttonType: {
    type: String,
    default: 'danger' } };var _default =


createComponent(SubmitBar);exports.default = _default;

/***/ }),
/* 185 */
/*!***************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/swipe-cell/index.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _utils = __webpack_require__(/*! ../utils */ 17);
var _number = __webpack_require__(/*! ../utils/format/number */ 53);
var _event = __webpack_require__(/*! ../utils/dom/event */ 34);

var _touch = __webpack_require__(/*! ../mixins/touch */ 37);
var _clickOutside = __webpack_require__(/*! ../mixins/click-outside */ 121); // Utils
// Mixins
var _createNamespace = (0, _utils.createNamespace)('swipe-cell'),
createComponent = _createNamespace[0],
bem = _createNamespace[1];

var THRESHOLD = 0.15;var _default =
createComponent({
  mixins: [_touch.TouchMixin, (0, _clickOutside.ClickOutsideMixin)({
    event: 'touchstart',
    method: 'onClick' })],

  props: {
    // @deprecated
    // should be removed in next major version, use beforeClose instead
    onClose: Function,
    disabled: Boolean,
    leftWidth: [Number, String],
    rightWidth: [Number, String],
    beforeClose: Function,
    stopPropagation: Boolean,
    name: {
      type: [Number, String],
      default: '' } },


  data: function data() {
    return {
      offset: 0,
      dragging: false };

  },
  computed: {
    computedLeftWidth: function computedLeftWidth() {
      return +this.leftWidth || this.getWidthByRef('left');
    },
    computedRightWidth: function computedRightWidth() {
      return +this.rightWidth || this.getWidthByRef('right');
    } },

  mounted: function mounted() {
    this.bindTouchEvent(this.$el);
  },
  methods: {
    getWidthByRef: function getWidthByRef(ref) {
      if (this.$refs[ref]) {
        var rect = this.$refs[ref].getBoundingClientRect();
        return rect.width;
      }

      return 0;
    },
    // @exposed-api
    open: function open(position) {
      var offset = position === 'left' ? this.computedLeftWidth : -this.computedRightWidth;
      this.opened = true;
      this.offset = offset;
      this.$emit('open', {
        position: position,
        name: this.name,
        // @deprecated
        // should be removed in next major version
        detail: this.name });

    },
    // @exposed-api
    close: function close(position) {
      this.offset = 0;

      if (this.opened) {
        this.opened = false;
        this.$emit('close', {
          position: position,
          name: this.name });

      }
    },
    onTouchStart: function onTouchStart(event) {
      if (this.disabled) {
        return;
      }

      this.startOffset = this.offset;
      this.touchStart(event);
    },
    onTouchMove: function onTouchMove(event) {
      if (this.disabled) {
        return;
      }

      this.touchMove(event);

      if (this.direction === 'horizontal') {
        this.dragging = true;
        this.lockClick = true;
        var isPrevent = !this.opened || this.deltaX * this.startOffset < 0;

        if (isPrevent) {
          (0, _event.preventDefault)(event, this.stopPropagation);
        }

        this.offset = (0, _number.range)(this.deltaX + this.startOffset, -this.computedRightWidth, this.computedLeftWidth);
      }
    },
    onTouchEnd: function onTouchEnd() {
      var _this = this;

      if (this.disabled) {
        return;
      }

      if (this.dragging) {
        this.toggle(this.offset > 0 ? 'left' : 'right');
        this.dragging = false; // compatible with desktop scenario

        setTimeout(function () {
          _this.lockClick = false;
        }, 0);
      }
    },
    toggle: function toggle(direction) {
      var offset = Math.abs(this.offset);
      var threshold = this.opened ? 1 - THRESHOLD : THRESHOLD;
      var computedLeftWidth = this.computedLeftWidth,
      computedRightWidth = this.computedRightWidth;

      if (computedRightWidth && direction === 'right' && offset > computedRightWidth * threshold) {
        this.open('right');
      } else if (computedLeftWidth && direction === 'left' && offset > computedLeftWidth * threshold) {
        this.open('left');
      } else {
        this.close();
      }
    },
    onClick: function onClick(position) {
      if (position === void 0) {
        position = 'outside';
      }

      this.$emit('click', position);

      if (this.opened && !this.lockClick) {
        if (this.beforeClose) {
          this.beforeClose({
            position: position,
            name: this.name,
            instance: this });

        } else if (this.onClose) {
          this.onClose(position, this, {
            name: this.name });

        } else {
          this.close(position);
        }
      }
    },
    getClickHandler: function getClickHandler(position, stop) {
      var _this2 = this;

      return function (event) {
        if (stop) {
          event.stopPropagation();
        }

        _this2.onClick(position);
      };
    },
    genLeftPart: function genLeftPart() {
      var h = this.$createElement;
      var content = this.slots('left');

      if (content) {
        return h("div", {
          "ref": "left",
          "class": bem('left'),
          "on": {
            "click": this.getClickHandler('left', true) } },

        [content]);
      }
    },
    genRightPart: function genRightPart() {
      var h = this.$createElement;
      var content = this.slots('right');

      if (content) {
        return h("div", {
          "ref": "right",
          "class": bem('right'),
          "on": {
            "click": this.getClickHandler('right', true) } },

        [content]);
      }
    } },

  render: function render() {
    var h = arguments[0];
    var wrapperStyle = {
      transform: "translate3d(" + this.offset + "px, 0, 0)",
      transitionDuration: this.dragging ? '0s' : '.6s' };

    return h("div", {
      "class": bem(),
      "on": {
        "click": this.getClickHandler('cell') } },

    [h("div", {
      "class": bem('wrapper'),
      "style": wrapperStyle },
    [this.genLeftPart(), this.slots(), this.genRightPart()])]);
  } });exports.default = _default;

/***/ }),
/* 186 */
/*!****************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/switch-cell/index.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/esm/extends */ 15));
var _babelHelperVueJsxMergeProps = _interopRequireDefault(__webpack_require__(/*! @vue/babel-helper-vue-jsx-merge-props */ 16));

var _utils = __webpack_require__(/*! ../utils */ 17);
var _functional = __webpack_require__(/*! ../utils/functional */ 29);

var _cell = _interopRequireDefault(__webpack_require__(/*! ../cell */ 54));
var _switch = _interopRequireDefault(__webpack_require__(/*! ../switch */ 71));
var _shared = __webpack_require__(/*! ../switch/shared */ 72);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // Utils
// Components
// Types
var _createNamespace = (0, _utils.createNamespace)('switch-cell'),createComponent = _createNamespace[0],
bem = _createNamespace[1];

function SwitchCell(h, props, slots, ctx) {
  if (true) {
    console.warn('[Vant] "SwitchCell" component is deprecated, see: https://youzan.github.io/vant/#/zh-CN/switch-cell.');
  }

  return h(_cell.default, (0, _babelHelperVueJsxMergeProps.default)([{
    "attrs": {
      "center": true,
      "size": props.cellSize,
      "title": props.title,
      "border": props.border },

    "class": bem([props.cellSize]) },
  (0, _functional.inherit)(ctx)]), [h(_switch.default, {
    "props": (0, _extends2.default)({}, props),
    "on": (0, _extends2.default)({}, ctx.listeners) })]);

}

SwitchCell.props = (0, _extends2.default)({}, _shared.switchProps, {
  title: String,
  cellSize: String,
  border: {
    type: Boolean,
    default: true },

  size: {
    type: String,
    default: '24px' } });var _default =


createComponent(SwitchCell);exports.default = _default;

/***/ }),
/* 187 */
/*!***********************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/tabbar/index.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _utils = __webpack_require__(/*! ../utils */ 17);
var _constant = __webpack_require__(/*! ../utils/constant */ 50);
var _interceptor = __webpack_require__(/*! ../utils/interceptor */ 95);
var _relation = __webpack_require__(/*! ../mixins/relation */ 67);

var _createNamespace = (0, _utils.createNamespace)('tabbar'),
createComponent = _createNamespace[0],
bem = _createNamespace[1];var _default =

createComponent({
  mixins: [(0, _relation.ParentMixin)('vanTabbar')],
  props: {
    route: Boolean,
    zIndex: [Number, String],
    placeholder: Boolean,
    activeColor: String,
    beforeChange: Function,
    inactiveColor: String,
    value: {
      type: [Number, String],
      default: 0 },

    border: {
      type: Boolean,
      default: true },

    fixed: {
      type: Boolean,
      default: true },

    safeAreaInsetBottom: {
      type: Boolean,
      default: null } },


  data: function data() {
    return {
      height: null };

  },
  computed: {
    fit: function fit() {
      if (this.safeAreaInsetBottom !== null) {
        return this.safeAreaInsetBottom;
      } // enable safe-area-inset-bottom by default when fixed


      return this.fixed;
    } },

  watch: {
    value: 'setActiveItem',
    children: 'setActiveItem' },

  mounted: function mounted() {
    if (this.placeholder && this.fixed) {
      this.height = this.$refs.tabbar.getBoundingClientRect().height;
    }
  },
  methods: {
    setActiveItem: function setActiveItem() {
      var _this = this;

      this.children.forEach(function (item, index) {
        item.active = (item.name || index) === _this.value;
      });
    },
    onChange: function onChange(active) {
      var _this2 = this;

      if (active !== this.value) {
        (0, _interceptor.callInterceptor)({
          interceptor: this.beforeChange,
          args: [active],
          done: function done() {
            _this2.$emit('input', active);

            _this2.$emit('change', active);
          } });

      }
    },
    genTabbar: function genTabbar() {
      var _ref;

      var h = this.$createElement;
      return h("div", {
        "ref": "tabbar",
        "style": {
          zIndex: this.zIndex },

        "class": [(_ref = {}, _ref[_constant.BORDER_TOP_BOTTOM] = this.border, _ref), bem({
          unfit: !this.fit,
          fixed: this.fixed })] },

      [this.slots()]);
    } },

  render: function render() {
    var h = arguments[0];

    if (this.placeholder && this.fixed) {
      return h("div", {
        "class": bem('placeholder'),
        "style": {
          height: this.height + "px" } },

      [this.genTabbar()]);
    }

    return this.genTabbar();
  } });exports.default = _default;

/***/ }),
/* 188 */
/*!****************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/tabbar-item/index.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/esm/extends */ 15));

var _utils = __webpack_require__(/*! ../utils */ 17);
var _router = __webpack_require__(/*! ../utils/router */ 55);

var _relation = __webpack_require__(/*! ../mixins/relation */ 67);

var _icon = _interopRequireDefault(__webpack_require__(/*! ../icon */ 41));
var _info = _interopRequireDefault(__webpack_require__(/*! ../info */ 42));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // Utils
// Mixins
// Components
var _createNamespace = (0, _utils.createNamespace)('tabbar-item'),createComponent = _createNamespace[0],
bem = _createNamespace[1];var _default =

createComponent({
  mixins: [(0, _relation.ChildrenMixin)('vanTabbar')],
  props: (0, _extends2.default)({}, _router.routeProps, {
    dot: Boolean,
    icon: String,
    name: [Number, String],
    // @deprecated
    info: [Number, String],
    badge: [Number, String],
    iconPrefix: String }),

  data: function data() {
    return {
      active: false };

  },
  computed: {
    routeActive: function routeActive() {
      var to = this.to,
      $route = this.$route;

      if (to && $route) {
        var config = (0, _utils.isObject)(to) ? to : {
          path: to };

        var pathMatched = config.path === $route.path;
        var nameMatched = (0, _utils.isDef)(config.name) && config.name === $route.name;
        return pathMatched || nameMatched;
      }
    } },

  methods: {
    onClick: function onClick(event) {
      this.parent.onChange(this.name || this.index);
      this.$emit('click', event);
      (0, _router.route)(this.$router, this);
    },
    genIcon: function genIcon(active) {
      var h = this.$createElement;
      var slot = this.slots('icon', {
        active: active });


      if (slot) {
        return slot;
      }

      if (this.icon) {
        return h(_icon.default, {
          "attrs": {
            "name": this.icon,
            "classPrefix": this.iconPrefix } });


      }
    } },

  render: function render() {
    var _this$badge;

    var h = arguments[0];
    var active = this.parent.route ? this.routeActive : this.active;
    var color = this.parent[active ? 'activeColor' : 'inactiveColor'];

    if ( true && this.info) {
      console.warn('[Vant] TabbarItem: "info" prop is deprecated, use "badge" prop instead.');
    }

    return h("div", {
      "class": bem({
        active: active }),

      "style": {
        color: color },

      "on": {
        "click": this.onClick } },

    [h("div", {
      "class": bem('icon') },
    [this.genIcon(active), h(_info.default, {
      "attrs": {
        "dot": this.dot,
        "info": (_this$badge = this.badge) != null ? _this$badge : this.info } })]),

    h("div", {
      "class": bem('text') },
    [this.slots('default', {
      active: active })])]);

  } });exports.default = _default;

/***/ }),
/* 189 */
/*!****************************************************************!*\
  !*** E:/chats/chats/node_modules/vant/es/tree-select/index.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _babelHelperVueJsxMergeProps = _interopRequireDefault(__webpack_require__(/*! @vue/babel-helper-vue-jsx-merge-props */ 16));

var _utils = __webpack_require__(/*! ../utils */ 17);
var _functional = __webpack_require__(/*! ../utils/functional */ 29);

var _icon = _interopRequireDefault(__webpack_require__(/*! ../icon */ 41));
var _sidebar = _interopRequireDefault(__webpack_require__(/*! ../sidebar */ 158));
var _sidebarItem = _interopRequireDefault(__webpack_require__(/*! ../sidebar-item */ 159));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // Utils
// Components
// Types
var _createNamespace = (0, _utils.createNamespace)('tree-select'),createComponent = _createNamespace[0],
bem = _createNamespace[1];

function TreeSelect(h, props, slots, ctx) {
  var items = props.items,
  height = props.height,
  activeId = props.activeId,
  selectedIcon = props.selectedIcon,
  mainActiveIndex = props.mainActiveIndex;

  if (true) {
    if (ctx.listeners.navclick) {
      console.warn('[Vant] TreeSelect: "navclick" event is deprecated, use "click-nav" instead.');
    }

    if (ctx.listeners.itemclick) {
      console.warn('[Vant] TreeSelect: "itemclick" event is deprecated, use "click-item" instead.');
    }
  }

  var selectedItem = items[+mainActiveIndex] || {};
  var subItems = selectedItem.children || [];
  var isMultiple = Array.isArray(activeId);

  function isActiveItem(id) {
    return isMultiple ? activeId.indexOf(id) !== -1 : activeId === id;
  }

  var Navs = items.map(function (item) {
    var _item$badge;

    return h(_sidebarItem.default, {
      "attrs": {
        "dot": item.dot,
        "info": (_item$badge = item.badge) != null ? _item$badge : item.info,
        "title": item.text,
        "disabled": item.disabled },

      "class": [bem('nav-item'), item.className] });

  });

  function Content() {
    if (slots.content) {
      return slots.content();
    }

    return subItems.map(function (item) {
      return h("div", {
        "key": item.id,
        "class": ['van-ellipsis', bem('item', {
          active: isActiveItem(item.id),
          disabled: item.disabled })],

        "on": {
          "click": function click() {
            if (!item.disabled) {
              var newActiveId = item.id;

              if (isMultiple) {
                newActiveId = activeId.slice();
                var index = newActiveId.indexOf(item.id);

                if (index !== -1) {
                  newActiveId.splice(index, 1);
                } else if (newActiveId.length < props.max) {
                  newActiveId.push(item.id);
                }
              }

              (0, _functional.emit)(ctx, 'update:active-id', newActiveId);
              (0, _functional.emit)(ctx, 'click-item', item); // compatible with legacy usage, should be removed in next major version

              (0, _functional.emit)(ctx, 'itemclick', item);
            }
          } } },

      [item.text, isActiveItem(item.id) && h(_icon.default, {
        "attrs": {
          "name": selectedIcon },

        "class": bem('selected') })]);

    });
  }

  return h("div", (0, _babelHelperVueJsxMergeProps.default)([{
    "class": bem(),
    "style": {
      height: (0, _utils.addUnit)(height) } },

  (0, _functional.inherit)(ctx)]), [h(_sidebar.default, {
    "class": bem('nav'),
    "attrs": {
      "activeKey": mainActiveIndex },

    "on": {
      "change": function change(index) {
        (0, _functional.emit)(ctx, 'update:main-active-index', index);
        (0, _functional.emit)(ctx, 'click-nav', index); // compatible with legacy usage, should be removed in next major version

        (0, _functional.emit)(ctx, 'navclick', index);
      } } },

  [Navs]), h("div", {
    "class": bem('content') },
  [Content()])]);
}

TreeSelect.props = {
  max: {
    type: [Number, String],
    default: Infinity },

  items: {
    type: Array,
    default: function _default() {
      return [];
    } },

  height: {
    type: [Number, String],
    default: 300 },

  activeId: {
    type: [Number, String, Array],
    default: 0 },

  selectedIcon: {
    type: String,
    default: 'success' },

  mainActiveIndex: {
    type: [Number, String],
    default: 0 } };var _default2 =


createComponent(TreeSelect);exports.default = _default2;

/***/ }),
/* 190 */,
/* 191 */,
/* 192 */,
/* 193 */,
/* 194 */,
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */,
/* 207 */,
/* 208 */,
/* 209 */,
/* 210 */,
/* 211 */,
/* 212 */,
/* 213 */,
/* 214 */,
/* 215 */
/*!**************************************!*\
  !*** E:/chats/chats/static/logo.png ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAAEi6oPRAAAKQ2lDQ1BJQ0MgcHJvZmlsZQAAeNqdU3dYk/cWPt/3ZQ9WQtjwsZdsgQAiI6wIyBBZohCSAGGEEBJAxYWIClYUFRGcSFXEgtUKSJ2I4qAouGdBiohai1VcOO4f3Ke1fXrv7e371/u855zn/M55zw+AERImkeaiagA5UoU8Otgfj09IxMm9gAIVSOAEIBDmy8JnBcUAAPADeXh+dLA//AGvbwACAHDVLiQSx+H/g7pQJlcAIJEA4CIS5wsBkFIAyC5UyBQAyBgAsFOzZAoAlAAAbHl8QiIAqg0A7PRJPgUA2KmT3BcA2KIcqQgAjQEAmShHJAJAuwBgVYFSLALAwgCgrEAiLgTArgGAWbYyRwKAvQUAdo5YkA9AYACAmUIszAAgOAIAQx4TzQMgTAOgMNK/4KlfcIW4SAEAwMuVzZdL0jMUuJXQGnfy8ODiIeLCbLFCYRcpEGYJ5CKcl5sjE0jnA0zODAAAGvnRwf44P5Dn5uTh5mbnbO/0xaL+a/BvIj4h8d/+vIwCBAAQTs/v2l/l5dYDcMcBsHW/a6lbANpWAGjf+V0z2wmgWgrQevmLeTj8QB6eoVDIPB0cCgsL7SViob0w44s+/zPhb+CLfvb8QB7+23rwAHGaQJmtwKOD/XFhbnauUo7nywRCMW735yP+x4V//Y4p0eI0sVwsFYrxWIm4UCJNx3m5UpFEIcmV4hLpfzLxH5b9CZN3DQCshk/ATrYHtctswH7uAQKLDljSdgBAfvMtjBoLkQAQZzQyefcAAJO/+Y9AKwEAzZek4wAAvOgYXKiUF0zGCAAARKCBKrBBBwzBFKzADpzBHbzAFwJhBkRADCTAPBBCBuSAHAqhGJZBGVTAOtgEtbADGqARmuEQtMExOA3n4BJcgetwFwZgGJ7CGLyGCQRByAgTYSE6iBFijtgizggXmY4EImFINJKApCDpiBRRIsXIcqQCqUJqkV1II/ItchQ5jVxA+pDbyCAyivyKvEcxlIGyUQPUAnVAuagfGorGoHPRdDQPXYCWomvRGrQePYC2oqfRS+h1dAB9io5jgNExDmaM2WFcjIdFYIlYGibHFmPlWDVWjzVjHVg3dhUbwJ5h7wgkAouAE+wIXoQQwmyCkJBHWExYQ6gl7CO0EroIVwmDhDHCJyKTqE+0JXoS+cR4YjqxkFhGrCbuIR4hniVeJw4TX5NIJA7JkuROCiElkDJJC0lrSNtILaRTpD7SEGmcTCbrkG3J3uQIsoCsIJeRt5APkE+S+8nD5LcUOsWI4kwJoiRSpJQSSjVlP+UEpZ8yQpmgqlHNqZ7UCKqIOp9aSW2gdlAvU4epEzR1miXNmxZDy6Qto9XQmmlnafdoL+l0ugndgx5Fl9CX0mvoB+nn6YP0dwwNhg2Dx0hiKBlrGXsZpxi3GS+ZTKYF05eZyFQw1zIbmWeYD5hvVVgq9ip8FZHKEpU6lVaVfpXnqlRVc1U/1XmqC1SrVQ+rXlZ9pkZVs1DjqQnUFqvVqR1Vu6k2rs5Sd1KPUM9RX6O+X/2C+mMNsoaFRqCGSKNUY7fGGY0hFsYyZfFYQtZyVgPrLGuYTWJbsvnsTHYF+xt2L3tMU0NzqmasZpFmneZxzQEOxrHg8DnZnErOIc4NznstAy0/LbHWaq1mrX6tN9p62r7aYu1y7Rbt69rvdXCdQJ0snfU6bTr3dQm6NrpRuoW623XP6j7TY+t56Qn1yvUO6d3RR/Vt9KP1F+rv1u/RHzcwNAg2kBlsMThj8MyQY+hrmGm40fCE4agRy2i6kcRoo9FJoye4Ju6HZ+M1eBc+ZqxvHGKsNN5l3Gs8YWJpMtukxKTF5L4pzZRrmma60bTTdMzMyCzcrNisyeyOOdWca55hvtm82/yNhaVFnMVKizaLx5balnzLBZZNlvesmFY+VnlW9VbXrEnWXOss623WV2xQG1ebDJs6m8u2qK2brcR2m23fFOIUjynSKfVTbtox7PzsCuya7AbtOfZh9iX2bfbPHcwcEh3WO3Q7fHJ0dcx2bHC866ThNMOpxKnD6VdnG2ehc53zNRemS5DLEpd2lxdTbaeKp26fesuV5RruutK10/Wjm7ub3K3ZbdTdzD3Ffav7TS6bG8ldwz3vQfTw91jicczjnaebp8LzkOcvXnZeWV77vR5Ps5wmntYwbcjbxFvgvct7YDo+PWX6zukDPsY+Ap96n4e+pr4i3z2+I37Wfpl+B/ye+zv6y/2P+L/hefIW8U4FYAHBAeUBvYEagbMDawMfBJkEpQc1BY0FuwYvDD4VQgwJDVkfcpNvwBfyG/ljM9xnLJrRFcoInRVaG/owzCZMHtYRjobPCN8Qfm+m+UzpzLYIiOBHbIi4H2kZmRf5fRQpKjKqLupRtFN0cXT3LNas5Fn7Z72O8Y+pjLk722q2cnZnrGpsUmxj7Ju4gLiquIF4h/hF8ZcSdBMkCe2J5MTYxD2J43MC52yaM5zkmlSWdGOu5dyiuRfm6c7Lnnc8WTVZkHw4hZgSl7I/5YMgQlAvGE/lp25NHRPyhJuFT0W+oo2iUbG3uEo8kuadVpX2ON07fUP6aIZPRnXGMwlPUit5kRmSuSPzTVZE1t6sz9lx2S05lJyUnKNSDWmWtCvXMLcot09mKyuTDeR55m3KG5OHyvfkI/lz89sVbIVM0aO0Uq5QDhZML6greFsYW3i4SL1IWtQz32b+6vkjC4IWfL2QsFC4sLPYuHhZ8eAiv0W7FiOLUxd3LjFdUrpkeGnw0n3LaMuylv1Q4lhSVfJqedzyjlKD0qWlQyuCVzSVqZTJy26u9Fq5YxVhlWRV72qX1VtWfyoXlV+scKyorviwRrjm4ldOX9V89Xlt2treSrfK7etI66Trbqz3Wb+vSr1qQdXQhvANrRvxjeUbX21K3nShemr1js20zcrNAzVhNe1bzLas2/KhNqP2ep1/XctW/a2rt77ZJtrWv913e/MOgx0VO97vlOy8tSt4V2u9RX31btLugt2PGmIbur/mft24R3dPxZ6Pe6V7B/ZF7+tqdG9s3K+/v7IJbVI2jR5IOnDlm4Bv2pvtmne1cFoqDsJB5cEn36Z8e+NQ6KHOw9zDzd+Zf7f1COtIeSvSOr91rC2jbaA9ob3v6IyjnR1eHUe+t/9+7zHjY3XHNY9XnqCdKD3x+eSCk+OnZKeenU4/PdSZ3Hn3TPyZa11RXb1nQ8+ePxd07ky3X/fJ897nj13wvHD0Ivdi2yW3S609rj1HfnD94UivW2/rZffL7Vc8rnT0Tes70e/Tf/pqwNVz1/jXLl2feb3vxuwbt24m3Ry4Jbr1+Hb27Rd3Cu5M3F16j3iv/L7a/eoH+g/qf7T+sWXAbeD4YMBgz8NZD+8OCYee/pT/04fh0kfMR9UjRiONj50fHxsNGr3yZM6T4aeypxPPyn5W/3nrc6vn3/3i+0vPWPzY8Av5i8+/rnmp83Lvq6mvOscjxx+8znk98ab8rc7bfe+477rfx70fmSj8QP5Q89H6Y8en0E/3Pud8/vwv94Tz+4A5JREAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAADKmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzIgNzkuMTU5Mjg0LCAyMDE2LzA0LzE5LTEzOjEzOjQwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGRkE0MjcxNTdEQzYxMUU4QkZBOERDOEVCQ0U0NTBGMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGRkE0MjcxNDdEQzYxMUU4QkZBOERDOEVCQ0U0NTBGMSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxNS41IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QkE4RkFCN0M3REM1MTFFOEJGQThEQzhFQkNFNDUwRjEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QkE4RkFCN0Q3REM1MTFFOEJGQThEQzhFQkNFNDUwRjEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5BZZ+3AAAB1ElEQVR42mJkAALtmZb/GfAAJkIKwIoYiAA4FV1JO0Ylk0hWxILLHTgV6cyywqoIIIAYiQinb8S4iYs036E7esgEJq6ABAGAACImMBmo5m6yDcLlR5gcNnnaumhADWIhJoOTbRC+9ILPa9+o4TWAAAIlyDVAOphCc1SYqGAICNwZxumIidi8NILz2qhBdCyPaOcicgq1wRnYAAFErRKSgZo+GzSOoWpQD1sHsRCjCDnzkpp90DM+If2jUTbqoFEHjZZDpJYroyFESeNmNFHTykEqg8g9bwACCNRiVAYyLgEx1wA7Zu3V9OMhVBt1opajBlsaCh7NZaMOGnXQgFeupHZjKO1CjUbZqINGHTTqoFEHjTpo1EGjDhqMgw342kejUTaahggpoOdg1WiUjTpoODoIvL7tzSBykB5AgPbtGIdBGIYCaBR16swROEQvzT06cxjm1lRFDC0LcpXC+xJzpIdJhOW8e4z359MVWSde1C32xRYasC0mCmascDZzrQz+7NgABAgQINnRY/iUrb5D9v9l9toqCBAgQIAAAQIESAABAgQIEKCD5ZK9QPaMigoCdIJP7NdjOyoIECBAgGQBGjB8zVDjam153T0OqInJbBAWfdg8AExKZVcA71uIAAAAAElFTkSuQmCC"

/***/ })
]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map
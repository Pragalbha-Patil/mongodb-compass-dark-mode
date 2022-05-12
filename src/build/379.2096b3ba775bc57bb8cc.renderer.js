/*! For license information please see 379.2096b3ba775bc57bb8cc.renderer.js.LICENSE.txt */
  export default function _AwaitValue(value) {
    this.wrapped = value;
  }
`,s.AsyncGenerator=a("7.0.0-beta.0")`
  import AwaitValue from "AwaitValue";

  export default function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null,
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg)
        var value = result.value;
        var wrappedAwait = value instanceof AwaitValue;

        Promise.resolve(wrappedAwait ? value.wrapped : value).then(
          function (arg) {
            if (wrappedAwait) {
              resume(key === "return" ? "return" : "next", arg);
              return
            }

            settle(result.done ? "return" : "normal", arg);
          },
          function (err) { resume("throw", err); });
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({ value: value, done: true });
          break;
        case "throw":
          front.reject(value);
          break;
        default:
          front.resolve({ value: value, done: false });
          break;
      }

      front = front.next;
      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    // Hide "return" method if generator return is not supported
    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  AsyncGenerator.prototype[typeof Symbol === "function" && Symbol.asyncIterator || "@@asyncIterator"] = function () { return this; };

  AsyncGenerator.prototype.next = function (arg) { return this._invoke("next", arg); };
  AsyncGenerator.prototype.throw = function (arg) { return this._invoke("throw", arg); };
  AsyncGenerator.prototype.return = function (arg) { return this._invoke("return", arg); };
`,s.wrapAsyncGenerator=a("7.0.0-beta.0")`
  import AsyncGenerator from "AsyncGenerator";

  export default function _wrapAsyncGenerator(fn) {
    return function () {
      return new AsyncGenerator(fn.apply(this, arguments));
    };
  }
`,s.awaitAsyncGenerator=a("7.0.0-beta.0")`
  import AwaitValue from "AwaitValue";

  export default function _awaitAsyncGenerator(value) {
    return new AwaitValue(value);
  }
`,s.asyncGeneratorDelegate=a("7.0.0-beta.0")`
  export default function _asyncGeneratorDelegate(inner, awaitWrap) {
    var iter = {}, waiting = false;

    function pump(key, value) {
      waiting = true;
      value = new Promise(function (resolve) { resolve(inner[key](value)); });
      return { done: false, value: awaitWrap(value) };
    };

    iter[typeof Symbol !== "undefined" && Symbol.iterator || "@@iterator"] = function () { return this; };

    iter.next = function (value) {
      if (waiting) {
        waiting = false;
        return value;
      }
      return pump("next", value);
    };

    if (typeof inner.throw === "function") {
      iter.throw = function (value) {
        if (waiting) {
          waiting = false;
          throw value;
        }
        return pump("throw", value);
      };
    }

    if (typeof inner.return === "function") {
      iter.return = function (value) {
        if (waiting) {
          waiting = false;
          return value;
        }
        return pump("return", value);
      };
    }

    return iter;
  }
`,s.asyncToGenerator=a("7.0.0-beta.0")`
  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  export default function _asyncToGenerator(fn) {
    return function () {
      var self = this, args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);
        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }
        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }
`,s.classCallCheck=a("7.0.0-beta.0")`
  export default function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
`,s.createClass=a("7.0.0-beta.0")`
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i ++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  export default function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", { writable: false });
    return Constructor;
  }
`,s.defineEnumerableProperties=a("7.0.0-beta.0")`
  export default function _defineEnumerableProperties(obj, descs) {
    for (var key in descs) {
      var desc = descs[key];
      desc.configurable = desc.enumerable = true;
      if ("value" in desc) desc.writable = true;
      Object.defineProperty(obj, key, desc);
    }

    // Symbols are not enumerated over by for-in loops. If native
    // Symbols are available, fetch all of the descs object's own
    // symbol properties and define them on our target object too.
    if (Object.getOwnPropertySymbols) {
      var objectSymbols = Object.getOwnPropertySymbols(descs);
      for (var i = 0; i < objectSymbols.length; i++) {
        var sym = objectSymbols[i];
        var desc = descs[sym];
        desc.configurable = desc.enumerable = true;
        if ("value" in desc) desc.writable = true;
        Object.defineProperty(obj, sym, desc);
      }
    }
    return obj;
  }
`,s.defaults=a("7.0.0-beta.0")`
  export default function _defaults(obj, defaults) {
    var keys = Object.getOwnPropertyNames(defaults);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var value = Object.getOwnPropertyDescriptor(defaults, key);
      if (value && value.configurable && obj[key] === undefined) {
        Object.defineProperty(obj, key, value);
      }
    }
    return obj;
  }
`,s.defineProperty=a("7.0.0-beta.0")`
  export default function _defineProperty(obj, key, value) {
    // Shortcircuit the slow defineProperty path when possible.
    // We are trying to avoid issues where setters defined on the
    // prototype cause side effects under the fast path of simple
    // assignment. By checking for existence of the property with
    // the in operator, we can optimize most of this overhead away.
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
`,s.extends=a("7.0.0-beta.0")`
  export default function _extends() {
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
`,s.objectSpread=a("7.0.0-beta.0")`
  import defineProperty from "defineProperty";

  export default function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = (arguments[i] != null) ? Object(arguments[i]) : {};
      var ownKeys = Object.keys(source);
      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys.push.apply(ownKeys, Object.getOwnPropertySymbols(source).filter(function(sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }
      ownKeys.forEach(function(key) {
        defineProperty(target, key, source[key]);
      });
    }
    return target;
  }
`,s.inherits=a("7.0.0-beta.0")`
  import setPrototypeOf from "setPrototypeOf";

  export default function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }
    // We can't use defineProperty to set the prototype in a single step because it
    // doesn't work in Chrome <= 36. https://github.com/babel/babel/issues/14056
    // V8 bug: https://bugs.chromium.org/p/v8/issues/detail?id=3334
    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    Object.defineProperty(subClass, "prototype", { writable: false });
    if (superClass) setPrototypeOf(subClass, superClass);
  }
`,s.inheritsLoose=a("7.0.0-beta.0")`
  import setPrototypeOf from "setPrototypeOf";

  export default function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    setPrototypeOf(subClass, superClass);
  }
`,s.getPrototypeOf=a("7.0.0-beta.0")`
  export default function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf
      ? Object.getPrototypeOf
      : function _getPrototypeOf(o) {
          return o.__proto__ || Object.getPrototypeOf(o);
        };
    return _getPrototypeOf(o);
  }
`,s.setPrototypeOf=a("7.0.0-beta.0")`
  export default function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
    return _setPrototypeOf(o, p);
  }
`,s.isNativeReflectConstruct=a("7.9.0")`
  export default function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;

    // core-js@3
    if (Reflect.construct.sham) return false;

    // Proxy can't be polyfilled. Every browser implemented
    // proxies before or at the same time as Reflect.construct,
    // so if they support Proxy they also support Reflect.construct.
    if (typeof Proxy === "function") return true;

    // Since Reflect.construct can't be properly polyfilled, some
    // implementations (e.g. core-js@2) don't set the correct internal slots.
    // Those polyfills don't allow us to subclass built-ins, so we need to
    // use our fallback implementation.
    try {
      // If the internal slots aren't set, this throws an error similar to
      //   TypeError: this is not a Boolean object.

      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
      return true;
    } catch (e) {
      return false;
    }
  }
`,s.construct=a("7.0.0-beta.0")`
  import setPrototypeOf from "setPrototypeOf";
  import isNativeReflectConstruct from "isNativeReflectConstruct";

  export default function _construct(Parent, args, Class) {
    if (isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      // NOTE: If Parent !== Class, the correct __proto__ is set *after*
      //       calling the constructor.
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }
    // Avoid issues with Class being present but undefined when it wasn't
    // present in the original call.
    return _construct.apply(null, arguments);
  }
`,s.isNativeFunction=a("7.0.0-beta.0")`
  export default function _isNativeFunction(fn) {
    // Note: This function returns "true" for core-js functions.
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }
`,s.wrapNativeSuper=a("7.0.0-beta.0")`
  import getPrototypeOf from "getPrototypeOf";
  import setPrototypeOf from "setPrototypeOf";
  import isNativeFunction from "isNativeFunction";
  import construct from "construct";

  export default function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !isNativeFunction(Class)) return Class;
      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }
      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);
        _cache.set(Class, Wrapper);
      }
      function Wrapper() {
        return construct(Class, arguments, getPrototypeOf(this).constructor)
      }
      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true,
        }
      });

      return setPrototypeOf(Wrapper, Class);
    }

    return _wrapNativeSuper(Class)
  }
`,s.instanceof=a("7.0.0-beta.0")`
  export default function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
      return !!right[Symbol.hasInstance](left);
    } else {
      return left instanceof right;
    }
  }
`,s.interopRequireDefault=a("7.0.0-beta.0")`
  export default function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
`,s.interopRequireWildcard=a("7.14.0")`
  function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;

    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function (nodeInterop) {
      return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
  }

  export default function _interopRequireWildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
      return obj;
    }

    if (obj === null || (typeof obj !== "object" && typeof obj !== "function")) {
      return { default: obj }
    }

    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
      return cache.get(obj);
    }

    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) {
      if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor
          ? Object.getOwnPropertyDescriptor(obj, key)
          : null;
        if (desc && (desc.get || desc.set)) {
          Object.defineProperty(newObj, key, desc);
        } else {
          newObj[key] = obj[key];
        }
      }
    }
    newObj.default = obj;
    if (cache) {
      cache.set(obj, newObj);
    }
    return newObj;
  }
`,s.newArrowCheck=a("7.0.0-beta.0")`
  export default function _newArrowCheck(innerThis, boundThis) {
    if (innerThis !== boundThis) {
      throw new TypeError("Cannot instantiate an arrow function");
    }
  }
`,s.objectDestructuringEmpty=a("7.0.0-beta.0")`
  export default function _objectDestructuringEmpty(obj) {
    if (obj == null) throw new TypeError("Cannot destructure undefined");
  }
`,s.objectWithoutPropertiesLoose=a("7.0.0-beta.0")`
  export default function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};

    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }
`,s.objectWithoutProperties=a("7.0.0-beta.0")`
  import objectWithoutPropertiesLoose from "objectWithoutPropertiesLoose";

  export default function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};

    var target = objectWithoutPropertiesLoose(source, excluded);
    var key, i;

    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }

    return target;
  }
`,s.assertThisInitialized=a("7.0.0-beta.0")`
  export default function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
  }
`,s.possibleConstructorReturn=a("7.0.0-beta.0")`
  import assertThisInitialized from "assertThisInitialized";

  export default function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }

    return assertThisInitialized(self);
  }
`,s.createSuper=a("7.9.0")`
  import getPrototypeOf from "getPrototypeOf";
  import isNativeReflectConstruct from "isNativeReflectConstruct";
  import possibleConstructorReturn from "possibleConstructorReturn";

  export default function _createSuper(Derived) {
    var hasNativeReflectConstruct = isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = getPrototypeOf(Derived), result;
      if (hasNativeReflectConstruct) {
        // NOTE: This doesn't work if this.__proto__.constructor has been modified.
        var NewTarget = getPrototypeOf(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return possibleConstructorReturn(this, result);
    }
  }
 `,s.superPropBase=a("7.0.0-beta.0")`
  import getPrototypeOf from "getPrototypeOf";

  export default function _superPropBase(object, property) {
    // Yes, this throws if object is null to being with, that's on purpose.
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = getPrototypeOf(object);
      if (object === null) break;
    }
    return object;
  }
`,s.get=a("7.0.0-beta.0")`
  import superPropBase from "superPropBase";

  export default function _get() {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = superPropBase(target, property);

        if (!base) return;

        var desc = Object.getOwnPropertyDescriptor(base, property);
        if (desc.get) {
          // STEP 3. If receiver is not present, then set receiver to target.
          return desc.get.call(arguments.length < 3 ? target : receiver);
        }

        return desc.value;
      };
    }
    return _get.apply(this, arguments);
  }
`,s.set=a("7.0.0-beta.0")`
  import superPropBase from "superPropBase";
  import defineProperty from "defineProperty";

  function set(target, property, value, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.set) {
      set = Reflect.set;
    } else {
      set = function set(target, property, value, receiver) {
        var base = superPropBase(target, property);
        var desc;

        if (base) {
          desc = Object.getOwnPropertyDescriptor(base, property);
          if (desc.set) {
            desc.set.call(receiver, value);
            return true;
          } else if (!desc.writable) {
            // Both getter and non-writable fall into this.
            return false;
          }
        }

        // Without a super that defines the property, spec boils down to
        // "define on receiver" for some reason.
        desc = Object.getOwnPropertyDescriptor(receiver, property);
        if (desc) {
          if (!desc.writable) {
            // Setter, getter, and non-writable fall into this.
            return false;
          }

          desc.value = value;
          Object.defineProperty(receiver, property, desc);
        } else {
          // Avoid setters that may be defined on Sub's prototype, but not on
          // the instance.
          defineProperty(receiver, property, value);
        }

        return true;
      };
    }

    return set(target, property, value, receiver);
  }

  export default function _set(target, property, value, receiver, isStrict) {
    var s = set(target, property, value, receiver || target);
    if (!s && isStrict) {
      throw new Error('failed to set property');
    }

    return value;
  }
`,s.taggedTemplateLiteral=a("7.0.0-beta.0")`
  export default function _taggedTemplateLiteral(strings, raw) {
    if (!raw) { raw = strings.slice(0); }
    return Object.freeze(Object.defineProperties(strings, {
        raw: { value: Object.freeze(raw) }
    }));
  }
`,s.taggedTemplateLiteralLoose=a("7.0.0-beta.0")`
  export default function _taggedTemplateLiteralLoose(strings, raw) {
    if (!raw) { raw = strings.slice(0); }
    strings.raw = raw;
    return strings;
  }
`,s.readOnlyError=a("7.0.0-beta.0")`
  export default function _readOnlyError(name) {
    throw new TypeError("\\"" + name + "\\" is read-only");
  }
`,s.writeOnlyError=a("7.12.13")`
  export default function _writeOnlyError(name) {
    throw new TypeError("\\"" + name + "\\" is write-only");
  }
`,s.classNameTDZError=a("7.0.0-beta.0")`
  export default function _classNameTDZError(name) {
    throw new Error("Class \\"" + name + "\\" cannot be referenced in computed property keys.");
  }
`,s.temporalUndefined=a("7.0.0-beta.0")`
  // This function isn't mean to be called, but to be used as a reference.
  // We can't use a normal object because it isn't hoisted.
  export default function _temporalUndefined() {}
`,s.tdz=a("7.5.5")`
  export default function _tdzError(name) {
    throw new ReferenceError(name + " is not defined - temporal dead zone");
  }
`,s.temporalRef=a("7.0.0-beta.0")`
  import undef from "temporalUndefined";
  import err from "tdz";

  export default function _temporalRef(val, name) {
    return val === undef ? err(name) : val;
  }
`,s.slicedToArray=a("7.0.0-beta.0")`
  import arrayWithHoles from "arrayWithHoles";
  import iterableToArrayLimit from "iterableToArrayLimit";
  import unsupportedIterableToArray from "unsupportedIterableToArray";
  import nonIterableRest from "nonIterableRest";

  export default function _slicedToArray(arr, i) {
    return (
      arrayWithHoles(arr) ||
      iterableToArrayLimit(arr, i) ||
      unsupportedIterableToArray(arr, i) ||
      nonIterableRest()
    );
  }
`,s.slicedToArrayLoose=a("7.0.0-beta.0")`
  import arrayWithHoles from "arrayWithHoles";
  import iterableToArrayLimitLoose from "iterableToArrayLimitLoose";
  import unsupportedIterableToArray from "unsupportedIterableToArray";
  import nonIterableRest from "nonIterableRest";

  export default function _slicedToArrayLoose(arr, i) {
    return (
      arrayWithHoles(arr) ||
      iterableToArrayLimitLoose(arr, i) ||
      unsupportedIterableToArray(arr, i) ||
      nonIterableRest()
    );
  }
`,s.toArray=a("7.0.0-beta.0")`
  import arrayWithHoles from "arrayWithHoles";
  import iterableToArray from "iterableToArray";
  import unsupportedIterableToArray from "unsupportedIterableToArray";
  import nonIterableRest from "nonIterableRest";

  export default function _toArray(arr) {
    return (
      arrayWithHoles(arr) ||
      iterableToArray(arr) ||
      unsupportedIterableToArray(arr) ||
      nonIterableRest()
    );
  }
`,s.toConsumableArray=a("7.0.0-beta.0")`
  import arrayWithoutHoles from "arrayWithoutHoles";
  import iterableToArray from "iterableToArray";
  import unsupportedIterableToArray from "unsupportedIterableToArray";
  import nonIterableSpread from "nonIterableSpread";

  export default function _toConsumableArray(arr) {
    return (
      arrayWithoutHoles(arr) ||
      iterableToArray(arr) ||
      unsupportedIterableToArray(arr) ||
      nonIterableSpread()
    );
  }
`,s.arrayWithoutHoles=a("7.0.0-beta.0")`
  import arrayLikeToArray from "arrayLikeToArray";

  export default function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return arrayLikeToArray(arr);
  }
`,s.arrayWithHoles=a("7.0.0-beta.0")`
  export default function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
`,s.maybeArrayLike=a("7.9.0")`
  import arrayLikeToArray from "arrayLikeToArray";

  export default function _maybeArrayLike(next, arr, i) {
    if (arr && !Array.isArray(arr) && typeof arr.length === "number") {
      var len = arr.length;
      return arrayLikeToArray(arr, i !== void 0 && i < len ? i : len);
    }
    return next(arr, i);
  }
`,s.iterableToArray=a("7.0.0-beta.0")`
  export default function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
`,s.iterableToArrayLimit=a("7.0.0-beta.0")`
  export default function _iterableToArrayLimit(arr, i) {
    // this is an expanded form of \`for...of\` that properly supports abrupt completions of
    // iterators etc. variable names have been minimised to reduce the size of this massive
    // helper. sometimes spec compliance is annoying :(
    //
    // _n = _iteratorNormalCompletion
    // _d = _didIteratorError
    // _e = _iteratorError
    // _i = _iterator
    // _s = _step

    var _i = arr == null ? null : (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]);
    if (_i == null) return;

    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
`,s.iterableToArrayLimitLoose=a("7.0.0-beta.0")`
  export default function _iterableToArrayLimitLoose(arr, i) {
    var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]);
    if (_i == null) return;

    var _arr = [];
    for (_i = _i.call(arr), _step; !(_step = _i.next()).done;) {
      _arr.push(_step.value);
      if (i && _arr.length === i) break;
    }
    return _arr;
  }
`,s.unsupportedIterableToArray=a("7.9.0")`
  import arrayLikeToArray from "arrayLikeToArray";

  export default function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return arrayLikeToArray(o, minLen);
  }
`,s.arrayLikeToArray=a("7.9.0")`
  export default function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
`,s.nonIterableSpread=a("7.0.0-beta.0")`
  export default function _nonIterableSpread() {
    throw new TypeError(
      "Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
    );
  }
`,s.nonIterableRest=a("7.0.0-beta.0")`
  export default function _nonIterableRest() {
    throw new TypeError(
      "Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
    );
  }
`,s.createForOfIteratorHelper=a("7.9.0")`
  import unsupportedIterableToArray from "unsupportedIterableToArray";

  // s: start (create the iterator)
  // n: next
  // e: error (called whenever something throws)
  // f: finish (always called at the end)

  export default function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

    if (!it) {
      // Fallback for engines without symbol support
      if (
        Array.isArray(o) ||
        (it = unsupportedIterableToArray(o)) ||
        (allowArrayLike && o && typeof o.length === "number")
      ) {
        if (it) o = it;
        var i = 0;
        var F = function(){};
        return {
          s: F,
          n: function() {
            if (i >= o.length) return { done: true };
            return { done: false, value: o[i++] };
          },
          e: function(e) { throw e; },
          f: F,
        };
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    var normalCompletion = true, didErr = false, err;

    return {
      s: function() {
        it = it.call(o);
      },
      n: function() {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function(e) {
        didErr = true;
        err = e;
      },
      f: function() {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }
`,s.createForOfIteratorHelperLoose=a("7.9.0")`
  import unsupportedIterableToArray from "unsupportedIterableToArray";

  export default function _createForOfIteratorHelperLoose(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

    if (it) return (it = it.call(o)).next.bind(it);

    // Fallback for engines without symbol support
    if (
      Array.isArray(o) ||
      (it = unsupportedIterableToArray(o)) ||
      (allowArrayLike && o && typeof o.length === "number")
    ) {
      if (it) o = it;
      var i = 0;
      return function() {
        if (i >= o.length) return { done: true };
        return { done: false, value: o[i++] };
      }
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
`,s.skipFirstGeneratorNext=a("7.0.0-beta.0")`
  export default function _skipFirstGeneratorNext(fn) {
    return function () {
      var it = fn.apply(this, arguments);
      it.next();
      return it;
    }
  }
`,s.toPrimitive=a("7.1.5")`
  export default function _toPrimitive(
    input,
    hint /*: "default" | "string" | "number" | void */
  ) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
`,s.toPropertyKey=a("7.1.5")`
  import toPrimitive from "toPrimitive";

  export default function _toPropertyKey(arg) {
    var key = toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }
`,s.initializerWarningHelper=a("7.0.0-beta.0")`
    export default function _initializerWarningHelper(descriptor, context){
        throw new Error(
          'Decorating class property failed. Please ensure that ' +
          'proposal-class-properties is enabled and runs after the decorators transform.'
        );
    }
`,s.initializerDefineProperty=a("7.0.0-beta.0")`
    export default function _initializerDefineProperty(target, property, descriptor, context){
        if (!descriptor) return;

        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0,
        });
    }
`,s.applyDecoratedDescriptor=a("7.0.0-beta.0")`
    export default function _applyDecoratedDescriptor(target, property, decorators, descriptor, context){
        var desc = {};
        Object.keys(descriptor).forEach(function(key){
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;
        if ('value' in desc || desc.initializer){
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function(desc, decorator){
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0){
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0){
            Object.defineProperty(target, property, desc);
            desc = null;
        }

        return desc;
    }
`,s.classPrivateFieldLooseKey=a("7.0.0-beta.0")`
  var id = 0;
  export default function _classPrivateFieldKey(name) {
    return "__private_" + (id++) + "_" + name;
  }
`,s.classPrivateFieldLooseBase=a("7.0.0-beta.0")`
  export default function _classPrivateFieldBase(receiver, privateKey) {
    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
      throw new TypeError("attempted to use private field on non-instance");
    }
    return receiver;
  }
`,s.classPrivateFieldGet=a("7.0.0-beta.0")`
  import classApplyDescriptorGet from "classApplyDescriptorGet";
  import classExtractFieldDescriptor from "classExtractFieldDescriptor";
  export default function _classPrivateFieldGet(receiver, privateMap) {
    var descriptor = classExtractFieldDescriptor(receiver, privateMap, "get");
    return classApplyDescriptorGet(receiver, descriptor);
  }
`,s.classPrivateFieldSet=a("7.0.0-beta.0")`
  import classApplyDescriptorSet from "classApplyDescriptorSet";
  import classExtractFieldDescriptor from "classExtractFieldDescriptor";
  export default function _classPrivateFieldSet(receiver, privateMap, value) {
    var descriptor = classExtractFieldDescriptor(receiver, privateMap, "set");
    classApplyDescriptorSet(receiver, descriptor, value);
    return value;
  }
`,s.classPrivateFieldDestructureSet=a("7.4.4")`
  import classApplyDescriptorDestructureSet from "classApplyDescriptorDestructureSet";
  import classExtractFieldDescriptor from "classExtractFieldDescriptor";
  export default function _classPrivateFieldDestructureSet(receiver, privateMap) {
    var descriptor = classExtractFieldDescriptor(receiver, privateMap, "set");
    return classApplyDescriptorDestructureSet(receiver, descriptor);
  }
`,s.classExtractFieldDescriptor=a("7.13.10")`
  export default function _classExtractFieldDescriptor(receiver, privateMap, action) {
    if (!privateMap.has(receiver)) {
      throw new TypeError("attempted to " + action + " private field on non-instance");
    }
    return privateMap.get(receiver);
  }
`,s.classStaticPrivateFieldSpecGet=a("7.0.2")`
  import classApplyDescriptorGet from "classApplyDescriptorGet";
  import classCheckPrivateStaticAccess from "classCheckPrivateStaticAccess";
  import classCheckPrivateStaticFieldDescriptor from "classCheckPrivateStaticFieldDescriptor";
  export default function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) {
    classCheckPrivateStaticAccess(receiver, classConstructor);
    classCheckPrivateStaticFieldDescriptor(descriptor, "get");
    return classApplyDescriptorGet(receiver, descriptor);
  }
`,s.classStaticPrivateFieldSpecSet=a("7.0.2")`
  import classApplyDescriptorSet from "classApplyDescriptorSet";
  import classCheckPrivateStaticAccess from "classCheckPrivateStaticAccess";
  import classCheckPrivateStaticFieldDescriptor from "classCheckPrivateStaticFieldDescriptor";
  export default function _classStaticPrivateFieldSpecSet(receiver, classConstructor, descriptor, value) {
    classCheckPrivateStaticAccess(receiver, classConstructor);
    classCheckPrivateStaticFieldDescriptor(descriptor, "set");
    classApplyDescriptorSet(receiver, descriptor, value);
    return value;
  }
`,s.classStaticPrivateMethodGet=a("7.3.2")`
  import classCheckPrivateStaticAccess from "classCheckPrivateStaticAccess";
  export default function _classStaticPrivateMethodGet(receiver, classConstructor, method) {
    classCheckPrivateStaticAccess(receiver, classConstructor);
    return method;
  }
`,s.classStaticPrivateMethodSet=a("7.3.2")`
  export default function _classStaticPrivateMethodSet() {
    throw new TypeError("attempted to set read only static private field");
  }
`,s.classApplyDescriptorGet=a("7.13.10")`
  export default function _classApplyDescriptorGet(receiver, descriptor) {
    if (descriptor.get) {
      return descriptor.get.call(receiver);
    }
    return descriptor.value;
  }
`,s.classApplyDescriptorSet=a("7.13.10")`
  export default function _classApplyDescriptorSet(receiver, descriptor, value) {
    if (descriptor.set) {
      descriptor.set.call(receiver, value);
    } else {
      if (!descriptor.writable) {
        // This should only throw in strict mode, but class bodies are
        // always strict and private fields can only be used inside
        // class bodies.
        throw new TypeError("attempted to set read only private field");
      }
      descriptor.value = value;
    }
  }
`,s.classApplyDescriptorDestructureSet=a("7.13.10")`
  export default function _classApplyDescriptorDestructureSet(receiver, descriptor) {
    if (descriptor.set) {
      if (!("__destrObj" in descriptor)) {
        descriptor.__destrObj = {
          set value(v) {
            descriptor.set.call(receiver, v)
          },
        };
      }
      return descriptor.__destrObj;
    } else {
      if (!descriptor.writable) {
        // This should only throw in strict mode, but class bodies are
        // always strict and private fields can only be used inside
        // class bodies.
        throw new TypeError("attempted to set read only private field");
      }

      return descriptor;
    }
  }
`,s.classStaticPrivateFieldDestructureSet=a("7.13.10")`
  import classApplyDescriptorDestructureSet from "classApplyDescriptorDestructureSet";
  import classCheckPrivateStaticAccess from "classCheckPrivateStaticAccess";
  import classCheckPrivateStaticFieldDescriptor from "classCheckPrivateStaticFieldDescriptor";
  export default function _classStaticPrivateFieldDestructureSet(receiver, classConstructor, descriptor) {
    classCheckPrivateStaticAccess(receiver, classConstructor);
    classCheckPrivateStaticFieldDescriptor(descriptor, "set");
    return classApplyDescriptorDestructureSet(receiver, descriptor);
  }
`,s.classCheckPrivateStaticAccess=a("7.13.10")`
  export default function _classCheckPrivateStaticAccess(receiver, classConstructor) {
    if (receiver !== classConstructor) {
      throw new TypeError("Private static access of wrong provenance");
    }
  }
`,s.classCheckPrivateStaticFieldDescriptor=a("7.13.10")`
  export default function _classCheckPrivateStaticFieldDescriptor(descriptor, action) {
    if (descriptor === undefined) {
      throw new TypeError("attempted to " + action + " private static field before its declaration");
    }
  }
`,s.decorate=a("7.1.5")`
  import toArray from "toArray";
  import toPropertyKey from "toPropertyKey";

  // These comments are stripped by @babel/template
  /*::
  type PropertyDescriptor =
    | {
        value: any,
        writable: boolean,
        configurable: boolean,
        enumerable: boolean,
      }
    | {
        get?: () => any,
        set?: (v: any) => void,
        configurable: boolean,
        enumerable: boolean,
      };

  type FieldDescriptor ={
    writable: boolean,
    configurable: boolean,
    enumerable: boolean,
  };

  type Placement = "static" | "prototype" | "own";
  type Key = string | symbol; // PrivateName is not supported yet.

  type ElementDescriptor =
    | {
        kind: "method",
        key: Key,
        placement: Placement,
        descriptor: PropertyDescriptor
      }
    | {
        kind: "field",
        key: Key,
        placement: Placement,
        descriptor: FieldDescriptor,
        initializer?: () => any,
      };

  // This is exposed to the user code
  type ElementObjectInput = ElementDescriptor & {
    [@@toStringTag]?: "Descriptor"
  };

  // This is exposed to the user code
  type ElementObjectOutput = ElementDescriptor & {
    [@@toStringTag]?: "Descriptor"
    extras?: ElementDescriptor[],
    finisher?: ClassFinisher,
  };

  // This is exposed to the user code
  type ClassObject = {
    [@@toStringTag]?: "Descriptor",
    kind: "class",
    elements: ElementDescriptor[],
  };

  type ElementDecorator = (descriptor: ElementObjectInput) => ?ElementObjectOutput;
  type ClassDecorator = (descriptor: ClassObject) => ?ClassObject;
  type ClassFinisher = <A, B>(cl: Class<A>) => Class<B>;

  // Only used by Babel in the transform output, not part of the spec.
  type ElementDefinition =
    | {
        kind: "method",
        value: any,
        key: Key,
        static?: boolean,
        decorators?: ElementDecorator[],
      }
    | {
        kind: "field",
        value: () => any,
        key: Key,
        static?: boolean,
        decorators?: ElementDecorator[],
    };

  declare function ClassFactory<C>(initialize: (instance: C) => void): {
    F: Class<C>,
    d: ElementDefinition[]
  }

  */

  /*::
  // Various combinations with/without extras and with one or many finishers

  type ElementFinisherExtras = {
    element: ElementDescriptor,
    finisher?: ClassFinisher,
    extras?: ElementDescriptor[],
  };

  type ElementFinishersExtras = {
    element: ElementDescriptor,
    finishers: ClassFinisher[],
    extras: ElementDescriptor[],
  };

  type ElementsFinisher = {
    elements: ElementDescriptor[],
    finisher?: ClassFinisher,
  };

  type ElementsFinishers = {
    elements: ElementDescriptor[],
    finishers: ClassFinisher[],
  };

  */

  /*::

  type Placements = {
    static: Key[],
    prototype: Key[],
    own: Key[],
  };

  */

  // ClassDefinitionEvaluation (Steps 26-*)
  export default function _decorate(
    decorators /*: ClassDecorator[] */,
    factory /*: ClassFactory */,
    superClass /*: ?Class<*> */,
    mixins /*: ?Array<Function> */,
  ) /*: Class<*> */ {
    var api = _getDecoratorsApi();
    if (mixins) {
      for (var i = 0; i < mixins.length; i++) {
        api = mixins[i](api);
      }
    }

    var r = factory(function initialize(O) {
      api.initializeInstanceElements(O, decorated.elements);
    }, superClass);
    var decorated = api.decorateClass(
      _coalesceClassElements(r.d.map(_createElementDescriptor)),
      decorators,
    );

    api.initializeClassElements(r.F, decorated.elements);

    return api.runClassFinishers(r.F, decorated.finishers);
  }

  function _getDecoratorsApi() {
    _getDecoratorsApi = function() {
      return api;
    };

    var api = {
      elementsDefinitionOrder: [["method"], ["field"]],

      // InitializeInstanceElements
      initializeInstanceElements: function(
        /*::<C>*/ O /*: C */,
        elements /*: ElementDescriptor[] */,
      ) {
        ["method", "field"].forEach(function(kind) {
          elements.forEach(function(element /*: ElementDescriptor */) {
            if (element.kind === kind && element.placement === "own") {
              this.defineClassElement(O, element);
            }
          }, this);
        }, this);
      },

      // InitializeClassElements
      initializeClassElements: function(
        /*::<C>*/ F /*: Class<C> */,
        elements /*: ElementDescriptor[] */,
      ) {
        var proto = F.prototype;

        ["method", "field"].forEach(function(kind) {
          elements.forEach(function(element /*: ElementDescriptor */) {
            var placement = element.placement;
            if (
              element.kind === kind &&
              (placement === "static" || placement === "prototype")
            ) {
              var receiver = placement === "static" ? F : proto;
              this.defineClassElement(receiver, element);
            }
          }, this);
        }, this);
      },

      // DefineClassElement
      defineClassElement: function(
        /*::<C>*/ receiver /*: C | Class<C> */,
        element /*: ElementDescriptor */,
      ) {
        var descriptor /*: PropertyDescriptor */ = element.descriptor;
        if (element.kind === "field") {
          var initializer = element.initializer;
          descriptor = {
            enumerable: descriptor.enumerable,
            writable: descriptor.writable,
            configurable: descriptor.configurable,
            value: initializer === void 0 ? void 0 : initializer.call(receiver),
          };
        }
        Object.defineProperty(receiver, element.key, descriptor);
      },

      // DecorateClass
      decorateClass: function(
        elements /*: ElementDescriptor[] */,
        decorators /*: ClassDecorator[] */,
      ) /*: ElementsFinishers */ {
        var newElements /*: ElementDescriptor[] */ = [];
        var finishers /*: ClassFinisher[] */ = [];
        var placements /*: Placements */ = {
          static: [],
          prototype: [],
          own: [],
        };

        elements.forEach(function(element /*: ElementDescriptor */) {
          this.addElementPlacement(element, placements);
        }, this);

        elements.forEach(function(element /*: ElementDescriptor */) {
          if (!_hasDecorators(element)) return newElements.push(element);

          var elementFinishersExtras /*: ElementFinishersExtras */ = this.decorateElement(
            element,
            placements,
          );
          newElements.push(elementFinishersExtras.element);
          newElements.push.apply(newElements, elementFinishersExtras.extras);
          finishers.push.apply(finishers, elementFinishersExtras.finishers);
        }, this);

        if (!decorators) {
          return { elements: newElements, finishers: finishers };
        }

        var result /*: ElementsFinishers */ = this.decorateConstructor(
          newElements,
          decorators,
        );
        finishers.push.apply(finishers, result.finishers);
        result.finishers = finishers;

        return result;
      },

      // AddElementPlacement
      addElementPlacement: function(
        element /*: ElementDescriptor */,
        placements /*: Placements */,
        silent /*: boolean */,
      ) {
        var keys = placements[element.placement];
        if (!silent && keys.indexOf(element.key) !== -1) {
          throw new TypeError("Duplicated element (" + element.key + ")");
        }
        keys.push(element.key);
      },

      // DecorateElement
      decorateElement: function(
        element /*: ElementDescriptor */,
        placements /*: Placements */,
      ) /*: ElementFinishersExtras */ {
        var extras /*: ElementDescriptor[] */ = [];
        var finishers /*: ClassFinisher[] */ = [];

        for (
          var decorators = element.decorators, i = decorators.length - 1;
          i >= 0;
          i--
        ) {
          // (inlined) RemoveElementPlacement
          var keys = placements[element.placement];
          keys.splice(keys.indexOf(element.key), 1);

          var elementObject /*: ElementObjectInput */ = this.fromElementDescriptor(
            element,
          );
          var elementFinisherExtras /*: ElementFinisherExtras */ = this.toElementFinisherExtras(
            (0, decorators[i])(elementObject) /*: ElementObjectOutput */ ||
              elementObject,
          );

          element = elementFinisherExtras.element;
          this.addElementPlacement(element, placements);

          if (elementFinisherExtras.finisher) {
            finishers.push(elementFinisherExtras.finisher);
          }

          var newExtras /*: ElementDescriptor[] | void */ =
            elementFinisherExtras.extras;
          if (newExtras) {
            for (var j = 0; j < newExtras.length; j++) {
              this.addElementPlacement(newExtras[j], placements);
            }
            extras.push.apply(extras, newExtras);
          }
        }

        return { element: element, finishers: finishers, extras: extras };
      },

      // DecorateConstructor
      decorateConstructor: function(
        elements /*: ElementDescriptor[] */,
        decorators /*: ClassDecorator[] */,
      ) /*: ElementsFinishers */ {
        var finishers /*: ClassFinisher[] */ = [];

        for (var i = decorators.length - 1; i >= 0; i--) {
          var obj /*: ClassObject */ = this.fromClassDescriptor(elements);
          var elementsAndFinisher /*: ElementsFinisher */ = this.toClassDescriptor(
            (0, decorators[i])(obj) /*: ClassObject */ || obj,
          );

          if (elementsAndFinisher.finisher !== undefined) {
            finishers.push(elementsAndFinisher.finisher);
          }

          if (elementsAndFinisher.elements !== undefined) {
            elements = elementsAndFinisher.elements;

            for (var j = 0; j < elements.length - 1; j++) {
              for (var k = j + 1; k < elements.length; k++) {
                if (
                  elements[j].key === elements[k].key &&
                  elements[j].placement === elements[k].placement
                ) {
                  throw new TypeError(
                    "Duplicated element (" + elements[j].key + ")",
                  );
                }
              }
            }
          }
        }

        return { elements: elements, finishers: finishers };
      },

      // FromElementDescriptor
      fromElementDescriptor: function(
        element /*: ElementDescriptor */,
      ) /*: ElementObject */ {
        var obj /*: ElementObject */ = {
          kind: element.kind,
          key: element.key,
          placement: element.placement,
          descriptor: element.descriptor,
        };

        var desc = {
          value: "Descriptor",
          configurable: true,
        };
        Object.defineProperty(obj, Symbol.toStringTag, desc);

        if (element.kind === "field") obj.initializer = element.initializer;

        return obj;
      },

      // ToElementDescriptors
      toElementDescriptors: function(
        elementObjects /*: ElementObject[] */,
      ) /*: ElementDescriptor[] */ {
        if (elementObjects === undefined) return;
        return toArray(elementObjects).map(function(elementObject) {
          var element = this.toElementDescriptor(elementObject);
          this.disallowProperty(elementObject, "finisher", "An element descriptor");
          this.disallowProperty(elementObject, "extras", "An element descriptor");
          return element;
        }, this);
      },

      // ToElementDescriptor
      toElementDescriptor: function(
        elementObject /*: ElementObject */,
      ) /*: ElementDescriptor */ {
        var kind = String(elementObject.kind);
        if (kind !== "method" && kind !== "field") {
          throw new TypeError(
            'An element descriptor\\'s .kind property must be either "method" or' +
              ' "field", but a decorator created an element descriptor with' +
              ' .kind "' +
              kind +
              '"',
          );
        }

        var key = toPropertyKey(elementObject.key);

        var placement = String(elementObject.placement);
        if (
          placement !== "static" &&
          placement !== "prototype" &&
          placement !== "own"
        ) {
          throw new TypeError(
            'An element descriptor\\'s .placement property must be one of "static",' +
              ' "prototype" or "own", but a decorator created an element descriptor' +
              ' with .placement "' +
              placement +
              '"',
          );
        }

        var descriptor /*: PropertyDescriptor */ = elementObject.descriptor;

        this.disallowProperty(elementObject, "elements", "An element descriptor");

        var element /*: ElementDescriptor */ = {
          kind: kind,
          key: key,
          placement: placement,
          descriptor: Object.assign({}, descriptor),
        };

        if (kind !== "field") {
          this.disallowProperty(elementObject, "initializer", "A method descriptor");
        } else {
          this.disallowProperty(
            descriptor,
            "get",
            "The property descriptor of a field descriptor",
          );
          this.disallowProperty(
            descriptor,
            "set",
            "The property descriptor of a field descriptor",
          );
          this.disallowProperty(
            descriptor,
            "value",
            "The property descriptor of a field descriptor",
          );

          element.initializer = elementObject.initializer;
        }

        return element;
      },

      toElementFinisherExtras: function(
        elementObject /*: ElementObject */,
      ) /*: ElementFinisherExtras */ {
        var element /*: ElementDescriptor */ = this.toElementDescriptor(
          elementObject,
        );
        var finisher /*: ClassFinisher */ = _optionalCallableProperty(
          elementObject,
          "finisher",
        );
        var extras /*: ElementDescriptors[] */ = this.toElementDescriptors(
          elementObject.extras,
        );

        return { element: element, finisher: finisher, extras: extras };
      },

      // FromClassDescriptor
      fromClassDescriptor: function(
        elements /*: ElementDescriptor[] */,
      ) /*: ClassObject */ {
        var obj = {
          kind: "class",
          elements: elements.map(this.fromElementDescriptor, this),
        };

        var desc = { value: "Descriptor", configurable: true };
        Object.defineProperty(obj, Symbol.toStringTag, desc);

        return obj;
      },

      // ToClassDescriptor
      toClassDescriptor: function(
        obj /*: ClassObject */,
      ) /*: ElementsFinisher */ {
        var kind = String(obj.kind);
        if (kind !== "class") {
          throw new TypeError(
            'A class descriptor\\'s .kind property must be "class", but a decorator' +
              ' created a class descriptor with .kind "' +
              kind +
              '"',
          );
        }

        this.disallowProperty(obj, "key", "A class descriptor");
        this.disallowProperty(obj, "placement", "A class descriptor");
        this.disallowProperty(obj, "descriptor", "A class descriptor");
        this.disallowProperty(obj, "initializer", "A class descriptor");
        this.disallowProperty(obj, "extras", "A class descriptor");

        var finisher = _optionalCallableProperty(obj, "finisher");
        var elements = this.toElementDescriptors(obj.elements);

        return { elements: elements, finisher: finisher };
      },

      // RunClassFinishers
      runClassFinishers: function(
        constructor /*: Class<*> */,
        finishers /*: ClassFinisher[] */,
      ) /*: Class<*> */ {
        for (var i = 0; i < finishers.length; i++) {
          var newConstructor /*: ?Class<*> */ = (0, finishers[i])(constructor);
          if (newConstructor !== undefined) {
            // NOTE: This should check if IsConstructor(newConstructor) is false.
            if (typeof newConstructor !== "function") {
              throw new TypeError("Finishers must return a constructor.");
            }
            constructor = newConstructor;
          }
        }
        return constructor;
      },

      disallowProperty: function(obj, name, objectType) {
        if (obj[name] !== undefined) {
          throw new TypeError(objectType + " can't have a ." + name + " property.");
        }
      }
    };

    return api;
  }

  // ClassElementEvaluation
  function _createElementDescriptor(
    def /*: ElementDefinition */,
  ) /*: ElementDescriptor */ {
    var key = toPropertyKey(def.key);

    var descriptor /*: PropertyDescriptor */;
    if (def.kind === "method") {
      descriptor = {
        value: def.value,
        writable: true,
        configurable: true,
        enumerable: false,
      };
    } else if (def.kind === "get") {
      descriptor = { get: def.value, configurable: true, enumerable: false };
    } else if (def.kind === "set") {
      descriptor = { set: def.value, configurable: true, enumerable: false };
    } else if (def.kind === "field") {
      descriptor = { configurable: true, writable: true, enumerable: true };
    }

    var element /*: ElementDescriptor */ = {
      kind: def.kind === "field" ? "field" : "method",
      key: key,
      placement: def.static
        ? "static"
        : def.kind === "field"
        ? "own"
        : "prototype",
      descriptor: descriptor,
    };
    if (def.decorators) element.decorators = def.decorators;
    if (def.kind === "field") element.initializer = def.value;

    return element;
  }

  // CoalesceGetterSetter
  function _coalesceGetterSetter(
    element /*: ElementDescriptor */,
    other /*: ElementDescriptor */,
  ) {
    if (element.descriptor.get !== undefined) {
      other.descriptor.get = element.descriptor.get;
    } else {
      other.descriptor.set = element.descriptor.set;
    }
  }

  // CoalesceClassElements
  function _coalesceClassElements(
    elements /*: ElementDescriptor[] */,
  ) /*: ElementDescriptor[] */ {
    var newElements /*: ElementDescriptor[] */ = [];

    var isSameElement = function(
      other /*: ElementDescriptor */,
    ) /*: boolean */ {
      return (
        other.kind === "method" &&
        other.key === element.key &&
        other.placement === element.placement
      );
    };

    for (var i = 0; i < elements.length; i++) {
      var element /*: ElementDescriptor */ = elements[i];
      var other /*: ElementDescriptor */;

      if (
        element.kind === "method" &&
        (other = newElements.find(isSameElement))
      ) {
        if (
          _isDataDescriptor(element.descriptor) ||
          _isDataDescriptor(other.descriptor)
        ) {
          if (_hasDecorators(element) || _hasDecorators(other)) {
            throw new ReferenceError(
              "Duplicated methods (" + element.key + ") can't be decorated.",
            );
          }
          other.descriptor = element.descriptor;
        } else {
          if (_hasDecorators(element)) {
            if (_hasDecorators(other)) {
              throw new ReferenceError(
                "Decorators can't be placed on different accessors with for " +
                  "the same property (" +
                  element.key +
                  ").",
              );
            }
            other.decorators = element.decorators;
          }
          _coalesceGetterSetter(element, other);
        }
      } else {
        newElements.push(element);
      }
    }

    return newElements;
  }

  function _hasDecorators(element /*: ElementDescriptor */) /*: boolean */ {
    return element.decorators && element.decorators.length;
  }

  function _isDataDescriptor(desc /*: PropertyDescriptor */) /*: boolean */ {
    return (
      desc !== undefined &&
      !(desc.value === undefined && desc.writable === undefined)
    );
  }

  function _optionalCallableProperty /*::<T>*/(
    obj /*: T */,
    name /*: $Keys<T> */,
  ) /*: ?Function */ {
    var value = obj[name];
    if (value !== undefined && typeof value !== "function") {
      throw new TypeError("Expected '" + name + "' to be a function");
    }
    return value;
  }

`,s.classPrivateMethodGet=a("7.1.6")`
  export default function _classPrivateMethodGet(receiver, privateSet, fn) {
    if (!privateSet.has(receiver)) {
      throw new TypeError("attempted to get private field on non-instance");
    }
    return fn;
  }
`,s.checkPrivateRedeclaration=a("7.14.1")`
  export default function _checkPrivateRedeclaration(obj, privateCollection) {
    if (privateCollection.has(obj)) {
      throw new TypeError("Cannot initialize the same private elements twice on an object");
    }
  }
`,s.classPrivateFieldInitSpec=a("7.14.1")`
  import checkPrivateRedeclaration from "checkPrivateRedeclaration";

  export default function _classPrivateFieldInitSpec(obj, privateMap, value) {
    checkPrivateRedeclaration(obj, privateMap);
    privateMap.set(obj, value);
  }
`,s.classPrivateMethodInitSpec=a("7.14.1")`
  import checkPrivateRedeclaration from "checkPrivateRedeclaration";

  export default function _classPrivateMethodInitSpec(obj, privateSet) {
    checkPrivateRedeclaration(obj, privateSet);
    privateSet.add(obj);
  }
`,s.classPrivateMethodSet=a("7.1.6")`
    export default function _classPrivateMethodSet() {
      throw new TypeError("attempted to reassign private method");
    }
  `},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(46);function i(e,t){return Object.freeze({minVersion:e,ast:()=>n.default.program.ast(t)})}var s=Object.freeze({asyncIterator:i("7.15.9",'export default function _asyncIterator(iterable){var method,async,sync,retry=2;for("undefined"!=typeof Symbol&&(async=Symbol.asyncIterator,sync=Symbol.iterator);retry--;){if(async&&null!=(method=iterable[async]))return method.call(iterable);if(sync&&null!=(method=iterable[sync]))return new AsyncFromSyncIterator(method.call(iterable));async="@@asyncIterator",sync="@@iterator"}throw new TypeError("Object is not async iterable")}function AsyncFromSyncIterator(s){function AsyncFromSyncIteratorContinuation(r){if(Object(r)!==r)return Promise.reject(new TypeError(r+" is not an object."));var done=r.done;return Promise.resolve(r.value).then((function(value){return{value:value,done:done}}))}return AsyncFromSyncIterator=function(s){this.s=s,this.n=s.next},AsyncFromSyncIterator.prototype={s:null,n:null,next:function(){return AsyncFromSyncIteratorContinuation(this.n.apply(this.s,arguments))},return:function(value){var ret=this.s.return;return void 0===ret?Promise.resolve({value:value,done:!0}):AsyncFromSyncIteratorContinuation(ret.apply(this.s,arguments))},throw:function(value){var thr=this.s.return;return void 0===thr?Promise.reject(value):AsyncFromSyncIteratorContinuation(thr.apply(this.s,arguments))}},new AsyncFromSyncIterator(s)}'),jsx:i("7.0.0-beta.0",'var REACT_ELEMENT_TYPE;export default function _createRawReactElement(type,props,key,children){REACT_ELEMENT_TYPE||(REACT_ELEMENT_TYPE="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var defaultProps=type&&type.defaultProps,childrenLength=arguments.length-3;if(props||0===childrenLength||(props={children:void 0}),1===childrenLength)props.children=children;else if(childrenLength>1){for(var childArray=new Array(childrenLength),i=0;i<childrenLength;i++)childArray[i]=arguments[i+3];props.children=childArray}if(props&&defaultProps)for(var propName in defaultProps)void 0===props[propName]&&(props[propName]=defaultProps[propName]);else props||(props=defaultProps||{});return{$$typeof:REACT_ELEMENT_TYPE,type:type,key:void 0===key?null:""+key,ref:null,props:props,_owner:null}}'),objectSpread2:i("7.5.0",'import defineProperty from"defineProperty";function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}export default function _objectSpread2(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){defineProperty(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}'),typeof:i("7.0.0-beta.0",'export default function _typeof(obj){"@babel/helpers - typeof";return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj},_typeof(obj)}'),wrapRegExp:i("7.2.6",'import setPrototypeOf from"setPrototypeOf";import inherits from"inherits";export default function _wrapRegExp(){_wrapRegExp=function(re,groups){return new BabelRegExp(re,void 0,groups)};var _super=RegExp.prototype,_groups=new WeakMap;function BabelRegExp(re,flags,groups){var _this=new RegExp(re,flags);return _groups.set(_this,groups||_groups.get(re)),setPrototypeOf(_this,BabelRegExp.prototype)}function buildGroups(result,re){var g=_groups.get(re);return Object.keys(g).reduce((function(groups,name){return groups[name]=result[g[name]],groups}),Object.create(null))}return inherits(BabelRegExp,RegExp),BabelRegExp.prototype.exec=function(str){var result=_super.exec.call(this,str);return result&&(result.groups=buildGroups(result,this)),result},BabelRegExp.prototype[Symbol.replace]=function(str,substitution){if("string"==typeof substitution){var groups=_groups.get(this);return _super[Symbol.replace].call(this,str,substitution.replace(/\\$<([^>]+)>/g,(function(_,name){return"$"+groups[name]})))}if("function"==typeof substitution){var _this=this;return _super[Symbol.replace].call(this,str,(function(){var args=arguments;return"object"!=typeof args[args.length-1]&&(args=[].slice.call(args)).push(buildGroups(args,_this)),substitution.apply(this,args)}))}return _super[Symbol.replace].call(this,str,substitution)},_wrapRegExp.apply(this,arguments)}')});t.default=s},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.buildNamespaceInitStatements=function(e,t,r=!1){const n=[];let i=y(t.name);t.lazy&&(i=p(i,[]));for(const e of t.importsNamespace)e!==t.name&&n.push(s.default.statement`var NAME = SOURCE;`({NAME:e,SOURCE:d(i)}));r&&n.push(..._(e,t,!0));for(const r of t.reexportNamespace)n.push((t.lazy?s.default.statement`
            Object.defineProperty(EXPORTS, "NAME", {
              enumerable: true,
              get: function() {
                return NAMESPACE;
              }
            });
          `:s.default.statement`EXPORTS.NAME = NAMESPACE;`)({EXPORTS:e.exportName,NAME:r,NAMESPACE:d(i)}));if(t.reexportAll){const o=function(e,t,r){return(r?s.default.statement`
        Object.keys(NAMESPACE).forEach(function(key) {
          if (key === "default" || key === "__esModule") return;
          VERIFY_NAME_LIST;
          if (key in EXPORTS && EXPORTS[key] === NAMESPACE[key]) return;

          EXPORTS[key] = NAMESPACE[key];
        });
      `:s.default.statement`
        Object.keys(NAMESPACE).forEach(function(key) {
          if (key === "default" || key === "__esModule") return;
          VERIFY_NAME_LIST;
          if (key in EXPORTS && EXPORTS[key] === NAMESPACE[key]) return;

          Object.defineProperty(EXPORTS, key, {
            enumerable: true,
            get: function() {
              return NAMESPACE[key];
            },
          });
        });
    `)({NAMESPACE:t,EXPORTS:e.exportName,VERIFY_NAME_LIST:e.exportNameListName?s.default`
            if (Object.prototype.hasOwnProperty.call(EXPORTS_LIST, key)) return;
          `({EXPORTS_LIST:e.exportNameListName}):null})}(e,d(i),r);o.loc=t.reexportAll.loc,n.push(o)}return n},t.ensureStatementsHoisted=function(e){e.forEach((e=>{e._blockHoist=3}))},Object.defineProperty(t,"getModuleName",{enumerable:!0,get:function(){return u.default}}),Object.defineProperty(t,"hasExports",{enumerable:!0,get:function(){return c.hasExports}}),Object.defineProperty(t,"isModule",{enumerable:!0,get:function(){return o.isModule}}),Object.defineProperty(t,"isSideEffectImport",{enumerable:!0,get:function(){return c.isSideEffectImport}}),t.rewriteModuleStatementsAndPrepareHeader=function(e,{loose:t,exportName:r,strict:i,allowTopLevelThis:u,strictMode:h,noInterop:p,importInterop:d=(p?"none":"babel"),lazy:g,esNamespaceOnly:b,constantReexports:v=t,enumerableModuleMeta:w=t,noIncompleteNsImportDetection:T}){(0,c.validateImportInteropOption)(d),n((0,o.isModule)(e),"Cannot process module statements in a script"),e.node.sourceType="script";const A=(0,c.default)(e,r,{importInterop:d,initializeReexports:v,lazy:g,esNamespaceOnly:b});u||(0,a.default)(e),(0,l.default)(e,A),!1!==h&&(e.node.directives.some((e=>"use strict"===e.value.value))||e.unshiftContainer("directives",f(m("use strict"))));const C=[];(0,c.hasExports)(A)&&!i&&C.push(function(e,t=!1){return(t?s.default.statement`
        EXPORTS.__esModule = true;
      `:s.default.statement`
        Object.defineProperty(EXPORTS, "__esModule", {
          value: true,
        });
      `)({EXPORTS:e.exportName})}(A,w));const M=function(e,t){const r=Object.create(null);for(const e of t.local.values())for(const t of e.names)r[t]=!0;let n=!1;for(const e of t.source.values()){for(const t of e.reexports.keys())r[t]=!0;for(const t of e.reexportNamespace)r[t]=!0;n=n||!!e.reexportAll}if(!n||0===Object.keys(r).length)return null;const i=e.scope.generateUidIdentifier("exportNames");return delete r.default,{name:i.name,statement:S("var",[E(i,x(r))])}}(e,A);return M&&(A.exportNameListName=M.name,C.push(M.statement)),C.push(...function(e,t,r=!1,n=!1){const i=[];for(const[e,r]of t.local)if("import"===r.kind);else if("hoisted"===r.kind)i.push([r.names[0],P(t,r.names,y(e))]);else if(!n)for(const e of r.names)i.push([e,null]);for(const e of t.source.values()){if(!r){const r=_(t,e,!1),n=[...e.reexports.keys()];for(let e=0;e<r.length;e++)i.push([n[e],r[e]])}if(!n)for(const t of e.reexportNamespace)i.push([t,null])}i.sort(((e,t)=>e[0]>t[0]?1:-1));const s=[];if(n)for(const[,e]of i)s.push(e);else{const r=100;for(let n=0,o=[];n<i.length;n+=r){for(let a=0;a<r&&n+a<i.length;a++){const[r,l]=i[n+a];null!==l?(o.length>0&&(s.push(P(t,o,e.scope.buildUndefinedNode())),o=[]),s.push(l)):o.push(r)}o.length>0&&s.push(P(t,o,e.scope.buildUndefinedNode()))}}return s}(e,A,v,T)),{meta:A,headers:C}},Object.defineProperty(t,"rewriteThis",{enumerable:!0,get:function(){return a.default}}),t.wrapInterop=function(e,t,r){if("none"===r)return null;if("node-namespace"===r)return p(e.hub.addHelper("interopRequireWildcard"),[t,h(!0)]);if("node-default"===r)return null;let n;if("default"===r)n="interopRequireDefault";else{if("namespace"!==r)throw new Error("Unknown interop: "+r);n="interopRequireWildcard"}return p(e.hub.addHelper(n),[t])};var n=r(91),i=r(1),s=r(46),o=r(665),a=r(668),l=r(669),c=r(671),u=r(672);const{booleanLiteral:h,callExpression:p,cloneNode:d,directive:f,directiveLiteral:m,expressionStatement:g,identifier:y,isIdentifier:b,memberExpression:v,stringLiteral:w,valueToNode:x,variableDeclaration:S,variableDeclarator:E}=i,T={constant:s.default.statement`EXPORTS.EXPORT_NAME = NAMESPACE_IMPORT;`,constantComputed:s.default.statement`EXPORTS["EXPORT_NAME"] = NAMESPACE_IMPORT;`,spec:s.default.statement`
    Object.defineProperty(EXPORTS, "EXPORT_NAME", {
      enumerable: true,
      get: function() {
        return NAMESPACE_IMPORT;
      },
    });
    `},_=(e,t,r)=>{const n=t.lazy?p(y(t.name),[]):y(t.name),{stringSpecifiers:i}=e;return Array.from(t.reexports,(([s,o])=>{let a=d(n);"default"===o&&"node-default"===t.interop||(a=i.has(o)?v(a,w(o),!0):v(a,y(o)));const l={EXPORTS:e.exportName,EXPORT_NAME:s,NAMESPACE_IMPORT:a};return r||b(a)?i.has(s)?T.constantComputed(l):T.constant(l):T.spec(l)}))},A={computed:s.default.expression`EXPORTS["NAME"] = VALUE`,default:s.default.expression`EXPORTS.NAME = VALUE`};function P(e,t,r){const{stringSpecifiers:n,exportName:i}=e;return g(t.reduce(((e,t)=>{const r={EXPORTS:i,NAME:t,VALUE:e};return n.has(t)?A.computed(r):A.default(r)}),r))}},function(e,t,r){"use strict";var n=Object.getOwnPropertySymbols,i=Object.prototype.hasOwnProperty,s=Object.prototype.propertyIsEnumerable;function o(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},r=0;r<10;r++)t["_"+String.fromCharCode(r)]=r;if("0123456789"!==Object.getOwnPropertyNames(t).map((function(e){return t[e]})).join(""))return!1;var n={};return"abcdefghijklmnopqrst".split("").forEach((function(e){n[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},n)).join("")}catch(e){return!1}}()?Object.assign:function(e,t){for(var r,a,l=o(e),c=1;c<arguments.length;c++){for(var u in r=Object(arguments[c]))i.call(r,u)&&(l[u]=r[u]);if(n){a=n(r);for(var h=0;h<a.length;h++)s.call(r,a[h])&&(l[a[h]]=r[a[h]])}}return l}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"ImportInjector",{enumerable:!0,get:function(){return n.default}}),t.addDefault=function(e,t,r){return new n.default(e).addDefault(t,r)},t.addNamed=function(e,t,r,i){return new n.default(e).addNamed(t,r,i)},t.addNamespace=function(e,t,r){return new n.default(e).addNamespace(t,r)},t.addSideEffect=function(e,t,r){return new n.default(e).addSideEffect(t,r)},Object.defineProperty(t,"isModule",{enumerable:!0,get:function(){return i.default}});var n=r(666),i=r(266)},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(91),i=r(1),s=r(667),o=r(266);const{numericLiteral:a,sequenceExpression:l}=i;t.default=class{constructor(e,t,r){this._defaultOpts={importedSource:null,importedType:"commonjs",importedInterop:"babel",importingInterop:"babel",ensureLiveReference:!1,ensureNoContext:!1,importPosition:"before"};const n=e.find((e=>e.isProgram()));this._programPath=n,this._programScope=n.scope,this._hub=n.hub,this._defaultOpts=this._applyDefaults(t,r,!0)}addDefault(e,t){return this.addNamed("default",e,t)}addNamed(e,t,r){return n("string"==typeof e),this._generateImport(this._applyDefaults(t,r),e)}addNamespace(e,t){return this._generateImport(this._applyDefaults(e,t),null)}addSideEffect(e,t){return this._generateImport(this._applyDefaults(e,t),!1)}_applyDefaults(e,t,r=!1){const i=[];"string"==typeof e?(i.push({importedSource:e}),i.push(t)):(n(!t,"Unexpected secondary arguments."),i.push(e));const s=Object.assign({},this._defaultOpts);for(const e of i)e&&(Object.keys(s).forEach((t=>{void 0!==e[t]&&(s[t]=e[t])})),r||(void 0!==e.nameHint&&(s.nameHint=e.nameHint),void 0!==e.blockHoist&&(s.blockHoist=e.blockHoist)));return s}_generateImport(e,t){const r="default"===t,n=!!t&&!r,i=null===t,{importedSource:c,importedType:u,importedInterop:h,importingInterop:p,ensureLiveReference:d,ensureNoContext:f,nameHint:m,importPosition:g,blockHoist:y}=e;let b=m||t;const v=(0,o.default)(this._programPath),w=v&&"node"===p,x=v&&"babel"===p;if("after"===g&&!v)throw new Error('"importPosition": "after" is only supported in modules');const S=new s.default(c,this._programScope,this._hub);if("es6"===u){if(!w&&!x)throw new Error("Cannot import an ES6 module from CommonJS");S.import(),i?S.namespace(m||c):(r||n)&&S.named(b,t)}else{if("commonjs"!==u)throw new Error(`Unexpected interopType "${u}"`);if("babel"===h)if(w){b="default"!==b?b:c;const e=c+"$es6Default";S.import(),i?S.default(e).var(b||c).wildcardInterop():r?d?S.default(e).var(b||c).defaultInterop().read("default"):S.default(e).var(b).defaultInterop().prop(t):n&&S.default(e).read(t)}else x?(S.import(),i?S.namespace(b||c):(r||n)&&S.named(b,t)):(S.require(),i?S.var(b||c).wildcardInterop():(r||n)&&d?r?(b="default"!==b?b:c,S.var(b).read(t),S.defaultInterop()):S.var(c).read(t):r?S.var(b).defaultInterop().prop(t):n&&S.var(b).prop(t));else if("compiled"===h)w?(S.import(),i?S.default(b||c):(r||n)&&S.default(c).read(b)):x?(S.import(),i?S.namespace(b||c):(r||n)&&S.named(b,t)):(S.require(),i?S.var(b||c):(r||n)&&(d?S.var(c).read(b):S.prop(t).var(b)));else{if("uncompiled"!==h)throw new Error(`Unknown importedInterop "${h}".`);if(r&&d)throw new Error("No live reference for commonjs default");w?(S.import(),i?S.default(b||c):r?S.default(b):n&&S.default(c).read(b)):x?(S.import(),i?S.default(b||c):r?S.default(b):n&&S.named(b,t)):(S.require(),i?S.var(b||c):r?S.var(b):n&&(d?S.var(c).read(b):S.var(b).prop(t)))}}const{statements:E,resultName:T}=S.done();return this._insertStatements(E,g,y),(r||n)&&f&&"Identifier"!==T.type?l([a(0),T]):T}_insertStatements(e,t="before",r=3){const n=this._programPath.get("body");if("after"===t){for(let t=n.length-1;t>=0;t--)if(n[t].isImportDeclaration())return void n[t].insertAfter(e)}else{e.forEach((e=>{e._blockHoist=r}));const t=n.find((e=>{const t=e.node._blockHoist;return Number.isFinite(t)&&t<4}));if(t)return void t.insertBefore(e)}this._programPath.unshiftContainer("body",e)}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(91),i=r(1);const{callExpression:s,cloneNode:o,expressionStatement:a,identifier:l,importDeclaration:c,importDefaultSpecifier:u,importNamespaceSpecifier:h,importSpecifier:p,memberExpression:d,stringLiteral:f,variableDeclaration:m,variableDeclarator:g}=i;t.default=class{constructor(e,t,r){this._statements=[],this._resultName=null,this._scope=null,this._hub=null,this._importedSource=void 0,this._scope=t,this._hub=r,this._importedSource=e}done(){return{statements:this._statements,resultName:this._resultName}}import(){return this._statements.push(c([],f(this._importedSource))),this}require(){return this._statements.push(a(s(l("require"),[f(this._importedSource)]))),this}namespace(e="namespace"){const t=this._scope.generateUidIdentifier(e),r=this._statements[this._statements.length-1];return n("ImportDeclaration"===r.type),n(0===r.specifiers.length),r.specifiers=[h(t)],this._resultName=o(t),this}default(e){e=this._scope.generateUidIdentifier(e);const t=this._statements[this._statements.length-1];return n("ImportDeclaration"===t.type),n(0===t.specifiers.length),t.specifiers=[u(e)],this._resultName=o(e),this}named(e,t){if("default"===t)return this.default(e);e=this._scope.generateUidIdentifier(e);const r=this._statements[this._statements.length-1];return n("ImportDeclaration"===r.type),n(0===r.specifiers.length),r.specifiers=[p(e,l(t))],this._resultName=o(e),this}var(e){e=this._scope.generateUidIdentifier(e);let t=this._statements[this._statements.length-1];return"ExpressionStatement"!==t.type&&(n(this._resultName),t=a(this._resultName),this._statements.push(t)),this._statements[this._statements.length-1]=m("var",[g(e,t.expression)]),this._resultName=o(e),this}defaultInterop(){return this._interop(this._hub.addHelper("interopRequireDefault"))}wildcardInterop(){return this._interop(this._hub.addHelper("interopRequireWildcard"))}_interop(e){const t=this._statements[this._statements.length-1];return"ExpressionStatement"===t.type?t.expression=s(e,[t.expression]):"VariableDeclaration"===t.type?(n(1===t.declarations.length),t.declarations[0].init=s(e,[t.declarations[0].init])):n.fail("Unexpected type."),this}prop(e){const t=this._statements[this._statements.length-1];return"ExpressionStatement"===t.type?t.expression=d(t.expression,l(e)):"VariableDeclaration"===t.type?(n(1===t.declarations.length),t.declarations[0].init=d(t.declarations[0].init,l(e))):n.fail("Unexpected type:"+t.type),this}read(e){this._resultName=d(this._resultName,l(e))}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){(0,i.default)(e.node,Object.assign({},l,{noScope:!0}))};var n=r(263),i=r(28),s=r(1);const{numericLiteral:o,unaryExpression:a}=s,l=i.default.visitors.merge([n.default,{ThisExpression(e){e.replaceWith(a("void",o(0),!0))}}])},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){const r=new Map,n=new Map,i=t=>{e.requeue(t)};for(const[e,n]of t.source){for(const[t,i]of n.imports)r.set(t,[e,i,null]);for(const t of n.importsNamespace)r.set(t,[e,null,t])}for(const[e,r]of t.local){let t=n.get(e);t||(t=[],n.set(e,t)),t.push(...r.names)}const s={metadata:t,requeueInParent:i,scope:e.scope,exported:n};e.traverse(E,s),(0,o.default)(e,new Set([...Array.from(r.keys()),...Array.from(n.keys())]));const a={seen:new WeakSet,metadata:t,requeueInParent:i,scope:e.scope,imported:r,exported:n,buildImportReference:([e,r,n],i)=>{const s=t.source.get(e);if(n)return s.lazy&&(i=l(i,[])),i;let o=p(s.name);if(s.lazy&&(o=l(o,[])),"default"===r&&"node-default"===s.interop)return o;const a=t.stringSpecifiers.has(r);return y(o,a?w(r):p(r),a)}};e.traverse(A,a)};var n=r(91),i=r(1),s=r(46),o=r(670);const{assignmentExpression:a,callExpression:l,cloneNode:c,expressionStatement:u,getOuterBindingIdentifiers:h,identifier:p,isMemberExpression:d,isVariableDeclaration:f,jsxIdentifier:m,jsxMemberExpression:g,memberExpression:y,numericLiteral:b,sequenceExpression:v,stringLiteral:w,variableDeclaration:x,variableDeclarator:S}=i,E={Scope(e){e.skip()},ClassDeclaration(e){const{requeueInParent:t,exported:r,metadata:n}=this,{id:i}=e.node;if(!i)throw new Error("Expected class to have a name");const s=i.name,o=r.get(s)||[];if(o.length>0){const r=u(T(n,o,p(s)));r._blockHoist=e.node._blockHoist,t(e.insertAfter(r)[0])}},VariableDeclaration(e){const{requeueInParent:t,exported:r,metadata:n}=this;Object.keys(e.getOuterBindingIdentifiers()).forEach((i=>{const s=r.get(i)||[];if(s.length>0){const r=u(T(n,s,p(i)));r._blockHoist=e.node._blockHoist,t(e.insertAfter(r)[0])}}))}},T=(e,t,r)=>(t||[]).reduce(((t,r)=>{const{stringSpecifiers:n}=e,i=n.has(r);return a("=",y(p(e.exportName),i?w(r):p(r),i),t)}),r),_=e=>s.default.expression.ast`
    (function() {
      throw new Error('"' + '${e}' + '" is read-only.');
    })()
  `,A={ReferencedIdentifier(e){const{seen:t,buildImportReference:r,scope:n,imported:i,requeueInParent:s}=this;if(t.has(e.node))return;t.add(e.node);const o=e.node.name,a=i.get(o);if(a){if(function(e){do{switch(e.parent.type){case"TSTypeAnnotation":case"TSTypeAliasDeclaration":case"TSTypeReference":case"TypeAnnotation":case"TypeAlias":return!0;case"ExportSpecifier":return"type"===e.parentPath.parent.exportKind;default:if(e.parentPath.isStatement()||e.parentPath.isExpression())return!1}}while(e=e.parentPath)}(e))throw e.buildCodeFrameError(`Cannot transform the imported binding "${o}" since it's also used in a type annotation. Please strip type annotations using @babel/preset-typescript or @babel/preset-flow.`);const t=e.scope.getBinding(o);if(n.getBinding(o)!==t)return;const i=r(a,e.node);if(i.loc=e.node.loc,(e.parentPath.isCallExpression({callee:e.node})||e.parentPath.isOptionalCallExpression({callee:e.node})||e.parentPath.isTaggedTemplateExpression({tag:e.node}))&&d(i))e.replaceWith(v([b(0),i]));else if(e.isJSXIdentifier()&&d(i)){const{object:t,property:r}=i;e.replaceWith(g(m(t.name),m(r.name)))}else e.replaceWith(i);s(e),e.skip()}},AssignmentExpression:{exit(e){const{scope:t,seen:r,imported:i,exported:s,requeueInParent:o,buildImportReference:a}=this;if(r.has(e.node))return;r.add(e.node);const l=e.get("left");if(!l.isMemberExpression())if(l.isIdentifier()){const r=l.node.name;if(t.getBinding(r)!==e.scope.getBinding(r))return;const c=s.get(r),u=i.get(r);if((null==c?void 0:c.length)>0||u){n("="===e.node.operator,"Path was not simplified");const t=e.node;u&&(t.left=a(u,t.left),t.right=v([t.right,_(r)])),e.replaceWith(T(this.metadata,c,t)),o(e)}}else{const r=l.getOuterBindingIdentifiers(),n=Object.keys(r).filter((r=>t.getBinding(r)===e.scope.getBinding(r))),a=n.find((e=>i.has(e)));a&&(e.node.right=v([e.node.right,_(a)]));const c=[];if(n.forEach((e=>{const t=s.get(e)||[];t.length>0&&c.push(T(this.metadata,t,p(e)))})),c.length>0){let t=v(c);e.parentPath.isExpressionStatement()&&(t=u(t),t._blockHoist=e.parentPath.node._blockHoist),o(e.insertAfter(t)[0])}}}},"ForOfStatement|ForInStatement"(e){const{scope:t,node:r}=e,{left:n}=r,{exported:i,imported:s,scope:o}=this;if(!f(n)){let r,l=!1;const p=e.get("body").scope;for(const e of Object.keys(h(n)))o.getBinding(e)===t.getBinding(e)&&(i.has(e)&&(l=!0,p.hasOwnBinding(e)&&p.rename(e)),s.has(e)&&!r&&(r=e));if(!l&&!r)return;e.ensureBlock();const d=e.get("body"),f=t.generateUidIdentifierBasedOnNode(n);e.get("left").replaceWith(x("let",[S(c(f))])),t.registerDeclaration(e.get("left")),l&&d.unshiftContainer("body",u(a("=",n,f))),r&&d.unshiftContainer("body",u(_(r)))}}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){e.traverse(d,{scope:e.scope,bindingNames:t,seen:new WeakSet})};var n=r(1);const{LOGICAL_OPERATORS:i,assignmentExpression:s,binaryExpression:o,cloneNode:a,identifier:l,logicalExpression:c,numericLiteral:u,sequenceExpression:h,unaryExpression:p}=n,d={UpdateExpression:{exit(e){const{scope:t,bindingNames:r}=this,n=e.get("argument");if(!n.isIdentifier())return;const i=n.node.name;if(r.has(i)&&t.getBinding(i)===e.scope.getBinding(i))if(e.parentPath.isExpressionStatement()&&!e.isCompletionRecord()){const t="++"==e.node.operator?"+=":"-=";e.replaceWith(s(t,n.node,u(1)))}else if(e.node.prefix)e.replaceWith(s("=",l(i),o(e.node.operator[0],p("+",n.node),u(1))));else{const t=e.scope.generateUidIdentifierBasedOnNode(n.node,"old"),r=t.name;e.scope.push({id:t});const i=o(e.node.operator[0],l(r),u(1));e.replaceWith(h([s("=",l(r),p("+",n.node)),s("=",a(n.node),i),l(r)]))}}},AssignmentExpression:{exit(e){const{scope:t,seen:r,bindingNames:n}=this;if("="===e.node.operator)return;if(r.has(e.node))return;r.add(e.node);const l=e.get("left");if(!l.isIdentifier())return;const u=l.node.name;if(!n.has(u))return;if(t.getBinding(u)!==e.scope.getBinding(u))return;const h=e.node.operator.slice(0,-1);i.includes(h)?e.replaceWith(c(h,e.node.left,s("=",a(e.node.left),e.node.right))):(e.node.right=o(h,a(e.node.left),e.node.right),e.node.operator="=")}}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,{importInterop:r,initializeReexports:i=!1,lazy:a=!1,esNamespaceOnly:h=!1}){t||(t=e.scope.generateUidIdentifier("exports").name);const p=new Set;!function(e){e.get("body").forEach((e=>{e.isExportDefaultDeclaration()&&(0,s.default)(e)}))}(e);const{local:d,source:f,hasExports:m}=function(e,{lazy:t,initializeReexports:r},i){const s=function(e,t,r){const n=new Map;e.get("body").forEach((e=>{let r;if(e.isImportDeclaration())r="import";else{if(e.isExportDefaultDeclaration()&&(e=e.get("declaration")),e.isExportNamedDeclaration())if(e.node.declaration)e=e.get("declaration");else if(t&&e.node.source&&e.get("source").isStringLiteral())return void e.get("specifiers").forEach((e=>{u(e),n.set(e.get("local").node.name,"block")}));if(e.isFunctionDeclaration())r="hoisted";else if(e.isClassDeclaration())r="block";else if(e.isVariableDeclaration({kind:"var"}))r="var";else{if(!e.isVariableDeclaration())return;r="block"}}Object.keys(e.getOuterBindingIdentifiers()).forEach((e=>{n.set(e,r)}))}));const i=new Map,s=e=>{const t=e.node.name;let r=i.get(t);if(!r){const s=n.get(t);if(void 0===s)throw e.buildCodeFrameError(`Exporting local "${t}", which is not declared.`);r={names:[],kind:s},i.set(t,r)}return r};return e.get("body").forEach((e=>{if(!e.isExportNamedDeclaration()||!t&&e.node.source){if(e.isExportDefaultDeclaration()){const t=e.get("declaration");if(!t.isFunctionDeclaration()&&!t.isClassDeclaration())throw t.buildCodeFrameError("Unexpected default expression export.");s(t.get("id")).names.push("default")}}else if(e.node.declaration){const t=e.get("declaration"),r=t.getOuterBindingIdentifierPaths();Object.keys(r).forEach((e=>{if("__esModule"===e)throw t.buildCodeFrameError('Illegal export "__esModule".');s(r[e]).names.push(e)}))}else e.get("specifiers").forEach((e=>{const t=e.get("local"),n=e.get("exported"),i=s(t),o=c(n,r);if("__esModule"===o)throw n.buildCodeFrameError('Illegal export "__esModule".');i.names.push(o)}))})),i}(e,r,i),a=new Map,l=t=>{const r=t.value;let i=a.get(r);return i||(i={name:e.scope.generateUidIdentifier((0,n.basename)(r,(0,n.extname)(r))).name,interop:"none",loc:null,imports:new Map,importsNamespace:new Set,reexports:new Map,reexportNamespace:new Set,reexportAll:null,lazy:!1,source:r},a.set(r,i)),i};let h=!1;e.get("body").forEach((e=>{if(e.isImportDeclaration()){const t=l(e.node.source);t.loc||(t.loc=e.node.loc),e.get("specifiers").forEach((e=>{if(e.isImportDefaultSpecifier()){const r=e.get("local").node.name;t.imports.set(r,"default");const n=s.get(r);n&&(s.delete(r),n.names.forEach((e=>{t.reexports.set(e,"default")})))}else if(e.isImportNamespaceSpecifier()){const r=e.get("local").node.name;t.importsNamespace.add(r);const n=s.get(r);n&&(s.delete(r),n.names.forEach((e=>{t.reexportNamespace.add(e)})))}else if(e.isImportSpecifier()){const r=c(e.get("imported"),i),n=e.get("local").node.name;t.imports.set(n,r);const o=s.get(n);o&&(s.delete(n),o.names.forEach((e=>{t.reexports.set(e,r)})))}}))}else if(e.isExportAllDeclaration()){h=!0;const t=l(e.node.source);t.loc||(t.loc=e.node.loc),t.reexportAll={loc:e.node.loc}}else if(e.isExportNamedDeclaration()&&e.node.source){h=!0;const t=l(e.node.source);t.loc||(t.loc=e.node.loc),e.get("specifiers").forEach((e=>{u(e);const r=c(e.get("local"),i),n=c(e.get("exported"),i);if(t.reexports.set(n,r),"__esModule"===n)throw e.get("exported").buildCodeFrameError('Illegal export "__esModule".')}))}else(e.isExportNamedDeclaration()||e.isExportDefaultDeclaration())&&(h=!0)}));for(const e of a.values()){let t=!1,r=!1;e.importsNamespace.size>0&&(t=!0,r=!0),e.reexportAll&&(r=!0);for(const n of e.imports.values())"default"===n?t=!0:r=!0;for(const n of e.reexports.values())"default"===n?t=!0:r=!0;t&&r?e.interop="namespace":t&&(e.interop="default")}for(const[e,r]of a)if(!1!==t&&!o(r)&&!r.reexportAll)if(!0===t)r.lazy=!/\./.test(e);else if(Array.isArray(t))r.lazy=-1!==t.indexOf(e);else{if("function"!=typeof t)throw new Error(".lazy must be a boolean, string array, or function");r.lazy=t(e)}return{hasExports:h,local:s,source:a}}(e,{initializeReexports:i,lazy:a},p);!function(e){e.get("body").forEach((e=>{if(e.isImportDeclaration())e.remove();else if(e.isExportNamedDeclaration())e.node.declaration?(e.node.declaration._blockHoist=e.node._blockHoist,e.replaceWith(e.node.declaration)):e.remove();else if(e.isExportDefaultDeclaration()){const t=e.get("declaration");if(!t.isFunctionDeclaration()&&!t.isClassDeclaration())throw t.buildCodeFrameError("Unexpected default expression export.");t._blockHoist=e.node._blockHoist,e.replaceWith(t)}else e.isExportAllDeclaration()&&e.remove()}))}(e);for(const[,e]of f){e.importsNamespace.size>0&&(e.name=e.importsNamespace.values().next().value);const t=l(r,e.source);"none"===t?e.interop="none":"node"===t&&"namespace"===e.interop?e.interop="node-namespace":"node"===t&&"default"===e.interop?e.interop="node-default":h&&"namespace"===e.interop&&(e.interop="default")}return{exportName:t,exportNameListName:null,hasExports:m,local:d,source:f,stringSpecifiers:p}},t.hasExports=function(e){return e.hasExports},t.isSideEffectImport=o,t.validateImportInteropOption=a;var n=r(33),i=r(70),s=r(254);function o(e){return 0===e.imports.size&&0===e.importsNamespace.size&&0===e.reexports.size&&0===e.reexportNamespace.size&&!e.reexportAll}function a(e){if("function"!=typeof e&&"none"!==e&&"babel"!==e&&"node"!==e)throw new Error(`.importInterop must be one of "none", "babel", "node", or a function returning one of those values (received ${e}).`);return e}function l(e,t){return"function"==typeof e?a(e(t)):e}function c(e,t){if(e.isIdentifier())return e.node.name;if(e.isStringLiteral()){const r=e.node.value;return(0,i.isIdentifierName)(r)||t.add(r),r}throw new Error("Expected export specifier to be either Identifier or StringLiteral, got "+e.node.type)}function u(e){if(!e.isExportSpecifier())throw e.isExportNamespaceSpecifier()?e.buildCodeFrameError("Export namespace should be first transformed by `@babel/plugin-proposal-export-namespace-from`."):e.buildCodeFrameError("Unexpected export specifier type")}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=n;{const e=n;t.default=n=function(t,r){var n,i,s,o;return e(t,{moduleId:null!=(n=r.moduleId)?n:t.moduleId,moduleIds:null!=(i=r.moduleIds)?i:t.moduleIds,getModuleId:null!=(s=r.getModuleId)?s:t.getModuleId,moduleRoot:null!=(o=r.moduleRoot)?o:t.moduleRoot})}}function n(e,t){const{filename:r,filenameRelative:n=r,sourceRoot:i=t.moduleRoot}=e,{moduleId:s,moduleIds:o=!!s,getModuleId:a,moduleRoot:l=i}=t;if(!o)return null;if(null!=s&&!a)return s;let c=null!=l?l+"/":"";if(n){const e=null!=i?new RegExp("^"+i+"/?"):"";c+=n.replace(e,"").replace(/\.(\w*?)$/,"")}return c=c.replace(/\\/g,"/"),a&&a(c)||c}},function(e,t,r){"use strict";function n(){const e=r(230);return n=function(){return e},e}function i(){const e=r(148);return i=function(){return e},e}function s(){const e=r(46);return s=function(){return e},e}function o(){const e=r(1);return o=function(){return e},e}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t="global"){let r;const n={global:P,module:C,umd:M,var:k}[t];if(!n)throw new Error("Unsupported output type "+t);return r=n(e),(0,i().default)(r).code};var a=r(142);const{arrayExpression:l,assignmentExpression:c,binaryExpression:u,blockStatement:h,callExpression:p,cloneNode:d,conditionalExpression:f,exportNamedDeclaration:m,exportSpecifier:g,expressionStatement:y,functionExpression:b,identifier:v,memberExpression:w,objectExpression:x,program:S,stringLiteral:E,unaryExpression:T,variableDeclaration:_,variableDeclarator:A}=o();function P(e){const t=v("babelHelpers"),r=[],n=b(null,[v("global")],h(r)),i=S([y(p(n,[f(u("===",T("typeof",v("global")),E("undefined")),v("self"),v("global"))]))]);return r.push(_("var",[A(t,c("=",w(v("global"),t),x([])))])),I(r,t,e),i}function C(e){const t=[],r=I(t,null,e);return t.unshift(m(null,Object.keys(r).map((e=>g(d(r[e]),v(e)))))),S(t,[],"module")}function M(e){const t=v("babelHelpers"),r=[];return r.push(_("var",[A(t,v("global"))])),I(r,t,e),S([(n={FACTORY_PARAMETERS:v("global"),BROWSER_ARGUMENTS:c("=",w(v("root"),t),x([])),COMMON_ARGUMENTS:v("exports"),AMD_ARGUMENTS:l([E("exports")]),FACTORY_BODY:r,UMD_ROOT:v("this")},s().default.statement`
    (function (root, factory) {
      if (typeof define === "function" && define.amd) {
        define(AMD_ARGUMENTS, factory);
      } else if (typeof exports === "object") {
        factory(COMMON_ARGUMENTS);
      } else {
        factory(BROWSER_ARGUMENTS);
      }
    })(UMD_ROOT, function (FACTORY_PARAMETERS) {
      FACTORY_BODY
    });
  `(n))]);var n}function k(e){const t=v("babelHelpers"),r=[];r.push(_("var",[A(t,x([]))]));const n=S(r);return I(r,t,e),r.push(y(t)),n}function I(e,t,r){const i=e=>t?w(t,v(e)):v("_"+e),s={};return n().list.forEach((function(t){if(r&&r.indexOf(t)<0)return;const o=s[t]=i(t);n().ensure(t,a.default);const{nodes:l}=n().get(t,i,o);e.push(...l)})),s}},function(e,t,r){"use strict";function n(){const e=r(29);return n=function(){return e},e}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=r(269),s=r(150),o=r(34),a=r(94),l=r(95),c=r(277);function u(){const e=r(28);return u=function(){return e},e}var h=r(96),p=r(97),d=r(698),f=r(699),m=r(280),g=(r(279),n()((function*(e){var t;const r=yield*(0,m.default)(e);if(!r)return null;const{options:n,context:i,fileHandling:o}=r;if("ignored"===o)return null;const a={},{plugins:c,presets:u}=n;if(!c||!u)throw new Error("Assertion failure - plugins and presets exist");const h=Object.assign({},i,{targets:n.targets}),d=e=>{const t=(0,l.getItemDescriptor)(e);if(!t)throw new Error("Assertion failure - must be config item");return t},f=u.map(d),g=c.map(d),b=[[]],v=[];if(yield*y(i,(function*e(t,r){const n=[];for(let e=0;e<t.length;e++){const i=t[e];if(!1!==i.options)try{i.ownPass?n.push({preset:yield*T(i,h),pass:[]}):n.unshift({preset:yield*T(i,h),pass:r})}catch(r){throw"BABEL_UNKNOWN_OPTION"===r.code&&(0,p.checkNoUnwrappedItemOptionPairs)(t,e,"preset",r),r}}if(n.length>0){b.splice(1,0,...n.map((e=>e.pass)).filter((e=>e!==r)));for(const{preset:t,pass:r}of n){if(!t)return!0;if(r.push(...t.plugins),yield*e(t.presets,r))return!0;t.options.forEach((e=>{(0,s.mergeOptions)(a,e)}))}}}))(f,b[0]))return null;const w=a;(0,s.mergeOptions)(w,n);const S=Object.assign({},h,{assumptions:null!=(t=w.assumptions)?t:{}});return yield*y(i,(function*(){b[0].unshift(...g);for(const e of b){const t=[];v.push(t);for(let r=0;r<e.length;r++){const n=e[r];if(!1!==n.options)try{t.push(yield*x(n,S))}catch(t){throw"BABEL_UNKNOWN_PLUGIN_PROPERTY"===t.code&&(0,p.checkNoUnwrappedItemOptionPairs)(e,r,"plugin",t),t}}}}))(),w.plugins=v[0],w.presets=v.slice(1).filter((e=>e.length>0)).map((e=>({plugins:e}))),w.passPerPreset=w.presets.length>0,{options:w,passes:v}})));function y(e,t){return function*(r,n){try{return yield*t(r,n)}catch(t){throw/^\[BABEL\]/.test(t.message)||(t.message=`[BABEL] ${e.filename||"unknown"}: ${t.message}`),t}}}t.default=g;const b=e=>(0,h.makeWeakCache)((function*({value:t,options:r,dirname:n,alias:s},a){if(!1===r)throw new Error("Assertion failure");r=r||{};let l=t;if("function"==typeof t){const c=(0,i.maybeAsync)(t,"You appear to be using an async plugin/preset, but Babel has been called synchronously"),u=Object.assign({},o,e(a));try{l=yield*c(u,r,n)}catch(e){throw s&&(e.message+=` (While processing: ${JSON.stringify(s)})`),e}}if(!l||"object"!=typeof l)throw new Error("Plugin/Preset did not return an object.");if((0,i.isThenable)(l))throw yield*[],new Error(`You appear to be using a promise as a plugin, which your current version of Babel does not support. If you're using a published plugin, you may need to upgrade your @babel/core version. As an alternative, you can prefix the promise with "await". (While processing: ${JSON.stringify(s)})`);return{value:l,options:r,dirname:n,alias:s}})),v=b(f.makePluginAPI),w=b(f.makePresetAPI);function*x(e,t){if(e.value instanceof a.default){if(e.options)throw new Error("Passed options to an existing Plugin instance will not work.");return e.value}return yield*S(yield*v(e,t),t)}const S=(0,h.makeWeakCache)((function*({value:e,options:t,dirname:r,alias:n},s){const o=(0,d.validatePluginObject)(e),l=Object.assign({},o);if(l.visitor&&(l.visitor=u().default.explode(Object.assign({},l.visitor))),l.inherits){const e={name:void 0,alias:n+"$inherits",value:l.inherits,options:t,dirname:r},o=yield*(0,i.forwardAsync)(x,(t=>s.invalidate((r=>t(e,r)))));l.pre=A(o.pre,l.pre),l.post=A(o.post,l.post),l.manipulateOptions=A(o.manipulateOptions,l.manipulateOptions),l.visitor=u().default.visitors.merge([o.visitor||{},l.visitor||{}])}return new a.default(l,t,n)})),E=(e,t)=>{if(e.test||e.include||e.exclude){const e=t.name?`"${t.name}"`:"/* your preset */";throw new Error([`Preset ${e} requires a filename to be set when babel is called directly,`,"```",`babel.transform(code, { filename: 'file.ts', presets: [${e}] });`,"```","See https://babeljs.io/docs/en/options#filename for more information."].join("\n"))}};function*T(e,t){const r=_(yield*w(e,t));return((e,t,r)=>{if(!t.filename){const{options:t}=e;E(t,r),t.overrides&&t.overrides.forEach((e=>E(e,r)))}})(r,t,e),yield*(0,c.buildPresetChain)(r,t)}const _=(0,h.makeWeakCacheSync)((({value:e,dirname:t,alias:r})=>({options:(0,p.validate)("preset",e),alias:r,dirname:t})));function A(e,t){const r=[e,t].filter(Boolean);return r.length<=1?r[0]:function(...e){for(const t of r)t.apply(this,e)}}},function(e,t,r){(function(t){var n=r(676),i=r(677).agents,s=r(683),o=r(684),a=r(685),l=r(273),c=r(686);function u(e,t){return 0===(e+".").indexOf(t+".")}function h(e){return e.filter((function(e){return"string"==typeof e}))}function p(e){var t=e;return 3===e.split(".").length&&(t=e.split(".").slice(0,-1).join(".")),t}function d(e){return function(t){return e+" "+t}}function f(e){return parseInt(e.split(".")[0])}function m(e,t){if(0===e.length)return[];var r=g(e.map(f)),n=r[r.length-t];if(!n)return e;for(var i=[],s=e.length-1;s>=0&&!(n>f(e[s]));s--)i.unshift(e[s]);return i}function g(e){for(var t=[],r=0;r<e.length;r++)-1===t.indexOf(e[r])&&t.push(e[r]);return t}function y(e,t,r){for(var n in r)e[t+" "+n]=r[n]}function b(e,t){return t=parseFloat(t),">"===e?function(e){return parseFloat(e)>t}:">="===e?function(e){return parseFloat(e)>=t}:"<"===e?function(e){return parseFloat(e)<t}:function(e){return parseFloat(e)<=t}}function v(e){return parseInt(e)}function w(e,t){return e<t?-1:e>t?1:0}function x(e,t){return w(parseInt(e[0]),parseInt(t[0]))||w(parseInt(e[1]||"0"),parseInt(t[1]||"0"))||w(parseInt(e[2]||"0"),parseInt(t[2]||"0"))}function S(e,t){return"<="===(void 0===(t=t.split(".").map(v))[1]&&(t[1]="x"),e)?function(e){return E(e=e.split(".").map(v),t)<=0}:function(e){return E(e=e.split(".").map(v),t)>=0}}function E(e,t){return e[0]!==t[0]?e[0]<t[0]?-1:1:"x"===t[1]?0:e[1]!==t[1]?e[1]<t[1]?-1:1:0}function T(e,t){var r=function(e,t){return-1!==e.versions.indexOf(t)?t:!!R.versionAliases[e.name][t]&&R.versionAliases[e.name][t]}(e,t);return r||1===e.versions.length&&e.versions[0]}function _(e,t){return e/=1e3,Object.keys(i).reduce((function(r,n){var i=P(n,t);if(!i)return r;var s=Object.keys(i.releaseDate).filter((function(t){var r=i.releaseDate[t];return null!==r&&r>=e}));return r.concat(s.map(d(i.name)))}),[])}function A(e){return{name:e.name,versions:e.versions,released:e.released,releaseDate:e.releaseDate}}function P(e,t){if(e=e.toLowerCase(),e=R.aliases[e]||e,t.mobileToDesktop&&R.desktopNames[e]){var r=R.data[R.desktopNames[e]];if("android"===e)return s=r,(i=A(R.data[e])).released=C(i.released,s.released),i.versions=C(i.versions,s.versions),i;var n=A(r);return n.name=e,"op_mob"===e&&(n=function(e,t){e.versions=e.versions.map((function(e){return t[e]||e})),e.released=e.versions.map((function(e){return t[e]||e}));var r={};for(var n in e.releaseDate)r[t[n]||n]=e.releaseDate[n];return e.releaseDate=r,e}(n,{"10.0-10.1":"10"})),n}var i,s;return R.data[e]}function C(e,t){var r=t[t.length-1];return e.filter((function(e){return/^(?:[2-4]\.|[34]$)/.test(e)})).concat(t.slice(37-r-1))}function M(e,t){var r=P(e,t);if(!r)throw new l("Unknown browser "+e);return r}function k(e){return new l("Unknown browser query `"+e+"`. Maybe you are using old Browserslist or made typo in query.")}function I(e,t,r){if(r.mobileToDesktop)return e;var n=R.data.android.released,i=n[n.length-1]-37-t;return i>0?e.slice(-1):e.slice(i-1)}function O(e,t){return(e=Array.isArray(e)?function e(t){return Array.isArray(t)?t.reduce((function(t,r){return t.concat(e(r))}),[]):[t]}(e.map(L)):L(e)).reduce((function(e,r,n){var i=r.queryString,s=0===i.indexOf("not ");if(s){if(0===n)throw new l("Write any browsers query (for instance, `defaults`) before `"+i+"`");i=i.slice(4)}for(var o=0;o<$.length;o++){var a=$[o],c=i.match(a.regexp);if(c){var u=[t].concat(c.slice(1)),h=a.select.apply(R,u).map((function(e){var r=e.split(" ");return"0"===r[1]?r[0]+" "+P(r[0],t).versions[0]:e}));if(2===r.type)return s?e.filter((function(e){return-1===h.indexOf(e)})):e.filter((function(e){return-1!==h.indexOf(e)}));if(s){var p={};return h.forEach((function(e){p[e]=!0})),e.filter((function(e){return!p[e]}))}return e.concat(h)}}throw k(i)}),[])}var N={};function R(e,r){if(void 0===r&&(r={}),void 0===r.path&&(r.path=o.resolve?o.resolve("."):"."),null==e&&(e=R.loadConfig(r)||R.defaults),"string"!=typeof e&&!Array.isArray(e))throw new l("Browser queries must be an array or string. Got "+typeof e+".");var n={ignoreUnknownVersions:r.ignoreUnknownVersions,dangerousExtend:r.dangerousExtend,mobileToDesktop:r.mobileToDesktop,path:r.path,env:r.env};c.oldDataWarning(R.data);var i=c.getStat(r,R.data);if(i)for(var s in n.customUsage={},i)y(n.customUsage,s,i[s]);var a=JSON.stringify([e,n]);if(N[a])return N[a];var u=g(O(e,n)).sort((function(e,t){if(e=e.split(" "),t=t.split(" "),e[0]===t[0]){var r=e[1].split("-")[0];return x(t[1].split("-")[0].split("."),r.split("."))}return w(e[0],t[0])}));return t.env.BROWSERSLIST_DISABLE_CACHE||(N[a]=u),u}function L(e){var t=[];do{e=D(e,t)}while(e);return t}function D(e,t){var r=/^(?:,\s*|\s+or\s+)(.*)/i,n=/^\s+and\s+(.*)/i;return function(e,t){for(var r=1,n=e.length;r<=n;r++)if(t(e.substr(-r,r),r,n))return e.slice(0,-r);return""}(e,(function(e,i,s){return n.test(e)?(t.unshift({type:2,queryString:e.match(n)[1]}),!0):r.test(e)?(t.unshift({type:1,queryString:e.match(r)[1]}),!0):i===s&&(t.unshift({type:1,queryString:e.trim()}),!0)}))}function B(e,t){var r=n.filter((function(e){return"nodejs"===e.name})).filter((function(e){return u(e.version,t)}));if(0===r.length){if(e.ignoreUnknownVersions)return[];throw new l("Unknown version "+t+" of Node.js")}return["node "+r[r.length-1].version]}function j(e,t,r,n){return t=parseInt(t),r=parseInt(r||"01")-1,n=parseInt(n||"01"),_(Date.UTC(t,r,n,0,0,0),e)}function F(e,t,r){t=parseFloat(t);var n=R.usage.global;if(r)if(r.match(/^my\s+stats$/i)){if(!e.customUsage)throw new l("Custom usage statistics was not provided");n=e.customUsage}else{var i;i=2===r.length?r.toUpperCase():r.toLowerCase(),c.loadCountry(R.usage,i,R.data),n=R.usage[i]}for(var s,o=Object.keys(n).sort((function(e,t){return n[t]-n[e]})),a=0,u=[],h=0;h<o.length&&(s=o[h],0!==n[s])&&(a+=n[s],u.push(s),!(a>=t));h++);return u}R.cache={},R.data={},R.usage={global:{},custom:null},R.defaults=["> 0.5%","last 2 versions","Firefox ESR","not dead"],R.aliases={fx:"firefox",ff:"firefox",ios:"ios_saf",explorer:"ie",blackberry:"bb",explorermobile:"ie_mob",operamini:"op_mini",operamobile:"op_mob",chromeandroid:"and_chr",firefoxandroid:"and_ff",ucandroid:"and_uc",qqandroid:"and_qq"},R.desktopNames={and_chr:"chrome",and_ff:"firefox",ie_mob:"ie",op_mob:"opera",android:"chrome"},R.versionAliases={},R.clearCaches=c.clearCaches,R.parseConfig=c.parseConfig,R.readConfig=c.readConfig,R.findConfig=c.findConfig,R.loadConfig=c.loadConfig,R.coverage=function(e,t){var r;if(void 0===t)r=R.usage.global;else if("my stats"===t){var n={};n.path=o.resolve?o.resolve("."):".";var i=c.getStat(n);if(!i)throw new l("Custom usage statistics was not provided");for(var s in r={},i)y(r,s,i[s])}else if("string"==typeof t)t=t.length>2?t.toLowerCase():t.toUpperCase(),c.loadCountry(R.usage,t,R.data),r=R.usage[t];else for(var a in"dataByBrowser"in t&&(t=t.dataByBrowser),r={},t)for(var u in t[a])r[a+" "+u]=t[a][u];return e.reduce((function(e,t){var n=r[t];return void 0===n&&(n=r[t.replace(/ \S+$/," 0")]),e+(n||0)}),0)};var $=[{regexp:/^last\s+(\d+)\s+major\s+versions?$/i,select:function(e,t){return Object.keys(i).reduce((function(r,n){var i=P(n,e);if(!i)return r;var s=m(i.released,t);return s=s.map(d(i.name)),"android"===i.name&&(s=I(s,t,e)),r.concat(s)}),[])}},{regexp:/^last\s+(\d+)\s+versions?$/i,select:function(e,t){return Object.keys(i).reduce((function(r,n){var i=P(n,e);if(!i)return r;var s=i.released.slice(-t);return s=s.map(d(i.name)),"android"===i.name&&(s=I(s,t,e)),r.concat(s)}),[])}},{regexp:/^last\s+(\d+)\s+electron\s+major\s+versions?$/i,select:function(e,t){return m(Object.keys(a),t).map((function(e){return"chrome "+a[e]}))}},{regexp:/^last\s+(\d+)\s+(\w+)\s+major\s+versions?$/i,select:function(e,t,r){var n=M(r,e),i=m(n.released,t).map(d(n.name));return"android"===n.name&&(i=I(i,t,e)),i}},{regexp:/^last\s+(\d+)\s+electron\s+versions?$/i,select:function(e,t){return Object.keys(a).slice(-t).map((function(e){return"chrome "+a[e]}))}},{regexp:/^last\s+(\d+)\s+(\w+)\s+versions?$/i,select:function(e,t,r){var n=M(r,e),i=n.released.slice(-t).map(d(n.name));return"android"===n.name&&(i=I(i,t,e)),i}},{regexp:/^unreleased\s+versions$/i,select:function(e){return Object.keys(i).reduce((function(t,r){var n=P(r,e);if(!n)return t;var i=n.versions.filter((function(e){return-1===n.released.indexOf(e)}));return i=i.map(d(n.name)),t.concat(i)}),[])}},{regexp:/^unreleased\s+electron\s+versions?$/i,select:function(){return[]}},{regexp:/^unreleased\s+(\w+)\s+versions?$/i,select:function(e,t){var r=M(t,e);return r.versions.filter((function(e){return-1===r.released.indexOf(e)})).map(d(r.name))}},{regexp:/^last\s+(\d*.?\d+)\s+years?$/i,select:function(e,t){return _(Date.now()-31558432982.4*t,e)}},{regexp:/^since (\d+)$/i,select:j},{regexp:/^since (\d+)-(\d+)$/i,select:j},{regexp:/^since (\d+)-(\d+)-(\d+)$/i,select:j},{regexp:/^(>=?|<=?)\s*(\d+|\d+\.\d+|\.\d+)%$/,select:function(e,t,r){r=parseFloat(r);var n=R.usage.global;return Object.keys(n).reduce((function(e,i){return">"===t?n[i]>r&&e.push(i):"<"===t?n[i]<r&&e.push(i):"<="===t?n[i]<=r&&e.push(i):n[i]>=r&&e.push(i),e}),[])}},{regexp:/^(>=?|<=?)\s*(\d+|\d+\.\d+|\.\d+)%\s+in\s+my\s+stats$/,select:function(e,t,r){if(r=parseFloat(r),!e.customUsage)throw new l("Custom usage statistics was not provided");var n=e.customUsage;return Object.keys(n).reduce((function(e,i){var s=n[i];return null==s||(">"===t?s>r&&e.push(i):"<"===t?s<r&&e.push(i):"<="===t?s<=r&&e.push(i):s>=r&&e.push(i)),e}),[])}},{regexp:/^(>=?|<=?)\s*(\d+|\d+\.\d+|\.\d+)%\s+in\s+(\S+)\s+stats$/,select:function(e,t,r,n){r=parseFloat(r);var i=c.loadStat(e,n,R.data);if(i)for(var s in e.customUsage={},i)y(e.customUsage,s,i[s]);if(!e.customUsage)throw new l("Custom usage statistics was not provided");var o=e.customUsage;return Object.keys(o).reduce((function(e,n){var i=o[n];return null==i||(">"===t?i>r&&e.push(n):"<"===t?i<r&&e.push(n):"<="===t?i<=r&&e.push(n):i>=r&&e.push(n)),e}),[])}},{regexp:/^(>=?|<=?)\s*(\d+|\d+\.\d+|\.\d+)%\s+in\s+((alt-)?\w\w)$/,select:function(e,t,r,n){r=parseFloat(r),n=2===n.length?n.toUpperCase():n.toLowerCase(),c.loadCountry(R.usage,n,R.data);var i=R.usage[n];return Object.keys(i).reduce((function(e,n){var s=i[n];return null==s||(">"===t?s>r&&e.push(n):"<"===t?s<r&&e.push(n):"<="===t?s<=r&&e.push(n):s>=r&&e.push(n)),e}),[])}},{regexp:/^cover\s+(\d+|\d+\.\d+|\.\d+)%$/i,select:F},{regexp:/^cover\s+(\d+|\d+\.\d+|\.\d+)%\s+in\s+(my\s+stats|(alt-)?\w\w)$/i,select:F},{regexp:/^supports\s+([\w-]+)$/,select:function(e,t){c.loadFeature(R.cache,t);var r=R.cache[t];return Object.keys(r).reduce((function(e,t){var n=r[t];return(n.indexOf("y")>=0||n.indexOf("a")>=0)&&e.push(t),e}),[])}},{regexp:/^electron\s+([\d.]+)\s*-\s*([\d.]+)$/i,select:function(e,t,r){var n=p(t),i=p(r);if(!a[n])throw new l("Unknown version "+t+" of electron");if(!a[i])throw new l("Unknown version "+r+" of electron");return t=parseFloat(t),r=parseFloat(r),Object.keys(a).filter((function(e){var n=parseFloat(e);return n>=t&&n<=r})).map((function(e){return"chrome "+a[e]}))}},{regexp:/^node\s+([\d.]+)\s*-\s*([\d.]+)$/i,select:function(e,t,r){return n.filter((function(e){return"nodejs"===e.name})).map((function(e){return e.version})).filter(S(">=",t)).filter(S("<=",r)).map((function(e){return"node "+e}))}},{regexp:/^(\w+)\s+([\d.]+)\s*-\s*([\d.]+)$/i,select:function(e,t,r,n){var i=M(t,e);return r=parseFloat(T(i,r)||r),n=parseFloat(T(i,n)||n),i.released.filter((function(e){var t=parseFloat(e);return t>=r&&t<=n})).map(d(i.name))}},{regexp:/^electron\s*(>=?|<=?)\s*([\d.]+)$/i,select:function(e,t,r){var n=p(r);return Object.keys(a).filter(b(t,n)).map((function(e){return"chrome "+a[e]}))}},{regexp:/^node\s*(>=?|<=?)\s*([\d.]+)$/i,select:function(e,t,r){return n.filter((function(e){return"nodejs"===e.name})).map((function(e){return e.version})).filter(function(e,t){return(t=t.split(".").map(v))[1]=t[1]||0,t[2]=t[2]||0,">"===e?function(e){return x(e=e.split(".").map(v),t)>0}:">="===e?function(e){return x(e=e.split(".").map(v),t)>=0}:"<"===e?function(e){return e=e.split(".").map(v),x(t,e)>0}:function(e){return e=e.split(".").map(v),x(t,e)>=0}}(t,r)).map((function(e){return"node "+e}))}},{regexp:/^(\w+)\s*(>=?|<=?)\s*([\d.]+)$/,select:function(e,t,r,n){var i=M(t,e),s=R.versionAliases[i.name][n];return s&&(n=s),i.released.filter(b(r,n)).map((function(e){return i.name+" "+e}))}},{regexp:/^(firefox|ff|fx)\s+esr$/i,select:function(){return["firefox 78","firefox 91"]}},{regexp:/(operamini|op_mini)\s+all/i,select:function(){return["op_mini all"]}},{regexp:/^electron\s+([\d.]+)$/i,select:function(e,t){var r=p(t),n=a[r];if(!n)throw new l("Unknown version "+t+" of electron");return["chrome "+n]}},{regexp:/^node\s+(\d+)$/i,select:B},{regexp:/^node\s+(\d+\.\d+)$/i,select:B},{regexp:/^node\s+(\d+\.\d+\.\d+)$/i,select:B},{regexp:/^current\s+node$/i,select:function(e){return[c.currentNode(O,e)]}},{regexp:/^maintained\s+node\s+versions$/i,select:function(e){var t=Date.now();return O(Object.keys(s).filter((function(e){return t<Date.parse(s[e].end)&&t>Date.parse(s[e].start)&&(r=e.slice(1),n.some((function(e){return u(e.version,r)})));var r})).map((function(e){return"node "+e.slice(1)})),e)}},{regexp:/^phantomjs\s+1.9$/i,select:function(){return["safari 5"]}},{regexp:/^phantomjs\s+2.1$/i,select:function(){return["safari 6"]}},{regexp:/^(\w+)\s+(tp|[\d.]+)$/i,select:function(e,t,r){/^tp$/i.test(r)&&(r="TP");var n=M(t,e),i=T(n,r);if(i)r=i;else{if(!(i=T(n,i=-1===r.indexOf(".")?r+".0":r.replace(/\.0$/,"")))){if(e.ignoreUnknownVersions)return[];throw new l("Unknown version "+r+" of "+t)}r=i}return[n.name+" "+r]}},{regexp:/^browserslist config$/i,select:function(e){return R(void 0,e)}},{regexp:/^extends (.+)$/i,select:function(e,t){return O(c.loadQueries(e,t),e)}},{regexp:/^defaults$/i,select:function(e){return O(R.defaults,e)}},{regexp:/^dead$/i,select:function(e){return O(["ie <= 10","ie_mob <= 11","bb <= 10","op_mob <= 12.1","samsung 4"],e)}},{regexp:/^(\w+)$/i,select:function(e,t){throw P(t,e)?new l("Specify versions in Browserslist query for browser "+t):k(t)}}];!function(){for(var e in i){var t=i[e];R.data[e]={name:e,versions:h(i[e].versions),released:h(i[e].versions.slice(0,-3)),releaseDate:i[e].release_date},y(R.usage.global,e,t.usage_global),R.versionAliases[e]={};for(var r=0;r<t.versions.length;r++){var n=t.versions[r];if(n&&-1!==n.indexOf("-"))for(var s=n.split("-"),o=0;o<s.length;o++)R.versionAliases[e][s[o]]=n}}R.versionAliases.op_mob[59]="58"}(),e.exports=R}).call(this,r(3))},function(e){e.exports=JSON.parse('[{"name":"nodejs","version":"0.2.0","date":"2011-08-26","lts":false,"security":false},{"name":"nodejs","version":"0.3.0","date":"2011-08-26","lts":false,"security":false},{"name":"nodejs","version":"0.4.0","date":"2011-08-26","lts":false,"security":false},{"name":"nodejs","version":"0.5.0","date":"2011-08-26","lts":false,"security":false},{"name":"nodejs","version":"0.6.0","date":"2011-11-04","lts":false,"security":false},{"name":"nodejs","version":"0.7.0","date":"2012-01-17","lts":false,"security":false},{"name":"nodejs","version":"0.8.0","date":"2012-06-22","lts":false,"security":false},{"name":"nodejs","version":"0.9.0","date":"2012-07-20","lts":false,"security":false},{"name":"nodejs","version":"0.10.0","date":"2013-03-11","lts":false,"security":false},{"name":"nodejs","version":"0.11.0","date":"2013-03-28","lts":false,"security":false},{"name":"nodejs","version":"0.12.0","date":"2015-02-06","lts":false,"security":false},{"name":"nodejs","version":"4.0.0","date":"2015-09-08","lts":false,"security":false},{"name":"nodejs","version":"4.1.0","date":"2015-09-17","lts":false,"security":false},{"name":"nodejs","version":"4.2.0","date":"2015-10-12","lts":"Argon","security":false},{"name":"nodejs","version":"4.3.0","date":"2016-02-09","lts":"Argon","security":false},{"name":"nodejs","version":"4.4.0","date":"2016-03-08","lts":"Argon","security":false},{"name":"nodejs","version":"4.5.0","date":"2016-08-16","lts":"Argon","security":false},{"name":"nodejs","version":"4.6.0","date":"2016-09-27","lts":"Argon","security":true},{"name":"nodejs","version":"4.7.0","date":"2016-12-06","lts":"Argon","security":false},{"name":"nodejs","version":"4.8.0","date":"2017-02-21","lts":"Argon","security":false},{"name":"nodejs","version":"4.9.0","date":"2018-03-28","lts":"Argon","security":true},{"name":"nodejs","version":"5.0.0","date":"2015-10-29","lts":false,"security":false},{"name":"nodejs","version":"5.1.0","date":"2015-11-17","lts":false,"security":false},{"name":"nodejs","version":"5.2.0","date":"2015-12-09","lts":false,"security":false},{"name":"nodejs","version":"5.3.0","date":"2015-12-15","lts":false,"security":false},{"name":"nodejs","version":"5.4.0","date":"2016-01-06","lts":false,"security":false},{"name":"nodejs","version":"5.5.0","date":"2016-01-21","lts":false,"security":false},{"name":"nodejs","version":"5.6.0","date":"2016-02-09","lts":false,"security":false},{"name":"nodejs","version":"5.7.0","date":"2016-02-23","lts":false,"security":false},{"name":"nodejs","version":"5.8.0","date":"2016-03-09","lts":false,"security":false},{"name":"nodejs","version":"5.9.0","date":"2016-03-16","lts":false,"security":false},{"name":"nodejs","version":"5.10.0","date":"2016-04-01","lts":false,"security":false},{"name":"nodejs","version":"5.11.0","date":"2016-04-21","lts":false,"security":false},{"name":"nodejs","version":"5.12.0","date":"2016-06-23","lts":false,"security":false},{"name":"nodejs","version":"6.0.0","date":"2016-04-26","lts":false,"security":false},{"name":"nodejs","version":"6.1.0","date":"2016-05-05","lts":false,"security":false},{"name":"nodejs","version":"6.2.0","date":"2016-05-17","lts":false,"security":false},{"name":"nodejs","version":"6.3.0","date":"2016-07-06","lts":false,"security":false},{"name":"nodejs","version":"6.4.0","date":"2016-08-12","lts":false,"security":false},{"name":"nodejs","version":"6.5.0","date":"2016-08-26","lts":false,"security":false},{"name":"nodejs","version":"6.6.0","date":"2016-09-14","lts":false,"security":false},{"name":"nodejs","version":"6.7.0","date":"2016-09-27","lts":false,"security":true},{"name":"nodejs","version":"6.8.0","date":"2016-10-12","lts":false,"security":false},{"name":"nodejs","version":"6.9.0","date":"2016-10-18","lts":"Boron","security":false},{"name":"nodejs","version":"6.10.0","date":"2017-02-21","lts":"Boron","security":false},{"name":"nodejs","version":"6.11.0","date":"2017-06-06","lts":"Boron","security":false},{"name":"nodejs","version":"6.12.0","date":"2017-11-06","lts":"Boron","security":false},{"name":"nodejs","version":"6.13.0","date":"2018-02-10","lts":"Boron","security":false},{"name":"nodejs","version":"6.14.0","date":"2018-03-28","lts":"Boron","security":true},{"name":"nodejs","version":"6.15.0","date":"2018-11-27","lts":"Boron","security":true},{"name":"nodejs","version":"6.16.0","date":"2018-12-26","lts":"Boron","security":false},{"name":"nodejs","version":"6.17.0","date":"2019-02-28","lts":"Boron","security":true},{"name":"nodejs","version":"7.0.0","date":"2016-10-25","lts":false,"security":false},{"name":"nodejs","version":"7.1.0","date":"2016-11-08","lts":false,"security":false},{"name":"nodejs","version":"7.2.0","date":"2016-11-22","lts":false,"security":false},{"name":"nodejs","version":"7.3.0","date":"2016-12-20","lts":false,"security":false},{"name":"nodejs","version":"7.4.0","date":"2017-01-04","lts":false,"security":false},{"name":"nodejs","version":"7.5.0","date":"2017-01-31","lts":false,"security":false},{"name":"nodejs","version":"7.6.0","date":"2017-02-21","lts":false,"security":false},{"name":"nodejs","version":"7.7.0","date":"2017-02-28","lts":false,"security":false},{"name":"nodejs","version":"7.8.0","date":"2017-03-29","lts":false,"security":false},{"name":"nodejs","version":"7.9.0","date":"2017-04-11","lts":false,"security":false},{"name":"nodejs","version":"7.10.0","date":"2017-05-02","lts":false,"security":false},{"name":"nodejs","version":"8.0.0","date":"2017-05-30","lts":false,"security":false},{"name":"nodejs","version":"8.1.0","date":"2017-06-08","lts":false,"security":false},{"name":"nodejs","version":"8.2.0","date":"2017-07-19","lts":false,"security":false},{"name":"nodejs","version":"8.3.0","date":"2017-08-08","lts":false,"security":false},{"name":"nodejs","version":"8.4.0","date":"2017-08-15","lts":false,"security":false},{"name":"nodejs","version":"8.5.0","date":"2017-09-12","lts":false,"security":false},{"name":"nodejs","version":"8.6.0","date":"2017-09-26","lts":false,"security":false},{"name":"nodejs","version":"8.7.0","date":"2017-10-11","lts":false,"security":false},{"name":"nodejs","version":"8.8.0","date":"2017-10-24","lts":false,"security":false},{"name":"nodejs","version":"8.9.0","date":"2017-10-31","lts":"Carbon","security":false},{"name":"nodejs","version":"8.10.0","date":"2018-03-06","lts":"Carbon","security":false},{"name":"nodejs","version":"8.11.0","date":"2018-03-28","lts":"Carbon","security":true},{"name":"nodejs","version":"8.12.0","date":"2018-09-10","lts":"Carbon","security":false},{"name":"nodejs","version":"8.13.0","date":"2018-11-20","lts":"Carbon","security":false},{"name":"nodejs","version":"8.14.0","date":"2018-11-27","lts":"Carbon","security":true},{"name":"nodejs","version":"8.15.0","date":"2018-12-26","lts":"Carbon","security":false},{"name":"nodejs","version":"8.16.0","date":"2019-04-16","lts":"Carbon","security":false},{"name":"nodejs","version":"8.17.0","date":"2019-12-17","lts":"Carbon","security":true},{"name":"nodejs","version":"9.0.0","date":"2017-10-31","lts":false,"security":false},{"name":"nodejs","version":"9.1.0","date":"2017-11-07","lts":false,"security":false},{"name":"nodejs","version":"9.2.0","date":"2017-11-14","lts":false,"security":false},{"name":"nodejs","version":"9.3.0","date":"2017-12-12","lts":false,"security":false},{"name":"nodejs","version":"9.4.0","date":"2018-01-10","lts":false,"security":false},{"name":"nodejs","version":"9.5.0","date":"2018-01-31","lts":false,"security":false},{"name":"nodejs","version":"9.6.0","date":"2018-02-21","lts":false,"security":false},{"name":"nodejs","version":"9.7.0","date":"2018-03-01","lts":false,"security":false},{"name":"nodejs","version":"9.8.0","date":"2018-03-07","lts":false,"security":false},{"name":"nodejs","version":"9.9.0","date":"2018-03-21","lts":false,"security":false},{"name":"nodejs","version":"9.10.0","date":"2018-03-28","lts":false,"security":true},{"name":"nodejs","version":"9.11.0","date":"2018-04-04","lts":false,"security":false},{"name":"nodejs","version":"10.0.0","date":"2018-04-24","lts":false,"security":false},{"name":"nodejs","version":"10.1.0","date":"2018-05-08","lts":false,"security":false},{"name":"nodejs","version":"10.2.0","date":"2018-05-23","lts":false,"security":false},{"name":"nodejs","version":"10.3.0","date":"2018-05-29","lts":false,"security":false},{"name":"nodejs","version":"10.4.0","date":"2018-06-06","lts":false,"security":false},{"name":"nodejs","version":"10.5.0","date":"2018-06-20","lts":false,"security":false},{"name":"nodejs","version":"10.6.0","date":"2018-07-04","lts":false,"security":false},{"name":"nodejs","version":"10.7.0","date":"2018-07-18","lts":false,"security":false},{"name":"nodejs","version":"10.8.0","date":"2018-08-01","lts":false,"security":false},{"name":"nodejs","version":"10.9.0","date":"2018-08-15","lts":false,"security":false},{"name":"nodejs","version":"10.10.0","date":"2018-09-06","lts":false,"security":false},{"name":"nodejs","version":"10.11.0","date":"2018-09-19","lts":false,"security":false},{"name":"nodejs","version":"10.12.0","date":"2018-10-10","lts":false,"security":false},{"name":"nodejs","version":"10.13.0","date":"2018-10-30","lts":"Dubnium","security":false},{"name":"nodejs","version":"10.14.0","date":"2018-11-27","lts":"Dubnium","security":true},{"name":"nodejs","version":"10.15.0","date":"2018-12-26","lts":"Dubnium","security":false},{"name":"nodejs","version":"10.16.0","date":"2019-05-28","lts":"Dubnium","security":false},{"name":"nodejs","version":"10.17.0","date":"2019-10-22","lts":"Dubnium","security":false},{"name":"nodejs","version":"10.18.0","date":"2019-12-17","lts":"Dubnium","security":true},{"name":"nodejs","version":"10.19.0","date":"2020-02-05","lts":"Dubnium","security":true},{"name":"nodejs","version":"10.20.0","date":"2020-03-26","lts":"Dubnium","security":false},{"name":"nodejs","version":"10.21.0","date":"2020-06-02","lts":"Dubnium","security":true},{"name":"nodejs","version":"10.22.0","date":"2020-07-21","lts":"Dubnium","security":false},{"name":"nodejs","version":"10.23.0","date":"2020-10-27","lts":"Dubnium","security":false},{"name":"nodejs","version":"10.24.0","date":"2021-02-23","lts":"Dubnium","security":true},{"name":"nodejs","version":"11.0.0","date":"2018-10-23","lts":false,"security":false},{"name":"nodejs","version":"11.1.0","date":"2018-10-30","lts":false,"security":false},{"name":"nodejs","version":"11.2.0","date":"2018-11-15","lts":false,"security":false},{"name":"nodejs","version":"11.3.0","date":"2018-11-27","lts":false,"security":true},{"name":"nodejs","version":"11.4.0","date":"2018-12-07","lts":false,"security":false},{"name":"nodejs","version":"11.5.0","date":"2018-12-18","lts":false,"security":false},{"name":"nodejs","version":"11.6.0","date":"2018-12-26","lts":false,"security":false},{"name":"nodejs","version":"11.7.0","date":"2019-01-17","lts":false,"security":false},{"name":"nodejs","version":"11.8.0","date":"2019-01-24","lts":false,"security":false},{"name":"nodejs","version":"11.9.0","date":"2019-01-30","lts":false,"security":false},{"name":"nodejs","version":"11.10.0","date":"2019-02-14","lts":false,"security":false},{"name":"nodejs","version":"11.11.0","date":"2019-03-05","lts":false,"security":false},{"name":"nodejs","version":"11.12.0","date":"2019-03-14","lts":false,"security":false},{"name":"nodejs","version":"11.13.0","date":"2019-03-28","lts":false,"security":false},{"name":"nodejs","version":"11.14.0","date":"2019-04-10","lts":false,"security":false},{"name":"nodejs","version":"11.15.0","date":"2019-04-30","lts":false,"security":false},{"name":"nodejs","version":"12.0.0","date":"2019-04-23","lts":false,"security":false},{"name":"nodejs","version":"12.1.0","date":"2019-04-29","lts":false,"security":false},{"name":"nodejs","version":"12.2.0","date":"2019-05-07","lts":false,"security":false},{"name":"nodejs","version":"12.3.0","date":"2019-05-21","lts":false,"security":false},{"name":"nodejs","version":"12.4.0","date":"2019-06-04","lts":false,"security":false},{"name":"nodejs","version":"12.5.0","date":"2019-06-26","lts":false,"security":false},{"name":"nodejs","version":"12.6.0","date":"2019-07-03","lts":false,"security":false},{"name":"nodejs","version":"12.7.0","date":"2019-07-23","lts":false,"security":false},{"name":"nodejs","version":"12.8.0","date":"2019-08-06","lts":false,"security":false},{"name":"nodejs","version":"12.9.0","date":"2019-08-20","lts":false,"security":false},{"name":"nodejs","version":"12.10.0","date":"2019-09-04","lts":false,"security":false},{"name":"nodejs","version":"12.11.0","date":"2019-09-25","lts":false,"security":false},{"name":"nodejs","version":"12.12.0","date":"2019-10-11","lts":false,"security":false},{"name":"nodejs","version":"12.13.0","date":"2019-10-21","lts":"Erbium","security":false},{"name":"nodejs","version":"12.14.0","date":"2019-12-17","lts":"Erbium","security":true},{"name":"nodejs","version":"12.15.0","date":"2020-02-05","lts":"Erbium","security":true},{"name":"nodejs","version":"12.16.0","date":"2020-02-11","lts":"Erbium","security":false},{"name":"nodejs","version":"12.17.0","date":"2020-05-26","lts":"Erbium","security":false},{"name":"nodejs","version":"12.18.0","date":"2020-06-02","lts":"Erbium","security":true},{"name":"nodejs","version":"12.19.0","date":"2020-10-06","lts":"Erbium","security":false},{"name":"nodejs","version":"12.20.0","date":"2020-11-24","lts":"Erbium","security":false},{"name":"nodejs","version":"12.21.0","date":"2021-02-23","lts":"Erbium","security":true},{"name":"nodejs","version":"12.22.0","date":"2021-03-30","lts":"Erbium","security":false},{"name":"nodejs","version":"13.0.0","date":"2019-10-22","lts":false,"security":false},{"name":"nodejs","version":"13.1.0","date":"2019-11-05","lts":false,"security":false},{"name":"nodejs","version":"13.2.0","date":"2019-11-21","lts":false,"security":false},{"name":"nodejs","version":"13.3.0","date":"2019-12-03","lts":false,"security":false},{"name":"nodejs","version":"13.4.0","date":"2019-12-17","lts":false,"security":true},{"name":"nodejs","version":"13.5.0","date":"2019-12-18","lts":false,"security":false},{"name":"nodejs","version":"13.6.0","date":"2020-01-07","lts":false,"security":false},{"name":"nodejs","version":"13.7.0","date":"2020-01-21","lts":false,"security":false},{"name":"nodejs","version":"13.8.0","date":"2020-02-05","lts":false,"security":true},{"name":"nodejs","version":"13.9.0","date":"2020-02-18","lts":false,"security":false},{"name":"nodejs","version":"13.10.0","date":"2020-03-04","lts":false,"security":false},{"name":"nodejs","version":"13.11.0","date":"2020-03-12","lts":false,"security":false},{"name":"nodejs","version":"13.12.0","date":"2020-03-26","lts":false,"security":false},{"name":"nodejs","version":"13.13.0","date":"2020-04-14","lts":false,"security":false},{"name":"nodejs","version":"13.14.0","date":"2020-04-29","lts":false,"security":false},{"name":"nodejs","version":"14.0.0","date":"2020-04-21","lts":false,"security":false},{"name":"nodejs","version":"14.1.0","date":"2020-04-29","lts":false,"security":false},{"name":"nodejs","version":"14.2.0","date":"2020-05-05","lts":false,"security":false},{"name":"nodejs","version":"14.3.0","date":"2020-05-19","lts":false,"security":false},{"name":"nodejs","version":"14.4.0","date":"2020-06-02","lts":false,"security":true},{"name":"nodejs","version":"14.5.0","date":"2020-06-30","lts":false,"security":false},{"name":"nodejs","version":"14.6.0","date":"2020-07-20","lts":false,"security":false},{"name":"nodejs","version":"14.7.0","date":"2020-07-29","lts":false,"security":false},{"name":"nodejs","version":"14.8.0","date":"2020-08-11","lts":false,"security":false},{"name":"nodejs","version":"14.9.0","date":"2020-08-27","lts":false,"security":false},{"name":"nodejs","version":"14.10.0","date":"2020-09-08","lts":false,"security":false},{"name":"nodejs","version":"14.11.0","date":"2020-09-15","lts":false,"security":true},{"name":"nodejs","version":"14.12.0","date":"2020-09-22","lts":false,"security":false},{"name":"nodejs","version":"14.13.0","date":"2020-09-29","lts":false,"security":false},{"name":"nodejs","version":"14.14.0","date":"2020-10-15","lts":false,"security":false},{"name":"nodejs","version":"14.15.0","date":"2020-10-27","lts":"Fermium","security":false},{"name":"nodejs","version":"14.16.0","date":"2021-02-23","lts":"Fermium","security":true},{"name":"nodejs","version":"14.17.0","date":"2021-05-11","lts":"Fermium","security":false},{"name":"nodejs","version":"14.18.0","date":"2021-09-28","lts":"Fermium","security":false},{"name":"nodejs","version":"15.0.0","date":"2020-10-20","lts":false,"security":false},{"name":"nodejs","version":"15.1.0","date":"2020-11-04","lts":false,"security":false},{"name":"nodejs","version":"15.2.0","date":"2020-11-10","lts":false,"security":false},{"name":"nodejs","version":"15.3.0","date":"2020-11-24","lts":false,"security":false},{"name":"nodejs","version":"15.4.0","date":"2020-12-09","lts":false,"security":false},{"name":"nodejs","version":"15.5.0","date":"2020-12-22","lts":false,"security":false},{"name":"nodejs","version":"15.6.0","date":"2021-01-14","lts":false,"security":false},{"name":"nodejs","version":"15.7.0","date":"2021-01-25","lts":false,"security":false},{"name":"nodejs","version":"15.8.0","date":"2021-02-02","lts":false,"security":false},{"name":"nodejs","version":"15.9.0","date":"2021-02-18","lts":false,"security":false},{"name":"nodejs","version":"15.10.0","date":"2021-02-23","lts":false,"security":true},{"name":"nodejs","version":"15.11.0","date":"2021-03-03","lts":false,"security":false},{"name":"nodejs","version":"15.12.0","date":"2021-03-17","lts":false,"security":false},{"name":"nodejs","version":"15.13.0","date":"2021-03-31","lts":false,"security":false},{"name":"nodejs","version":"15.14.0","date":"2021-04-06","lts":false,"security":false},{"name":"nodejs","version":"16.0.0","date":"2021-04-20","lts":false,"security":false},{"name":"nodejs","version":"16.1.0","date":"2021-05-04","lts":false,"security":false},{"name":"nodejs","version":"16.2.0","date":"2021-05-19","lts":false,"security":false},{"name":"nodejs","version":"16.3.0","date":"2021-06-03","lts":false,"security":false},{"name":"nodejs","version":"16.4.0","date":"2021-06-23","lts":false,"security":false},{"name":"nodejs","version":"16.5.0","date":"2021-07-14","lts":false,"security":false},{"name":"nodejs","version":"16.6.0","date":"2021-07-29","lts":false,"security":true},{"name":"nodejs","version":"16.7.0","date":"2021-08-18","lts":false,"security":false},{"name":"nodejs","version":"16.8.0","date":"2021-08-25","lts":false,"security":false},{"name":"nodejs","version":"16.9.0","date":"2021-09-07","lts":false,"security":false},{"name":"nodejs","version":"16.10.0","date":"2021-09-22","lts":false,"security":false},{"name":"nodejs","version":"16.11.0","date":"2021-10-08","lts":false,"security":false},{"name":"nodejs","version":"16.12.0","date":"2021-10-20","lts":false,"security":false},{"name":"nodejs","version":"17.0.0","date":"2021-10-19","lts":false,"security":false}]')},function(e,t,r){"use strict";const n=r(678).browsers,i=r(680).browserVersions,s=r(682);function o(e){return Object.keys(e).reduce(((t,r)=>(t[i[r]]=e[r],t)),{})}e.exports.agents=Object.keys(s).reduce(((e,t)=>{let r=s[t];return e[n[t]]=Object.keys(r).reduce(((e,t)=>("A"===t?e.usage_global=o(r[t]):"C"===t?e.versions=r[t].reduce(((e,t)=>(""===t?e.push(null):e.push(i[t]),e)),[]):"D"===t?e.prefix_exceptions=o(r[t]):"E"===t?e.browser=r[t]:"F"===t?e.release_date=Object.keys(r[t]).reduce(((e,n)=>(e[i[n]]=r[t][n],e)),{}):e.prefix=r[t],e)),{}),e}),{})},function(e,t,r){e.exports.browsers=r(679)},function(e,t){e.exports={A:"ie",B:"edge",C:"firefox",D:"chrome",E:"safari",F:"opera",G:"ios_saf",H:"op_mini",I:"android",J:"bb",K:"op_mob",L:"and_chr",M:"and_ff",N:"ie_mob",O:"and_uc",P:"samsung",Q:"and_qq",R:"baidu",S:"kaios"}},function(e,t,r){e.exports.browserVersions=r(681)},function(e,t){e.exports={0:"37",1:"38",2:"39",3:"40",4:"41",5:"42",6:"43",7:"44",8:"45",9:"46",A:"10",B:"11",C:"12",D:"7",E:"8",F:"9",G:"15",H:"97",I:"4",J:"6",K:"13",L:"14",M:"16",N:"17",O:"18",P:"79",Q:"80",R:"81",S:"95",T:"64",U:"83",V:"84",W:"85",X:"86",Y:"87",Z:"88",a:"89",b:"90",c:"91",d:"92",e:"93",f:"94",g:"96",h:"5",i:"19",j:"20",k:"21",l:"22",m:"23",n:"24",o:"25",p:"26",q:"27",r:"28",s:"29",t:"30",u:"31",v:"32",w:"33",x:"34",y:"35",z:"36",AB:"47",BB:"48",CB:"49",DB:"50",EB:"51",FB:"52",GB:"53",HB:"54",IB:"55",JB:"56",KB:"57",LB:"58",MB:"60",NB:"62",OB:"63",PB:"65",QB:"66",RB:"67",SB:"68",TB:"69",UB:"70",VB:"71",WB:"72",XB:"73",YB:"74",ZB:"75",aB:"76",bB:"77",cB:"78",dB:"11.1",eB:"12.1",fB:"3",gB:"59",hB:"61",iB:"82",jB:"98",kB:"3.2",lB:"10.1",mB:"15.2",nB:"11.5",oB:"4.2-4.3",pB:"5.5",qB:"2",rB:"3.5",sB:"3.6",tB:"99",uB:"100",vB:"3.1",wB:"5.1",xB:"6.1",yB:"7.1",zB:"9.1","0B":"13.1","1B":"14.1","2B":"15.1","3B":"TP","4B":"9.5-9.6","5B":"10.0-10.1","6B":"10.5","7B":"10.6","8B":"11.6","9B":"4.0-4.1",AC:"5.0-5.1",BC:"6.0-6.1",CC:"7.0-7.1",DC:"8.1-8.4",EC:"9.0-9.2",FC:"9.3",GC:"10.0-10.2",HC:"10.3",IC:"11.0-11.2",JC:"11.3-11.4",KC:"12.0-12.1",LC:"12.2-12.5",MC:"13.0-13.1",NC:"13.2",OC:"13.3",PC:"13.4-13.7",QC:"14.0-14.4",RC:"14.5-14.8",SC:"15.0-15.1",TC:"all",UC:"2.1",VC:"2.2",WC:"2.3",XC:"4.1",YC:"4.4",ZC:"4.4.3-4.4.4",aC:"12.12",bC:"5.0-5.4",cC:"6.2-6.4",dC:"7.2-7.4",eC:"8.2",fC:"9.2",gC:"11.1-11.2",hC:"12.0",iC:"13.0",jC:"14.0",kC:"15.0",lC:"16.0",mC:"10.4",nC:"7.12",oC:"2.5"}},function(e,t){e.exports={A:{A:{J:.0131217,D:.00621152,E:.0293123,F:.0732808,A:.0146562,B:.659527,pB:.009298},B:"ms",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","pB","J","D","E","F","A","B","","",""],E:"IE",F:{pB:962323200,J:998870400,D:1161129600,E:1237420800,F:1300060800,A:1346716800,B:1381968e3}},B:{A:{C:.008536,K:.004267,L:.004268,G:.004268,M:.008536,N:.008536,O:.029876,P:0,Q:.004298,R:.00944,U:.004043,V:.008536,W:.008536,X:.008536,Y:.012804,Z:.004318,a:.008536,b:.004268,c:.008536,d:.017072,e:.012804,f:.025608,S:.145112,g:3.66194,H:0},B:"webkit",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","C","K","L","G","M","N","O","P","Q","R","U","V","W","X","Y","Z","a","b","c","d","e","f","S","g","H","","",""],E:"Edge",F:{C:1438128e3,K:1447286400,L:1470096e3,G:1491868800,M:1508198400,N:1525046400,O:1542067200,P:1579046400,Q:1581033600,R:1586736e3,U:1590019200,V:1594857600,W:1598486400,X:1602201600,Y:1605830400,Z:161136e4,a:1614816e3,b:1618358400,c:1622073600,d:1626912e3,e:1630627200,f:1632441600,S:1634774400,g:1637539200,H:1641427200},D:{C:"ms",K:"ms",L:"ms",G:"ms",M:"ms",N:"ms",O:"ms"}},C:{A:{0:.004783,1:.004271,2:.004783,3:.00487,4:.005029,5:.0047,6:.034144,7:.008536,8:.004356,9:.004525,qB:.004318,fB:.004271,I:.025608,h:.004879,J:.020136,D:.005725,E:.004525,F:.00533,A:.004283,B:.004318,C:.004471,K:.004486,L:.00453,G:.004293,M:.004417,N:.004425,O:.004293,i:.004443,j:.004283,k:.004293,l:.013698,m:.004293,n:.008786,o:.004268,p:.004317,q:.004393,r:.004418,s:.008834,t:.004293,u:.008928,v:.004471,w:.009284,x:.004707,y:.009076,z:.004268,AB:.004293,BB:.004268,CB:.004538,DB:.008282,EB:.004268,FB:.068288,GB:.004335,HB:.008586,IB:.034144,JB:.017072,KB:.004425,LB:.004356,gB:.004268,MB:.008536,hB:.004356,NB:.004425,OB:.004268,T:.00415,PB:.004267,QB:.008712,RB:.004267,SB:.008536,TB:.00415,UB:.004293,VB:.004425,WB:.012804,XB:.00415,YB:.00415,ZB:.004318,aB:.004356,bB:.004268,cB:.068288,P:.008536,Q:.008536,R:.017072,iB:.004268,U:.004268,V:.017072,W:.004268,X:.004268,Y:.012804,Z:.017072,a:.02134,b:.02134,c:.098164,d:.017072,e:.029876,f:.93896,S:1.9334,g:.017072,H:0,jB:0,rB:.008786,sB:.00487},B:"moz",C:["qB","fB","rB","sB","I","h","J","D","E","F","A","B","C","K","L","G","M","N","O","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9","AB","BB","CB","DB","EB","FB","GB","HB","IB","JB","KB","LB","gB","MB","hB","NB","OB","T","PB","QB","RB","SB","TB","UB","VB","WB","XB","YB","ZB","aB","bB","cB","P","Q","R","iB","U","V","W","X","Y","Z","a","b","c","d","e","f","S","g","H","jB",""],E:"Firefox",F:{0:1428278400,1:1431475200,2:1435881600,3:1439251200,4:144288e4,5:1446508800,6:1450137600,7:1453852800,8:1457395200,9:1461628800,qB:1161648e3,fB:1213660800,rB:124632e4,sB:1264032e3,I:1300752e3,h:1308614400,J:1313452800,D:1317081600,E:1317081600,F:1320710400,A:1324339200,B:1327968e3,C:1331596800,K:1335225600,L:1338854400,G:1342483200,M:1346112e3,N:1349740800,O:1353628800,i:1357603200,j:1361232e3,k:1364860800,l:1368489600,m:1372118400,n:1375747200,o:1379376e3,p:1386633600,q:1391472e3,r:1395100800,s:1398729600,t:1402358400,u:1405987200,v:1409616e3,w:1413244800,x:1417392e3,y:1421107200,z:1424736e3,AB:1465257600,BB:1470096e3,CB:1474329600,DB:1479168e3,EB:1485216e3,FB:1488844800,GB:149256e4,HB:1497312e3,IB:1502150400,JB:1506556800,KB:1510617600,LB:1516665600,gB:1520985600,MB:1525824e3,hB:1529971200,NB:1536105600,OB:1540252800,T:1544486400,PB:154872e4,QB:1552953600,RB:1558396800,SB:1562630400,TB:1567468800,UB:1571788800,VB:1575331200,WB:1578355200,XB:1581379200,YB:1583798400,ZB:1586304e3,aB:1588636800,bB:1591056e3,cB:1593475200,P:1595894400,Q:1598313600,R:1600732800,iB:1603152e3,U:1605571200,V:1607990400,W:1611619200,X:1614038400,Y:1616457600,Z:1618790400,a:1622505600,b:1626134400,c:1628553600,d:1630972800,e:1633392e3,f:1635811200,S:1638835200,g:1641859200,H:null,jB:null}},D:{A:{0:.004464,1:.025608,2:.004464,3:.012804,4:.0236,5:.004293,6:.008536,7:.004465,8:.004642,9:.004891,I:.004706,h:.004879,J:.004879,D:.005591,E:.005591,F:.005591,A:.004534,B:.004464,C:.010424,K:.0083,L:.004706,G:.015087,M:.004393,N:.004393,O:.008652,i:.004293,j:.004393,k:.004317,l:.008536,m:.008786,n:.008536,o:.004461,p:.004141,q:.004326,r:.0047,s:.004538,t:.004293,u:.008596,v:.004566,w:.004268,x:.008536,y:.008536,z:.004335,AB:.012804,BB:.025608,CB:.08536,DB:.004293,EB:.004268,FB:.004268,GB:.012804,HB:.008536,IB:.008536,JB:.046948,KB:.008536,LB:.008536,gB:.004268,MB:.008536,hB:.008536,NB:.008536,OB:.012804,T:.02134,PB:.017072,QB:.025608,RB:.012804,SB:.012804,TB:.059752,UB:.04268,VB:.017072,WB:.046948,XB:.012804,YB:.025608,ZB:.06402,aB:.068288,bB:.025608,cB:.034144,P:.19206,Q:.06402,R:.046948,U:.093896,V:.076824,W:.098164,X:.08536,Y:.19206,Z:.051216,a:.068288,b:.06402,c:.17072,d:.25608,e:.307296,f:.763972,S:.670076,g:21.7284,H:.02134,jB:.008536,tB:.008536,uB:0},B:"webkit",C:["","","","","I","h","J","D","E","F","A","B","C","K","L","G","M","N","O","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9","AB","BB","CB","DB","EB","FB","GB","HB","IB","JB","KB","LB","gB","MB","hB","NB","OB","T","PB","QB","RB","SB","TB","UB","VB","WB","XB","YB","ZB","aB","bB","cB","P","Q","R","U","V","W","X","Y","Z","a","b","c","d","e","f","S","g","H","jB","tB","uB"],E:"Chrome",F:{0:1409011200,1:141264e4,2:1416268800,3:1421798400,4:1425513600,5:1429401600,6:143208e4,7:1437523200,8:1441152e3,9:1444780800,I:1264377600,h:1274745600,J:1283385600,D:1287619200,E:1291248e3,F:1296777600,A:1299542400,B:1303862400,C:1307404800,K:1312243200,L:1316131200,G:1316131200,M:1319500800,N:1323734400,O:1328659200,i:1332892800,j:133704e4,k:1340668800,l:1343692800,m:1348531200,n:1352246400,o:1357862400,p:1361404800,q:1364428800,r:1369094400,s:1374105600,t:1376956800,u:1384214400,v:1389657600,w:1392940800,x:1397001600,y:1400544e3,z:1405468800,AB:1449014400,BB:1453248e3,CB:1456963200,DB:1460592e3,EB:1464134400,FB:1469059200,GB:1472601600,HB:1476230400,IB:1480550400,JB:1485302400,KB:1489017600,LB:149256e4,gB:1496707200,MB:1500940800,hB:1504569600,NB:1508198400,OB:1512518400,T:1516752e3,PB:1520294400,QB:1523923200,RB:1527552e3,SB:1532390400,TB:1536019200,UB:1539648e3,VB:1543968e3,WB:154872e4,XB:1552348800,YB:1555977600,ZB:1559606400,aB:1564444800,bB:1568073600,cB:1571702400,P:1575936e3,Q:1580860800,R:1586304e3,U:1589846400,V:1594684800,W:1598313600,X:1601942400,Y:1605571200,Z:1611014400,a:1614556800,b:1618272e3,c:1621987200,d:1626739200,e:1630368e3,f:1632268800,S:1634601600,g:1637020800,H:1641340800,jB:null,tB:null,uB:null}},E:{A:{I:0,h:.004293,J:.004656,D:.004465,E:.004356,F:.004891,A:.004425,B:.004318,C:.008536,K:.059752,L:.290224,G:.29876,vB:0,kB:.008692,wB:.012804,xB:.00456,yB:.004283,zB:.017072,lB:.012804,dB:.038412,eB:.068288,"0B":.51216,"1B":1.22492,"2B":1.29747,mB:.179256,"3B":0},B:"webkit",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","vB","kB","I","h","wB","J","xB","D","yB","E","F","zB","A","lB","B","dB","C","eB","K","0B","L","1B","G","2B","mB","3B","",""],E:"Safari",F:{vB:1205798400,kB:1226534400,I:1244419200,h:1275868800,wB:131112e4,J:1343174400,xB:13824e5,D:13824e5,yB:1410998400,E:1413417600,F:1443657600,zB:1458518400,A:1474329600,lB:1490572800,B:1505779200,dB:1522281600,C:1537142400,eB:1553472e3,K:1568851200,"0B":1585008e3,L:1600214400,"1B":1619395200,G:1632096e3,"2B":1635292800,mB:1639353600,"3B":null}},F:{A:{0:.004283,1:.004367,2:.004534,3:.004268,4:.004227,5:.004418,6:.004293,7:.004227,8:.004725,9:.008536,F:.0082,B:.016581,C:.004317,G:.00685,M:.00685,N:.00685,O:.005014,i:.006015,j:.004879,k:.006597,l:.006597,m:.013434,n:.006702,o:.006015,p:.005595,q:.004393,r:.008652,s:.004879,t:.004879,u:.004268,v:.005152,w:.005014,x:.009758,y:.004879,z:.004268,AB:.008942,BB:.004707,CB:.004827,DB:.004707,EB:.004707,FB:.004326,GB:.008922,HB:.014349,IB:.004425,JB:.00472,KB:.004425,LB:.004425,MB:.00472,NB:.004532,OB:.004566,T:.02283,PB:.00867,QB:.004656,RB:.004642,SB:.004318,TB:.00944,UB:.004293,VB:.004293,WB:.004298,XB:.096692,YB:.004201,ZB:.004141,aB:.008536,bB:.004318,cB:.004356,P:.008536,Q:.02134,R:.5335,iB:.55484,"4B":.00685,"5B":0,"6B":.008392,"7B":.004706,dB:.006229,nB:.004879,"8B":.008786,eB:.00472},B:"webkit",C:["","","","","","","","","","","","","","","","","","","","","F","4B","5B","6B","7B","B","dB","nB","8B","C","eB","G","M","N","O","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9","AB","BB","CB","DB","EB","FB","GB","HB","IB","JB","KB","LB","MB","NB","OB","T","PB","QB","RB","SB","TB","UB","VB","WB","XB","YB","ZB","aB","bB","cB","P","Q","R","iB","","",""],E:"Opera",F:{0:146232e4,1:1465344e3,2:1470096e3,3:1474329600,4:1477267200,5:1481587200,6:1486425600,7:1490054400,8:1494374400,9:1498003200,F:1150761600,"4B":1223424e3,"5B":1251763200,"6B":1267488e3,"7B":1277942400,B:1292457600,dB:1302566400,nB:1309219200,"8B":1323129600,C:1323129600,eB:1352073600,G:1372723200,M:1377561600,N:1381104e3,O:1386288e3,i:1390867200,j:1393891200,k:1399334400,l:1401753600,m:1405987200,n:1409616e3,o:1413331200,p:1417132800,q:1422316800,r:1425945600,s:1430179200,t:1433808e3,u:1438646400,v:1442448e3,w:1445904e3,x:1449100800,y:1454371200,z:1457308800,AB:1502236800,BB:1506470400,CB:1510099200,DB:1515024e3,EB:1517961600,FB:1521676800,GB:1525910400,HB:1530144e3,IB:1534982400,JB:1537833600,KB:1543363200,LB:1548201600,MB:1554768e3,NB:1561593600,OB:1566259200,T:1570406400,PB:1573689600,QB:1578441600,RB:1583971200,SB:1587513600,TB:1592956800,UB:1595894400,VB:1600128e3,WB:1603238400,XB:161352e4,YB:1612224e3,ZB:1616544e3,aB:1619568e3,bB:1623715200,cB:1627948800,P:1631577600,Q:1633392e3,R:1635984e3,iB:1638403200},D:{F:"o",B:"o",C:"o","4B":"o","5B":"o","6B":"o","7B":"o",dB:"o",nB:"o","8B":"o",eB:"o"}},G:{A:{E:0,kB:0,"9B":0,oB:.00303749,AC:.00607498,BC:.0577123,CC:.0212624,DC:.01215,EC:.0182249,FC:.101756,GC:.0288562,HC:.123018,IC:.0728998,JC:.0455623,KC:.0455623,LC:.631798,MC:.0349311,NC:.0167062,OC:.0926434,PC:.300711,QC:.970478,RC:4.48182,SC:7.45096,mB:.662173},B:"webkit",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","kB","9B","oB","AC","BC","CC","E","DC","EC","FC","GC","HC","IC","JC","KC","LC","MC","NC","OC","PC","QC","RC","SC","mB","","",""],E:"Safari on iOS",F:{kB:1270252800,"9B":1283904e3,oB:1299628800,AC:1331078400,BC:1359331200,CC:1394409600,E:1410912e3,DC:1413763200,EC:1442361600,FC:1458518400,GC:1473724800,HC:1490572800,IC:1505779200,JC:1522281600,KC:1537142400,LC:1553472e3,MC:1568851200,NC:1572220800,OC:1580169600,PC:1585008e3,QC:1600214400,RC:1619395200,SC:1632096e3,mB:1639353600}},H:{A:{TC:1.06363},B:"o",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","TC","","",""],E:"Opera Mini",F:{TC:1426464e3}},I:{A:{fB:0,I:.0320682,H:0,UC:0,VC:0,WC:0,XC:.0178157,oB:.0605733,YC:0,ZC:.285051},B:"webkit",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","UC","VC","WC","fB","I","XC","oB","YC","ZC","H","","",""],E:"Android Browser",F:{UC:1256515200,VC:1274313600,WC:1291593600,fB:1298332800,I:1318896e3,XC:1341792e3,oB:1374624e3,YC:1386547200,ZC:1401667200,H:1641340800}},J:{A:{D:0,A:0},B:"webkit",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","D","A","","",""],E:"Blackberry Browser",F:{D:1325376e3,A:1359504e3}},K:{A:{A:0,B:0,C:0,T:.0111391,dB:0,nB:0,eB:0},B:"o",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","A","B","dB","nB","C","eB","T","","",""],E:"Opera Mobile",F:{A:1287100800,B:1300752e3,dB:1314835200,nB:1318291200,C:1330300800,eB:1349740800,T:1613433600},D:{T:"webkit"}},L:{A:{H:38.3274},B:"webkit",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","H","","",""],E:"Chrome for Android",F:{H:1641340800}},M:{A:{S:.298064},B:"moz",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","S","","",""],E:"Firefox for Android",F:{S:1638835200}},N:{A:{A:.0115934,B:.022664},B:"ms",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","A","B","","",""],E:"IE Mobile",F:{A:1340150400,B:1353456e3}},O:{A:{aC:.957244},B:"webkit",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","aC","","",""],E:"UC Browser for Android",F:{aC:1471392e3},D:{aC:"webkit"}},P:{A:{I:.228839,bC:.0103543,cC:.010304,dC:.0728124,eC:.0103584,fC:.0312053,lB:.0105043,gC:.0832142,hC:.0312053,iC:.135223,jC:.145625,kC:.343259,lC:0},B:"webkit",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","I","bC","cC","dC","eC","fC","lB","gC","hC","iC","jC","kC","lC","","",""],E:"Samsung Internet",F:{I:1461024e3,bC:1481846400,cC:1509408e3,dC:1528329600,eC:1546128e3,fC:1554163200,lB:1567900800,gC:1582588800,hC:1593475200,iC:1605657600,jC:1618531200,kC:1629072e3,lC:1640736e3}},Q:{A:{mC:.177692},B:"webkit",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","mC","","",""],E:"QQ Browser",F:{mC:1589846400}},R:{A:{nC:0},B:"webkit",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","nC","","",""],E:"Baidu Browser",F:{nC:1491004800}},S:{A:{oC:.074516},B:"moz",C:["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","oC","","",""],E:"KaiOS Browser",F:{oC:1527811200}}}},function(e){e.exports=JSON.parse('{"v0.8":{"start":"2012-06-25","end":"2014-07-31"},"v0.10":{"start":"2013-03-11","end":"2016-10-31"},"v0.12":{"start":"2015-02-06","end":"2016-12-31"},"v4":{"start":"2015-09-08","lts":"2015-10-12","maintenance":"2017-04-01","end":"2018-04-30","codename":"Argon"},"v5":{"start":"2015-10-29","maintenance":"2016-04-30","end":"2016-06-30"},"v6":{"start":"2016-04-26","lts":"2016-10-18","maintenance":"2018-04-30","end":"2019-04-30","codename":"Boron"},"v7":{"start":"2016-10-25","maintenance":"2017-04-30","end":"2017-06-30"},"v8":{"start":"2017-05-30","lts":"2017-10-31","maintenance":"2019-01-01","end":"2019-12-31","codename":"Carbon"},"v9":{"start":"2017-10-01","maintenance":"2018-04-01","end":"2018-06-30"},"v10":{"start":"2018-04-24","lts":"2018-10-30","maintenance":"2020-05-19","end":"2021-04-30","codename":"Dubnium"},"v11":{"start":"2018-10-23","maintenance":"2019-04-22","end":"2019-06-01"},"v12":{"start":"2019-04-23","lts":"2019-10-21","maintenance":"2020-11-30","end":"2022-04-30","codename":"Erbium"},"v13":{"start":"2019-10-22","maintenance":"2020-04-01","end":"2020-06-01"},"v14":{"start":"2020-04-21","lts":"2020-10-27","maintenance":"2021-10-19","end":"2023-04-30","codename":"Fermium"},"v15":{"start":"2020-10-20","maintenance":"2021-04-01","end":"2021-06-01"},"v16":{"start":"2021-04-20","lts":"2021-10-26","maintenance":"2022-10-18","end":"2024-04-30","codename":""},"v17":{"start":"2021-10-19","maintenance":"2022-04-01","end":"2022-06-01"},"v18":{"start":"2022-04-19","lts":"2022-10-25","maintenance":"2023-10-18","end":"2025-04-30","codename":""}}')},function(e,t){},function(e,t){e.exports={"0.20":"39",.21:"41",.22:"41",.23:"41",.24:"41",.25:"42",.26:"42",.27:"43",.28:"43",.29:"43","0.30":"44",.31:"45",.32:"45",.33:"45",.34:"45",.35:"45",.36:"47",.37:"49","1.0":"49",1.1:"50",1.2:"51",1.3:"52",1.4:"53",1.5:"54",1.6:"56",1.7:"58",1.8:"59","2.0":"61",2.1:"61","3.0":"66",3.1:"66","4.0":"69",4.1:"69",4.2:"69","5.0":"73","6.0":"76",6.1:"76","7.0":"78",7.1:"78",7.2:"78",7.3:"78","8.0":"80",8.1:"80",8.2:"80",8.3:"80",8.4:"80",8.5:"80","9.0":"83",9.1:"83",9.2:"83",9.3:"83",9.4:"83","10.0":"85",10.1:"85",10.2:"85",10.3:"85",10.4:"85","11.0":"87",11.1:"87",11.2:"87",11.3:"87",11.4:"87",11.5:"87","12.0":"89",12.1:"89",12.2:"89","13.0":"91",13.1:"91",13.2:"91",13.3:"91",13.4:"91",13.5:"91",13.6:"91","14.0":"93",14.1:"93",14.2:"93","15.0":"94",15.1:"94",15.2:"94",15.3:"94","16.0":"96","17.0":"98"}},function(e,t,r){var n=r(273);function i(){}e.exports={loadQueries:function(){throw new n("Sharable configs are not supported in client-side build of Browserslist")},getStat:function(e){return e.stats},loadConfig:function(e){if(e.config)throw new n("Browserslist config are not supported in client-side build")},loadCountry:function(){throw new n("Country statistics are not supported in client-side build of Browserslist")},loadFeature:function(){throw new n("Supports queries are not available in client-side build of Browserslist")},currentNode:function(e,t){return e(["maintained node versions"],t)[0]},parseConfig:i,readConfig:i,findConfig:i,clearCaches:i,oldDataWarning:i}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.OptionValidator=void 0;var n=r(275);t.OptionValidator=class{constructor(e){this.descriptor=e}validateTopLevelOptions(e,t){const r=Object.keys(t);for(const t of Object.keys(e))if(!r.includes(t))throw new Error(this.formatMessage(`'${t}' is not a valid top-level option.\n- Did you mean '${(0,n.findSuggestion)(t,r)}'?`))}validateBooleanOption(e,t,r){return void 0===t?r:(this.invariant("boolean"==typeof t,`'${e}' option must be a boolean.`),t)}validateStringOption(e,t,r){return void 0===t?r:(this.invariant("string"==typeof t,`'${e}' option must be a string.`),t)}invariant(e,t){if(!e)throw new Error(this.formatMessage(t))}formatMessage(e){return`${this.descriptor}: ${e}`}}},function(e,t,r){e.exports=r(689)},function(e){e.exports=JSON.parse('{"es6.module":{"chrome":"61","and_chr":"61","edge":"16","firefox":"60","and_ff":"60","node":"13.2.0","opera":"48","op_mob":"48","safari":"10.1","ios":"10.3","samsung":"8.2","android":"61","electron":"2.0","ios_saf":"10.3"}}')},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.TargetNames=void 0,t.TargetNames={node:"node",chrome:"chrome",opera:"opera",edge:"edge",firefox:"firefox",safari:"safari",ie:"ie",ios:"ios",android:"android",electron:"electron",samsung:"samsung",rhino:"rhino"}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getInclusionReasons=function(e,t,r){const o=r[e]||{};return Object.keys(t).reduce(((e,r)=>{const a=(0,s.getLowestImplementedVersion)(o,r),l=t[r];if(a){const t=(0,s.isUnreleasedVersion)(a,r);(0,s.isUnreleasedVersion)(l,r)||!t&&!n.lt(l.toString(),(0,s.semverify)(a))||(e[r]=(0,i.prettifyVersion)(l))}else e[r]=(0,i.prettifyVersion)(l);return e}),{})};var n=r(59),i=r(276),s=r(151)},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,r,n,i,s,o){const l=new Set,c={compatData:e,includes:t,excludes:r};for(const t in e)if(a(t,n,c))l.add(t);else if(o){const e=o.get(t);e&&l.add(e)}return i&&i.forEach((e=>!r.has(e)&&l.add(e))),s&&s.forEach((e=>!t.has(e)&&l.delete(e))),l},t.isRequired=a,t.targetsSupported=o;var n=r(59),i=r(693),s=r(151);function o(e,t){const r=Object.keys(e);return 0!==r.length&&0===r.filter((r=>{const i=(0,s.getLowestImplementedVersion)(t,r);if(!i)return!0;const o=e[r];if((0,s.isUnreleasedVersion)(o,r))return!1;if((0,s.isUnreleasedVersion)(i,r))return!0;if(!n.valid(o.toString()))throw new Error(`Invalid version passed for target "${r}": "${o}". Versions must be in semver format (major.minor.patch)`);return n.gt((0,s.semverify)(i),o.toString())})).length}function a(e,t,{compatData:r=i,includes:n,excludes:s}={}){return!(null!=s&&s.has(e)||(null==n||!n.has(e))&&o(t,r[e]))}},function(e,t,r){e.exports=r(694)},function(e){e.exports=JSON.parse('{"proposal-class-static-block":{"chrome":"94","opera":"80","edge":"94","firefox":"93","node":"16.11"},"proposal-private-property-in-object":{"chrome":"91","opera":"77","edge":"91","firefox":"90","safari":"15","node":"16.9","ios":"15","electron":"13.0"},"proposal-class-properties":{"chrome":"74","opera":"62","edge":"79","firefox":"90","safari":"14.1","node":"12","ios":"15","samsung":"11","electron":"6.0"},"proposal-private-methods":{"chrome":"84","opera":"70","edge":"84","firefox":"90","safari":"15","node":"14.6","ios":"15","samsung":"14","electron":"10.0"},"proposal-numeric-separator":{"chrome":"75","opera":"62","edge":"79","firefox":"70","safari":"13","node":"12.5","ios":"13","samsung":"11","electron":"6.0"},"proposal-logical-assignment-operators":{"chrome":"85","opera":"71","edge":"85","firefox":"79","safari":"14","node":"15","ios":"14","samsung":"14","electron":"10.0"},"proposal-nullish-coalescing-operator":{"chrome":"80","opera":"67","edge":"80","firefox":"72","safari":"13.1","node":"14","ios":"13.4","samsung":"13","electron":"8.0"},"proposal-optional-chaining":{"chrome":"91","opera":"77","edge":"91","firefox":"74","safari":"13.1","node":"16.9","ios":"13.4","electron":"13.0"},"proposal-json-strings":{"chrome":"66","opera":"53","edge":"79","firefox":"62","safari":"12","node":"10","ios":"12","samsung":"9","electron":"3.0"},"proposal-optional-catch-binding":{"chrome":"66","opera":"53","edge":"79","firefox":"58","safari":"11.1","node":"10","ios":"11.3","samsung":"9","electron":"3.0"},"transform-parameters":{"chrome":"49","opera":"36","edge":"18","firefox":"53","node":"6","samsung":"5","electron":"0.37"},"proposal-async-generator-functions":{"chrome":"63","opera":"50","edge":"79","firefox":"57","safari":"12","node":"10","ios":"12","samsung":"8","electron":"3.0"},"proposal-object-rest-spread":{"chrome":"60","opera":"47","edge":"79","firefox":"55","safari":"11.1","node":"8.3","ios":"11.3","samsung":"8","electron":"2.0"},"transform-dotall-regex":{"chrome":"62","opera":"49","edge":"79","firefox":"78","safari":"11.1","node":"8.10","ios":"11.3","samsung":"8","electron":"3.0"},"proposal-unicode-property-regex":{"chrome":"64","opera":"51","edge":"79","firefox":"78","safari":"11.1","node":"10","ios":"11.3","samsung":"9","electron":"3.0"},"transform-named-capturing-groups-regex":{"chrome":"64","opera":"51","edge":"79","firefox":"78","safari":"11.1","node":"10","ios":"11.3","samsung":"9","electron":"3.0"},"transform-async-to-generator":{"chrome":"55","opera":"42","edge":"15","firefox":"52","safari":"11","node":"7.6","ios":"11","samsung":"6","electron":"1.6"},"transform-exponentiation-operator":{"chrome":"52","opera":"39","edge":"14","firefox":"52","safari":"10.1","node":"7","ios":"10.3","samsung":"6","electron":"1.3"},"transform-template-literals":{"chrome":"41","opera":"28","edge":"13","firefox":"34","safari":"13","node":"4","ios":"13","samsung":"3.4","electron":"0.21"},"transform-literals":{"chrome":"44","opera":"31","edge":"12","firefox":"53","safari":"9","node":"4","ios":"9","samsung":"4","electron":"0.30"},"transform-function-name":{"chrome":"51","opera":"38","edge":"79","firefox":"53","safari":"10","node":"6.5","ios":"10","samsung":"5","electron":"1.2"},"transform-arrow-functions":{"chrome":"47","opera":"34","edge":"13","firefox":"43","safari":"10","node":"6","ios":"10","samsung":"5","rhino":"1.7.13","electron":"0.36"},"transform-block-scoped-functions":{"chrome":"41","opera":"28","edge":"12","firefox":"46","safari":"10","node":"4","ie":"11","ios":"10","samsung":"3.4","electron":"0.21"},"transform-classes":{"chrome":"46","opera":"33","edge":"13","firefox":"45","safari":"10","node":"5","ios":"10","samsung":"5","electron":"0.36"},"transform-object-super":{"chrome":"46","opera":"33","edge":"13","firefox":"45","safari":"10","node":"5","ios":"10","samsung":"5","electron":"0.36"},"transform-shorthand-properties":{"chrome":"43","opera":"30","edge":"12","firefox":"33","safari":"9","node":"4","ios":"9","samsung":"4","electron":"0.27"},"transform-duplicate-keys":{"chrome":"42","opera":"29","edge":"12","firefox":"34","safari":"9","node":"4","ios":"9","samsung":"3.4","electron":"0.25"},"transform-computed-properties":{"chrome":"44","opera":"31","edge":"12","firefox":"34","safari":"7.1","node":"4","ios":"8","samsung":"4","electron":"0.30"},"transform-for-of":{"chrome":"51","opera":"38","edge":"15","firefox":"53","safari":"10","node":"6.5","ios":"10","samsung":"5","electron":"1.2"},"transform-sticky-regex":{"chrome":"49","opera":"36","edge":"13","firefox":"3","safari":"10","node":"6","ios":"10","samsung":"5","electron":"0.37"},"transform-unicode-escapes":{"chrome":"44","opera":"31","edge":"12","firefox":"53","safari":"9","node":"4","ios":"9","samsung":"4","electron":"0.30"},"transform-unicode-regex":{"chrome":"50","opera":"37","edge":"13","firefox":"46","safari":"12","node":"6","ios":"12","samsung":"5","electron":"1.1"},"transform-spread":{"chrome":"46","opera":"33","edge":"13","firefox":"45","safari":"10","node":"5","ios":"10","samsung":"5","electron":"0.36"},"transform-destructuring":{"chrome":"51","opera":"38","edge":"15","firefox":"53","safari":"10","node":"6.5","ios":"10","samsung":"5","electron":"1.2"},"transform-block-scoping":{"chrome":"49","opera":"36","edge":"14","firefox":"51","safari":"11","node":"6","ios":"11","samsung":"5","electron":"0.37"},"transform-typeof-symbol":{"chrome":"38","opera":"25","edge":"12","firefox":"36","safari":"9","node":"0.12","ios":"9","samsung":"3","rhino":"1.7.13","electron":"0.20"},"transform-new-target":{"chrome":"46","opera":"33","edge":"14","firefox":"41","safari":"10","node":"5","ios":"10","samsung":"5","electron":"0.36"},"transform-regenerator":{"chrome":"50","opera":"37","edge":"13","firefox":"53","safari":"10","node":"6","ios":"10","samsung":"5","electron":"1.1"},"transform-member-expression-literals":{"chrome":"7","opera":"12","edge":"12","firefox":"2","safari":"5.1","node":"0.10","ie":"9","android":"4","ios":"6","phantom":"2","samsung":"1","rhino":"1.7.13","electron":"0.20"},"transform-property-literals":{"chrome":"7","opera":"12","edge":"12","firefox":"2","safari":"5.1","node":"0.10","ie":"9","android":"4","ios":"6","phantom":"2","samsung":"1","rhino":"1.7.13","electron":"0.20"},"transform-reserved-words":{"chrome":"13","opera":"10.50","edge":"12","firefox":"2","safari":"3.1","node":"0.10","ie":"9","android":"4.4","ios":"6","phantom":"2","samsung":"1","rhino":"1.7.13","electron":"0.20"},"proposal-export-namespace-from":{"chrome":"72","and_chr":"72","edge":"79","firefox":"80","and_ff":"80","node":"13.2","opera":"60","op_mob":"51","samsung":"11.0","android":"72","electron":"5.0"}}')},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,t.default={auxiliaryComment:{message:"Use `auxiliaryCommentBefore` or `auxiliaryCommentAfter`"},blacklist:{message:"Put the specific transforms you want in the `plugins` option"},breakConfig:{message:"This is not a necessary option in Babel 6"},experimental:{message:"Put the specific transforms you want in the `plugins` option"},externalHelpers:{message:"Use the `external-helpers` plugin instead. Check out http://babeljs.io/docs/plugins/external-helpers/"},extra:{message:""},jsxPragma:{message:"use the `pragma` option in the `react-jsx` plugin. Check out http://babeljs.io/docs/plugins/transform-react-jsx/"},loose:{message:"Specify the `loose` option for the relevant plugin you are using or use a preset that sets the option."},metadataUsedHelpers:{message:"Not required anymore as this is enabled by default"},modules:{message:"Use the corresponding module transform plugin in the `plugins` option. Check out http://babeljs.io/docs/plugins/#modules"},nonStandard:{message:"Use the `react-jsx` and `flow-strip-types` plugins to support JSX and Flow. Also check out the react preset http://babeljs.io/docs/plugins/preset-react/"},optional:{message:"Put the specific transforms you want in the `plugins` option"},sourceMapName:{message:"The `sourceMapName` option has been removed because it makes more sense for the tooling that calls Babel to assign `map.file` themselves."},stage:{message:"Check out the corresponding stage-x presets http://babeljs.io/docs/plugins/#presets"},whitelist:{message:"Put the specific transforms you want in the `plugins` option"},resolveModuleSource:{version:6,message:"Use `babel-plugin-module-resolver@3`'s 'resolvePath' options"},metadata:{version:6,message:"Generated plugin metadata is always included in the output result"},sourceMapTarget:{version:6,message:"The `sourceMapTarget` option has been removed because it makes more sense for the tooling that calls Babel to assign `map.file` themselves."}}},function(e,t,r){"use strict";function n(){const e=r(33);return n=function(){return e},e}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){const r=n().resolve(t,e).split(n().sep);return new RegExp(["^",...r.map(((e,t)=>{const n=t===r.length-1;return"**"===e?n?u:c:"*"===e?n?l:a:0===e.indexOf("*.")?o+h(e.slice(1))+(n?s:i):h(e)+(n?s:i)}))].join(""))};const i="\\"+n().sep,s=`(?:${i}|$)`,o=`[^${i}]+`,a=`(?:${o}${i})`,l=`(?:${o}${s})`,c=a+"*?",u=`${a}*?${l}?`;function h(e){return e.replace(/[|\\{}()[\]^$+*?.]/g,"\\$&")}},function(e,t,r){"use strict";function n(){const e=r(29);return n=function(){return e},e}Object.defineProperty(t,"__esModule",{value:!0}),t.ConfigPrinter=t.ChainFormatter=void 0;const i={Programmatic:0,Config:1};t.ChainFormatter=i;const s={title(e,t,r){let n="";return e===i.Programmatic?(n="programmatic options",t&&(n+=" from "+t)):n="config "+r,n},loc(e,t){let r="";return null!=e&&(r+=`.overrides[${e}]`),null!=t&&(r+=`.env["${t}"]`),r},*optionsAndDescriptors(e){const t=Object.assign({},e.options);delete t.overrides,delete t.env;const r=[...yield*e.plugins()];r.length&&(t.plugins=r.map((e=>o(e))));const n=[...yield*e.presets()];return n.length&&(t.presets=[...n].map((e=>o(e)))),JSON.stringify(t,void 0,2)}};function o(e){var t;let r=null==(t=e.file)?void 0:t.request;return null==r&&("object"==typeof e.value?r=e.value:"function"==typeof e.value&&(r=`[Function: ${e.value.toString().substr(0,50)} ... ]`)),null==r&&(r="[Unknown]"),void 0===e.options?r:null==e.name?[r,e.options]:[r,e.options,e.name]}class a{constructor(){this._stack=[]}configure(e,t,{callerName:r,filepath:n}){return e?(e,i,s)=>{this._stack.push({type:t,callerName:r,filepath:n,content:e,index:i,envName:s})}:()=>{}}static*format(e){let t=s.title(e.type,e.callerName,e.filepath);const r=s.loc(e.index,e.envName);return r&&(t+=" "+r),`${t}\n${yield*s.optionsAndDescriptors(e.content)}`}*output(){return 0===this._stack.length?"":(yield*n().all(this._stack.map((e=>a.format(e))))).join("\n\n")}}t.ConfigPrinter=a},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.validatePluginObject=function(e){const t={type:"root",source:"plugin"};return Object.keys(e).forEach((r=>{const n=i[r];if(!n){const e=new Error(`.${r} is not a valid Plugin property`);throw e.code="BABEL_UNKNOWN_PLUGIN_PROPERTY",e}n({type:"option",name:r,parent:t},e[r])})),e};var n=r(278);const i={name:n.assertString,manipulateOptions:n.assertFunction,pre:n.assertFunction,post:n.assertFunction,inherits:n.assertFunction,visitor:function(e,t){const r=(0,n.assertObject)(e,t);if(r&&(Object.keys(r).forEach((e=>function(e,t){if(t&&"object"==typeof t)Object.keys(t).forEach((t=>{if("enter"!==t&&"exit"!==t)throw new Error(`.visitor["${e}"] may only have .enter and/or .exit handlers.`)}));else if("function"!=typeof t)throw new Error(`.visitor["${e}"] must be a function`);return t}(e,r[e]))),r.enter||r.exit))throw new Error((0,n.msg)(e)+' cannot contain catch-all "enter" or "exit" handlers. Please target individual nodes.');return r},parserOverride:n.assertFunction,generatorOverride:n.assertFunction}},function(e,t,r){"use strict";function n(){const e=r(59);return n=function(){return e},e}Object.defineProperty(t,"__esModule",{value:!0}),t.makeConfigAPI=o,t.makePluginAPI=function(e){return Object.assign({},a(e),{assumption:t=>e.using((e=>e.assumptions[t]))})},t.makePresetAPI=a;var i=r(34),s=r(96);function o(e){return{version:i.version,cache:e.simple(),env:t=>e.using((e=>void 0===t?e.envName:"function"==typeof t?(0,s.assertSimpleType)(t(e.envName)):(Array.isArray(t)||(t=[t]),t.some((t=>{if("string"!=typeof t)throw new Error("Unexpected non-string value");return t===e.envName}))))),async:()=>!1,caller:t=>e.using((e=>(0,s.assertSimpleType)(t(e.caller)))),assertVersion:l}}function a(e){return Object.assign({},o(e),{targets:()=>JSON.parse(e.using((e=>JSON.stringify(e.targets))))})}function l(e){if("number"==typeof e){if(!Number.isInteger(e))throw new Error("Expected string or integer value.");e=`^${e}.0.0-0`}if("string"!=typeof e)throw new Error("Expected string or integer value.");if(n().satisfies(i.version,e))return;const t=Error.stackTraceLimit;"number"==typeof t&&t<25&&(Error.stackTraceLimit=25);const r=new Error(`Requires Babel "${e}", but was loaded with "${i.version}". If you are sure you have a compatible version of @babel/core, it is likely that something in your build process is loading the wrong version. Inspect the stack trace of this error to look for the first entry that doesn't mention "@babel/core" or "babel-core" to see what is calling Babel.`);throw"number"==typeof t&&(Error.stackTraceLimit=t),Object.assign(r,{code:"BABEL_VERSION_UNSUPPORTED",version:i.version,range:e})}r(279)},function(e,t,r){"use strict";function n(){const e=r(29);return n=function(){return e},e}Object.defineProperty(t,"__esModule",{value:!0}),t.transformSync=t.transformAsync=t.transform=void 0;var i=r(93),s=r(281);const o=n()((function*(e,t){const r=yield*(0,i.default)(t);return null===r?null:yield*(0,s.run)(r,e)}));t.transform=function(e,t,r){if("function"==typeof t&&(r=t,t=void 0),void 0===r)return o.sync(e,t);o.errback(e,t,r)};const a=o.sync;t.transformSync=a;const l=o.async;t.transformAsync=l},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;class n{constructor(e,t,r){this._map=new Map,this.key=void 0,this.file=void 0,this.opts=void 0,this.cwd=void 0,this.filename=void 0,this.key=t,this.file=e,this.opts=r||{},this.cwd=e.opts.cwd,this.filename=e.opts.filename}set(e,t){this._map.set(e,t)}get(e){return this._map.get(e)}availableHelper(e,t){return this.file.availableHelper(e,t)}addHelper(e){return this.file.addHelper(e)}addImport(){return this.file.addImport()}buildCodeFrameError(e,t,r){return this.file.buildCodeFrameError(e,t,r)}}t.default=n,n.prototype.getModuleName=function(){return this.file.getModuleName()}},function(e,t,r){"use strict";function n(){const e=r(28);return n=function(){return e},e}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){return s||(s=new i.default(Object.assign({},a,{visitor:n().default.explode(a.visitor)}),{})),s};var i=r(94);let s;function o(e){const t=null==e?void 0:e._blockHoist;return null==t?1:!0===t?2:t}const a={name:"internal.blockHoist",visitor:{Block:{exit({node:e}){const{body:t}=e;let r=Math.pow(2,30)-1,n=!1;for(let e=0;e<t.length;e++){const i=o(t[e]);if(i>r){n=!0;break}r=i}n&&(e.body=function(e){const t=Object.create(null);for(let r=0;r<e.length;r++){const n=e[r],i=o(n);(t[i]||(t[i]=[])).push(n)}const r=Object.keys(t).map((e=>+e)).sort(((e,t)=>t-e));let n=0;for(const i of r){const r=t[i];for(const t of r)e[n++]=t}return e}(t.slice()))}}}}},function(e,t,r){"use strict";function n(){const e=r(283);return n=function(){return e},e}function i(){const e=r(33);return i=function(){return e},e}function s(){const e=r(147);return s=function(){return e},e}function o(){const e=r(1);return o=function(){return e},e}function a(){const e=r(284);return a=function(){return e},e}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function*(e,t,r,s){if(r=""+(r||""),s){if("Program"===s.type)s=h(s,[],[]);else if("File"!==s.type)throw new Error("AST root must be a Program or File node");t.cloneInputAst&&(s=(0,u.default)(s))}else s=yield*(0,c.default)(e,t,r);let o=null;if(!1!==t.inputSourceMap){if("object"==typeof t.inputSourceMap&&(o=a().fromObject(t.inputSourceMap)),!o){const t=y(f,s);if(t)try{o=a().fromComment(t)}catch(e){d("discarding unknown inline input sourcemap",e)}}if(!o){const r=y(m,s);if("string"==typeof t.filename&&r)try{const e=m.exec(r),s=n().readFileSync(i().resolve(i().dirname(t.filename),e[1]));s.length>1e6?d("skip merging input map > 1 MB"):o=a().fromJSON(s)}catch(e){d("discarding unknown file input sourcemap",e)}else r&&d("discarding un-loadable file input sourcemap")}}return new l.default(t,{code:r,ast:s,inputMap:o})};var l=r(142),c=r(285),u=r(706);const{file:h,traverseFast:p}=o(),d=s()("babel:transform:file"),f=/^[@#]\s+sourceMappingURL=data:(?:application|text)\/json;(?:charset[:=]\S+?;)?base64,(?:.*)$/,m=/^[@#][ \t]+sourceMappingURL=([^\s'"`]+)[ \t]*$/;function g(e,t,r){return t&&(t=t.filter((({value:t})=>!e.test(t)||(r=t,!1)))),[t,r]}function y(e,t){let r=null;return p(t,(t=>{[t.leadingComments,r]=g(e,t.leadingComments,r),[t.innerComments,r]=g(e,t.innerComments,r),[t.trailingComments,r]=g(e,t.trailingComments,r)})),r}},function(e,t,r){var n=r(4),i=n.Buffer;function s(e,t){for(var r in e)t[r]=e[r]}function o(e,t,r){return i(e,t,r)}i.from&&i.alloc&&i.allocUnsafe&&i.allocUnsafeSlow?e.exports=n:(s(n,t),t.Buffer=o),s(i,o),o.from=function(e,t,r){if("number"==typeof e)throw new TypeError("Argument must not be a number");return i(e,t,r)},o.alloc=function(e,t,r){if("number"!=typeof e)throw new TypeError("Argument must be a number");var n=i(e);return void 0!==t?"string"==typeof r?n.fill(t,r):n.fill(t):n.fill(0),n},o.allocUnsafe=function(e){if("number"!=typeof e)throw new TypeError("Argument must be a number");return i(e)},o.allocUnsafeSlow=function(e){if("number"!=typeof e)throw new TypeError("Argument must be a number");return n.SlowBuffer(e)}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,r){let s=`Support for the experimental syntax '${e}' isn't currently enabled (${t.line}:${t.column+1}):\n\n`+r;const o=n[e];if(o){const{syntax:e,transform:t}=o;if(e){const r=i(e);s+=t?`\n\nAdd ${i(t)} to the '${t.name.startsWith("@babel/plugin")?"plugins":"presets"}' section of your Babel config to enable transformation.\nIf you want to leave it as-is, add ${r} to the 'plugins' section to enable parsing.`:`\n\nAdd ${r} to the 'plugins' section of your Babel config to enable parsing.`}}return s};const n={asyncDoExpressions:{syntax:{name:"@babel/plugin-syntax-async-do-expressions",url:"https://git.io/JYer8"}},classProperties:{syntax:{name:"@babel/plugin-syntax-class-properties",url:"https://git.io/vb4yQ"},transform:{name:"@babel/plugin-proposal-class-properties",url:"https://git.io/vb4SL"}},classPrivateProperties:{syntax:{name:"@babel/plugin-syntax-class-properties",url:"https://git.io/vb4yQ"},transform:{name:"@babel/plugin-proposal-class-properties",url:"https://git.io/vb4SL"}},classPrivateMethods:{syntax:{name:"@babel/plugin-syntax-class-properties",url:"https://git.io/vb4yQ"},transform:{name:"@babel/plugin-proposal-private-methods",url:"https://git.io/JvpRG"}},classStaticBlock:{syntax:{name:"@babel/plugin-syntax-class-static-block",url:"https://git.io/JTLB6"},transform:{name:"@babel/plugin-proposal-class-static-block",url:"https://git.io/JTLBP"}},decimal:{syntax:{name:"@babel/plugin-syntax-decimal",url:"https://git.io/JfKOH"}},decorators:{syntax:{name:"@babel/plugin-syntax-decorators",url:"https://git.io/vb4y9"},transform:{name:"@babel/plugin-proposal-decorators",url:"https://git.io/vb4ST"}},doExpressions:{syntax:{name:"@babel/plugin-syntax-do-expressions",url:"https://git.io/vb4yh"},transform:{name:"@babel/plugin-proposal-do-expressions",url:"https://git.io/vb4S3"}},dynamicImport:{syntax:{name:"@babel/plugin-syntax-dynamic-import",url:"https://git.io/vb4Sv"}},exportDefaultFrom:{syntax:{name:"@babel/plugin-syntax-export-default-from",url:"https://git.io/vb4SO"},transform:{name:"@babel/plugin-proposal-export-default-from",url:"https://git.io/vb4yH"}},exportNamespaceFrom:{syntax:{name:"@babel/plugin-syntax-export-namespace-from",url:"https://git.io/vb4Sf"},transform:{name:"@babel/plugin-proposal-export-namespace-from",url:"https://git.io/vb4SG"}},flow:{syntax:{name:"@babel/plugin-syntax-flow",url:"https://git.io/vb4yb"},transform:{name:"@babel/preset-flow",url:"https://git.io/JfeDn"}},functionBind:{syntax:{name:"@babel/plugin-syntax-function-bind",url:"https://git.io/vb4y7"},transform:{name:"@babel/plugin-proposal-function-bind",url:"https://git.io/vb4St"}},functionSent:{syntax:{name:"@babel/plugin-syntax-function-sent",url:"https://git.io/vb4yN"},transform:{name:"@babel/plugin-proposal-function-sent",url:"https://git.io/vb4SZ"}},importMeta:{syntax:{name:"@babel/plugin-syntax-import-meta",url:"https://git.io/vbKK6"}},jsx:{syntax:{name:"@babel/plugin-syntax-jsx",url:"https://git.io/vb4yA"},transform:{name:"@babel/preset-react",url:"https://git.io/JfeDR"}},importAssertions:{syntax:{name:"@babel/plugin-syntax-import-assertions",url:"https://git.io/JUbkv"}},moduleStringNames:{syntax:{name:"@babel/plugin-syntax-module-string-names",url:"https://git.io/JTL8G"}},numericSeparator:{syntax:{name:"@babel/plugin-syntax-numeric-separator",url:"https://git.io/vb4Sq"},transform:{name:"@babel/plugin-proposal-numeric-separator",url:"https://git.io/vb4yS"}},optionalChaining:{syntax:{name:"@babel/plugin-syntax-optional-chaining",url:"https://git.io/vb4Sc"},transform:{name:"@babel/plugin-proposal-optional-chaining",url:"https://git.io/vb4Sk"}},pipelineOperator:{syntax:{name:"@babel/plugin-syntax-pipeline-operator",url:"https://git.io/vb4yj"},transform:{name:"@babel/plugin-proposal-pipeline-operator",url:"https://git.io/vb4SU"}},privateIn:{syntax:{name:"@babel/plugin-syntax-private-property-in-object",url:"https://git.io/JfK3q"},transform:{name:"@babel/plugin-proposal-private-property-in-object",url:"https://git.io/JfK3O"}},recordAndTuple:{syntax:{name:"@babel/plugin-syntax-record-and-tuple",url:"https://git.io/JvKp3"}},throwExpressions:{syntax:{name:"@babel/plugin-syntax-throw-expressions",url:"https://git.io/vb4SJ"},transform:{name:"@babel/plugin-proposal-throw-expressions",url:"https://git.io/vb4yF"}},typescript:{syntax:{name:"@babel/plugin-syntax-typescript",url:"https://git.io/vb4SC"},transform:{name:"@babel/preset-typescript",url:"https://git.io/JfeDz"}},asyncGenerators:{syntax:{name:"@babel/plugin-syntax-async-generators",url:"https://git.io/vb4SY"},transform:{name:"@babel/plugin-proposal-async-generator-functions",url:"https://git.io/vb4yp"}},logicalAssignment:{syntax:{name:"@babel/plugin-syntax-logical-assignment-operators",url:"https://git.io/vAlBp"},transform:{name:"@babel/plugin-proposal-logical-assignment-operators",url:"https://git.io/vAlRe"}},nullishCoalescingOperator:{syntax:{name:"@babel/plugin-syntax-nullish-coalescing-operator",url:"https://git.io/vb4yx"},transform:{name:"@babel/plugin-proposal-nullish-coalescing-operator",url:"https://git.io/vb4Se"}},objectRestSpread:{syntax:{name:"@babel/plugin-syntax-object-rest-spread",url:"https://git.io/vb4y5"},transform:{name:"@babel/plugin-proposal-object-rest-spread",url:"https://git.io/vb4Ss"}},optionalCatchBinding:{syntax:{name:"@babel/plugin-syntax-optional-catch-binding",url:"https://git.io/vb4Sn"},transform:{name:"@babel/plugin-proposal-optional-catch-binding",url:"https://git.io/vb4SI"}}};n.privateIn.syntax=n.privateIn.transform;const i=({name:e,url:t})=>`${e} (${t})`},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return JSON.parse(JSON.stringify(e,i),s)};const n="$$ babel internal serialized type"+Math.random();function i(e,t){return"bigint"!=typeof t?t:{[n]:"BigInt",value:t.toString()}}function s(e,t){return t&&"object"==typeof t?"BigInt"!==t[n]?t:BigInt(t.value):t}},function(e,t,r){"use strict";function n(){const e=r(284);return n=function(){return e},e}function i(){const e=r(148);return i=function(){return e},e}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){const{opts:r,ast:o,code:a,inputMap:l}=t,c=[];for(const t of e)for(const e of t){const{generatorOverride:t}=e;if(t){const e=t(o,r.generatorOpts,a,i().default);void 0!==e&&c.push(e)}}let u;if(0===c.length)u=(0,i().default)(o,r.generatorOpts,a);else{if(1!==c.length)throw new Error("More than one plugin attempted to override codegen.");if(u=c[0],"function"==typeof u.then)throw new Error("You appear to be using an async codegen plugin, which your current version of Babel does not support. If you're using a published plugin, you may need to upgrade your @babel/core version.")}let{code:h,map:p}=u;return p&&l&&(p=(0,s.default)(l.toObject(),p)),"inline"!==r.sourceMaps&&"both"!==r.sourceMaps||(h+="\n"+n().fromObject(p).toComment()),"inline"===r.sourceMaps&&(p=null),{outputCode:h,outputMap:p}};var s=r(708)},function(e,t,r){"use strict";function n(){const e=r(255);return n=function(){return e},e}function i(e){return`${e.line}/${e.columnStart}`}function s(e){const t=new(n().SourceMapConsumer)(Object.assign({},e,{sourceRoot:null})),r=new Map,i=new Map;let s=null;return t.computeColumnSpans(),t.eachMapping((e=>{if(null===e.originalLine)return;let n=r.get(e.source);n||(n={path:e.source,content:t.sourceContentFor(e.source,!0)},r.set(e.source,n));let o=i.get(n);o||(o={source:n,mappings:[]},i.set(n,o));const a={line:e.originalLine,columnStart:e.originalColumn,columnEnd:1/0,name:e.name};s&&s.source===n&&s.mapping.line===e.originalLine&&(s.mapping.columnEnd=e.originalColumn),s={source:n,mapping:a},o.mappings.push({original:a,generated:t.allGeneratedPositionsFor({source:e.source,line:e.originalLine,column:e.originalColumn}).map((e=>({line:e.line,columnStart:e.column,columnEnd:e.lastColumn+1})))})}),null,n().SourceMapConsumer.ORIGINAL_ORDER),{file:e.file,sourceRoot:e.sourceRoot,sources:Array.from(i.values())}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){const r=s(e),o=s(t),a=new(n().SourceMapGenerator);for(const{source:e}of r.sources)"string"==typeof e.content&&a.setSourceContent(e.path,e.content);if(1===o.sources.length){const e=o.sources[0],t=new Map;!function(e,t){for(const{source:r,mappings:n}of e.sources)for(const{original:e,generated:i}of n)for(const n of i)t(n,e,r)}(r,((r,n,s)=>{!function(e,t,r){const n=function({mappings:e},{line:t,columnStart:r,columnEnd:n}){return function(e,t){const r=function(e,t){let r=0,n=e.length;for(;r<n;){const i=Math.floor((r+n)/2),s=t(e[i]);if(0===s){r=i;break}s>=0?n=i:r=i+1}let i=r;if(i<e.length){for(;i>=0&&t(e[i])>=0;)i--;return i+1}return i}(e,t),n=[];for(let i=r;i<e.length&&0===t(e[i]);i++)n.push(e[i]);return n}(e,(({original:e})=>t>e.line?-1:t<e.line?1:r>=e.columnEnd?-1:n<=e.columnStart?1:0))}(e,t);for(const{generated:e}of n)for(const t of e)r(t)}(e,r,(e=>{const r=i(e);t.has(r)||(t.set(r,e),a.addMapping({source:s.path,original:{line:n.line,column:n.columnStart},generated:{line:e.line,column:e.columnStart},name:n.name}))}))}));for(const e of t.values()){if(e.columnEnd===1/0)continue;const r={line:e.line,columnStart:e.columnEnd},n=i(r);t.has(n)||a.addMapping({generated:{line:r.line,column:r.columnStart}})}}const l=a.toJSON();return"string"==typeof r.sourceRoot&&(l.sourceRoot=r.sourceRoot),l}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.transformFile=void 0,t.transformFileAsync=function(){return Promise.reject(new Error("Transforming files is not supported in browsers"))},t.transformFileSync=function(){throw new Error("Transforming files is not supported in browsers")},t.transformFile=function(e,t,r){"function"==typeof t&&(r=t),r(new Error("Transforming files is not supported in browsers"),null)}},function(e,t,r){"use strict";function n(){const e=r(29);return n=function(){return e},e}Object.defineProperty(t,"__esModule",{value:!0}),t.transformFromAstSync=t.transformFromAstAsync=t.transformFromAst=void 0;var i=r(93),s=r(281);const o=n()((function*(e,t,r){const n=yield*(0,i.default)(r);if(null===n)return null;if(!e)throw new Error("No AST given");return yield*(0,s.run)(n,t,e)}));t.transformFromAst=function(e,t,r,n){if("function"==typeof r&&(n=r,r=void 0),void 0===n)return o.sync(e,t,r);o.errback(e,t,r,n)};const a=o.sync;t.transformFromAstSync=a;const l=o.async;t.transformFromAstAsync=l},function(e,t,r){"use strict";function n(){const e=r(29);return n=function(){return e},e}Object.defineProperty(t,"__esModule",{value:!0}),t.parseSync=t.parseAsync=t.parse=void 0;var i=r(93),s=r(285),o=r(282);const a=n()((function*(e,t){const r=yield*(0,i.default)(t);return null===r?null:yield*(0,s.default)(r.passes,(0,o.default)(r),e)}));t.parse=function(e,t,r){if("function"==typeof t&&(r=t,t=void 0),void 0===r)return a.sync(e,t);a.errback(e,t,r)};const l=a.sync;t.parseSync=l;const c=a.async;t.parseAsync=c},function(e,t,r){"use strict";e.exports="("+function(){const e=Object.getPrototypeOf(Uint8Array);Array.prototype.forEach=function(e,t){if(null==this)throw new TypeError("Array.prototype.forEach called on null or undefined");let r,n;const i=Object(this),s=i.length>>>0;if("function"!=typeof e)throw new TypeError(e+" is not a function");for(arguments.length>1&&(r=t),n=0;n<s;){let t;n in i&&(t=i[n],e.call(r,t,n,i)),n++}},Array.prototype.map=function(e){let t,r;if(null==this)throw new TypeError("this is null or not defined");const n=Object(this),i=n.length>>>0;if("function"!=typeof e)throw new TypeError(e+" is not a function");arguments.length>1&&(t=arguments[1]);const s=new n.constructor(i);for(r=0;r<i;){let i,o;r in n&&(i=n[r],o=e.call(t,i,r,n),s[r]=o),r++}return s},Array.prototype.some=function(e,t){if(null==this)throw new TypeError("Array.prototype.some called on null or undefined");if("function"!=typeof e)throw new TypeError;const r=Object(this),n=r.length>>>0;for(let i=0;i<n;i++)if(i in r&&e.call(t,r[i],i,r))return!0;return!1},Array.prototype.every=function(e,t){let r,n;if(null==this)throw new TypeError("this is null or not defined");const i=Object(this),s=i.length>>>0;if("function"!=typeof e&&"[object Function]"!==Object.prototype.toString.call(e))throw new TypeError;for(arguments.length>1&&(r=t),n=0;n<s;){let t;if(n in i){let s;if(t=i[n],s=r?e.call(r,t,n,i):e(t,n,i),!s)return!1}n++}return!0},Array.prototype.filter=function(e,t){if("function"!=typeof e||!this)throw new TypeError;const r=this.length>>>0,n=new Array(r),i=this;let s,o=0,a=-1;if(void 0===t)for(;++a!==r;)a in this&&(s=i[a],e(i[a],a,i)&&(n[o++]=s));else for(;++a!==r;)a in this&&(s=i[a],e.call(t,i[a],a,i)&&(n[o++]=s));return n.length=o,n},Object.defineProperty(Array.prototype,"find",{value:function(e){if(null==this)throw TypeError('"this" is null or not defined');const t=Object(this),r=t.length>>>0;if("function"!=typeof e)throw TypeError("predicate must be a function");const n=arguments[1];let i=0;for(;i<r;){const r=t[i];if(e.call(n,r,i,t))return r;i++}},configurable:!0,writable:!0}),Object.defineProperty(Array.prototype,"findIndex",{value:function(e){if(null==this)throw new TypeError('"this" is null or not defined');const t=Object(this),r=t.length>>>0;if("function"!=typeof e)throw new TypeError("predicate must be a function");const n=arguments[1];let i=0;for(;i<r;){const r=t[i];if(e.call(n,r,i,t))return i;i++}return-1},configurable:!0,writable:!0}),Array.prototype.reduce=function(e){if(null===this)throw new TypeError("Array.prototype.reduce called on null or undefined");if("function"!=typeof e)throw new TypeError(e+" is not a function");const t=Object(this),r=t.length>>>0;let n,i=0;if(arguments.length>=2)n=arguments[1];else{for(;i<r&&!(i in t);)i++;if(i>=r)throw new TypeError("Reduce of empty array with no initial value");n=t[i++]}for(;i<r;)i in t&&(n=e(n,t[i],i,t)),i++;return n},Array.prototype.reduceRight=function(e){if(null==this)throw new TypeError("Array.prototype.reduce called on null or undefined");if("function"!=typeof e)throw new TypeError(e+" is not a function");const t=Object(this),r=t.length>>>0;let n,i=r-1;if(arguments.length>=2)n=arguments[1];else{for(;i>=0&&!(i in t);)i--;if(i<0)throw new TypeError("Reduce of empty array with no initial value");n=t[i--]}for(;i>=0;i--)i in t&&(n=e(n,t[i],i,t));return n},Map.prototype.forEach=function(e,t){[...this].forEach((([r,n])=>{e.call(t,n,r,this)}))},Set.prototype.forEach=function(e,t){[...this].forEach((r=>{e.call(t,r,r,this)}))};const t=Array.prototype.sort;Array.prototype.sort=function(e){return t.call(this,e?function(...t){return[...function*(){yield e(...t)}()][0]}:void 0)};const r=e.prototype.sort;e.prototype.sort=function(e){return r.call(this,e?function(...t){return[...function*(){yield e(...t)}()][0]}:void 0)},Array.prototype.flatMap=function(...e){return Array.prototype.map.call(this,...e).flat()},e.prototype.reduce=Array.prototype.reduce,e.prototype.reduceRight=Array.prototype.reduceRight,e.prototype.findIndex=Array.prototype.findIndex,e.prototype.find=Array.prototype.find,e.prototype.forEach=Array.prototype.forEach,e.prototype.map=Array.prototype.map,e.prototype.some=Array.prototype.some,e.prototype.every=Array.prototype.every,e.prototype.filter=function(e,t){const r=Array.prototype.filter.call(this,e,t);return new this.constructor(r)};const n=Function.prototype.toString;Function.prototype.toString=function(){const e=n.call(this,arguments),t=e.match(/^[^"]*"<async_rewriter>(?<encoded>[^<]*)<\/>";/);return t?decodeURIComponent(t.groups.encoded):e}}+")();"},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=({types:e})=>({pre(){this.movedStatements=[],this.functionDeclarations=[],this.hasFinishedMoving=!1,this.addedCompletionRecords=!1,this.variables=[]},visitor:{Statement(t){if(!this.hasFinishedMoving){if(t.isDeclaration()&&!t.getFunctionParent())if(t.isVariableDeclaration()){if(t.parentPath.isProgram()||"var"===t.node.kind){const r=[];for(const n of t.node.declarations)if(this.variables.push(n.id.name),n.init){const i=e.assignmentExpression("=",n.id,n.init);r.push(e.variableDeclaration("const",[e.variableDeclarator(t.scope.generateUidIdentifier("v"),i)]))}return void(t.parentPath.isProgram()?(this.movedStatements.push(...r),t.remove()):t.replaceWithMultiple(r))}}else{if(t.isFunctionDeclaration())return this.functionDeclarations.push(t.node),void(t.node.id?t.replaceWith(e.expressionStatement(t.node.id)):t.remove());if(t.isClassDeclaration()&&t.parentPath.isProgram())return this.variables.push(t.node.id.name),this.movedStatements.push(e.expressionStatement(e.assignmentExpression("=",t.node.id,e.classExpression(t.node.id,t.node.superClass,t.node.body)))),void t.replaceWith(e.expressionStatement(t.node.id))}t.parentPath.isProgram()&&this.movedStatements.push(t.node)}},Program:{enter(t){1===t.node.directives.length&&"DirectiveLiteral"===t.node.directives[0].value.type&&0===t.node.body.length&&t.replaceWith(e.program([e.expressionStatement({...t.node.directives[0].value,type:"StringLiteral"})]))},exit(t){this.hasFinishedMoving||(this.hasFinishedMoving=!0,this.completionRecordId=t.scope.generateUidIdentifier("cr"),this.movedStatements.unshift(e.variableDeclaration("var",[e.variableDeclarator(this.completionRecordId)])),t.replaceWith(e.program([...this.variables.map((t=>e.variableDeclaration("var",[e.variableDeclarator(e.identifier(t))]))),...this.functionDeclarations,e.expressionStatement(e.callExpression(e.arrowFunctionExpression([],e.blockStatement(this.movedStatements)),[]))],t.node.directives)))}},BlockStatement:{exit(t){if(!this.hasFinishedMoving)return;if(!t.parentPath.isArrowFunctionExpression())return;if(t.parentPath.getFunctionParent())return;if(this.addedCompletionRecords)return;this.addedCompletionRecords=!0;const r=t.getCompletionRecords();for(const t of r)t.isExpressionWrapper()&&t.replaceWith(e.expressionStatement(e.assignmentExpression("=",this.completionRecordId,t.node.expression)));t.replaceWith(e.blockStatement([...t.node.body,e.returnStatement(this.completionRecordId)]))}}}})},function(e,t,r){"use strict";var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),i=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),s=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&n(t,e,r);return i(t,e),t};Object.defineProperty(t,"__esModule",{value:!0});const o=s(r(34));t.default=({types:e})=>{const t=Symbol("isGeneratedTryCatch"),r=o.template.expression("\n    (!ERR_IDENTIFIER || !ERR_IDENTIFIER[Symbol.for('@@mongosh.uncatchable')])\n  ");return{visitor:{TryStatement(n){var i;if(n.node[t])return;const{block:s,finalizer:o}=n.node;let a,l;const c=n.scope.generateUidIdentifier("err");if(n.node.handler?"Identifier"===(null===(i=n.node.handler.param)||void 0===i?void 0:i.type)?(a=n.node.handler.param,l=n.node.handler):n.node.handler.param?(a=c,l=e.catchClause(a,e.blockStatement([e.variableDeclaration("let",[e.variableDeclarator(n.node.handler.param,a)]),n.node.handler.body]))):(a=c,l=n.node.handler):(a=c,l=e.catchClause(a,e.blockStatement([e.throwStatement(a)]))),o){const i=n.scope.generateUidIdentifier("_isCatchable"),c=n.scope.generateUidIdentifier("_innerExc");n.replaceWithMultiple([e.variableDeclaration("let",[e.variableDeclarator(i,e.booleanLiteral(!0))]),Object.assign(e.tryStatement(s,e.catchClause(a,e.blockStatement([e.expressionStatement(e.assignmentExpression("=",i,r({ERR_IDENTIFIER:a}))),e.ifStatement(i,Object.assign(e.tryStatement(l.body,e.catchClause(c,e.blockStatement([e.expressionStatement(e.assignmentExpression("=",i,r({ERR_IDENTIFIER:c}))),e.throwStatement(c)]))),{[t]:!0}),e.throwStatement(a))])),e.blockStatement([e.ifStatement(i,o)])),{[t]:!0})])}else n.replaceWith(Object.assign(e.tryStatement(s,e.catchClause(a,e.blockStatement([e.ifStatement(r({ERR_IDENTIFIER:a}),l.body,e.throwStatement(a))]))),{[t]:!0}))}}}}},function(e,t,r){"use strict";var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),i=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),s=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&n(t,e,r);return i(t,e),t};Object.defineProperty(t,"__esModule",{value:!0});const o=s(r(34));t.default=({types:e})=>{const t=Symbol("isGeneratedInnerFunction"),r=Symbol("isGeneratedHelper"),n=Symbol("isOriginalBody"),i=Symbol("isAlwaysSyncFunction"),s=Symbol("isExpandedTypeof"),a="@@mongosh.identifierGroup",l=o.template.statement('\n    const SP_IDENTIFIER = Symbol.for("@@mongosh.syntheticPromise");\n  '),c=o.template.statement("\n    function MSP_IDENTIFIER(p) {\n      return Object.defineProperty(p, SP_IDENTIFIER, {\n        value: true\n      });\n    }\n  "),u=o.template.statement("\n    function ISP_IDENTIFIER(p) {\n      return p && p[SP_IDENTIFIER];\n    }\n  "),h=o.template.statement("\n    function ANSP_IDENTIFIER(p, s) {\n      if (p && p[SP_IDENTIFIER]) {\n        throw new CUSTOM_ERROR_BUILDER(\n          'Result of expression \"' + s + '\" cannot be used in this context',\n          'SyntheticPromiseInAlwaysSyncContext');\n      }\n      return p;\n    }\n  "),p=o.template.expression('\n    async () => {\n      try {\n        ORIGINAL_CODE;\n      } catch (err) {\n        if (FUNCTION_STATE_IDENTIFIER === "sync") {\n          SYNC_RETURN_VALUE_IDENTIFIER = err;\n          FUNCTION_STATE_IDENTIFIER = "threw";\n        } else throw err;\n      } finally {\n        if (FUNCTION_STATE_IDENTIFIER !== "threw") FUNCTION_STATE_IDENTIFIER = "returned";\n      }\n    }\n  '),d=o.template.statement("\n    let EXPRESSION_HOLDER_IDENTIFIER;"),f=o.template.statements('\n    let FUNCTION_STATE_IDENTIFIER = "sync",\n        SYNC_RETURN_VALUE_IDENTIFIER;\n\n    const ASYNC_RETURN_VALUE_IDENTIFIER = (ASYNC_TRY_CATCH_WRAPPER)();\n\n    if (FUNCTION_STATE_IDENTIFIER === "returned")\n      return SYNC_RETURN_VALUE_IDENTIFIER;\n    else if (FUNCTION_STATE_IDENTIFIER === "threw")\n      throw SYNC_RETURN_VALUE_IDENTIFIER;\n    FUNCTION_STATE_IDENTIFIER = "async";\n    return MSP_IDENTIFIER(ASYNC_RETURN_VALUE_IDENTIFIER);\n  '),m=o.template.expression("(\n    ORIGINAL_SOURCE,\n    EXPRESSION_HOLDER = NODE,\n    ISP_IDENTIFIER(EXPRESSION_HOLDER) ? await EXPRESSION_HOLDER : EXPRESSION_HOLDER\n  )",{allowAwaitOutsideFunction:!0}),g=o.template.expression("\n    ANSP_IDENTIFIER(NODE, ORIGINAL_SOURCE)\n  "),y=o.template.statement("\n    try {\n      ORIGINAL_CODE;\n    } catch (err) {\n      throw err;\n    }\n  "),b=o.template.statement(String.raw`
    function DE_IDENTIFIER(err) {
      if (Object.prototype.toString.call(err) === '[object Error]' &&
          err.message.includes('\ufeff')) {
        err.message = err.message.replace(/\(\s*"\ufeff(.+?)\ufeff"\s*,(?:[^\(]|\([^\)]*\))*\)/g, '$1');
      }
      return err;
    }
  `,{placeholderPattern:!1,placeholderWhitelist:new Set(["DE_IDENTIFIER"])}),v=o.template.expression("(\n    SYNC_RETURN_VALUE_IDENTIFIER = NODE,\n    FUNCTION_STATE_IDENTIFIER === 'async' ? SYNC_RETURN_VALUE_IDENTIFIER : null\n  )");return{pre(e){this.file=e},visitor:{BlockStatement(s){var o,m,g,v,w,x,S,E,T,_;if(!s.parentPath.isFunction())return;if(s.parentPath.getData(a))return;if(s.parentPath.node[t])return;if(s.parentPath.node[r])return;const A=void 0!==s.parent.start?this.file.code.slice(null!==(o=s.parent.start)&&void 0!==o?o:void 0,null!==(m=s.parent.end)&&void 0!==m?m:void 0):"function () { [unknown code] }",P=encodeURIComponent(A),C=e.expressionStatement(e.stringLiteral(`<async_rewriter>${P}</>`)),M=null===(g=s.findParent((e=>!!e.getData(a))))||void 0===g?void 0:g.getData(a),k=s.scope.generateUidIdentifier("fs"),I=s.scope.generateUidIdentifier("srv"),O=s.scope.generateUidIdentifier("arv"),N=null!==(v=null==M?void 0:M.expressionHolder)&&void 0!==v?v:s.scope.generateUidIdentifier("ex"),R=null!==(w=null==M?void 0:M.markSyntheticPromise)&&void 0!==w?w:s.scope.generateUidIdentifier("msp"),L=null!==(x=null==M?void 0:M.isSyntheticPromise)&&void 0!==x?x:s.scope.generateUidIdentifier("isp"),D=null!==(S=null==M?void 0:M.assertNotSyntheticPromise)&&void 0!==S?S:s.scope.generateUidIdentifier("ansp"),B=null!==(E=null==M?void 0:M.syntheticPromiseSymbol)&&void 0!==E?E:s.scope.generateUidIdentifier("sp"),j=null!==(T=null==M?void 0:M.demangleError)&&void 0!==T?T:s.scope.generateUidIdentifier("de"),F={functionState:k,synchronousReturnValue:I,asynchronousReturnValue:O,expressionHolder:N,markSyntheticPromise:R,isSyntheticPromise:L,assertNotSyntheticPromise:D,syntheticPromiseSymbol:B,demangleError:j};s.parentPath.setData(a,F);const $=M?[]:[Object.assign(l({SP_IDENTIFIER:B}),{[r]:!0}),Object.assign(d({EXPRESSION_HOLDER_IDENTIFIER:N}),{[r]:!0})],U=M?[]:[...$,Object.assign(c({MSP_IDENTIFIER:R,SP_IDENTIFIER:B}),{[r]:!0}),Object.assign(u({ISP_IDENTIFIER:L,SP_IDENTIFIER:B}),{[r]:!0}),Object.assign(b({DE_IDENTIFIER:j}),{[r]:!0})],V=[...$,Object.assign(h({ANSP_IDENTIFIER:D,SP_IDENTIFIER:B,CUSTOM_ERROR_BUILDER:null!==(_=this.opts.customErrorBuilder)&&void 0!==_?_:e.identifier("Error")}),{[r]:!0})];if(s.parentPath.node.async)return void s.replaceWith(e.blockStatement([C,...U,y({ORIGINAL_CODE:s.node.body})]));if(s.parentPath.node.generator||s.parentPath.isClassMethod()&&"Identifier"===s.parentPath.node.key.type&&"constructor"===s.parentPath.node.key.name)return Object.assign(s.parentPath.node,{[i]:!0}),void s.replaceWith(e.blockStatement([C,...V,y({ORIGINAL_CODE:s.node.body})]));const z=Object.assign(p({FUNCTION_STATE_IDENTIFIER:k,SYNC_RETURN_VALUE_IDENTIFIER:I,ORIGINAL_CODE:Object.assign(s.node,{[n]:!0})}),{[t]:!0}),W=f({FUNCTION_STATE_IDENTIFIER:k,SYNC_RETURN_VALUE_IDENTIFIER:I,ASYNC_RETURN_VALUE_IDENTIFIER:O,MSP_IDENTIFIER:R,ASYNC_TRY_CATCH_WRAPPER:z});s.replaceWith(e.blockStatement([C,...U,...W]))},UnaryExpression:{enter(t){"typeof"!==t.node.operator||"Identifier"!==t.node.argument.type||t.node[s]||t.replaceWith(e.conditionalExpression(e.binaryExpression("===",{...t.node,[r]:!0,[s]:!0},e.stringLiteral("undefined")),e.stringLiteral("undefined"),{...t.node,[s]:!0}))}},Expression:{enter(t){var n,i;if(t.parentPath.isArrowFunctionExpression()&&"body"===t.key&&t.replaceWith(e.blockStatement([e.returnStatement(t.node)])),null===(i=null===(n=t.find((e=>e.isFunction()||!!e.node[r])))||void 0===n?void 0:n.node)||void 0===i?void 0:i[r])return t.skip()},exit(s){var o,l,c,u,h,p;const d=s.getFunctionParent();if(!d)return;if(!d.node.async&&!d.node[i])return;let f;if(d.node[t]){if(!(null===(l=null===(o=s.findParent((e=>e.isFunction()||!!e.node[n])))||void 0===o?void 0:o.node)||void 0===l?void 0:l[n]))return;if(f=null===(u=null===(c=d.getFunctionParent())||void 0===c?void 0:c.getData)||void 0===u?void 0:u.call(c,a),!f)throw new Error("Parent of generated inner function does not have existing identifiers available");if(s.parentPath.isReturnStatement()&&!s.node[r])return void s.replaceWith(Object.assign(v({SYNC_RETURN_VALUE_IDENTIFIER:f.synchronousReturnValue,FUNCTION_STATE_IDENTIFIER:f.functionState,NODE:s.node}),{[r]:!0}))}else f=d.getData(a);if(s.parentPath.isCallExpression()&&"callee"===s.key&&(s.isMemberExpression()||s.isImport()||s.isIdentifier()&&"eval"===s.node.name))return;if(s.parentPath.isAssignmentExpression()&&"left"===s.key)return;if(s.parentPath.isForXStatement()&&"left"===s.key)return;if(s.parentPath.isUpdateExpression())return;if(s.parentPath.isUnaryExpression()&&"delete"===s.parentPath.node.operator)return;if(s.isLiteral()||s.isArrayExpression()||s.isObjectExpression()||s.isFunctionExpression()||s.isArrowFunctionExpression()||s.isClassExpression()||s.isAssignmentExpression()||s.isBinaryExpression()||s.isConditionalExpression()||s.isLogicalExpression()||s.isSequenceExpression()||s.isParenthesizedExpression()||s.isUnaryExpression()||s.isSuper()||s.isThisExpression()||s.isAwaitExpression()||s.parentPath.isAwaitExpression())return;if(s.isIdentifier()&&s.scope.hasBinding(s.node.name))return;const{expressionHolder:y,isSyntheticPromise:b,assertNotSyntheticPromise:w}=f,x=(S=void 0!==s.node.start?this.file.code.slice(null!==(h=s.node.start)&&void 0!==h?h:void 0,null!==(p=s.node.end)&&void 0!==p?p:void 0):"<unknown>").length<=24?S:S.slice(0,.7*19)+" ... "+S.slice(S.length-5.7);var S;if(!d.node.async)return void s.replaceWith(Object.assign(g({ORIGINAL_SOURCE:e.stringLiteral(x),NODE:s.node,ANSP_IDENTIFIER:w}),{[r]:!0}));const E=e.stringLiteral("\ufeff"+x+"\ufeff");s.replaceWith(Object.assign(m({ORIGINAL_SOURCE:E,EXPRESSION_HOLDER:y,ISP_IDENTIFIER:b,NODE:s.node}),{[r]:!0})),s.skip()}},CatchClause:{exit(t){var n;if(t.node[r]||!t.node.param||"Identifier"!==t.node.param.type)return;const i=null===(n=t.findParent((e=>!!e.getData(a))))||void 0===n?void 0:n.getData(a);i&&t.replaceWith(Object.assign(e.catchClause(t.node.param,e.blockStatement([e.expressionStatement(e.assignmentExpression("=",t.node.param,e.callExpression(i.demangleError,[t.node.param]))),t.node.body])),{[r]:!0}))}}}}}},function(e,t,r){"use strict";var n;Object.defineProperty(t,"__esModule",{value:!0}),t.AsyncRewriterErrors=void 0,function(e){e.SyntheticPromiseInAlwaysSyncContext="ASYNC-10012"}(n||(n={})),t.AsyncRewriterErrors=n},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(153),i=r(34),s=(0,n.declare)((e=>(e.assertVersion(7),{name:"transform-shorthand-properties",visitor:{ObjectMethod(e){const{node:t}=e;if("method"===t.kind){const r=i.types.functionExpression(null,t.params,t.body,t.generator,t.async);r.returnType=t.returnType;const n=i.types.toComputedKey(t);i.types.isStringLiteral(n,{value:"__proto__"})?e.replaceWith(i.types.objectProperty(n,r,!0)):e.replaceWith(i.types.objectProperty(t.key,r,t.computed))}},ObjectProperty(e){const{node:t}=e;if(t.shorthand){const r=i.types.toComputedKey(t);i.types.isStringLiteral(r,{value:"__proto__"})?e.replaceWith(i.types.objectProperty(r,t.value,!0)):t.shorthand=!1}}}})));t.default=s},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"convertFunctionParams",{enumerable:!0,get:function(){return i.default}}),t.default=void 0;var n=r(153),i=r(719),s=r(720),o=(0,n.declare)(((e,t)=>{var r;e.assertVersion(7);const n=null!=(r=e.assumption("ignoreFunctionLength"))?r:t.loose,o=e.assumption("noNewArrows");return{name:"transform-parameters",visitor:{Function(e){if(e.isArrowFunctionExpression()&&e.get("params").some((e=>e.isRestElement()||e.isAssignmentPattern()))&&(e.arrowFunctionToExpression({noNewArrows:o}),!e.isFunctionExpression()))return;const t=(0,s.default)(e),r=(0,i.default)(e,n);(t||r)&&e.scope.crawl()}}}}));t.default=o},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,r,c){const u=e.get("params");if(u.every((e=>e.isIdentifier())))return!1;const{node:h,scope:p}=e,d={stop:!1,needsOuterBinding:!1,scope:p},f=[],m=new Set;for(const e of u)for(const t of Object.keys(e.getBindingIdentifiers())){var g;const e=null==(g=p.bindings[t])?void 0:g.constantViolations;if(e)for(const r of e){const e=r.node;switch(e.type){case"VariableDeclarator":if(null===e.init){const e=r.parentPath;if(!e.parentPath.isFor()||e.parentPath.get("body")===e){r.remove();break}}m.add(t);break;case"FunctionDeclaration":m.add(t)}}}if(0===m.size)for(const e of u)if(e.isIdentifier()||e.traverse(l,d),d.needsOuterBinding)break;let y=null;for(let l=0;l<u.length;l++){const d=u[l];if(r&&!r(l))continue;const m=[];c&&c(d.parentPath,d,m);const g=d.isAssignmentPattern();if(g&&(t||"set"===h.kind)){const e=d.get("left"),t=d.get("right"),r=p.buildUndefinedNode();if(e.isIdentifier())f.push(s({ASSIGNMENT_IDENTIFIER:n.types.cloneNode(e.node),DEFAULT_VALUE:t.node,UNDEFINED:r})),d.replaceWith(e.node);else if(e.isObjectPattern()||e.isArrayPattern()){const i=p.generateUidIdentifier();f.push(o({ASSIGNMENT_IDENTIFIER:e.node,DEFAULT_VALUE:t.node,PARAMETER_NAME:n.types.cloneNode(i),UNDEFINED:r})),d.replaceWith(i)}}else if(g){null===y&&(y=l);const e=d.get("left"),t=d.get("right"),r=i({VARIABLE_NAME:e.node,DEFAULT_VALUE:t.node,ARGUMENT_KEY:n.types.numericLiteral(l)});f.push(r)}else if(null!==y){const e=a([d.node,n.types.numericLiteral(l)]);f.push(e)}else if(d.isObjectPattern()||d.isArrayPattern()){const t=e.scope.generateUidIdentifier("ref"),r=n.types.variableDeclaration("let",[n.types.variableDeclarator(d.node,t)]);f.push(r),d.replaceWith(n.types.cloneNode(t))}if(m)for(const e of m)f.push(e)}if(null!==y&&(h.params=h.params.slice(0,y)),e.ensureBlock(),d.needsOuterBinding||m.size>0){f.push(function(e,t){const r=[],i=[];for(const t of e)r.push(n.types.identifier(t)),i.push(n.types.identifier(t));return n.types.returnStatement(n.types.callExpression(n.types.arrowFunctionExpression(i,t),r))}(m,e.get("body").node)),e.set("body",n.types.blockStatement(f));const t=e.get("body.body"),r=t[t.length-1].get("argument.callee");r.arrowFunctionToExpression(),r.node.generator=e.node.generator,r.node.async=e.node.async,e.node.generator=!1}else e.get("body").unshiftContainer("body",f);return!0};var n=r(34);const i=(0,n.template)("\n  let VARIABLE_NAME =\n    arguments.length > ARGUMENT_KEY && arguments[ARGUMENT_KEY] !== undefined ?\n      arguments[ARGUMENT_KEY]\n    :\n      DEFAULT_VALUE;\n"),s=(0,n.template)("\n  if (ASSIGNMENT_IDENTIFIER === UNDEFINED) {\n    ASSIGNMENT_IDENTIFIER = DEFAULT_VALUE;\n  }\n"),o=(0,n.template)("\n  let ASSIGNMENT_IDENTIFIER = PARAMETER_NAME === UNDEFINED ? DEFAULT_VALUE : PARAMETER_NAME ;\n"),a=(0,n.template)("\n  let $0 = arguments.length > $1 ? arguments[$1] : undefined;\n"),l={"ReferencedIdentifier|BindingIdentifier"(e,t){const{scope:r,node:n}=e,{name:i}=n;("eval"===i||r.getBinding(i)===t.scope.parent.getBinding(i)&&t.scope.hasOwnBinding(i))&&(t.needsOuterBinding=!0,e.stop())},"TypeAnnotation|TSTypeAnnotation|TypeParameterDeclaration|TSTypeParameterDeclaration":e=>e.skip()}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){const{node:t,scope:r}=e;if(!function(e){const t=e.params.length;return t>0&&n.types.isRestElement(e.params[t-1])}(t))return!1;let s=t.params.pop().argument;"arguments"===s.name&&r.rename(s.name);const o=n.types.identifier("arguments");if(n.types.isPattern(s)){const e=s;s=r.generateUidIdentifier("ref");const i=n.types.variableDeclaration("let",[n.types.variableDeclarator(e,s)]);t.body.body.unshift(i)}const a=function(e){let t=e.params.length;return t>0&&n.types.isIdentifier(e.params[0],{name:"this"})&&(t-=1),t}(t),l={references:[],offset:a,argumentsNode:o,outerBinding:r.getBindingIdentifier(s.name),candidates:[],name:s.name,deopted:!1};if(e.traverse(c,l),!l.deopted&&!l.references.length){for(const{path:e,cause:t}of l.candidates){const r=n.types.cloneNode(o);switch(t){case"indexGetter":u(e,r,l.offset);break;case"lengthGetter":h(e,r,l.offset);break;default:e.replaceWith(r)}}return!0}l.references.push(...l.candidates.map((({path:e})=>e)));const p=n.types.numericLiteral(a),d=r.generateUidIdentifier("key"),f=r.generateUidIdentifier("len");let m,g;a?(m=n.types.binaryExpression("-",n.types.cloneNode(d),n.types.cloneNode(p)),g=n.types.conditionalExpression(n.types.binaryExpression(">",n.types.cloneNode(f),n.types.cloneNode(p)),n.types.binaryExpression("-",n.types.cloneNode(f),n.types.cloneNode(p)),n.types.numericLiteral(0))):(m=n.types.identifier(d.name),g=n.types.identifier(f.name));const y=i({ARGUMENTS:o,ARRAY_KEY:m,ARRAY_LEN:g,START:p,ARRAY:s,KEY:d,LEN:f});if(l.deopted)t.body.body.unshift(y);else{let t=e.getEarliestCommonAncestorFrom(l.references).getStatementParent();t.findParent((e=>{if(!e.isLoop())return e.isFunction();t=e})),t.insertBefore(y)}return!0};var n=r(34);const i=(0,n.template)("\n  for (var LEN = ARGUMENTS.length,\n           ARRAY = new Array(ARRAY_LEN),\n           KEY = START;\n       KEY < LEN;\n       KEY++) {\n    ARRAY[ARRAY_KEY] = ARGUMENTS[KEY];\n  }\n"),s=(0,n.template)("\n  (INDEX < OFFSET || ARGUMENTS.length <= INDEX) ? undefined : ARGUMENTS[INDEX]\n"),o=(0,n.template)("\n  REF = INDEX, (REF < OFFSET || ARGUMENTS.length <= REF) ? undefined : ARGUMENTS[REF]\n"),a=(0,n.template)("\n  ARGUMENTS.length <= OFFSET ? 0 : ARGUMENTS.length - OFFSET\n");function l(e,t){return e.node.name===t.name&&e.scope.bindingIdentifierEquals(t.name,t.outerBinding)}const c={Scope(e,t){e.scope.bindingIdentifierEquals(t.name,t.outerBinding)||e.skip()},Flow(e){e.isTypeCastExpression()||e.skip()},Function(e,t){const r=t.noOptimise;t.noOptimise=!0,e.traverse(c,t),t.noOptimise=r,e.skip()},ReferencedIdentifier(e,t){const{node:r}=e;if("arguments"===r.name&&(t.deopted=!0),l(e,t))if(t.noOptimise)t.deopted=!0;else{const{parentPath:n}=e;if("params"===n.listKey&&n.key<t.offset)return;if(n.isMemberExpression({object:r})){const r=n.parentPath;if(!t.deopted&&!(r.isAssignmentExpression()&&n.node===r.node.left||r.isLVal()||r.isForXStatement()||r.isUpdateExpression()||r.isUnaryExpression({operator:"delete"})||(r.isCallExpression()||r.isNewExpression())&&n.node===r.node.callee))if(n.node.computed){if(n.get("property").isBaseType("number"))return void t.candidates.push({cause:"indexGetter",path:e})}else if("length"===n.node.property.name)return void t.candidates.push({cause:"lengthGetter",path:e})}if(0===t.offset&&n.isSpreadElement()){const r=n.parentPath;if(r.isCallExpression()&&1===r.node.arguments.length)return void t.candidates.push({cause:"argSpread",path:e})}t.references.push(e)}},BindingIdentifier(e,t){l(e,t)&&(t.deopted=!0)}};function u(e,t,r){const i=n.types.numericLiteral(r);let a;a=n.types.isNumericLiteral(e.parent.property)?n.types.numericLiteral(e.parent.property.value+r):0===r?e.parent.property:n.types.binaryExpression("+",e.parent.property,n.types.cloneNode(i));const{scope:l}=e;if(l.isPure(a)){const r=e.parentPath;r.replaceWith(s({ARGUMENTS:t,OFFSET:i,INDEX:a}));const n=r.get("test").get("left").evaluate();n.confident&&(!0===n.value?r.replaceWith(r.scope.buildUndefinedNode()):r.get("test").replaceWith(r.get("test").get("right")))}else{const r=l.generateUidIdentifierBasedOnNode(a);l.push({id:r,kind:"var"}),e.parentPath.replaceWith(o({ARGUMENTS:t,OFFSET:i,INDEX:a,REF:n.types.cloneNode(r)}))}}function h(e,t,r){r?e.parentPath.replaceWith(a({ARGUMENTS:t,OFFSET:n.types.numericLiteral(r)})):e.replaceWith(t)}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(153),i=r(34),s=(0,n.declare)(((e,t)=>{var r,n,s;e.assertVersion(7);const{useBuiltIns:o=!1}=t,a=null!=(r=e.assumption("iterableIsArray"))?r:t.loose,l=null!=(n=t.allowArrayLike)?n:e.assumption("arrayLikeIsIterable"),c=null!=(s=e.assumption("objectRestNoSymbols"))?s:t.loose;function u(e){for(const t of e.declarations)if(i.types.isPattern(t.id))return!0;return!1}function h(e){for(const t of e.elements)if(i.types.isRestElement(t))return!0;return!1}const p={},d=(e,t,r)=>{if(t.length&&i.types.isIdentifier(e)&&i.types.isReferenced(e,t[t.length-1])&&r.bindings[e.name])throw r.deopt=!0,p};class f{constructor(e){this.blockHoist=void 0,this.operator=void 0,this.arrays=void 0,this.nodes=void 0,this.scope=void 0,this.kind=void 0,this.iterableIsArray=void 0,this.arrayLikeIsIterable=void 0,this.addHelper=void 0,this.blockHoist=e.blockHoist,this.operator=e.operator,this.arrays={},this.nodes=e.nodes||[],this.scope=e.scope,this.kind=e.kind,this.iterableIsArray=e.iterableIsArray,this.arrayLikeIsIterable=e.arrayLikeIsIterable,this.addHelper=e.addHelper}buildVariableAssignment(e,t){let r,n=this.operator;return i.types.isMemberExpression(e)&&(n="="),r=n?i.types.expressionStatement(i.types.assignmentExpression(n,e,i.types.cloneNode(t)||this.scope.buildUndefinedNode())):i.types.variableDeclaration(this.kind,[i.types.variableDeclarator(e,i.types.cloneNode(t))]),r._blockHoist=this.blockHoist,r}buildVariableDeclaration(e,t){const r=i.types.variableDeclaration("var",[i.types.variableDeclarator(i.types.cloneNode(e),i.types.cloneNode(t))]);return r._blockHoist=this.blockHoist,r}push(e,t){const r=i.types.cloneNode(t);i.types.isObjectPattern(e)?this.pushObjectPattern(e,r):i.types.isArrayPattern(e)?this.pushArrayPattern(e,r):i.types.isAssignmentPattern(e)?this.pushAssignmentPattern(e,r):this.nodes.push(this.buildVariableAssignment(e,r))}toArray(e,t){return this.iterableIsArray||i.types.isIdentifier(e)&&this.arrays[e.name]?e:this.scope.toArray(e,t,this.arrayLikeIsIterable)}pushAssignmentPattern({left:e,right:t},r){const n=this.scope.generateUidIdentifierBasedOnNode(r);this.nodes.push(this.buildVariableDeclaration(n,r));const s=i.types.conditionalExpression(i.types.binaryExpression("===",i.types.cloneNode(n),this.scope.buildUndefinedNode()),t,i.types.cloneNode(n));if(i.types.isPattern(e)){let t,r;"const"===this.kind||"let"===this.kind?(t=this.scope.generateUidIdentifier(n.name),r=this.buildVariableDeclaration(t,s)):(t=n,r=i.types.expressionStatement(i.types.assignmentExpression("=",i.types.cloneNode(n),s))),this.nodes.push(r),this.push(e,t)}else this.nodes.push(this.buildVariableAssignment(e,s))}pushObjectRest(e,t,r,n){const s=[];let a,l=!0,u=!1;for(let t=0;t<e.properties.length;t++){const r=e.properties[t];if(t>=n)break;if(i.types.isRestElement(r))continue;const o=r.key;i.types.isIdentifier(o)&&!r.computed?s.push(i.types.stringLiteral(o.name)):i.types.isTemplateLiteral(o)?(s.push(i.types.cloneNode(o)),u=!0):i.types.isLiteral(o)?s.push(i.types.stringLiteral(String(o.value))):(s.push(i.types.cloneNode(o)),l=!1)}if(0===s.length)a=i.types.callExpression(o?i.types.memberExpression(i.types.identifier("Object"),i.types.identifier("assign")):this.addHelper("extends"),[i.types.objectExpression([]),i.types.cloneNode(t)]);else{let e=i.types.arrayExpression(s);if(l){if(!u&&!i.types.isProgram(this.scope.block)){const t=this.scope.path.findParent((e=>e.isProgram())),r=this.scope.generateUidIdentifier("excluded");t.scope.push({id:r,init:e,kind:"const"}),e=i.types.cloneNode(r)}}else e=i.types.callExpression(i.types.memberExpression(e,i.types.identifier("map")),[this.addHelper("toPropertyKey")]);a=i.types.callExpression(this.addHelper("objectWithoutProperties"+(c?"Loose":"")),[i.types.cloneNode(t),e])}this.nodes.push(this.buildVariableAssignment(r.argument,a))}pushObjectProperty(e,t){i.types.isLiteral(e.key)&&(e.computed=!0);const r=e.value,n=i.types.memberExpression(i.types.cloneNode(t),e.key,e.computed);i.types.isPattern(r)?this.push(r,n):this.nodes.push(this.buildVariableAssignment(r,n))}pushObjectPattern(e,t){if(e.properties.length||this.nodes.push(i.types.expressionStatement(i.types.callExpression(this.addHelper("objectDestructuringEmpty"),[t]))),e.properties.length>1&&!this.scope.isStatic(t)){const e=this.scope.generateUidIdentifierBasedOnNode(t);this.nodes.push(this.buildVariableDeclaration(e,t)),t=e}if(function(e){for(const t of e.properties)if(i.types.isRestElement(t))return!0;return!1}(e)){let t;for(let r=0;r<e.properties.length;r++){const n=e.properties[r];if(i.types.isRestElement(n))break;const s=n.key;if(n.computed&&!this.scope.isPure(s)){const n=this.scope.generateUidIdentifierBasedOnNode(s);this.nodes.push(this.buildVariableDeclaration(n,s)),t||(t=e=Object.assign({},e,{properties:e.properties.slice()})),t.properties[r]=Object.assign({},t.properties[r],{key:n})}}}for(let r=0;r<e.properties.length;r++){const n=e.properties[r];i.types.isRestElement(n)?this.pushObjectRest(e,t,n,r):this.pushObjectProperty(n,t)}}canUnpackArrayPattern(e,t){if(!i.types.isArrayExpression(t))return!1;if(e.elements.length>t.elements.length)return;if(e.elements.length<t.elements.length&&!h(e))return!1;for(const t of e.elements){if(!t)return!1;if(i.types.isMemberExpression(t))return!1}for(const e of t.elements){if(i.types.isSpreadElement(e))return!1;if(i.types.isCallExpression(e))return!1;if(i.types.isMemberExpression(e))return!1}const r={deopt:!1,bindings:i.types.getBindingIdentifiers(e)};try{i.types.traverse(t,d,r)}catch(e){if(e!==p)throw e}return!r.deopt}pushUnpackedArrayPattern(e,t){for(let r=0;r<e.elements.length;r++){const n=e.elements[r];i.types.isRestElement(n)?this.push(n.argument,i.types.arrayExpression(t.elements.slice(r))):this.push(n,t.elements[r])}}pushArrayPattern(e,t){if(!e.elements)return;if(this.canUnpackArrayPattern(e,t))return this.pushUnpackedArrayPattern(e,t);const r=!h(e)&&e.elements.length,n=this.toArray(t,r);i.types.isIdentifier(n)?t=n:(t=this.scope.generateUidIdentifierBasedOnNode(t),this.arrays[t.name]=!0,this.nodes.push(this.buildVariableDeclaration(t,n)));for(let r=0;r<e.elements.length;r++){let n,s=e.elements[r];s&&(i.types.isRestElement(s)?(n=this.toArray(t),n=i.types.callExpression(i.types.memberExpression(n,i.types.identifier("slice")),[i.types.numericLiteral(r)]),s=s.argument):n=i.types.memberExpression(t,i.types.numericLiteral(r),!0),this.push(s,n))}}init(e,t){if(!i.types.isArrayExpression(t)&&!i.types.isMemberExpression(t)){const e=this.scope.maybeGenerateMemoised(t,!0);e&&(this.nodes.push(this.buildVariableDeclaration(e,i.types.cloneNode(t))),t=e)}return this.push(e,t),this.nodes}}return{name:"transform-destructuring",visitor:{ExportNamedDeclaration(e){const t=e.get("declaration");if(!t.isVariableDeclaration())return;if(!u(t.node))return;const r=[];for(const t of Object.keys(e.getOuterBindingIdentifiers(e)))r.push(i.types.exportSpecifier(i.types.identifier(t),i.types.identifier(t)));e.replaceWith(t.node),e.insertAfter(i.types.exportNamedDeclaration(null,r))},ForXStatement(e){const{node:t,scope:r}=e,n=t.left;if(i.types.isPattern(n)){const s=r.generateUidIdentifier("ref");return t.left=i.types.variableDeclaration("var",[i.types.variableDeclarator(s)]),e.ensureBlock(),0===t.body.body.length&&e.isCompletionRecord()&&t.body.body.unshift(i.types.expressionStatement(r.buildUndefinedNode())),void t.body.body.unshift(i.types.expressionStatement(i.types.assignmentExpression("=",n,s)))}if(!i.types.isVariableDeclaration(n))return;const s=n.declarations[0].id;if(!i.types.isPattern(s))return;const o=r.generateUidIdentifier("ref");t.left=i.types.variableDeclaration(n.kind,[i.types.variableDeclarator(o,null)]);const c=[];new f({kind:n.kind,scope:r,nodes:c,iterableIsArray:a,arrayLikeIsIterable:l,addHelper:e=>this.addHelper(e)}).init(s,o),e.ensureBlock();const u=t.body;u.body=c.concat(u.body)},CatchClause({node:e,scope:t}){const r=e.param;if(!i.types.isPattern(r))return;const n=t.generateUidIdentifier("ref");e.param=n;const s=[];new f({kind:"let",scope:t,nodes:s,iterableIsArray:a,arrayLikeIsIterable:l,addHelper:e=>this.addHelper(e)}).init(r,n),e.body.body=s.concat(e.body.body)},AssignmentExpression(e){const{node:t,scope:r}=e;if(!i.types.isPattern(t.left))return;const n=[],s=new f({operator:t.operator,scope:r,nodes:n,iterableIsArray:a,arrayLikeIsIterable:l,addHelper:e=>this.addHelper(e)});let o;!e.isCompletionRecord()&&e.parentPath.isExpressionStatement()||(o=r.generateUidIdentifierBasedOnNode(t.right,"ref"),n.push(i.types.variableDeclaration("var",[i.types.variableDeclarator(o,t.right)])),i.types.isArrayExpression(t.right)&&(s.arrays[o.name]=!0)),s.init(t.left,o||t.right),o&&(e.parentPath.isArrowFunctionExpression()?(e.replaceWith(i.types.blockStatement([])),n.push(i.types.returnStatement(i.types.cloneNode(o)))):n.push(i.types.expressionStatement(i.types.cloneNode(o)))),e.replaceWithMultiple(n),e.scope.crawl()},VariableDeclaration(e){const{node:t,scope:r,parent:n}=e;if(i.types.isForXStatement(n))return;if(!n||!e.container)return;if(!u(t))return;const s=t.kind,o=t.loc,c=[];let h;for(let e=0;e<t.declarations.length;e++){h=t.declarations[e];const n=h.init,s=h.id,o=new f({blockHoist:t._blockHoist,nodes:c,scope:r,kind:t.kind,iterableIsArray:a,arrayLikeIsIterable:l,addHelper:e=>this.addHelper(e)});i.types.isPattern(s)?(o.init(s,n),+e!=t.declarations.length-1&&i.types.inherits(c[c.length-1],h)):c.push(i.types.inherits(o.buildVariableAssignment(h.id,i.types.cloneNode(h.init)),h))}let p=null;const d=[];for(const e of c)null!==p&&i.types.isVariableDeclaration(e)?p.declarations.push(...e.declarations):(e.kind=s,e.loc||(e.loc=o),d.push(e),p=i.types.isVariableDeclaration(e)?e:null);for(const e of d)if(e.declarations)for(const t of e.declarations){const{name:n}=t.id;r.bindings[n]&&(r.bindings[n].kind=e.kind)}1===d.length?e.replaceWith(d[0]):e.replaceWithMultiple(d)}}}}));t.default=s}])},82784:e=>{function t(e){return{aliases:["gql"],keywords:{keyword:"query mutation subscription|10 input schema implements type interface union scalar fragment|10 enum on ...",literal:"ID ID! String Float Int Boolean",variable:"true false null"},contains:[e.HASH_COMMENT_MODE,e.QUOTE_STRING_MODE,e.NUMBER_MODE,{className:"literal",begin:"[^\\w][A-Z][a-z]",end:"\\W",excludeEnd:!0},{className:"literal",begin:":\\s\\[",end:"[\\]!]{1,3}",excludeBegin:!0,excludeEnd:!0},{className:"type",begin:"[^\\w](?!ID)[A-Z][A-Z]",end:"\\W",excludeEnd:!0},{className:"name",begin:"\\$",end:"\\W",excludeEnd:!0},{className:"meta",begin:"@",end:"\\W",excludeEnd:!0}],illegal:/([;<']|BEGIN)/}}e.exports=function(e){e.registerLanguage("graphql",t)},e.exports.definer=t},2947:e=>{var t={exports:{}};function r(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach((function(t){var n=e[t];"object"!=typeof n||Object.isFrozen(n)||r(n)})),e}t.exports=r,t.exports.default=r;var n=t.exports;class i{constructor(e){void 0===e.data&&(e.data={}),this.data=e.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function s(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function o(e,...t){const r=Object.create(null);for(const t in e)r[t]=e[t];return t.forEach((function(e){for(const t in e)r[t]=e[t]})),r}const a=e=>!!e.kind;class l{constructor(e,t){this.buffer="",this.classPrefix=t.classPrefix,e.walk(this)}addText(e){this.buffer+=s(e)}openNode(e){if(!a(e))return;let t=e.kind;t=e.sublanguage?`language-${t}`:((e,{prefix:t})=>{if(e.includes(".")){const r=e.split(".");return[`${t}${r.shift()}`,...r.map(((e,t)=>`${e}${"_".repeat(t+1)}`))].join(" ")}return`${t}${e}`})(t,{prefix:this.classPrefix}),this.span(t)}closeNode(e){a(e)&&(this.buffer+="</span>")}value(){return this.buffer}span(e){this.buffer+=`<span class="${e}">`}}class c{constructor(){this.rootNode={children:[]},this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(e){this.top.children.push(e)}openNode(e){const t={kind:e,children:[]};this.add(t),this.stack.push(t)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(e){return this.constructor._walk(e,this.rootNode)}static _walk(e,t){return"string"==typeof t?e.addText(t):t.children&&(e.openNode(t),t.children.forEach((t=>this._walk(e,t))),e.closeNode(t)),e}static _collapse(e){"string"!=typeof e&&e.children&&(e.children.every((e=>"string"==typeof e))?e.children=[e.children.join("")]:e.children.forEach((e=>{c._collapse(e)})))}}class u extends c{constructor(e){super(),this.options=e}addKeyword(e,t){""!==e&&(this.openNode(t),this.addText(e),this.closeNode())}addText(e){""!==e&&this.add(e)}addSublanguage(e,t){const r=e.root;r.kind=t,r.sublanguage=!0,this.add(r)}toHTML(){return new l(this,this.options).value()}finalize(){return!0}}function h(e){return e?"string"==typeof e?e:e.source:null}function p(e){return m("(?=",e,")")}function d(e){return m("(?:",e,")*")}function f(e){return m("(?:",e,")?")}function m(...e){return e.map((e=>h(e))).join("")}function g(...e){const t=function(e){const t=e[e.length-1];return"object"==typeof t&&t.constructor===Object?(e.splice(e.length-1,1),t):{}}(e);return"("+(t.capture?"":"?:")+e.map((e=>h(e))).join("|")+")"}function y(e){return new RegExp(e.toString()+"|").exec("").length-1}const b=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function v(e,{joinWith:t}){let r=0;return e.map((e=>{r+=1;const t=r;let n=h(e),i="";for(;n.length>0;){const e=b.exec(n);if(!e){i+=n;break}i+=n.substring(0,e.index),n=n.substring(e.index+e[0].length),"\\"===e[0][0]&&e[1]?i+="\\"+String(Number(e[1])+t):(i+=e[0],"("===e[0]&&r++)}return i})).map((e=>`(${e})`)).join(t)}const w="[a-zA-Z]\\w*",x="[a-zA-Z_]\\w*",S="\\b\\d+(\\.\\d+)?",E="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",T="\\b(0b[01]+)",_={begin:"\\\\[\\s\\S]",relevance:0},A={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[_]},P={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[_]},C=function(e,t,r={}){const n=o({scope:"comment",begin:e,end:t,contains:[]},r);n.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});const i=g("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return n.contains.push({begin:m(/[ ]+/,"(",i,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),n},M=C("//","$"),k=C("/\\*","\\*/"),I=C("#","$"),O={scope:"number",begin:S,relevance:0},N={scope:"number",begin:E,relevance:0},R={scope:"number",begin:T,relevance:0},L={begin:/(?=\/[^/\n]*\/)/,contains:[{scope:"regexp",begin:/\//,end:/\/[gimuy]*/,illegal:/\n/,contains:[_,{begin:/\[/,end:/\]/,relevance:0,contains:[_]}]}]},D={scope:"title",begin:w,relevance:0},B={scope:"title",begin:x,relevance:0};var j=Object.freeze({__proto__:null,MATCH_NOTHING_RE:/\b\B/,IDENT_RE:w,UNDERSCORE_IDENT_RE:x,NUMBER_RE:S,C_NUMBER_RE:E,BINARY_NUMBER_RE:T,RE_STARTERS_RE:"!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",SHEBANG:(e={})=>{const t=/^#![ ]*\//;return e.binary&&(e.begin=m(t,/.*\b/,e.binary,/\b.*/)),o({scope:"meta",begin:t,end:/$/,relevance:0,"on:begin":(e,t)=>{0!==e.index&&t.ignoreMatch()}},e)},BACKSLASH_ESCAPE:_,APOS_STRING_MODE:A,QUOTE_STRING_MODE:P,PHRASAL_WORDS_MODE:{begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},COMMENT:C,C_LINE_COMMENT_MODE:M,C_BLOCK_COMMENT_MODE:k,HASH_COMMENT_MODE:I,NUMBER_MODE:O,C_NUMBER_MODE:N,BINARY_NUMBER_MODE:R,REGEXP_MODE:L,TITLE_MODE:D,UNDERSCORE_TITLE_MODE:B,METHOD_GUARD:{begin:"\\.\\s*[a-zA-Z_]\\w*",relevance:0},END_SAME_AS_BEGIN:function(e){return Object.assign(e,{"on:begin":(e,t)=>{t.data._beginMatch=e[1]},"on:end":(e,t)=>{t.data._beginMatch!==e[1]&&t.ignoreMatch()}})}});function F(e,t){"."===e.input[e.index-1]&&t.ignoreMatch()}function $(e,t){void 0!==e.className&&(e.scope=e.className,delete e.className)}function U(e,t){t&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=F,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,void 0===e.relevance&&(e.relevance=0))}function V(e,t){Array.isArray(e.illegal)&&(e.illegal=g(...e.illegal))}function z(e,t){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function W(e,t){void 0===e.relevance&&(e.relevance=1)}const H=(e,t)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");const r=Object.assign({},e);Object.keys(e).forEach((t=>{delete e[t]})),e.keywords=r.keywords,e.begin=m(r.beforeMatch,p(r.begin)),e.starts={relevance:0,contains:[Object.assign(r,{endsParent:!0})]},e.relevance=0,delete r.beforeMatch},q=["of","and","for","in","not","or","if","then","parent","list","value"];function K(e,t,r="keyword"){const n=Object.create(null);return"string"==typeof e?i(r,e.split(" ")):Array.isArray(e)?i(r,e):Object.keys(e).forEach((function(r){Object.assign(n,K(e[r],t,r))})),n;function i(e,r){t&&(r=r.map((e=>e.toLowerCase()))),r.forEach((function(t){const r=t.split("|");n[r[0]]=[e,G(r[0],r[1])]}))}}function G(e,t){return t?Number(t):function(e){return q.includes(e.toLowerCase())}(e)?0:1}const Y={},X=e=>{console.error(e)},J=(e,...t)=>{console.log(`WARN: ${e}`,...t)},Z=(e,t)=>{Y[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),Y[`${e}/${t}`]=!0)},Q=new Error;function ee(e,t,{key:r}){let n=0;const i=e[r],s={},o={};for(let e=1;e<=t.length;e++)o[e+n]=i[e],s[e+n]=!0,n+=y(t[e-1]);e[r]=o,e[r]._emit=s,e[r]._multi=!0}function te(e){!function(e){e.scope&&"object"==typeof e.scope&&null!==e.scope&&(e.beginScope=e.scope,delete e.scope)}(e),"string"==typeof e.beginScope&&(e.beginScope={_wrap:e.beginScope}),"string"==typeof e.endScope&&(e.endScope={_wrap:e.endScope}),function(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw X("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),Q;if("object"!=typeof e.beginScope||null===e.beginScope)throw X("beginScope must be object"),Q;ee(e,e.begin,{key:"beginScope"}),e.begin=v(e.begin,{joinWith:""})}}(e),function(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw X("skip, excludeEnd, returnEnd not compatible with endScope: {}"),Q;if("object"!=typeof e.endScope||null===e.endScope)throw X("endScope must be object"),Q;ee(e,e.end,{key:"endScope"}),e.end=v(e.end,{joinWith:""})}}(e)}function re(e){function t(t,r){return new RegExp(h(t),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(r?"g":""))}class r{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(e,t){t.position=this.position++,this.matchIndexes[this.matchAt]=t,this.regexes.push([t,e]),this.matchAt+=y(e)+1}compile(){0===this.regexes.length&&(this.exec=()=>null);const e=this.regexes.map((e=>e[1]));this.matcherRe=t(v(e,{joinWith:"|"}),!0),this.lastIndex=0}exec(e){this.matcherRe.lastIndex=this.lastIndex;const t=this.matcherRe.exec(e);if(!t)return null;const r=t.findIndex(((e,t)=>t>0&&void 0!==e)),n=this.matchIndexes[r];return t.splice(0,r),Object.assign(t,n)}}class n{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(e){if(this.multiRegexes[e])return this.multiRegexes[e];const t=new r;return this.rules.slice(e).forEach((([e,r])=>t.addRule(e,r))),t.compile(),this.multiRegexes[e]=t,t}resumingScanAtSamePosition(){return 0!==this.regexIndex}considerAll(){this.regexIndex=0}addRule(e,t){this.rules.push([e,t]),"begin"===t.type&&this.count++}exec(e){const t=this.getMatcher(this.regexIndex);t.lastIndex=this.lastIndex;let r=t.exec(e);if(this.resumingScanAtSamePosition())if(r&&r.index===this.lastIndex);else{const t=this.getMatcher(0);t.lastIndex=this.lastIndex+1,r=t.exec(e)}return r&&(this.regexIndex+=r.position+1,this.regexIndex===this.count&&this.considerAll()),r}}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=o(e.classNameAliases||{}),function r(i,s){const a=i;if(i.isCompiled)return a;[$,z,te,H].forEach((e=>e(i,s))),e.compilerExtensions.forEach((e=>e(i,s))),i.__beforeBegin=null,[U,V,W].forEach((e=>e(i,s))),i.isCompiled=!0;let l=null;return"object"==typeof i.keywords&&i.keywords.$pattern&&(i.keywords=Object.assign({},i.keywords),l=i.keywords.$pattern,delete i.keywords.$pattern),l=l||/\w+/,i.keywords&&(i.keywords=K(i.keywords,e.case_insensitive)),a.keywordPatternRe=t(l,!0),s&&(i.begin||(i.begin=/\B|\b/),a.beginRe=t(a.begin),i.end||i.endsWithParent||(i.end=/\B|\b/),i.end&&(a.endRe=t(a.end)),a.terminatorEnd=h(a.end)||"",i.endsWithParent&&s.terminatorEnd&&(a.terminatorEnd+=(i.end?"|":"")+s.terminatorEnd)),i.illegal&&(a.illegalRe=t(i.illegal)),i.contains||(i.contains=[]),i.contains=[].concat(...i.contains.map((function(e){return function(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map((function(t){return o(e,{variants:null},t)}))),e.cachedVariants?e.cachedVariants:ne(e)?o(e,{starts:e.starts?o(e.starts):null}):Object.isFrozen(e)?o(e):e}("self"===e?i:e)}))),i.contains.forEach((function(e){r(e,a)})),i.starts&&r(i.starts,s),a.matcher=function(e){const t=new n;return e.contains.forEach((e=>t.addRule(e.begin,{rule:e,type:"begin"}))),e.terminatorEnd&&t.addRule(e.terminatorEnd,{type:"end"}),e.illegal&&t.addRule(e.illegal,{type:"illegal"}),t}(a),a}(e)}function ne(e){return!!e&&(e.endsWithParent||ne(e.starts))}class ie extends Error{constructor(e,t){super(e),this.name="HTMLInjectionError",this.html=t}}const se=s,oe=o,ae=Symbol("nomatch");var le=function(e){const t=Object.create(null),r=Object.create(null),s=[];let o=!0;const a="Could not find the language '{}', did you forget to load/include a language module?",l={disableAutodetect:!0,name:"Plain text",contains:[]};let c={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:u};function h(e){return c.noHighlightRe.test(e)}function y(e,t,r){let n="",i="";"object"==typeof t?(n=e,r=t.ignoreIllegals,i=t.language):(Z("10.7.0","highlight(lang, code, ...args) has been deprecated."),Z("10.7.0","Please use highlight(code, options) instead.\nhttps://github.com/highlightjs/highlight.js/issues/2277"),i=e,n=t),void 0===r&&(r=!0);const s={code:n,language:i};A("before:highlight",s);const o=s.result?s.result:b(s.language,s.code,r);return o.code=s.code,A("after:highlight",o),o}function b(e,r,n,s){const l=Object.create(null);function u(){if(!_.keywords)return void P.addText(C);let e=0;_.keywordPatternRe.lastIndex=0;let t=_.keywordPatternRe.exec(C),r="";for(;t;){r+=C.substring(e,t.index);const i=x.case_insensitive?t[0].toLowerCase():t[0],s=(n=i,_.keywords[n]);if(s){const[e,n]=s;if(P.addText(r),r="",l[i]=(l[i]||0)+1,l[i]<=7&&(M+=n),e.startsWith("_"))r+=t[0];else{const r=x.classNameAliases[e]||e;P.addKeyword(t[0],r)}}else r+=t[0];e=_.keywordPatternRe.lastIndex,t=_.keywordPatternRe.exec(C)}var n;r+=C.substr(e),P.addText(r)}function h(){null!=_.subLanguage?function(){if(""===C)return;let e=null;if("string"==typeof _.subLanguage){if(!t[_.subLanguage])return void P.addText(C);e=b(_.subLanguage,C,!0,A[_.subLanguage]),A[_.subLanguage]=e._top}else e=v(C,_.subLanguage.length?_.subLanguage:null);_.relevance>0&&(M+=e.relevance),P.addSublanguage(e._emitter,e.language)}():u(),C=""}function p(e,t){let r=1;for(;void 0!==t[r];){if(!e._emit[r]){r++;continue}const n=x.classNameAliases[e[r]]||e[r],i=t[r];n?P.addKeyword(i,n):(C=i,u(),C=""),r++}}function d(e,t){return e.scope&&"string"==typeof e.scope&&P.openNode(x.classNameAliases[e.scope]||e.scope),e.beginScope&&(e.beginScope._wrap?(P.addKeyword(C,x.classNameAliases[e.beginScope._wrap]||e.beginScope._wrap),C=""):e.beginScope._multi&&(p(e.beginScope,t),C="")),_=Object.create(e,{parent:{value:_}}),_}function f(e,t,r){let n=function(e,t){const r=e&&e.exec(t);return r&&0===r.index}(e.endRe,r);if(n){if(e["on:end"]){const r=new i(e);e["on:end"](t,r),r.isMatchIgnored&&(n=!1)}if(n){for(;e.endsParent&&e.parent;)e=e.parent;return e}}if(e.endsWithParent)return f(e.parent,t,r)}function m(e){return 0===_.matcher.regexIndex?(C+=e[0],1):(O=!0,0)}function g(e){const t=e[0],n=r.substr(e.index),i=f(_,e,n);if(!i)return ae;const s=_;_.endScope&&_.endScope._wrap?(h(),P.addKeyword(t,_.endScope._wrap)):_.endScope&&_.endScope._multi?(h(),p(_.endScope,e)):s.skip?C+=t:(s.returnEnd||s.excludeEnd||(C+=t),h(),s.excludeEnd&&(C=t));do{_.scope&&P.closeNode(),_.skip||_.subLanguage||(M+=_.relevance),_=_.parent}while(_!==i.parent);return i.starts&&d(i.starts,e),s.returnEnd?0:t.length}let y={};function w(t,s){const a=s&&s[0];if(C+=t,null==a)return h(),0;if("begin"===y.type&&"end"===s.type&&y.index===s.index&&""===a){if(C+=r.slice(s.index,s.index+1),!o){const t=new Error(`0 width match regex (${e})`);throw t.languageName=e,t.badRule=y.rule,t}return 1}if(y=s,"begin"===s.type)return function(e){const t=e[0],r=e.rule,n=new i(r),s=[r.__beforeBegin,r["on:begin"]];for(const r of s)if(r&&(r(e,n),n.isMatchIgnored))return m(t);return r.skip?C+=t:(r.excludeBegin&&(C+=t),h(),r.returnBegin||r.excludeBegin||(C=t)),d(r,e),r.returnBegin?0:t.length}(s);if("illegal"===s.type&&!n){const e=new Error('Illegal lexeme "'+a+'" for mode "'+(_.scope||"<unnamed>")+'"');throw e.mode=_,e}if("end"===s.type){const e=g(s);if(e!==ae)return e}if("illegal"===s.type&&""===a)return 1;if(I>1e5&&I>3*s.index)throw new Error("potential infinite loop, way more iterations than matches");return C+=a,a.length}const x=E(e);if(!x)throw X(a.replace("{}",e)),new Error('Unknown language: "'+e+'"');const S=re(x);let T="",_=s||S;const A={},P=new c.__emitter(c);!function(){const e=[];for(let t=_;t!==x;t=t.parent)t.scope&&e.unshift(t.scope);e.forEach((e=>P.openNode(e)))}();let C="",M=0,k=0,I=0,O=!1;try{for(_.matcher.considerAll();;){I++,O?O=!1:_.matcher.considerAll(),_.matcher.lastIndex=k;const e=_.matcher.exec(r);if(!e)break;const t=w(r.substring(k,e.index),e);k=e.index+t}return w(r.substr(k)),P.closeAllNodes(),P.finalize(),T=P.toHTML(),{language:e,value:T,relevance:M,illegal:!1,_emitter:P,_top:_}}catch(t){if(t.message&&t.message.includes("Illegal"))return{language:e,value:se(r),illegal:!0,relevance:0,_illegalBy:{message:t.message,index:k,context:r.slice(k-100,k+100),mode:t.mode,resultSoFar:T},_emitter:P};if(o)return{language:e,value:se(r),illegal:!1,relevance:0,errorRaised:t,_emitter:P,_top:_};throw t}}function v(e,r){r=r||c.languages||Object.keys(t);const n=function(e){const t={value:se(e),illegal:!1,relevance:0,_top:l,_emitter:new c.__emitter(c)};return t._emitter.addText(e),t}(e),i=r.filter(E).filter(_).map((t=>b(t,e,!1)));i.unshift(n);const s=i.sort(((e,t)=>{if(e.relevance!==t.relevance)return t.relevance-e.relevance;if(e.language&&t.language){if(E(e.language).supersetOf===t.language)return 1;if(E(t.language).supersetOf===e.language)return-1}return 0})),[o,a]=s,u=o;return u.secondBest=a,u}function w(e){let t=null;const n=function(e){let t=e.className+" ";t+=e.parentNode?e.parentNode.className:"";const r=c.languageDetectRe.exec(t);if(r){const t=E(r[1]);return t||(J(a.replace("{}",r[1])),J("Falling back to no-highlight mode for this block.",e)),t?r[1]:"no-highlight"}return t.split(/\s+/).find((e=>h(e)||E(e)))}(e);if(h(n))return;if(A("before:highlightElement",{el:e,language:n}),e.children.length>0&&(c.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(e)),c.throwUnescapedHTML))throw new ie("One of your code blocks includes unescaped HTML.",e.innerHTML);t=e;const i=t.textContent,s=n?y(i,{language:n,ignoreIllegals:!0}):v(i);e.innerHTML=s.value,function(e,t,n){const i=t&&r[t]||n;e.classList.add("hljs"),e.classList.add(`language-${i}`)}(e,n,s.language),e.result={language:s.language,re:s.relevance,relevance:s.relevance},s.secondBest&&(e.secondBest={language:s.secondBest.language,relevance:s.secondBest.relevance}),A("after:highlightElement",{el:e,result:s,text:i})}let x=!1;function S(){"loading"!==document.readyState?document.querySelectorAll(c.cssSelector).forEach(w):x=!0}function E(e){return e=(e||"").toLowerCase(),t[e]||t[r[e]]}function T(e,{languageName:t}){"string"==typeof e&&(e=[e]),e.forEach((e=>{r[e.toLowerCase()]=t}))}function _(e){const t=E(e);return t&&!t.disableAutodetect}function A(e,t){const r=e;s.forEach((function(e){e[r]&&e[r](t)}))}"undefined"!=typeof window&&window.addEventListener&&window.addEventListener("DOMContentLoaded",(function(){x&&S()}),!1),Object.assign(e,{highlight:y,highlightAuto:v,highlightAll:S,highlightElement:w,highlightBlock:function(e){return Z("10.7.0","highlightBlock will be removed entirely in v12.0"),Z("10.7.0","Please use highlightElement now."),w(e)},configure:function(e){c=oe(c,e)},initHighlighting:()=>{S(),Z("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")},initHighlightingOnLoad:function(){S(),Z("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")},registerLanguage:function(r,n){let i=null;try{i=n(e)}catch(e){if(X("Language definition for '{}' could not be registered.".replace("{}",r)),!o)throw e;X(e),i=l}i.name||(i.name=r),t[r]=i,i.rawDefinition=n.bind(null,e),i.aliases&&T(i.aliases,{languageName:r})},unregisterLanguage:function(e){delete t[e];for(const t of Object.keys(r))r[t]===e&&delete r[t]},listLanguages:function(){return Object.keys(t)},getLanguage:E,registerAliases:T,autoDetection:_,inherit:oe,addPlugin:function(e){!function(e){e["before:highlightBlock"]&&!e["before:highlightElement"]&&(e["before:highlightElement"]=t=>{e["before:highlightBlock"](Object.assign({block:t.el},t))}),e["after:highlightBlock"]&&!e["after:highlightElement"]&&(e["after:highlightElement"]=t=>{e["after:highlightBlock"](Object.assign({block:t.el},t))})}(e),s.push(e)}}),e.debugMode=function(){o=!1},e.safeMode=function(){o=!0},e.versionString="11.4.0",e.regex={concat:m,lookahead:p,either:g,optional:f,anyNumberOfTimes:d};for(const e in j)"object"==typeof j[e]&&n(j[e]);return Object.assign(e,j),e}({});e.exports=le,le.HighlightJS=le,le.default=le}}]);
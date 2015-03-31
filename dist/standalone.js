(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else if(typeof exports === 'object')
		exports["_test"] = factory();
	else
		root["_test"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = {
	  conventions: __webpack_require__(2),
	  element: __webpack_require__(3),
	  composite: __webpack_require__(4),
	  screen: __webpack_require__(5),
	  state: __webpack_require__(6),
	  link: __webpack_require__(7),
	  channel: __webpack_require__(8)
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var firstLower = __webpack_require__(9);
	var firstUpper = __webpack_require__(10);
	var composeName = __webpack_require__(11);

	module.exports = {
	  structureComponentsNames: __webpack_require__(12),
	  behaviourComponentsNames: __webpack_require__(13),
	  globalNames: __webpack_require__(14),
	  names: {
	    element: composeName(firstLower),
	    state: composeName(firstUpper, __webpack_require__(13).state),
	    composite: composeName(firstLower),
	    screen: composeName(firstLower),
	    ngModule: __webpack_require__(15)
	  }
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var conv = __webpack_require__(2);
	var component = __webpack_require__(18);
	var stateful = __webpack_require__(17);
	var taglike = __webpack_require__(19);
	var injector = __webpack_require__(20);
	var compose = __webpack_require__(16);

	module.exports = function createElement(definition, createStateFn, createElementFn) {
	  var createOfType = compose(component, injector, stateful, taglike)(definition);
	  var componentDefinition = createOfType(conv.structureComponentsNames.element);

	  var state = createStateFn(componentDefinition);
	  var element = createElementFn(componentDefinition);
	  return element;
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var conv = __webpack_require__(2);
	var component = __webpack_require__(18);
	var stateful = __webpack_require__(17);
	var taglike = __webpack_require__(19);
	var injector = __webpack_require__(20);
	var compose = __webpack_require__(16);

	// right now composite is totaly the same as element
	// this fact may change in the future (and implementations may differ)
	module.exports = function createComposite(definition, createStateFn, createCompositeFn) {
	  var createOfType = compose(component, injector, stateful, taglike)(definition);
	  var componentDefinition = createOfType(conv.structureComponentsNames.composite);

	  var state = createStateFn(componentDefinition);
	  var composite = createCompositeFn(componentDefinition);
	  return composite;
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var conv = __webpack_require__(2);
	var component = __webpack_require__(18);
	var routable = __webpack_require__(21);
	var channelSource = __webpack_require__(22);
	var taglike = __webpack_require__(19);
	var injector = __webpack_require__(20);
	var compose = __webpack_require__(16);

	module.exports = function createScreen(definition, createScreenFn) {
	  var createOfType = compose(component, routable, channelSource, injector, taglike)(definition);
	  var componentDefinition = createOfType(conv.structureComponentsNames.screen);

	  return createScreenFn(componentDefinition);
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var conv = __webpack_require__(2);

	module.exports = function state(definition, factoryFn) {
	  var stateName = conv.names.state(definition.name);

	  return {
	    entityName: stateName,
	    factoryFn: factoryFn(definition.state)
	  };
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var conv = __webpack_require__(2);

	module.exports = function defineLink(createLink) {
	  return {
	    factoryFn: createLink,
	    entityName: conv.behaviourComponentsNames.link,
	    moduleName: conv.names.ngModule(conv.globalNames.framework, conv.behaviourComponentsNames.link)
	  };
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var conv = __webpack_require__(2);

	module.exports = function defineСhannel(createChannel) {
	  return {
	    factoryFn: createChannel,
	    moduleName: conv.names.ngModule(conv.globalNames.framework, conv.behaviourComponentsNames.channel),
	    entityName: conv.globalNames.channels
	  };
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = function firstLower(string) {
	  return string.charAt(0).toLowerCase() + string.substr(1);
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = function firstUpper(string) {
	  return string.charAt(0).toUpperCase() + string.substr(1);
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var firstUpper = __webpack_require__(10);

	module.exports = function composeName(firstWordTransformer, component) {
	  component = component || "";

	  return function (entity) {
	    return [firstWordTransformer(entity), firstUpper(component)].join("");
	  };
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = {
	  element: "elements",
	  composite: "composites",
	  screen: "screens"
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = {
	  state: "state",
	  channel: "channel",
	  link: "link"
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = {
	  channels: "channels",
	  framework: "yaf"
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = function angularModuleName(entity, componentName) {
	  return [entity.toLowerCase(), componentName].join(".");
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = function compose() {
	  var funcs = arguments;

	  return function () {
	    var args = arguments,
	        length = funcs.length;

	    while (length--) {
	      args = [funcs[length].apply(this, args)];
	    }
	    return args[0];
	  };
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var extend = __webpack_require__(26);
	var isFunction = __webpack_require__(23);

	var defaultSchema = {
	  state: {},
	  options: {}
	};

	function verifyNoFunctions(def, prop) {
	  var property = def[prop];

	  var fns = Object.keys(property).map(function (key) {
	    return property[key];
	  }).filter(isFunction);

	  if (fns.length) {
	    console.log("Warning! Property \"" + prop + "\" in " + def.name + " contain function definitions.\n" + "This may result in incorrect behaviour!");
	  }
	}

	module.exports = function stateful(definition) {
	  var component = extend(true, {}, defaultSchema, definition);
	  verifyNoFunctions(component, "state");
	  verifyNoFunctions(component, "options");
	  return component;
	};

	// element's state object

	// element's options

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var conv = __webpack_require__(2);
	var extend = __webpack_require__(26);

	module.exports = function component(definition) {
	  return function componentOfType(type) {
	    var moduleName = conv.names.ngModule(type, definition.name);

	    return extend(definition, {
	      moduleName: moduleName,
	      type: type
	    });
	  };
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var extend = __webpack_require__(26);

	var defaultSchema = {
	  inject: {},
	  template: null,
	  styles: null,
	  ready: function ready() {}
	};

	function verify(def) {
	  if (!def.name) {
	    throw new Error("You tried to create the component without name specified!");
	  }

	  if (!def.template) {
	    throw new Error("You tried to create the compoennts without template specified!");
	  }

	  return def;
	}

	module.exports = function taglike(definition) {
	  var component = extend(true, {}, defaultSchema, definition);
	  return verify(component);
	};

	//'componentName' : 'fromModuleName'
	//'exportName' : ModuleObject

	//    this.element;
	//    this.state;
	//    this.options;
	//    this.injector;
	//    this.channels;
	//    this.templateScope;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var mapValues = __webpack_require__(24);
	var uniq = __webpack_require__(25);
	var extend = __webpack_require__(26);

	module.exports = function injector(definition) {
	  var modules = uniq(mapValues(definition.inject));
	  var injectables = Object.keys(definition.inject);

	  return extend(definition, {
	    moduleDependencies: modules,
	    injectables: injectables
	  });
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var extend = __webpack_require__(26);
	var isFunction = __webpack_require__(23);

	var defaultSchema = {
	  route: "/"
	};

	var verify = function verify(def) {
	  if (!def.route) {
	    throw new Error("You tried to create a routable component without route specified!");
	  }
	  return def;
	};

	module.exports = function stateful(definition) {
	  var component = extend(true, {}, defaultSchema, definition);
	  return verify(component);
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var extend = __webpack_require__(26);
	var defaultSchema = {
	  channels: []
	};

	var verify = function verify(def) {
	  if (!Array.isArray(def.channels)) {
	    throw new Error("You have tried to create a channel source component " + "with non-array \"channels\" field!\n" + "This is incorrect, channels can be automatically created only from array notation.\n" + "You should specify something like \"channels: [\"myChannel\"] in component definition.\"");
	  }
	  return def;
	};

	module.exports = function (definition) {
	  var component = extend(true, definition, defaultSchema);
	  return verify(component);
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = function (fn) {
	  return !!(fn && fn.constructor && fn.call && fn.apply);
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = function mapValues(map) {
	  return Object.keys(map).map(function (key) {
	    return map[key];
	  });
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = function uniq(arr) {
	  return Object.keys(arr.reduce(function (acc, val) {
	    acc[val] = 1;
	    return acc;
	  }, {}));
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var hasOwn = Object.prototype.hasOwnProperty;
	var toString = Object.prototype.toString;
	var undefined;

	var isPlainObject = function isPlainObject(obj) {
		'use strict';
		if (!obj || toString.call(obj) !== '[object Object]') {
			return false;
		}

		var has_own_constructor = hasOwn.call(obj, 'constructor');
		var has_is_property_of_method = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
		// Not own constructor property must be Object
		if (obj.constructor && !has_own_constructor && !has_is_property_of_method) {
			return false;
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		var key;
		for (key in obj) {}

		return key === undefined || hasOwn.call(obj, key);
	};

	module.exports = function extend() {
		'use strict';
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[0],
			i = 1,
			length = arguments.length,
			deep = false;

		// Handle a deep copy situation
		if (typeof target === 'boolean') {
			deep = target;
			target = arguments[1] || {};
			// skip the boolean and the target
			i = 2;
		} else if ((typeof target !== 'object' && typeof target !== 'function') || target == null) {
			target = {};
		}

		for (; i < length; ++i) {
			options = arguments[i];
			// Only deal with non-null/undefined values
			if (options != null) {
				// Extend the base object
				for (name in options) {
					src = target[name];
					copy = options[name];

					// Prevent never-ending loop
					if (target === copy) {
						continue;
					}

					// Recurse if we're merging plain objects or arrays
					if (deep && copy && (isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
						if (copyIsArray) {
							copyIsArray = false;
							clone = src && Array.isArray(src) ? src : [];
						} else {
							clone = src && isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						target[name] = extend(deep, clone, copy);

					// Don't bring in undefined values
					} else if (copy !== undefined) {
						target[name] = copy;
					}
				}
			}
		}

		// Return the modified object
		return target;
	};



/***/ }
/******/ ])
});
;
System.register([], function (_export) {
  var extend, isFunction, defaultSchema;

  function verifyNoFunctions(def, prop) {
    var property = def[prop];

    var fns = Object.keys(property).map(function (key) {
      return property[key];
    }).filter(isFunction);

    if (fns.length) {
      console.log("Warning! Property \"" + prop + "\" in " + def.name + " contain function definitions.\n" + "This may result in incorrect behaviour!");
    }
  }

  return {
    setters: [],
    execute: function () {
      "use strict";
      extend = require("extend");
      isFunction = require("../../../utils/isFunction");
      defaultSchema = {
        state: {},
        options: {}
      };
      module.exports = function stateful(definition) {
        var component = extend(true, {}, defaultSchema, definition);
        verifyNoFunctions(component, "state");
        verifyNoFunctions(component, "options");
        return component;
      };
    }
  };
});

// element's state object

// element's options
//# sourceMappingURL=index.js.map
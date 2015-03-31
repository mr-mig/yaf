System.register([], function (_export) {
  var extend, isFunction, defaultSchema, verify;
  return {
    setters: [],
    execute: function () {
      "use strict";
      extend = require("extend");
      isFunction = require("../../../utils/isFunction");
      defaultSchema = {
        route: "/"
      };

      verify = function verify(def) {
        if (!def.route) {
          throw new Error("You tried to create a routable component without route specified!");
        }
        return def;
      };

      module.exports = function stateful(definition) {
        var component = extend(true, {}, defaultSchema, definition);
        return verify(component);
      };
    }
  };
});
//# sourceMappingURL=index.js.map
System.register([], function (_export) {
  var mapValues, uniq, extend;
  return {
    setters: [],
    execute: function () {
      "use strict";
      mapValues = require("../../../utils/mapValues");
      uniq = require("../../../utils/uniq");
      extend = require("extend");

      module.exports = function injector(definition) {
        var modules = uniq(mapValues(definition.inject));
        var injectables = Object.keys(definition.inject);

        return extend(definition, {
          moduleDependencies: modules,
          injectables: injectables
        });
      };
    }
  };
});
//# sourceMappingURL=index.js.map
System.register([], function (_export) {
  var conv, extend;
  return {
    setters: [],
    execute: function () {
      "use strict";
      conv = require("../../../conventions");
      extend = require("extend");

      module.exports = function component(definition) {
        return function componentOfType(type) {
          var moduleName = conv.names.ngModule(type, definition.name);

          return extend(definition, {
            moduleName: moduleName,
            type: type
          });
        };
      };
    }
  };
});
//# sourceMappingURL=index.js.map
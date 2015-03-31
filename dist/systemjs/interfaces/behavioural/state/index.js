System.register([], function (_export) {
  var conv;
  return {
    setters: [],
    execute: function () {
      "use strict";
      conv = require("../../../conventions");

      module.exports = function state(definition, factoryFn) {
        var stateName = conv.names.state(definition.name);

        return {
          entityName: stateName,
          factoryFn: factoryFn(definition.state)
        };
      };
    }
  };
});
//# sourceMappingURL=index.js.map
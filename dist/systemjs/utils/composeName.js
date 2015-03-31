System.register([], function (_export) {
  var firstUpper;
  return {
    setters: [],
    execute: function () {
      "use strict";
      firstUpper = require("./firstUpper");

      module.exports = function composeName(firstWordTransformer, component) {
        component = component || "";

        return function (entity) {
          return [firstWordTransformer(entity), firstUpper(component)].join("");
        };
      };
    }
  };
});
//# sourceMappingURL=composeName.js.map
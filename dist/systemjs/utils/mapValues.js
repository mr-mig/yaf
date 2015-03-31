System.register([], function (_export) {
  return {
    setters: [],
    execute: function () {
      "use strict";

      module.exports = function mapValues(map) {
        return Object.keys(map).map(function (key) {
          return map[key];
        });
      };
    }
  };
});
//# sourceMappingURL=mapValues.js.map
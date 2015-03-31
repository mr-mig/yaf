System.register([], function (_export) {
  return {
    setters: [],
    execute: function () {
      "use strict";
      module.exports = function uniq(arr) {
        return Object.keys(arr.reduce(function (acc, val) {
          acc[val] = 1;
          return acc;
        }, {}));
      };
    }
  };
});
//# sourceMappingURL=uniq.js.map
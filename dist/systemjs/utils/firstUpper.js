System.register([], function (_export) {
  return {
    setters: [],
    execute: function () {
      "use strict";
      module.exports = function firstUpper(string) {
        return string.charAt(0).toUpperCase() + string.substr(1);
      };
    }
  };
});
//# sourceMappingURL=firstUpper.js.map
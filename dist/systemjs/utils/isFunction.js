System.register([], function (_export) {
  return {
    setters: [],
    execute: function () {
      "use strict";

      module.exports = function (fn) {
        return !!(fn && fn.constructor && fn.call && fn.apply);
      };
    }
  };
});
//# sourceMappingURL=isFunction.js.map
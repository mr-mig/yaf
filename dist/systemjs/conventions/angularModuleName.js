System.register([], function (_export) {
  return {
    setters: [],
    execute: function () {
      "use strict";
      module.exports = function angularModuleName(entity, componentName) {
        return [entity.toLowerCase(), componentName].join(".");
      };
    }
  };
});
//# sourceMappingURL=angularModuleName.js.map
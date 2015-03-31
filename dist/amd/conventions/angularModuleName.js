define(["exports"], function (exports) {
  "use strict";
  module.exports = function angularModuleName(entity, componentName) {
    return [entity.toLowerCase(), componentName].join(".");
  };
});
//# sourceMappingURL=angularModuleName.js.map
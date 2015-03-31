System.register([], function (_export) {
  var conv;
  return {
    setters: [],
    execute: function () {
      "use strict";
      conv = require("../../../conventions");

      module.exports = function defineLink(createLink) {
        return {
          factoryFn: createLink,
          entityName: conv.behaviourComponentsNames.link,
          moduleName: conv.names.ngModule(conv.globalNames.framework, conv.behaviourComponentsNames.link)
        };
      };
    }
  };
});
//# sourceMappingURL=index.js.map
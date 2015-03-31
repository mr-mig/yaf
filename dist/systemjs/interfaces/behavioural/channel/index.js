System.register([], function (_export) {
  var conv;
  return {
    setters: [],
    execute: function () {
      "use strict";
      conv = require("../../../conventions");

      module.exports = function defineСhannel(createChannel) {
        return {
          factoryFn: createChannel,
          moduleName: conv.names.ngModule(conv.globalNames.framework, conv.behaviourComponentsNames.channel),
          entityName: conv.globalNames.channels
        };
      };
    }
  };
});
//# sourceMappingURL=index.js.map
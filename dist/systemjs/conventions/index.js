System.register([], function (_export) {
  var firstLower, firstUpper, composeName;
  return {
    setters: [],
    execute: function () {
      "use strict";
      firstLower = require("../utils/firstLower");
      firstUpper = require("../utils/firstUpper");
      composeName = require("../utils/composeName");

      module.exports = {
        structureComponentsNames: require("./structureComponentsNames"),
        behaviourComponentsNames: require("./behaviourComponentsNames"),
        globalNames: require("./globalNames"),
        names: {
          element: composeName(firstLower),
          state: composeName(firstUpper, require("./behaviourComponentsNames").state),
          composite: composeName(firstLower),
          screen: composeName(firstLower),
          ngModule: require("./angularModuleName")
        }
      };
    }
  };
});
//# sourceMappingURL=index.js.map
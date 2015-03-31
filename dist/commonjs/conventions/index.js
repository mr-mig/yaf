"use strict";
var firstLower = require("../utils/firstLower");
var firstUpper = require("../utils/firstUpper");
var composeName = require("../utils/composeName");

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
//# sourceMappingURL=index.js.map
"use strict";
var conv = require("../../../conventions");
var extend = require("extend");

module.exports = function component(definition) {
  return function componentOfType(type) {
    var moduleName = conv.names.ngModule(type, definition.name);

    return extend(definition, {
      moduleName: moduleName,
      type: type
    });
  };
};
//# sourceMappingURL=index.js.map
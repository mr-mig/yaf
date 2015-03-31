"use strict";
var firstUpper = require("./firstUpper");

module.exports = function composeName(firstWordTransformer, component) {
  component = component || "";

  return function (entity) {
    return [firstWordTransformer(entity), firstUpper(component)].join("");
  };
};
//# sourceMappingURL=composeName.js.map
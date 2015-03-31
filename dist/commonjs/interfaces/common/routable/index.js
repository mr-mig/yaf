"use strict";
var extend = require("extend");
var isFunction = require("../../../utils/isFunction");

var defaultSchema = {
  route: "/"
};

var verify = function verify(def) {
  if (!def.route) {
    throw new Error("You tried to create a routable component without route specified!");
  }
  return def;
};

module.exports = function stateful(definition) {
  var component = extend(true, {}, defaultSchema, definition);
  return verify(component);
};
//# sourceMappingURL=index.js.map
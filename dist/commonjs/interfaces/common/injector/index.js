"use strict";
var mapValues = require("../../../utils/mapValues");
var uniq = require("../../../utils/uniq");
var extend = require("extend");

module.exports = function injector(definition) {
  var modules = uniq(mapValues(definition.inject));
  var injectables = Object.keys(definition.inject);

  return extend(definition, {
    moduleDependencies: modules,
    injectables: injectables
  });
};
//# sourceMappingURL=index.js.map
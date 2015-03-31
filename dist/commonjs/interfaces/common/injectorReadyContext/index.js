"use strict";

module.exports = function injectorReadyContext(injected, injectables) {

  // combine injected components with the corresponding injectable names
  var injector = injectables.reduce(function (acc, name, idx) {
    acc[name] = injected[idx];
    return acc;
  }, {});

  return {
    injector: injector
  };
};
//# sourceMappingURL=index.js.map
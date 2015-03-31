"use strict";
module.exports = function compose() {
  var funcs = arguments;

  return function () {
    var args = arguments,
        length = funcs.length;

    while (length--) {
      args = [funcs[length].apply(this, args)];
    }
    return args[0];
  };
};
//# sourceMappingURL=compose.js.map
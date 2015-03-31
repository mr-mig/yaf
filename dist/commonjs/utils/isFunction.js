"use strict";

module.exports = function (fn) {
  return !!(fn && fn.constructor && fn.call && fn.apply);
};
//# sourceMappingURL=isFunction.js.map
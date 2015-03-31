System.register([], function (_export) {
  return {
    setters: [],
    execute: function () {
      "use strict";
      module.exports = function detachStyles(styles) {
        if (!styles.parentNode) {
          return;
        }
        return styles.parentNode.removeChild(styles);
      };
    }
  };
});
//# sourceMappingURL=detachStyles.js.map
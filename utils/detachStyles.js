'use strict';
module.exports = function detachStyles(styles) {
  if (!styles.parentNode) {
    return;
  }
  return styles.parentNode.removeChild(styles);
};

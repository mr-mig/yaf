"use strict";
var refs = {};
var styleRefs = {};

module.exports = function attachStyles(refName, stylesStr, node) {
  if (refs[refName]) {
    refs[refName]++;
    return styleRefs[refName];
  } else {
    var styles = document.createElement("style");
    styles.type = "text/css";
    styles.innerHTML = stylesStr;
    node = node ? node[0] || node : document.head.childNodes[0];
    node.parentNode.appendChild(styles);
    return styles;
  }
};
//# sourceMappingURL=attachStyles.js.map
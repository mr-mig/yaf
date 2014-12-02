'use strict';
module.exports = function attachStyles(stylesStr, node) {
  var styles = document.createElement('style');
  styles.type = 'text/css';
  styles.innerHTML = stylesStr;
  node = node ? (node[0] || node) : document.head.childNodes[0];
  node.parentNode.appendChild(styles);
  return styles;
};

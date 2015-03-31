var refs = {};
var styleRefs = {};

export function attachStyles(refName, stylesStr, node) {
  if (refs[refName] > 0){
    refs[refName]++;
    return styleRefs[refName];
  } else {
    refs[refName] = 0;
    var styleNode = document.createElement('style');
    styleNode.type = 'text/css';
    styleNode.innerHTML = stylesStr;
    node = node ? (node[0] || node) : document.head.childNodes[0];
    node.parentNode.appendChild(styleNode);
    styleRefs[refName] = styleNode;
    return styleNode;
  }
}

export function detachStyles(refName, styleNode) {
  refs[refName]--;

  if (refs[refName] === 0){
    if (!styleNode.parentNode) {
      return;
    }
    styleNode.parentNode.removeChild(styleNode);
  }
  return styleNode;
}

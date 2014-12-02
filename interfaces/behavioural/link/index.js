'use strict';
var conv = require('../../../conventions');

module.exports = function defineLink(createLink) {
  return {
    factoryFn: createLink,
    entityName: conv.behaviourComponentsNames.link,
    moduleName: conv.names.ngModule(conv.globalNames.framework, conv.behaviourComponentsNames.link)
  }
};

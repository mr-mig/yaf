'use strict';
var conv = require('../../../conventions');
var component = require('../../common/component/index');
var stateful = require('../..//common/stateful');
var taglike = require('../../common/taglike/index');
var injector = require('../../common/injector/index');
var compose = require('../../../utils/compose');


// right now composite is totaly the same as element
// this fact may change in the future (and implementations may differ)
module.exports = function createComposite(definition, createStateFn, createCompositeFn){
  var createOfType = compose(component, injector, stateful, taglike)(definition);
  var componentDefinition = createOfType(conv.structureComponentsNames.composite);

  var state = createStateFn(componentDefinition);
  var composite = createCompositeFn(componentDefinition);
  return composite;
};

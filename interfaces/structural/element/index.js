'use strict';
var conv = require('../../../conventions');
var component = require('../../common/component');
var stateful = require('../../common/stateful');
var taglike = require('../../common/taglike');
var injector = require('../../common/injector');
var compose = require('../../../utils/compose');


module.exports = function createElement(definition, createStateFn, createElementFn){
  var createOfType = compose(component, injector, stateful, taglike)(definition);
  var componentDefinition = createOfType(conv.structureComponentsNames.element);

  var state = createStateFn(componentDefinition);
  var element = createElementFn(componentDefinition);
  return element;
};

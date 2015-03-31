'use strict';
var conv = require('../../../conventions');
var component = require('../../common/component/index');
var stateful = require('../../common/stateful/index');
var taglike = require('../../common/taglike/index');
var injector = require('../../common/injector/index');
var compose = require('../../../utils/compose');


module.exports = function createElement(definition, createStateFn, createElementFn){
  var createOfType = compose(component, injector, stateful, taglike)(definition);
  var componentDefinition = createOfType(conv.structureComponentsNames.element);

  var state = createStateFn(componentDefinition);
  var element = createElementFn(componentDefinition);
  return element;
};

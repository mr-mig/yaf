'use strict';
var conv = require('../../../conventions');
var component = require('../../common/component');
var routable = require('../../common/routable');
var channelSource = require('../../common/channelSource');
var taglike = require('../../common/taglike');
var injector = require('../../common/injector');
var compose = require('../../../utils/compose');


module.exports = function createScreen(definition, createScreenFn) {
  var createOfType = compose(component, routable, channelSource, injector, taglike)(definition);
  var componentDefinition = createOfType(conv.structureComponentsNames.screen);

  return createScreenFn(componentDefinition);
};

'use strict';
var conv = require('../../../conventions');

module.exports = function state(definition, factoryFn){
  var stateName = conv.names.state(definition.name);

  return {
    entityName: stateName,
    factoryFn: factoryFn(definition.state)
  };
}
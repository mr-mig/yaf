'use strict';
var angular = require('angular-cjs');
var state = require('../../../interfaces/behavioural/state');
var stateFactory = require('./create');

// register the state object in angular DI container
module.exports = function angularState(definition) {
  var result = state(definition, stateFactory);

  // try to get the module first
  // this is the case when state is created for a structure entity like element
  try{
    angular.module(definition.moduleName);
  } catch(e) {
    angular.module(definition.moduleName, definition.moduleDependencies);
  }

  return angular.module(definition.moduleName)
    .factory(result.entityName, result.factoryFn);
};

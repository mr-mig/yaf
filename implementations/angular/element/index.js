'use strict';
var angular = require('angular-cjs');
var element = require('../../../interfaces/structural/element');
var createElement = require('./create');
var createState = require('../state');

module.exports = function angularElement(definition) {
  var elementDefinition = element(definition, createState, createElement);

  // try to get the module first
  // this is the case when state is created for a structure entity like element
  try {
    angular.module(elementDefinition.moduleName);
  } catch (e) {
    angular.module(elementDefinition.moduleName, elementDefinition.moduleDependencies);
  }

  return angular.module(elementDefinition.moduleName)
    .directive(elementDefinition.name, elementDefinition.component);
};
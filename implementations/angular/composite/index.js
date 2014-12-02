'use strict';
var angular = require('angular-cjs');
var composite = require('../../../interfaces/structural/composite');
var createComposite = require('./create');
var createState = require('../state');

// register composite using angular DI container
module.exports = function angularComposite(definition) {
  var compositeDefinition = composite(definition, createState, createComposite);

  // try to get the module first
  // this is the case when state is created for a structure entity like composite
  try {
    angular.module(compositeDefinition.moduleName);
  } catch (e) {
    angular.module(compositeDefinition.moduleName, compositeDefinition.moduleDependencies);
  }

  return angular.module(compositeDefinition.moduleName)
    .directive(compositeDefinition.name, compositeDefinition.component);
};

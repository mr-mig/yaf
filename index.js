'use strict';

var angular = require('angular-cjs');

module.exports = {
  element: require('./implementations/angular/element'),
  composite: require('./implementations/angular/composite'),
  screen: require('./implementations/angular/screen'),
  state: require('./implementations/angular/state'),
  // angular-specific
  module: angular.module('am.core', [
    require('./implementations/angular/link').name,
    require('./implementations/angular/channel').name
  ])
};

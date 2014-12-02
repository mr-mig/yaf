'use strict';
var angular = require('angular-cjs');
var screen = require('../../../interfaces/structural/screen');
var createScreen = require('./create');

module.exports = function angularScreen(definition) {
  return screen(definition, createScreen);
};
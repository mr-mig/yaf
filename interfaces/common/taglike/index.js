'use strict';
var extend = require('extend');

var defaultSchema = {
  inject: {
    //'componentName' : 'fromModuleName'
    //'exportName' : ModuleObject
  },
  template: null,
  styles: null,
  ready: function () {
//    this.element;
//    this.state;
//    this.options;
//    this.injector;
//    this.channels;
//    this.templateScope;
  }
};

function verify(def){
  if (!def.name) {
    throw new Error('You tried to create the component without name specified!');
  }

  if (!def.template) {
    throw new Error('You tried to create the compoennts without template specified!');
  }

  return def;
}

module.exports = function taglike(definition){
  var component = extend(true, {}, defaultSchema, definition);
  return verify(component);
};
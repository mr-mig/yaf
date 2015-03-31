System.register([], function (_export) {
  var extend, defaultSchema;

  function verify(def) {
    if (!def.name) {
      throw new Error("You tried to create the component without name specified!");
    }

    if (!def.template) {
      throw new Error("You tried to create the compoennts without template specified!");
    }

    return def;
  }

  return {
    setters: [],
    execute: function () {
      "use strict";
      extend = require("extend");
      defaultSchema = {
        inject: {},
        template: null,
        styles: null,
        ready: function ready() {}
      };
      module.exports = function taglike(definition) {
        var component = extend(true, {}, defaultSchema, definition);
        return verify(component);
      };
    }
  };
});

//'componentName' : 'fromModuleName'
//'exportName' : ModuleObject

//    this.element;
//    this.state;
//    this.options;
//    this.injector;
//    this.channels;
//    this.templateScope;
//# sourceMappingURL=index.js.map
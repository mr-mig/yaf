System.register([], function (_export) {
  var conv, component, stateful, taglike, injector, compose;
  return {
    setters: [],
    execute: function () {
      "use strict";
      conv = require("../../../conventions");
      component = require("../../common/component/index");
      stateful = require("../../common/stateful/index");
      taglike = require("../../common/taglike/index");
      injector = require("../../common/injector/index");
      compose = require("../../../utils/compose");

      module.exports = function createElement(definition, createStateFn, createElementFn) {
        var createOfType = compose(component, injector, stateful, taglike)(definition);
        var componentDefinition = createOfType(conv.structureComponentsNames.element);

        var state = createStateFn(componentDefinition);
        var element = createElementFn(componentDefinition);
        return element;
      };
    }
  };
});
//# sourceMappingURL=index.js.map
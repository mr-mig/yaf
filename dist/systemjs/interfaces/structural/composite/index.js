System.register([], function (_export) {
  var conv, component, stateful, taglike, injector, compose;
  return {
    setters: [],
    execute: function () {
      "use strict";
      conv = require("../../../conventions");
      component = require("../../common/component/index");
      stateful = require("../..//common/stateful");
      taglike = require("../../common/taglike/index");
      injector = require("../../common/injector/index");
      compose = require("../../../utils/compose");

      // right now composite is totaly the same as element
      // this fact may change in the future (and implementations may differ)
      module.exports = function createComposite(definition, createStateFn, createCompositeFn) {
        var createOfType = compose(component, injector, stateful, taglike)(definition);
        var componentDefinition = createOfType(conv.structureComponentsNames.composite);

        var state = createStateFn(componentDefinition);
        var composite = createCompositeFn(componentDefinition);
        return composite;
      };
    }
  };
});
//# sourceMappingURL=index.js.map
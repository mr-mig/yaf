System.register([], function (_export) {
  var conv, component, routable, channelSource, taglike, injector, compose;
  return {
    setters: [],
    execute: function () {
      "use strict";
      conv = require("../../../conventions");
      component = require("../../common/component/index");
      routable = require("../../common/routable/index");
      channelSource = require("../../common/channelSource/index");
      taglike = require("../../common/taglike/index");
      injector = require("../../common/injector/index");
      compose = require("../../../utils/compose");

      module.exports = function createScreen(definition, createScreenFn) {
        var createOfType = compose(component, routable, channelSource, injector, taglike)(definition);
        var componentDefinition = createOfType(conv.structureComponentsNames.screen);

        return createScreenFn(componentDefinition);
      };
    }
  };
});
//# sourceMappingURL=index.js.map
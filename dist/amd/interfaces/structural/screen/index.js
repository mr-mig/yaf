define(["exports"], function (exports) {
  "use strict";
  var conv = require("../../../conventions");
  var component = require("../../common/component/index");
  var routable = require("../../common/routable/index");
  var channelSource = require("../../common/channelSource/index");
  var taglike = require("../../common/taglike/index");
  var injector = require("../../common/injector/index");
  var compose = require("../../../utils/compose");

  module.exports = function createScreen(definition, createScreenFn) {
    var createOfType = compose(component, routable, channelSource, injector, taglike)(definition);
    var componentDefinition = createOfType(conv.structureComponentsNames.screen);

    return createScreenFn(componentDefinition);
  };
});
//# sourceMappingURL=index.js.map
System.register([], function (_export) {
  var extend, defaultSchema, verify;
  return {
    setters: [],
    execute: function () {
      "use strict";
      extend = require("extend");
      defaultSchema = {
        channels: []
      };

      verify = function verify(def) {
        if (!Array.isArray(def.channels)) {
          throw new Error("You have tried to create a channel source component " + "with non-array \"channels\" field!\n" + "This is incorrect, channels can be automatically created only from array notation.\n" + "You should specify something like \"channels: [\"myChannel\"] in component definition.\"");
        }
        return def;
      };

      module.exports = function (definition) {
        var component = extend(true, definition, defaultSchema);
        return verify(component);
      };
    }
  };
});
//# sourceMappingURL=index.js.map
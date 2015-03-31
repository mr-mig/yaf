System.register([], function (_export) {
  var notStateOrChannels;
  return {
    setters: [],
    execute: function () {
      "use strict";

      notStateOrChannels = function notStateOrChannels(key) {
        return key !== "state" && key !== "channels";
      };

      module.exports = function getOptionsValues(attrs) {
        return Object.keys(attrs).filter(notStateOrChannels).reduce(function (acc, key) {
          acc[key] = attrs[key];
          return acc;
        }, {});
      };
    }
  };
});
//# sourceMappingURL=getOptionsValues.js.map
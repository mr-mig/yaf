define(["exports"], function (exports) {
  "use strict";

  module.exports = {
    conventions: require("./conventions/index"),
    element: require("./interfaces/structural/element/index"),
    composite: require("./interfaces/structural/composite/index"),
    screen: require("./interfaces/structural/screen/index"),
    state: require("./interfaces/behavioural/state/index"),
    link: require("./interfaces/behavioural/link/index"),
    channel: require("./interfaces/behavioural/channel/index")
  };
});
//# sourceMappingURL=index.js.map
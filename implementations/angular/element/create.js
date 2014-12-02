'use strict';
var conv = require('../../../conventions');
var tagReady = require('../../../interfaces/common/tagReadyContext');
var getOptionsValues = require('../../../utils/getOptionsValues');
var attachStyles = require('../../../utils/attachStyles');
var detachStyles = require('../../../utils/detachStyles');
var injectorReady = require('../../../interfaces/common/injectorReadyContext');
var templateReady = require('../../../interfaces/common/templateReadyContext');
var extend = require('extend');

// use angular directive syntax to define element
module.exports = function elementDirectiveFactory(definition) {

  function directiveFactory(ElementState, channels) {

    // get all injected services
    var injectedCustomServices = Array.prototype.slice.call(arguments, 2);

    // todo mix options in?
    var angularDirectiveScope = {
      state: '=',
      channel: '@'
    };

    return {
      restrict: 'E',
      template: definition.template,
      compile: function (tEl, tAttr) {
        var styles;

        if (!tAttr.state) {
          console.log('Warning! It seems you forgot to specify state attribute for \'' +
            definition.name + '\' element!');
        }

        if (definition.styles) {
          styles = attachStyles(definition.styles);
        }

        return {
          pre: function (scope, el, attrs) {
            if (!scope.state) {
              scope.state = new ElementState();
            }

            if (scope.channel) {
              var channelNames = scope.channel.split(' ');
              channelNames.forEach(function (channel) {
                channels.get(channel).linkWith(scope, scope.state);
              });
            }

            if (definition.styles) {
              scope.$on('$destroy', function () {
                detachStyles(styles);
              });
            }

            // collect the interpolated option values from attrs
            var opts = getOptionsValues(attrs);


            var readyContext = extend(
              tagReady(el, scope.state, opts),
              templateReady(scope),
              injectorReady(injectedCustomServices, definition.injectables)
            );
            // call the ready with all tagReady and injectorReady fields
            definition.ready.apply(readyContext);
          },
          post: function(){}
        };
      },
      scope: angularDirectiveScope
    };
  }

  var stateName = conv.names.state(definition.name);

  directiveFactory.$inject =
    [stateName, conv.globalNames.channels]
      .concat(definition.injectables);

  definition.component = directiveFactory;
  return definition;
};
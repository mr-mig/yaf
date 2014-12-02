'use strict';
var conv = require('../../../conventions');
var extend = require('extend');
var tagReady = require('../../../interfaces/common/tagReadyContext');
var compositeReady = require('../../../interfaces/common/compositeReadyContext');
var getOptionsValues = require('../../../utils/getOptionsValues');
var linkInterface = require('../../../interfaces/behavioural/link');
var channelsInterface = require('../../../interfaces/behavioural/channel');
var attachStyles = require('../../../utils/attachStyles');
var detachStyles = require('../../../utils/detachStyles');
var injectorReady = require('../../../interfaces/common/injectorReadyContext');
var templateReady = require('../../../interfaces/common/templateReadyContext');


module.exports = function compositeDirectiveFactory(definition, state) {

  function directiveFactory(CompositeState, channels, linkFn) {

    // get all injected services
    var injectedCustomServices = Array.prototype.slice.call(arguments, 3);

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
              scope.state = new CompositeState();
            }
            if (scope.channel) {
              var channelNames = scope.channel.split(' ');
              channelNames.forEach(function (channel) {
                channels.get(channel).linkWith(scope, scope.state);
              });
            }

            if (definition.styles) {
              scope.$on('$destroy', function () {
                // todo potential mem leak here?
                detachStyles(styles);
              });
            }

            // collect the interpolated option values from attrs
            var opts = getOptionsValues(attrs);

            var readyContext = extend(
              tagReady(el, scope.state, opts),
              templateReady(scope),
              injectorReady(injectedCustomServices, definition.injectables),
              compositeReady(linkFn, channels)
            );

            definition.ready.apply(readyContext);
          },
          post: function () {
          }
        };
      },
      scope: angularDirectiveScope
    };
  }

  var stateName = conv.names.state(definition.name);

  // inject all composite-specific services
  directiveFactory.$inject =
    [ stateName,
      channelsInterface().entityName,
      linkInterface().entityName
    ].concat(definition.injectables);

  definition.component = directiveFactory;
  return definition;
};
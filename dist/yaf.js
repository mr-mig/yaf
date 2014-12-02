!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.yaf=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
'use strict';
module.exports = function angularModuleName(entity, componentName){
  return [entity.toLowerCase(), componentName].join('.');
};
},{}],2:[function(_dereq_,module,exports){
'use strict';
module.exports = {
  state: 'state',
  channel: 'channel',
  link: 'link'
};
},{}],3:[function(_dereq_,module,exports){
'use strict';
module.exports = {
  channels: 'channels',
  framework: 'am'
};
},{}],4:[function(_dereq_,module,exports){
'use strict';
var firstLower = _dereq_('../utils/firstLower');
var firstUpper = _dereq_('../utils/firstUpper');
var composeName = _dereq_('../utils/composeName');

module.exports = {
  structureComponentsNames: _dereq_('./structureComponentsNames'),
  behaviourComponentsNames: _dereq_('./behaviourComponentsNames'),
  globalNames: _dereq_('./globalNames'),
  names : {
    element: composeName(firstLower),
    state: composeName(firstUpper, _dereq_('./behaviourComponentsNames').state),
    composite: composeName(firstLower),
    screen: composeName(firstLower),
    ngModule: _dereq_('./angularModuleName')
  }
};
},{"../utils/composeName":39,"../utils/firstLower":41,"../utils/firstUpper":42,"./angularModuleName":1,"./behaviourComponentsNames":2,"./globalNames":3,"./structureComponentsNames":5}],5:[function(_dereq_,module,exports){
'use strict';
module.exports = {
  element: 'elements',
  composite: 'composites',
  screen: 'screens'
};
},{}],6:[function(_dereq_,module,exports){
'use strict';
// global registry
var channels = {};

module.exports = ChannelsProvider;

// accessor function
// allows non-existent channels usage
// gives sane warning message
channels.get = function (name) {
  if (!channels[name]) {
    console.log('Warning! The non-existent channel is accessed: ' + name + '.\n' +
      'This is potentially abnormal situation: all active channels should ' +
      'be created using channelsProvider.createChannels(<array>) ' +
      'or registered using the screen\'s "channels" field.');
    return new Channel(name);
  }

  return channels[name];
};

function Channel(name) {
  // channel name
  this.name = name;

  // all scopes linked to this channel
  this.scopes = [];

  // all source states linked to this channel
  this.sources = [];

  // all target states linked to this channel
  this.targets = [];

  // transformation function
  // (target, source) -> newTarget
  this.transform = function (nothing, x) {
    return x;
  };
}

// angular-specific provider format
function ChannelsProvider() {

  function add(name) {
    channels[name] = new Channel(name);
  }

  // this should be called during app startup to create the given channels
  this.createChannels = function (array) {
    array.forEach(add);
  };

  this.$get = ['$rootScope', ChannelFactory];
}

// this thing will be injected in angular
function ChannelFactory($rootScope) {
  // links the given scope to this channel
  // any change will be propagated to this scope
  Channel.prototype.link = function (scope) {
    if (this.scopes.indexOf(scope) > -1) {
      return;
    }

    this.scopes.push(scope);
    return this;
  };

  Channel.prototype.source = function (state, field) {
    if (!this.scopes.length) {
      throw new Error('Channel' + this.name + 'is not linked to any scope!\n' +
        'All active channels should be linked to at least one scope to be able to watch state changes.' +
        'Use channel.link(scope)');
    }

    this.sources.push({
      state: state,
      field: field
    });


    if (typeof state[field] === 'function') {
      return this.fromFn(state, field);
    }

    var watched = function () {
      return state[field];
    };

    if (!field) watched = function () {
      return state;
    };

    var watchHandler = function (n, o) {
      if (n !== o) {
        this._dispatch(state);
      }
    }.bind(this);

    var scope = this.scopes[this.scopes.length - 1];

    //deep watch object if no field defined
    scope.$watch(watched, watchHandler, !field);

    return this;
  };

  Channel.prototype.fromFn = function (state, fnName) {
    // remember old function
    var oldFn = state[fnName];

    // hijack with decorator
    state[fnName] = function () {
      var args = [].slice.apply(arguments);

      var result = oldFn.apply(state, args);

      // dispatch change when this method is called
      // todo pass the source state anyway?
      this._dispatch(result);
    }.bind(this);

    return this;
  };

  Channel.prototype._dispatch = function (sourceState) {
    $rootScope.$broadcast(this.name, sourceState);
  };

  Channel.prototype.map = function (fn) {
    // (target, source) -> target
    this.transformer = fn;
    return this;
  };

  // Bind the given state to all changes in this channel
  Channel.prototype.linkWith = function (targetScope, state) {
    var listenTarget = {
      state: state,
      scope: targetScope
    };

    this.targets.push(listenTarget);

    // binding to target scope so that listener deregisters automatically
    return targetScope.$on(this.name, function (event, sourceState) {
      var result = this.transformer(state, sourceState);
      if (result === undefined) {
        console.log('Warning! The channel "' + this.name +
          '" has resetted the target state to "undefined"!' +
          '\nDo you really want this?' +
          '\nMaybe you should use a pure function inside channel.map().' +
          '\nThis function should return transformed state object:' +
          '\n' + this.transformer);
      }
      targetScope.state = result;
    }.bind(this));
  };

  return channels;
}
},{}],7:[function(_dereq_,module,exports){
'use strict';
var angular = _dereq_('angular-cjs');
var channel = _dereq_('../../../interfaces/behavioural/channel');
var createChannel = _dereq_('./create');

var result = channel(createChannel);

module.exports = angular.module(result.moduleName, [])
  .provider(result.entityName, result.factoryFn);

},{"../../../interfaces/behavioural/channel":19,"./create":6,"angular-cjs":35}],8:[function(_dereq_,module,exports){
'use strict';
var conv = _dereq_('../../../conventions');
var extend = _dereq_('extend');
var tagReady = _dereq_('../../../interfaces/common/tagReadyContext');
var compositeReady = _dereq_('../../../interfaces/common/compositeReadyContext');
var getOptionsValues = _dereq_('../../../utils/getOptionsValues');
var linkInterface = _dereq_('../../../interfaces/behavioural/link');
var channelsInterface = _dereq_('../../../interfaces/behavioural/channel');
var attachStyles = _dereq_('../../../utils/attachStyles');
var detachStyles = _dereq_('../../../utils/detachStyles');
var injectorReady = _dereq_('../../../interfaces/common/injectorReadyContext');
var templateReady = _dereq_('../../../interfaces/common/templateReadyContext');


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
},{"../../../conventions":4,"../../../interfaces/behavioural/channel":19,"../../../interfaces/behavioural/link":20,"../../../interfaces/common/compositeReadyContext":24,"../../../interfaces/common/injectorReadyContext":26,"../../../interfaces/common/tagReadyContext":29,"../../../interfaces/common/templateReadyContext":31,"../../../utils/attachStyles":37,"../../../utils/detachStyles":40,"../../../utils/getOptionsValues":43,"extend":36}],9:[function(_dereq_,module,exports){
'use strict';
var angular = _dereq_('angular-cjs');
var composite = _dereq_('../../../interfaces/structural/composite');
var createComposite = _dereq_('./create');
var createState = _dereq_('../state');

// register composite using angular DI container
module.exports = function angularComposite(definition) {
  var compositeDefinition = composite(definition, createState, createComposite);

  // try to get the module first
  // this is the case when state is created for a structure entity like composite
  try {
    angular.module(compositeDefinition.moduleName);
  } catch (e) {
    angular.module(compositeDefinition.moduleName, compositeDefinition.moduleDependencies);
  }

  return angular.module(compositeDefinition.moduleName)
    .directive(compositeDefinition.name, compositeDefinition.component);
};

},{"../../../interfaces/structural/composite":32,"../state":17,"./create":8,"angular-cjs":35}],10:[function(_dereq_,module,exports){
'use strict';
var conv = _dereq_('../../../conventions');
var tagReady = _dereq_('../../../interfaces/common/tagReadyContext');
var getOptionsValues = _dereq_('../../../utils/getOptionsValues');
var attachStyles = _dereq_('../../../utils/attachStyles');
var detachStyles = _dereq_('../../../utils/detachStyles');
var injectorReady = _dereq_('../../../interfaces/common/injectorReadyContext');
var templateReady = _dereq_('../../../interfaces/common/templateReadyContext');
var extend = _dereq_('extend');

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
},{"../../../conventions":4,"../../../interfaces/common/injectorReadyContext":26,"../../../interfaces/common/tagReadyContext":29,"../../../interfaces/common/templateReadyContext":31,"../../../utils/attachStyles":37,"../../../utils/detachStyles":40,"../../../utils/getOptionsValues":43,"extend":36}],11:[function(_dereq_,module,exports){
'use strict';
var angular = _dereq_('angular-cjs');
var element = _dereq_('../../../interfaces/structural/element');
var createElement = _dereq_('./create');
var createState = _dereq_('../state');

module.exports = function angularElement(definition) {
  var elementDefinition = element(definition, createState, createElement);

  // try to get the module first
  // this is the case when state is created for a structure entity like element
  try {
    angular.module(elementDefinition.moduleName);
  } catch (e) {
    angular.module(elementDefinition.moduleName, elementDefinition.moduleDependencies);
  }

  return angular.module(elementDefinition.moduleName)
    .directive(elementDefinition.name, elementDefinition.component);
};
},{"../../../interfaces/structural/element":33,"../state":17,"./create":10,"angular-cjs":35}],12:[function(_dereq_,module,exports){
'use strict';
module.exports = link;

function link(scope) {
  return new LinkBus(scope);
}

function LinkBus(scope) {
  // the current linked scope
  this.scope = scope;
  // all source states
  this.sources = [];
  // all target states
  this.targets = [];
  // current transformer
  this.transformer = function (nothing, x) {
    return x;
  };

  this.scope.$on('$destroy', function () {
    // kill all references bounded to this scope object
    // in angular all listeners will be removed automatically
    this.sources = null;
    this.targets = null;
    this.scope = null;
    this.transformer = null;
  }.bind(this));
}

// add a state as a change source
LinkBus.prototype.source = function (state, field) {

  // get hold of all registered states
  this.sources.push({
    state: state,
    field: field
  });

  if (typeof state[field] === 'function') {
    return this.fromFn(state, field);
  }

  var watched = function () {
    return state[field];
  };

  if (!field) {
    watched = function () {
      return state;
    };
  }

  var watchHandler = function (n, o) {
    if (n !== o) {
      this._dispatch({
        state: state,
        field: field,
        value: n});
    }
  }.bind(this);

  //deep watch object if no field defined
  // todo Add deep watch as a parameter to the link?
  this.scope.$watch(watched, watchHandler, !field);

  return this;
};


// dispatch change to all targets
LinkBus.prototype._dispatch = function (newVal) {
  if (!this.targets.length) {
    console.log('The change event inside one of the links ' +
      'has no targets!\nSources: ' + this.sources);
  }
  this.targets.forEach(_applyTransformation(newVal, this.transformer));
};


// add a state as a change target
LinkBus.prototype.target = function (state, field) {
  if (!state) {
    throw new Error('You specified an "undefined" state to link!');
  }
  this.targets.push({
    state: state,
    field: field
  });
  return this;
};

// add a transformer function to current link
// should be of type (source, target) -> target
LinkBus.prototype.map = function (fn) {
  this.transformer = fn;
  return this;
};

// link function call as a change source
LinkBus.prototype.fromFn = function (state, fnName) {
  // remember old function
  var oldFn = state[fnName];

  // hijack with decorator
  state[fnName] = function () {
    var args = [].slice.apply(arguments);

    var result = oldFn.apply(state, args);

    // dispatch change when this method is called
    this._dispatch(result);
  }.bind(this);

  return this;
};

// propagate transformation to the given target
function _applyTransformation(newVal, transformer) {
  return function (target) {
    var changedValue = target.field ? target.state[target.field] : target.state;
    var newTargetValue = transformer(newVal.value, changedValue);

    if (newTargetValue === undefined && !target.field) {
      console.log('Warning! The link reset the target state to "undefined"!' +
        '\nFeels like a bug.' +
        '\nYou should use a pure function inside link.map().' +
        '\nThis function should return transformed state object:' +
        '\n' + this.transformer);
    }

    if (target.field){
      target.state[target.field] = newTargetValue;
    } else {
      // update all fields of the old target
      // Pretending that it acts as an immutable
      Object.keys(target.state).forEach(function (key) {
        target.state[key] = newTargetValue[key];
      });
    }
  };
}
},{}],13:[function(_dereq_,module,exports){
'use strict';
var angular = _dereq_('angular-cjs');
var link = _dereq_('../../../interfaces/behavioural/link');
var createLink = _dereq_('./create');

var result = link(createLink);

module.exports = angular.module(result.moduleName, [])
  .value(result.entityName, result.factoryFn);

},{"../../../interfaces/behavioural/link":20,"./create":12,"angular-cjs":35}],14:[function(_dereq_,module,exports){
'use strict';
var angular = _dereq_('angular-cjs');
var attachStyles = _dereq_('../../../utils/attachStyles');
var detachStyles = _dereq_('../../../utils/detachStyles');
var compositeReady = _dereq_('../../../interfaces/common/compositeReadyContext');
var linkInterface = _dereq_('../../../interfaces/behavioural/link');
var channelsInterface = _dereq_('../../../interfaces/behavioural/channel');
var injectorReady = _dereq_('../../../interfaces/common/injectorReadyContext');
var templateReady = _dereq_('../../../interfaces/common/templateReadyContext');
var extend = _dereq_('extend');

module.exports = function createScreen(definition) {
  var module = angular.module(definition.moduleName, definition.moduleDependencies);

  var registerRoutes = function ($routeProvider, channelsProvider) {
    $routeProvider
      .when(definition.route, {
        template: definition.template,
        controller: controller
      });

    channelsProvider.createChannels(definition.channels);
  };

  var controller = function ($scope, channels, link) {
    var injectedCustomServices = Array.prototype.slice.call(arguments, 3);

    var styles;
    if (definition.styles) {
      styles = attachStyles(definition.styles);
    }

    $scope.$on('$destroy', function () {
      detachStyles(styles);
    });

    var readyContext = extend(
      templateReady($scope),
      injectorReady(injectedCustomServices, definition.injectables),
      compositeReady(link, channels)
    );

    definition.ready.apply(readyContext);
  };

  controller.$inject = [
    '$scope',
    channelsInterface().entityName,
    linkInterface().entityName
  ].concat(definition.injectables);

  registerRoutes.$inject = ['$routeProvider', 'channelsProvider'];

  return module.config(registerRoutes);
};
},{"../../../interfaces/behavioural/channel":19,"../../../interfaces/behavioural/link":20,"../../../interfaces/common/compositeReadyContext":24,"../../../interfaces/common/injectorReadyContext":26,"../../../interfaces/common/templateReadyContext":31,"../../../utils/attachStyles":37,"../../../utils/detachStyles":40,"angular-cjs":35,"extend":36}],15:[function(_dereq_,module,exports){
'use strict';
var angular = _dereq_('angular-cjs');
var screen = _dereq_('../../../interfaces/structural/screen');
var createScreen = _dereq_('./create');

module.exports = function angularScreen(definition) {
  return screen(definition, createScreen);
};
},{"../../../interfaces/structural/screen":34,"./create":14,"angular-cjs":35}],16:[function(_dereq_,module,exports){
//todo
'use strict';
var conv = _dereq_('../../../conventions');

module.exports = function stateFactory(stateDefinition) {
  // angular factory function, returning constructor
  return function(){
    return function stateConstructor() {
      // create an instance using the obj as a schema
      return Object.create(stateDefinition);
    };
  };
};

},{"../../../conventions":4}],17:[function(_dereq_,module,exports){
'use strict';
var angular = _dereq_('angular-cjs');
var state = _dereq_('../../../interfaces/behavioural/state');
var stateFactory = _dereq_('./create');

// register the state object in angular DI container
module.exports = function angularState(definition) {
  var result = state(definition, stateFactory);

  // try to get the module first
  // this is the case when state is created for a structure entity like element
  try{
    angular.module(definition.moduleName);
  } catch(e) {
    angular.module(definition.moduleName, definition.moduleDependencies);
  }

  return angular.module(definition.moduleName)
    .factory(result.entityName, result.factoryFn);
};

},{"../../../interfaces/behavioural/state":21,"./create":16,"angular-cjs":35}],18:[function(_dereq_,module,exports){
'use strict';

var angular = _dereq_('angular-cjs');

module.exports = {
  element: _dereq_('./implementations/angular/element'),
  composite: _dereq_('./implementations/angular/composite'),
  screen: _dereq_('./implementations/angular/screen'),
  state: _dereq_('./implementations/angular/state'),
  // angular-specific
  module: angular.module('am.core', [
    _dereq_('./implementations/angular/link').name,
    _dereq_('./implementations/angular/channel').name
  ])
};

},{"./implementations/angular/channel":7,"./implementations/angular/composite":9,"./implementations/angular/element":11,"./implementations/angular/link":13,"./implementations/angular/screen":15,"./implementations/angular/state":17,"angular-cjs":35}],19:[function(_dereq_,module,exports){
'use strict';
var conv = _dereq_('../../../conventions');

module.exports = function defineСhannel(createChannel) {
  return {
    factoryFn: createChannel,
    moduleName: conv.names.ngModule(
      conv.globalNames.framework,
      conv.behaviourComponentsNames.channel
    ),
    entityName: conv.globalNames.channels
  };
};

},{"../../../conventions":4}],20:[function(_dereq_,module,exports){
'use strict';
var conv = _dereq_('../../../conventions');

module.exports = function defineLink(createLink) {
  return {
    factoryFn: createLink,
    entityName: conv.behaviourComponentsNames.link,
    moduleName: conv.names.ngModule(conv.globalNames.framework, conv.behaviourComponentsNames.link)
  }
};

},{"../../../conventions":4}],21:[function(_dereq_,module,exports){
'use strict';
var conv = _dereq_('../../../conventions');

module.exports = function state(definition, factoryFn){
  var stateName = conv.names.state(definition.name);

  return {
    entityName: stateName,
    factoryFn: factoryFn(definition.state)
  };
}
},{"../../../conventions":4}],22:[function(_dereq_,module,exports){
'use strict';
var extend = _dereq_('extend');
var defaultSchema = {
  channels: []
}

var verify = function (def) {
  if (!Array.isArray(def.channels)){
    throw new Error('You have tried to create a channel source component ' +
      'with non-array "channels" field!\n' +
      'This is incorrect, channels can be automatically created only from array notation.\n' +
      'You should specify something like "channels: ["myChannel"] in component definition."')
  }
  return def;
}

module.exports = function(definition){
  var component = extend(true, definition, defaultSchema);
  return verify(component);
}
},{"extend":36}],23:[function(_dereq_,module,exports){
'use strict';
var conv = _dereq_('../../../conventions');
var extend = _dereq_('extend');

module.exports = function component(definition) {
  return function componentOfType(type) {
    var moduleName = conv.names.ngModule(type, definition.name);

    return extend(
      definition,
      {
        moduleName: moduleName,
        type: type
      });
  };
};

},{"../../../conventions":4,"extend":36}],24:[function(_dereq_,module,exports){
'use strict';

module.exports = function readyContext(link, channels) {

  return {
    link: link,
    channels: channels
  };
};
},{}],25:[function(_dereq_,module,exports){
'use strict';
var mapValues = _dereq_('../../../utils/mapValues');
var uniq = _dereq_('../../../utils/uniq');
var extend = _dereq_('extend');

module.exports = function injector(definition){
  var modules = uniq(mapValues(definition.inject));
  var injectables = Object.keys(definition.inject);

  return extend(definition, {
    moduleDependencies: modules,
    injectables: injectables
  });
};
},{"../../../utils/mapValues":45,"../../../utils/uniq":46,"extend":36}],26:[function(_dereq_,module,exports){
'use strict';

module.exports = function injectorReadyContext(injected, injectables) {

  // combine injected components with the corresponding injectable names
  var injector =
    injectables
      .reduce(function (acc, name, idx) {
        acc[name] = injected[idx];
        return acc;
      }, {});

  return {
    injector: injector
  };
};
},{}],27:[function(_dereq_,module,exports){
'use strict';
var extend = _dereq_('extend');
var isFunction = _dereq_('../../../utils/isFunction');

var defaultSchema = {
  route : '/'
};

var verify = function (def) {
  if (!def.route) {
    throw new Error('You tried to create a routable component without route specified!');
  }
  return def;
}

module.exports = function stateful(definition) {
  var component = extend(true, {}, defaultSchema, definition);
  return verify(component);
};
},{"../../../utils/isFunction":44,"extend":36}],28:[function(_dereq_,module,exports){
'use strict';
var extend = _dereq_('extend');
var isFunction = _dereq_('../../../utils/isFunction');

var defaultSchema = {
  state: {
    // element's state object
  },
  options: {
    // element's options
  }
};

function verifyNoFunctions(def, prop) {
  var property = def[prop];

  var fns = Object.keys(property)
    .map(function (key) {
      return property[key];
    })
    .filter(isFunction);

  if (fns.length) {
    console.log('Warning! Property \"' + prop + '\" in ' +
      def.name + ' contain function definitions.\n' +
      'This may result in incorrect behaviour!');
  }
}


module.exports = function stateful(definition) {
  var component = extend(true, {}, defaultSchema, definition);
  verifyNoFunctions(component, 'state');
  verifyNoFunctions(component, 'options');
  return component;
};
},{"../../../utils/isFunction":44,"extend":36}],29:[function(_dereq_,module,exports){
'use strict';

module.exports = function internals(el, state, options) {

  return {
    element: el,
    state: state,
    options: options
  };
};
},{}],30:[function(_dereq_,module,exports){
'use strict';
var extend = _dereq_('extend');

var defaultSchema = {
  inject: {
    //'componentName' : 'fromModuleName'
    //'exportName' : ModuleObject
  },
  template: null,
  styles: null,
  ready: function () {
//    this.element;
//    this.state;
//    this.options;
//    this.injector;
//    this.channels;
//    this.templateScope;
  }
};

function verify(def){
  if (!def.name) {
    throw new Error('You tried to create the component without name specified!');
  }

  if (!def.template) {
    throw new Error('You tried to create the compoennts without template specified!');
  }

  return def;
}

module.exports = function taglike(definition){
  var component = extend(true, {}, defaultSchema, definition);
  return verify(component);
};
},{"extend":36}],31:[function(_dereq_,module,exports){
'use strict';

module.exports = function(scope){
  return {
    templateScope: scope
  };
};
},{}],32:[function(_dereq_,module,exports){
'use strict';
var conv = _dereq_('../../../conventions');
var component = _dereq_('../../common/component');
var stateful = _dereq_('../..//common/stateful');
var taglike = _dereq_('../../common/taglike');
var injector = _dereq_('../../common/injector');
var compose = _dereq_('../../../utils/compose');


// right now composite is totaly the same as element
// this fact may change in the future (and implementations may differ)
module.exports = function createComposite(definition, createStateFn, createCompositeFn){
  var createOfType = compose(component, injector, stateful, taglike)(definition);
  var componentDefinition = createOfType(conv.structureComponentsNames.composite);

  var state = createStateFn(componentDefinition);
  var composite = createCompositeFn(componentDefinition);
  return composite;
};

},{"../../../conventions":4,"../../../utils/compose":38,"../..//common/stateful":28,"../../common/component":23,"../../common/injector":25,"../../common/taglike":30}],33:[function(_dereq_,module,exports){
'use strict';
var conv = _dereq_('../../../conventions');
var component = _dereq_('../../common/component');
var stateful = _dereq_('../../common/stateful');
var taglike = _dereq_('../../common/taglike');
var injector = _dereq_('../../common/injector');
var compose = _dereq_('../../../utils/compose');


module.exports = function createElement(definition, createStateFn, createElementFn){
  var createOfType = compose(component, injector, stateful, taglike)(definition);
  var componentDefinition = createOfType(conv.structureComponentsNames.element);

  var state = createStateFn(componentDefinition);
  var element = createElementFn(componentDefinition);
  return element;
};

},{"../../../conventions":4,"../../../utils/compose":38,"../../common/component":23,"../../common/injector":25,"../../common/stateful":28,"../../common/taglike":30}],34:[function(_dereq_,module,exports){
'use strict';
var conv = _dereq_('../../../conventions');
var component = _dereq_('../../common/component');
var routable = _dereq_('../../common/routable');
var channelSource = _dereq_('../../common/channelSource');
var taglike = _dereq_('../../common/taglike');
var injector = _dereq_('../../common/injector');
var compose = _dereq_('../../../utils/compose');


module.exports = function createScreen(definition, createScreenFn) {
  var createOfType = compose(component, routable, channelSource, injector, taglike)(definition);
  var componentDefinition = createOfType(conv.structureComponentsNames.screen);

  return createScreenFn(componentDefinition);
};

},{"../../../conventions":4,"../../../utils/compose":38,"../../common/channelSource":22,"../../common/component":23,"../../common/injector":25,"../../common/routable":27,"../../common/taglike":30}],35:[function(_dereq_,module,exports){
(function (global){
var angular = global.angular;
if (typeof angular === 'undefined')
  throw new Error('Failed to load module angular-cjs: AngularJS is not defined in the global scope.');
module.exports = angular;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],36:[function(_dereq_,module,exports){
var hasOwn = Object.prototype.hasOwnProperty;
var toString = Object.prototype.toString;
var undefined;

var isPlainObject = function isPlainObject(obj) {
	'use strict';
	if (!obj || toString.call(obj) !== '[object Object]') {
		return false;
	}

	var has_own_constructor = hasOwn.call(obj, 'constructor');
	var has_is_property_of_method = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
	// Not own constructor property must be Object
	if (obj.constructor && !has_own_constructor && !has_is_property_of_method) {
		return false;
	}

	// Own properties are enumerated firstly, so to speed up,
	// if last one is own, then all properties are own.
	var key;
	for (key in obj) {}

	return key === undefined || hasOwn.call(obj, key);
};

module.exports = function extend() {
	'use strict';
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0],
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if (typeof target === 'boolean') {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	} else if ((typeof target !== 'object' && typeof target !== 'function') || target == null) {
		target = {};
	}

	for (; i < length; ++i) {
		options = arguments[i];
		// Only deal with non-null/undefined values
		if (options != null) {
			// Extend the base object
			for (name in options) {
				src = target[name];
				copy = options[name];

				// Prevent never-ending loop
				if (target === copy) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if (deep && copy && (isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
					if (copyIsArray) {
						copyIsArray = false;
						clone = src && Array.isArray(src) ? src : [];
					} else {
						clone = src && isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[name] = extend(deep, clone, copy);

				// Don't bring in undefined values
				} else if (copy !== undefined) {
					target[name] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};


},{}],37:[function(_dereq_,module,exports){
'use strict';
module.exports = function attachStyles(stylesStr, node) {
  var styles = document.createElement('style');
  styles.type = 'text/css';
  styles.innerHTML = stylesStr;
  node = node ? (node[0] || node) : document.head.childNodes[0];
  node.parentNode.appendChild(styles);
  return styles;
};

},{}],38:[function(_dereq_,module,exports){
'use strict';
module.exports = function compose() {
  var funcs = arguments;

  return function() {
    var args = arguments,
      length = funcs.length;

    while (length--) {
      args = [funcs[length].apply(this, args)];
    }
    return args[0];
  };
}
},{}],39:[function(_dereq_,module,exports){
'use strict';
var firstUpper = _dereq_('./firstUpper');

module.exports = function composeName(firstWordTransformer, component) {
  component = component || '';

  return function (entity) {
    return [firstWordTransformer(entity), firstUpper(component)].join('');
  };
};
},{"./firstUpper":42}],40:[function(_dereq_,module,exports){
'use strict';
module.exports = function detachStyles(styles) {
  if (!styles.parentNode) {
    return;
  }
  return styles.parentNode.removeChild(styles);
};

},{}],41:[function(_dereq_,module,exports){
'use strict';
module.exports = function firstLower(string) {
  return string.charAt(0).toLowerCase() + string.substr(1);
};

},{}],42:[function(_dereq_,module,exports){
'use strict';
module.exports = function firstUpper(string) {
  return string.charAt(0).toUpperCase() + string.substr(1);
};

},{}],43:[function(_dereq_,module,exports){
'use strict';

var notStateOrChannels = function (key) {
  return key !== 'state' && key !== 'channels';
};

module.exports = function getOptionsValues(attrs){
  return Object.keys(attrs)
    .filter(notStateOrChannels)
    .reduce(function(acc, key){
      acc[key] = attrs[key];
      return acc;
    }, {});
};
},{}],44:[function(_dereq_,module,exports){
'use strict';

module.exports = function (fn) {
  return !!(fn && fn.constructor && fn.call && fn.apply);
};
},{}],45:[function(_dereq_,module,exports){
'use strict';

module.exports = function mapValues(map){
  return Object.keys(map).map(function(key){return map[key];});
};
},{}],46:[function(_dereq_,module,exports){
'use strict';
module.exports = function uniq(arr) {
  return Object.keys(arr.reduce(function (acc, val) {
    acc[val] = 1;
    return acc;
  }, {}));
};

},{}]},{},[18])(18)
});

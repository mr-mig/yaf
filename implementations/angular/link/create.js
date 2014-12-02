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
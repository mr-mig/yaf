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
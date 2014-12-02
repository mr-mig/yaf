'use strict';

module.exports = function mapValues(map){
  return Object.keys(map).map(function(key){return map[key];});
};
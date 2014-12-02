'use strict';

module.exports = {
  conventions: require('./conventions'),
  element: require('./interfaces/structural/element'),
  composite: require('./interfaces/structural/composite'),
  screen: require('./interfaces/structural/screen'),
  state: require('./interfaces/behavioural/state'),
  link: require('./interfaces/behavioural/link'),
  channel: require('./interfaces/behavioural/channel')
};

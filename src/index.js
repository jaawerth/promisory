'use strict';

const methods = {
  catch: require('./catch'),
  handle: require('./handle'),
  map: require('./map'),
  promisify: require('./promisify'),
  race: require('./race'),
  reduce: require('./reduce'),
  series: require('./series'),
  spread: require('./spread'),
  tap: require('./tap'),
  then: require('./then')
};

module.exports = methods;
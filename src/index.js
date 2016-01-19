'use strict';

const methods = {
  catch: require('./catch'),
  handle: require('./handle'),
  map: require('./map'),
  mapSeries: require('./map-series'),
  promisify: require('./promisify'),
  race: require('./race'),
  reduce: require('./reduce'),
  series: require('./series'),
  spread: require('./spread'),
  tap: require('./tap')
};

module.exports = methods;
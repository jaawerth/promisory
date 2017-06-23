'use strict';

const toPartial = {
  map: require('./map'),
  mapSeries: require('./map-series'),
  race: require('./race'),
  reduce: require('./reduce'),
  spread: require('./spread'),
  tap: require('./tap')
};

const fn = {
  handle: require('./handle'),
  promisify: require('./promisify'),
  series: require('./series'),
  onReject: require('./catch')
};

const _ = {...fn, ...toPartial};


module.exports = _;

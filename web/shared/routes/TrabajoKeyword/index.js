if (typeof require.ensure !== 'function') require.ensure = function (d, c) { c(require); };

module.exports = {
  path: 'trabajo/clave/:keyword',
  getComponent (location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/TrabajoKeywords'));
    });
  }
};

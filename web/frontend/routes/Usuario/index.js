if (typeof require.ensure !== 'function') require.ensure = function (d, c) { c(require); };

module.exports = {
  path: 'usuario/:id',
  getComponent (location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Usuario'));
    });
  }
};

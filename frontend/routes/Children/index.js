module.exports = {
  path: 'children',
  getComponent (location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Children.jsx'));
    });
  }
};

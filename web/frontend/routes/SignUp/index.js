if (typeof require.ensure !== 'function') require.ensure = function (d, c) { c(require); };

module.exports = {
  path: '/signup',
  getComponent (location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/SignUp'));
    });
  },
  indexRoute: {
    component: require('./routes/Users/components/SignUpUsers')
  },
  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/Users'),
        require('./routes/Business')
      ])
    })
  }
};

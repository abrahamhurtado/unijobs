const webpack = require('webpack');
const resolve = require('path').resolve;
const autoprefixer = require('autoprefixer');

module.exports = {
  context: __dirname,
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client',
    './client/main'
  ],
  output: {
    path: resolve(__dirname, 'build'),
    publicPath: '/static/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: [ '', '.js', '.jsx' ]
  },
  postcss () {
    return [ autoprefixer ];
  },
  module: {
    loaders: [ {
      test: /\.css$/,
      loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
    }, {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      include: [ resolve('./client'), resolve('./shared') ],
      query: {
        "env": {
          "development": {
            "plugins": [
              ["react-transform", {
                "transforms": [{
                  "transform": "react-transform-hmr",
                  "imports": ["react"],
                  "locals": ["module"]
                }, {
                  "transform": "react-transform-catch-errors",
                  "imports": ["react", "redbox-react"]
                }]
              }]
            ]
          }
        }
      }
    } ]
  }
};

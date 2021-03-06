import webpack from 'webpack';
import { resolve } from 'path';

export default {
  context: __dirname,
  devtool: '#source-map',
  entry: [
    'webpack-hot-middleware/client',
    './frontend/main'
  ],
  output: {
    path: resolve(__dirname, 'frontend/build'),
    publicPath: '/static/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: [ '', '.js', '.jsx' ]
  },
  module: {
    loaders: [ {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: [ 'babel' ],
      include: [resolve('./frontend'), resolve('./shared')]
    } ]
  }
};

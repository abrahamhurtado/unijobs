import webpack from 'webpack';
import { resolve } from 'path';

export default {
  context: __dirname,
  devtool: 'eval',
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: [ '', '.js', 'jsx' ]
  },
  module: {
    loaders: [ {
      test: /\.jsx?$/,
      loaders: [ 'babel' ],
      include: resolve('./frontend')
    } ]
  }
};

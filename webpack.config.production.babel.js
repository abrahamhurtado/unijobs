import webpack from 'webpack';
import { resolve, join } from 'path';

export default {
  devtool: '#source-map',
  entry: [
    './frontend/main'
  ],
  output: {
    path: resolve(__dirname, 'frontend/build'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
  resolve: {
    extensions: [ '', '.js', '.jsx' ]
  },
  module: {
    loaders: [ {
      test: /\.jsx?$/,
      loaders: [ 'babel' ],
      include: [resolve('./frontend'), resolve('./shared')]
    } ]
  }
};

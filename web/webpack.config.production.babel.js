import webpack from 'webpack';
import { resolve } from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
  devtool: '#source-map',
  entry: [
    './frontend/main'
  ],
  output: {
    path: resolve(__dirname, 'build'),
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
    }),
    new ExtractTextPlugin('style.css', { allChunks: true })
  ],
  resolve: {
    extensions: [ '', '.js', '.jsx' ]
  },
  module: {
    loaders: [ {
      test: /\.css$/,
      loader: ExtractTextPlugin('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader')
    }, {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      include: [resolve('./frontend'), resolve('./shared')]
    } ]
  }
};
